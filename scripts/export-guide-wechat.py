#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""将中文指南导出为适合微信阅读的 HTML 与 PDF。"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS_FILE = Path(__file__).resolve().parent / "wechat-export.css"
EXPORT_DIR = ROOT / "exports"


@dataclass(frozen=True)
class GuideExportConfig:
    key: str
    source: Path
    html_name: str
    pdf_name: str
    title: str
    theme_class: str
    badge_note: str
    header_note: str


GUIDES: dict[str, GuideExportConfig] = {
    "primary": GuideExportConfig(
        key="primary",
        source=ROOT / "docs" / "primary_student_guide.md",
        html_name="小学生AI学习助手指南.html",
        pdf_name="小学生AI学习助手指南.pdf",
        title="小学生AI学习助手指南",
        theme_class="guide-primary",
        badge_note="v2.0.0 · 2026-08-22",
        header_note="适合在手机微信中阅读 · 使用前请爸爸妈妈或老师陪同",
    ),
    "parents": GuideExportConfig(
        key="parents",
        source=ROOT / "docs" / "parents_guide.md",
        html_name="家长AI应用指南.html",
        pdf_name="家长AI应用指南.pdf",
        title="家长AI应用指南",
        theme_class="guide-parents",
        badge_note="v2.0.0 · 2026-08-22",
        header_note="适合在手机微信中阅读 · 家长引路，孩子安全使用 AI",
    ),
}


def split_markdown_segments(text: str) -> list[tuple[str, str]]:
    """将 Markdown 拆分为纯 Markdown 片段与原始 HTML 片段。"""
    lines = text.splitlines()
    segments: list[tuple[str, str]] = []
    md_buf: list[str] = []
    html_buf: list[str] = []
    html_depth = 0

    def flush_md() -> None:
        nonlocal md_buf
        if md_buf:
            chunk = "\n".join(md_buf).strip("\n")
            if chunk.strip():
                segments.append(("md", chunk))
            md_buf = []

    for line in lines:
        stripped = line.strip()
        if html_depth == 0 and stripped.startswith("<div"):
            flush_md()
            html_buf = [line]
            html_depth = line.count("<div") - line.count("</div>")
            if html_depth == 0:
                segments.append(("html", line))
                html_buf = []
            continue

        if html_depth > 0:
            html_buf.append(line)
            html_depth += line.count("<div") - line.count("</div>")
            if html_depth == 0:
                segments.append(("html", "\n".join(html_buf)))
                html_buf = []
            continue

        md_buf.append(line)

    flush_md()
    return segments


def pandoc_markdown_to_html(markdown: str) -> str:
    result = subprocess.run(
        ["pandoc", "-f", "markdown", "-t", "html5", "--wrap=none"],
        input=markdown,
        text=True,
        capture_output=True,
        check=True,
    )
    return result.stdout.strip()


def extract_body_fragment(html: str) -> str:
    html = html.strip()
    match = re.match(r"<section[^>]*>(.*)</section>", html, re.DOTALL)
    if match:
        return match.group(1).strip()
    return html


def build_content_html(source_text: str) -> str:
    parts: list[str] = []
    for kind, chunk in split_markdown_segments(source_text):
        if kind == "html":
            parts.append(chunk)
        else:
            parts.append(extract_body_fragment(pandoc_markdown_to_html(chunk)))
    return "\n\n".join(parts)


def build_document(config: GuideExportConfig, content_html: str, css_text: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
  <meta name="format-detection" content="telephone=no">
  <title>{config.title}</title>
  <style>
{css_text}
  </style>
</head>
<body>
  <div class="page">
    <div class="export-header">
      <div class="badge">{config.badge_note}</div>
      <p>{config.header_note}</p>
      <p>可转发 PDF 到微信聊天，或用手机浏览器打开 HTML</p>
    </div>
    <article class="content {config.theme_class}">
{content_html}
    </article>
    <div class="export-footer">
      <strong>微信中使用方式</strong><br>
      1. 将 PDF 文件发送到微信聊天，点击即可全屏阅读；<br>
      2. 或将 HTML 文件发送到「文件传输助手」，用手机浏览器打开；<br>
      3. 阅读时双指缩放即可调整字号；对比卡片建议横屏查看。
    </div>
  </div>
</body>
</html>
"""


def generate_pdf(html_path: Path, pdf_path: Path) -> bool:
    engines = [
        [sys.executable, "-m", "weasyprint", str(html_path), str(pdf_path)],
        [
            "wkhtmltopdf",
            "--encoding", "utf-8",
            "--page-size", "A4",
            "--margin-top", "12mm",
            "--margin-bottom", "14mm",
            "--margin-left", "10mm",
            "--margin-right", "10mm",
            "--enable-local-file-access",
            "--print-media-type",
            "--dpi", "150",
            "--quiet",
            str(html_path),
            str(pdf_path),
        ],
    ]
    for cmd in engines:
        try:
            subprocess.run(cmd, check=True, capture_output=True)
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            continue
    print(f"警告：{pdf_path.name} PDF 生成失败。请安装 WeasyPrint：pip install weasyprint", file=sys.stderr)
    return False


def export_guide(config: GuideExportConfig, css_text: str) -> tuple[Path, bool]:
    if not config.source.exists():
        raise FileNotFoundError(f"找不到源文件 {config.source}")

    EXPORT_DIR.mkdir(parents=True, exist_ok=True)
    content_html = build_content_html(config.source.read_text(encoding="utf-8"))
    document = build_document(config, content_html, css_text)

    html_path = EXPORT_DIR / config.html_name
    pdf_path = EXPORT_DIR / config.pdf_name
    html_path.write_text(document, encoding="utf-8")
    pdf_ok = generate_pdf(html_path, pdf_path)
    return html_path, pdf_ok


def write_readme() -> None:
    README_OUT = EXPORT_DIR / "README.md"
    README_OUT.write_text(
        """# 指南 · 微信阅读版导出

本目录包含中文指南的离线阅读版本，便于在微信中转发与收藏。

## 文件说明

| 文件 | 来源 | 用途 |
| --- | --- | --- |
| `小学生AI学习助手指南.pdf` | [`primary_student_guide.md`](../docs/primary_student_guide.md) | 发到微信直接阅读 |
| `小学生AI学习助手指南.html` | 同上 | 浏览器打开，便于复制提示词 |
| `家长AI应用指南.pdf` | [`parents_guide.md`](../docs/parents_guide.md) | 发到微信直接阅读 |
| `家长AI应用指南.html` | 同上 | 浏览器打开，便于复制提示词 |

## 重新生成

```bash
# 全部导出
npm run export:wechat

# 仅小学生 / 仅家长
npm run export:primary-wechat
npm run export:parents-wechat
```

或：

```bash
python3 scripts/export-guide-wechat.py
python3 scripts/export-guide-wechat.py --guide parents
```

依赖：`pandoc`；PDF 还需 `weasyprint`（`pip install weasyprint`）。

## 微信分享建议

- **家长群 / 班级群**：优先发 PDF，兼容性最好
- **需要复制提示词**：打开 HTML，长按选中提示框中的文字复制
- 文件较大时，可先传到网盘再分享链接
""",
        encoding="utf-8",
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="导出中文指南为微信阅读版 HTML/PDF")
    parser.add_argument(
        "--guide",
        choices=["primary", "parents", "all"],
        default="all",
        help="要导出的指南（默认 all）",
    )
    args = parser.parse_args()

    if not CSS_FILE.exists():
        print(f"错误：找不到样式文件 {CSS_FILE}", file=sys.stderr)
        return 1

    css_text = CSS_FILE.read_text(encoding="utf-8")
    keys = list(GUIDES.keys()) if args.guide == "all" else [args.guide]

    for key in keys:
        config = GUIDES[key]
        html_path, pdf_ok = export_guide(config, css_text)
        print(f"已生成 HTML：{html_path}")
        if pdf_ok:
            print(f"已生成 PDF：{EXPORT_DIR / config.pdf_name}")

    write_readme()
    print(f"已生成说明：{EXPORT_DIR / 'README.md'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

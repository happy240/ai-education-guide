# 指南 · 微信阅读版导出

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

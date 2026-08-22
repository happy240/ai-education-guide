#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""兼容入口：导出小学生指南（请优先使用 export-guide-wechat.py）。"""

import subprocess
import sys
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "export-guide-wechat.py"
raise SystemExit(subprocess.call([sys.executable, str(SCRIPT), "--guide", "primary"] + sys.argv[1:]))

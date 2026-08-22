#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""导出家长指南为微信阅读版。"""

import subprocess
import sys
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "export-guide-wechat.py"
raise SystemExit(subprocess.call([sys.executable, str(SCRIPT), "--guide", "parents"] + sys.argv[1:]))

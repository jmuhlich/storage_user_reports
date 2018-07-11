#!/usr/bin/env python3.6

"""Script for producing reports that can be visualized with the web app."""

import os
import sys
import csv
from pathlib import Path
from os.path import join, getsize


def report_dir_size(path, base_path, writer, is_root=False):
    total_size = 0
    do_output = False
    try:
        entries = os.scandir(path)
    except PermissionError:
        return 0, False
    for entry in entries:
        if entry.is_dir() and not entry.is_symlink():
            dsize, doutput = report_dir_size(entry, base_path, writer)
            total_size += dsize
            do_output |= doutput
        else:
            total_size += os.lstat(entry).st_size
    total_size += os.lstat(path).st_size
    if total_size >= 2**20 or do_output or is_root:
        rel_path = str(Path(path).relative_to(base_path))
        if rel_path == '.':
            rel_path = ''
        rel_path = f'/{rel_path}'
        writer.writerow((rel_path, total_size))
        return 0, True
    else:
        return total_size, False

if __name__ == '__main__':
    if len(sys.argv) != 2:
        script_name = Path(sys.argv[0]).name
        print(f'usage: {script_name} PATH')
        print(
            'Print name and size in bytes of subdirectories at all levels'
            ' beneath PATH.\n\n'
            'Totals for parent directories are exclusive of printed child'
            ' totals.\n'
            'Directories smaller than 1 MiB are rolled up into their parent.'
        )
        sys.exit(1)
    writer = csv.writer(sys.stdout)
    writer.writerow(('path', 'size'))
    base_path = Path(sys.argv[1]).resolve()
    report_dir_size(base_path, base_path, writer, is_root=True)
    sys.exit(0)

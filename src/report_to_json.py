import sys
import os.path
import pandas as pd


def dprint(msg, depth):
    print('%s%s' % ((depth + 1) * 2 * ' ', msg))


report_path = sys.argv[1]
filename = os.path.basename(report_path)

df = pd.read_csv(report_path, skipinitialspace=True)
df = df.drop('SizeH', axis=1)
# Sentinel (see below).
df = df.append([{'DirectoryPath': '', 'SizeB': 0}]).reset_index(drop=True)

# Size output and closing braces are displayed in the lead-in to the following
# iteration, as this is the only point at which we can tell whether the
# previous row was a leaf node. So to print the final row's size and all the
# remaining closing braces we need to append an extra sentinel row that
# triggers just the right code paths. The key to the sentinel is the empty
# path, which has zero slashes and so resets the depth to zero. The size is
# never used.


print('{')
print('"name": "%s",' % filename)

prev_depth = -1
for index, row in df.iterrows():
    path = row.DirectoryPath
    depth = path.count('/')
    if depth <= prev_depth:
        dprint('"size": %d' % prev_size, prev_depth)
        dprint('}', prev_depth)
        if depth == prev_depth:
            dprint(',', prev_depth)
    if depth < prev_depth:
        for d in range(prev_depth, depth, -1):
            dprint(']', d - 1)
            dprint('}', d - 1)
        # Check for sentinel to avoid printing joining comma for last record.
        if path != '':
            dprint(',', depth)
    if depth > prev_depth:
        dprint('"children": [', prev_depth)
    # Avoid printing the sentinel row.
    if path != '':
        dprint('{', depth)
        dprint('"name": "%s",' % path.rsplit('/', 1)[-1], depth)
    prev_depth = depth
    prev_size = row.SizeB

print(']')
print('}')

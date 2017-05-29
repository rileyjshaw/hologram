#!/usr/bin/env python
"""Find scientific notation in a file and switch each occurrence to floats."""
import argparse
import re


# Example usage: `./fix_notation.py hologram.ngc hologram_fixed.ngc -p 8`
parser = argparse.ArgumentParser(description='Find scientific notation in a file and switch each occurrence to floats.')
parser.add_argument('input_file', type=str)
parser.add_argument('output_file', type=str)
parser.add_argument('-p', '--precision', type=int, default=5, help='the number of decimal places in generated floats.')
args = parser.parse_args()

SCIENTIFIC_NUMBER = r'-?(\d+\.?\d*|\.\d+)[Ee]-?\d+'


def to_float(value, precision):
    """Format a number as a decimal string with specified precision."""
    return '{value:.{precision}f}'.format(precision=args.precision, value=float(value))


def format_match(match):
    """Translate a scientific notation regex match to decimal notation."""
    return to_float(match.group(), args.precision)


with open(args.input_file, 'rt') as input_file:
    with open(args.output_file, 'wt') as output_file:
        for line in input_file:
            output_file.write(re.sub(SCIENTIFIC_NUMBER, format_match, line))

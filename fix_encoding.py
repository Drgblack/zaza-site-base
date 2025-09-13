#!/usr/bin/env python3
import re

# Read the file
with open('src/lib/ai-services.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix malformed emojis
replacements = [
    ('ðŸ§', '🧠'),  # brain
    ('ðŸ"š', '📚'),  # books
    ('ðŸ"‹', '📋'),  # clipboard
    ('ðŸŽ¯', '🎯'),  # target
    ('ðŸ"', '📝'),  # memo
    ('ðŸ"„', '🔄'),  # repeat
    ('ðŸ"Š', '📊'),  # bar chart
    ('ðŸ—ï¸', '🗓️'),  # calendar
    ('ðŸ"§', '🔧'),  # wrench
    ('ðŸ"¦', '📦'),  # package
    ('ðŸš€', '🚀'),  # rocket
    ('ðŸ'¥', '👥'),  # people
    ('ðŸ"ž', '📞'),  # phone
    ('ðŸ"…', '📅'),  # calendar
    ('ðŸ"ˆ', '📈'),  # trending up
    ('ðŸ›¡ï¸', '🛡️'),  # shield
]

for old, new in replacements:
    content = content.replace(old, new)

# Write back
with open('src/lib/ai-services.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed encoding issues in ai-services.ts")
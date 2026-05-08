import os
import glob

replacements = {
    'text-gray-400': 'text-muted-foreground',
    'text-white': 'text-foreground',
    'text-gray-300': 'text-muted-foreground',
    'text-gray-500': 'text-muted-foreground',
    'border-white/10': 'border-border',
    'border-white/20': 'border-border',
    'bg-black/40': 'bg-white/60',
    'bg-black/50': 'bg-white/80',
    'bg-white/5': 'bg-secondary/40',
    'from-white via-gray-200 to-gray-500': 'from-primary via-blue-500 to-sky-400'
}

for filepath in glob.glob('d:/googlehackthon/frontend/**/*.tsx', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

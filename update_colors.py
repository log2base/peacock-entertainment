import os
import glob

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements for transitioning to light/yellow theme
    replacements = {
        'bg-[#0c101b]': 'bg-secondary',
        'from-[#0c101b]': 'from-secondary',
        'via-[#0c101b]': 'via-secondary',
        'to-[#0c101b]': 'to-secondary',
        
        'bg-[#15202b]': 'bg-[#e6b000]',
        'bg-[#0f171e]': 'bg-[#e6b000]',
        
        'text-white/20': 'text-primary/40',
        'text-white/30': 'text-primary/50',
        'text-white/40': 'text-primary/60',
        'text-white/50': 'text-primary/70',
        'text-white/60': 'text-primary/80',
        'text-white/70': 'text-primary/90',
        'text-white/80': 'text-primary/90',
        'text-white': 'text-primary',
        
        'bg-white/5': 'bg-primary/5',
        'bg-white/10': 'bg-primary/10',
        'bg-white/20': 'bg-primary/20',
        'bg-white/30': 'bg-primary/30',
        'bg-white/50': 'bg-primary/50',
        'bg-white': 'bg-primary',
        
        'border-white/5': 'border-primary/10',
        'border-white/10': 'border-primary/20',
        'border-white/20': 'border-primary/30',
        
        'border-gray-800': 'border-primary/20',
        'text-gray-400': 'text-primary/70',
        'text-gray-200': 'text-primary/90',
        'text-gray-900': 'text-primary',
        'text-gray-500': 'text-primary/60',
        
        'bg-gradient-to-t from-black via-transparent': 'bg-gradient-to-t from-primary/80 via-transparent',
        'from-indigo-950 to-slate-900': 'from-[#f0b500] to-[#e6a000]',
    }

    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

if __name__ == '__main__':
    files = glob.glob('resources/js/**/*.jsx', recursive=True)
    for f in files:
        # Navbar already manually fixed
        if 'Navbar.jsx' not in f:
            process_file(f)

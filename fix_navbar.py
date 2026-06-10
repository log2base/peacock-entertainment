import re

with open('resources/js/Components/Navbar.jsx', 'r') as f:
    content = f.read()

content = content.replace('bg-[#0c101b]/80', 'bg-secondary/80')
content = content.replace('border-white/10', 'border-primary/10')
content = content.replace('text-white/70', 'text-primary/70')
content = content.replace('hover:text-white', 'hover:text-primary')
content = content.replace('text-white/80', 'text-primary/80')
content = content.replace('hover:bg-white/5', 'hover:bg-primary/5')
content = content.replace('bg-[#0f171e]', 'bg-[#e6b000]')
content = content.replace('bg-[#0c101b]', 'bg-secondary')
content = content.replace('bg-white', 'bg-primary')
content = content.replace('text-white/50', 'text-primary/50')
content = content.replace('text-white', 'text-primary')

with open('resources/js/Components/Navbar.jsx', 'w') as f:
    f.write(content)


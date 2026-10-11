import re
import glob

files = [
    "src/components/FinderWindow/FinderWindow.jsx",
    "src/components/ImageViewer/ImageViewer.jsx",
    "src/components/QuickTimePlayer/QuickTimePlayer.jsx"
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Let's change all import.meta.env.BASE_URL + ... to use backticks
    # Find something like: import.meta.env.BASE_URL + "NEW/McDonald's/....mp4"
    # Or import.meta.env.BASE_URL + 'NEW/McDonald"s/...mp4'
    # Or whatever mess we have.
    # The string starts after the + and ends before the comma or brace.
    def repl(m):
        # m.group(1) is the string content including quotes
        # strip all starting/ending quotes
        s = m.group(1).strip('"\'`')
        # fix any McDonald"s back to McDonald's
        s = s.replace('McDonald"s', "McDonald's")
        # return with backticks
        return f"import.meta.env.BASE_URL + `{s}`"
        
    content = re.sub(r'import\.meta\.env\.BASE_URL\s*\+\s*([\'\"\`].*?[\'\"\`])(?:,|\s*})', lambda m: repl(m) + (m.group(0)[-1] if m.group(0)[-1] in ',}' else ''), content)
    
    # Also fix name: "???.png" if it was broken
    # Since I already fixed the end quotes, let's just make sure all names use double quotes correctly
    def fix_name(m):
        name = m.group(1).strip('"\'`')
        return f'"name": "{name}"'
    content = re.sub(r'"name":\s*([\'\"\`].*?[\'\"\`])', fix_name, content)
    
    # Also fix old items that have name: 'Something' instead of "name": "Something"
    def fix_name2(m):
        name = m.group(1).strip('"\'`')
        return f'name: "{name}"'
    content = re.sub(r'name:\s*([\'\"\`].*?[\'\"\`])', fix_name2, content)

    with open(filepath, 'w') as f:
        f.write(content)

print("FIXED WITH BACKTICKS")

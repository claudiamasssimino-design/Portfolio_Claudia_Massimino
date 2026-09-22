import os
import re

directory = 'src/components'

# First pattern: JSX attributes, e.g., src="/icons..." -> src={`${import.meta.env.BASE_URL}icons...`}
jsx_pattern = re.compile(r'([a-zA-Z0-9_]+)=([\'"`])/(TVC PORTFOLIO|FOTO PORTFOLIO|icons|calendario_images)(.*?)\2')

# Second pattern: any remaining string literal starting with those folders
string_pattern = re.compile(r'([\'"`])/(TVC PORTFOLIO|FOTO PORTFOLIO|icons|calendario_images)(.*?)\1')

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            original_content = content
            
            def repl_jsx(m):
                attr = m.group(1)
                folder = m.group(3)
                rest = m.group(4)
                return f"{attr}={{import.meta.env.BASE_URL + '{folder}{rest}'}}"
            
            content = jsx_pattern.sub(repl_jsx, content)
            
            def repl_str(m):
                folder = m.group(2)
                rest = m.group(3)
                return f"import.meta.env.BASE_URL + '{folder}{rest}'"
            
            content = string_pattern.sub(repl_str, content)
            
            if content != original_content:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated {filepath}")

import os
import re

base_dir = "public/NEW/McDonald's"

def make_id(name):
    # Sanitize name to create a valid ID
    name = re.sub(r'[^a-zA-Z0-9_]', '_', name.lower())
    # condense multiple underscores
    name = re.sub(r'_+', '_', name)
    return name.strip('_')

# Recursively build VFS
# We need to output the exact structure needed for vfsData['mcdonalds']
# the keys are folder IDs. The values are arrays of items.
# 'root': [ { id: 'mcd_...', name: '...', type: 'folder' } ]

folders = {}

def scan_dir(path, folder_id):
    items = []
    
    try:
        entries = sorted(os.listdir(path))
    except:
        return
        
    for entry in entries:
        if entry.startswith('.') or entry == '.DS_Store':
            continue
            
        full_path = os.path.join(path, entry)
        rel_path = os.path.relpath(full_path, "public/")
        item_id = folder_id + "_" + make_id(entry)
        
        if os.path.isdir(full_path):
            items.append({
                'id': item_id,
                'name': entry,
                'type': 'folder'
            })
            scan_dir(full_path, item_id)
        else:
            ext = entry.split('.')[-1].lower()
            if ext in ['png', 'jpg', 'jpeg', 'webp', 'gif']:
                items.append({
                    'id': item_id,
                    'name': entry,
                    'type': 'image-viewer',
                    'src': rel_path
                })
            elif ext in ['mp4', 'mov', 'avi', 'mkv', 'webm']:
                items.append({
                    'id': item_id,
                    'name': entry,
                    'type': 'video',
                    'src': rel_path
                })
                
    folders[folder_id] = items

scan_dir(base_dir, 'mcdonalds')

# Now output the JS code
out = "    'mcdonalds': {\n"
for fid, items in folders.items():
    out += f"      '{fid}': [\n"
    for item in items:
        if item['type'] == 'folder':
            out += f"        {{ id: '{item['id']}', name: `{item['name']}`, type: 'folder' }},\n"
        else:
            out += f"        {{ id: '{item['id']}', name: `{item['name']}`, type: '{item['type']}', src: import.meta.env.BASE_URL + `{item['src']}` }},\n"
    out += "      ],\n"
# ADD the old hardcoded 'tvc' and 'ooh' to the root
out += "      'tvc': [],\n"
out += "      'ooh': [],\n"
out += "    },\n"

# Let's write this to a file so we can inspect or replace it.
with open("mcd_vfs.txt", "w") as f:
    f.write(out)

print("VFS Generated.")

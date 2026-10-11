import os
import json
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '_', text)
    return text.strip('_')

root_dir = "public/NEW/McDonald's"

vfs = {}
image_collections = {}
video_collections = {}

def process_dir(current_path, parent_id):
    items = []
    
    entries = sorted(os.listdir(current_path))
    for entry in entries:
        if entry.startswith('.'): continue
        
        full_path = os.path.join(current_path, entry)
        rel_path = os.path.relpath(full_path, "public").replace('\\', '/')
        
        if os.path.isdir(full_path):
            folder_id = f"{parent_id}_{slugify(entry)}"
            items.append({
                'id': folder_id,
                'name': entry,
                'type': 'folder'
            })
            process_dir(full_path, folder_id)
        else:
            file_id = f"{parent_id}_{slugify(entry)}"
            name = entry
            
            ext = name.split('.')[-1].lower()
            
            if ext in ['png', 'jpg', 'jpeg']:
                collection_id = parent_id
                items.append({
                    'id': file_id,
                    'name': name,
                    'type': 'image-viewer',
                    'collection': collection_id,
                    'title': os.path.basename(current_path),
                    'src': f"__URL__{rel_path}__URL__"
                })
                
                if collection_id not in image_collections:
                    image_collections[collection_id] = []
                image_collections[collection_id].append({
                    'id': file_id,
                    'src': f"__URL__{rel_path}__URL__",
                    'name': name
                })
                
            elif ext in ['mp4', 'mov']:
                collection_id = parent_id
                items.append({
                    'id': file_id,
                    'name': name,
                    'type': 'video',
                    'collection': collection_id,
                    'src': f"__URL__{rel_path}__URL__"
                })
                
                if collection_id not in video_collections:
                    video_collections[collection_id] = []
                video_collections[collection_id].append({
                    'id': file_id,
                    'src': f"__URL__{rel_path}__URL__",
                    'name': name
                })
                
    vfs[parent_id] = items

process_dir(root_dir, 'mcd')

def to_js_obj(obj):
    s = json.dumps(obj, indent=4)
    # Replace the magic token with the proper JS expression
    s = re.sub(r'"__URL__(.*?)__URL__"', r"import.meta.env.BASE_URL + `\1`", s)
    return s

# 1. UPDATE FinderWindow.jsx
finder_path = "src/components/FinderWindow/FinderWindow.jsx"
with open(finder_path, 'r') as f:
    finder_code = f.read()

new_root_items = []
for item in vfs['mcd']:
    new_root_items.append(f"        {{ id: '{item['id']}', name: '{item['name']}', type: '{item['type']}' }}")

new_root_items_str = ",\n".join(new_root_items)
target_root = "'mcdonalds': {\n      'root': [\n        { id: 'crispy', name: '01_CRISPY REVELATION', type: 'folder' }"
finder_code = finder_code.replace(
    target_root,
    target_root + ",\n" + new_root_items_str
)

mcd_vfs_keys = []
for k, v in vfs.items():
    if k == 'mcd': continue
    mcd_vfs_keys.append(f"      '{k}': " + to_js_obj(v).replace('\n', '\n      ') + ",")

mcd_vfs_str = "\n".join(mcd_vfs_keys)
finder_code = finder_code.replace(
    "'ooh': []",
    "'ooh': [],\n" + mcd_vfs_str
)

with open(finder_path, 'w') as f:
    f.write(finder_code)

# 2. UPDATE ImageViewer.jsx
image_path = "src/components/ImageViewer/ImageViewer.jsx"
with open(image_path, 'r') as f:
    image_code = f.read()

img_coll_str = ""
for k, v in image_collections.items():
    img_coll_str += f"  '{k}': " + to_js_obj(v).replace('\n', '\n  ') + ",\n"

image_code = image_code.replace(
    "const COLLECTIONS = {",
    "const COLLECTIONS = {\n" + img_coll_str
)

with open(image_path, 'w') as f:
    f.write(image_code)

# 3. UPDATE QuickTimePlayer.jsx
video_path = "src/components/QuickTimePlayer/QuickTimePlayer.jsx"
with open(video_path, 'r') as f:
    video_code = f.read()

vid_coll_str = ""
for k, v in video_collections.items():
    vid_coll_str += f"  '{k}': " + to_js_obj(v).replace('\n', '\n  ') + ",\n"

video_code = video_code.replace(
    "const VIDEO_COLLECTIONS = {",
    "const VIDEO_COLLECTIONS = {\n" + vid_coll_str
)

with open(video_path, 'w') as f:
    f.write(video_code)

print("INJECTION COMPLETE")

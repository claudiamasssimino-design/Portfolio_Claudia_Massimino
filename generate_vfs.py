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
                    'src': f"import.meta.env.BASE_URL + '{rel_path}'"
                })
                
                if collection_id not in image_collections:
                    image_collections[collection_id] = []
                image_collections[collection_id].append({
                    'id': file_id,
                    'src': f"import.meta.env.BASE_URL + '{rel_path}'",
                    'name': name
                })
                
            elif ext in ['mp4', 'mov']:
                collection_id = parent_id
                items.append({
                    'id': file_id,
                    'name': name,
                    'type': 'video',
                    'collection': collection_id,
                    'src': f"import.meta.env.BASE_URL + '{rel_path}'"
                })
                
                if collection_id not in video_collections:
                    video_collections[collection_id] = []
                video_collections[collection_id].append({
                    'id': file_id,
                    'src': f"import.meta.env.BASE_URL + '{rel_path}'",
                    'name': name
                })
                
    vfs[parent_id] = items

process_dir(root_dir, 'mcdonalds_new')

# print JSON strings but with unquoted src values
def to_js_obj(obj):
    s = json.dumps(obj, indent=2)
    s = re.sub(r'"src":\s*"import.meta.env.BASE_URL \+ \'([^\']+)\'"', r"src: import.meta.env.BASE_URL + '\1'", s)
    # remove quotes from keys for cleaner JS
    s = re.sub(r'"([^"]+)":', r'\1:', s)
    return s

print("===== VFS DATA =====")
print(to_js_obj(vfs))
print("\n===== IMAGE COLLECTIONS =====")
print(to_js_obj(image_collections))
print("\n===== VIDEO COLLECTIONS =====")
print(to_js_obj(video_collections))

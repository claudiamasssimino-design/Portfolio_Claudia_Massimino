import json, os, re

BASE = "public/NEW/McDonald's"

def sanitize_id(path):
    s = path.replace(BASE + '/', '').replace('/', '_').replace(' ', '_').replace('-', '_')
    s = re.sub(r'[^a-zA-Z0-9_]', '', s)
    return 'mcd_' + s.lower()

def get_file_type(name):
    ext = name.lower().split('.')[-1]
    if ext in ('mp4', 'mov', 'webm'):
        return 'video'
    return 'image-viewer'

def scan_dir(dirpath):
    subfolders = []
    files = []
    try:
        entries = sorted(os.listdir(dirpath))
    except:
        return subfolders, files
    for entry in entries:
        if entry.startswith('.'):
            continue
        full = os.path.join(dirpath, entry)
        if os.path.isdir(full):
            subfolders.append(entry)
        elif os.path.isfile(full):
            ext = entry.lower().split('.')[-1] if '.' in entry else ''
            if ext in ('mp4', 'mov', 'webm', 'png', 'jpg', 'jpeg'):
                files.append(entry)
    return subfolders, files

def build_vfs(root_dir):
    vfs = {}
    def process_dir(dirpath, folder_id):
        subfolders, files = scan_dir(dirpath)
        items = []
        for sf in subfolders:
            sf_path = os.path.join(dirpath, sf)
            sf_id = sanitize_id(sf_path)
            items.append({'id': sf_id, 'name': sf, 'type': 'folder'})
            process_dir(sf_path, sf_id)
        for f in files:
            f_id = sanitize_id(os.path.join(dirpath, f))
            rel_path = os.path.join(dirpath, f).replace('public/', '')
            ftype = get_file_type(f)
            items.append({'id': f_id, 'name': f, 'type': ftype, 'src_path': rel_path})
        vfs[folder_id] = items
    process_dir(root_dir, 'root')
    return vfs

new_vfs = build_vfs(BASE)

def item_to_js(item, indent=8):
    sp = ' ' * indent
    if item['type'] == 'folder':
        return f"{sp}{{ id: '{item['id']}', name: '{item['name']}', type: 'folder' }}"
    else:
        src_expr = f"import.meta.env.BASE_URL + `{item['src_path']}`"
        return f"{sp}{{ id: '{item['id']}', name: `{item['name']}`, type: '{item['type']}', src: {src_expr} }}"

# === UPDATE ImageViewer.jsx ===
iv_path = "src/components/ImageViewer/ImageViewer.jsx"
with open(iv_path, 'r') as f:
    iv_content = f.read()

new_collections = []
for folder_id, items in new_vfs.items():
    if folder_id == 'root':
        continue
    media_items = [i for i in items if i['type'] in ('image-viewer', 'video')]
    if media_items:
        col_lines = [f"  '{folder_id}': ["]
        for item in media_items:
            src_expr = f"import.meta.env.BASE_URL + `{item['src_path']}`"
            col_lines.append(f"    {{ id: '{item['id']}', name: `{item['name']}`, type: '{item['type']}', src: {src_expr} }},")
        col_lines.append("  ],")
        new_collections.append('\n'.join(col_lines))

# Add crispy TVC collection
new_collections.append("""  'mcd_crispy_tvc': [
    { id: 'v1', name: 'McD_Crispy_15sec_Club.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Club.mp4' },
    { id: 'v2', name: 'McD_Crispy_15sec_Corsa.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Corsa.mp4' },
    { id: 'v3', name: 'McD_Crispy_15sec_Famiglia.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Famiglia.mp4' },
    { id: 'v4', name: 'McD_Crispy_15sec_Ufficio.mp4', type: 'video', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Ufficio.mp4' },
  ],""")

# Insert before "'pastelli':" 
insert_marker = "  'pastelli': ["
insert_idx = iv_content.index(insert_marker)
new_collections_str = '\n'.join(new_collections) + '\n'
iv_content = iv_content[:insert_idx] + new_collections_str + '  ' + iv_content[insert_idx:]

with open(iv_path, 'w') as f:
    f.write(iv_content)
print("IMAGE VIEWER COLLECTIONS UPDATED")

# === UPDATE QuickTimePlayer.jsx ===
qt_path = "src/components/QuickTimePlayer/QuickTimePlayer.jsx"
with open(qt_path, 'r') as f:
    qt_content = f.read()

qt_new_collections = []
for folder_id, items in new_vfs.items():
    if folder_id == 'root':
        continue
    video_items = [i for i in items if i['type'] == 'video']
    if video_items:
        qt_lines = [f"  '{folder_id}': ["]
        for item in video_items:
            src_expr = f"import.meta.env.BASE_URL + `{item['src_path']}`"
            name = item['name'].rsplit('.', 1)[0]
            qt_lines.append(f"    {{ id: '{item['id']}', src: {src_expr}, name: `{name}` }},")
        qt_lines.append("  ],")
        qt_new_collections.append('\n'.join(qt_lines))

qt_new_collections.append("""  'mcd_crispy_tvc': [
    { id: 'v1', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Club.mp4', name: 'McD_Crispy_15sec_Club' },
    { id: 'v2', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Corsa.mp4', name: 'McD_Crispy_15sec_Corsa' },
    { id: 'v3', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Famiglia.mp4', name: 'McD_Crispy_15sec_Famiglia' },
    { id: 'v4', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Ufficio.mp4', name: 'McD_Crispy_15sec_Ufficio' },
  ],""")

qt_insert_marker = "};\n\nexport default function QuickTimePlayer"
qt_insert_idx = qt_content.index(qt_insert_marker)
qt_new_str = '\n'.join(qt_new_collections) + '\n'
qt_content = qt_content[:qt_insert_idx] + qt_new_str + qt_content[qt_insert_idx:]

# Add adaptive window sizing
old_state = """  const videoRef = useRef(null);
  const hideControlsTimeout = useRef(null);"""

new_state = """  const videoRef = useRef(null);
  const hideControlsTimeout = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 1035, height: 635 });

  // Adapt window size to video dimensions
  const handleVideoMetadata = (e) => {
    const video = e.target;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;
    
    const aspect = vw / vh;
    const MAX_W = Math.min(1200, window.innerWidth * 0.85);
    const MAX_H = Math.min(900, window.innerHeight * 0.85);
    const MIN_W = 400;
    const MIN_H = 400;
    
    let w = vw;
    let h = vh + 38;
    
    if (w > MAX_W || h > MAX_H) {
      if (aspect > MAX_W / MAX_H) {
        w = MAX_W;
        h = (MAX_W / aspect) + 38;
      } else {
        h = MAX_H;
        w = (MAX_H - 38) * aspect;
      }
    }
    
    if (w < MIN_W) { w = MIN_W; h = (MIN_W / aspect) + 38; }
    if (h < MIN_H) { h = MIN_H; w = (MIN_H - 38) * aspect; }
    
    setWindowSize({ width: Math.round(w), height: Math.round(h) });
    setDuration(video.duration);
  };"""

qt_content = qt_content.replace(old_state, new_state)

# Replace fixed dimensions
qt_content = qt_content.replace(
    "      width={1035}\n      height={635}",
    "      width={windowSize.width}\n      height={windowSize.height}"
)

# Replace old handleLoadedMetadata
old_metadata = """  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };"""
if old_metadata in qt_content:
    qt_content = qt_content.replace(old_metadata, "")

# Replace onLoadedMetadata reference
qt_content = qt_content.replace(
    "onLoadedMetadata={handleLoadedMetadata}",
    "onLoadedMetadata={handleVideoMetadata}"
)

with open(qt_path, 'w') as f:
    f.write(qt_content)
print("QUICKTIME PLAYER UPDATED WITH ADAPTIVE SIZING")

print("ALL DONE")

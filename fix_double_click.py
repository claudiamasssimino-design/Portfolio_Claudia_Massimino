import re

filepath = "src/components/FinderWindow/FinderWindow.jsx"
with open(filepath, 'r') as f:
    content = f.read()

target = """      } else if (item.type === 'folder') {
        navigateTo([...currentPath, item.id]);"""

replacement = """      } else if (item.type === 'folder') {
        const folderContents = vfs[item.id] || [];
        const hasSubfolders = folderContents.some(child => child.type === 'folder');
        if (folderContents.length > 0 && !hasSubfolders) {
          const firstItem = folderContents[0];
          if (onOpenFile) {
            onOpenFile({ type: firstItem.type, collection: firstItem.collection || item.id, title: item.name, src: firstItem.src });
          }
        } else {
          navigateTo([...currentPath, item.id]);
        }"""

content = content.replace(target, replacement)

with open(filepath, 'w') as f:
    f.write(content)

print("FIXED DOUBLE CLICK")

import re

css_path = "src/components/FinderWindow/FinderWindow.css"
with open(css_path, 'r') as f:
    css_content = f.read()

# Replace .finder-segmented-items
items_pattern = r"\.finder-segmented-items\s*\{[^}]+\}"
items_new = """.finder-segmented-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  width: 100%;
  height: 19px;
  z-index: 1;
}"""
css_content = re.sub(items_pattern, items_new, css_content)

# Replace .finder-segmented-btn
btn_pattern = r"\.finder-segmented-btn\s*\{[^}]+\}"
btn_new = """.finder-segmented-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 18px;
  height: 19px;
  border-radius: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #000000;
}"""
css_content = re.sub(btn_pattern, btn_new, css_content)

# Replace .finder-segmented-btn svg
svg_pattern = r"\.finder-segmented-btn\s+svg\s*\{[^}]+\}"
svg_new = """.finder-segmented-btn svg {
  width: 100%;
  height: 100%;
}"""
css_content = re.sub(svg_pattern, svg_new, css_content)

# Replace .finder-segmented-divider-container
div_cont_pattern = r"\.finder-segmented-divider-container\s*\{[^}]+\}"
div_cont_new = """.finder-segmented-divider-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 19px;
  z-index: 2;
}"""
css_content = re.sub(div_cont_pattern, div_cont_new, css_content)

# Replace .finder-segmented-divider
div_pattern = r"\.finder-segmented-divider\s*\{[^}]+\}"
div_new = """.finder-segmented-divider {
  width: 1px;
  height: 14px;
  background: rgba(0, 0, 0, 0.15);
}"""
css_content = re.sub(div_pattern, div_new, css_content)

# Update width in wrapper if needed
wrap_pattern = r"\.finder-segmented-control-wrapper\s*\{[^}]+\}"
wrap_new = """.finder-segmented-control-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  isolation: isolate;
  position: relative;
  width: 65px;
  height: 36px;
  margin-right: 12px;
}"""
css_content = re.sub(wrap_pattern, wrap_new, css_content)

with open(css_path, 'w') as f:
    f.write(css_content)

print("DONE")

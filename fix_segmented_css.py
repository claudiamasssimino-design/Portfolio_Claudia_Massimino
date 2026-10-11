import os

css_path = "src/components/FinderWindow/FinderWindow.css"
with open(css_path, 'r') as f:
    css_content = f.read()

# Replace .finder-segmented-bg and .finder-segmented-glass
import re

bg_pattern = r"\.finder-segmented-bg\s*\{[^}]+\}"
bg_new = """.finder-segmented-bg {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 100px;
  z-index: 0;
}"""

glass_pattern = r"\.finder-segmented-glass\s*\{[^}]+\}"
glass_new = """.finder-segmented-glass {
  display: none;
}"""

css_content = re.sub(bg_pattern, bg_new, css_content)
css_content = re.sub(glass_pattern, glass_new, css_content)

# Optional: Fix margin gap between title and segmented control
# The user asked: "correggi gli errori di visualizzazione correggendo l'ombra, padding e gap in modo che visivamente siano come i bottoni in alto a destra."
# The right buttons have `padding: 4px;` in `.finder-toolbar-button-group`.
# The `.finder-segmented-control-wrapper` already has `padding: 4px; height: 36px;`

with open(css_path, 'w') as f:
    f.write(css_content)

print("DONE")

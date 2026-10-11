import re
import os

jsx_path = "src/components/FinderWindow/FinderWindow.jsx"
with open(jsx_path, 'r') as f:
    content = f.read()

# Replace state initialization
state_old = "  const [currentPath, setCurrentPath] = React.useState(['root']);"
state_new = """  const [history, setHistory] = React.useState([['root']]);
  const [historyIndex, setHistoryIndex] = React.useState(0);
  const currentPath = history[historyIndex];

  const navigateTo = (newPath) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, newPath];
    });
    setHistoryIndex(prev => prev + 1);
  };"""
content = content.replace(state_old, state_new)

# Replace navigation
content = content.replace("setCurrentPath(prev => [...prev, item.id]);", "navigateTo([...currentPath, item.id]);")

# Replace handleBack and add handleForward
back_old = """  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(prev => prev.slice(0, -1));
    }
  };"""
back_new = """  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
    }
  };"""
content = content.replace(back_old, back_new)

# Add SVG icons for ChevronLeft and ChevronRight in Icons
icons_old = "const Icons = {"
icons_new = """const Icons = {
  ChevronLeft: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,"""
content = content.replace(icons_old, icons_new)

# Add HTML for segmented control
html_old = """          <div className="finder-toolbar-title">
            <div className="finder-toolbar-title-text">{title}</div>
          </div>"""
html_new = """          <div className="finder-segmented-control-wrapper">
            <div className="finder-segmented-control">
              <button 
                className={`finder-segmented-btn ${historyIndex === 0 ? 'disabled' : ''}`}
                onClick={handleBack}
              >
                <Icons.ChevronLeft />
              </button>
              <div className="finder-segmented-divider"></div>
              <button 
                className={`finder-segmented-btn ${historyIndex === history.length - 1 ? 'disabled' : ''}`}
                onClick={handleForward}
              >
                <Icons.ChevronRight />
              </button>
            </div>
          </div>
          
          <div className="finder-toolbar-title">
            <div className="finder-toolbar-title-text">{title}</div>
          </div>"""
content = content.replace(html_old, html_new)

with open(jsx_path, 'w') as f:
    f.write(content)

css_path = "src/components/FinderWindow/FinderWindow.css"
with open(css_path, 'r') as f:
    css_content = f.read()

# Add CSS for segmented control
new_css = """
/* Segmented Control (Forward/Back) */
.finder-segmented-control-wrapper {
  margin-left: 10px;
  margin-right: 12px; /* 50% less space between buttons and title */
  display: flex;
  align-items: center;
}

.finder-segmented-control {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 24px; /* match the button group on the right */
  background: rgba(248, 248, 248, 0.2);
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  overflow: hidden;
}

.finder-segmented-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #333;
  width: 32px;
  height: 100%;
  cursor: default;
  padding: 0;
  margin: 0;
}

.finder-segmented-btn:active:not(.disabled) {
  background: rgba(0, 0, 0, 0.05);
}

.finder-segmented-btn.disabled {
  color: rgba(0, 0, 0, 0.3);
}

.finder-segmented-divider {
  width: 1px;
  height: 14px;
  background: rgba(0, 0, 0, 0.1);
}
"""
if ".finder-segmented-control" not in css_content:
    with open(css_path, 'a') as f:
        f.write(new_css)

print("DONE")

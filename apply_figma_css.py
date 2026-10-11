import os

jsx_path = "src/components/FinderWindow/FinderWindow.jsx"
with open(jsx_path, 'r') as f:
    jsx_content = f.read()

html_old = """          <div className="finder-segmented-control-wrapper">
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
          </div>"""

html_new = """          <div className="finder-segmented-control-wrapper">
            <div className="finder-segmented-bg"></div>
            <div className="finder-segmented-glass"></div>
            <div className="finder-segmented-items">
              <button 
                className={`finder-segmented-btn ${historyIndex === 0 ? 'disabled' : ''}`}
                onClick={handleBack}
              >
                <Icons.ChevronLeft />
              </button>
              <div className="finder-segmented-divider-container">
                <div className="finder-segmented-divider"></div>
              </div>
              <button 
                className={`finder-segmented-btn ${historyIndex === history.length - 1 ? 'disabled' : ''}`}
                onClick={handleForward}
              >
                <Icons.ChevronRight />
              </button>
            </div>
          </div>"""

jsx_content = jsx_content.replace(html_old, html_new)
with open(jsx_path, 'w') as f:
    f.write(jsx_content)

css_path = "src/components/FinderWindow/FinderWindow.css"
with open(css_path, 'r') as f:
    css_content = f.read()

css_old = """/* Segmented Control (Forward/Back) */
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
}"""

css_new = """/* Segmented Control (Forward/Back) */
.finder-segmented-control-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  isolation: isolate;
  position: relative;
  width: 69px;
  height: 36px;
  margin-right: 12px;
}

.finder-segmented-bg {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: linear-gradient(0deg, rgba(248, 248, 248, 0.2), rgba(248, 248, 248, 0.2)), linear-gradient(0deg, rgba(68, 68, 68, 0.6), rgba(68, 68, 68, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), rgba(0, 0, 0, 0.25);
  background-blend-mode: luminosity, plus-lighter, normal, normal;
  box-shadow: 1.25px 0px 0px -0.75px #D0D0D0, -1.25px 0px 0px -0.75px #D0D0D0, 0px 0px 0px 0.5px #E8E8E8, 0px 8px 15px rgba(0, 0, 0, 0.02);
  border-radius: 1000px;
  z-index: 0;
}

.finder-segmented-glass {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #FFFFFF;
  background-blend-mode: multiply;
  box-shadow: inset 0px 40px 10px -40px #282828, inset 0px -40px 10px -40px #282828, inset 0px 40px 30px -40px #E6E6E6;
  border-radius: 1000px;
  z-index: 0;
  pointer-events: none;
}

.finder-segmented-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 61px;
  height: 28px;
  z-index: 1;
}

.finder-segmented-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 4px;
  width: 32px;
  height: 28px;
  mix-blend-mode: plus-darker;
  border-radius: 100px;
  margin: 0px -3px;
  border: none;
  background: transparent;
  cursor: default;
}

.finder-segmented-btn svg {
  width: 9.44px;
  height: 16.43px;
  color: #000000;
}

.finder-segmented-btn.disabled {
  opacity: 0.3;
}

.finder-segmented-divider-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 1px;
  gap: 10px;
  width: 3px;
  height: 20px;
  margin: 0px -3px;
  z-index: 2;
}

.finder-segmented-divider {
  width: 1px;
  height: 20px;
  background: #D9D9D9;
  mix-blend-mode: plus-darker;
}"""

if css_old in css_content:
    css_content = css_content.replace(css_old, css_new)
else:
    print("WARNING: css_old not found")

with open(css_path, 'w') as f:
    f.write(css_content)

print("DONE")

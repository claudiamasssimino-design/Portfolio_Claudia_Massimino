import re

filepath = "src/components/ImageViewer/ImageViewer.jsx"
with open(filepath, 'r') as f:
    content = f.read()

# 1. Add isVideo flag and refactor useEffect
target_useeffect = """  useEffect(() => {
    if (initialWidth && initialHeight) {
      setWindowSize({ width: initialWidth, height: initialHeight });
      return;
    }

    if (collection === 'pastelli') {
      setWindowSize({ width: 810, height: 567 });
      return;
    }

    // When image changes, load it to get natural dimensions
    const img = new Image();
    img.src = currentSrc;
    img.onload = () => {
      // Calculate best window size based on natural aspect ratio
      const naturalAspect = img.naturalWidth / img.naturalHeight;
      const MAX_WIDTH = Math.min(1200, window.innerWidth * 0.85);
      const MAX_HEIGHT = Math.min(950, window.innerHeight * 0.85);
      const MIN_WIDTH = 500;
      const MIN_HEIGHT = 500;

      let newWidth = img.naturalWidth;
      let newHeight = img.naturalHeight + 38; // add titlebar height

      // Scale down if too large
      if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) {
        if (naturalAspect > (MAX_WIDTH / MAX_HEIGHT)) {
          newWidth = MAX_WIDTH;
          newHeight = (MAX_WIDTH / naturalAspect) + 38;
        } else {
          newHeight = MAX_HEIGHT;
          newWidth = (MAX_HEIGHT - 38) * naturalAspect;
        }
      }

      // Scale up if too small
      if (newWidth < MIN_WIDTH || newHeight < MIN_HEIGHT) {
        if (naturalAspect < (MIN_WIDTH / MIN_HEIGHT)) {
          newHeight = MIN_HEIGHT;
          newWidth = (MIN_HEIGHT - 38) * naturalAspect;
        } else {
          newWidth = MIN_WIDTH;
          newHeight = (MIN_WIDTH / naturalAspect) + 38;
        }
      }

      setWindowSize({ width: Math.round(newWidth), height: Math.round(newHeight) });
    };
  }, [currentSrc, initialWidth, initialHeight, collection]);"""

replacement_useeffect = """  const isVideo = currentSrc.match(/\.(mp4|mov|webm)$/i);

  useEffect(() => {
    if (initialWidth && initialHeight) {
      setWindowSize({ width: initialWidth, height: initialHeight });
      return;
    }

    if (collection === 'pastelli') {
      setWindowSize({ width: 810, height: 567 });
      return;
    }

    const calculateAndSetSize = (width, height) => {
      const naturalAspect = width / height;
      const MAX_WIDTH = Math.min(1200, window.innerWidth * 0.85);
      const MAX_HEIGHT = Math.min(950, window.innerHeight * 0.85);
      const MIN_WIDTH = 500;
      const MIN_HEIGHT = 500;

      let newWidth = width;
      let newHeight = height + 38; // add titlebar height

      if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) {
        if (naturalAspect > (MAX_WIDTH / MAX_HEIGHT)) {
          newWidth = MAX_WIDTH;
          newHeight = (MAX_WIDTH / naturalAspect) + 38;
        } else {
          newHeight = MAX_HEIGHT;
          newWidth = (MAX_HEIGHT - 38) * naturalAspect;
        }
      }

      if (newWidth < MIN_WIDTH || newHeight < MIN_HEIGHT) {
        if (naturalAspect < (MIN_WIDTH / MIN_HEIGHT)) {
          newHeight = MIN_HEIGHT;
          newWidth = (MIN_HEIGHT - 38) * naturalAspect;
        } else {
          newWidth = MIN_WIDTH;
          newHeight = (MIN_WIDTH / naturalAspect) + 38;
        }
      }

      setWindowSize({ width: Math.round(newWidth), height: Math.round(newHeight) });
    };

    if (isVideo) {
      const video = document.createElement('video');
      video.src = currentSrc;
      video.onloadedmetadata = () => {
        calculateAndSetSize(video.videoWidth, video.videoHeight);
      };
    } else {
      const img = new Image();
      img.src = currentSrc;
      img.onload = () => {
        calculateAndSetSize(img.naturalWidth, img.naturalHeight);
      };
    }
  }, [currentSrc, initialWidth, initialHeight, collection, isVideo]);"""

content = content.replace(target_useeffect, replacement_useeffect)

# 2. Add video tag to thumbnail
target_thumb = """                  <img src={img.src} className="iv-sidebar-thumb" alt={img.name} draggable="false" />"""
replacement_thumb = """                  {img.src.match(/\\.(mp4|mov|webm)$/i) ? (
                    <video src={img.src} className="iv-sidebar-thumb" style={{ objectFit: 'cover' }} />
                  ) : (
                    <img src={img.src} className="iv-sidebar-thumb" alt={img.name} draggable="false" />
                  )}"""

content = content.replace(target_thumb, replacement_thumb)


# 3. Add video tag to player area
target_player = """        <div className="iv-player-area">
          <img 
            className="iv-image-element"
            src={currentSrc}
            alt={currentImageName}
            draggable="false"
            style={collection === 'pastelli' ? { 
              transform: 'rotate(-90deg)',
              width: `${windowSize.height - 38}px`,
              height: `${windowSize.width}px`
            } : {}}
          />
        </div>"""

replacement_player = """        <div className="iv-player-area">
          {isVideo ? (
             <video 
               className="iv-image-element"
               src={currentSrc}
               controls
               autoPlay
               style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
             />
          ) : (
            <img 
              className="iv-image-element"
              src={currentSrc}
              alt={currentImageName}
              draggable="false"
              style={collection === 'pastelli' ? { 
                transform: 'rotate(-90deg)',
                width: `${windowSize.height - 38}px`,
                height: `${windowSize.width}px`
              } : {}}
            />
          )}
        </div>"""

content = content.replace(target_player, replacement_player)

with open(filepath, 'w') as f:
    f.write(content)

print("IMAGE VIEWER REFACTORED TO SUPPORT VIDEO")

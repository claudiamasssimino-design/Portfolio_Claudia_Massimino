# Media Viewers — Protected Components (DO NOT MODIFY)

The following components and files are **locked** and must NOT be modified unless the user **explicitly requests** a change to them:

## Protected Files

- `src/components/ImageViewer/ImageViewer.jsx`
- `src/components/ImageViewer/ImageViewer.css`
- `src/components/QuickTimePlayer/QuickTimePlayer.jsx`
- `src/components/QuickTimePlayer/QuickTimePlayer.css`

## What This Covers

- Any logic related to **video playback** (play, pause, toggle, scrubber, time tracking, autoplay, `useEffect` dependencies)
- Any logic related to **image rendering** (sizing, rotation, object-fit, layout)
- The **`isVideo` detection** logic and how media type is determined
- The **`togglePlay`** function and all event handlers attached to video controls
- The **transparent overlay** used for click detection on videos
- The **window sizing / `calculateAndSetSize`** logic for media
- The **sidebar** navigation between images and videos within a collection

## Why

These components went through extensive debugging to reach a stable state. In particular:
- `isVideo` must use `.test()` (returns a boolean), NOT `.match()` (returns a new array each render, breaking React `useEffect` dependency checks)
- `togglePlay` must not be attached to parent containers that would cause double-toggle via event bubbling
- Video control buttons must have `tabIndex={-1}` to prevent spacebar ghost clicks
- The `useEffect` that auto-plays videos depends on `[currentSrc, isVideo]` and must not be modified

## Rule

If a task requires changes that would touch any of these files or any of the structures listed above, **stop and ask the user for explicit confirmation** before proceeding.

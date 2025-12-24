# AR Marker Files

## What are AR Markers?

AR markers are special images that the AR system can recognize and track. When the camera sees these markers, 3D content appears over the marker.

## How to Use Markers

### Option 1: Use Built-in Hiro Marker
The Hiro marker is already built into AR.js and doesn't need a separate file. You can use it for testing.

### Option 2: Create Custom Markers
1. Visit: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. Upload your image (should be high contrast, simple design)
3. Download the generated .patt file
4. Place it in this directory

### Option 3: Use QR Codes
QR codes can also be used as markers. QR codes are more reliable and easier to scan.

## Marker Design Tips

- Use black and white images (works best)
- Keep patterns simple and avoid too much detail or noise
- Test markers in different lighting conditions
- Print markers at a reasonable size (at least 10cm x 10cm)

## Testing Markers

1. Print the marker image
2. Open the AR navigation page
3. Point your camera at the marker
4. The 3D content should appear over the marker

## Troubleshooting

If markers aren't being recognized:

- Ensure good lighting
- Hold the camera steady
- Make sure the marker is fully in frame
- Try moving closer or further from the marker
- Check that the marker is flat and not distorted

## Available Markers

Currently, the project uses the built-in Hiro marker for testing. Custom markers can be added to this directory.

## Download Hiro Marker

You can download the Hiro marker from:
https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

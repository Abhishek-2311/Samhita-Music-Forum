# Gallery Images

Organize your gallery images by category in this folder.

## Folder Structure

Create subfolders for each category, for example:
- `student-performances/` - Photos of student performances
- `events/` - Event photos
- `classes/` - Class session photos
- `awards/` - Award ceremonies and achievements

## How to Add Images

1. Create a folder for each category (e.g., `public/gallery/student-performances/`)
2. Add your images to the respective category folder
3. Update the `galleryPhotos` array in `components/gallery-section.tsx` with your images

## Image Format

Supported formats: JPG, JPEG, PNG, WebP

Recommended:
- Aspect ratio: 4:3 or 16:9
- Max file size: 2MB per image
- Resolution: 1200px width or larger for best quality

## Example Structure

```
public/gallery/
  ├── student-performances/
  │   ├── performance1.jpg
  │   ├── performance2.jpg
  │   └── ...
  ├── events/
  │   ├── event1.jpg
  │   └── ...
  └── classes/
      ├── class1.jpg
      └── ...
```


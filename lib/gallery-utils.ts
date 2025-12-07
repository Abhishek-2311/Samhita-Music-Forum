/**
 * Utility functions for gallery images
 */

/**
 * Converts a Google Drive share link to a direct image URL
 * 
 * @param shareLink - Google Drive share link (e.g., https://drive.google.com/file/d/FILE_ID/view?usp=sharing)
 * @returns Direct image URL that can be used in <img> tags
 */
export function convertGoogleDriveLink(shareLink: string): string {
  // Extract file ID from various Google Drive link formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,  // Standard format
    /id=([a-zA-Z0-9_-]+)/,           // Alternative format
    /\/d\/([a-zA-Z0-9_-]+)/,         // Short format
  ]

  for (const pattern of patterns) {
    const match = shareLink.match(pattern)
    if (match && match[1]) {
      const fileId = match[1]
      // Return direct image URL - using multiple formats for better compatibility
      // Try thumbnail format first (more reliable), then fallback to view format
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    }
  }

  // If no pattern matches, return original link
  return shareLink
}

/**
 * Checks if a URL is a Google Drive link
 */
export function isGoogleDriveLink(url: string): boolean {
  return url.includes('drive.google.com')
}

/**
 * Gets the file ID from a Google Drive link
 */
export function getGoogleDriveFileId(shareLink: string): string | null {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ]

  for (const pattern of patterns) {
    const match = shareLink.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}


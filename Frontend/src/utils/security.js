// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed file types with MIME types
export const ALLOWED_FILE_TYPES = {
  'image/jpeg': '.jpeg,.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'video/mp4': '.mp4',
  'video/webm': '.webm',
  'audio/mpeg': '.mp3',
  'audio/wav': '.wav',
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'text/plain': '.txt'
};

/**
 * Sanitizes text input to prevent XSS attacks
 * @param {string} text - The text to sanitize
 * @returns {string} Sanitized text
 */
export const sanitizeInput = (text) => {
  if (!text) return '';
  
  // Create a temporary div element
  const div = document.createElement('div');
  // Set the text content (browser will escape HTML)
  div.textContent = text;
  // Get the sanitized HTML
  return div.innerHTML;
};

/**
 * Validates a file against allowed types and size
 * @param {File} file - The file to validate
 * @returns {{isValid: boolean, error?: string}} Validation result
 */
export const validateFile = (file) => {
  // Check if file exists
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: `File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
    };
  }

  // Check file type
  if (!ALLOWED_FILE_TYPES[file.type]) {
    const allowedExtensions = Object.values(ALLOWED_FILE_TYPES).join(',');
    return { 
      isValid: false, 
      error: `Invalid file type. Allowed types: ${allowedExtensions}` 
    };
  }

  return { isValid: true };
};

/**
 * Gets the accepted file input attribute string
 * @returns {string} Comma-separated list of allowed file extensions
 */
export const getAllowedFileExtensions = () => {
  return Object.values(ALLOWED_FILE_TYPES).join(',');
};

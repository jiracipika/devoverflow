import React, { useMemo, useCallback } from 'react';
import { FaSpinner, FaExclamationTriangle, FaFileDownload } from 'react-icons/fa';
import { sanitizeInput } from '../utils/security';

// Helper function to safely render HTML content
const createMarkup = (html) => ({
  __html: sanitizeInput(html)
});

const MessageBox = ({
  text = '',
  isSending = false,
  type = 'text',
  file,
  isLocal = false,
  error,
  timestamp = new Date().toISOString()
}) => {

  const formattedTime = useMemo(() => {
    try {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Invalid timestamp:', timestamp, e);
      return '';
    }
  }, [timestamp]);

  const handleDownload = useCallback(() => {
    if (!file?.data) return;

    try {
      const link = document.createElement('a');
      link.href = file.data;
      link.download = file.name || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }, [file]);

   // Render file preview based on type
  const renderFilePreview = () => {
    if (!file) return null;

    const { name, type: fileType, preview, data, isUploading } = file;
    
    // Show loading state
    if (isUploading || isSending) {
      return (
        <div className="flex items-center gap-2 p-2 bg-white bg-opacity-50 rounded-lg">
          <FaSpinner className="animate-spin text-blue-500" />
          <span className="text-sm text-gray-600">Uploading {name}...</span>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">Failed to upload {name}</p>
          <p className="text-red-500 text-xs">{error}</p>
        </div>
      );
    }

    // Get file extension
    const extension = name.split('.').pop()?.toLowerCase();
    
    // Determine file type category
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
    const isVideo = ['mp4', 'mov', 'avi', 'webm'].includes(extension);
    const isAudio = ['mp3', 'wav', 'ogg', 'm4a'].includes(extension);
    const isDocument = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension);
    
    // Create appropriate preview
    switch (true) {
      case isImage:
        return (
          <div className="relative group">
            <img 
              src={preview || data} 
              alt={name} 
              className="max-w-[200px] max-h-[200px] object-cover rounded-lg hover:opacity-90 transition-opacity"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
              {name}
            </div>
          </div>
        );
      case isVideo:
        return (
          <div className="relative">
            <video 
              src={preview || data} 
              className="max-w-[200px] rounded-lg"
              controls
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
              {name}
            </div>
          </div>
        );
      case isAudio:
        return (
          <div className="bg-white p-3 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-800 mb-2 truncate">{name}</p>
            <audio 
              src={preview || data} 
              className="w-full"
              controls
            />
          </div>
        );
      case isDocument:
        return (
          <a 
            href={data} 
            download={name}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-2 bg-blue-100 rounded-md">
              <span className="text-blue-600 text-xl">📄</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
              <p className="text-xs text-gray-500">
                {Math.round(file.size / 1024)} KB • {extension.toUpperCase()}
              </p>
            </div>
            <span className="text-blue-600 text-sm font-medium">Download</span>
          </a>
        );
      default:
        return (
          <a 
            href={data} 
            download={name}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-2 bg-gray-100 rounded-md">
              <span className="text-gray-600 text-xl">📎</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
              <p className="text-xs text-gray-500">
                {Math.round(file.size / 1024)} KB • {extension ? extension.toUpperCase() : 'FILE'}
              </p>
            </div>
            <span className="text-blue-600 text-sm font-medium">Download</span>
          </a>
        );
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-3 mb-4 ${isSending ? 'flex-row-reverse' : ''}`}>
      <div className='flex-shrink-0'>
        <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
          {isSending ? '👤' : '👥'}
        </div>
      </div>
      
      <div className={`max-w-[80%] flex flex-col gap-1 ${isSending ? 'items-end' : 'items-start'}`}>
        {type === 'file' ? (
          <div className={`rounded-lg overflow-hidden ${isSending ? 'ml-auto' : 'mr-auto'}`}>
            {renderFilePreview()}
          </div>
        ) : (
          <div 
            className={`px-4 py-2 rounded-lg ${isSending 
              ? 'bg-blue-500 text-white rounded-tr-none' 
              : 'bg-white text-gray-800 rounded-tl-none'}`}
          >
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
        )}
        
        <div className={`text-xs text-gray-500 flex items-center gap-1 ${isSending ? 'flex-row-reverse' : ''}`}>
          {formatTimestamp(timestamp)}
          {isLocal && <span className="text-blue-500">• Sending</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
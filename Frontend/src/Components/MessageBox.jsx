import React, { useCallback } from 'react';
import { FaSpinner, FaExclamationTriangle, FaFileDownload } from 'react-icons/fa';

const MessageBox = ({
  text = '',
  isSending = false,
  type = 'text',
  file,
  isLocal = false,
  error,
  timestamp = new Date().toISOString()
}) => {

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
          <div className="flex items-center gap-2 text-red-600">
            <FaExclamationTriangle />
            <span>Failed to upload {name}</span>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
      case isImage && preview:
        return (
          <div className="relative group">
            <img 
              src={preview} 
              alt={name} 
              className="max-h-64 max-w-full rounded-lg border border-gray-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '';
                e.target.parentElement.innerHTML = renderGenericFilePreview();
              }}
            />
            <button 
              onClick={handleDownload}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg"
              aria-label="Download image"
            >
              <FaFileDownload className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
              {name}
            </div>
          </div>
        );
      case isVideo:
        return (
          <div className="relative">
            <video 
              src={data} 
              className="max-h-64 max-w-full rounded-lg border border-gray-200"
              controls
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
              {name}
            </div>
            <button 
              onClick={handleDownload}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full"
              aria-label="Download video"
            >
              <FaFileDownload />
            </button>
          </div>
        );
      case isAudio:
        return (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <audio controls src={data} className="flex-1" />
            <button 
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Download audio"
            >
              <FaFileDownload />
            </button>
          </div>
        );
      case isDocument:
        return (
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100"
            onClick={handleDownload}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl text-blue-500">
                {getFileIcon(extension)}
              </div>
              <div className="truncate max-w-xs">
                <p className="font-medium text-gray-900 truncate">{name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)} • {extension.toUpperCase()}</p>
              </div>
            </div>
            <FaFileDownload className="text-gray-400" />
          </div>
        );
      default:
        return renderGenericFilePreview();
    }
  };

  // Helper function to render a generic file preview
  const renderGenericFilePreview = useCallback(() => {
    if (!file) return null;
    
    return (
      <div 
        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100"
        onClick={handleDownload}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl text-gray-500">
            📄
          </div>
          <div className="truncate max-w-xs">
            <p className="font-medium text-gray-900 truncate">{file.name}</p>
            <p className="text-xs text-gray-500">
              {formatFileSize(file.size)}
              {file.type && ` • ${file.type.split('/').pop().toUpperCase()}`}
            </p>
          </div>
        </div>
        <FaFileDownload className="text-gray-400" />
      </div>
    );
  })

  // Get appropriate icon for file type
  const getFileIcon = (extension) => {
    const icons = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      xls: '📊',
      xlsx: '📊',
      ppt: '📑',
      pptx: '📑',
      txt: '📄',
    };
    return icons[extension.toLowerCase()] || '📁';
  };

   // Format file size
   const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
              : 'bg-white text-gray-800 rounded-tl-none'}`
            }
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

export default React.memo(MessageBox);
import React, { useState, useMemo } from 'react'
import { useMessages } from '../context/MessageContext'
import attachment_icon from '../assets/Images/attach.png'

const FilePreview = ({ file, onRemove }) => {
  const previewUrl = useMemo(() => {
    if (!file) return null;
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  if (!file) return null;

  return (
    <div className="file-preview-container">
      <div className="file-preview">
        {previewUrl ? (
          <div className="image-preview">
            <img 
              src={previewUrl} 
              alt={file.name} 
              className="preview-image"
              onLoad={() => URL.revokeObjectURL(previewUrl)}
            />
          </div>
        ) : (
          <div className="file-info">
            <span className="file-icon">📄</span>
            <span className="file-name">{file.name}</span>
          </div>
        )}
        <button 
          type="button"
          onClick={onRemove}
          className="remove-file"
          aria-label="Remove file"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const MessageInput = () => {
  const [messageText, setMessageText] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { addMessage, addFile, currentChat } = useMessages();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    // Reset file input
    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim() && !file) return;

    setUploading(true);

    try {
      if (file) {
        await addFile(file);
        handleRemoveFile();
      }

      if (messageText.trim()) {
        const newMessage = {
          text: messageText,
          isSending: true,
          timestamp: new Date().toISOString(),
          chatId: currentChat?.id
        };
        addMessage(newMessage);
        setMessageText('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="message-input-container">
      {file && <FilePreview file={file} onRemove={handleRemoveFile} />}
      
      <form onSubmit={handleSubmit} className='h-[50px] bg-[white] p-[10px] flex items-center justify-between' alt='input'>
        <div className='flex items-center gap-[10px]'>
          <input 
            type="file" 
            id="file" 
            style={{display:"none"}} 
            onChange={handleFileChange}
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          />
          <label htmlFor="file" className='cursor-pointer'>
            <img className='h-[24px] w-[24px]' src={attachment_icon} alt="Attach" />
          </label>
        </div>
        
        <input 
          className='flex-1 border-none outline-none text-[#2f2d52] text-[18px] px-[10px]' 
          type="text" 
          placeholder='Type Something...'
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          disabled={uploading}
        />
        
        <button 
          type="submit"
          className='border-none px-[15px] py-2.5 text-[white] bg-[#8da4f1] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!messageText.trim() && !file}
        >
          {uploading ? 'Sending...' : 'Send'}
        </button>
      </form>
      
      <style jsx>{`
        .message-input-container {
          width: 100%;
          position: relative;
        }
        .file-preview-container {
          background: #f5f5f5;
          padding: 10px;
          border-bottom: 1px solid #eee;
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          z-index: 10;
          max-height: 200px;
          overflow-y: auto;
        }
        .file-preview {
          position: relative;
          display: inline-block;
          max-width: 100%;
          margin: 5px 0;
        }
        .image-preview {
          max-height: 150px;
          overflow: hidden;
          border-radius: 4px;
          border: 1px solid #ddd;
          background: white;
          padding: 4px;
        }
        .preview-image {
          max-width: 100%;
          max-height: 140px;
          display: block;
          margin: 0 auto;
        }
        .file-info {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          max-width: 100%;
          box-sizing: border-box;
        }
        .file-icon {
          font-size: 1.2em;
          flex-shrink: 0;
        }
        .file-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 30px);
        }
        .remove-file {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff4d4f;
          color: white;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          line-height: 1;
          padding: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .remove-file:hover {
          background: #ff7875;
        }
      `}</style>
    </div>
  );
};

export default MessageInput;
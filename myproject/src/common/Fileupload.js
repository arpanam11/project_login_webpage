import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper } from '@mui/material';

const Fileupload = ({ onChange, image }) => {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(image);

  useEffect(() => {
    // Update the preview when the `image` prop changes
    setPreview(image);
  }, [image]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    onChange(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Paper
        style={{
          padding: '20px',
          textAlign: 'center',
          border: dragging ? '2px dashed #3f51b5' : '2px dashed #ccc',
          backgroundColor: dragging ? '#f0f0f0' : '#fff',
          position: 'relative'
        }}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <Typography variant="h6" gutterBottom>
          Drag & Drop your file here or click to select
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          component="label"
          style={{
            backgroundImage: preview ? `url(${preview})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '5px',
            width: '100%',
            height: '140px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black'
          }}
        >
          { !preview && 'Upload Image' }
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileSelect}
          />
        </Button>
      </Paper>
    </div>
  );
};

export default Fileupload;

import { ChangeEvent, DragEvent, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

export type DragAndDropProps = {
    onUpload: (file: File) => void;
};

export function UploadConfig({ onUpload }: DragAndDropProps) {
    const [highlight, setHighlight] = useState(false);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onUpload(event.target.files[0]);
        }
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
        setHighlight(true);
    };

    const handleDragLeave = () => {
        setHighlight(false);
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer.items) {
            const item = event.dataTransfer.items[0];
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file) {
                    onUpload(file);
                }
            }
        }
        setHighlight(false);
    };

    return (
        <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                border: highlight ? '2px dashed #3f51b5' : '2px solid transparent',
                padding: 20,
            }}
        >
            <input hidden id='fileUploader' type='file' onChange={handleFileUpload} multiple />
            <label htmlFor='fileUploader'>
                <Button variant='contained' component='span'>
                    Upload Config
                </Button>
            </label>
            <Typography sx={{ m: 2 }}>or drag an drop file here.</Typography>
        </Box>
    );
}

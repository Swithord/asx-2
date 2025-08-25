import React, { useState } from 'react';
import { uploadImage } from '../utils/postnews';

interface ImageUploaderProps {
    onUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & { files: FileList };
    }

    const handleFileChange = async (e: FileChangeEvent): Promise<void> => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);

        try {
            const imageUrl: string = await uploadImage(file);
            setPreviewUrl(URL.createObjectURL(file)); // for local preview
            onUpload(imageUrl); // pass the S3 URL up to parent
        } catch (err) {
            alert('Upload failed.');
            console.error(err);
        }

        setIsUploading(false);
    };

    return (
        <div className="mb-3">
            <label htmlFor="imageUpload" className="form-label">Upload an image</label>
            <input
                className="form-control"
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleFileChange}
            />
            {isUploading && <div className="form-text text-warning">Uploading...</div>}
            {previewUrl && (
                <div className="mt-2">
                    <img src={previewUrl} alt="Preview" className="img-thumbnail" style={{ maxWidth: '300px' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;

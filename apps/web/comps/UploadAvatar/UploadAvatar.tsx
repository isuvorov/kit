import { apiClient } from '@rckit/api-client';
import { Avatar } from '@rckit/avatar';
import React, { forwardRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

import styles from './UploadAvatar.module.css';

interface UploadAvatarProps {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  onChange?: (value: string) => void;
}

export const UploadAvatar = forwardRef(
  ({ firstName, lastName, avatar = '', onChange }: UploadAvatarProps) => {
    const [image, setImage] = useState<string>(avatar);
    const [error, setError] = useState<string | null>(null);
    const [dragged, setDragged] = useState<boolean>(false);
    const { getRootProps, getInputProps, open } = useDropzone({
      accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg'],
      },
      multiple: false,
      validator: (file) => {
        if (!file?.size) return null;
        if ((file?.size || 0) / 1024 / 1024 > 10) {
          return {
            code: 'size-too-large',
            message: `File size is larger than 10mb`,
          };
        }
        return null;
      },
      noClick: true,
      noKeyboard: true,
      onDragEnter: () => setDragged(true),
      onDragLeave: () => setDragged(false),
      onDropRejected: (fileRejections) => {
        setDragged(false);
        if (fileRejections.length > 1) {
          return setError('Please upload only one file');
        }
        if (fileRejections[0].errors[0].code === 'size-too-large') {
          return setError('File size is larger than 10mb');
        }
        return null;
      },
      onDrop: async (acceptedFiles) => {
        if (!acceptedFiles[0]) return;
        setError(null);
        setDragged(false);

        const { FormData } = window;
        const formData = new FormData();
        acceptedFiles.forEach((item) => {
          formData.append('file', item);
        });
        try {
          await apiClient
            .request<any, any>({
              method: 'post',
              url: '/api/upload',
              data: formData,
            })
            .then((res) => {
              const { url } = res.data[0] || {};
              if (!url) throw new Error('No fileUrl');
              setImage(url);
              if (onChange) onChange(url);
            });
        } catch (err) {
          setError('Something went wrong. Please try again.');
          console.error(err);
        }
      },
    });
    const fullName = `${firstName || ''} ${lastName || ''}`.trim();
    return (
      <div className={styles.wrapper} {...getRootProps()}>
        {dragged ? (
          <div className={styles.dragged}>Drop the files here...</div>
        ) : (
          <>
            <input {...getInputProps()} />
            <Avatar name={fullName} src={image} size={128} />
            <div className={styles.innerWrapper}>
              <Button variant="light" size="lg" onClick={open}>
                Upload image
              </Button>
              <div>Images under 10MB. Format .png or .jpg. You can drag a file into this area</div>
              {error && <div className={styles.error}>{error}</div>}
            </div>
          </>
        )}
      </div>
    );
  },
);

UploadAvatar.displayName = 'UploadAvatar';

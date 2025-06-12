import React, { useState } from 'react';
import styles from './Files.module.css';

const Files: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles([...files, ...Array.from(event.target.files)]);
        }
    };

    const handleDelete = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.filesContainer}>
            <h1 className={styles.title}>File Upload</h1>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className={styles.fileInput}
            />
            <ul className={styles.fileList}>
                {files.map((file, index) => (
                    <li key={index} className={styles.fileItem}>
                        <div className={styles.fileDetails}>
                            <span className={styles.fileName}>{file.name}</span>
                            {file.type.startsWith('image/') ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className={styles.filePreview}
                                />
                            ) : file.type.startsWith('text/') || file.type === 'application/pdf' ? (
                                <iframe
                                    src={URL.createObjectURL(file)}
                                    title={file.name}
                                    className={styles.filePreview}
                                ></iframe>
                            ) : (
                                <a
                                    href={URL.createObjectURL(file)}
                                    download={file.name}
                                    className={styles.fileDownload}
                                >
                                    Download {file.name}
                                </a>
                            )}
                        </div>
                        <button
                            onClick={() => handleDelete(index)}
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Files;
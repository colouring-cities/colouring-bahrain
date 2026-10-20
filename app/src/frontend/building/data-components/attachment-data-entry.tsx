import React, { useRef, useState } from 'react';

import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';
import { CloseIcon } from '../../components/icons';

interface AttachmentDataEntryProps extends BaseDataEntryProps {
    value: string[];
    accept?: string;
    /**
     * Persist selected files immediately (same behaviour as the side-panel "Save edits" button).
     * Receives the merged attachment list after pending files are applied.
     */
    onUploadSave?: (slug: string, value: string[] | null) => void;
    /** Retain the selected file contents for a later combined submission. */
    onFilesUploaded?: (slug: string, files: File[]) => void;
}

/**
 * File picker with a dedicated Upload button (disabled until a file is selected).
 * Upload saves through onUploadSave when provided, otherwise falls back to onChange.
 */
const AttachmentDataEntry: React.FunctionComponent<AttachmentDataEntryProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [pendingNames, setPendingNames] = useState<string[]>([]);
    const values = props.value ?? [];
    const isDisabled = props.mode === 'view' || props.disabled;
    const canUpload = !isDisabled && pendingNames.length > 0;

    const onFileSelect = (files: FileList | null) => {
        if (!files || files.length === 0) {
            setPendingNames([]);
            return;
        }
        setPendingNames(Array.from(files).map(f => f.name).filter(Boolean));
    };

    const clearPending = () => {
        setPendingNames([]);
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!canUpload) return;

        const selectedFiles = inputRef.current?.files
            ? Array.from(inputRef.current.files)
            : [];
        const merged = Array.from(new Set([...values, ...pendingNames]));
        const nextValue = merged.length ? merged : null;

        if (props.onUploadSave) {
            props.onUploadSave(props.slug, nextValue);
        } else if (props.onChange) {
            props.onChange(props.slug, nextValue);
        }
        if (selectedFiles.length && props.onFilesUploaded) {
            props.onFilesUploaded(props.slug, selectedFiles);
        }

        clearPending();
    };

    const remove = (index: number) => {
        if (!props.onChange) return;
        const next = values.slice();
        next.splice(index, 1);
        props.onChange(props.slug, next.length ? next : null);
    };

    return (
        <>
            <DataTitleCopyable
                slug={props.slug}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || values.length === 0}
                copy={props.copy}
            />
            <p className="data-intro" style={{ marginTop: 0, marginBottom: '0.5rem' }}>
                Please upload any supporting documents, plans, photos or recordings
            </p>
            {!isDisabled && (
                <>
                    <div className="input-group" style={{ marginBottom: '0.5rem' }}>
                        <input
                            ref={inputRef}
                            id={props.slug}
                            type="file"
                            multiple
                            accept={props.accept}
                            className="form-control"
                            disabled={isDisabled}
                            onChange={(e) => onFileSelect(e.target.files)}
                        />
                    </div>
                    <div className="buttons-container with-space" style={{ marginBottom: '0.75rem' }}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={!canUpload}
                            aria-disabled={!canUpload}
                            title={canUpload ? 'Upload selected file(s)' : 'Select a file to enable upload'}
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                    </div>
                </>
            )}
            {values.length === 0 ? (
                <div className="input-group">
                    <input className="form-control no-entries" type="text" value="No attachments" disabled={true} />
                </div>
            ) : (
                <ul className="data-entry-list">
                    {values.map((name, index) => (
                        <li key={`${name}-${index}`} className="input-group">
                            <input className="form-control" type="text" value={name} disabled={true} />
                            {!isDisabled && (
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark"
                                        title="Remove"
                                        onClick={() => remove(index)}
                                    >
                                        <CloseIcon />
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default AttachmentDataEntry;

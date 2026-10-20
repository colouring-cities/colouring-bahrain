import React, { Fragment, useState } from 'react';
import withCopyEdit from '../data-container';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import AttachmentDataEntry from '../data-components/attachment-data-entry';

const InvestmentEngagementView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    const [engagementIntent, setEngagementIntent] = useState<boolean | null>(null);
    const [submissionFiles, setSubmissionFiles] = useState<Record<string, File[]>>({});
    const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const hasExistingEngagement = !!(
        props.building.engagement_full_name ||
        props.building.engagement_ownership_evidence ||
        (props.building.engagement_attachments && props.building.engagement_attachments.length)
    );

    const showEngagementFields = engagementIntent === true || hasExistingEngagement;
    const queuedFileCount = Object.values(submissionFiles).reduce((total, files) => total + files.length, 0);

    const retainUploadedFiles = (slug: string, files: File[]) => {
        setSubmissionFiles(current => {
            const merged = [...(current[slug] ?? []), ...files];
            const unique = merged.filter((file, index, all) =>
                all.findIndex(candidate =>
                    candidate.name === file.name &&
                    candidate.size === file.size &&
                    candidate.lastModified === file.lastModified
                ) === index
            );
            return { ...current, [slug]: unique };
        });
        setSubmitState('idle');
        setSubmitMessage('');
    };

    const submitEngagement = async () => {
        if (queuedFileCount === 0 || submitState === 'sending') return;

        setSubmitState('sending');
        setSubmitMessage('');
        const formData = new FormData();
        formData.append('fullName', props.building.engagement_full_name ?? '');
        for (const file of submissionFiles.engagement_ownership_evidence ?? []) {
            formData.append('ownershipEvidence', file);
        }
        for (const file of submissionFiles.engagement_attachments ?? []) {
            formData.append('attachments', file);
        }

        try {
            if (props.edited) props.onSaveEdits();
            const response = await fetch(`/api/buildings/${props.building.building_id}/engagement-submit`, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin',
            });
            const result = await response.json();
            if (!response.ok || result.error) {
                throw new Error(result.error || 'Submission could not be sent');
            }
            setSubmissionFiles({});
            setSubmitState('sent');
            setSubmitMessage('Submitted successfully.');
        } catch (error) {
            setSubmitState('error');
            setSubmitMessage(error instanceof Error ? error.message : 'Submission could not be sent');
        }
    };

    return (
        <Fragment>
            <DataEntryGroup name="Investment" collapsed={subcat==null || subcat!="1"}>
                <InfoBox type="warning">
                    This section is under development.
                </InfoBox>
            </DataEntryGroup>

            <DataEntryGroup name="Engagement" collapsed={subcat==null || subcat!="2"}>
                <p className="data-intro">
                    Do you have any information you would like to Verify about this building?
                </p>
                <div className="btn-group btn-group-toggle" style={{ marginBottom: '0.75rem' }}>
                    <button
                        type="button"
                        className={`btn ${engagementIntent === true || (engagementIntent === null && hasExistingEngagement) ? 'btn-primary' : 'btn-outline-dark'}`}
                        disabled={props.mode === 'view'}
                        onClick={() => setEngagementIntent(true)}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        className={`btn ${engagementIntent === false ? 'btn-primary' : 'btn-outline-dark'}`}
                        disabled={props.mode === 'view'}
                        onClick={() => setEngagementIntent(false)}
                    >
                        No
                    </button>
                </div>
                {showEngagementFields ? (
                    <>
                        <DataEntry
                            title={dataFields.engagement_full_name.title}
                            slug="engagement_full_name"
                            value={props.building.engagement_full_name}
                            tooltip={dataFields.engagement_full_name.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <AttachmentDataEntry
                            title="Property Ownership / Supporting Evidence (CPR)"
                            slug="engagement_ownership_evidence"
                            value={
                                props.building.engagement_ownership_evidence
                                    ? [String(props.building.engagement_ownership_evidence)]
                                    : null
                            }
                            tooltip={dataFields.engagement_ownership_evidence.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={(slug, value) => {
                                const names = Array.isArray(value) ? value : null;
                                props.onChange(slug, names && names.length ? names.join(', ') : null);
                            }}
                            onUploadSave={(slug, value) => {
                                const names = Array.isArray(value) ? value : null;
                                props.onSaveEdits({
                                    [slug]: names && names.length ? names.join(', ') : null,
                                });
                            }}
                            onFilesUploaded={retainUploadedFiles}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.mp3,.mp4,.mov,.wav"
                        />
                        <AttachmentDataEntry
                            title={dataFields.engagement_attachments.title}
                            slug="engagement_attachments"
                            value={props.building.engagement_attachments}
                            tooltip={dataFields.engagement_attachments.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            onUploadSave={(slug, value) => {
                                props.onSaveEdits({ [slug]: value });
                            }}
                            onFilesUploaded={retainUploadedFiles}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.mp3,.mp4,.mov,.wav"
                        />
                        {props.mode !== 'view' && (
                            <>
                                <div className="buttons-container with-space">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        disabled={queuedFileCount === 0 || submitState === 'sending'}
                                        onClick={submitEngagement}
                                    >
                                        {submitState === 'sending' ? 'Submitting…' : 'Submit'}
                                    </button>
                                </div>
                                {submitMessage && (
                                    <p
                                        className={submitState === 'sent' ? 'text-success' : 'text-danger'}
                                        role="status"
                                    >
                                        {submitMessage}
                                    </p>
                                )}
                            </>
                        )}
                    </>
                ) : null}
            </DataEntryGroup>
        </Fragment>
    );
};
const InvestmentEngagementContainer = withCopyEdit(InvestmentEngagementView);

export default InvestmentEngagementContainer;

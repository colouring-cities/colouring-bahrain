import { transporter } from './email';

const RECIPIENT = 'colouringbahrain@culture.gov.bh';

interface EngagementSubmission {
    buildingId: number;
    fullName?: string;
    ownershipEvidence: Express.Multer.File[];
    attachments: Express.Multer.File[];
}

async function sendEngagementSubmission(submission: EngagementSubmission): Promise<void> {
    const allFiles = [...submission.ownershipEvidence, ...submission.attachments];
    const describeFiles = (files: Express.Multer.File[]) =>
        files.length ? files.map(file => `- ${file.originalname}`).join('\n') : '- None';

    await transporter.sendMail({
        to: RECIPIENT,
        from: process.env.MAIL_FROM || process.env.MAIL_SERVER_USER || 'no-reply@colouringbahrain.org',
        subject: `Engagement submission for building ${submission.buildingId}`,
        text: [
            `Building ID: ${submission.buildingId}`,
            `Submitted by: ${submission.fullName || 'Not provided'}`,
            '',
            'Property ownership / supporting evidence (CPR):',
            describeFiles(submission.ownershipEvidence),
            '',
            'Attachments:',
            describeFiles(submission.attachments),
        ].join('\n'),
        attachments: allFiles.map(file => ({
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype,
        })),
    });
}

export {
    sendEngagementSubmission,
};

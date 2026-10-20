import express from 'express';
import multer from 'multer';
import path from 'path';

import buildingController from '../controllers/buildingController';

const router = express.Router();
const requireSignedIn = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.session.user_id) {
        return res.status(401).send({ error: 'Must be logged in' });
    }
    next();
};
const allowedAttachmentExtensions = new Set([
    '.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif', '.webp',
    '.mp3', '.mp4', '.mov', '.wav',
]);
const engagementUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 10,
        fileSize: 20 * 1024 * 1024,
    },
    fileFilter: (_req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        callback(null, allowedAttachmentExtensions.has(extension));
    },
});


// GET buildings
// not implemented - may be useful to GET all buildings, paginated

// GET buildings at point
router.get('/locate', buildingController.getBuildingsByLocation);

// GET buildings by reference (UPRN/TOID or other identifier)
router.get('/reference', buildingController.getBuildingsByReference);

router.get('/revision', buildingController.getLatestRevisionId);

router.route('/:building_id.json')
    // GET individual building
    .get(buildingController.getBuildingById)
    // POST building updates
    .post(buildingController.updateBuildingById);


// GET building UPRNs
router.get('/:building_id/uprns.json', buildingController.getBuildingUPRNsById);

router.get('/:building_id/planning_data.json', buildingController.getBuildingPlanningDataById);

// POST verify building attribute
router.route('/:building_id/verify.json')
    .get(buildingController.getUserVerifiedAttributes)
    .post(buildingController.verifyBuildingAttributes);

router.post(
    '/:building_id/engagement-submit',
    requireSignedIn,
    engagementUpload.fields([
        { name: 'ownershipEvidence', maxCount: 5 },
        { name: 'attachments', maxCount: 5 },
    ]),
    buildingController.submitEngagement
);

router.route('/:building_id/history.json')
    .get(buildingController.getBuildingEditHistoryById);

export default router;

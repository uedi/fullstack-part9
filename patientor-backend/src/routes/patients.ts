import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).json(patientService.getNonSentitiveAll());
});

export default router;
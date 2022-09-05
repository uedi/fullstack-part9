import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).json(patientService.getNonSentitiveAll());
});

router.post('/', (req, res) => {
    try {
        const newPatientData = toNewPatient(req.body);
        const newPatient = patientService.add(newPatientData);
        return res.status(200).send(newPatient);
    } catch(error: unknown) {
        const errorMsg = (error instanceof Error) ? error.message : 'Unknown error occured.';
        return res.status(400).send(errorMsg);
    }
});

export default router;
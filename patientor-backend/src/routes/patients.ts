import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).json(patientService.getNonSentitiveAll());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if(!patient) {
        return res.status(404).end();
    }
    return res.status(200).send(patient);
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

router.post('/:id/entries', (req, res) => {
    try {
        const newEntryData = toNewEntry(req.body);
        const newEntry = patientService.addEntry(req.params.id, newEntryData);
        return res.status(200).send(newEntry);
    } catch(error: unknown) {
        const errorMsg = (error instanceof Error) ? error.message : 'Unknown error occured.';
        return res.status(400).send(errorMsg);
    }
});

export default router;
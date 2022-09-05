import patientsData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getNonSentitiveAll = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const add = (patientData: NewPatient): Patient => {
    const newPatient: Patient = {
        id: uuid(),
        ...patientData
    };
    patients.push(newPatient);
    return newPatient;
};

export default { getNonSentitiveAll, add };
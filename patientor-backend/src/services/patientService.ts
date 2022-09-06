import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

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

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

export default { getNonSentitiveAll, add, findById };
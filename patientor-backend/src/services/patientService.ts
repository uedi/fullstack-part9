import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewEntry, NewPatient, NonSensitivePatient, Patient, Entry } from '../types';

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

const addEntry = (id: string, entryData: NewEntry): Entry => {
    const newEntry: Entry = {
        id: uuid(),
        ...entryData
    };
    const patientIndex = patients.findIndex((p => p.id === id));
    if(patientIndex < 0) {
        throw new Error('Unknown patient');
    }
    patients[patientIndex].entries.push(newEntry);
    return newEntry;
}

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

export default { getNonSentitiveAll, add, findById, addEntry };
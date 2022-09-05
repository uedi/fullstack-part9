import patientsData from '../../data/patients.json';
import { NonSensitivePatient, Patient } from '../types';

const patients: Array<Patient> = patientsData;

const getNonSentitiveAll = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

export default { getNonSentitiveAll };
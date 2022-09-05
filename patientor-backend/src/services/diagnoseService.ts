import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getAll = (): Array<Diagnose> => {
    return diagnoses;
};

export default { getAll };
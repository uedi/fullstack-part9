import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseString = (str: unknown): string => {
    if(!str || !isString(str)) {
        throw new Error('Invalid or missing argument: ' + str);
    }
    return str;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date) ) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    const ssnStr = parseString(ssn);
    if(ssnStr.length !== 11) {
        throw new Error('Invalid ssn: ' + ssnStr);
    }
    return ssnStr;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender: any): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Invalid gender: ' + gender);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    };
    return newPatient;
};

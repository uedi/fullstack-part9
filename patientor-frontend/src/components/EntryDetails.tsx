import React from "react";
import { Entry, HealthCheckEntry } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, yellow, red } from '@mui/material/colors';
import { useStateValue } from "../state";

const DiagnoseDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [{ diagnoses },] = useStateValue();
    return (
        <>
            <div>diagnose by {entry.specialist}</div>
            { entry.diagnosisCodes && 
                <ul>
                {entry.diagnosisCodes.map((code, index) => (
                    <li key={index}>{code} {diagnoses && diagnoses[code] ? diagnoses[code].name : ''}</li>
                ))}
                </ul>
            }
        </>
    );
};

const HospitalEntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <div>{entry.date} <LocalHospitalIcon /></div>
            <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
            <DiagnoseDetails entry={entry} />
        </div>
    );
};

const OccupationalEntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <div>{entry.date} <HealthAndSafetyIcon /></div>
            <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
            <DiagnoseDetails entry={entry} />
        </div>
    );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <div>
            <div>{entry.date} <MedicalInformationIcon /> </div>
            <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
            { entry.healthCheckRating === 0 && <FavoriteIcon sx={{ color: green[500] }} /> }
            { (entry.healthCheckRating === 1 || entry.healthCheckRating === 2) && <FavoriteIcon sx={{ color: yellow[500] }} /> }
            { entry.healthCheckRating === 3 && <FavoriteIcon sx={{ color: red[500] }} /> }
            <DiagnoseDetails entry={entry} />
        </div>
    );
};
/*
<div>{entry.date} {entry.description}</div>
                    <ul>
                    {entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => (
                        <li key={index}>{code} {diagnoses && diagnoses[code] ? diagnoses[code].name : ''}</li>
                    ))}
                    </ul>
*/
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const assertNever = (value: never): never => {
        throw new Error(`Unhandled entry: ${JSON.stringify(value)}`);
    };
    
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryDetails entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalEntryDetails entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntryDetails entry={entry} />;
        default:
            return assertNever(entry);
        }
};

export default EntryDetails;
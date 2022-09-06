import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    
    React.useEffect(() => {
        const fetchPatientData = async (pid: string) => {
            try {
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${pid}`
                );
                dispatch(updatePatient(patientData));
            } catch(error) {
                console.log(error);
            }
        };
        if(id && patients[id] && !patients[id].ssn) {
            void fetchPatientData(id);
        }
    }, [id, patients, dispatch]);

    const patient = id && patients[id] ? patients[id] : undefined;

    const patientInfo = () => (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h2>{patient?.name}</h2>
                <div style={{ width: 10 }} />
                {patient?.gender === Gender.Male && <MaleIcon /> }
                {patient?.gender === Gender.Female && <FemaleIcon /> }
                {patient?.gender === Gender.Other && <TransgenderIcon /> }
            </div>
            <div>ssn: {patient?.ssn ? patient?.ssn : ''}</div>
            <div>occupation: {patient?.occupation}</div>
            <h3>entries</h3>
            {patient && patient?.entries?.map(entry => (
                <div key={entry.id}>
                    <div>{entry.date} {entry.description}</div>
                    <ul>
                    {entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => (
                        <li key={index}>{code} {diagnoses && diagnoses[code] ? diagnoses[code].name : ''}</li>
                    ))}
                    </ul>
                </div>
                
                
            ))}
        </div>
    );

    return (
        <div>
            { !patient && <div style={{ marginTop: "1em" }}>unknown patient</div>}
            { patient && patientInfo() }
        </div>
    );
};

export default PatientPage;
import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Entry, Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import EntryDetails from "../components/EntryDetails";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import { HospitalEntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: HospitalEntryFormValues) => {
        const entryData = { ...values, type: 'Hospital'};
        try {
            const patient = id && patients[id] ? patients[id] : undefined;
            if(patient && id) {
                const { data: savedEntryData } = await axios.post<Entry>(
                    `${apiBaseUrl}/patients/${id}/entries`,
                    entryData
                );
                patient.entries.push(savedEntryData);
                dispatch(updatePatient(patient));
            }
            closeModal();
        } catch(error) {
            console.log(error);
        }
    };

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
                <div key={entry.id} style={{
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'black',
                    padding: 20,
                    borderRadius: 5,
                    marginBottom: 10
                }}>
                    <EntryDetails entry={entry} />
                </div>
            ))}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
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
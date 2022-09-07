import React from "react";
import { Grid, Button } from "@material-ui/core";
import { useStateValue } from "../state";
import { Field, Formik, Form } from "formik";
import { TextField } from '../AddPatientModal/FormField';
import { HealthCheckEntry, 
    OccupationalHealthcareEntry, 
    HospitalEntry } from '../types';
import { DiagnosisSelection } from '../AddPatientModal/FormField';

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id' | 'type'>;
export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, 'id' | 'type'>;
export type HospitalEntryFormValues = Omit<HospitalEntry, 'id' | 'type'>;
export type EntryFormValues =
    | HealthCheckEntryFormValues
    | OccupationalHealthcareEntryFormValues
    | HospitalEntryFormValues;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

const initialHospitalEntryValues = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    discharge: {
        date: '',
        criteria: ''
    }
};

const isValidDate = (date: string): boolean => {
    if(date.length !== 10) {
        return false;
    }
    return Boolean(Date.parse(date));
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={initialHospitalEntryValues}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = 'Field is required';
                const errors:
                    | { [field: string]: string }
                    | { [key: string]: { [key: string]: string}} = {};
                if(!values.description) {
                    errors.description = requiredError;
                }
                if(!values.date || !isValidDate(values.date) ) {
                    errors.date = requiredError;
                }
                if(values.date && !isValidDate(values.date)) {
                    errors.date = 'Date must be in format yyyy.mm.dd';
                }
                if(!values.specialist) {
                    errors.specialist = requiredError;
                }
                if(!values.discharge.criteria && !values.discharge.date) {
                    errors.discharge = { criteria: requiredError, date: requiredError };
                }
                if(!values.discharge.criteria) {
                    errors.discharge = { criteria: requiredError };
                }
                if(!values.discharge.date) {
                    errors.discharge = { date: requiredError };
                }
                if(values.discharge.date && !isValidDate(values.discharge.date)) {
                    errors.discharge = { date: 'Date must be in format yyyy.mm.dd' };
                }
                return errors;
            }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
                <Form className='form ui'>
                    <Field
                        label='Description'
                        placeholder='description'
                        name='description'
                        component={TextField}
                    />
                    <Field
                        label='Date'
                        placeholder='yyyy.mm.dd'
                        name='date'
                        component={TextField}
                    />
                    <Field
                        label='Specialist'
                        placeholder='specialist'
                        name='specialist'
                        component={TextField}
                    />
                    <Field
                        label='Discharge date'
                        placeholder='yyyy.mm.dd'
                        name='discharge.date'
                        component={TextField}
                    />
                    <Field
                        label='Discharge criteria'
                        placeholder='discharge criteria'
                        name='discharge.criteria'
                        component={TextField}
                    />
                    <DiagnosisSelection
                        diagnoses={Object.values(diagnoses)}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                    />   
                    <Grid>
                        <Grid item>
                            <Button
                                color="secondary"
                                variant="contained"
                                style={{ float: "left" }}
                                type="button"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                style={{
                                    float: "right",
                                }}
                                type="submit"
                                variant="contained"
                                disabled={!dirty || !isValid}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            );
        }}
        </Formik>
    );
};

export default AddEntryForm;
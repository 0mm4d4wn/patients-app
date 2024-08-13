import React from "react";
import { useParams } from "react-router-dom";
import API_URLS from '../config/apiConfig';
import useFetch from '../config/useFetch';

const PatientView = () => {
    const { id } = useParams();
    const { data: patientData, error: patientError, isPending: patientIsPending } = useFetch(`${API_URLS.getPatients}/${id}`);

    const patient = patientData ? patientData[0] : null;

    return (
        <div id="patient-view" className="container mx-auto p-8">
            {patientIsPending && <p className="text-gray-400">Loading...</p>}
            {patientError && <p className="text-red-500">Error: {patientError}</p>}
            {patient && (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
                    <h1 className="text-3xl font-bold mb-4">{patient.name}</h1>
                    <p className="mb-2"><strong>Address:</strong> {patient.address}</p>
                    <p className="mb-2"><strong>Birthday:</strong> {new Date(patient.birthdate).toLocaleDateString()}</p>
                    <p className="mb-2"><strong>City:</strong> {patient.city_id}</p>
                    <p className="mb-2"><strong>Gender:</strong> {patient.gender}</p>
                    <p className="mb-2"><strong>Status: </strong>
                        {patient.status === "1" ? "Active" : "Inactive"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PatientView;

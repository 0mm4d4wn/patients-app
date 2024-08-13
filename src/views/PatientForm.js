import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URLS from '../config/apiConfig';

const PatientForm = () => {
    const { id } = useParams(); // Get the patient ID from the URL (if any)
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState({
        name: '',
        address: '',
        birthdate: '',
        city_id: '',
        gender: '',
        status: ''
    });

    useEffect(() => {
        if (id) {
            // Fetch the patient data if in edit mode
            fetch(`${API_URLS.getPatients}/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.result && data.result.length > 0) {
                        setPatientData(data.result[0]); // Extract the patient data from the result array
                    } else {
                        console.error('Unexpected data format:', data);
                    }
                })
                .catch(error => console.error('Error fetching patient:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        setPatientData({
            ...patientData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const url = id ? `${API_URLS.getPatients}/${id}` : API_URLS.getPatients;
        const method = id ? 'PUT' : 'POST'; // PUT for editing, POST for adding
    
        // Wrap the patientData in an array
        const payload = [patientData];
    
        console.log('Submitting data:', payload); // Log the data being submitted
    
        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // Send data as an array
        })
            .then(response => response.json())
            .then(result => {
                console.log('API Response:', result); // Log the API response
                navigate('/patient-list'); // Redirect to the patient list after saving
            })
            .catch(error => {
                console.error('Error saving patient:', error);
            });
    };
    
    

    return (
        <div id="patient-form" className="container mx-auto p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {id ? 'Edit Patient' : 'Add Patient'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={patientData.name || ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={patientData.address || ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Birthdate</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={patientData.birthdate ? patientData.birthdate.split('T')[0] : ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">City</label>
                    <input
                        type="text"
                        name="city_id"
                        value={patientData.city_id || ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Gender</label>
                    <select
                        name="gender"
                        value={patientData.gender || ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Status</label>
                    <select
                        name="status"
                        value={patientData.status || ''}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded"
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>
                <div className="flex justify-between items-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {id ? 'Save Changes' : 'Add Patient'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/patient-list')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;

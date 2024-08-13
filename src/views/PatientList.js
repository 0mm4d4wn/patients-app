import React, { useState } from "react";
import useFetch from '../config/useFetch';
import API_URLS from '../config/apiConfig';
import { useNavigate } from "react-router-dom";

const PatientList = () => {
    const navigate = useNavigate();
    const { data: patientsData, error: patientsError, isPending: patientsIsPending } = useFetch(API_URLS.getPatients);

    // State for filter criteria
    const [filterBy, setFilterBy] = useState("name"); // Default to filtering by name
    const [filterValue, setFilterValue] = useState("");

    const handleDelete = (id) => {
        fetch(`${API_URLS.getPatients}/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                // Optionally refetch the patient list after deletion
                window.location.reload();
            })
            .catch(error => console.error('Error deleting patient:', error));
    };

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value); // Update filter criteria
        setFilterValue(""); // Clear filter value on criteria change
    };

    const handleFilterValueChange = (e) => {
        setFilterValue(e.target.value); // Update filter value
    };

    // Apply filter to patientsData
    const filteredPatientsData = patientsData?.filter(patient => {
        if (filterBy === "name") {
            return patient.name.toLowerCase().includes(filterValue.toLowerCase());
        } else if (filterBy === "status") {
            // If "All" is selected or filterValue is empty, show all patients
            if (filterValue === "" || filterValue === "all") {
                return true;
            }
            return patient.status === filterValue;
        }
        return true;
    });

    return (
        <div id="patient-list" className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Patients</h1>
                <div className="flex items-center">
                    <label className="text-gray-800 mr-2">Filter By</label>
                    <select
                        className="bg-gray-700 text-white p-2 rounded"
                        onChange={handleFilterChange}
                        value={filterBy}
                    >
                        <option value="name">Name</option>
                        <option value="status">Status</option>
                    </select>
                    {filterBy === "status" && (
                        <select
                            className="bg-gray-700 text-white p-2 rounded ml-2"
                            onChange={handleFilterValueChange}
                            value={filterValue}
                        >
                            <option value="">All</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    )}
                    {filterBy === "name" && (
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="bg-gray-700 text-white p-2 rounded ml-2"
                            onChange={handleFilterValueChange}
                            value={filterValue}
                        />
                    )}
                </div>
                <button
                    onClick={() => navigate('/patient-form')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                >
                    Add Patient
                </button>
            </div>
            {patientsIsPending && <p className="text-gray-400">Loading...</p>}
            {patientsError && <p className="text-red-500">Error: {patientsError}</p>}
            {filteredPatientsData && (
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="text-left text-gray-400">
                            <th className="p-4 text-center">Name</th>
                            <th className="p-4 text-center">Address</th>
                            <th className="p-4 text-center">Birthday</th>
                            <th className="p-4 text-center">City</th>
                            <th className="p-4 text-center">Gender</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatientsData.map((patient) => (
                            <tr key={patient.id} className="text-white border-t border-gray-700">
                                <td
                                    className="p-4 cursor-pointer text-blue-400 hover:text-blue-600"
                                    onClick={() => navigate(`/patient-view/${patient.id}`)}
                                >
                                    {patient.name}
                                </td>
                                <td className="p-4">{patient.address}</td>
                                <td className="p-4">{new Date(patient.birthdate).toLocaleDateString()}</td>
                                <td className="p-4">{patient.city_id}</td>
                                <td className="p-4">{patient.gender}</td>
                                <td className="p-4">
                                    <span className={`py-1 px-3 rounded-full text-sm ${patient.status === "1" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                                        {patient.status === "1" ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => navigate(`/patient-form/${patient.id}`)}
                                        className="text-blue-500 hover:text-blue-700 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(patient.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PatientList;

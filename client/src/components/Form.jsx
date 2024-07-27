import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Endpoint from '../../config.json';

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        mobileNumber: '',
        education: [{ degree: '', institution: '', year: '' }],
        experience: [{ jobTitle: '', company: '', years: '' }],
        profilePhoto: ''
    });

    const { mobileNumber, education, experience, profilePhoto, name } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onEducationChange = (e, index) => {
        const updatedEducation = education.map((edu, i) =>
            i === index ? { ...edu, [e.target.name]: e.target.value } : edu
        );
        setFormData({ ...formData, education: updatedEducation });
    };

    const onExperienceChange = (e, index) => {
        const updatedExperience = experience.map((exp, i) =>
            i === index ? { ...exp, [e.target.name]: e.target.value } : exp
        );
        setFormData({ ...formData, experience: updatedExperience });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };
            const body = JSON.stringify(formData);
            const res = await axios.patch(`${Endpoint.API_URL}/auth/update`, body, config);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const [selectedImage, setSelectedImage] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };
    useEffect(() => {
        if (selectedImage){
            handleUpload()
        }
    }, [selectedImage])

    // Upload image to the server
    const handleUpload = async () => {
        if (!selectedImage) {
            alert("Please select an image first.");
            return;
        }

        try {
            var formData = new FormData();
            formData.append("photo", selectedImage);

            const config = {
                
            };

            const res = await axios.post(`${Endpoint.API_URL}/auth/uploadimages`, formData, config);
            console.log(res, res)

            if (res.status === 200) {
                alert("Image uploaded successfully.");
            } else {
                alert("Failed to upload image.");
            }
        } catch (err) {
            console.error(err);
            alert("Error uploading image.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="Name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="mobileNumber">Mobile Number</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={mobileNumber}
                            onChange={onChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Education</label>
                        {education.map((edu, index) => (
                            <div key={index} className="mb-2">
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={e => onEducationChange(e, index)}
                                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="text"
                                    name="institution"
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={e => onEducationChange(e, index)}
                                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="text"
                                    name="year"
                                    placeholder="Year"
                                    value={edu.year}
                                    onChange={e => onEducationChange(e, index)}
                                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Experience</label>
                        {experience.map((exp, index) => (
                            <div key={index} className="mb-2">
                                <input
                                    type="text"
                                    name="jobTitle"
                                    placeholder="Job Title"
                                    value={exp.jobTitle}
                                    onChange={e => onExperienceChange(e, index)}
                                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={e => onExperienceChange(e, index)}
                                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="text"
                                    name="years"
                                    placeholder="Years"
                                    value={exp.years}
                                    onChange={e => onExperienceChange(e, index)}
                                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;

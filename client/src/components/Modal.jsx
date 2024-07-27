import React, { useState } from 'react';

const Modal = ({ show, onClose, type, data, setData, fulldetail, setFullDetail }) => {
    const [stateEducation, setStateEducation] = useState({
        degree: "",
        institution: "",
        year: ""
    })
    const [stateExperience, setStateExperience] = useState({
        jobTitle: "",
        company: "",
        years: ""
    })
    const add=()=>{
        if (type == "education") {
            setData({...data,education:[...data.education,stateEducation]})
            setFullDetail({...fulldetail,education:[...data.education,stateEducation]})
        }
        if (type == "experience") {
            console.log("heheh")
            setData({...data,experience:[...data.experience,stateExperience]})
            setFullDetail({...fulldetail,experience:[...data.experience,stateExperience]})
            console.log(data,fulldetail,"checkin")

        }
    }
   

    return (

        type == "education" ?
            <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 `}>
                <div className="bg-white p-8 rounded shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Add Education</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="degree">Degree</label>
                            <input
                                type="text"
                                id="degree"
                                name='degree'
                                value={stateEducation.degree}
                                onChange={(e) => { setStateEducation({ ...stateEducation, [e.target.name]: e.target.value }) }}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your degree"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="institution">Institution</label>
                            <input
                                type="text"
                                id="institution"
                                name='institution'
                                value={stateEducation.institution}
                                onChange={(e) => { setStateEducation({ ...stateEducation, [e.target.name]: e.target.value }) }}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your institution"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="year">Year</label>
                            <input
                                type="text"
                                id="year"
                                name='year'
                                value={stateEducation.year}
                                onChange={(e) => { setStateEducation({ ...stateEducation, [e.target.name]: e.target.value }) }}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter the year"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => { onClose(false) }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={()=>{add()}}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                </div>
            </div>
            :
            <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 `}>
                <div className="bg-white p-8 rounded shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Add Experience</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="degree">Job title</label>
                            <input
                                type="text"
                                id="jobTitle"
                                value={stateExperience.jobTitle}
                                name="jobTitle"
                                onChange={(e) => { setStateExperience({ ...stateExperience, [e.target.name]: e.target.value }) }}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your jobTitle"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="institution">Company</label>
                            <input
                                type="text"
                                id="company"
                                value={stateExperience.company}
                                name="company"
                                onChange={(e) => { setStateExperience({ ...stateExperience, [e.target.name]: e.target.value }) }}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your company"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="year">Years</label>
                            <input
                                type="text"
                                id="years"
                                value={stateExperience.years}
                                name="years"
                                onChange={(e) => { setStateExperience({ ...stateExperience, [e.target.name]: e.target.value }) }}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter the years you worked"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                onClick={()=>{onClose(false)}}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={()=>{add()}}

                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                </div>
            </div>
    );
};


export default Modal;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Endpoint from '../../config.json';
import Modal from './Modal';

const DataTable = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(2);
    const [Totalpage, setTotalPage] = useState();
    const [fulldetail, setFullDetail] = useState();
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        console.log("here page", page);
        try {
            const config = { headers: { 'Content-Type': 'application/json', 'authorization': localStorage.getItem("token") } };
            const res = await axios.get(`${Endpoint.API_URL}/auth/get/${page}`, config);
            setData(res.data.data);
            setTotalPage(res.data.totalPage);
            setFullDetail(res.data.fulldetail);
            console.log(res, "res", fulldetail, data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        console.log(page, "page");
        fetchData();
    }, [page]);

    const updateFunc = async () => {
        try {
            const config = { headers: { 'Content-Type': 'application/json', 'authorization': localStorage.getItem("token") } };
            const body = JSON.stringify(fulldetail);
            const res = await axios.patch(`${Endpoint.API_URL}/auth/update/userdetails`, body, config);
            if (res.status === 200) {
                alert("updated");
            }
            console.log(res, "res");
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (index, field, value, type) => {
        if (type === "education") {
            const updatedEducation = data.education.map((edu, i) => {
                if (i === index) {
                    return { ...edu, [field]: value };
                }
                return edu;
            });
            setData({ ...data, education: updatedEducation });
            setFullDetail({ ...fulldetail, education: updatedEducation });
        }
        if (type === "experience") {
            const updatedExperience = data.experience.map((exp, i) => {
                if (i === index) {
                    return { ...exp, [field]: value };
                }
                return exp;
            });
            setData({ ...data, experience: updatedExperience });
            setFullDetail({ ...fulldetail, experience: updatedExperience });
        }
    };

    const handleDelete = (index, type) => {
        if (type === "education") {
            const updatedEducation = data.education.filter((_, i) => i !== index);
            setData({ ...data, education: updatedEducation });
            setFullDetail({ ...fulldetail, education: updatedEducation });
        }
        if (type === "experience") {
            const updatedExperience = data.experience.filter((_, i) => i !== index);
            setData({ ...data, experience: updatedExperience });
            setFullDetail({ ...fulldetail, experience: updatedExperience });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Data Table</h2>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            {data && (Object.keys(data)[0] === "education" || Object.keys(data)[0] === "experience") && (
                                <>
                                    <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600">Degree</th>
                                    <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600">Institution</th>
                                    <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600">Year</th>
                                    <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600">Actions</th>
                                </>
                            )}
                            {data && Object.keys(data)[0] !== "education" && Object.keys(data)[0] !== "experience" && (
                                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600">{Object.keys(data)[0]}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data && Object.keys(data)[0] === "education" && data.education.map((value, key) => (
                            <tr key={key}>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(key, 'degree', e.target.value, "education")}
                                        value={value.degree}
                                        name="degree"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(key, 'institution', e.target.value, "education")}
                                        value={value.institution}
                                        name="institution"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(key, 'year', e.target.value, "education")}
                                        value={value.year}
                                        name="year"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button
                                        onClick={() => handleDelete(key, "education")}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {data && Object.keys(data)[0] === "experience" && data.experience.map((value, key) => (
                            <tr key={key}>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(key, 'jobTitle', e.target.value, "experience")}
                                        value={value.jobTitle}
                                        name="jobTitle"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(key, 'company', e.target.value, "experience")}
                                        value={value.company}
                                        name="company"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(key, 'years', e.target.value, "experience")}
                                        value={value.years}
                                        name="years"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button
                                        onClick={() => handleDelete(key, "experience")}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {data && Object.keys(data)[0] !== "experience" && Object.keys(data)[0] !== "education" && (
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setFullDetail({ ...fulldetail, [e.target.name]: e.target.value });
                                            setData({ ...data, [Object.keys(data)[0]]: e.target.value });
                                        }}
                                        value={data[Object.keys(data)[0]]}
                                        name={Object.keys(data)[0]}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="container mx-auto mt-10">
                    <nav className="flex justify-center">
                        <ul className="inline-flex items-center -space-x-px text-sm">
                            <li>
                                <a href="#" className={`px-2 py-1 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${page === 2 && "cursor-not-allowed"}`} onClick={() => { page > 2 && setPage(page - 1) }}>Previous</a>
                            </li>
                            <li>
                                <a href="#" className={` px-2 py-1 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${page === Totalpage && "cursor-not-allowed"}`} onClick={() => { page < Totalpage && setPage(page + 1) }}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='flex justify-end'>
                    <button onClick={updateFunc} className=' bg-green-500 text-white font-bold px-5 rounded-xl py-2 '>Save</button>
                    {data && Object.keys(data)[0] === "education" &&
                        <button onClick={() => { setShowModal(true) }} className=' bg-yellow-500 text-white font-bold px-5 rounded-xl py-2 mx-2 '>Add Field</button>
                    }
                    {data && Object.keys(data)[0] === "experience" &&
                        <button onClick={() => { setShowModal(true) }} className=' bg-yellow-500 text-white font-bold px-5 rounded-xl py-2 mx-2 '>Add Field</button>
                    }
                </div>
            </div>
            {showModal &&
                <Modal onClose={setShowModal} type={Object.keys(data)[0]} data={data} setData={setData} fulldetail={fulldetail} setFullDetail={setFullDetail} />
            }
        </div>
    );
};

export default DataTable;

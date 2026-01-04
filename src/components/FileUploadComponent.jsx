import React, { useState } from "react";
import Papa from "papaparse";
import { Context } from '../MyContext';
import { useContext } from 'react';
import ShowQuestionFormat from "./ShowQuestionFormat";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function FileUploadComponent({ setmaxquestionLength, randomShuffle }) {
    const [customsubject, setcustomsubject] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [validData, setValidData] = useState([]);
    const [invalidData, setInvalidData] = useState([]);
    const [showQuestionFormatModal, setShowQuestionFormatModal] = useState(false);
    const {
        CustomQuestions,
        setCustomQuestions,
        setTestQuestion,
        backendURL,
        accessToken
    } = useContext(Context);

    const schema = [
        "question",
        "option1",
        "option2",
        "option3",
        "option4",
        "correctresponse",
        "time",
        "subject"
    ];

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileType = file.name.endsWith(".csv")
            ? "csv"
            : file.name.endsWith(".json")
                ? "json"
                : null;

        if (!fileType) {
            toast.warn("Please upload a CSV or JSON file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = ({ target }) => {
            const content = target.result;

            if (fileType === "csv") {
                parseCSV(content);
            } else {
                parseJSON(content);
            }
        };
        reader.readAsText(file);
    };

    const parseCSV = (data) => {
        Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => validateData(results.data),
            error: (error) => {
                toast.error("Parsing Error: " + error.message);
            },
        });
    };

    const parseJSON = (data) => {
        try {
            const jsonData = JSON.parse(data);
            validateData(jsonData);
        } catch (error) {
            toast.error("Parsing Error: Invalid JSON format.");
        }
    };

    const validateData = (data) => {
        const valid = [];
        const invalid = [];

        const normalizeKey = (key) => key.toLowerCase();
        const normalizedSchema = schema.map(normalizeKey);

        data.forEach((row, index) => {
            const normalizedRow = {};
            Object.entries(row).forEach(([key, value]) => {
                normalizedRow[normalizeKey(key)] = value;
            });

            const missingFields = normalizedSchema.filter(
                (field) => !(field in normalizedRow) || !normalizedRow[field]
            );

            if (missingFields.length === 0) {
                const options = [
                    normalizedRow["option1"],
                    normalizedRow["option2"],
                    normalizedRow["option3"],
                    normalizedRow["option4"],
                ];
                if (options.some((option) => !option)) {
                    invalid.push({
                        row: normalizedRow,
                        error: `Row ${index + 1}: Missing or invalid options.`,
                    });
                } else {
                    valid.push({
                        ...row,
                        subject: customsubject
                    });
                }
            } else {
                invalid.push({
                    row,
                    error: `Row ${index + 1} missing fields: ${missingFields.join(", ")}`,
                });
            }
        });

        setValidData(valid);
        setInvalidData(invalid);

        if (invalid.length > 0) {
            toast.error(`${invalid.length} invalid rows found.`);
        } else {
            setmaxquestionLength(valid.length);
            let shuffled = randomShuffle(valid).slice(0, valid.length);
            setTestQuestion(shuffled);
            setCustomQuestions(shuffled);
        }
    };

    let navigate = useNavigate()

    const submitMultipleQuestions = async (questionsArray) => {
        if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
            toast.warn("Please provide at least one question");
            return;
        }

        let selectedSubject = customsubject

        const subject = questionsArray[0]?.subject?.trim() || selectedSubject;
        if (!subject) return toast.warn("Please enter or select a subject");

        try {
            const res = await fetch(`${backendURL}/quiz/bulk/${subject}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: "include",
                body: JSON.stringify({ questions: questionsArray }),
            });

            if (res.ok) {
                toast.success("All questions uploaded successfully!");
                // await getAllSubjects();
                // await loadQuestions();
            } else {
                const errMsg = await res.text();
                console.error(errMsg);
                toast.error("Error uploading questions");
            }
        } catch (err) {
            console.error("Bulk upload failed", err);
            toast.error("Bulk upload failed");
        }
    };

    console.log(validData, "data")

    return (
        <div className="w-full bg-gray-100 rounded-lg p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Upload Questions</h2>
            <input
                placeholder="enter subject name"
                className="block w-full text-sm p-1 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white mb-4"
                type="text" value={customsubject} onChange={(e) => setcustomsubject(e.target.value)} />
            <input
                type="file"
                accept=".csv,.json"
                onChange={handleUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white mb-4"
            />

            <ShowQuestionFormat
                showQuestionFormatModal={showQuestionFormatModal}
                setShowQuestionFormatModal={setShowQuestionFormatModal}
            />

            <div className="flex justify-center my-4 items-center flex-wrap gap-4">

             <button
                onClick={() => submitMultipleQuestions(validData)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 ml-2"
            >
                Save uploaded Questions
            </button>

            </div>

            <div className="flex justify-center items-center flex-wrap gap-4">
                {validData.length === 0 && (
                <button
                    onClick={() => setShowQuestionFormatModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                    How to Generate CSV?
                </button>
            )}

            {validData.length > 0 && (
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 ml-2"
                >
                    Show Questions
                </button>
            )}

            <button
                onClick={() => navigate("/managequestions")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 ml-2"
            >
                Previous Questions
            </button>
            <button
                onClick={() => navigate("/managequestions")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 ml-2"
            >
                Manually Enter Questions
            </button>

            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Uploaded Questions</h3>
                        <h2 className="text-sm font-semibold mb-4">subject - {validData[0]?.subject}</h2>
                        {validData.map((item, i) => (
                            <div
                                key={i}
                                className="bg-gray-50 p-4 mb-2 rounded-lg shadow-sm border"
                            >
                                <p className="font-medium">Q: {item.question}</p>
                                {["option1", "option2", "option3", "option4"].map((key) => (
                                    <p key={key} className="ml-2">
                                        {item[key]}
                                    </p>
                                ))}
                                <p className="text-green-600 font-semibold">
                                    Correct: {item.correctresponse}
                                </p>
                            </div>
                        ))}

                        {invalidData.length > 0 && (
                            <button
                                onClick={() => alert(JSON.stringify(invalidData, null, 2))}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 mt-4"
                            >
                                View Invalid Rows
                            </button>
                        )}

                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


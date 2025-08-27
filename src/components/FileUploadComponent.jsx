import React, { useState } from "react";
import Papa from "papaparse";
import { Context } from '../MyContext';
import { useContext } from 'react';
import ShowQuestionFormat from "./ShowQuestionFormat";

export default function FileUploadComponent({ setmaxquestionLength, randomShuffle }) {
    const [showModal, setShowModal] = useState(false);
    const [validData, setValidData] = useState([]);
    const [invalidData, setInvalidData] = useState([]);
    const [showQuestionFormatModal, setShowQuestionFormatModal] = useState(false);
    const {
        CustomQuestions,
        setCustomQuestions,
        setTestQuestion,
    } = useContext(Context);

    const schema = [
        "question",
        "option1",
        "option2",
        "option3",
        "option4",
        "correctresponse",
        "time",
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
            alert("Please upload a CSV or JSON file.");
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
                alert("Parsing Error: " + error.message);
            },
        });
    };

    const parseJSON = (data) => {
        try {
            const jsonData = JSON.parse(data);
            validateData(jsonData);
        } catch (error) {
            alert("Parsing Error: Invalid JSON format.");
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
                    valid.push(row);
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
            alert(`${invalid.length} invalid rows found.`);
        } else {
            setmaxquestionLength(valid.length);
            let shuffled = randomShuffle(valid).slice(0, valid.length);
            setTestQuestion(shuffled);
            setCustomQuestions(shuffled);
        }
    };

    return (
        <div className="w-full bg-gray-100 rounded-lg p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Upload Questions</h2>

            <input
                type="file"
                accept=".csv,.json"
                onChange={handleUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white mb-4"
            />

            {validData.length === 0 && (
                <button
                    onClick={() => setShowQuestionFormatModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                    How to Generate CSV?
                </button>
            )}

            <ShowQuestionFormat
                showQuestionFormatModal={showQuestionFormatModal}
                setShowQuestionFormatModal={setShowQuestionFormatModal}
            />

            {validData.length > 0 && (
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 ml-2"
                >
                    Show Questions
                </button>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Uploaded Questions</h3>

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


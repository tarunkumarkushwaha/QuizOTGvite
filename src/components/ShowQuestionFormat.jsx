import React, { useState } from "react";

export default function ShowQuestionFormat({ showQuestionFormatModal, setShowQuestionFormatModal }) {
  const textToCopy = ` Convert given questions in csv file in the following schema:
- **question**: The question text.
- **option1, option2, option3, option4**: Multiple-choice answers.
- **correctresponse**: The correct answer text.
- **time**: fill all this field with 1`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    alert("Text copied! Paste in any AI tool (ChatGPT is best) with your text questions and answers to convert them into CSV. u can also ask ai to create questions");
  };

  if (!showQuestionFormatModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">

        <button
          onClick={() => setShowQuestionFormatModal(false)}
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Close
        </button>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Method 1</h2>

          <button
            onClick={handleCopy}
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-left w-full hover:bg-gray-200"
          >
            <pre className="whitespace-pre-wrap text-sm text-gray-800">{textToCopy}</pre>
          </button>

          <p className="text-red-500">Copy format by clicking above and paste to any AI along with your questions and generate csv file</p>
          <p className="text-blue-600 font-medium">OR</p>

          <h2 className="text-lg font-bold">Method 2</h2>
          <p className="text-gray-700">Step 1. Create excel file with below format in image.</p>
          <p className="text-gray-700">Step 2. Convert the file to `.csv` or `.json`.</p>
          <p className="text-gray-700">Example of excel/csv is given below.</p>

          {/* Example CSV image */}
          <div className="overflow-x-auto border rounded-lg p-2 bg-gray-50">
            <img
              src="/assets/examplecsv.png" 
              alt="Example CSV"
              className="w-[800px] max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react'

const TestRules = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test Rules</h2>
            <ul className="list-disc list-inside">
                <li className="mb-2">Test has a specified time limit. Ensure to complete it within the given time.</li>
                <li className="mb-2">Once you move to the next question, you cannot return to the previous one.</li>
                <li className="mb-2">Do not refresh the page during the test; it may result in data loss.</li>
                <li className="mb-2">Make sure your internet connection is stable to avoid disruptions.</li>
                <li className="mb-2">Do not navigate to ther pages or minify screen</li>
                <li className="mb-2">Typing is not permitted, so do not use keyboard</li>
                <li className="mb-2">Follow all instructions provided by the test administrator.</li>
            </ul>
        </div>
  )
}

export default TestRules
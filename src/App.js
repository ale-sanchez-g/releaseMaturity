import React, { useState } from 'react';
import QuestionnaireForm from './components/QuestionnaireForm';
import MaturityChart from './components/MaturityChart';
import './App.css'; // Optional: For styling

const App = () => {
  const [responses, setResponses] = useState(null); // Holds the submitted questionnaire data

  // Function to handle form submission and pass responses to App state
  const handleFormSubmit = (submittedResponses) => {
    setResponses(submittedResponses); // Store responses
  };

  return (
    <div className="app">
      {!responses ? (
        <QuestionnaireForm onSubmit={handleFormSubmit} /> // Pass handleFormSubmit as a prop
      ) : (
        console.log(responses),
        <MaturityChart responses={responses} /> // Pass the collected responses to MaturityChart
      )}
    </div>
  );
};

export default App;
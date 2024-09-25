import React, { useState } from 'react';
import QuestionnaireForm from './components/QuestionnaireForm';
import MaturityChart from './components/MaturityChart';

import './App.css'; // Import the CSS file

const App = () => {
  const [responses, setResponses] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [showWelcomePage, setShowWelcomePage] = useState(true);

  const handleFormSubmit = (submittedResponses) => {
    setResponses(submittedResponses);
  };

  const handleCompanyNameSubmit = (e) => {
    e.preventDefault();
    setShowWelcomePage(false);
  };

  return (
    <div className="App">
    {showWelcomePage ? (
      <div className='pop'>
        <div className="welcome-page">
          <div className="welcome-container">
            <h1>DO1 Release Maturity</h1>
            <p className='fineprint'>
              This questionnaire will help you assess the maturity of your company's release process.
            </p>
            <form onSubmit={handleCompanyNameSubmit}>
              <label>
                What is the name of your company?
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Start</button>
            </form>
          </div>
        </div>
      </div>
    ) : !responses ? (
        <QuestionnaireForm onSubmit={handleFormSubmit} />
      ) : (
        <MaturityChart responses={responses} />
      )}
    </div>
  );
};

export default App;
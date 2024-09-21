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
            <h1>Welcome!</h1>
            <form onSubmit={handleCompanyNameSubmit}>
              <label>
                Company Name:
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
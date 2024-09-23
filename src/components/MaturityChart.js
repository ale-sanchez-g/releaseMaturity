import React from 'react';
import calculateScores from '../helpers/calculationScores';
import questionsData from './questions.json';

const MaturityChart = ({ responses }) => {
   const maxScore = calculateScores(questionsData);
   // Calculate the highest score for all the questions
    const sectionPercentages = maxScore.totalScore;

    // Calculate the total score based on the responses
    let totalPercentage = 0;
    Object.keys(responses).forEach(sectionKey => {
    const section = responses[sectionKey];
    Object.values(section).forEach(question => {
        totalPercentage += parseInt(question.value);
    });});

    // Create a switch statement to calculate the score per doraMetric
    // Initialize variables for each DORA metric
    let doraLT = 0; // Lead Time for Changes
    let doraDF = 0; // Deployment Frequency
    let doraCFR = 0; // Change Failure Rate
    let doraMTTR = 0; // Mean Time to Restore

    // Loop through the responses and calculate the score for each DORA metric
    Object.keys(responses).forEach(sectionKey => {
    const section = responses[sectionKey];
    Object.values(section).forEach(question => {
        const score = parseInt(question.value);
        switch (question.doraMetric) {
        case "Lead Time for Changes":
            doraLT += score;
            break;
        case "Deployment Frequency":
            doraDF += score;
            break;
        case "Change Failure Rate":
            doraCFR += score;
            break;
        case "Mean Time to Restore":
            doraMTTR += score;
            break;
        default:
            break;
        }
    });
    });    

    // Calculate the overall percentage
    const overallPercentage = Math.round((totalPercentage / sectionPercentages) * 100);

  return (
    <div className="maturity-chart">
      <h2>Overall Organisational Maturity Score</h2>
      <h3>DORA</h3>
      <div className="score-display">
      <h4>Lead Time for Changes: {doraLT} out of {maxScore.doraMetrics.dltfc}</h4>
      <h4>Deployment Frequency: {doraDF} out of {maxScore.doraMetrics.ddf}</h4>
      <h4>Change Failure Rate: {doraCFR} out of {maxScore.doraMetrics.dcfr}</h4>
      <h4>Mean Time to Restore: {doraMTTR} out of {maxScore.doraMetrics.dmttr}</h4>
    </div>
      <h3>Total Score</h3>
      <div className="score-display">
        <h4>{totalPercentage} out of {sectionPercentages}</h4>
      </div> 
      <div className="score-display">
        <h3>{overallPercentage}%</h3>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${overallPercentage}%`, backgroundColor: '#1970DE' }}
          />
        </div>
      </div>
        <button onClick={() => window.location.reload()}>Restart Questionnaire</button>
      </div>
  );
};

export default MaturityChart;

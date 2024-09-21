import React, { useState } from 'react';
import questionsData from './questions.json';

const QuestionnaireForm = ({ onSubmit }) => {
    const [responses, setResponses] = useState({});
    const [sectionIndex, setSectionIndex] = useState(0);
  
    const handleOptionChange = (sectionTitle, questionIndex, selectedValue) => {
      const section = questionsData.sections.find(section => section.sectionTitle === sectionTitle);
      const question = section.questions[questionIndex];
      const doraMetric = question.doraMetric;
  
      setResponses({
        ...responses,
        [sectionTitle]: {
          ...responses[sectionTitle],
          [questionIndex]: {
            value: selectedValue,
            doraMetric: doraMetric
          }
        }
      });
    };

  const handleNextSection = () => {
    setSectionIndex((prevIndex) => Math.min(prevIndex + 1, questionsData.sections.length - 1));
  };

  const handlePreviousSection = () => {
    setSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(responses); // Pass responses back to App.js
  };

  return (
    <div className="questionnaire-form">
      <h2>Section {sectionIndex + 1}: {questionsData.sections[sectionIndex].sectionTitle}</h2>
      <form onSubmit={handleSubmit}>
        {questionsData.sections[sectionIndex].questions.map((question, questionIndex) => (
          <div className="question-block" key={questionIndex}>
            <p>{question.question}</p>
            <select
              value={responses[questionsData.sections[sectionIndex].sectionTitle]?.[questionIndex] ?? ""}
              onChange={(e) => handleOptionChange(questionsData.sections[sectionIndex].sectionTitle, questionIndex, e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              {question.options.map((option, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="navigation-buttons">
          {sectionIndex > 0 && (
            <button className="questionBtn" type="button" onClick={handlePreviousSection}>
              Previous Section
            </button>
          )}
          {sectionIndex < questionsData.sections.length - 1 && (
            <button className="questionBtn" type="button" onClick={handleNextSection}>
              Next Section
            </button>
          )}
          {sectionIndex === questionsData.sections.length - 1 ? (
            <button className="questionBtn" type="submit">Submit</button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default QuestionnaireForm;

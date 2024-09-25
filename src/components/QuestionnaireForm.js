import React, { useState } from 'react';
import Select from 'react-select';
import questionsData from './questions.json';

const QuestionnaireForm = ({ onSubmit }) => {
    const [responses, setResponses] = useState({});
    const [sectionIndex, setSectionIndex] = useState(0);

    const handleOptionChange = (sectionTitle, questionIndex, selectedOption) => {
        const section = questionsData.sections.find(section => section.sectionTitle === sectionTitle);
        const question = section.questions[questionIndex];
        const doraMetric = question.doraMetric;

        setResponses({
            ...responses,
            [sectionTitle]: {
                ...responses[sectionTitle],
                [questionIndex]: {
                    value: selectedOption.value,
                    doraMetric: doraMetric
                }
            }
        });
    };

    const handleNextSection = () => {
        if (sectionIndex < questionsData.sections.length - 1) {
            setSectionIndex(sectionIndex + 1);
        } else {
            console.log(responses);
            onSubmit(responses);
        }
    };

    return (
        <div className='questionare'>
            {questionsData.sections.map((section, secIndex) => (
                <div key={secIndex} style={{ display: secIndex === sectionIndex ? 'block' : 'none' }}>
                    <h2><strong>Section {secIndex+1}</strong></h2>
                    <h2>{section.sectionTitle}</h2>
                    {section.questions.map((question, quesIndex) => (
                        <div key={quesIndex}>
                            <label>{question.question}</label>
                            <p></p>
                            <Select
                                options={question.options.map((option, index) => ({ value: index, label: option }))}
                                onChange={(selectedOption) => handleOptionChange(section.sectionTitle, quesIndex, selectedOption)}
                                className="custom-select"
                                classNamePrefix="custom-select"
                            />
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleNextSection}>Next Section</button>
        </div>
    );
};

export default QuestionnaireForm;
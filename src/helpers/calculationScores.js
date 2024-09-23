// File to calculate the total score of per section and per DORA metrics based on the quetions.json file

import questionsData from '../components/questions.json';

const calculateScores = (responses) => {
    const maxScore = 4;

    const scores = {
        totalScore: 0,
        doraMetrics: {
            dltfc: 0,
            ddf: 0,
            dcfr: 0,
            dmttr: 0
        },
        sections: []
    };

    questionsData.sections.forEach(section => {
        const sectionScores = {
            sectionTitle: section.sectionTitle,
            totalScore: 0,
            doraMetrics: {
                dltfc: 0,
                ddf: 0,
                dcfr: 0,
                dmttr: 0
            }
        };
        
        section.questions.forEach((question) => {
            
        switch (question.doraMetric) {
            case "Lead Time for Changes":
                sectionScores.doraMetrics.dltfc += maxScore;
                break;
            case "Deployment Frequency":
                sectionScores.doraMetrics.ddf += maxScore;
                break;
            case "Change Failure Rate":
                sectionScores.doraMetrics.dcfr += maxScore;
                break;
            case "Mean Time to Restore":
                sectionScores.doraMetrics.dmttr += maxScore;
                break;
            default:
                break;
            }
        });
        // loop through each question in the section and calculate max score base on the lenght of the questions
        sectionScores.totalScore += section.questions.length * 4;

        // section.questions.forEach((question, questionIndex) => {
        //     const response = responses[section.sectionTitle][questionIndex];
        //     sectionScores.totalScore += response.value;
        //     if (!sectionScores.doraMetrics[response.doraMetric]) {
        //         sectionScores.doraMetrics[response.doraMetric] = 0;
        //     }
        //     sectionScores.doraMetrics[response.doraMetric] += response.value;
        // });

        scores.sections.push(sectionScores);
        scores.totalScore += sectionScores.totalScore;
        scores.doraMetrics.dltfc += sectionScores.doraMetrics.dltfc;
        scores.doraMetrics.ddf += sectionScores.doraMetrics.ddf;
        scores.doraMetrics.dcfr += sectionScores.doraMetrics.dcfr;
        scores.doraMetrics.dmttr += sectionScores.doraMetrics.dmttr;
        
    });

    return scores;
}

export default calculateScores;
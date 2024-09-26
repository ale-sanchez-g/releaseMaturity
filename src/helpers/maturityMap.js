// This function is used to map the maturity level based on the DORA metric socres.
// Example: Max Score for dmttr: 32 and the score is 32 , then the maturity level is elite
// Example: Max Score for dmttr: 32 and the score is 2, then the maturity level is low

const maturityMap = (score, maxScore) => {
    if (score > maxScore * 0.75) {
        return "Elite";
    } else if (score > maxScore * 0.5) {
        return "High";
    } else if (score > maxScore * 0.25) {
        return "Medium";
    } else {
        return "Low";
    }
}

export default maturityMap;


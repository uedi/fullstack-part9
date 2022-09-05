export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (dailyHours: number[], target: number) : Result => {
    const trainingDays = dailyHours.filter(d => d > 0).length;
    const sumOfHours = dailyHours.reduce((a, b) => a + b, 0);
    const average = sumOfHours / dailyHours.length;
    const rating = average >= target ? 3 : (average < target / 2 ? 1 : 2);
    const description = average >= target ? 'good' : (average < target / 2 ? 'bad' : 'not too bad but could be better');

    return {
        periodLength: dailyHours.length,
        trainingDays: trainingDays,
        success: average >= target,
        rating: rating,
        ratingDescription: description,
        target: target,
        average: average
    };
};

export const parseExerciseInput = (args: Array<string>) : number[] => {
    if(args.length < 4) {
        throw new Error('Requires at least two arguments: target and one daily exercise hours');
    }
    const result: number[] = [];
    args.slice(2).forEach(arg => {
        const value = Number(arg);
        if(isNaN(value) || value < 0) {
            throw new Error('Input must contain numbers that are at least 0');
        }
        result.push(value);
    });
    return result;
};

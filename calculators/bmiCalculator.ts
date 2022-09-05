export interface BmiArguments {
    height: number,
    weight: number
}

export const calculateBmi = (height: number, weight: number) : string => {
    const h = height / 100;
    const bmi = weight / (h * h);
    if(bmi < 17) {
        return 'Underweight';
    } else if(bmi >= 25) {
        return 'Overweight';
    } else {
        return 'Normal (healthy weight)';
    }
};

export const parseBmiArguments = (args: Array<string>) : BmiArguments => {
    if(args.length !== 4) {
        throw new Error('Requires two arguments: height and weight');
    }
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        if(Number(args[2]) <= 0 || Number(args[3]) <= 0) {
            throw new Error('Height and weight should be non-zero and positive');
        }
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Height and weight must be numbers.');
    }
};

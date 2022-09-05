import { parseBmiArguments, calculateBmi } from "./bmiCalculator";

try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch(error: unknown) {
    const errorMsg = (error instanceof Error) ? error.message : 'Unknown error occured.';
    console.log(errorMsg);
}

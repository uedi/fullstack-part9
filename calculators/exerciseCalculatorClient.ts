import { calculateExercises, parseExerciseInput } from "./exerciseCalculator";

try {
    const input = parseExerciseInput(process.argv);
    console.log(calculateExercises(input.slice(1), input[0]));
} catch(error: unknown) {
    const errorMsg = (error instanceof Error) ? error.message : 'Unknown error occured.';
    console.log(errorMsg);
}

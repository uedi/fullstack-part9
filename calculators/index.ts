import express from 'express';
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const heightParam : string = req.query.height as string;
    const weightParam : string = req.query.weight as string;

    if(!heightParam || !weightParam || isNaN(Number(heightParam)) || isNaN(Number(weightParam)) || Number(heightParam) <= 0 || Number(weightParam) <= 0) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const height = Number(heightParam);
    const weight = Number(weightParam);

    try {
        const bmi = calculateBmi(height, weight);
        return res.status(200).json({ weight, height, bmi });
    } catch(error: unknown) {
        const errorMsg = (error instanceof Error) ? error.message : 'Unknown error occured.';
        return res.status(400).json({ error: errorMsg });
    }
});

app.post('/exercises', (req, res) => {
    const body = req.body; // eslint-disable-line
    
    if(!body || !body.daily_exercises || !body.target) { // eslint-disable-line
        return res.status(400).json({ error: 'parameters missing' });
    }

    if(isNaN(body.target) || !Array.isArray(body.daily_exercises) || body.daily_exercises.length < 1) { // eslint-disable-line
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    for(let i = 0; i < body.daily_exercises.length; i++) { // eslint-disable-line
        if(!(typeof body.daily_exercises[i] === 'number') || body.daily_exercises[i] < 0) { // eslint-disable-line
            return res.status(400).json({ error: 'malformatted parameters' });
        }
    }

    try {
        const data = calculateExercises(body.daily_exercises, body.target); // eslint-disable-line
        return res.status(200).json(data);
    } catch(error: unknown) {
        const errorMsg = (error instanceof Error) ? error.message : 'Unknown error occured.';
        return res.status(400).json({ error: errorMsg });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

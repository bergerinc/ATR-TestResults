import { Feature } from './feature';

export class TestRun{
    runBy: string;
    duration: number;
    status: string;
    features: Feature[];
}
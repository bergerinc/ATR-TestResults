import { TestRun } from './test-run';

export class TestApplication {
    id: string;
    name: string;
    version: number;
    testRuns: TestRun[];
}
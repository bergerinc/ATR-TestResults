import { TestDuration } from './test-duration';

export class EnvironmentTestResult {
    EnvironmentName: string;
    TotalScenarios: number;
    TotalFailedScenarios: number;
    TotalPassedScenarios: number;
    TotalDuration: TestDuration;
    TotalTestRuns: number;
}
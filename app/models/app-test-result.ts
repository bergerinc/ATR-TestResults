import { TestDuration } from './test-duration';

export class AppTestResult {
    ApplicationName: string;
    ServerName: string;
    EnvironmentName: string;
    TotalScenarios: number;
    TotalFailedScenarios: number;
    TotalPassedScenarios: number;
    TotalDuration: TestDuration;
    TotalTestRuns: number;
}
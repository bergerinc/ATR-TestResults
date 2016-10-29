import { TestDuration } from './test-duration';

export class ServerTestResult {
    ServerName: string;
    EnvironmentName: string;
    TotalScenarios: number;
    TotalFailedScenarios: number;
    TotalPassedScenarios:number;
    TotalDuration: TestDuration;
    TotalTestRuns: number;
}
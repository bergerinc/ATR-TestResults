import { TestDuration } from './test-duration';

export class OverallTestResult {
    TotalScenarios: number;
    TotalFailedScenarios: number;
    TotalPassedScenarios: number;
    TotalDuration: {
        Ticks: number,
        Days: number,
        Hours: number,
        Milliseconds: number,
        Minutes: number,
        Seconds: number,
        TotalDays: number,
        TotalHours: number,
        TotalMilliseconds: number,
        TotalMinutes: number,
        TotalSeconds: number
    };
    TotalTestRuns: number
}
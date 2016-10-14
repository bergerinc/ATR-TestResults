import { Scenario } from './scenario';

export class Feature{
    name: string;
    passed: boolean;
    scenarios: Scenario[];    
}
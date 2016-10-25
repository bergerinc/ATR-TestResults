import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Environment } from '../models/environment';

@Injectable()
export class TestResultsService {
    private _testResultsUrl = 'http://localhost:3000/getEnvironments';
    private _serverTestDataUrl = 'http://localhost:3000/getTestResultsByServer';
    constructor(private _http : Http) {}

    getEnvironmentData(refresh?) {
        try {
            var url = (refresh) ? this._testResultsUrl + '/' + refresh.toString() : this._testResultsUrl;
            return this._http.get(url).map(res => res.json().data);
        } catch(err) {
            console.log(err);
        }
    }

    getServerData(envName: string, srvName: string) {
        try{
            return this._http.get(this._serverTestDataUrl + '/' + envName + '/' + srvName).map(res => res.json().data);
        } catch(err){
            console.log(err)
        }
    }
};

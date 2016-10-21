import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Environment } from '../models/environment';

@Injectable()
export class EnvironmentService {
    private _environmentsUrl = 'http://localhost:3000/getEnvironments';
    private _serverTestDataUrl = 'http://localhost:3000/getTestResultsByServer';
    constructor(private _http : Http) {}

    getEnvironmentData() {
        try{
            return this._http.get(this._environmentsUrl).map(res => res.json().data);
        } catch(err){
            console.log(err);
        }
    }

    getServer() {
        try{
            return this._http.get(this._serverTestDataUrl).map(res => res.json().data);
        } catch(err){
            console.log(err)
        }
    }
};

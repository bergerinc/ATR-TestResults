import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Environment } from '../models/environment';

@Injectable()
export class TestResultsService {
    private _testResultsUrl = 'http://localhost:5000/getEnvironments';
    private _serverTestDataUrl = 'http://localhost:5000/getTestResultDataByServer';
    private _overallTestResultsDataUrl = 'http://localhost:5000/getTestResultsOverallSummary';
    private _envTestResultsDataUrl = 'http://localhost:5000/getTestResultsByEnvironment';
    private _serverTestResultsDataUrl = 'http://localhost:5000/getTestResultsByServer';
    private _appTestResultsDataUrl = 'http://localhost:5000/getTestResultsByApplication';
    constructor(private _http : Http) {}

    getEnvironmentData(refresh?: boolean) {
        try {
            var url = (refresh) ? this._testResultsUrl + '/' + refresh.toString() : this._testResultsUrl;
            return this._http.get(url).map(res => res.json().data);
        } catch(ex) {
            console.log(ex);
        }
    }
    getServerData(envName: string, srvName: string) {
        try{
            return this._http.get(this._serverTestDataUrl + '/' + envName + '/' + srvName).map(res => res.json().data);
        } catch(ex){
            console.log(ex)
        }
    }
    getOverallTestResults() {
        try{
            return this._http.get(this._overallTestResultsDataUrl).map(res => res.json().data);
        } catch(ex) {
            console.log(ex);
        }
    }
    getTestResultsByEnvironment() {
        try{
            return this._http.get(this._envTestResultsDataUrl).map(res => res.json().data);
        } catch(ex) {
            console.log(ex);
        }
    }
    getTestResultsByServer() {
        try{
            return this._http.get(this._serverTestResultsDataUrl).map(res => res.json().data);
        } catch(ex) {
            console.log(ex);
        }
    }
    getTestResultsByApplication() {
        try{
            return this._http.get(this._appTestResultsDataUrl).map(res => res.json().data);
        } catch(ex) {
            console.log(ex);
        }
    }
};

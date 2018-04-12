import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {
    public socketConn: any = null;
    // public _baseUrl = (location.hostname === "localhost") ? 'http://localhost:8000/public/' : 'http://api.maxtot.com/public/';
    // public _baseAPIUrl = (location.hostname === "localhost") ? 'http://localhost:8000/api/v1/' : 'http://api.maxtot.com/api/v1/';
    // public _baseAPIUrlDev = (location.hostname === "localhost") ? 'http://localhost:8000/api/dev/' : 'http://api.maxtot.com/api/dev/';
    public _baseUrl = 'http://api.maxtot.com/public/';
    public _baseAPIUrl = 'http://api.maxtot.com/api/v1/';
    public _baseAPIUrlDev = 'http://api.maxtot.com/api/dev/';
    
    //Authentication
    public _api_auth_login = this._baseAPIUrl + "login";
    

    public extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    public decodeDataFromSocket(data: any = {}) {
        return JSON.parse(decodeURIComponent(window.atob(data)));
    }
}
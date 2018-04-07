import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {
    public socketConn: any = null;
    public _baseUrl = "https://api-popupcontact-02.mipbx.vn:5443/public/";
    public _baseAPIUrl = "https://api-popupcontact-02.mipbx.vn:5443/api/v1/";
    public _baseAPIUrlDev = "https://api-popupcontact-02.mipbx.vn:5443/api/dev/";

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
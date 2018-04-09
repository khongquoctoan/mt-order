import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { SettingService } from './../common/setting.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class PermissionService {
    constructor(
        // private _settingService: SettingService, 
        private storage: Storage) {

    }

    async getAccessToken(){
        return await this.storage.get('access_token')
        .then((val) => {
            console.log('1. Your access_token is', val);
            if (val != '') return true;
            return false;
        });
    }
    checkLogin() {         
        let $res = this.getAccessToken().then((val) => {
            // console.log('1.Your access_token is', val);
            return val;
        });
        console.log('2.Your access_token is');
        return $res;
    }

    //--------------------------------------------------
    checkStrIsJson(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }


    // private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
        
    //     // if (this.authService == null) {
    //     //     // this.authService = this.injector.get(AuthService);
    //     // }
    //     //add whatever header that you need to every request
    //     //in this example I could set the header token by using authService that I've created
    //     //objectToSetHeadersTo.headers.set('token', this.authService.getToken());
    //     let token = localStorage.getItem("token");
    //     let head = new Headers({
    //         'Content-Type': 'application/json',
    //         'X-Access-Token': token,
    //     });
    //     //let options = new RequestOptions({ headers: head });
    //     if(token){
    //         objectToSetHeadersTo.headers.set('Content-Type', 'application/json');
    //         objectToSetHeadersTo.headers.set('X-Access-Token', token);
    //     }
        
    // }
}
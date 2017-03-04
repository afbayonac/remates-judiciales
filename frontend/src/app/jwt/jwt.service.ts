import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';



@Injectable()
export class  JwtService  {

  constructor(private http: Http) {  }

  login(username: string, password: string): Observable<boolean> {

    let url = 'http://localhost:5000/login';
    let creds = `username=${username}&password=${password}`
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers:headers })

    return this.http.post( url, creds, options )
      .map((response: Response) => this.saveJwt(response));
  }

  saveJwt(jwt){
    console.log(jwt)
    if(jwt){
      localStorage.setItem('id_token', jwt)
      return true;
    }
    return false;
  }

  logout():void{
    localStorage.removeItem('id_token');
  }

}
import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ConexionBDD {

    httpHeader = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    constructor(private http: HttpClient) {}


    get(){
        return this.http.get('http://localhost/cancha/conexion_BDD.php');
        
    }
}
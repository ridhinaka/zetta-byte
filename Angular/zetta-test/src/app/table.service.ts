import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'
import {map} from 'rxjs/operators'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class TableService {
  getData(){
    return this.http.get <any>('http://localhost:8000/dataMentors',httpOptions
    );
  }
  constructor(
    private http: HttpClient
  ) { }
}

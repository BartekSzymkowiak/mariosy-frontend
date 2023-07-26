import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MariosyService {

  private mariosesUrl = 'api/marioses';  // URL to web api

  constructor( private http: HttpClient) { }



}

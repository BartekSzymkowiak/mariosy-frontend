import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{



  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
    this.getMarioses()
    this.getUsers()
  }

  getMarioses() {
    this.http.get('/api/marioses').subscribe(data => console.log('MARIOSES:' + data))
  }

  getUsers() {
    this.http.get('/api/users').subscribe(data => console.log('USERS: ' + data))
  }

  

}

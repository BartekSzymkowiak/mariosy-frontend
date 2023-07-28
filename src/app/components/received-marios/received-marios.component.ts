import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-received-marios',
  templateUrl: './received-marios.component.html',
  styleUrls: ['./received-marios.component.css']
})
export class ReceivedMariosComponent {

  constructor(private location: Location){}

  goBack(): void {
    this.location.back();
  }

}

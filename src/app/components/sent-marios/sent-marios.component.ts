import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sent-marios',
  templateUrl: './sent-marios.component.html',
  styleUrls: ['./sent-marios.component.css']
})
export class SentMariosComponent {

  constructor(private location: Location){}

  goBack(): void {
    this.location.back();
  }
}

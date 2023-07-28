import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-marios',
  templateUrl: './create-marios.component.html',
  styleUrls: ['./create-marios.component.css']
})
export class CreateMariosComponent {

  constructor(private location: Location){}

  goBack(): void {
    this.location.back();
  }

}

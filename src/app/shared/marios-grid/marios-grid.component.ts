import { Component, Input } from '@angular/core';
import { Marios } from 'src/app/interfaces/marios';

@Component({
  selector: 'app-marios-grid',
  templateUrl: './marios-grid.component.html',
  styleUrls: ['./marios-grid.component.css']
})
export class MariosGridComponent {

  @Input() marioses:  Marios[] = [];

 
}

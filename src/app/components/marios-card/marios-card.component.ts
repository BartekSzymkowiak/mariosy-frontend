import { Component, Input } from '@angular/core';
import { Marios } from 'src/app/interfaces/marios';
import { MatDialog } from "@angular/material/dialog";
import { MariosDialogComponent } from '../marios-dialog/marios-dialog.component';

@Component({
  selector: 'app-marios-card',
  templateUrl: './marios-card.component.html',
  styleUrls: ['./marios-card.component.css']
})
export class MariosCardComponent {

  @Input() marios!:  Marios;
  
  constructor(private  matDialog: MatDialog) {}

  openDialog(){
    this.matDialog.open(MariosDialogComponent,{
      data : this.marios,
      width: '350px',
    })
  }

  
}

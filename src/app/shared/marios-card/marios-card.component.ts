import { MariosyService } from 'src/app/services/mariosy.service';
import { Component, Input } from '@angular/core';
import { Marios } from 'src/app/interfaces/marios';
import { MatDialog } from "@angular/material/dialog";
import { MariosDialogComponent } from '../marios-dialog/marios-dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-marios-card',
  templateUrl: './marios-card.component.html',
  styleUrls: ['./marios-card.component.css']
})
export class MariosCardComponent {

  @Input() marios!:  Marios;
  
  constructor(private matDialog: MatDialog,
              private mariosyService: MariosyService) {}

  mariosTypes: String[] = [];
  mariosTypeVal: number = 0;
  private destroy$: Subject<void> = new Subject()

  ngOnInit() {
    this.mariosyService.mariosTypes
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.mariosTypes = data
      this.mariosTypeVal = this.getIndexOfMariosType()
    })


  }

  openDialog(){
    this.matDialog.open(MariosDialogComponent,{
      data : this.marios,
      width: '700px',
      height: '275px',
    })
  }

  getIndexOfMariosType(){
    return this.mariosTypes.indexOf(this.marios.type);
  }

  
}

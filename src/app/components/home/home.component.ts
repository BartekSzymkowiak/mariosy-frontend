import { MariosyService } from './../../services/mariosy.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Marios } from 'src/app/interfaces/marios';
import { Subject, takeUntil } from 'rxjs';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{



  marioses: Marios[] = [];
  private destroy$: Subject<void> = new Subject()

  constructor(private mariosyService: MariosyService) { 
  }

  ngOnInit() {
    this.mariosyService.marioses
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.marioses = data
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
 

}

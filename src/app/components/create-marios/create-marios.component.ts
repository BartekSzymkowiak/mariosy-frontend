import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MariosyService } from 'src/app/services/mariosy.service';
import { Subject, takeUntil, Observable } from 'rxjs';
import { getIconMariosTypeName } from 'src/app/utils/mariosUtils';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent } from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';


import { FormControl } from '@angular/forms';
import  {MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';



@Component({
  selector: 'app-create-marios',
  templateUrl: './create-marios.component.html',
  styleUrls: ['./create-marios.component.css']
})
export class CreateMariosComponent {

  constructor(private location: Location,
              private mariosyService: MariosyService){

//fruit
this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
  startWith(null),
  map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
);

              }
 
  mariosTypes: String[] = [];
  private destroy$: Subject<void> = new Subject()


  ngOnInit() {
    this.mariosyService.mariosTypes
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.mariosTypes = data
    })
  }

  goBack(): void {
    this.location.back();
  }

  getIconMariosTypeName(index: number):string{
    return getIconMariosTypeName(index);
  }

  // fruit

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry', 'aaa', 'bbb','ccc','ddd','eee'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }


}

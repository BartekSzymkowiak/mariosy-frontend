import { User } from './../../interfaces/user';
import { UserService } from './../../services/user.service';
import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MariosyService } from 'src/app/services/mariosy.service';
import { Subject, takeUntil, Observable } from 'rxjs';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { MariosType } from 'src/app/interfaces/mariosType';

interface Receiver {
  externalId: string;
  viewText: string;
}

@Component({
  selector: 'app-create-marios',
  templateUrl: './create-marios.component.html',
  styleUrls: ['./create-marios.component.css'],
})
export class CreateMariosComponent {
  constructor(
    private location: Location,
    private mariosyService: MariosyService,
    private userService: UserService
  ) {
  }

  mariosTypes: MariosType[] = [];
  private destroy$: Subject<void> = new Subject();

  ngOnInit() {
    this.mariosyService.mariosTypes
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mariosTypes = data;
      });

      this.filteredUsers = this.userCtrl.valueChanges.pipe(
        switchMap((term) => this.userService.searchUsers(term)),
        debounceTime(500)
      );

      //  this.userCtrl.valueChanges.pipe(
      //   switchMap((term) => this.userService.searchUsers(term)),
      //   debounceTime(500))
      //   .subscribe((resp : User[]) => {
      //     this.filteredUsers = resp.filter(e => e.externalId !== "aaa")  });
  }

  goBack(): void {
    this.location.back();
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  filteredUsers: Observable<User[]> = new Observable<User[]>;
  receivers: Receiver[] = [];

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement> =
    {} as ElementRef;

  announcer = inject(LiveAnnouncer);

  remove(userId: string): void {
    const index = this.receivers.findIndex((e) => e.externalId === userId);
    if (index >= 0) {
      this.receivers.splice(index, 1);
      this.announcer.announce(`Removed ${userId}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.receivers.push({
      externalId: event.option.value,
      viewText: event.option.viewValue,
    });
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }
}

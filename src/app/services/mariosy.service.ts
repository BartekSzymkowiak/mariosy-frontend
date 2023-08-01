import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marios } from '../interfaces/marios';
import { BehaviorSubject } from 'rxjs';
import { LAST_MARIOS_COUNT, USER_ID } from '../dev_constants';
import { MariosType } from '../interfaces/mariosType';

@Injectable({
  providedIn: 'root'
})
export class MariosyService {
  
  private MARIOS_TYPES_ICON_NAMES: string[] = ['green-star', 'blue-star', 'orange-star', 'purple-star', 'yellow-star', 'pink-star'];

  private mariosesUrl = 'api/marioses';  // URL to web api
  
  constructor( private http: HttpClient) { }

  private lastMarioses$ = new BehaviorSubject<Marios[]>([])
  private lastMariosesData: Marios[] = [];

  private createdMarioses$ = new BehaviorSubject<Marios[]>([])
  private createdMariosesData: Marios[] = [];
  private createdMariosesCount$ = new BehaviorSubject<number>(0)

  private receivedMarioses$ = new BehaviorSubject<Marios[]>([])
  private receivedMariosesData: Marios[] = [];
  private receivedMariosesCount$ = new BehaviorSubject<number>(0)

  private mariosTypes$ = new BehaviorSubject<MariosType[]>([])
  private mariosTypesData: MariosType[] = [];


  fetchLastMarioses(){
    const url = `${this.mariosesUrl}?page=0&size=${LAST_MARIOS_COUNT}`
     return this.http.get<Marios[]>(url)
     .subscribe((data) => {
       this.lastMariosesData = data;
       this.lastMarioses$.next(data)
     })
    }

  get lastMarioses() {
    if(this.lastMariosesData.length === 0) {
      this.fetchLastMarioses()
    }
    return this.lastMarioses$.asObservable()
  }


  fetchCreatedMarioses(){
      const url = `api/users/${USER_ID}/marioses/created`
      return this.http.get<Marios[]>(url)
      .subscribe((data) => {
        this.createdMariosesData = data;
        this.createdMarioses$.next(data)
        this.createdMariosesCount$.next(data.length)
      })
  }

  get createdMarioses() {
    if(this.createdMariosesData.length === 0) {
      this.fetchCreatedMarioses()
    }
    return this.createdMarioses$.asObservable()
  }

  get createdMariosesCount(){
    if(this.createdMariosesData.length === 0) {
      this.fetchCreatedMarioses()
    }
    return this.createdMariosesCount$.asObservable()
  }

  fetchReceivedMarioses(){
    const url = `api/users/${USER_ID}/marioses/received`
    return this.http.get<Marios[]>(url)
    .subscribe((data) => {
      this.receivedMariosesData = data;
      this.receivedMarioses$.next(data)
      this.receivedMariosesCount$.next(data.length)
    })
  }

  get receivedMarioses() {
    if(this.receivedMariosesData.length === 0) {
      this.fetchReceivedMarioses()
    }
    return this.receivedMarioses$.asObservable()
  }

  get receivedMariosesCount(){
    if(this.receivedMariosesData.length === 0) {
      this.fetchReceivedMarioses()
    }
    return this.receivedMariosesCount$.asObservable()
  }

  fetchMariosTypes(){
    const url = `${this.mariosesUrl}/types`
     return this.http.get<String[]>(url)
     .subscribe((data) => {
       
       this.mariosTypesData = data.map((type, index) => ( {
        id: index,
        text: type.toString(),
        iconName: this.MARIOS_TYPES_ICON_NAMES[index]
       }) );
       this.mariosTypes$.next(this.mariosTypesData);
     })
  }

  get mariosTypes(){
    if(this.mariosTypesData.length === 0) {
      this.fetchMariosTypes()
    }
    return this.mariosTypes$.asObservable()
  }



 }




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marios } from '../interfaces/marios';
import { BehaviorSubject } from 'rxjs';
import { LAST_MARIOS_COUNT, USER_ID } from '../dev_constants';



@Injectable({
  providedIn: 'root'
})
export class MariosyService {

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

  // private mariosesDataTest: Marios[] = [ { externalId: "123123",
  //                         creatorExternalId: "1",
  //                         receiversExternalIds: ["2","3"],
  //                         title: "Marios 4 you",
  //                         comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero arcu, auctor sed nisl vitae, pretium eleifend ipsum. Integer sed lacinia velit. Maecenas interdum nulla vel vulputate sagittis. Integer ac maximus augue. Curabitur dictum turpis mole.",
  //                         type: "MARIOS1",
  //                         creatorFirstName: "Robert",
  //                         creatorLastName: "Pudzianowski"},
  //                         {
  //                         externalId: "123124",
  //                         creatorExternalId: "1",
  //                         receiversExternalIds: ["2","3"],
  //                         title: "Marios 4 you",
  //                         comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero arcu, auctor sed nisl vitae, pretium eleifend ipsum. Integer sed lacinia velit. Maecenas interdum nulla vel vulputate sagittis. Integer ac maximus augue. Curabitur dictum turpis mole.",
  //                         type: "MARIOS3",
  //                         creatorFirstName: "Robert",
  //                         creatorLastName: "Pudzianowski"},
  //                         {
  //                           externalId: "123124",
  //                           creatorExternalId: "3",
  //                           receiversExternalIds: ["6","1"],
  //                           title: "Marios 4 you",
  //                           comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero arcu, auctor sed nisl vitae, pretium eleifend ipsum. Integer sed lacinia velit. Maecenas interdum nulla vel vulputate sagittis. Integer ac maximus augue. Curabitur dictum turpis mole.",
  //                           type: "MARIOS2",
  //                           creatorFirstName: "Robert",
  //                           creatorLastName: "Pudzianowski"},
  //                         {
  //                           externalId: "123124",
  //                           creatorExternalId: "2",
  //                           receiversExternalIds: ["1","7"],
  //                           title: "Marios 4 you",
  //                           comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero arcu, auctor sed nisl vitae, pretium eleifend ipsum. Integer sed lacinia velit. Maecenas interdum nulla vel vulputate sagittis. Integer ac maximus augue. Curabitur dictum turpis mole.",
  //                           type: "MARIOS1",
  //                           creatorFirstName: "Robert",
  //                           creatorLastName: "Pudzianowski"} ]

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

}

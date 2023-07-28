import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marios } from '../interfaces/marios';
import { BehaviorSubject } from 'rxjs';
import { USER_ID } from '../dev_constants';



@Injectable({
  providedIn: 'root'
})
export class MariosyService {

  private mariosesUrl = 'api/marioses';  // URL to web api
  
  
  constructor( private http: HttpClient) { }

  private marioses$ = new BehaviorSubject<Marios[]>([])
  private mariosesData: Marios[] = [];

  private createdMarioses$ = new BehaviorSubject<Marios[]>([])
  private createdMariosesData: Marios[] = [];
  private createdMariosesCount$ = new BehaviorSubject<number>(0)

  private receivedMarioses$ = new BehaviorSubject<Marios[]>([])
  private receivedMariosesData: Marios[] = [];
  private receivedMariosesCount$ = new BehaviorSubject<number>(0)

  private mariosesDataTest: Marios[] = [ { externalId: "123123",
                          creatorExternalId: "1",
                          receiversExternalIds: ["2","3"],
                          title: "Marios 4 you",
                          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero arcu, auctor sed nisl vitae, pretium eleifend ipsum. Integer sed lacinia velit. Maecenas interdum nulla vel vulputate sagittis. Integer ac maximus augue. Curabitur dictum turpis mole.",
                          type: "MARIOS1",
                          creatorFirstName: "Robert",
                          creatorLastName: "Pudzianowski"},
                          {
                          externalId: "123124",
                          creatorExternalId: "1",
                          receiversExternalIds: ["2","3"],
                          title: "Marios 4 you",
                          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero arcu, auctor sed nisl vitae, pretium eleifend ipsum. Integer sed lacinia velit. Maecenas interdum nulla vel vulputate sagittis. Integer ac maximus augue. Curabitur dictum turpis mole.",
                          type: "MARIOS3",
                          creatorFirstName: "Robert",
                          creatorLastName: "Pudzianowski"},
                          {
                            externalId: "123124",
                            creatorExternalId: "3",
                            receiversExternalIds: ["6","1"],
                            title: "Marios 4 you",
                            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero arcu, auctor sed nisl vitae, pretium eleifend ipsum. Integer sed lacinia velit. Maecenas interdum nulla vel vulputate sagittis. Integer ac maximus augue. Curabitur dictum turpis mole.",
                            type: "MARIOS2",
                            creatorFirstName: "Robert",
                            creatorLastName: "Pudzianowski"},
                          {
                            externalId: "123124",
                            creatorExternalId: "2",
                            receiversExternalIds: ["1","7"],
                            title: "Marios 4 you",
                            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero arcu, auctor sed nisl vitae, pretium eleifend ipsum. Integer sed lacinia velit. Maecenas interdum nulla vel vulputate sagittis. Integer ac maximus augue. Curabitur dictum turpis mole.",
                            type: "MARIOS1",
                            creatorFirstName: "Robert",
                            creatorLastName: "Pudzianowski"} ]

  fetchMarioses(){
     // this.http.get('/api/marioses').subscribe(data => console.log('MARIOSES:' + data))

     // this.mariosesData = this.mariosesDataTest;
     // this.marioses$.next([...this.mariosesData])

     return this.http.get<Marios[]>(this.mariosesUrl)
     .subscribe((data) => {
       this.mariosesData = data;
      // console.log(this.mariosesData)
       this.marioses$.next(data)
     })

    }

  get marioses() {
    if(this.mariosesData.length === 0) {
      this.fetchMarioses()
    }
    return this.marioses$.asObservable()
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marios } from '../interfaces/marios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MariosyService {

  private mariosesUrl = 'api/marioses';  // URL to web api

  
  constructor( private http: HttpClient) { }

  private marioses$ = new BehaviorSubject<Marios[]>([])
  private mariosesData: Marios[] = [];

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
      //this.http.get('/api/marioses').subscribe(data => console.log('MARIOSES:' + data))
      this.mariosesData = this.mariosesDataTest;
      this.marioses$.next([...this.mariosesData])
    }

  get marioses() {
    if(this.mariosesData.length === 0) {
      this.fetchMarioses()
    }
    return this.marioses$.asObservable()
  }

 
}

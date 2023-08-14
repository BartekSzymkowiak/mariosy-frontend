import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marios, MariosPayload } from '../interfaces/marios';
import { BehaviorSubject, combineLatest, zip } from 'rxjs';
import { MariosType } from '../interfaces/mariosType';
import { StringDictionary } from '../interfaces/stringDictionary';
import { mapMariosDTOToMarios } from 'src/app/utils/mariosUtils';

@Injectable({
  providedIn: 'root',
})
export class MariosyService {
  private MARIOS_TYPES_ICON_NAMES: string[] = [
    'green-star',
    'blue-star',
    'orange-star',
    'purple-star',
    'yellow-star',
    'pink-star',
  ];

  private MARIOS_TYPES_TEXT: StringDictionary = {
    MARIOS_T1: 'Thank You',
    MARIOS_T2: 'Impressive',
    MARIOS_T3: 'Exceptional',
    MARIOS_T4: 'Good Job',
    MARIOS_T5: 'WOW!',
    MARIOS_T6: 'I’m proud',
  };

  private mariosesUrl = 'api/marioses';

  constructor(private http: HttpClient) {}

  private createdMarioses$ = new BehaviorSubject<Marios[]>([]);
  private createdMariosesData: Marios[] = [];
  private createdMariosesCount$ = new BehaviorSubject<number>(0);

  private receivedMarioses$ = new BehaviorSubject<Marios[]>([]);
  private receivedMariosesData: Marios[] = [];
  private receivedMariosesCount$ = new BehaviorSubject<number>(0);

  private mariosTypes$ = new BehaviorSubject<MariosType[]>([]);
  private mariosTypesData: MariosType[] = [];

  getUserLastMarioses(userId: string) {
    if (this.createdMariosesData.length === 0) {
      this.fetchCreatedMarioses(userId);
    }
    if (this.receivedMariosesData.length === 0) {
      this.fetchReceivedMarioses(userId);
    }
    return combineLatest([this.createdMarioses$, this.receivedMarioses$]);
  }

  fetchCreatedMarioses(userId: string) {
    const url = `api/users/${userId}/marioses/created`;
    return this.http.get<Marios[]>(url).subscribe((data) => {
      this.createdMariosesData = data.map(mapMariosDTOToMarios);
      this.createdMarioses$.next(this.createdMariosesData);
      this.createdMariosesCount$.next(this.createdMariosesData.length);
    });
  }

  getCreatedMarioses(userId: string) {
    if (this.createdMariosesData.length === 0) {
      this.fetchCreatedMarioses(userId);
    }
    return this.createdMarioses$.asObservable();
  }

  getCreatedMariosesCount(userId: string) {
    if (this.createdMariosesData.length === 0) {
      this.fetchCreatedMarioses(userId);
    }
    return this.createdMariosesCount$.asObservable();
  }

  fetchReceivedMarioses(userId: string) {
    const url = `api/users/${userId}/marioses/received`;
    return this.http.get<Marios[]>(url).subscribe((data) => {
      this.receivedMariosesData = data.map(mapMariosDTOToMarios);
      this.receivedMarioses$.next(this.receivedMariosesData);
      this.receivedMariosesCount$.next(this.receivedMariosesData.length);
    });
  }

  getReceivedMarioses(userId: string) {
    if (this.receivedMariosesData.length === 0) {
      this.fetchReceivedMarioses(userId);
    }
    return this.receivedMarioses$.asObservable();
  }

  getReceivedMariosesCount(userId: string) {
    if (this.receivedMariosesData.length === 0) {
      this.fetchReceivedMarioses(userId);
    }
    return this.receivedMariosesCount$.asObservable();
  }

  fetchMariosTypes() {
    const url = `${this.mariosesUrl}/types`;
    return this.http.get<String[]>(url).subscribe((data) => {
      this.mariosTypesData = data.map((type, index) => ({
        id: index,
        text: this.MARIOS_TYPES_TEXT[type.toString()],
        value: type.toString(),
        iconName: this.MARIOS_TYPES_ICON_NAMES[index],
      }));
      this.mariosTypes$.next(this.mariosTypesData);
    });
  }

  get mariosTypes() {
    if (this.mariosTypesData.length === 0) {
      this.fetchMariosTypes();
    }
    return this.mariosTypes$.asObservable();
  }

  addMarios(payload: MariosPayload) {
    return this.http
      .post<Marios>(this.mariosesUrl, payload)
      .subscribe((data) => {
        this.createdMariosesData.push(mapMariosDTOToMarios(data));
        this.createdMarioses$.next(this.createdMariosesData);
        this.createdMariosesCount$.next(this.createdMariosesData.length);
      });
  }
}

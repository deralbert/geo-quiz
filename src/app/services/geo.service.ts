import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor() {
  }

  getLocation(): Observable<any> {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }

  getLoc() {
    let pos: any;
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          return pos = position;
        }
      );
    } else {
      return pos = 'Unsupported Browser';
    }
  }
}

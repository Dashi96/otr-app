import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {accessRights} from './app.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<accessRights[]> {
    return this.http.get('./assets/data.json').pipe(
      map((response: any) => {
        return response
      })
    );
  }
}

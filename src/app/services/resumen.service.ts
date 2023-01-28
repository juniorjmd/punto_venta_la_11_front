import { Injectable } from '@angular/core';
import { httpOptions } from '../models/app.db.url';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {
  requestOptions:any
  constructor() {
    
    const headers = httpOptions() ; ;
        this.requestOptions = { headers: headers };
   }
}

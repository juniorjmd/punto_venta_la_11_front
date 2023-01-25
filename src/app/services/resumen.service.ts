import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {
  requestOptions:any
  constructor() {
    
    const headers = this.requestOptions ;
        this.requestOptions = { headers: headers };
   }
}

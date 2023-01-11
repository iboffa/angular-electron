import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {

  get(prop: string){
    window.appStore.get(prop)
  }

  set(prop: string, value: any){
    window.appStore.set(prop, value)
  }

  delete(prop: string){
    window.appStore.delete(prop)
  }
}

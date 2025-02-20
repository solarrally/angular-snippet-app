import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ClientSideHelpersService {
  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
}
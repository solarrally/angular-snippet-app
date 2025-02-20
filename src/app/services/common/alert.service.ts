import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertMessageModel, IAlertMessageModel } from '../../models/common/alert-message.model'

@Injectable({
  providedIn: 'root',
})

export class AlertService {
  private _message$ = new BehaviorSubject<IAlertMessageModel>(new AlertMessageModel(false, null, null));

  public error$: Observable<IAlertMessageModel> = this._message$.asObservable();

  show(text: string, type: string): void {
    const alertMessage = new AlertMessageModel(true, text, type);
    this._message$.next(alertMessage);
  }

  hide(): void {
    const alertMessage = new AlertMessageModel(false, null, null);
    this._message$.next(alertMessage);
  }

  showMessage(): boolean {
    return this._message$.getValue()?.show ?? false;
  }
}
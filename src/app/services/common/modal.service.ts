import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})

export class ModalService {
  private _dialogRefs: Map<string, MatDialogRef<any>> = new Map();

  constructor(private dialog: MatDialog) {}

   open(
    key: string,
    component: ComponentType<unknown>,
    disableClose: boolean,
    data?: any,
    afterClosedCallback?: () => void) 
  {
    if (this._dialogRefs.has(key)) {
      return;
    }

    const dialogRef = this.dialog.open(component as any, { disableClose: disableClose });
    if (dialogRef.componentInstance && data) {
      (dialogRef.componentInstance as any).data = data;
    }

    this._dialogRefs.set(key, dialogRef);

    dialogRef.afterClosed().subscribe((preventAfterClosedCallback) => {
      this._dialogRefs.delete(key);

      if(afterClosedCallback && !preventAfterClosedCallback) {
        afterClosedCallback();
      }
    });
  }

  close(key: string, preventAfterClosedCallback?: boolean): void 
  {
    const dialogRef = this._dialogRefs.get(key);

    if (dialogRef) {
      dialogRef.close(preventAfterClosedCallback);

      this._dialogRefs.delete(key);
    }
  }
}
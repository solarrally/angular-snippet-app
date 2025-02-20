import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/common/alert.service';
import { ChangeDetectorRef } from '@angular/core';
import { IAlertMessageModel } from '../../../models/common/alert-message.model';

@Component({
  selector: 'alert',
  standalone: true,
  templateUrl: './alert.component.html'
})

export class AlertComponent implements OnInit {
    message: IAlertMessageModel| null = null;
  
    constructor(
        private alertService: AlertService, 
        private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.alertService.error$.subscribe(        
            (value) => {
                this.message = value;
                this.cdr.detectChanges();
        });
    }

    onClickHide(): void {
        this.alertService.hide();
    }
}
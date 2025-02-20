import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from '../../../services/common/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html'
})

export class SpinnerComponent implements OnInit {
    isLoading: boolean = false;
  
    constructor(private spinnerService: SpinnerService, 
      private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
      this.spinnerService.isLoading.subscribe(
        (value) => {
          this.isLoading = value;          
          this.cdr.detectChanges();
      });
    }
  }
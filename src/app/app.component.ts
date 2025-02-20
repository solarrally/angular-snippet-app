import { Component, OnInit } from '@angular/core';
import { 
  RouterOutlet, 
  Router, 
  NavigationStart, 
  NavigationEnd, 
  NavigationCancel, 
  NavigationError } 
  from '@angular/router';
import { SpinnerService } from './services/common/spinner.service';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, AlertComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  constructor(
    private router: Router, 
    private spinnerService: SpinnerService) {  
    }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.spinnerService.hide();
      }
    });
  }
}

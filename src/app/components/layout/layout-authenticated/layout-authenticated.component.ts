import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-authenticated',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './layout-authenticated.component.html'
})

export class LayoutAuthenticatedComponent {

}

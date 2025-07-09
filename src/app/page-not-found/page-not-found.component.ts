import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-page-not-found',
  imports: [HeaderComponent, MatButtonModule, RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {}

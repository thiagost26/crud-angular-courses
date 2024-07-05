import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [MatToolbar, RouterOutlet]
})
export class AppComponent {
  title = 'crud-angular';

  constructor(
    private router: Router,
  ) { }


  onTable() {
    this.router.navigate(['tabela']);
  }

  onCourses() {
    this.router.navigate(['courses']);
  }
}

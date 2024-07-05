import { Routes } from '@angular/router';


export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.routes').then(m => m.COURSES_ROUTES),
  },
  {
    path: 'tabela',
    loadChildren: () => import('./gerar-tabela/tabela.routes').then(m => m.TABELA_ROUTES),
  }
];

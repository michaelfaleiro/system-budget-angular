import { Routes } from '@angular/router';
import { BudgetComponent } from './pages/budget/budget.component';

export const routes: Routes = [
  {
    path: 'orcamentos',
    component: BudgetComponent,
    title: 'Orçamentos',
  },
];

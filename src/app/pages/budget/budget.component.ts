import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetService } from '../../services/budget/budget.service';
import { MessagesService } from '../../services/messages/messages.service';
import { CommonModule } from '@angular/common';
import { IBudget } from '../../interface/IBudget';
import { ModalNewBudgetComponent } from '../../components/modal-new-budget/modal-new-budget.component';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, ModalNewBudgetComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css',
})
export class BudgetComponent {
  budgets$ = new Observable<IBudget[]>();

  isModalBudget: boolean = false;

  budget: IBudget = <IBudget>{};

  constructor(
    private budgetService: BudgetService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.getAllBudgets();
  }

  showModalBudget() {
    this.budget = <IBudget>{};
    this.isModalBudget = !this.isModalBudget;
  }

  getAllBudgets() {
    this.budgets$ = this.budgetService.getAllBudgets();
  }

  putBudget(id: string, budget: IBudget) {
    this.budgetService
      .putBudget(id, budget)
      .subscribe(() => this.budgetService.getAllBudgets());
    this.messageService.add('Atualizado com Sucesso', 'success');
  }

  editBudget(id: string) {
    this.budgetService.getBudget(id).subscribe(
      (budget: IBudget) => {
        this.budget = budget;
        this.isModalBudget = true;
      },
      (error) => {
        this.messageService.add('Falha ao buscar dados', 'danger');
      }
    );
  }

  removeBudget(id: string) {
    this.budgetService.removeBudget(id).subscribe(() => this.getAllBudgets());
    this.messageService.add('Orçamento Excluído', 'danger');
  }
}

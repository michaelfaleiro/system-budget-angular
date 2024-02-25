import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBudget } from '../../interface/IBudget';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetService } from '../../services/budget/budget.service';
import { MessagesService } from '../../services/messages/messages.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-modal-new-budget',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modal-new-budget.component.html',
  styleUrl: './modal-new-budget.component.css',
})
export class ModalNewBudgetComponent implements OnInit {
  @Output() isModalBudget = new EventEmitter<void>();
  @Output() updateData = new EventEmitter<void>();

  @Input() budget: IBudget = <IBudget>{};

  isBusy: boolean = false;
  budgetForm!: FormGroup;

  constructor(
    private budgetService: BudgetService,
    private formBuilder: FormBuilder,
    private messageService: MessagesService
  ) {}

  closeModal() {
    this.isModalBudget.emit();
  }

  ngOnInit(): void {
    this.budgetForm = this.formBuilder.group({
      clientName: [
        this.budget.clientName,
        Validators.compose([Validators.required]),
      ],
      carName: [this.budget.carName, Validators.compose([Validators.required])],
      clientPhone: [
        this.budget.clientPhone,
        Validators.compose([Validators.required]),
      ],
      carVin: [this.budget.carVin],
      carPlate: [
        this.budget.carPlate,
        Validators.compose([Validators.maxLength(7)]),
      ],
    });
  }

  submit() {
    if (this.budgetForm.valid) {
      this.isBusy = true;

      if (this.budget.id) {
        this.budgetService
          .putBudget(this.budget.id, this.budgetForm.value)
          .pipe(tap(() => this.updateData.emit()))
          .subscribe(() => {
            this.closeModal(),
              this.messageService.add('Alterado com Sucesso', 'success');
          });
      } else {
        this.budgetService
          .postBudget(this.budgetForm.value)
          .pipe(tap(() => this.updateData.emit()))
          .subscribe(() => {
            this.closeModal(),
              this.messageService.add('Salvo com Sucesso', 'success');
          });
      }

      this.isBusy = false;
    }
  }

  isObjectEmpty(obj: any): boolean {
    return obj !== null && Object.keys(obj).length === 0;
  }
}

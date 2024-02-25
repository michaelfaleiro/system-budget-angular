import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewBudgetComponent } from './modal-new-budget.component';

describe('ModalNewBudgetComponent', () => {
  let component: ModalNewBudgetComponent;
  let fixture: ComponentFixture<ModalNewBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewBudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNewBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, finalize, map } from 'rxjs';
import { IBudget } from '../../interface/IBudget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private apiUrl = `${environment.api}budgets`;

  constructor(private http: HttpClient) {}

  getAllBudgets(): Observable<IBudget[]> {
    return this.http.get<{ data: IBudget[] }>(`${this.apiUrl}`).pipe(
      map((response) => response.data),
      finalize(() => {})
    );
  }

  getBudget(id: string): Observable<IBudget> {
    return this.http.get<{ data: IBudget }>(`${this.apiUrl}/${id}`).pipe(
      map((response) => response.data),
      finalize(() => {})
    );
  }

  postBudget(budget: IBudget): Observable<IBudget> {
    return this.http.post<IBudget>(this.apiUrl, budget);
  }

  putBudget(id: string, budget: IBudget) {
    return this.http.put<IBudget>(`${this.apiUrl}/${id}`, budget);
  }

  removeBudget(id: string): Observable<IBudget> {
    return this.http.delete<IBudget>(`${this.apiUrl}/${id}`);
  }
}

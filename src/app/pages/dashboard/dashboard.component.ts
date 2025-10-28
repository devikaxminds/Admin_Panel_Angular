import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { QuestionService, Question } from '../../core/services/question.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterModule,

  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  questions: Question[] = [];
  displayedColumns: string[] = ['index','question','type','createdOn','status'];

  loading = false;
  error = '';
  total = 0;
  page = 1;
  size = 10;
  typeFilter = 'match';
  search = '';
  totalPages = 0;

  constructor(
    private readonly questionService: QuestionService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.loading = true;
    this.error = '';
    this.questionService.getQuestions({
      page: this.page,
      size: this.size,
      type: this.typeFilter,
      search: this.search
    }).subscribe({
      next: res => {
        this.questions = res.data;
        this.total = res.total;
        this.page = res.page;
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || 'Failed to load questions';
        this.loading = false;
      }
    });
  }

  // Simple pagination example (previous / next)
  nextPage(): void {
    if (this.page * this.size < this.total) {
      this.page++;
      this.loadQuestions();
    }
  }
  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadQuestions();
    }
  }

  onRowClick(q: Question): void {
    // Placeholder: navigate or open details
    console.log('Clicked question', q);
  }

  onSearchChange(value: string): void {
    this.search = value;
    this.page = 1;
    this.loadQuestions();
  }
}
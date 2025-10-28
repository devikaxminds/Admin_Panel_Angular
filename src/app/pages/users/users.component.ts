import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { UserService, User } from '../../core/services/user.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  users: User[] = [];
  displayedColumns = ['index', 'name', 'coins', 'createdOn', 'status'];
  loading = false;
  error = '';

  constructor(private readonly router: Router,
              private readonly userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';
    this.userService.getUsers({ page: 1, size: 10 })
      .subscribe({
        next: (res) => {
          // adjust mapping if API shape differs
          this.users = res.data ?? [];
          this.loading = false;
        },
        error: (e) => {
          this.error = e.error?.message || 'Failed to load users';
          this.loading = false;
        }
      });
  }

  onRowClick(user: User) {
    this.router.navigate(['/users']);
  }
}

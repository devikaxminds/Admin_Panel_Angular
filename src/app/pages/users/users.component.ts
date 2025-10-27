import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


interface User {
  name: string;
  email: string;
  phone?: string;
  coins: number;
  createdOn: string;
  status: string;
  personalData: string;
  // profilePic?: string;
}

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
    
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: User[] = [
    { name: 'Dhan', email: 'DhhG@test.com', coins: 500, createdOn: '23/Sep/2025', status: 'Active', personalData: 'HV4J+FMJ, Technopark Campus, Kerala' },
    { name: 'HAR', email: 'haamk@gmail.com', phone: '+9198246589298', coins: 500, createdOn: '19/Aug/2025', status: 'Active', personalData: 'string' },
    { name: 'har', email: 'haa@example.com', coins: 500, createdOn: '19/Aug/2025', status: 'Active', personalData: 'string' },
    { name: 'jinu', email: 'jinu@gmail.com', phone: '+919656736682', coins: 480, createdOn: '11/Mar/2025', status: 'Active', personalData: 'tvm' },
    // Add more dummy users
  ];
  displayedColumns = ['index', 'name', 'coins', 'createdOn', 'status'];
}

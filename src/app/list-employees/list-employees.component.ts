import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Employee } from '../Models/Employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [CommonModule,DatePipe],
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeesComponent {
  employees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  currentPage = 1;
  pageSize = 10; 
  totalPages = 0;
  sortColumn: string = ''; 
  sortDirection: 'asc' | 'desc' = 'asc'; // Direction du tri

  constructor(private employeeService: EmployeesService) {}

  ngOnInit(): void {
    this.allEmployees();
  }

  allEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data.map((item: any) =>
          new Employee(
            item.id,
            item.firstName,
            item.lastName,
            item.email,
            item.contactNumber,
            item.dob,
            item.age,
            item.salary,
            item.address,
            item.imageUrl
          )
        );

        // Calculer le nombre total de pages
        this.totalPages = Math.ceil(this.employees.length / this.pageSize);

        // Initialiser la liste paginée
        this.updatePaginatedEmployees();
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  updatePaginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = this.employees.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedEmployees();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEmployees();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedEmployees();
  }
  sortData(column: string) {
    
    if (![ 'salary', 'dob'].includes(column)) {
      return; 
    }
  
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  
    this.employees.sort((a: any, b: any) => {
      let valueA = a[column];
      let valueB = b[column];
  
      
      if (column === 'dob') {
        valueA = new Date(a[column]).getTime();
        valueB = new Date(b[column]).getTime();
      }
  
      if (valueA == null || valueB == null) return 0;
  
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
  
      return 0;
    });
  
    this.updatePaginatedEmployees();
  }
  
  
  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'bi bi-sort-up' : 'bi bi-sort-down';
    }
    return 'bi bi-arrow-down-up'; 
  }
  
}

import { Routes } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

export const routes: Routes = [
    {path: '', redirectTo:'list-employees', pathMatch: 'full'},
    { path: 'list-employees', component: ListEmployeesComponent },
];

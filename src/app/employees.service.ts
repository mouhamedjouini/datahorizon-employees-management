import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Models/Employee';
const BASE_URL = 'https://retoolapi.dev/HYd96h/data'
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  
  constructor(private http:HttpClient) { }
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}`);
  }
}

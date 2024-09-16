import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/TaskManager'; // URL da API

  // Define o cabeçalho para JSON
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Método para criar uma nova tarefa (POST) com retorno da API
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/CreateTaskAsync`, task, this.httpOptions);
  }

  // Método para buscar tarefas (POST) com retorno da API
  searchTask(query: Task): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.apiUrl}/GetTasksByFilterAsync`, query, this.httpOptions);
  }

  // Método para editar uma tarefa existente (PUT) com retorno da API
  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/UpdateTaskAsync`, task, this.httpOptions);
  }

  // Método para remover uma tarefa (DELETE) com retorno da API
  removeTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteTaskAsync?idTask=${id}`, this.httpOptions);
  }
 
}
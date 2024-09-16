import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Task } from '../../../models/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from '../../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-manager-list',
  templateUrl: './task-manager-list.component.html'
})
export class TaskManagerListComponent implements OnInit {

  page = 1;
	pageSize = 10;
	tasks: Task[] = [];
  selectedTask: Task = new Task();
  form!: FormGroup;
  validateForm: boolean = false;
  
	constructor(library: FaIconLibrary, 
            private taskService: TaskService, 
            private readonly toastr: ToastrService,
            public readonly modalService: NgbModal) {

    library.addIcons(faStar, faHome, faUser);
  
    this.createForm();
	}

  createForm(){
    this.form = new FormGroup({
      responsible: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl(0, Validators.min(1))
    });
  }

  ngOnInit(): void {
    this.searchTask();
  }

  createTask() {

    if(!this.form.valid){
      this.validateForm = true;
      return;
    } 

    var data = Object.assign({ }, this.selectedTask, this.form.value) as Task;
    data.status = parseInt(this.form.controls['status'].value)
 
    this.taskService.createTask(data).subscribe({
      next: () =>{
        this.toastr.success('Operação realizada com sucesso');
        this.validateForm = false;
        this.createForm();
        this.searchTask();
      },
      error: (error) => {
        this.toastr.error(error.error)
      }
    });
  }

  searchTask() {
    this.validateForm = false;

    var data = Object.assign({ }, this.selectedTask, this.form.value) as Task;
    data.status = parseInt(this.form.controls['status'].value)

    this.taskService.searchTask(data).subscribe({
      next: (tasks) =>
        {
          let data = tasks as unknown as Task[];
          this.tasks = [];
          if(data?.length > 0)
          {
            this.tasks = data.map((task, i) => ({...task })).slice(
              (this.page - 1) * this.pageSize,
              (this.page - 1) * this.pageSize + this.pageSize,
            );
          }       
        }
    });
  }

  removeTask(){
    this.taskService.removeTask(this.selectedTask.id).subscribe({
      next: () =>{
        this.toastr.success('Operação realizada com sucesso');
        this.searchTask();
      },
      error: (error) => {
        this.toastr.error(error.error)
      }
    });
  }
  
  open(content: TemplateRef<any>, id: number) {
    this.selectedTask = this.tasks.filter(f => f.id == id)[0];
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
	}  
  
  getStatus(statusId: number) : string{
    switch(statusId)
    {
      case(1):
        return "A fazer";
      case(2):
        return "Fazendo";
      case(3):
        return "Feito";
      default:
        return "";
    }
  }
}

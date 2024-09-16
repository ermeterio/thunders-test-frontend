import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { TaskService } from '../../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../../models/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-manager-edit',
  templateUrl: './task-manager-edit.component.html'
})
export class TaskManagerEditComponent implements OnInit {
  @Input() task: Task = new Task();
  @Output() notify: EventEmitter<void> = new EventEmitter();
  form!: FormGroup;

  constructor(private taskService: TaskService, 
              private readonly toastr: ToastrService,
             public readonly modalService: NgbModal){}

  ngOnInit(): void {
    this.form = new FormGroup({
      responsible: new FormControl(this.task.responsible, Validators.required),
      description: new FormControl(this.task.description, Validators.required),
      status: new FormControl()
    });

    this.form.controls['status'].setValue(this.task.status);
    this.form.controls['status'].setValidators(Validators.min(1));
  }

  editTask(){

    var data = Object.assign({ }, this.task, this.form.value) as Task;
    data.status = parseInt(this.form.controls['status'].value)   

    this.taskService.editTask(data).subscribe({
      next: () =>{
        this.toastr.success('Operação realizada com sucesso');
        this.notify.emit();
        this.modalService.dismissAll();
      },
      error: (error) => {
        this.toastr.error(error.error)
      }
    });
  }
  
  closeModal()
  {
    this.modalService.dismissAll();
  }
}

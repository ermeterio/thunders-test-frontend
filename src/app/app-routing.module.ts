import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagerListComponent } from './pages/task-manager/task-manager-list/task-manager-list.component';

const routes: Routes = [
  { path: '', component: TaskManagerListComponent },
  { path: 'app-task-manager-list', component: TaskManagerListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

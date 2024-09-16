import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    AppRoutingModule
  ],
  exports: [
    MenuComponent
  ]
})
export class NavigationModule { }

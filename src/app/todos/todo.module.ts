import { TodoAddComponent } from "./todo-add/todo-add.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TodoRoutingModule } from "./todo-routing.module";
import { TodoFooterComponent } from "./todo-footer/todo-footer.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoPageComponent } from "./todo-page/todo-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FiltroPipe } from './filtro.pipe';

@NgModule({
  declarations: [
    TodoFooterComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoPageComponent,
    TodoAddComponent,
    FiltroPipe,
  ],
  imports: [CommonModule, TodoRoutingModule, ReactiveFormsModule],
  exports: [TodoPageComponent],
})
export class TodoModule {}

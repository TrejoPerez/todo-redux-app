import * as actions from "./../todo.actions";
import { Store } from "@ngrx/store";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Todo } from "./../models/todo.model";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { AppState } from "src/app/app.reducer";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  chkCompletado: FormControl;
  txtInput: FormControl;
  editando = false;
  @ViewChild("inputFisico") txtInputfisico: ElementRef;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkCompletado.valueChanges.subscribe((valor) => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }
  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputfisico.nativeElement.select();
    });
  }
  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid || this.txtInput.value === this.todo.texto) {
      return;
    }
    this.store.dispatch(
      actions.editar({ id: this.todo.id, texto: this.txtInput.value })
    );
  }
  borrar() {
    this.store.dispatch(actions.borrar({ id: this.todo.id }));
  }
}

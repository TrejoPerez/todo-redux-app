import * as actions from "./../../filtro/filtro.actions";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import { limpiaCompletados } from "../todo.actions";

@Component({
  selector: "app-todo-footer",
  templateUrl: "./todo-footer.component.html",
  styleUrls: ["./todo-footer.component.css"],
})
export class TodoFooterComponent implements OnInit {
  filtroActual: actions.filtrosValidos = "todos";
  filtros: actions.filtrosValidos[] = ["todos", "completados", "pendientes"];
  pendientes = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter((todo) => !todo.completado).length;
    });
  }
  cambiarFiltro(action: actions.filtrosValidos) {
    this.store.dispatch(actions.setFiltro({ filtro: action }));
  }
  limpiaCompletados() {
    this.store.dispatch(limpiaCompletados());
  }
}

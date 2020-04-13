import {
  crear,
  toggle,
  editar,
  borrar,
  toggleAll,
  limpiaCompletados,
} from "./todo.actions";
import { Todo } from "./models/todo.model";
import { createReducer, on } from "@ngrx/store";

export const estadoInicial: Todo[] = [
  new Todo("Primer Tarea"),
  new Todo("Segunda Tarea"),
  new Todo("Tercer Tarea"),
  new Todo("Cuarta Tarea"),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(limpiaCompletados, (state) => state.filter((todo) => !todo.completado)),
  on(toggleAll, (state, { activar }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado: activar,
      };
    });
  }),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  })
);
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}

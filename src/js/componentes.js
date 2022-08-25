import { todoList } from "..";
import { Todo } from "../classes";

// referencias
const todoListHTML = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {

  const todoHTML = `<li class="${ todo.completado ? 'completed' : ''  }" data-id="${ todo.id }">
                      <div class="view">
                        <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
                        <label>${  todo.tarea }</label>
                        <button class="destroy"></button>
                      </div>
                      <input class="edit" value="Create a TodoMVC template">
                    </li>`;

  const div = document.createElement('div');
  div.innerHTML = todoHTML;
  todoListHTML.append(div.firstElementChild);
  return div;

};

// eventos
txtInput.addEventListener('keyup', (event) => {

  if (event.keyCode === 13 && txtInput.value.length > 0 ) {
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHTML(nuevoTodo);
    txtInput.value = '';
  }

});

// console.log(todoList);
todoListHTML.addEventListener('click', (event)=> {

  const nombreElemento = event.target.localName;
  const todoElemento = event.target.parentElement.parentElement;
  const todoID = todoElemento.getAttribute('data-id');

  if ( nombreElemento.includes('input') ) {
    todoList.marcarCompletado( todoID );
    todoElemento.classList.toggle('completed');
  } else if( nombreElemento.includes('button') ) {
    todoList.eliminarTodo( todoID );
      todoListHTML.removeChild(todoElemento);
  }

});

btnBorrar.addEventListener('click', ()=> {

  // console.log(todoListHTML.children.length);
  todoList.eliminarCompletados();

  for (let index = todoListHTML.children.length - 1; index >= 0; index--) {

    const elemento = todoListHTML.children[index];

    if( elemento.classList.contains('completed') ) {
      todoListHTML.removeChild(elemento);
    }

  }

});

ulFiltros.addEventListener('click', (event)=> {

  const filtro = event.target.text;

  if(!filtro) { return; }

  anchorFiltros.forEach( el => el.classList.remove('selected') );
  event.target.classList.add('selected');

  for (const iterator of todoListHTML.children) {

    iterator.classList.remove('hidden');
    const completado = iterator.classList.contains('completed');

    switch (filtro) {
      case 'Pendientes':
        if (completado) {
          iterator.classList.add('hidden');
        }
        break;
      case 'Completados':
        if (!completado) {
          iterator.classList.add('hidden');
        }
        break;
    
    }

  }



})
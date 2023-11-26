// Seleccionar los elementos HMTL.
const input = document.getElementById('tarea');
const boton = document.querySelector('.button');
const listaDeTareas = document.getElementById('lista-tareas');
let tareasPendientes = [];

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('listaDeTareas') != null){
    tareasPendientes = JSON.parse(localStorage.getItem('listaDeTareas'));
    for (let i = 0; i < tareasPendientes.length; i++) {
      listaDeTareas.innerHTML += "<p>" + tareasPendientes[i] + "<i class='fa-regular fa-circle-xmark' onclick='eliminarTarea(event)' data-indice='" + i + "'></i>  </p>";
      
    }
  }
})

boton.addEventListener('click', agregarTarea);
input.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    agregarTarea();
  }
});

// Crear y agreagar una tarea a la lista de tareas
// en el DOM.
function agregarTarea(evento) {
  evento.preventDefault();
  if (input.value && input.value.length < 30) {
    let existe = false;

    for (let i = 0; i < tareasPendientes.length; i++) {
      if (tareasPendientes[i] == input.value) {
        existe = true;
      } else {
        existe = false;
      }
      
    }
    if(existe == false){
      tareasPendientes.push(input.value);
      listaDeTareas.innerHTML += "<p>" + input.value + "<i class='fa-regular fa-circle-xmark' onclick='eliminarTarea(event)'  data-indice='" + (tareasPendientes.length - 1) + "'></i>  </p>";
      localStorage.setItem('listaDeTareas', JSON.stringify(tareasPendientes));
    }else {
      alert("La tarea ya existe");
    }
  } else if(input.value == "") {
	alert("Debes introducir una tarea primero.")
  }else{
	  alert('La tarea es demasiado larga.');
  }
}

function eliminarTarea(event) {
  let indice = event.target.getAttribute('data-indice');
  if (indice !== null) {
    // Usa el índice para eliminar la tarea
    tareasPendientes.splice(indice, 1);
    localStorage.setItem('listaDeTareas', JSON.stringify(tareasPendientes));
  }

  // Elimina la tarea del DOM
  let tarea = event.target.parentNode;
  tarea.remove();
}




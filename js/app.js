function actualizarHora() {
	const tiempo = new Date();
	const $tiempo = document.querySelector(".time");
	const hora =
		tiempo.getHours() > 9 ? tiempo.getHours() : "0" + tiempo.getHours();
	const minutos =
		tiempo.getMinutes() > 9 ? tiempo.getMinutes() : "0" + tiempo.getMinutes();
	$tiempo.innerHTML = hora + ":" + minutos;
	setTimeout("actualizarHora()", 1000);
}
window.addEventListener("load", actualizarHora);

// Agregar tareas
const $boton = document.querySelector("#add");
function agregarTareas() {
	const $texto = document.querySelector("#texto");
	let $lista = document.querySelector(".tareas");
	let template =
		'<div class="tarea"><input type="checkbox" id="input{{}}"><label for="input{{}}">REEMPLAZAR</label><i id="tarea{{}}" class="far fa-trash-alt"></i></div>';

	// Verificar que el usuario escribio algo en el input
	if ($texto.value) {
		// iniciar el id de las tareas en 1
		let nroTarea = 1;

		// verificar si existen tareas agregadas para actualizar el id
		if ($lista.hasChildNodes()) {
			// obtener el ID de la primer tarea agregada (ubicado en el ultimo caracter)
			/**
			** $lista = lista de tareas
			** firstChild = cada una de las tareas. es un div
			** lastChild.id = es el id de cada tachito de basura. ultimo hijo
			*/
			nroTarea = Number(
				$lista.firstChild.lastChild.id[$lista.firstChild.lastChild.id.length - 1]
			);
			// y sumarle 1
			nroTarea += 1;
		}

		template = template.replace(/{{}}/g, nroTarea);
		template = template.replace(/REEMPLAZAR/, $texto.value);
		// $lista.innerHTML += template;  //*se agregaba el nuevo item al final
		$lista.innerHTML = template + $lista.innerHTML;

		//* Vaciar el input del usuario
		$texto.value = "";

		//actualizar la lista de tareas
		$trash = document.querySelectorAll(".fa-trash-alt");
		$trash.forEach((tarea) => {
			tarea.addEventListener("click", borrarTarea);
		});


		/****************************
		 ** Tachar cada tarea
		 ***************************/
		let $input = document.querySelectorAll("[type=checkbox]");
		$input.forEach(function (input) {
			input.addEventListener("change", function () {
				//obtener el id del input
				nroTarea = this.id;
				//obtener lista de tareas
				$lista = document.querySelector(".tareas");
				// iterar cada una de las tareas buscando que el id coincida
				$lista.childNodes.forEach(function (nodo) {
					if (nodo.firstChild.id == nroTarea) {

						// tachar el elemento al cambiar el estado del checkbox y
						// agregar o remover el atributo "checked" al input
						// nodo.childNodes[1].classList.toggle("tachado");
						if(nodo.firstChild.checked){ 
							nodo.childNodes[1].classList.add("tachado");
							nodo.firstChild.setAttribute("checked", "");
					}else{
						nodo.childNodes[1].classList.remove("tachado");
						nodo.firstChild.removeAttribute("checked");
					}
					}
				});
			});
		});
	}
}
$boton.addEventListener("click", agregarTareas);

//Borrar tareas
let $trash = document.querySelectorAll(".fa-trash-alt");
$trash.forEach((tarea) => {
	tarea.addEventListener("click", borrarTarea);
});

function borrarTarea() {
	//obtener el id de la tarea a borrar ( formato: tarea{{nro}} )
	let idTarea = this.id;

	//obtener lista de tareas
	$lista = document.querySelector(".tareas");
	// iterar cada una de las tareas buscando que el id coincida con el id del tachito de basura
	$lista.childNodes.forEach(function (nodo) {
		if (nodo.lastChild.id == idTarea) {
			$lista.removeChild(nodo);
		}
	});
}

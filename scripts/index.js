
//ACTIVIDAD 1 Crear una instancia de la clase Repository con la que trabajaremos en toda la actividad.
const nuevoRepository = new Repository();

//ACTIVIDAD 2.1 Recibir por parámetro un objeto instancia de Activity.
function tomarInstancia(actividad) {
    //2.2 Extraer sus propiedades en variables utilizando destructuring.
    const { id, title, description, imgUrl } = actividad;
    //2.3 Crear los elementos HTML que formarán parte de la tarjeta. Ej: <h3> para el título, <p> para la descripción, <img> para la imagen.
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const img = document.createElement('img');
    const btnCard= document.createElement('button');
    //2.4 Asignar los valores a las propiedades correspondientes a cada uno de los elementos. Ej: a la propiedad innerHTML del elemento del título, asignar el valor correspondiente. A la propiedad src del elemento de la imagen, asignar el valor correspondiente.
    h3.innerHTML = title;
    p.innerHTML = description;
    img.src = imgUrl;
    img.alt= `imagen de ${title}`;
    btnCard.innerHTML= 'Eliminar';
    // 2.5 Agregar a los elementos las clases CSS correspondientes que hayas implementado para darles estilos.
    h3.classList.add('titulo');
    p.classList.add('parrafo');
    img.classList.add('imgurl');
    btnCard.classList.add('btnCards');

    //2.6 Crear un elemento <div> que será la tarjeta donde incluiremos todos los demás elementos.
    const tarjeta = document.createElement('div');
    //2.7 “Appendear” al nuevo <div> los elementos creados anteriormente .
    tarjeta.appendChild(h3);
    tarjeta.appendChild(img);
    tarjeta.appendChild(p);
    tarjeta.appendChild(btnCard);
    //2.8 Asignar al <div> la clase CSS que tengas implementada para darle estilos.
    tarjeta.classList.add('tarjeta');
    //EXTRACREDIT
    const idTarjeta= id;
    btnCard.addEventListener('click', ()=>{
        const id= parseInt(idTarjeta);
        tarjeta.remove();
        nuevoRepository.deleteActivity(id);

        const listaActividades = document.getElementById('div-result');
        if(listaActividades.children.length=== 0){
            const listaP= document.createElement('p');
            listaP.innerHTML= 'Sin actividades por el momento';
            listaP.classList.add('p');
            listaActividades.appendChild(listaP);
            listaActividades.classList.remove('divResult');
            handler()
            
        } else{ 
            convertirHTML();
        }
    });

    //2.9 Retornar el <div> finalizado con todos los elementos correspondientes dentro.
    return tarjeta
}

//ACTIVIDAD 3.1: Seleccionar el contenedor donde queremos agregar las actividades.
function convertirHTML() {
    const listaActividades = document.getElementById('div-result');
    listaActividades.classList.add('divResult');
    //3.2 Vaciar el contenido actual del contenedor. Se puede hacer manipulando la propiedad innerHTML.
    listaActividades.innerHTML = '';
    //3.3 Obtener el listado completo de actividades mediante el método correspondiente de una instancia de Repository.
    const allActivities= nuevoRepository.getAllActivities();
    //3.4 “Mapear” el listado de actividades para convertirlos todos en elementos HTML. Para ello utilizar el método “map”, aprovechando como callback la función que hicimos en el punto anterior. Guardar el resultado del mapeo en una nueva variable.
    const listaMapeo = allActivities.map((actividad)=>tomarInstancia(actividad));
    //3.5 “Appendear” todos los elementos HTML del nuevo array dentro del contenedor seleccionado. Para ello puedes utilizar el método forEach.
    listaMapeo.forEach(obj => listaActividades.appendChild(obj));
}
//ACTIVIDAD 4.1: Seleccionar los inputs de title, description e imgUrl.
function handler(e) {
    e.preventDefault();
    const nameActivity = document.getElementById('activity');
    const description = document.getElementById('text-large');
    const image = document.getElementById('imgUrl');
    //4.2 Tomar los valores ingresados en los inputs y guardarlos en variables.
    const titulo = nameActivity.value;
    const parrafo = description.value;
    const url = image.value;
    //EXTRA: vaciar inputs
    nameActivity.value='';
    description.value= '';
    image.value= '';
    //4.3 Validar que estos valores estén completos. De lo contrario deberá cortar el proceso y mostrar un mensaje avisando al usuario de que hay datos incompletos.
    if (titulo.trim() === '' || parrafo.trim() === '' || url.trim() === '') {
        return alert('Hay datos incompletos')
    }
    //4.4 Llamar al método correspondiente de la instancia de Repository para crear una nueva actividad.    
    nuevoRepository.createActivity(titulo, parrafo, url);
    //4.5 Invocar la función que implementamos en el punto anterior para “refrescar” el contenedor de actividades.    
    convertirHTML()
}
//1. Seleccionar el botón que disparará el evento de agregar actividad y agregar un Event Listener. El evento, al dispararse, debe ejecutar la función que creamos en el punto anterior.
const boton = document.getElementById('btn');
boton.addEventListener('click', handler)

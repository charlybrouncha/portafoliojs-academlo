const formularioUI= document.querySelector('#form');
const listaActivUI = document.getElementById('listaActividades');
let arrayActividades=[];

const CrearItem = (actividad,dataTime)=>{
    let item = {
        actividad:actividad,
        dataTime:dataTime,
        estado:false
 
    };
    arrayActividades.push(item);
    return item;
}
const GuardarDB =() =>{
    localStorage.setItem('rutina',JSON.stringify(arrayActividades));
     PaintDB();
};
const PaintDB = () =>{
    listaActivUI.innerHTML='';

    arrayActividades=JSON.parse(localStorage.getItem('rutina'));

    if (arrayActividades===null) {
        arrayActividades=[];
         }else{
    arrayActividades.forEach(element => {
        console.log(element.estado);
    if (element.estado) {
            listaActivUI.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons">accessibility</i><p>${element.actividad}</p><b>${element.dataTime}</b>- ${element.estado}<span class="result"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;
         }else{
            listaActivUI.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons">accessibility</i><p>${element.actividad}</p><b>${element.dataTime}</b>- ${element.estado}<span class="result"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;

        }
    });
        }
    }

const EliminarDB = (actividad)=>{
      arrayActividades.forEach((elemento,index)=>{
        if (elemento.actividad===actividad) {
            indexArray = index;
        }  
      });
      arrayActividades.splice(indexArray,1);
      GuardarDB();
    }

    const EditarDB=(actividad)=>{
        let indexArray=arrayActividades.findIndex((elemento)=>elemento.actividad===actividad);
        arrayActividades[indexArray].estado=true;
        GuardarDB();
    }


formularioUI.addEventListener('submit',(e)=>{
    e.preventDefault();
    let actividadUI = document.querySelector('#name-ejer').value;
    let modelCar = document.querySelector('#tim').value;// valores del formulario
    CrearItem(actividadUI,modelCar);
    GuardarDB();
    formularioUI.reset();


})
document.addEventListener('DOMcontentLoaded',PaintDB);

  listaActivUI.addEventListener('click',(e)=>{
    e.preventDefault();

    if (e.target.innerHTML==='done' || e.target.innerHTML==='delete') {
      const text = e.path[2].childNodes[1].innerHTML;
      if (e.target.innerHTML==='delete') {
          EliminarDB(text);
      }  
      if (e.target.innerHTML==='done') {
          EditarDB(text);
      }
    };
});
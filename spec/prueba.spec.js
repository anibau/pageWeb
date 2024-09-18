
// todoList
// -debe ser una clase
// - debe tener los metodos
//  - gettodos(): debe retornar la lista de tareas
//  - addtodos(): debe pushear al array una tarea nueva
//  -deletetodos(): deberia eliminar la ultima tarea

const {Activity, Repository}= require('../scripts/test');

describe('La clase Repository', ()=>{
  const repository= new Repository();
   beforeEach(() =>{
    repository.createActivity('title1', 'descriptio1', 'imgurl1')});
  afterEach(()=>{      repository.activities= [] ;
    repository.contadorId= 0;
     });
  
  it('repository debe ser una clase ', ()=>{
    expect(typeof Repository.prototype.constructor).toBe('function');
    expect(typeof Activity.prototype.constructor).toBe('function');
  });

  it('debe ser una instancia de la clase repository', ()=>{
    expect(repository instanceof Repository).toBe(true);
  });

  it('debe contener los metodos ', ()=>{
    expect(repository.getAllActivities).toBeDefined();
    expect(typeof repository.getAllActivities).toBe('function');
    expect(repository.createActivity).toBeDefined();
    expect(typeof repository.createActivity).toBe('function');
    expect(repository.deleteActivity).toBeDefined();
    expect(typeof repository.deleteActivity).toBe('function');
  });
    
  it('getAllActivities(): debe retornar la lista de tareas', ()=>{
    const lista= repository.getAllActivities();
    expect(Array.isArray(lista)).toBeTrue();
  });

  it('createActivity(): debe pushear al array una tarea nueva', ()=>{
    const lista= repository.getAllActivities().length; //1
    repository.createActivity('title2', 'descriptio2', 'imgurl2');
    expect(repository.getAllActivities().length).toEqual(lista +1);
    const listaNueva= repository.getAllActivities().length; //2
    const actividades= repository.getAllActivities(); 
    expect(actividades[listaNueva-1].title).toContain('title2')
    });

  it('deleteActivity(): deberia eliminar la ultima tarea', ()=>{
    const longitud= repository.getAllActivities().length; //1
    expect(repository.getAllActivities().length).toBe(1);
    //expect(repository.getAllActivities()).toContain(expectActivity)
    repository.deleteActivity(longitud-1);
    expect(repository.getAllActivities().length).toBe(0)
  });  
it('incrementar IDS', ()=>{
  const actividades= repository.getAllActivities()[0].id;
  expect(repository.getAllActivities()[0].id).toBe(0);
  repository.getAllActivities().forEach((act, i)=> expect(repository.getAllActivities()[i].id).toBe(i));
});
it('eliminar por id',()=>{
  repository.deleteActivity(0);
  expect(repository.getAllActivities()).toEqual([]);
})

});

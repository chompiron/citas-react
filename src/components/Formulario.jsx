import { useState, useEffect } from "react"
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  //console.log(paciente);

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(()=>{
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  

  const generarID = ()=>{
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }
 

  const handleSubmit = (e)=>{
    e.preventDefault();

    //Validacion del formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      //console.log('hay al menos un campo vacio');
      setError(true);
      return;
    }

    setError(false);

    //Objeto de Pacientes
    const objetoPacientes= { 
      nombre, 
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      //Editando el registro
      objetoPacientes.id = paciente.id;
      const pacientesActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPacientes : pacienteState);

      setPacientes(pacientesActualizado);
      setPaciente({})
    }else{
      //Nuevo rehgistro
      objetoPacientes.id = generarID()
      setPacientes([...pacientes, objetoPacientes]);
      
    }
    //console.log(objetoPacientes);


    //Reiniciar Formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

    
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {''} <span className="text-indigo-600 font-bold">Administralos</span> </p>

            <form
               
               onSubmit= {handleSubmit}
               className="bg-white shadow-md rounded-lg py-10 px-5"
              >
              {error && <Error mensaje='Todos los campos son obligatorios'/>}
              <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Mascota:</label>

                <input
                   type="text"
                   placeholder="Nombre de la Mascota"
                   className="border-2 w-full p-2 mt-2 placeholder-indigo-300 rounded-md text-indigo-600"
                   id="mascota"
                   value={nombre}
                   onChange={(e)=> setNombre(e.target.value)}

                />
              </div>

              <div className="mb-5">
                <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario:</label>

                <input
                   type="text"
                   placeholder="Nombre del Propietario"
                   className="border-2 w-full p-2 mt-2 placeholder-indigo-300 rounded-md text-indigo-600"
                   id="propietario"
                   value={propietario}
                   onChange={(e)=> setPropietario(e.target.value)}

                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold">E-mail:</label>

                <input
                   type="email"
                   placeholder="E-mail"
                   className="border-2 w-full p-2 mt-2 placeholder-indigo-300 rounded-md text-indigo-600"
                   id="email"
                   value={email}
                   onChange={(e)=> setEmail(e.target.value)}

                />
              </div>
              <div className="mb-5">
                <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Fecha:</label>

                <input
                   type="date"
                   className="border-2 w-full p-2 mt-2 rounded-md text-indigo-600"
                   id="alta"
                   value={fecha}
                   onChange={(e)=> setFecha(e.target.value)}

                />
              </div>
              <div className="mb-5">
                <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas:</label>

                <textarea
                  id="sintomas"
                  placeholder="Descrive los Sintomas"
                  className="border-2 w-full p-2 mt-2 rounded-md placeholder-indigo-300 text-indigo-600"
                  value={sintomas}
                   onChange={(e)=> setSintomas(e.target.value)}
                />
              </div>

              <div>
                <input 
                  type="submit" 
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-indigo-700 cursor-pointer transition-all"
                  value={paciente.id ?  "Editar Paciente" : "Agregar Paciente"}
                />
              </div>
            </form>
        

    </div>
  )
}

export default Formulario


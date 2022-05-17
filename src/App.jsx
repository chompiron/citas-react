import { useState, useEffect } from 'react'
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPaciente from "./components/ListadoPacientes";



function App() {
  
  

  const [pacientes, setPacientes] = useState([]);
  const [paciente,setPaciente] = useState({});

  useEffect(()=>{
    const obtenerLS = ()=>{
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
      console.log('componentef Listo');
    }
    obtenerLS();
  }, []);

    
  
  

  useEffect(()=>{
    
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
    console.log('componente listo o cambió pacientes')
  }, [pacientes]);

  
  
  

  const eliminarPaciente = id=>{
    const pacientesActualizado = pacientes.filter(paciente=> paciente.id !== id);
    setPacientes(pacientesActualizado);
  } 
 

  return (
    <div className="container mx-auto mt-20">
      <Header 
        
      />

      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
          
        />

        <ListadoPaciente
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
          setPacientes={setPacientes}
         />
      </div>
     
    </div>
    
  )
}

export default App

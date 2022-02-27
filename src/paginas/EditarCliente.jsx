import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from "../components/Formulario"

const EditarCliente = () => {

    const [cargando, setCargando] = useState(false)

    const [cliente, setCliente] = useState({})
    const {id} = useParams()

    useEffect(() =>{
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(false)
        }
        obtenerClienteAPI()
    },[])

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-10'>Edita un Cliente
        </p>
        {cliente?.nombre ? (
        <Formulario 
        cliente={cliente}
        cargando={cargando}
      />
      ):
      <p>Cliente ID no válido</p>}
        
    </>
  )
}

export default EditarCliente
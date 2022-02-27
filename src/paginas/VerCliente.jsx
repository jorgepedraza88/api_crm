import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Snipper from '../components/Snipper'

const VerCliente = () => {

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
    cargando ? <Snipper />:
        Object.keys(cliente).length === 0 ?
         <p>No hay resultados</p> : (

        <div>
            <h1 className='font-black text-4xl text-blue-900 '>Ver Cliente {cliente.nombre}</h1>
            <p className='mt-10'>Información del cliente
            </p>
            <p className='text-2xl text-gray-600 mt-10'>
                <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
                {cliente.nombre} 
            </p>
            <p className='text-2xl text-gray-600 mt-4'>
                <span className='text-gray-800 uppercase font-bold'>Email: </span>
                {cliente.email} 
            </p>
            <p className='text-2xl text-gray-600 mt-4'>
                <span className='text-gray-800 uppercase font-bold'>Teléfono: </span>
                {cliente.telefono} 
            </p>
            <p className='text-2xl text-gray-600 mt-4'>
                <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
                {cliente.empresa} 
            </p>
            {cliente.notas && (
                <p className='text-2xl text-gray-600 mt-4'>
                <span className='text-gray-800 uppercase font-bold'>Notas: </span> 
                {cliente.notas} 
            </p>
            )} 
                
            
        </div>
    )


    
  )
}

export default VerCliente
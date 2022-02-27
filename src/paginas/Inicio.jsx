import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  // Este State almacena los clientes registrados en la API
  const [clientes, setClientes] = useState([])

  // useEffect para recoger mediante GET, el listado de objetos de una API
  useEffect(() => {
    const obtenerClientesAPI = async () => {
        try {
          const url = 'http://localhost:4000/clientes'
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()

          setClientes(resultado) /* Esta línea se encarga de almacenar los datos en el State */

        } catch (error) {
          console.log(error)
        }
    }

    obtenerClientesAPI()
  }, [])

    const handleEliminar =  async(id) => {
      const confirmar = confirm('¿Deseas eliminar este cliente?')

       if(confirmar) {
          try {
            const url = `http://localhost:4000/clientes/${id}`
            const respuesta = await fetch(url, {
              method: 'DELETE'
            })

            await respuesta.json()

            const arrayClientes = clientes.filter( cliente => cliente.id !== id)
            setClientes(arrayClientes)
          } catch (error) {
            
            console.log(error)
          }

       }
    }
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
        <p className='mt-10'>Administra tus clientes</p>

        <table className='w-full mt-5 table-auto shadow bg-white text-center'>
          <thead className='bg-blue-800 text-white'>
            <tr>
                <th className='p-2'>ID</th>
                <th className='p-2'>Nombre</th>
                <th className='p-2'>Contacto</th>
                <th className='p-2'>Empresa</th>
                <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
              {clientes.map( cliente => (
                <Cliente 
                  key={cliente.id}
                  cliente={cliente}
                  handleEliminar={handleEliminar}
                />
              ))}
          </tbody>

        </table>
        
    </>
  )
}

export default Inicio
import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {
    const navigate = useNavigate()

    const { nombre, empresa, email, telefono, notas, id} = cliente

  return (
    <tr className='border-b hover:bg-gray-100'>
        <td className='p-3'>{id}</td>
        <td className='p-3'>{nombre}</td>
        <td className='p-3'>
            <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
            <p><span className='text-gray-800 uppercase font-bold'>Tel: </span>{telefono}</p>
        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
            <button type='button'
                    className='bg-emerald-600 hover:bg-emerald-700 block w-full text-white p-2 uppercase font-semibold text-xs mb-2'
                    onClick={() => navigate(`/clientes/${id}`)}>Ver</button>
            <button type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-semibold text-xs mb-2'
                    onClick={() => navigate(`/clientes/editar/${id}`)}>Editar</button>
            <button 
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-semibold text-xs'
                    onClick={() => handleEliminar(id)}>Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente
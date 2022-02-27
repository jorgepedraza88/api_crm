import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Snipper from './Snipper'

const Formulario = ({cliente, cargando}) => {

    // useNavigate es una función de React Router que nos redirige a la página que nosotros seleccionemos.
    const navigate = useNavigate()

    // Validación del formulario con Yup
    const nuevoClienteSchema = Yup.object().shape({
        nombre:  Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(30, 'El nombre es muy largo')
                    .required('El Nombre del Cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email:   Yup.string()
                    .email('Email no válido')
                    .required('El email es obligatorio'),
        telefono: Yup.number().typeError('El número no es válido')
                    .positive('Número no válido')
                    .integer('Número no válido'),
        notas: '',
    })

    // Acción al enviar el formulario
    const handleSubmit = async (valores) => {
        try {
            let respuesta
            if(cliente.id) {
                // Editando un cliente
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                method: 'PUT',
                // El body es la información que se envía, hay que convertirlo de un Object a un String
                body: JSON.stringify(valores),
                /* Este método es obligatorio de JSON-Server pero puede cambiar */
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            } else {
                // Nuevo Cliente
            const url = 'http://localhost:4000/clientes'

            respuesta = await fetch(url, {
                method: 'POST',
                // El body es la información que se envía, hay que convertirlo de un Object a un String
                body: JSON.stringify(valores),
                /* Este método es obligatorio de JSON-Server pero puede cambiar */
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
            await respuesta.json()
            

            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

  return (
      cargando ? <Snipper /> : (  
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                
                <h1 className='text-grey-600 font-bold text-xl uppercase text-center '>{cliente.nombre ? 'Editar Cliente' : 'Añadir Cliente'}</h1>

                <Formik
                        initialValues={{
                            nombre: cliente?.nombre ?? '', /* Igual que la línea de abajo pero más corto */
                            empresa: cliente.empresa ? cliente.empresa : '', /* Si existen los datos los muestra, sino es un string vacío - Con ternarios */
                            email: cliente?.email ?? '',
                            telefono: cliente?.telefono ?? '',
                            notas: cliente?.notas ?? '',
                        }}
                        enableReinitialize={true}
                        // Envio de Formulario y RESET del formulario. Importante asycn await
                        onSubmit={ async (values, {resetForm}) => {
                            await handleSubmit(values)
                            resetForm()
                        }}
                        validationSchema={nuevoClienteSchema}
                >
                        {({errors, touched}) => {
                            /* console.log(data) */
                            return (  
                        <Form
                            className='mt-10'
                        >
                        <div className='mb-4'>
                            <label 
                                    className='text-gray-800'
                                    htmlFor='nombre'
                            
                            >Nombre:</label>
                            <Field 
                                    id='nombre'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-100'
                                    placeholder='Nombre del Cliente'
                                    name='nombre'
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ): null }
                            
                        </div>
                        <div className='mb-4'>
                            <label 
                                    className='text-gray-800'
                                    htmlFor='nombre'
                            
                            >Empresa:</label>
                            <Field 
                                    id='empresa'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-100'
                                    placeholder='Empresa del Cliente'
                                    name='empresa'
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            ): null }
                        </div>
                        <div className='mb-4'>
                            <label 
                                    className='text-gray-800'
                                    htmlFor='nombre'
                            
                            >Email:</label>
                            <Field 
                                    id='email'
                                    type='email'
                                    className='mt-2 block w-full p-3 bg-gray-100'
                                    placeholder='Email del Cliente'
                                    name='email'
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            ): null }
                        </div>
                        <div className='mb-4'>
                            <label 
                                    className='text-gray-800'
                                    htmlFor='nombre'
                            
                            >Teléfono:</label>
                            <Field 
                                    id='telefono'
                                    type='tel'
                                    className='mt-2 block w-full p-3 bg-gray-100'
                                    placeholder='Teléfono del Cliente'
                                    name='telefono'
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ): null }
                        </div>
                        <div className='mb-4'>
                            <label 
                                    className='text-gray-800'
                                    htmlFor='nombre'
                            
                            >Notas: (opcional)</label>
                            <Field 
                                    as='textarea'
                                    id='notas'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-100 h-40'
                                    placeholder='Notas del Cliente'
                                    name='notas'
                            />
                        </div>

                        <input
                                type='submit'
                                value={cliente.nombre ? 'Editar Cliente' : 'Añadir Cliente'}
                                className='mt-5 w-full bg-blue-800 hover:bg-blue-900 p-3 text-white uppercase font-bold text-lg cursor-pointer'
                        />
                        
                    </Form>
                    )}}
                </Formik>

            </div>
      )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
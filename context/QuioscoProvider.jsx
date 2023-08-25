import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ( {children} ) => {

  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [nombre, setNombre] = useState('')
  const [total, setTotal] = useState(0)

  const router = useRouter()

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')
    setCategorias(data)    
  }

  useEffect( () => {
    obtenerCategorias()
  },[])

  // cuando tengo cargado categorias, seteo la opcion por defecto
  useEffect(() => {
    setCategoriaActual(categorias[0])
  },[categorias])
 
  useEffect( () => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.cantidad * producto.precio) + total, 0)
    setTotal(nuevoTotal)
  },[pedido])

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter(cat => cat.id === id)
    setCategoriaActual(categoria[0])
    router.push('/')
  }


  const handleSetProducto = producto => {
    setProducto(producto)
  }


  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleEditarCantidades = id => {
    const productoActualizar = pedido.filter( producto => producto.id === id)
    setProducto(productoActualizar[0])
    setModal(!modal)
  }

  const handleEliminarProducto = id => {
    const pedidoActualizado = pedido.filter( producto => producto.id !== id)
    setPedido(pedidoActualizado)
  }


  const handleAgregarPedido = ({categoriaId, ...producto}) => {  // con este destructuring lo que hago es quitar del objeto categoriaId e Imagen porque no los necesito !!
    // verifico si el producto ya existia en el pedido
    if (pedido.some( productoState => productoState.id === producto.id)) {
      // recorro el pedido y en lugar del producto existente, cuando lo encuentre lo reemplazo por el producto con la cantidad nueva
      const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
      setPedido(pedidoActualizado)
      toast.success('Guardado Correctamente', {autoClose: 3000})
    } else {      
      setPedido([...pedido, producto])                    // lo que hace es agregar al arreglo de pedidos el nuevo objeto producto que incluye la cantidad
      toast.success('Agregado al Pedido', {autoClose: 3000})
    }    
    setModal(false)  // despues de pedir, cierro el modal
  }

  const colocarOrden = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() } )   // por defecto axios es GET salvo que se indique lo contrario y SIEMPRE voy a tener un data (en fetch no)
                                                        // le agrego la fecha y como string porque lo que envio es lo que necesito segun el modelo de la base de datos para Ordenes

    // Resetear la app para volver a empezar reseteando los states    
    setCategoriaActual(categorias[0])  // vuelve a la inicial    
    setPedido([])
    setNombre('')
    setTotal(0)

    toast.success('Pedido Realizado Correctamente')
    
    setTimeout(() => {
      router.push('/')
    }, 3000);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,    
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}

export {
  QuioscoProvider
}

export default QuioscoContext
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id)
        setCategoriaActual(categoria[0])
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido =({categoriaId, ...producto}) => {

        if(pedido.some(productoState => productoState.id === producto.id)){

            //Actualizar la cantidad exitente en el pedido
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)

            setPedido(pedidoActualizado)
            toast.success('Pedido Actualizado Correctamente')
        } else{
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }

    const handleEditarCantidades = id => {
        console.log(id)
    }


    return(
        <>
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
                    handleEditarCantidades
                }}
            >
                {children}
            </QuioscoContext.Provider> 
        </>
    )
}

export{
    QuioscoProvider
}

export default QuioscoContext
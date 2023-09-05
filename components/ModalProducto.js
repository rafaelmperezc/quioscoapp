import { useState, useEffect } from "react"
import Image from "next/image"
import useQuisco from "@/hooks/useQuisco"
import { formatearDinero } from "@/helpers"

const ModalProducto = () => {

    const {producto, handleChangeModal, handleAgregarPedido, pedido} = useQuisco()
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)

    useEffect(() => {
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            
            const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)
                        
            setEdicion(true);
            setCantidad(productoEdicion.cantidad);
        }
    }, [producto, pedido])

    return (
        <>
            <div className="md:flex gap-10">
                <div className="md:w-1/3">
                    <Image
                        width={300}
                        height={400}
                        alt={`imagen producto ${producto?.nombre}`}
                        src={`/assets/img/${producto?.imagen}.jpg`}
                    />
                </div>

                <div className="md:w-2/3">

                    <div className="flex justify-end">
                        <button onClick={handleChangeModal}>
                            <Image
                                width={25}
                                height={25}
                                src="/assets/img/cerrar.svg"
                                alt="Cerrar"
                            />
                        </button>
                    </div>
                    
                    <h1 className="text-3xl font-bold mt-5">
                        {producto?.nombre}
                    </h1>

                    <p className="mt-5 font-black text-5xl text-amber-500">
                      {formatearDinero(producto.precio)}  
                    </p>

                    <div className="flex gap-4  mt-5">
                        <button type="button" onClick={() =>{
                            if(cantidad <= 1) return
                            setCantidad(cantidad - 1)
                        }}>
                            <Image
                                width={20}
                                height={20}
                                src="/assets/img/minus.svg"
                                alt="quitar"
                            />
                        </button>

                        <p className="text-3xl">
                            {cantidad}
                        </p>

                        <button type="button" onClick={() =>{
                            setCantidad(cantidad + 1)
                        }}>
                            <Image
                                width={20}
                                height={20}
                                src="/assets/img/plus.svg"
                                alt="agregar"
                            />
                        </button>
                    </div>

                    <button type="button" className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded" onClick={() => handleAgregarPedido({...producto, cantidad})}>
                        {edicion ? "Guardar Cambios" : "Añadir al Pedido"}
                    </button>

                </div>
            </div>
        </>
    )
}

export default ModalProducto
import { useRouter } from "next/router";
import useQuisco from "@/hooks/useQuisco";

const pasos = [
    {paso: 1, nombre: 'Menú', url:'/'},
    {paso: 2, nombre: 'Resumen', url:'/resumen'},
    {paso: 3, nombre: 'Datos y Total', url:'/total'},
];

const Pasos = () => {

    const { handleChangePaso, paso } = useQuisco()
    const router = useRouter()
    console.log(paso)

    return(
        <>
            <div className="flex justify-between mb-5">
                {pasos.map(paso => (
                    <button
                        onClick={() => {
                            router.push(paso.url)
                            handleChangePaso(paso.paso)
                        }}
                        className="text-2xl font-bold"
                        key={paso.paso}> {paso.nombre}
                    </button>
                ))}
            </div>

            <div className="bg-gray-100 mb-10">
                <div className="rounder-full bg-amber-500 text-xs leading-none h-2 text-center text-white">
                    
                </div>
            </div>
        </>
    )
};

export default Pasos;
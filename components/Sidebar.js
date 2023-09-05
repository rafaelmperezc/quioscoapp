import Image from "next/image"
import useQuisco from "@/hooks/useQuisco"
import Categoria from "./Categoria";

const Sidebar = () => {

  const {categorias} = useQuisco();

  return (
    <>
        <div className="flex justify-center mt-5">
        <Image
          width={100}
          height={100}
          src="/assets/img/logo.svg"
          alt="Imagen logotipo"
        />
        </div>

        <nav className="mt-10">
            {categorias.map(categoria => (
              <Categoria
                key={categoria.id}
                categoria={categoria}
              />
            ))}
        </nav>
    </>
  )
}

export default Sidebar
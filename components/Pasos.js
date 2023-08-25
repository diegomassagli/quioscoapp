import { useRouter } from 'next/router'

const pasos = [
  {paso: 1, nombre: "Menu", url: "/"},
  {paso: 2, nombre: "Resumen", url: "/resumen"},
  {paso: 3, nombre: "Datos y Total", url: "/total"},
];

const Pasos = () => {

  const router = useRouter()

  const calcularProgreso = () => {
    // opcion 1
    // const porcentaje = (paso / 3) * 100
    // return porcentaje

    // opcion 2  pero finalmente como se pierde al recargar, uso router.pathname
    let valor;
    if (router.pathname === "/" ) {
      valor = 2;
    } else if (router.pathname === "/resumen") {
      valor = 50
    } else {
      valor = 100
    }
    return valor
  }

  return (
  <>
    <div className="flex justify-between mb-5">
      {pasos.map( paso => (
        <button 
          onClick={()=> {
            router.push(paso.url)            
          }}
          className="text-2xl font-bold"
          key={paso.paso}>{paso.nombre}
        </button>
      ))}      
    </div>
    <div className='bg-gray-200 mb-10'>
      <div className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white' style={{ width: `${calcularProgreso()}%` }}>

      </div>
    </div>
  </>
  )
}

export default Pasos

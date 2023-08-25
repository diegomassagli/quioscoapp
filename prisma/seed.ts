import { categorias } from './data/categorias'
import { productos } from './data/productos'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const main = async () : Promise<void> => {   // aca usa algo de typescript indica que esta funcion es un promise y no retorna nada
  try {

    await prisma.categoria.createMany({
      data: categorias
    })

    await prisma.producto.createMany({
      data: productos
    })

  } catch (error) {
    console.log(error)
  }
}

main()
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {

  const prisma = new PrismaClient()

  if(req.method === 'POST') {
    const { id } = req.query
    const ordenActualizada = await prisma.orden.update({
      where: {
        id: parseInt(id)
      },
      data: {
        estado: true
      }
    })
    res.status(200).json(ordenActualizada)

    //console.log(req.query.id)   // que es como se llama el archivo y como lo estamos pasando... viene con ese nombre
    //console.log('Actualizando...')
    // si quiero tener un area con las ordenes completadas conviene retornar la orden
  }
}
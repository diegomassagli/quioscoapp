import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
  const prisma = new PrismaClient()

  // es producto en singular porque es el nombre del modelo creado en schema.prisma
  const productos = await prisma.producto.findMany()  

  res.status(200).json(productos)
}

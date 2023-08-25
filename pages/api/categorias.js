// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// esta es la otra forma de consultar la base de datos ademas de getServerSideProps de index...
// serversideprops lo uso cuando en un componente quiero mostrar resultados, y la api la uso cuando quiero tener info para colocar en el state...

import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
  const prisma = new PrismaClient()

  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true
    }
  });

  res.status(200).json(categorias)
}

import prisma from "../prisma/client.js";

export const registrarCorte = async (req, res) => {
  try {
    const { clienteId, servicioId, monto, formaPago } = req.body;
    const { userId, barberiaId } = req.user;

    const corte = await prisma.corte.create({
      data: {
        clienteId,
        servicioId,
        monto,
        formaPago,
        empleadoId: userId,
        barberiaId,
      },
    });

    res.status(201).json(corte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar corte" });
  }
};

export const listarCortes = async (req, res) => {
  try {
    const { barberiaId } = req.user;

    const cortes = await prisma.corte.findMany({
      where: { barberiaId },
      include: {
        cliente: true,
        servicio: true,
        empleado: {
          select: { nombre: true, email: true },
        },
      },
      orderBy: {
        fecha: "desc",
      },
    });

    res.json(cortes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cortes" });
  }
};

import prisma from "../prisma/client.js";

// Crear servicio
export const crearServicio = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const { barberiaId } = req.user;

    const servicio = await prisma.servicio.create({
      data: {
        nombre,
        precio,
        barberiaId,
      },
    });

    res.status(201).json(servicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear servicio" });
  }
};

// Listar servicios de la barbería
export const listarServicios = async (req, res) => {
  try {
    const { barberiaId } = req.user;

    const servicios = await prisma.servicio.findMany({
      where: { barberiaId },
    });

    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener servicios" });
  }
};

// Actualizar servicio
export const actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const { barberiaId } = req.user;

    const servicio = await prisma.servicio.updateMany({
      where: {
        id: parseInt(id),
        barberiaId,
      },
      data: { nombre, precio },
    });

    if (servicio.count === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.json({ mensaje: "Servicio actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar servicio" });
  }
};

// Eliminar servicio
export const eliminarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { barberiaId } = req.user;

    const servicio = await prisma.servicio.deleteMany({
      where: {
        id: parseInt(id),
        barberiaId,
      },
    });

    if (servicio.count === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.json({ mensaje: "Servicio eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar servicio" });
  }
};

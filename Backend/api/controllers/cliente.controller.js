import prisma from "../prisma/client.js";

// Crear cliente
export const crearCliente = async (req, res) => {
  try {
    const { nombre, telefono } = req.body;
    const { barberiaId } = req.user;

    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        telefono,
        barberiaId,
      },
    });

    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear cliente" });
  }
};

// Listar clientes
export const listarClientes = async (req, res) => {
  try {
    const { barberiaId } = req.user;

    const clientes = await prisma.cliente.findMany({
      where: { barberiaId },
    });

    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// Actualizar cliente
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono } = req.body;
    const { barberiaId } = req.user;

    const cliente = await prisma.cliente.updateMany({
      where: {
        id: parseInt(id),
        barberiaId,
      },
      data: { nombre, telefono },
    });

    if (cliente.count === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ mensaje: "Cliente actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};

// Eliminar cliente
export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { barberiaId } = req.user;

    const cliente = await prisma.cliente.deleteMany({
      where: {
        id: parseInt(id),
        barberiaId,
      },
    });

    if (cliente.count === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ mensaje: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};

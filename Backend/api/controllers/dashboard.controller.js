import prisma from "../prisma/client.js";
import { startOfDay, endOfDay, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";

// Ingresos por día de la semana
export const ingresosPorSemana = async (req, res) => {
  try {
    const { barberiaId } = req.user;

    const cortes = await prisma.corte.findMany({
      where: { barberiaId },
      select: { fecha: true, monto: true },
    });

    const ingresos = {};

    cortes.forEach((corte) => {
      const dia = corte.fecha.toLocaleDateString("es-AR", { weekday: "long" });
      ingresos[dia] = (ingresos[dia] || 0) + corte.monto;
    });

    const diasOrden = [
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
    ];
    const resultado = diasOrden.map((dia) => ({
      name: dia.charAt(0).toUpperCase() + dia.slice(1),
      total: ingresos[dia] || 0,
    }));

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener ingresos semanales" });
  }
};

// Cortes e ingresos de hoy
export const resumenDiario = async (req, res) => {
  try {
    const { barberiaId } = req.user;

    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const cortes = await prisma.corte.findMany({
      where: {
        barberiaId,
        fecha: { gte: todayStart, lte: todayEnd },
      },
      select: { monto: true },
    });

    const cantidad = cortes.length;
    const ingresos = cortes.reduce((acc, cur) => acc + cur.monto, 0);

    res.json({ cantidad, ingresos });
  } catch (err) {
    res.status(500).json({ error: "Error en resumen diario" });
  }
};

// Clientes únicos del mes
export const clientesUnicosDelMes = async (req, res) => {
  try {
    const { barberiaId } = req.user;
    const desde = startOfMonth(new Date());

    const cortes = await prisma.corte.findMany({
      where: {
        barberiaId,
        fecha: { gte: desde },
      },
      select: { clienteId: true },
    });

    const unicos = new Set(cortes.map((c) => c.clienteId));
    res.json({ cantidad: unicos.size });
  } catch (err) {
    res.status(500).json({ error: "Error al contar clientes únicos" });
  }
};

// Top empleado
export const topEmpleado = async (req, res) => {
  try {
    const { barberiaId } = req.user;
    const desde = startOfMonth(new Date());

    const cortes = await prisma.corte.groupBy({
      by: ["empleadoId"],
      where: {
        barberiaId,
        fecha: { gte: desde },
      },
      _count: { empleadoId: true },
      orderBy: { _count: { empleadoId: "desc" } },
      take: 1,
    });

    if (!cortes.length) return res.json({ nombre: "Sin datos", cantidad: 0 });

    const empleado = await prisma.usuario.findUnique({
      where: { id: cortes[0].empleadoId },
      select: { nombre: true },
    });

    res.json({
      nombre: empleado.nombre,
      cantidad: cortes[0]._count.empleadoId,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener top empleado" });
  }
};

// Servicios más vendidos
export const serviciosMasVendidos = async (req, res) => {
  try {
    const { barberiaId } = req.user;

    const cortes = await prisma.corte.groupBy({
      by: ["servicioId"],
      where: { barberiaId },
      _count: true,
      _sum: { monto: true },
      orderBy: { _count: { servicioId: "desc" } },
      take: 5,
    });

    const resultado = await Promise.all(
      cortes.map(async (corte) => {
        const servicio = await prisma.servicio.findUnique({
          where: { id: corte.servicioId },
          select: { nombre: true },
        });

        return {
          name: servicio.nombre,
          count: corte._count,
          amount: corte._sum.monto,
        };
      })
    );

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener servicios más vendidos" });
  }
};

// Actividad reciente
export const actividadReciente = async (req, res) => {
  try {
    const { barberiaId } = req.user;

    const cortes = await prisma.corte.findMany({
      where: { barberiaId },
      include: {
        cliente: { select: { nombre: true } },
        empleado: { select: { nombre: true } },
        servicio: { select: { nombre: true } },
      },
      orderBy: { fecha: "desc" },
      take: 5,
    });

    const resultado = cortes.map((c) => ({
      id: c.id,
      client: c.cliente.nombre,
      employee: c.empleado.nombre,
      service: c.servicio.nombre,
      amount: c.monto,
      paymentMethod: c.formaPago,
      date: c.fecha.toLocaleString("es-AR", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener actividad reciente" });
  }
};

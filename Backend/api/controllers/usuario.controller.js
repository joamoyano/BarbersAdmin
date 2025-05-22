import prisma from "../prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registrar nuevo usuario (solo ADMIN)
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol, barberiaId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol,
        barberiaId,
      },
    });

    res.status(201).json({ mensaje: "Usuario creado", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      {
        userId: usuario.id,
        rol: usuario.rol,
        barberiaId: usuario.barberiaId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en login" });
  }
};

// Obtener perfil
export const obtenerPerfil = async (req, res) => {
  try {
    const { userId } = req.user; // viene desde middleware de autenticación

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { id: true, nombre: true, email: true, rol: true },
    });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

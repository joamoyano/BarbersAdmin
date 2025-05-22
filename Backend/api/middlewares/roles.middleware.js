export const esAdmin = (req, res, next) => {
  console.log("Usuario autenticado:", req.user);
  if (!req.user || req.user.rol !== "ADMIN") {
    return res
      .status(403)
      .json({ error: "Acceso denegado: solo para administradores" });
  }
  next();
};

export const esEmpleado = (req, res, next) => {
  if (req.user.rol !== "EMPLEADO") {
    return res
      .status(403)
      .json({ error: "Acceso denegado: solo para empleados" });
  }
  next();
};

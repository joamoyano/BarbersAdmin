export const login = async (email: string, password: string) => {
  const res = await fetch("http://localhost:3001/api/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Login incorrecto");
  }

  const data = await res.json();
  return data.token;
};

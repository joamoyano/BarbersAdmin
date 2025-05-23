import "./globals.css";
export const metadata = {
  title: "BarbersAdmin",
  description: "Panel de administración para barbería",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}

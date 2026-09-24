function mostrarNotificacion(mensaje, tipo = "exito", duracionMs = 3000) {
  let contenedor = document.getElementById("notificaciones");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "notificaciones";
    contenedor.className = "notificaciones-contenedor";
    document.body.appendChild(contenedor);
  }

  const toast = document.createElement("div");
  toast.className = `notificacion notificacion-${tipo}`;
  toast.textContent = mensaje;

  contenedor.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duracionMs);
}
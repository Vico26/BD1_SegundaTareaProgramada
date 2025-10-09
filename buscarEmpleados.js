const obtenerEmpleados = require("./obtenerEmpleados");
async function buscarEmpleados(termino) {
  try {
    const empleados = await obtenerEmpleados();
    const q = (termino ?? '').toString().toLowerCase();
    if (!q) return "No se ha encontrado";

    const lista = Array.isArray(empleados) ? empleados : [];
    const coincidencia = lista.find((emp) => {
      const nombre = (emp?.Nombre ?? '').toLowerCase();
      const nombrePalabras = nombre.split(' ');
      const doc = String(emp?.ValorDocumentoIdentidad ?? '').toLowerCase();
      return nombrePalabras.includes(q) || doc === q;
    });

    return coincidencia ?? "No se ha encontrado";
  } catch (error) {
    console.error("Error en buscarEmpleados:", error);
    return "Error al buscar empleados";
  }
}
//buscarEmpleados('Adolfo').then(result => console.log(result));
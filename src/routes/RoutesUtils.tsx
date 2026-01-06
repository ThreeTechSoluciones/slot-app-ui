export const MisAlumnos = "/listado-alumnos";
export const NuevoAlumno = "/nuevo-alumno";
export const MisPlanes = "/cuotas";
export const IniciarSesion = "/login";
export const DetalleAlumno = "/detalle-alumno";
export const ListadoCuotas = "/listado-cuotas";
export const MisTurnos = "/turnos";
export const EditarAlumno = "/editar-estudiante/:numberOfStep";
export const getEditarEstudianteStep = (step: number | string) =>
  `/editar-estudiante/${step}`;

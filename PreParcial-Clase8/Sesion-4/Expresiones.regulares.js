/*
Ejercicio 1 — Empleados cuyo nombre empieza con "M"
Encontrar todos los empleados cuyo nombre comience con la letra M (mayúscula). Mostrar todos los campos del documento.

Pista: find con regex anclada al inicio: /^M/.
*/
db.empleados.find({ nombre: /^M/ })

/*
Ejercicio 2 — Películas cuyo título empieza con "El "
Encontrar todas las películas cuyo titulo comience con la cadena "El " (la palabra "El" seguida de un espacio).

Pista: el espacio cuenta como un carácter más dentro de la regex: /^El /.
*/
db.peliculas.find({ titulo: /^El / })
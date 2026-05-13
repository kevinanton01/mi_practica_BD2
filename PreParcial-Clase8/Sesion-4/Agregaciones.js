//AGREGACIONES

/*---------------------------
Ejercicio 1 — Empleado con su departamento (simple)
Para cada empleado mostrar un único documento plano con:

empleado: nombre + apellido (con un espacio en el medio)
departamento: el nombre del departamento al que pertenece
Sin _id. Ordenar por empleado ascendente.

Pista: $lookup desde empleados hacia departamentos, $unwind del array resultante, $project con $concat, $sort.

Ojo: el empleado de idDepto: 99 no tiene departamento — con $unwind "normal" desaparece, está bien que no aparezca en este ejercicio.
*/
db.empleados.aggregate([
  {
    $lookup: {
      from: "departamentos",
      localField: "idDepto",
      foreignField: "_id",
      as: "depto"
    }
  },
  {
    $unwind: "$depto"
  },
  {
    $project: {
      _id: 0,
      empleado: {
        $concat: ["$nombre", " ", "$apellido"]
      },
      departamento: "$depto.nombre"
    }
  },
  {
    $sort: { empleado: 1 }
  }
])

/*---------------------------
Ejercicio 2 — Cantidad de empleados por departamento (simple)
Para cada departamento mostrar:

departamento: el nombre del departamento
cantidadEmpleados: cantidad de empleados que pertenecen a él
Ordenar por cantidadEmpleados descendente.

Pista: hacer el aggregate desde departamentos, $lookup hacia empleados, y usar $size sobre el array resultante en el $project.
*/
db.departamentos.aggregate([
  {
    $lookup: {
      from: "empleados",
      localField: "_id",
      foreignField: "idDepto",
      as: "empleados"
    }
  },
  {
    $project: {
      _id: 0,
      departamento: "$nombre",
      cantidadEmpleados: { $size: "$empleados" }
    }
  },
  {
    $sort: { cantidadEmpleados: -1 }
  }
])

/*---------------------------
Ejercicio 3 — Resumen por sede (avanzado)
Para cada sede calcular:

cantidadEmpleados: total de empleados de los departamentos de esa sede
sueldoTotal: suma de los sueldos
sueldoPromedio: promedio de sueldo
departamentos: array con los nombres de los departamentos de esa sede (sin repetidos)
Ordenar por sueldoTotal descendente.

Pista: aggregate desde departamentos, $lookup hacia empleados, $unwind sobre los empleados, $group por sede con $sum, $avg, $addToSet.
*/
db.departamentos.aggregate([
  {
    $lookup: {
      from: "empleados",
      localField: "_id",
      foreignField: "idDepto",
      as: "empleados"
    }
  },
  {
    $unwind: "$empleados"
  },
  {
    $group: {
      _id: "$sede",
      cantidadEmpleados: { $sum: 1 },
      sueldoTotal: { $sum: "$empleados.sueldo" },
      sueldoPromedio: { $avg: "$empleados.sueldo" },
      departamentos: { $addToSet: "$nombre" }
    }
  },
  {
    $project: {
      _id: 0,
      sede: "$_id",
      cantidadEmpleados: 1,
      sueldoTotal: 1,
      sueldoPromedio: 1,
      departamentos: 1
    }
  },
  {
    $sort: { sueldoTotal: -1 }
  }
])
/*
Ejercicio 1 — Cantidad por curso
Agrupar a los estudiantes por curso y contar cuántos hay en cada uno.

Pista: $group con _id: "$curso" y { $sum: 1 }.
*/
db.estudiantes.aggregate([
  {
    $group: {
      _id: "$curso",
      cantidad: { $sum: 1 }
    }
  }
])

/*
Ejercicio 2 — Nombres por edad
Agrupar por edad y guardar los nombres de los estudiantes de cada edad en un array alumnos.

Pista: $push: "$nombre".
*/
db.estudiantes.aggregate([
    {
        $group: {
            _id: "$edad",
            alumnos: {$push: "$nombre"}
        }
    }
])

/*
Ejercicio 3 — Suma total de edades
Calcular la suma total de las edades de todos los estudiantes (un solo número como resultado).

Pista: _id: null + { $sum: "$edad" }.
*/
db.estudiantes.aggregate([
    {
        $group: {
            _id: null,
            sumaTotalEdades: {$sum: "$edad"}
        }
    }
])

/*
Ejercicio 4 — Edad promedio por curso
Para cada curso, mostrar la edad promedio de sus alumnos. El campo calculado debe llamarse promedioEdad.

Pista: $avg: "$edad".
*/
db.estudiantes.aggregate([
    {
        $group: {
            _id: "$curso",
            promedioEdad: {$avg: "$edad"}
        }
    }
])

/*
Ejercicio 5 — Edad mínima y máxima por curso
Para cada curso, mostrar la edad mínima y la edad máxima.

Pista: $min y $max sobre "$edad" en un mismo $group.
*/
db.estudiantes.aggregate([
    {
        $group: {
            _id: "$curso",
            edad_minima: {$min: "$edad"},
            edad_maxima: {$max: "$edad"}
        }
    }
])

/*
Ejercicio 6 — Mayor o igual a 18 (true/false)
Agrupar por la condición "es mayor o igual a 18". El _id debe ser true o false. Para cada grupo guardar la cantidad de estudiantes y la lista de nombres.

Pista: _id: { $gte: ["$edad", 18] }.
*/
db.estudiantes.aggregate([
    {
        $group: {
            _id: {$gte: ["$edad", 18]},
            cantidad: {$sum: 1},
            estudiantes: {$push: "$nombre"}
        }
    }
])

/*
Ejercicio 7 — Atrapamoscas del "$"
(a) Escribir un $group que use _id: "curso" (sin el $) y observar cuántos grupos resultan. Explicar por qué.

(b) Escribir ahora _id: "$curso" (con el $) y comparar el resultado.
*/
db.estudiantes.aggregate([
    {
        $group: {
            _id: "curso",
        }
    }
])
//[ { _id: 'curso' } ] --> Porque "curso" es un string literal.

db.estudiantes.aggregate([
    {
        $group: {
            _id: "$curso",
        }
    }
])
//[ { _id: 'A' }, { _id: 'B' } ] --> valor del campo

/*
Ejercicio 8 — Totales generales
En un solo pipeline calcular y mostrar:

cantidad total de estudiantes
edad promedio
edad mínima
edad máxima
Pista: _id: null + varios campos calculados en el mismo $group.
*/
db.estudiantes.aggregate([
    {
        $group: {
            _id: null,
            total_estudiantes: {$sum: 1},
            edad_promedio: {$avg: "$edad"},
            edad_min: {$min: "$edad"},
            edad_max: {$max: "$edad"}
        }
    }
])

/*
Ejercicio 9 — Agregar más datos y verificar
Insertar estos estudiantes adicionales:

db.estudiantes.insertMany([
  { nombre: "Pablo",  edad: 20, curso: "A" },
  { nombre: "Sofia",  edad: 17, curso: "C" },
  { nombre: "Carlos", edad: 18, curso: "B" }
])
Volver a correr el Ejercicio 1 y verificar que ahora el resultado cambió.

--> Se agrego un curso y mas estudiantes.
*/

/*
Ejercicio 10 — Reflexión
(a) ¿Por qué $group SIEMPRE necesita _id?
--> Sin _id, MongoDB no sabría cómo formar los grupos.

(b) ¿Qué diferencia hay entre $sum: 1 y $sum: "$edad"?
--> $sum: 1 Cuenta documentos.
    $sum: "$edad" Suma el valor de un campo.

(c) ¿Cuándo usarías $push y cuándo $addToSet? (Pista: probá agregar un estudiante repetido y compará.)
--> $push Agrega todos los valores, incluso repetidos.
    $addToSet Agrega valores sin repetirlos.
*/
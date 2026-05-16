/*
Ejercicio 1 — JavaScript puro en el shell (simple)
Escribir en mongosh (no en un archivo):

Una variable x = 7 y mostrar x * x.
Una llamada a Math.pow(2, 10).
Una variable hoy = new Date() y mostrar hoy.toISOString().
Pista: mongosh evalúa cualquier expresión JS. No hace falta print cuando lo escribís a mano — el valor se muestra solo.
*/
let x = 7
x * x
//49

Math.pow(2, 10)
//1024

let hoy = new Date()
hoy.toISOString()
//2026-05-16T18:45:12.345Z

/*
Ejercicio 2 — Función reutilizable (simple)
Definir en el shell una función clasificarSueldo(s) que reciba un sueldo (número) y devuelva:

"bajo" si s < 700000
"medio" si 700000 <= s < 1100000
"alto" si s >= 1100000
Probarla con clasificarSueldo(500000), clasificarSueldo(900000) y clasificarSueldo(1500000).

Pista: la función queda viva durante toda la sesión de mongosh. Si cerrás y volvés a abrir el shell, hay que volver a declararla.
*/
function clasificarSueldo(s) {
  if (s < 700000) {
    return "bajo";
  } else if (s < 1100000) {
    return "medio";
  } else {
    return "alto";
  }
}

clasificarSueldo(500000) //"bajo"
clasificarSueldo(900000) //"medio"
clasificarSueldo(1500000)//"alto"

/*
Ejercicio 3 — Poblar una colección con un for (simple)
Vaciar la colección articulos (si existe) y poblarla con 20 artículos usando un for. Cada artículo debe tener:

_id: del 1 al 20
nombre: "articulo" + i
precio: un número aleatorio entre 100 y 1000 (usá Math.floor(Math.random() * 901) + 100)
stock: el i (para tener stocks distintos)
Después hacer db.articulos.find().limit(5) para ver los primeros 5.

Pista: usar db.articulos.drop() antes del for para empezar limpio. Adentro del for, llamar db.articulos.insertOne({...}) por cada i.
*/
db.articulos.drop()

for (let i = 1; i <= 20; i++) {
  db.articulos.insertOne({
    _id: i,
    nombre: "articulo" + i,
    precio: Math.floor(Math.random() * 901) + 100,
    stock: i
  });
}

db.articulos.find().limit(5)
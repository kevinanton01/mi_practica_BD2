// Cambiar a la base de datos semana8_scripts
db = db.getSiblingDB("semana8_scripts");

// Vaciar la colección productos
db.productos.deleteMany({});

// Insertar 100 productos
for (let i = 1; i <= 100; i++) {
    db.productos.insertOne({
        _id: i,
        codigo: "P" + i,
        categoria: i % 2 === 0 ? "par" : "impar",
        precio: i * 10
    });
}

// Imprimir cuántos productos quedaron en la colección
print("Cantidad de productos en la colección:", db.productos.countDocuments());
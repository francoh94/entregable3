import express from "express";
import ProductManager from "./productManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));


const productosJSONPath = "productos.json";
const manager = new ProductManager(productosJSONPath);

app.get("/products", async (request, response) => {
  const productos = await manager.getProducts();
  const limit = parseInt(request.query.limit);

  const result = limit ? productos.slice(0, limit) : productos;

  response.send({ message: "Todos los productos:", data: result });
});




app.get("/products/:pid", async (request, response) => {
  const pid = parseInt(request.params.pid);
  const productos = await manager.getProducts();
  const producto = productos.find((prod) => pid === prod.id);
  if (!producto) {
    response.send("Producto no encontrado");
    return;
  }
  response.send(producto);
});

app.listen(8080, () => {
  console.log("Activo");
});

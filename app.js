import express from "express";
import ProductManager from "./productManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));


const productosJSONPath = "productos.json";
const manager = new ProductManager(productosJSONPath);

app.get("/products", async (request, response) => {
  const {limit} = request.query
  try{
  const productos = await manager.getProducts();
  const result = +limit ? productos.slice(0, limit) : productos;
  response.send({ message: "Todos los productos:", data: result });}
  catch(error){
    response.status(500).json({message: error.message})
  }
});




app.get("/products/:pid", async (request, response) => {
  const {pid} = request.params;
  try{
  const ProductById = await manager.getProductById(+pid)
  response.send(ProductById);
}
  catch (erro){
    response.status(500).json({message:"Producto no encontrado"});
    return;
  }
});

app.listen(8080, () => {
  console.log("Activo");
});

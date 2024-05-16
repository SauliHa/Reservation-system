import express, { Request, Response } from "express";
import * as dao from "./dao";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.post("/products", async (req: Request, res: Response) => {
  const product = req.body;
  console.log(req.body);
  const result = await dao.insertProduct(product);
  const storedProduct = { id: result.rows[0], ...product };
  res.send(storedProduct);
});

server.get("/products/:id", async (req: Request, res: Response) => {
  const result = await dao.findProduct(req.params.id);
  const product = result.rows[0];
  res.send(product);
});

server.put("/products/:id", async (req: Request, res: Response) => {
  const product = { id: req.params.id, ...req.body };
  const result = await dao.updateProduct(product);
  res.send(result.rows);
});

server.delete("/products/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await dao.deleteProduct(id);
  res.send(result);
});

server.get("/products", async (req: Request, res: Response) => {
  const result = await dao.listProducts();
  res.send(result.rows);
});

const { PORT } = process.env;
if (PORT) {
  server.listen(PORT, () => {
    console.log("Products API listening to port", PORT);
  });
} else {
  console.error("Port number is not provided.");
}
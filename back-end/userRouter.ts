import express, { Request, Response } from 'express';
import dao from './dao'

const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
    const result = await dao.findUser(Number(req.params.id));
    const user = result.rows[0];
    res.send(user);
  });

  userRouter.post("/:create", async (req, res) => {
    const user = req.body;
    console.log(req.body)
    const result = await dao.createUser(user);
    const id = { result };
    res.send(id);
  });

export default userRouter;
import { PrismaClient, Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Data = Todo[] | Todo | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const todos = await prisma.todo.findMany();
      res.json(todos);
      break;
    case "POST":
      const newTodo = await prisma.todo.create({
        data: {
          task: req.body.task,
        },
      });
      res.json(newTodo);
      break;
    case "PUT":
      const updatedTodo = await prisma.todo.update({
        where: { id: req.body.id },
        data: { status: req.body.status },
      });
      res.json(updatedTodo);
      break;
    case "DELETE":
      const deletedTodo = await prisma.todo.delete({
        where: { id: req.body.id },
      });
      res.json(deletedTodo);
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
}

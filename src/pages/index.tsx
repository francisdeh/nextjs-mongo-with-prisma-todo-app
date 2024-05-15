import { FaCalendarCheck } from "react-icons/fa";
import { Inter } from "next/font/google";
import Form from "./components/Form";
import TodoTable from "./components/TodoTable";
import { useEffect, useState } from "react";
import { Todo } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await fetch("/api/todo");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleOnAddTodo = async (todo: string) => {
    await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: todo }),
    });

    fetchTodos();
  };

  const handleOnCheck = (id: number) => {
    fetch("/api/todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: !todos.find((todo) => todo.id === id)?.status,
      }),
    });

    fetchTodos();
  };

  const handleOnDelete = (id: number) => {
    const res = fetch("/api/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchTodos();

    // setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <div className="card w-[600px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            <FaCalendarCheck className="text-primary" />
            Manage Todos
          </h2>
          <Form onAddTodo={handleOnAddTodo} />
          <TodoTable
            todos={todos}
            onCheck={handleOnCheck}
            onDelete={handleOnDelete}
          />
        </div>
      </div>
    </main>
  );
}

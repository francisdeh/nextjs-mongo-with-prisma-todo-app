import { Todo } from "@prisma/client";
import { FaTrash } from "react-icons/fa";

interface TodoTableProps {
  todos: Todo[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoTable({
  todos,
  onCheck,
  onDelete,
}: TodoTableProps) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                    checked={todo.status}
                    onChange={() => onCheck(todo.id)}
                  />
                </label>
              </th>
              <td className={todo.status ? "line-through" : ""}>{todo.task}</td>
              <th>
                <button
                  className="btn btn-outline btn-xs btn-error group"
                  onClick={() => onDelete(todo.id)}>
                  <FaTrash className="group-hover:text-white" />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

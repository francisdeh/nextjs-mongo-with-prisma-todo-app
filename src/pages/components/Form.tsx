import { useRef, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

interface FormProps {
  onAddTodo: (todo: string) => void;
}

export default function Form({ onAddTodo }: FormProps) {
  const inputRef = useRef<HTMLInputElement | null>(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;

  useEffect(() => {
    inputRef.current?.focus!();
  }, []);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(inputRef.current!.value);
    inputRef.current!.value = "";
    inputRef.current?.focus();
  };

  return (
    <form className="flex justify-between" onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Type here"
        required
        autoFocus={true}
        ref={inputRef}
        className="input input-bordered focus:outline-none input-primary w-full mb-4"
      />
      <button className="btn btn-primary ml-2">
        <FaPlusCircle />
      </button>
    </form>
  );
}

import TodoList from './TodoList';
import { useTodo } from '../../store/useTodo';

export default function Todo({ setOpenTodo }) {
  const { form, list, isEditing, setForm, addTodo, deleteTodo, toggleTodo, startEdit, cancelEdit } =
    useTodo();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <div className="w-full h-full ">
      <TodoList
        form={form}
        onChange={handleChange}
        onAdd={handleAdd}
        onCancelEdit={cancelEdit}
        isEditing={isEditing}
        list={list}
        handleDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={startEdit}
        setOpenTodo={setOpenTodo}
      />
    </div>
  );
}

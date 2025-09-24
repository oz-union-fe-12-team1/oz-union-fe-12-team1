import TodoList from "./TodoList";

export default function Todo({ 
  form, 
  onChange, 
  onAdd, 
  onCancelEdit, 
  isEditing,
  list, 
  handleDelete,
  onToggle,
  onEdit,
  setOpenTodo
}) {
  return (
    <TodoList 
      form={form} 
      onChange={onChange} 
      onAdd={onAdd} 
      onCancelEdit={onCancelEdit}
      isEditing={isEditing}
      list={list} 
      handleDelete={handleDelete}
      onToggle={onToggle}
      onEdit={onEdit}
      setOpenTodo={setOpenTodo}
    />
  );
}
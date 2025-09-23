import { useState } from "react";
import TodoList from "./TodoList";

export default function Todo() {
  const [form, setForm] = useState({
    title: "",
    memo: "",
  });

  const [list, setList] = useState([
    { id: 1, title: "React 공부하기", completed: false },
    { id: 2, title: "프로젝트 완성하기", completed: true },
    { id: 3, title: "운동하기", completed: false }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (isEditing) {
      setList((prev) => 
        prev.map((item) => 
          item.id === editingId 
            ? { ...item, ...form }
            : item
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {

      const newTodo = { 
        id: Date.now(), 
        ...form, 
        completed: false 
      };
      setList((prev) => [...prev, newTodo]);
    }
    
    setForm({ title: "", memo: "" });
  };
}

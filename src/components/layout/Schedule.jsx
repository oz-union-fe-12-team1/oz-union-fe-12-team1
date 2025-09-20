import { useState } from 'react';
import ScheduleForm from './Scheduleform';
import ScheduleAdd from './ScheduleAdd';

export default function Schedule() {
  const [form, setForm] = useState({
    date: '',
    time: '',
    title: '',
    memo: '',
  });

  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newSchedule = { id: Date.now(), ...form };
    setList((prev) => [...prev, newSchedule]);
    setForm({ date: '', time: '', title: '', memo: '' });
  };

  const handleDelete = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 grid md:grid-cols-[1fr_300px] gap-6">
      <ScheduleAdd list={list} onDelete={handleDelete} />
      <ScheduleForm form={form} onChange={handleChange} onAdd={handleAdd} />
    </div>
  );
}

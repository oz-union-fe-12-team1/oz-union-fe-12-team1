import { useState } from "react";

export default function Schedule() {
  const [form, setForm] = useState({
    date:"",
    time:"",
    title:"",
    memo:"",
  });
  const [list, setList] = useState([]);

  const handleChange = (e) => {

  }
}

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

export default function TaskForm({ addTask, theme }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Personal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask({ id: uuidv4(), text: task, category, completed: false });
    setTask("");
  };

  return (
    <motion.form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <input
        type="text"
        placeholder="Add a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className={`p-2 w-full rounded ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className={`p-2 text-gray-800 rounded  ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white"}`}>
  <option value="Personal">Personal</option>
  <option value="Work">Work</option>
</select>




      <button type="submit" className="bg-green-500 px-4 py-2 rounded">Add</button>
    </motion.form>
  );
}

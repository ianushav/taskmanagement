import { useState } from "react";
import { FiEdit, FiTrash2, FiCheckCircle, FiCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TaskItem({ task, editTask, deleteTask, toggleComplete, theme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (!newText.trim()) return;
    editTask(task.id, { ...task, text: newText });
    setIsEditing(false);
  };

  return (
    <motion.li className={`flex justify-between items-center p-3 rounded mb-2 ${theme === "dark" ? "bg-gray-800" : "bg-white/25 shadow-lg"}`} whileHover={{ scale: 1.05 }}>
      <div className="flex items-center gap-2 p-3 rounded">
        <button onClick={() => toggleComplete(task.id)}>
          {task.completed ? <FiCheckCircle className="text-green-800" size={20} /> : <FiCircle className="text-gray-500" size={20} />}
        </button>
        {isEditing ? (
          <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} className="bg-black-700 text-white p-1 rounded" />
        ) : (
          <span className={`text-lg ${task.completed ? "line-through text-black-500" : ""}  ${theme === "dark" ? "text-white" : "bg-white/2 text-black"}`}>
            {task.text} <span className="text-sm text-black-400">({task.category})</span>
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={handleEdit} className="bg-green-500 px-2 py-1 rounded">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className={`p-2 ${theme === "dark" ? "text-white" : "text-black"}`}><FiEdit size={16}/></button>
        )}
        <button onClick={() => deleteTask(task.id)} className={`p-2 ${theme === "dark" ? "text-white" : "text-black"}`}><FiTrash2 size={16}/></button>
      </div>
    </motion.li>
  );
}

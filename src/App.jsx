import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const addTask = (task) => setTasks([...tasks, task]);
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));
  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };
  const filteredTasks = filter === "All" ? tasks : tasks.filter((task) => task.category === filter);

  return (
    <div className={`min-h-screen min-w-screen flex flex-col lg:flex-row overflow-hidden ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"}`}>
      {/* Left Static Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center p-6 lg:sticky lg:top-0 lg:h-screen"
      >
       <img src="https://via.placeholder.com/350" alt="Placeholder Image" />

        <h2 className="text-3xl font-bold">Stay Organized with Task Manager</h2>
        <p className="text-lg mt-2">Manage your personal and work tasks efficiently with our simple and intuitive task manager.</p>
      </motion.div>

      {/* Right Scrollable Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col items-center overflow-y-auto"
      >
        <div className="flex justify-between w-full max-w-lg my-10">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-white mr-30 mt-3"
          >
            {theme === "dark" ? <FiSun size={25} /> : <FiMoon size={25} />}
          </motion.button>
        </div>

        <TaskForm addTask={addTask} theme={theme} />

        <motion.div className="flex gap-2 my-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {["All", "Personal", "Work"].map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === cat ? "bg-gray-300 text-black" : "bg-gray-500 text-gray-200 hover:bg-gray-600"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <TaskList tasks={filteredTasks} editTask={editTask} deleteTask={deleteTask} toggleComplete={toggleComplete} theme={theme} />
      </motion.div>
    </div>
  );
}

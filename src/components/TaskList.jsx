import TaskItem from "./TaskItem";
import { motion } from "framer-motion";

export default function TaskList({ tasks, editTask, deleteTask, toggleComplete, theme }) {
  return (
    <motion.ul className="w-full max-w-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} toggleComplete={toggleComplete} theme={theme} />
        ))
      )}
    </motion.ul>
  );
}

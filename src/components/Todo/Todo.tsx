import React, { useState, ChangeEvent } from 'react';

type Task = {
  id: number;
  text: string;
  isEditing: boolean;
};

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (!newTask.trim()) return;

    const newTaskObj: Task = {
      id: Date.now(),
      text: newTask,
      isEditing: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask('');
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleEdit = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const updateTaskText = (id: number, value: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: value } : task
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>TO DO List</h2>
      <input
        type="text"
        placeholder="Enter a task"
        value={newTask}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
        style={styles.input}
      />
      <button onClick={addTask} style={styles.addButton}>Add Task</button>

      {tasks.map((task) => (
        <div key={task.id} style={styles.taskRow}>
          {task.isEditing ? (
            <input
              value={task.text}
              onChange={(e) => updateTaskText(task.id, e.target.value)}
              style={styles.editInput}
            />
          ) : (
            <span>{task.text}</span>
          )}

          <div>
            <button
              onClick={() => toggleEdit(task.id)}
              style={{ ...styles.button, backgroundColor: '#6c63ff' }}
            >
              {task.isEditing ? 'Save' : 'Edit'}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ ...styles.button, backgroundColor: '#e74c3c' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '400px',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    width: '70%',
    marginRight: '10px',
  },
  addButton: {
    padding: '8px 12px',
  },
  taskRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginTop: '10px',
    padding: '10px',
    borderRadius: '4px',
  },
  button: {
    marginLeft: '5px',
    padding: '6px 12px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editInput: {
    padding: '6px',
    width: '200px',
  },
};

export default TodoList;

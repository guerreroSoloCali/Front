const express = require('express');
const mongoose = require('mongoose');

// Configurar la conexión a la base de datos MongoDB
mongoose.connect('http://localhost:8080/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Task = mongoose.model('Task', {
  title: String,
  description: String,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para crear una nueva tarea
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Ruta para obtener todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const tasksContainer = require('./tasks.json');

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(200).json(tasksContainer);
  else return res.status(404).json({ message: 'Tarefa não encontrada' });
});

app.get('/tasks/concluidas', (_req, res) => {
  const concluidas = tasksContainer.tasks.filter(task => task.isCompleted);
  return res.status(200).json({ tasks: concluidas });
});

app.get('/task/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const task = tasksContainer.tasks.find(item => item.id === id);
  if (task) return res.status(200).json(task);
  else return res.status(404).json({ message: 'Tarefa não encontrada' });
});

app.put('/task/update', (req, res) => {
  const { id, title, description, isCompleted } = req.body;

  if (!id || isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const taskIndex = tasksContainer.tasks.findIndex(item => item.id === id);

  if (taskIndex !== -1) {
    const task = tasksContainer.tasks[taskIndex];

    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;

    return res.status(200).json({ message: "Atualizado", task });
  } else {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.post('/task/create', (req, res) => {
  const { title, description, isCompleted } = req.body;
  const newId = tasksContainer.tasks.length > 0
    ? Math.max(...tasksContainer.tasks.map(t => t.id)) + 1
    : 1;

  const newTask = { id: newId, title, description, isCompleted };
  tasksContainer.tasks.push(newTask);
  return res.status(201).json({ message: 'Tarefa criada com sucesso', task: newTask });
});

app.delete('/task/delete', (req, res) => {
  const { id } = req.body;
  if (!id || isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const taskIndex = tasksContainer.tasks.findIndex(item => item.id === id);
  if (taskIndex !== -1) {
    tasksContainer.tasks.splice(taskIndex, 1);
    return res.status(204).send();
  } else {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.listen(9001, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 9001');
});
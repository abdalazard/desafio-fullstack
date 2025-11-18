const app = require('express')();
const bodyParser = require('body-parser');
const tasksContainer = require('./tasks.json');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/**
 * GET /tasks
 * Retorna a lista de tarefas com status code 200.
 */
app.get('/tasks', (req, res) => {
  return res.status(200).json(tasksContainer);
});

/**
 * Get /task/:id
 * Retorna a tarefa pelo ID.
 */
app.get('/task/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const task = tasksContainer.tasks.find(item => item.id === id);

  if (task) {
    return res.status(200).json(task);
  } else {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

/**
 * PUT /task/update/
 * Atualiza a tarefa. O ID vem no corpo da requisição (body).
 */
app.put('/task/update', (req, res) => {
  const { id, title, description } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido ou ausente' });
  }

  const taskIndex = tasksContainer.tasks.findIndex(item => item.id === id);

  if (taskIndex !== -1) {
    tasksContainer.tasks[taskIndex].title = title;
    tasksContainer.tasks[taskIndex].description = description;
    return res.status(204).send(); // 204 No Content (Sucesso sem corpo)
  } else {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

/**
 * POST /task/create
 * Cria uma nova tarefa.
 */
app.post('/task/create', (req, res) => {
  const { title, description } = req.body;

  // Gera um ID simples (pega o maior ID atual + 1)
  const newId = tasksContainer.tasks.length > 0
    ? Math.max(...tasksContainer.tasks.map(t => t.id)) + 1
    : 1;

  const newTask = {
    id: newId,
    title: title,
    description: description
  };

  tasksContainer.tasks.push(newTask);

  return res.status(201).json({
    message: 'Tarefa criada com sucesso',
    task: newTask
  });
});

/**
 * DELETE /task/delete
 * Deleta uma tarefa. O ID vem no corpo da requisição.
 */
app.delete('/task/delete', (req, res) => {
  const { id } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const taskIndex = tasksContainer.tasks.findIndex(item => item.id === id);

  if (taskIndex !== -1) {
    tasksContainer.tasks.splice(taskIndex, 1);
    return res.status(204).send();
  } else {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.listen(9001, () => {
  process.stdout.write('the server is available on http://localhost:9001/\n');
});
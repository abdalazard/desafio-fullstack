const app = require('express')();
const bodyParser = require('body-parser');
const tasksContainer = require('./tasks.json');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
 * GET /tasks
 * 
 * Return the list of tasks with status code 200.
 */
app.get('/tasks', (req, res) => {
});

/**
 * Get /task/:id
 * 
 * id: Number
 * 
 * Return the task for the given id.
 * 
 * If found return status code 200 and the resource.
 * If not found return status code 404.
 * If id is not valid number return status code 400.
 */
app.get('/task/:id', (req, res) => {
});

/**
 * PUT /task/update/
 * 
 * id: Number
 * title: string
 * description: string
 * 
 * Update the task with the given id.
 * If the task is found and update as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.put('/task/update', (req, res) => {
});

/**
 * POST /task/create
 * 
 * title: string
 * description: string
 * 
 * Add a new task to the array tasksContainer.tasks with the given title and description.
 * Return status code 201.
 */
app.post('/task/create', (req, res) => {
});

/**
 * DELETE /task/delete
 * 
 * id: Number
 * 
 * Delete the task linked to the  given id.
 * If the task is found and deleted as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.delete('/task/delete', (req, res) => {
});

app.listen(9001, () => {
  process.stdout.write('the server is available on http://localhost:9001/\n');
});
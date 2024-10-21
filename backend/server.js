const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Get all todos
app.get('/todos', (req, res) => {
  const { user, filter } = req.query;
  let query = 'SELECT * FROM todos';
  const params = [];

  if (user) {
    query += ' WHERE user = ?';
    params.push(user);
  }

  if (filter === 'completed') {
    query += user ? ' AND completed = 1' : ' WHERE completed = 1';
  } else if (filter === 'incomplete') {
    query += user ? ' AND completed = 0' : ' WHERE completed = 0';
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { text, user } = req.body;
  db.run('INSERT INTO todos (text, user) VALUES (?, ?)', [text, user], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { completed } = req.body;
  db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed, req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Todo updated successfully' });
  });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Todo deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
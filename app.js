const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const prices = fs.readFileSync('prices.txt', 'utf8');
    res.send(`<h1>Item Price List</h1><pre>${prices}</pre>`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const expss = require('express');
const app = expss();
const port = 3000;

app.get('/jooj', (req, res) => {
    res.sendStatus(200);
})

app.get('/', (req, res) => {
    //res.send('fodase');
    res.send(`${req.body}`);
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
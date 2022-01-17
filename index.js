const expss = require('express');
const app = expss();
const port = 3000;

app.get('/jooj', (req, res) => {
    res.sendStatus(200);
})

app.get('/', (req, res) => {
    //res.send('fodase');
    body.sexo = 'chronic';
    res.send(`${req.body}`);
    console.log(req.body);
})

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`);
})
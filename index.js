const expss = require('express');
const app = expss();
const port = process.env.PORT || 3000;

app.get('/jooj', (req, res) => {
    res.sendStatus(200);
})

app.post('/testgitlob', (req, res) => {
    console.log(req).body;
    console.log('-------------------');
    console.log('-------------------');
    console.log(res.body);
})

app.get('/', (req, res) => {
    //res.send('fodase');
    res.send(`${req.body}`);
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
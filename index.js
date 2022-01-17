const expss = require('express');
const app = expss();
const port = process.env.PORT || 3000;

app.get('/jooj', (req, res) => {
    res.sendStatus(200);
})

app.post('/testgitlob', (req, res) => {
    res.stauts(200).send(req.body);
    // console.log(req);
    // res.send('-------------------');
    // res.send(req.body);
    // console.log(req.body);
    // res.send('-------------------');
    //res.send(`${res.body}`);
    //res.send(`${res}`);
})

app.get('/', (req, res) => {
    //res.send('fodase');
    res.send(`${req.body}`);
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
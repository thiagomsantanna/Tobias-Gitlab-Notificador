const expss = require('express');
const bodyParser = require("body-parser");
const router = expss.Router();
const app = expss();
const port = process.env.PORT || 3000;

app.use("/",router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/jooj', (req, res) => {
    res.sendStatus(200);
})

app.post('/testgitlob', (req, res) => {
    var body = req.body;
    var issueID = body.object_attributes.id;
    var issueTitle = body.object_attributes.title;

    res.send(`Issue ID: ${issueID} - Issue Title: ${issueTitle} - ${body.object_attributes.labels} \n\n ${body}`);
    console.log(`Issue ID: ${issueID} - Issue Title: ${issueTitle}`);
    console.dir(`${body}`);
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
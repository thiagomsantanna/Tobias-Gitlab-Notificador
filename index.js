const expss = require('express');
const bodyParser = require("body-parser");
const router = expss.Router();
const app = expss();
const gitlab = require('./gitlabAPI_Consumer.js');
const discord = require('./discordNotifier.js');

const port = process.env.PORT || 3000;

app.use("/",router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


app.get('/', (req, res) => {

    res.send(`${req.body}`);
    console.log(req.body);
})


app.post('/gitlob', (req, res) => {

    const body = req.body;

    let _issue = {
        id: body.object_attributes.iid,
        title: body.object_attributes.title,
        url: body.object_attributes.url
    }

    let labelChanges = body.changes.labels;

    if (labelChanges) {
    
        let crrt = labelChanges.current;

        if (crrt.some(label => label.title == process.env.LABEL_HML_CONSIG)) {

            setTimeout(async () => {
                
                let issuesOnHomolog = await gitlab.getHomologIssuesOnBoard();
                issuesOnHomolog = issuesOnHomolog.find(issue => issue.iid == _issue.id);

                issuesOnHomolog ? await discord.notifyNewIssueToTest(_issue) : console.log(`Vish, trupicaram com essa tarefa aq hein -> ${_issue.id}`);

            }, 5000);//600000 - 480000
        }
    }

    res.sendStatus(200);

})

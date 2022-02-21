const expss = require('express');
const bodyParser = require("body-parser");
const router = expss.Router();
const app = expss();
const gitlab = require('./gitlabAPI.js');
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


app.post('/gitlob/hml', (req, res) => {

    const body = req.body;

    let _issue = {
        id: body.object_attributes.iid,
        title: body.object_attributes.title,
        url: body.object_attributes.url
    }

    let labelChanges = body.changes.labels;

    if (labelChanges) {
        
        let previous = labelChanges.previous;
        let current = labelChanges.current;

        if(current.some(label => label.title == '9-homologation') && !previous.some(label => label.title == '9-homologation')) {
           
            setTimeout(async () => {
                
                // let issuesOnHomolog = await gitlab.getHomologIssuesOnBoard();
                let issuesOnHomolog = await gitlab.getIssuesByLabel('9-homologation');
                issuesOnHomolog = issuesOnHomolog.find(issue => issue.iid == _issue.id);

                issuesOnHomolog ? await discord.notifyNewIssueToTest(_issue) : console.log(`Vish, trupicaram com essa tarefa aq hein -> ${_issue.id}`);

            }, 480000);//600000 - 480000
        }
    }

    res.sendStatus(200);

})

app.post('/gitlob/merges', (req, res) => {

    const body = req.body;

    let _issueMerge = {
        id: body.object_attributes.iid,
        title: body.object_attributes.title,
        url: body.object_attributes.url
    };

    let _member = {
        name: body.user.name,
        avatar: body.user.avatar_url
    };

    let labelChanges = body.changes.labels;

    
    if (labelChanges) {
        
        let previous = labelChanges.previous;
        let current = labelChanges.current;

        if (current.some(label => label.title == '6-merge-request') && !previous.some(label => label.title == '6-merge-request')) {

            setTimeout(async () => {

                let issuesOnMerge = await gitlab.getIssuesByLabel('6-merge-request');
                issuesOnMerge = issuesOnMerge.find(issue => issue.iid == _issueMerge.id);
                
                let mergeRes = await gitlab.createMergeRequest(_issueMerge);

                issuesOnMerge ? await discord.notifyNewMerge(_issueMerge, _member) : console.log(`Vish, trupicaram com essa tarefa aq hein -> ${_issueMerge.id}`);
    
            }, 180000);//600000 - 480000
        }
    }

    res.sendStatus(200);
});

app.post('/gitlob/refac', (req, res) =>{

    const body = req.body;

    let _issueRefac = {
        id: body.object_attributes.iid,
        title: body.object_attributes.title,
        url: body.object_attributes.url
    };

    let labelChanges = body.changes.labels;
    
    if (labelChanges) {
        
        let previous = labelChanges.previous;
        let current = labelChanges.current;

        if (current.some(label => label.title == '3-Refactoring') && !previous.some(label => label.title == '3-Refactoring')) {

            setTimeout(async () => {

                // discord.notifyRefactoring(_issueRefac);
                let issuesOnRefac = await gitlab.getIssuesByLabel('3-Refactoring');
                issuesOnRefac = issuesOnRefac.find(issue => issue.iid == _issueRefac.id);

                issuesOnRefac ? await discord.notifyRefactoring(_issueRefac) : console.log(`Vish, trupicaram com essa tarefa aq hein -> ${_issueRefac.id}`);
    
            }, 480000);//600000 - 
        }
    }

    res.sendStatus(200);
})

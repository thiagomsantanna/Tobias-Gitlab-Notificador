const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({
    path: process.env.ENV === 'dev' ? '.env.dev' : '.env'
});


async function getHomologIssuesOnBoard() {

    const homolog = await fetch(`https://gitlab.com/api/v4/projects/${process.env.PROJECTID}/issues?labels=${process.env.LABEL_HML_CONSIG}&state=opened`, {
        headers: {
            authorization: `Bearer ${process.env.TOKENGITLAB}`
        }
    });
    
    const issuesOnHomolog = await homolog.json();
    
    return issuesOnHomolog;
};

async function getIssuesByLabel(label) {
    
    const issues = await fetch(`https://gitlab.com/api/v4/projects/${process.env.PROJECTID}/issues?labels=${label}&state=opened`, {
        headers: {
            authorization: `Bearer ${process.env.TOKENGITLAB}`
        }
    });
    
    const issuesJson = await issues.json();
    
    return issuesJson;
};

async function createMergeRequest(issue) {
    
    let _body = {
        title: `#${issue.id}`,
        target_branch: "Homologation",
        source_branch: `z-features/feature-${issue.id}`
    };
    
    const merge_request = await fetch(`https://gitlab.com/api/v4/projects/${process.env.PROJECTID}//merge_requests`, {
        method: 'POST',
        body: JSON.stringify(_body),
        headers: { 
            'Content-Type': 'application/json', 
            authorization: `Bearer ${process.env.TOKENGITLAB}`
        }
    });
    
    return await merge_request.json();
}

async function verifyWebhook(labelChanges, label){

    let issuesOnBoard;
    
    if (labelChanges) {
        
        let previous = labelChanges.previous;
        let current = labelChanges.current;

        if (current.some(label => label.title == label) && !previous.some(label => label.title == label)) {

            setTimeout(async () => {

                issuesOnRefac = await gitlab.getIssuesByLabel(label);
                // issuesOnRefac = issuesOnRefac.find(issue => issue.iid == _issueRefac.id);

                // issuesOnRefac ? await discord.notifyRefactoring(_issueRefac) : console.log(`Vish, trupicaram com essa tarefa aq hein -> ${_issue.id}`);
    
            }, 480000);//600000 - 
        }
    }

    return issuesOnBoard;
}

module.exports = { getHomologIssuesOnBoard,  getIssuesByLabel, createMergeRequest};
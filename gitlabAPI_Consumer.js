const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();


async function getHomologIssuesOnBoard() {

    const homolog = await fetch(`https://gitlab.com/api/v4/projects/${process.env.PROJECTID_CONSIG}/issues?labels=${process.env.LABEL_HML_CONSIG}&state=opened`, {
        headers: {
            authorization: `Bearer ${process.env.TOKENGITLAB}`
        }
    });
    
    const issuesOnHomolog = await homolog.json();
    
    return issuesOnHomolog;
};

async function getIssuesByLabel(label) {
    
    const issues = await fetch(`https://gitlab.com/api/v4/projects/${process.env.PROJECTID_CONSIG}/issues?labels=${label}&state=opened`, {
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
    
    const merge_request = await fetch(`https://gitlab.com/api/v4/projects/${process.env.PROJECTID_CONSIG}//merge_requests`, {
        method: 'POST',
        body: JSON.stringify(_body),
        headers: { 
            'Content-Type': 'application/json', 
            authorization: `Bearer ${process.env.TOKENGITLAB}`
        }
    });
    
    return await merge_request.json();
}

module.exports = { getHomologIssuesOnBoard,  getIssuesByLabel, createMergeRequest};
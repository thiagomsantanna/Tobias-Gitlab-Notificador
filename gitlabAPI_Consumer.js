const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



async function getHomologIssuesOnBoard() {

    const homolog = await fetch(`https://gitlab.com/api/v4/projects/${process.env.PROJECTID_CONSIG}/issues?labels=9-homologation&state=opened`, {
        headers: {
            authorization: `Bearer ${process.env.TOKENGITLAB}`
        }
    });

    const issuesOnHomolog = await homolog.json();

    return issuesOnHomolog;
};



module.exports = { getHomologIssuesOnBoard };
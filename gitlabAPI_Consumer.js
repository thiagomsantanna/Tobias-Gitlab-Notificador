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

module.exports = { getHomologIssuesOnBoard };
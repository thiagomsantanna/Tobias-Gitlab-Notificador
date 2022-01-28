const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();


async function getHomologIssuesOnBoard() {

    const homolog = await fetch(`https://gitlab.com/api/v4/projects/15403191/issues?labels=9-homologation&state=opened`, {
        headers: {
            authorization: `Bearer tsxfbvhPFFuxtKmFsoBq`
        }
    });

    const issuesOnHomolog = await homolog.json();

    return issuesOnHomolog;
};

module.exports = { getHomologIssuesOnBoard };
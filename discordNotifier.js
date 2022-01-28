const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

function buildEmbedMessage(issue) {
    
    const embedMessage = 
    {
        embeds: [{
            title: `#${issue.id}`,
            color: 13395507,
            description: issue.title,
            url: issue.url,
            author: {
              name: "Homologation"
            },
            thumbnail: {
              url: "https://raw.githubusercontent.com/thiagomsantanna/gitlab-issues-notifications/master/imgs/imgNotific.png"
            }
        }]
    };
//./assets/sapo.gif
    return JSON.stringify(embedMessage);
};


async function notifyNewIssueToTest(issue) {

    const _body = buildEmbedMessage(issue);

    await fetch(process.env.DSWEBHOOK_CONSIG, {
        method: 'POST',
        body: _body,
        headers: { 'Content-Type': 'application/json' }
    });

    console.log(`Notificado -> ${issue.id}`);
};



module.exports = { notifyNewIssueToTest };
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
              name: "Movida para Homologation"
            },
            thumbnail: {
              url: "https://raw.githubusercontent.com/thiagomsantanna/gitlab-issues-notifications/master/imgs/sapo.gif"
            }
        }]
    };
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

async function notifyNewMerge(issue, member) {

    let _body = buildEmbedMessage(issue);
    _body = JSON.parse(_body);
    _body.embeds[0].author.name = 'Movida para merge-request';
    _body.embeds[0].color = 7876940;
    _body.embeds[0].thumbnail.url = member.avatar;
    _body = JSON.stringify(_body);

    await fetch(process.env.WEBHOOK_MERGE, {
        method: 'POST',
        body: _body,
        headers: { 'Content-Type': 'application/json' }
    });

    console.log(`Notificado -> ${issue.id}`);
};


module.exports = { notifyNewIssueToTest, notifyNewMerge };
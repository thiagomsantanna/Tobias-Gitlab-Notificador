const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({
    path: process.env.ENV === 'dev' ? '.env.dev' : '.env'
})


const genericEmbedMessage = (issue) => JSON.stringify({
    embeds: [{
        title: `#${issue.id}`,
        description: issue.title,
        url: issue.url
    }]
});


async function sendMessage(webhook, message) {
    await fetch(webhook, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' }
    });
}

async function notifyNewIssueToTest(issue) {

    const hmlMsg = JSON.parse(genericEmbedMessage(issue));
    hmlMsg.embeds[0].author = { name: 'Movida para Homologation' };
    hmlMsg.embeds[0].color = 13395507;
    hmlMsg.embeds[0].thumbnail = {
        url: 'https://raw.githubusercontent.com/thiagomsantanna/gitlab-issues-notifications/master/imgs/sapo.gif'
    };

    await sendMessage(process.env.WEBHOOK, hmlMsg);

    console.log(`Nova tarefa em Homologation-> ${issue.id}`);
};

async function notifyNewMerge(issue, member) {

    let mergeMsg = JSON.parse(genericEmbedMessage(issue));
    mergeMsg.embeds[0].author = {name: 'Movida para merge-request'};
    mergeMsg.embeds[0].color = 7876940;
    mergeMsg.embeds[0].thumbnail = {url: member.avatar};

    await sendMessage(process.env.WEBHOOK_MERGE, mergeMsg);

    console.log(`Nova tarefa em merge-request -> ${issue.id}`);
};

async function notifyRefactoring(issue) {
    let refacMsg = JSON.parse(genericEmbedMessage(issue));
    refacMsg.embeds[0].author = {name: 'Necessário refactoring'};
    refacMsg.embeds[0].color = 14103347;
    refacMsg.embeds[0].thumbnail = { url: 'https://media.giphy.com/media/ZebTmyvw85gnm/giphy.gif'}
    refacMsg.content = `<@&${process.env.DEV_ROLE}>`;

    await sendMessage(process.env.WEBHOOK, refacMsg);
}


module.exports = { notifyNewIssueToTest, notifyNewMerge, notifyRefactoring };
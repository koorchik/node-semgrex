const language           = require('@google-cloud/language');
const { SemgrexMatcher } = require('../');
const DependencyTree     = require('./DependencyTree');

const languageClient = language({
    projectId: 'test-163321',
    keyFilename:  `${__dirname}/../keys.json` // You can get keys from Google Cloud management console
});

main().then(() => {
    process.exit();
}).catch(error => {
    console.log(error);
});

async function main() {
    const sentence = 'Ford, who is the founder of the company, signed the contact';
    const tree = await parseSentence(sentence);

    const matcher = new SemgrexMatcher({
      nodes: tree.getNodes(),
      pattern : '{}=RCMOD <rcmod {} : {tag:PRON}=PRONOUN <<nsubj {}=RCMOD'
    });

    while ( await matcher.find() ) {
        const RCMOD   = await matcher.getNode('RCMOD');
        const PRONOUN = await matcher.getNode('PRONOUN');

        console.log({
            'RC': tree.extractSubtree(RCMOD.id).toSentence(),
            'PRONOUN': tree.extractSubtree(PRONOUN.id).toSentence()
        });
    }
}

async function parseSentence(sentence) {
    return new Promise((resolve, reject) => {
        languageClient.document(sentence).annotate(function(err, annotation) {
            if (err) return reject(err);
            resolve( new DependencyTree({googleCloudTokens: annotation.tokens}) );
        });
    });
}

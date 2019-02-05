## NodeJs wrapper for Stanford NLP Semgrex

[![Build Status](https://travis-ci.org/koorchik/node-semgrex.svg?branch=master)](https://travis-ci.org/koorchik/node-semgrex)
[![npm version](https://badge.fury.io/js/semgrex.svg)](https://badge.fury.io/js/semgrex)
[![Known Vulnerabilities](https://snyk.io/test/github/koorchik/node-semgrex/badge.svg?targetFile=package.json)](https://snyk.io/test/github/koorchik/node-semgrex?targetFile=package.json)

## What is Semgrex?

Semgrex is a utility for matching patterns in dependency trees, based on tree relationships and regular expression matches on nodes.

Semgrex is part of StafordNLP which is written in Java. So, this module uses Java Native Interface(JNI). You will need JRE to run this module.

This modules fully supports "Semgrex Matcher API".

## Documentation

-   [Semgrex Syntax](https://nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/semgraph/semgrex/SemgrexPattern.html)
-   [Semgrex Matcher API](https://nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/semgraph/semgrex/SemgrexMatcher.html)
-   [Powerpoint Slides](https://nlp.stanford.edu/software/Semgrex.ppt)

## How to convert sentence to Dependecy Tree?

You should use syntax parser for your language. You can start with https://cloud.google.com/natural-language/ for parsing sentences.

## Syntax details

1. Use 'idx' field to match node by 'id'.
2. Use 'tag' field to match node by 'upostag'.
3. Use 'word' field to match node by 'form'.
4. Use 'lemma' field to match node by 'lemma'.

```javascript
const matcher = new SemgrexMatcher({
    nodes,
    pattern: '{tag:NOUN} <<rcmod {lemma:do}'
});
```

## Complex example

For more examples see ["examples" foler](./examples)

```javascript
const { SemgrexMatcher } = require('semgrex');

// "Kiev, which is one of the largest cities in Europe, is the capital of Ukraine." as a dependency tree nodes

const nodes = [
    {
        id: 1,
        form: 'Kiev',
        lemma: 'Kiev',
        upostag: 'NOUN',
        xpostag: '_',
        feat: '_',
        head: 13,
        deprel: 'nsubj',
        deps: '_',
        misc: '_'
    },
    {
        id: 2,
        form: ',',
        lemma: ',',
        upostag: 'PUNCT',
        xpostag: '_',
        feat: '_',
        head: 1,
        deprel: 'p',
        deps: '_',
        misc: '_'
    },
    {
        id: 3,
        form: 'which',
        lemma: 'which',
        upostag: 'DET',
        xpostag: '_',
        feat: '_',
        head: 4,
        deprel: 'nsubj',
        deps: '_',
        misc: '_'
    },
    {
        id: 4,
        form: 'is',
        lemma: 'be',
        upostag: 'VERB',
        xpostag: '_',
        feat: '_',
        head: 1,
        deprel: 'rcmod',
        deps: '_',
        misc: '_'
    },
    {
        id: 5,
        form: 'one',
        lemma: 'one',
        upostag: 'NUM',
        xpostag: '_',
        feat: '_',
        head: 4,
        deprel: 'attr',
        deps: '_',
        misc: '_'
    },
    {
        id: 6,
        form: 'of',
        lemma: 'of',
        upostag: 'ADP',
        xpostag: '_',
        feat: '_',
        head: 5,
        deprel: 'prep',
        deps: '_',
        misc: '_'
    },
    {
        id: 7,
        form: 'the',
        lemma: 'the',
        upostag: 'DET',
        xpostag: '_',
        feat: '_',
        head: 9,
        deprel: 'det',
        deps: '_',
        misc: '_'
    },
    {
        id: 8,
        form: 'largest',
        lemma: 'large',
        upostag: 'ADJ',
        xpostag: '_',
        feat: '_',
        head: 9,
        deprel: 'amod',
        deps: '_',
        misc: '_'
    },
    {
        id: 9,
        form: 'cities',
        lemma: 'city',
        upostag: 'NOUN',
        xpostag: '_',
        feat: '_',
        head: 6,
        deprel: 'pobj',
        deps: '_',
        misc: '_'
    },
    {
        id: 10,
        form: 'in',
        lemma: 'in',
        upostag: 'ADP',
        xpostag: '_',
        feat: '_',
        head: 9,
        deprel: 'prep',
        deps: '_',
        misc: '_'
    },
    {
        id: 11,
        form: 'Europe',
        lemma: 'Europe',
        upostag: 'NOUN',
        xpostag: '_',
        feat: '_',
        head: 10,
        deprel: 'pobj',
        deps: '_',
        misc: '_'
    },
    {
        id: 12,
        form: ',',
        lemma: ',',
        upostag: 'PUNCT',
        xpostag: '_',
        feat: '_',
        head: 1,
        deprel: 'p',
        deps: '_',
        misc: '_'
    },
    {
        id: 13,
        form: 'is',
        lemma: 'be',
        upostag: 'VERB',
        xpostag: '_',
        feat: '_',
        head: 0,
        deprel: 'root',
        deps: '_',
        misc: '_'
    },
    {
        id: 14,
        form: 'the',
        lemma: 'the',
        upostag: 'DET',
        xpostag: '_',
        feat: '_',
        head: 15,
        deprel: 'det',
        deps: '_',
        misc: '_'
    },
    {
        id: 15,
        form: 'capital',
        lemma: 'capital',
        upostag: 'NOUN',
        xpostag: '_',
        feat: '_',
        head: 13,
        deprel: 'attr',
        deps: '_',
        misc: '_'
    },
    {
        id: 16,
        form: 'of',
        lemma: 'of',
        upostag: 'ADP',
        xpostag: '_',
        feat: '_',
        head: 15,
        deprel: 'prep',
        deps: '_',
        misc: '_'
    },
    {
        id: 17,
        form: 'Ukraine',
        lemma: 'Ukraine',
        upostag: 'NOUN',
        xpostag: '_',
        feat: '_',
        head: 16,
        deprel: 'pobj',
        deps: '_',
        misc: '_'
    },
    {
        id: 18,
        form: '.',
        lemma: '.',
        upostag: 'PUNCT',
        xpostag: '_',
        feat: '_',
        head: 13,
        deprel: 'p',
        deps: '_',
        misc: '_'
    }
];

main()
    .then(() => {
        process.exit();
    })
    .catch(error => {
        console.log(error);
    });

async function main() {
    const matcher = new SemgrexMatcher({
        nodes,
        pattern: '{}=A <rcmod=rel {}=B'
    });

    while (await matcher.find()) {
        console.log('MATCH=', await matcher.getMatch());
        console.log('NODE A=', await matcher.getNode('A'));
        console.log('NODE B=', await matcher.getNode('B'));

        console.log('NODE NAMES', await matcher.getNodeNames());
        console.log('RELS NAMES', await matcher.getRelationNames());
        console.log('REL STRING', await matcher.getRelnString('rel'));
    }
}
```

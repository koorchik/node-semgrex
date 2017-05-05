semgrex
-------

https://nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/semgraph/semgrex/SemgrexPattern.html
https://nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/semgraph/semgrex/SemgrexMatcher.html

A SemgrexPattern is a tgrep-type pattern for matching node configurations in one of the Dependency trees structures. Unlike tgrep but like Unix grep, there is no pre-indexing of the data to be searched. Rather there is a linear scan through the graph where matches are sought.

A SemgrexPattern is a tgrep-type pattern for matching node configurations in one of the SemanticGraph structures. Unlike tgrep but like Unix grep, there is no pre-indexing of the data to be searched. Rather there is a linear scan through the graph where matches are sought.


```javascript
const matcher = new SemgrexMatcher({
    nodes,
    pattern: '{}=A <rcmod=rel {}=B'
});

while ( await matcher.find() ) {
    console.log( 'MATCH=', await matcher.getMatch() );
    console.log( 'NODE A=', await matcher.getNode('A') );
    console.log( 'NODE B=', await matcher.getNode('B') );
    console.log( await matcher.getNodeNames() );
    console.log( await matcher.getRelationNames() );
    console.log( await matcher.getRelnString('rel') );
    console.log( await matcher.toString() );
}
```

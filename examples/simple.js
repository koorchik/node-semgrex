
const { SemgrexMatcher } = require('../');

// "Kiev, which is one of the largest cities in Europe, is the capital of Ukraine." as a dependency tree nodes

const nodes = [
 { id: 1,  form: 'Kiev',    lemma: 'Kiev',    upostag: 'NOUN',  xpostag: '_', feat: '_', head: 13, deprel: 'nsubj', deps: '_', misc: '_' },
 { id: 2,  form: ',',       lemma: ',',       upostag: 'PUNCT', xpostag: '_', feat: '_', head: 1,  deprel: 'p',     deps: '_', misc: '_' },
 { id: 3,  form: 'which',   lemma: 'which',   upostag: 'DET',   xpostag: '_', feat: '_', head: 4,  deprel: 'nsubj', deps: '_', misc: '_' },
 { id: 4,  form: 'is',      lemma: 'be',      upostag: 'VERB',  xpostag: '_', feat: '_', head: 1,  deprel: 'rcmod', deps: '_', misc: '_' },
 { id: 5,  form: 'one',     lemma: 'one',     upostag: 'NUM',   xpostag: '_', feat: '_', head: 4,  deprel: 'attr',  deps: '_', misc: '_' },
 { id: 6,  form: 'of',      lemma: 'of',      upostag: 'ADP',   xpostag: '_', feat: '_', head: 5,  deprel: 'prep',  deps: '_', misc: '_' },
 { id: 7,  form: 'the',     lemma: 'the',     upostag: 'DET',   xpostag: '_', feat: '_', head: 9,  deprel: 'det',   deps: '_', misc: '_' },
 { id: 8,  form: 'largest', lemma: 'large',   upostag: 'ADJ',   xpostag: '_', feat: '_', head: 9,  deprel: 'amod',  deps: '_', misc: '_' },
 { id: 9,  form: 'cities',  lemma: 'city',    upostag: 'NOUN',  xpostag: '_', feat: '_', head: 6,  deprel: 'pobj',  deps: '_', misc: '_' },
 { id: 10, form: 'in',      lemma: 'in',      upostag: 'ADP',   xpostag: '_', feat: '_', head: 9,  deprel: 'prep',  deps: '_', misc: '_' },
 { id: 11, form: 'Europe',  lemma: 'Europe',  upostag: 'NOUN',  xpostag: '_', feat: '_', head: 10, deprel: 'pobj',  deps: '_', misc: '_' },
 { id: 12, form: ',',       lemma: ',',       upostag: 'PUNCT', xpostag: '_', feat: '_', head: 1,  deprel: 'p',     deps: '_', misc: '_' },
 { id: 13, form: 'is',      lemma: 'be',      upostag: 'VERB',  xpostag: '_', feat: '_', head: 0,  deprel: 'root',  deps: '_', misc: '_' },
 { id: 14, form: 'the',     lemma: 'the',     upostag: 'DET',   xpostag: '_', feat: '_', head: 15, deprel: 'det',   deps: '_', misc: '_' },
 { id: 15, form: 'capital', lemma: 'capital', upostag: 'NOUN',  xpostag: '_', feat: '_', head: 13, deprel: 'attr',  deps: '_', misc: '_' },
 { id: 16, form: 'of',      lemma: 'of',      upostag: 'ADP',   xpostag: '_', feat: '_', head: 15, deprel: 'prep',  deps: '_', misc: '_' },
 { id: 17, form: 'Ukraine', lemma: 'Ukraine', upostag: 'NOUN',  xpostag: '_', feat: '_', head: 16, deprel: 'pobj',  deps: '_', misc: '_' },
 { id: 18, form: '.',       lemma: '.',       upostag: 'PUNCT', xpostag: '_', feat: '_', head: 13, deprel: 'p',     deps: '_', misc: '_' }
];

main().then(() => {
  process.exit();
}).catch(error => {
  console.log(error);
});

async function main() {
  const matcher = new SemgrexMatcher({
      nodes,
      pattern: '{}=A <rcmod=rel {}=B'
  });

  while ( await matcher.find() ) {
      console.log( 'MATCH=',  await matcher.getMatch() );
      console.log( 'NODE A=', await matcher.getNode('A') );
      console.log( 'NODE B=', await matcher.getNode('B') );

      console.log( 'NODE NAMES', await matcher.getNodeNames() );
      console.log( 'RELS NAMES', await matcher.getRelationNames() );
      console.log( 'REL STRING', await matcher.getRelnString('rel') );
  }
}

module.exports = class DependencyTree {
    constructor(args = {}) {
        if (args.googleCloudTokens) {
            this.nodes = this._initFromGoogleCloudTokens(args.googleCloudTokens);
        } else if (args.nodes) {
            this.nodes = args.nodes;
        }
    }

    extractSubtree(id) {
        const nodes = deepCopy(this.nodes);
        const descendentNodes = getDescendentNodes(nodes, id);

        return new DependencyTree({ nodes: descendentNodes });
    }

    reindex() {
        const nodes = deepCopy(this.nodes);
        return new DependencyTree({ nodes: reindexNodes(nodes) });
    }

    getNodes() {
        return this.nodes;
    }

    toSentence() {
        const sentence = this.nodes
            .sort((a, b) => a.id - b.id)
            .map(node => node.form).join(' ');


        return sentence.replace(/ ([,.])/g, '$1');
    }

    _initFromGoogleCloudTokens(googleCloudTokens) {
        return googleCloudTokens.map((gtoken, i) => {
            const partOfSpeech = gtoken.partOfSpeech;

            const feats = {
                gender : partOfSpeech.gender === 'GENDER_UNKNOWN' ? '' : partOfSpeech.gender,
                number : partOfSpeech.number === 'NUMBER_UNKNOWN' ? '' : partOfSpeech.number,
                person : partOfSpeech.person === 'PERSON_UNKNOWN' ? '' : partOfSpeech.person,
                tense  : partOfSpeech.tense  === 'TENSE_UNKNOWN'  ? '' : partOfSpeech.tense
            };

            return {
                id      : i + 1,
                form    : gtoken.text.content,
                lemma   : gtoken.lemma,
                upostag : partOfSpeech.tag,
                xpostag : '_',
                feats,
                head    : gtoken.dependencyEdge.label === 'ROOT' ? 0 : gtoken.dependencyEdge.headTokenIndex + 1,
                deprel  : gtoken.dependencyEdge.label.toLowerCase(),
                deps    : '_',
                misc    : '_'
            };
        });
    }
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getDescendentNodes(nodes, parentId) {
    const children = nodes.filter(n => n.head === parentId);
    const result = [ nodes.find(n => n.id === parentId) ];

    for (const child of children) {
        result.push(...getDescendentNodes(nodes, child.id));
    }

    return result;
}

function reindexNodes(nodes) {
    const oldToNewIdx = {};

    nodes.sort((a, b) => (a.id - b.id)).forEach((n, i) => {
        oldToNewIdx[n.id] = i + 1;
    });

    for (const node of nodes) {
        node.id   = oldToNewIdx[node.id];
        node.head = oldToNewIdx[node.head] || 0;

        if (node.head === 0) node.deprel = 'root';
    }

    return nodes;
}

const java = require('java');

java.asyncOptions = {
    asyncSuffix: undefined,
    syncSuffix: "Sync",
    promiseSuffix: "",
    promisify: require("bluebird").promisify
};

java.classpath.push(__dirname + "/../javalib/stanford-corenlp-3.7.0.jar");

const CoNLLUDocumentReader = java.import('edu.stanford.nlp.trees.ud.CoNLLUDocumentReader');
const SemgrexPattern       = java.import('edu.stanford.nlp.semgraph.semgrex.SemgrexPattern');
const SemanticGraph        = java.import('edu.stanford.nlp.semgraph.SemanticGraph');
const CoreLabel            = java.import('edu.stanford.nlp.ling.CoreLabel');
const StringReader         = java.import('java.io.StringReader');

class SemgrexMatcher {
    constructor({ nodes=[], pattern } = {}) {
        if (!pattern) throw new Error('"pattern" required');

        this.pattern = pattern;
        this.matcher = null;

        this.nodes = nodes;
        this.nodesById = {};
        this.nodes.forEach( node => {
            this.nodesById[node.id] = node;
        });
    }

    async find() {
        const matcher = await this._getMatcher();
        return matcher.find();
    }

    async findNextMatchingNode() {
        const matcher = await this._getMatcher();
        return matcher.findNextMatchingNode();
    }

    async getGraph() {
        return this.nodes;
    }

    async getMatch() {
        const matcher = await this._getMatcher();

        const node = await matcher.getMatch();
        if (!node) return;

        return this.nodesById[await node.index()];
    }

    async getNode(nodeName) {
        const matcher = await this._getMatcher();

        const node = await matcher.getNode(nodeName);
        if (!node) return;

        return this.nodesById[await node.index()];
    }

    async getNodeNames() {
        const matcher    = await this._getMatcher();
        return this._setToArray( await matcher.getNodeNames() );
    }

    async getRelationNames() {
        const matcher    = await this._getMatcher();
        return this._setToArray( await matcher.getRelationNames() );
    }

    async getRelnString(name) {
        const matcher = await this._getMatcher();
        return matcher.getRelnString(name);
    }

    async matches() {
        const matcher = await this._getMatcher();
        return matcher.matches();
    }

    async matchesAt() {
        return Promise.reject(new Error('"matchesAt" is not implemented!'));
    }

    async reset() {
        const matcher = await this._getMatcher();
        return matcher.reset();
    }

    async toString() {
        const matcher = await this._getMatcher();
        return matcher.toString();
    }

    async _getMatcher() {
        if (!this.matcher) {
            const conll = this._nodesToCoNLL(this.nodes);

            const iterator = await (new CoNLLUDocumentReader()).getIterator( new StringReader(conll) );
            const sentenceGraph = await iterator.next();

            const semgrexPattern = SemgrexPattern.compileSync(this.pattern);
            this.matcher = semgrexPattern.matcher(sentenceGraph);
        }

        return this.matcher;
    }

    _nodesToCoNLL(nodes) {
        let CoNLL = '';

        nodes.forEach( node => {
            const id      = node.id; // idx
            const form    = node.form; // word
            const lemma   = node.lemma   || '_'; // lemma
            const upostag = node.upostag || '_';
            const xpostag = node.upostag || '_'; // tag // We copy xpostag to xpostag to have access to it using "tag"
            const feats   = '_'; //TODO
            const head    = node.head;
            const deprel  = (node.deprel || '_').toLowerCase();
            const deps    = node.deps    || '_';
            const misc    = node.misc    || '_';

            const line = `${id}\t${form}\t${lemma}\t${upostag}\t${xpostag}\t${feats}\t${head}\t${deprel}\t${deps}\t${misc}\n`;

            CoNLL += line;
        });

        return CoNLL;
    }

    async _setToArray(set) {
        const iterator = await set.iterator();

        const items = [];
        while ( await iterator.hasNext() ) {
            items.push( await iterator.next() );
        }

        return items;
    }
}

module.exports = SemgrexMatcher;

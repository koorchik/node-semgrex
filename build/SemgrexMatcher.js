"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const java = require('java');

java.asyncOptions = {
    asyncSuffix: undefined,
    syncSuffix: "Sync",
    promiseSuffix: "",
    promisify: require("bluebird").promisify
};

java.classpath.push(__dirname + "/../javalib/stanford-corenlp-3.7.0.jar");

const CoNLLUDocumentReader = java.import('edu.stanford.nlp.trees.ud.CoNLLUDocumentReader');
const SemgrexPattern = java.import('edu.stanford.nlp.semgraph.semgrex.SemgrexPattern');
const SemanticGraph = java.import('edu.stanford.nlp.semgraph.SemanticGraph');
const CoreLabel = java.import('edu.stanford.nlp.ling.CoreLabel');
const StringReader = java.import('java.io.StringReader');

class SemgrexMatcher {
    constructor({ nodes = [], pattern } = {}) {
        if (!pattern) throw new Error('"pattern" required');

        this.pattern = pattern;
        this.matcher = null;

        this.nodes = nodes;
        this.nodesById = {};
        this.nodes.forEach(node => {
            this.nodesById[node.id] = node;
        });
    }

    find() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this._getMatcher();
            return matcher.find();
        })();
    }

    findNextMatchingNode() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this2._getMatcher();
            return matcher.findNextMatchingNode();
        })();
    }

    getGraph() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            return _this3.nodes;
        })();
    }

    getMatch() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this4._getMatcher();

            const node = yield matcher.getMatch();
            if (!node) return;

            return _this4.nodesById[(yield node.index())];
        })();
    }

    getNode(nodeName) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this5._getMatcher();

            const node = yield matcher.getNode(nodeName);
            if (!node) return;

            return _this5.nodesById[(yield node.index())];
        })();
    }

    getNodeNames() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this6._getMatcher();
            return _this6._setToArray((yield matcher.getNodeNames()));
        })();
    }

    getRelationNames() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this7._getMatcher();
            return _this7._setToArray((yield matcher.getRelationNames()));
        })();
    }

    getRelnString(name) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this8._getMatcher();
            return matcher.getRelnString(name);
        })();
    }

    matches() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this9._getMatcher();
            return matcher.matches();
        })();
    }

    matchesAt() {
        return _asyncToGenerator(function* () {
            return Promise.reject(new Error('"matchesAt" is not implemented!'));
        })();
    }

    reset() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this10._getMatcher();
            return matcher.reset();
        })();
    }

    toString() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            const matcher = yield _this11._getMatcher();
            return matcher.toString();
        })();
    }

    _getMatcher() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (!_this12.matcher) {
                const conll = _this12._nodesToCoNLL(_this12.nodes);

                const iterator = yield new CoNLLUDocumentReader().getIterator(new StringReader(conll));
                const sentenceGraph = yield iterator.next();

                const semgrexPattern = SemgrexPattern.compileSync(_this12.pattern);
                _this12.matcher = semgrexPattern.matcher(sentenceGraph);
            }

            return _this12.matcher;
        })();
    }

    _nodesToCoNLL(nodes) {
        let CoNLL = '';

        nodes.forEach(node => {
            const id = node.id; // idx
            const form = node.form; // word
            const lemma = node.lemma || '_'; // lemma
            const upostag = node.upostag || '_';
            const xpostag = node.upostag || '_'; // tag // We copy xpostag to xpostag to have access to it using "tag"
            const feats = '_'; //TODO
            const head = node.head;
            const deprel = (node.deprel || '_').toLowerCase();
            const deps = node.deps || '_';
            const misc = node.misc || '_';

            const line = `${id}\t${form}\t${lemma}\t${upostag}\t${xpostag}\t${feats}\t${head}\t${deprel}\t${deps}\t${misc}\n`;

            CoNLL += line;
        });

        return CoNLL;
    }

    _setToArray(set) {
        return _asyncToGenerator(function* () {
            const iterator = yield set.iterator();

            const items = [];
            while (yield iterator.hasNext()) {
                items.push((yield iterator.next()));
            }

            return items;
        })();
    }
}

module.exports = SemgrexMatcher;
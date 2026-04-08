const cacheNode = require("node-cache");
const cache = new cacheNode({
    stdTTL: 60, 
    checkperiod: 120,
    useClones: false,
});

module.exports = cache;



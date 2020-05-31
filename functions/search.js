const index = require('../public/index.json');
const Fuse = require('fuse.js');

const fuse = new Fuse(index, { keys: ['title'] });

exports.handler = function (event, context, callback) {
    const term = event.queryStringParameters.q || '';
    let result = fuse.search(term);
    const length = Math.min(result.length, 21);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(result.slice(0, length)),
    });
}
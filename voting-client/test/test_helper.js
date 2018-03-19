/*
Create jsdom versions of document and window objects.
Place into global objects so REACT can discover and access document or window.
*/

import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

// Hoist window object 'navigator' as node.js global object.
Object.keys(window).forEach((key) => {
    if(!(key in global)) {
        global[key] = window[key];
    }
});

// Back to unit testing using chai and immutable!
chai.use(chaiImmutable);
// package.json file cannot recursively find .jsx files and thus a glob is used. -- https://github.com/isaacs/node-glob
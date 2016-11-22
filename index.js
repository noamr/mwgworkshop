"use strict";

const express = require('express');
const app = express();
const compileSass = require('express-compile-sass');
const root = process.cwd();
const path = require('path');
const jsxCompile = require('express-jsx');
const fetch = require('node-fetch');
const thief = require('color-thief-jimp');

const pub = `${root}/pub`;
const dest =  path.join(__dirname, '.generated');
app.use(jsxCompile(pub, {dest}));
app.use(compileSass({root: pub}));
app.use(express.static(pub));
app.use(express.static(dest));

const cached = {};

function getInstagramImages(user)
{
    if (cached[user]) {
        return Promise.resolve(cached[user]);
    }

    function getImages(suffix) {
        const url = `https://www.instagram.com/${user}/media/${suffix}`;
        console.log(`fetching ${url}`);
        return fetch(url).then(res => res.json()).then(result => {
            if (result.status !== 'ok') {
                return Promise.reject(result);
            }

            const images = result.items.map(item => item.images);
            if (result.more_available) {
                return getImages(`?max_id=${result.items[result.items.length - 1].id}`).then(nextImages => images.concat(nextImages));
            } else {
                return Promise.resolve(images);
            }
        });
    }

    return getImages('').then(images => {cached[user] = images; return Promise.resolve(images); });
}

app.get('/insta/:user', (req, res) => {
    getInstagramImages(req.params.user).then(images => {
        res.end(JSON.stringify(images));
    }).catch(result => {
        res.end(JSON.stringify(result));
    });
});
app.listen(5005);
/**
 * Created by noamr on 22/11/2016.
 */
const fs = require('fs');
const thief = require('color-thief-jimp');
const getPixels = require('get-pixels');

const total = object.length;
let done = 0;

const object = JSON.parse(fs.readFileSync(process.argv[2]));
return Promise.all(object.map(image => new Promise((resolve, reject) => {
        getPixels(image.thumbnail.url, (err, pixels) => {
            console.log(++done, total);
            if (err) {
                image.prominentColor = '#000000';
            } else {
                image.prominentColor = '#' + thief.getColorHex({
                        bitmap: {
                            width: pixels.shape[0],
                            height: pixels.shape[1],
                            data: pixels.data
                        }
                    });
            }

            resolve();
        });
    }))).then(() => fs.writeFileSync(process.argv[3], JSON.stringify(object))).catch(e => {
        console.error(e);
    });

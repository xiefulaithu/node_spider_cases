var Crawler = require("crawler");

var c = new Crawler({
    maxConnections: 10,
    rateLimit: 1000,
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            var imgs = $("li div.con div.pic a img");
            var txts = $("li div.con div.txt div.top h3 a");
            for (let idx = 0; idx < imgs.length; idx++) {
                const pic = imgs[idx];
                const txt = txts[idx];
                var filelink = pic.attribs.src;
                var filename = "pics/" + txt.children[0].data.replace("/", "每");

                var fs = require("fs"),
                    // path = require("path"),
                    request = require("request");
                // fs.stat(path.dirname(filename), function(err, stats) {
                //     if (err) {
                //         console.log(filename)
                //         console.log(err)
                //         console.log(res.options.uri)
                //         fs.mkdirSync(path.dirname(filename), { recursive: true })
                //     }
                // })
                var download = function(uri, filename, callback) {
                    request.head(uri, function(err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };

                download(filelink, filename, function() {
                    console.log("done: " + res.options.uri + ", " + txt.children[0].data);
                });
            }            
        }
        done();
    }
});

// c.queue("http://www.pwsannong.com/booklib/pictureList?SiteID=123&BasicID=237&SublibID=292&PageIndex=50");

for (let idx = 1; idx <= 133; idx ++) {
    url = "http://www.pwsannong.com/booklib/pictureList?SiteID=123&BasicID=237&SublibID=292&PageIndex=" + idx;
    c.queue(url);
}
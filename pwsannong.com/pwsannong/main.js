var Crawler = require("crawler");

var c = new Crawler({
    maxConnections: 10,
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
                var filename = txt.children[0].data;

                var fs = require("fs"),
                    request = require("request");
                var download = function(uri, filename, callback) {
                    request.head(uri, function(err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };

                download(filelink, filename, function() {
                    console.log("done");
                });
            }            
        }
        done();
    }
});

c.queue("http://www.pwsannong.com/booklib/pictureList?SiteID=123&BasicID=237&SublibID=292&PageIndex=1");







// Request URL: http://www.pwsannong.com/booklib/zpimage.zhtml?ID=9960699&SiteID=123&draft=0&type=logo&w=y

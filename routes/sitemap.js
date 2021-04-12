
const express = require("express");
const router = express.Router();
 
const js2xmlparser = require("js2xmlparser");
const moment = require("moment");
 

router.get("/", function(req, res, next) {
    try {
        //our records to index
        const records = getRecordsFromDataSource();
        const collection = [];
        let today = moment();
        today = today.format("YYYY-MM-DD");
        //add site root url
        const rootUrl = {};
        rootUrl.loc = "https://thedevang.com/";
        rootUrl.lastmod = today;
        rootUrl.changefreq = "daily";
        rootUrl.priority = "1.0";
        rootUrl["image:image"] = {
            "image:loc": "https://i.imgur.com/CSK51km.jpg",
            "image:caption":
                "Devang Singh Full stack developer. Travel enthusiast. blogger",
        };
        collection.push(rootUrl);
 
        //add recipes urls
        for (let i = 0; i < records.length; i++) {
            const url = {};
            url.loc = records[i].url;
            url.lastmod = records[i].updated_at;
            url["image:image"] = {
                "image:loc": records[i].featured_image_url,
                "image:caption": records[i].description,
            };
 
            collection.push(url);
        }
        const col = {
            "@": {
                xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
            },
            url: collection,
        };
        const xml = js2xmlparser.parse("urlset", col);
        res.set("Content-Type", "text/xml");
        res.status(200);
        res.send(xml);
    } catch (e) {
        next(e);
    }
});
 
/**
 * @return a collection to index (typically we'll get these records from our database)
 */
function getRecordsFromDataSource() {
 
    const record1 = {
        url: "https://thedevang.com/blogs/",
        description:
            "Welcome to blogs. Enjoy reading various travel experiences",
        featured_image_url: "https://thedevang.com/blog/rsk/card-blog-image.jpg",
        updated_at: "2021-03-14",
    };
    const record2 = {
        url: "https://thedevang.com",
        description: "Devang Singh portfolio. Fullstack MERN developer",
        featured_image_url: "https://i.imgur.com/CSK51km.jpg",
        updated_at: "2021-03-12",
    };
    return [record1, record2];
}
 
module.exports = router;
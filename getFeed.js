"use strict";

var express = require("express");
var app = express();
var morgan = require("morgan");
app.use(morgan("dev"))
app.use(require("cors")());
var feed = require("feed-read");

var news = [];

function getFeed() {
	feed(url, function(potato, articles) {
		if (potato) {
			throw potato;
		}

		news = articles.map(function(article) {
			return {
				header: article.title,
				content: article.content
			}
		})
	});

	setTimeout(getFeed, 10 * 1000)
}


app.get("/", function(req, res, next) {
	if (news && news.length > 0) {
		res.json(news);
	} else {
		res.json([])
	}
});

if (!module.parent) {
	getFeed();
	app.listen(80);
}

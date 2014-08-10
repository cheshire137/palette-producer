# Palette Producer

Makes use of Please JS to give you color palettes based off a source color.

![screenshot](https://raw.githubusercontent.com/moneypenny/palette-producer/master/screenshot.png)

## How to Develop

You need [node.js and npm](http://nodejs.org/).

1. `npm install`
1. `npm install -g bower`
1. `bower install`
1. `npm install -g grunt-cli`
1. `grunt serve` to watch for front end file changes.

## How to Deploy to Heroku

1. `grunt build`
1. `git remote add heroku git@heroku.com:yourherokuapp.git`
1. `git push heroku master`
1. `heroku ps:scale web=1`

## Thanks

Thanks to [PleaseJS](https://github.com/Fooidge/PleaseJS) and [TinyColor](https://github.com/bgrins/TinyColor).

# Palette Producer

Generate color palettes based on color schemes like complementary, triadic, and analogous. Easily copy generated colors in a variety of formats, including hex color codes and RGB strings.

**[View Demo](http://moneypenny.github.io/palette-producer/)**

![screenshot 1](https://raw.githubusercontent.com/moneypenny/palette-producer/master/screenshot.png)

![screenshot 2](https://raw.githubusercontent.com/moneypenny/palette-producer/master/screenshot2.png)

## How to Develop

You need [node.js and npm](http://nodejs.org/).

### First Time

1. `npm install`
1. `npm install -g bower`
1. `bower install`
1. `npm install -g grunt-cli`

### Every Time

1. `grunt serve` to watch for front end file changes.

## How to Deploy

### How to Deploy to Github Pages

1. `./deploy.sh`

### How to Deploy to Heroku

1. `grunt build`
1. `git remote add heroku git@heroku.com:yourherokuapp.git`
1. `git push heroku master`
1. `heroku ps:scale web=1`

## Thanks

Thanks to [PleaseJS](https://github.com/Fooidge/PleaseJS), [Random Color](https://github.com/davidmerfield/randomColor), and [TinyColor](https://github.com/bgrins/TinyColor).

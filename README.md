# Palette Producer

Generate color palettes based on color schemes like complementary, triadic, and analogous. Easily copy generated colors in a variety of formats, including hex color codes and RGB strings.

**[View Demo](http://cheshire137.github.io/palette-producer/)**

![screenshot 1](https://raw.githubusercontent.com/cheshire137/palette-producer/master/screenshot.png)

![screenshot 2](https://raw.githubusercontent.com/cheshire137/palette-producer/master/screenshot2.png)

## How to Develop

You need [node.js and npm](http://nodejs.org/).

### First Time

    npm install

### Every Time

`grunt serve` to watch for front end file changes.

## How to Deploy

### How to Deploy to Github Pages

    ./deploy.sh

### How to Deploy to Heroku

    grunt build
    git remote add heroku git@heroku.com:yourherokuapp.git
    git push heroku master
    heroku ps:scale web=1

## Thanks

Thanks to [PleaseJS](https://github.com/Fooidge/PleaseJS), [Random Color](https://github.com/davidmerfield/randomColor), and [TinyColor](https://github.com/bgrins/TinyColor).

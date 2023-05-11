[![Build Status](https://app.travis-ci.com/sametkamgul/notes.svg?branch=main)](https://app.travis-ci.com/sametkamgul/notes)

# notes
Notes is an HTML/JavaScript/CSS client-side based simple TODO application.
Node.js is used for serving `notes.html` file

## how to use it?
You can use to store your TODO list in your browser. I'm aware it is a very simple application. But, in the process of learning and developing it was a big journey and excitement for me. If you can review the codes and feedback to me, I will be appreciated. My main motivation is to use the knowledge I stored in my brain's synapses. I used HTML, basic usage (copy-paste from tutorial) of CSS and JavaScript. I try to write my JavaScript code.

## how does it work?
The data is stored in the client local storage as JSON format in String. When you close the browser, data remains. Server just serves the client-side files. If you want to delete data completely or in case of a bug, you can delete the data from your browser's local storage settings.

## dependencies
```
express": "^4.17.1
```

## how to run
- You should install the dependencies in the `package.json` by running command below. It will automatically install the libraries locally under the `node_modules` folder
```sh
npm install
```

- After that you can use nodemon or simply run this:
```sh
node app.js
```

## reference
I am following [this course](https://www.udemy.com/course/sifirdan-zirveye-javascript-ve-nodejs-kursu/learn/lecture/22315510?start=0#overview) on Udemy. It is a great course for training yourself as a full-stack developer.

## TODO
Writing some test for JavaScript codes.

## License
[GNU](https://www.gnu.org/licenses/gpl-3.0.en.html)

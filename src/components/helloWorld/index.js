let sayHello = require('../../util/sayHello')
let $main = document.querySelector('#server-hello-world')
let msg = sayHello('World')

$main.innerHTML = msg
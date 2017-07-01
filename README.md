# spring-physics

An (very rough, work in progress) implementation of simple physics, written in Javascript and rendered using three.js. The physics currently implemented: 
* Semi-implicit Euler integration.
* Sphere/sphere collision detection.
* Sphere/sphere collision response (using the impulse method).
* Spring physics using Hooke's law (needs work!).

![collision_physics](https://user-images.githubusercontent.com/8677029/27762354-796b8218-5e3e-11e7-9311-93b6502fd27d.png)


# Getting Started


## Prerequisites
This application requires bower and browserify. Obtain them via npm.

From terminal, type:
```bash
(sudo) npm install -g browserify bower
```


## Building
From terminal (within the project root directory), type:
```bash
bower install
cd js
browserify main.js -o bundle.js
```
This will install all dependencies and build the bundle.js script using browserify.

## Running
Host the page using whichever HTTP server you prefer. A simple method is (within the project root directory):
```bash
(sudo) npm install -g http-server
http-server -c-1
```


# Contributors

Gavin Gregory <gavin.ian.gregory@gmail.com>

<https://github.com/gavingregory>


# License
(The MIT License)

Copyright (c) 2016 Gavin Gregory <gavin.ian.gregory@gmail.com>


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

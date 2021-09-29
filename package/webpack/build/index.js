(function(modulesInfo){
            //webpackbootstrap
            function require(modulePath){
                function fixPath(relativePath) {
                    return require(modulesInfo[modulePath].dependencies[relativePath]);
                }
                let exports = {};
                //？为什么再次套一层函数：需要做替换 code中的require替换成全的

            
                (function(require, exports, code){
                    eval(code)
                  })(fixPath,exports,modulesInfo[modulePath].code);

                return exports;
            }

            require('./src/index.js')


        })({"./src/index.js":{"dependencies":{"./a.js":"src/a.js","./b.js":"src/b.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nvar _b = require(\"./b.js\");\n\nconsole.log('hihi', _a.a);"},"src/a.js":{"dependencies":{},"code":"\"use strict\";\n\nconsole.log('a');"},"src/b.js":{"dependencies":{},"code":"\"use strict\";\n\nconsole.log('b');"}})
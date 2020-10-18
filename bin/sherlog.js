#!/usr/bin/env node
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=33)}([function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("chalk")},function(e,t){e.exports=require("lodash/map")},function(e,t){e.exports=require("commander")},function(e,t){e.exports=require("os")},function(e,t){e.exports=require("moment-timezone")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("ws")},function(e,t){e.exports=require("events")},function(e,t){e.exports=require("lodash/assign")},function(e,t){e.exports=require("lodash/compact")},function(e,t){e.exports=require("lodash/debounce")},function(e,t){e.exports=require("lodash/get")},function(e,t){e.exports=require("lodash/isEmpty")},function(e,t){e.exports=require("lodash/size")},function(e,t){e.exports=require("portfinder")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("compression")},function(e){e.exports=JSON.parse('{"hostname":"","files":[{"metric":"","file":"","timezone":""}]}')},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("ajv")},function(e,t){e.exports=require("open")},function(e,t){e.exports=require("pako")},function(e,t){e.exports=require("stream")},function(e,t){e.exports=require("console-clear")},function(e,t,r){var n,o,i,c,u=function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")};o=r(10),i=r(0),c=r(6),n=class e extends o.EventEmitter{readBlock(){var t,r;if(u(this,e),this.queue.length>=1&&(t=this.queue[0]).end>t.start)return(r=i.createReadStream(this.filename,{start:t.start,end:t.end-1,encoding:this.encoding})).on("error",e=>(this.logger&&this.logger.error("Tail error: "+e),this.emit("error",e))),r.on("end",()=>{if(this.emit("line","<<EOF>>"),this.queue.shift(),this.queue.length>0&&this.internalDispatcher.emit("next"),this.flushAtEOF&&this.buffer.length>0)return this.emit("line",this.buffer),this.buffer=""}),r.on("data",e=>{var t,r,n,o,i;if(null===this.separator)return this.emit("line",e);for(this.buffer+=e,o=this.buffer.split(this.separator),this.buffer=o.pop(),i=[],r=0,n=o.length;r<n;r++)t=o[r],i.push(this.emit("line",t));return i})}constructor(e,t={}){var r,n;if(super(e,t),this.readBlock=this.readBlock.bind(this),this.change=this.change.bind(this),this.filename=e,this.absPath=c.dirname(this.filename),({separator:this.separator=/[\r]{0,1}\n/,fsWatchOptions:this.fsWatchOptions={},follow:this.follow=!0,logger:this.logger,useWatchFile:this.useWatchFile=!1,flushAtEOF:this.flushAtEOF=!1,encoding:this.encoding="utf-8",fromBeginning:n=!1}=t),this.logger){this.logger.info("Tail starting..."),this.logger.info("filename: "+this.filename),this.logger.info("encoding: "+this.encoding);try{i.accessSync(this.filename,i.constants.F_OK)}catch(e){if("ENOENT"===(r=e).code)throw r}}this.buffer="",this.internalDispatcher=new o.EventEmitter,this.queue=[],this.isWatching=!1,this.internalDispatcher.on("next",()=>this.readBlock()),this.watch(n)}change(t){var r,n;u(this,e);try{n=i.statSync(t)}catch(e){return r=e,this.logger&&this.logger.error(`change event for ${t} failed: ${r}`),void this.emit("error",`change event for ${t} failed: ${r}`)}if(n.size<this.pos&&(this.pos=n.size),n.size>this.pos&&(this.queue.push({start:this.pos,end:n.size}),this.pos=n.size,1===this.queue.length))return this.internalDispatcher.emit("next")}watch(e){var t,r;if(!this.isWatching){this.logger&&(this.logger.info("filesystem.watch present? "+(void 0!==i.watch)),this.logger.info("useWatchFile: "+this.useWatchFile),this.logger.info("fromBeginning: "+e)),this.isWatching=!0;try{r=i.statSync(this.filename)}catch(e){return t=e,this.logger&&this.logger.error(`watch for ${this.filename} failed: ${t}`),void this.emit("error",`watch for ${this.filename} failed: ${t}`)}return this.pos=e?0:r.size,0===this.pos&&this.change(this.filename),!this.useWatchFile&&i.watch?(this.logger&&this.logger.info("watch strategy: watch"),this.watcher=i.watch(this.filename,this.fsWatchOptions,(e,t)=>this.watchEvent(e,t))):(this.logger&&this.logger.info("watch strategy: watchFile"),i.watchFile(this.filename,this.fsWatchOptions,(e,t)=>this.watchFileEvent(e,t)))}}rename(e){if(void 0===e||e!==this.filename)return this.unwatch(),this.follow?(this.filename=c.join(this.absPath,e),this.rewatchId=setTimeout(()=>this.watch(),1e3)):(this.logger&&this.logger.error(`'rename' event for ${this.filename}. File not available.`),this.emit("error",`'rename' event for ${this.filename}. File not available.`))}watchEvent(e,t){return"change"===e?this.change(this.filename):"rename"===e?this.rename(t):void 0}watchFileEvent(e,t){if(e.size>t.size&&(this.pos=e.size,this.queue.push({start:t.size,end:e.size}),1===this.queue.length))return this.internalDispatcher.emit("next")}unwatch(){if(this.watcher?this.watcher.close():i.unwatchFile(this.filename),this.rewatchId&&(clearTimeout(this.rewatchId),this.rewatchId=void 0),this.isWatching=!1,this.queue=[],this.logger)return this.logger.info("Unwatch ",this.filename)}},t.Tail=n},function(e,t){e.exports=require("lodash/assignIn")},function(e,t){e.exports=require("lodash/groupBy")},function(e,t){e.exports=require("lodash/take")},function(e,t){e.exports=require("string.prototype.matchall")},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),i=r(6),c=r.n(i),u=r(11),s=r.n(u),a=r(12),p=r.n(a),l=r(13),f=r.n(l),h=r(14),y=r.n(h),b=r(15),g=r.n(b),m=r(2),O=r.n(m),d=r(16),v=r.n(d),w=r(17),j=r.n(w),x=r(7),P=r.n(x),F=r(18),S=r.n(F),E=r(19),D=r.n(E),_=r(20),R=r.n(_),M=r(21),q=r(8),k=r.n(q),T=r(9),$=r.n(T),Y=r(22),z=r.n(Y),W=r(4),A=r.n(W),J=r(3),B=r.n(J),N=r(23),H=r.n(N),Z=r(5),I=r.n(Z),U=r(24),L=r.n(U),K=r(1),C=r.n(K),V=r(25),X=r.n(V),G=r(26),Q=r(27),ee=r.n(Q),te=r(28),re=r(29),ne=r.n(re),oe=r(30),ie=r.n(oe),ce=r(31),ue=r.n(ce);const se=r(32);class ae{constructor(e){const{dateFormat:t,hostname:r,payload:n,metric:o,regex:i,eventType:c,timezone:u}=e;this.dateFormat=t,this.hostname=r,this.payload=n,this.metric=o,this.regex=i,this.eventType=c,this.timezone=u,this.buffer=[]}tag(e,t){return{metric:this.metric,tags:{hostname:this.hostname,type:this.eventType,platform:A.a.platform()},timestamp:Number(t),values:e}}format(e){const t=[];return e.forEach(e=>{const r=I.a.tz(e.datetime,this.dateFormat,this.timezone).clone().tz("UTC");t.push(ne()(e,{datetime:r.format(),timestamp:Number(r.format("X"))}))}),O()(ie()(t,"timestamp"),(e,t)=>this.tag(e,t))}dispatch(e,t){const r=ue()(this.buffer,e).join("\n"),n=[...se(r,this.regex)];n.length&&t(this.format(O()(n,"groups"))),this.buffer.splice(0,e)}onBuffer(e,t){if(this.buffer.length===this.payload||"<<EOF>>"===e){const e=this.buffer.length;this.dispatch(e,t)}this.buffer.push(e)}}function pe(e,t){pe=function(e,t){return new i(e,void 0,t)};var r=fe(RegExp),n=RegExp.prototype,o=new WeakMap;function i(e,t,n){var i=r.call(this,e,t);return o.set(i,n||o.get(e)),i}function c(e,t){var r=o.get(t);return Object.keys(r).reduce((function(t,n){return t[n]=e[r[n]],t}),Object.create(null))}return le(i,r),i.prototype.exec=function(e){var t=n.exec.call(this,e);return t&&(t.groups=c(t,this)),t},i.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var r=o.get(this);return n[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+r[t]})))}if("function"==typeof t){var i=this;return n[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!=typeof e[e.length-1]&&e.push(c(e,i)),t.apply(this,e)}))}return n[Symbol.replace].call(this,e,t)},pe.apply(this,arguments)}function le(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&be(e,t)}function fe(e){var t="function"==typeof Map?new Map:void 0;return(fe=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return he(e,arguments,ge(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),be(n,e)})(e)}function he(e,t,r){return(he=ye()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&be(o,r.prototype),o}).apply(null,arguments)}function ye(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function be(e,t){return(be=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ge(e){return(ge=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function me(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Oe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?me(Object(r),!0).forEach((function(t){de(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):me(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function de(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class ve extends ae{constructor(e){super(Oe(Oe({},e),{},{dateFormat:"DD/MMM/YYYY:HH:mm:ss ZZ",regex:pe(/^([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+) [\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+ .*\[([0-9]{2}\/(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\/[0-9]{4}:[0-9]{2}:[0-9]{2}:[0-9]{2} [\+\x2D\|][0-9]{4})\] (.*)/gm,{client:1,datetime:2,message:15})}))}}function we(e,t){we=function(e,t){return new i(e,void 0,t)};var r=xe(RegExp),n=RegExp.prototype,o=new WeakMap;function i(e,t,n){var i=r.call(this,e,t);return o.set(i,n||o.get(e)),i}function c(e,t){var r=o.get(t);return Object.keys(r).reduce((function(t,n){return t[n]=e[r[n]],t}),Object.create(null))}return je(i,r),i.prototype.exec=function(e){var t=n.exec.call(this,e);return t&&(t.groups=c(t,this)),t},i.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var r=o.get(this);return n[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+r[t]})))}if("function"==typeof t){var i=this;return n[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!=typeof e[e.length-1]&&e.push(c(e,i)),t.apply(this,e)}))}return n[Symbol.replace].call(this,e,t)},we.apply(this,arguments)}function je(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Se(e,t)}function xe(e){var t="function"==typeof Map?new Map:void 0;return(xe=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return Pe(e,arguments,Ee(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),Se(n,e)})(e)}function Pe(e,t,r){return(Pe=Fe()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&Se(o,r.prototype),o}).apply(null,arguments)}function Fe(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function Se(e,t){return(Se=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Ee(e){return(Ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function De(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _e(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?De(Object(r),!0).forEach((function(t){Re(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):De(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Re(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class Me extends ae{constructor(e){super(_e(_e({},e),{},{dateFormat:"ddd MMM DD HH:mm:ss.SSSSSS YYYY",regex:we(/\[(((Mon|Tue(s)?|Wed(nes)?|Thu(rs|r)?|Fri|Sat(ur)?|Sun)(day)?) (Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?) [0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6} [0-9]{4})\] (.*)/gm,{datetime:1,message:21})}))}}function qe(e,t){qe=function(e,t){return new i(e,void 0,t)};var r=Te(RegExp),n=RegExp.prototype,o=new WeakMap;function i(e,t,n){var i=r.call(this,e,t);return o.set(i,n||o.get(e)),i}function c(e,t){var r=o.get(t);return Object.keys(r).reduce((function(t,n){return t[n]=e[r[n]],t}),Object.create(null))}return ke(i,r),i.prototype.exec=function(e){var t=n.exec.call(this,e);return t&&(t.groups=c(t,this)),t},i.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var r=o.get(this);return n[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+r[t]})))}if("function"==typeof t){var i=this;return n[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!=typeof e[e.length-1]&&e.push(c(e,i)),t.apply(this,e)}))}return n[Symbol.replace].call(this,e,t)},qe.apply(this,arguments)}function ke(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ze(e,t)}function Te(e){var t="function"==typeof Map?new Map:void 0;return(Te=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return $e(e,arguments,We(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),ze(n,e)})(e)}function $e(e,t,r){return($e=Ye()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&ze(o,r.prototype),o}).apply(null,arguments)}function Ye(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function ze(e,t){return(ze=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function We(e){return(We=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Ae(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Je(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ae(Object(r),!0).forEach((function(t){Be(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ae(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Be(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Ne(e,t){Ne=function(e,t){return new i(e,void 0,t)};var r=Ze(RegExp),n=RegExp.prototype,o=new WeakMap;function i(e,t,n){var i=r.call(this,e,t);return o.set(i,n||o.get(e)),i}function c(e,t){var r=o.get(t);return Object.keys(r).reduce((function(t,n){return t[n]=e[r[n]],t}),Object.create(null))}return He(i,r),i.prototype.exec=function(e){var t=n.exec.call(this,e);return t&&(t.groups=c(t,this)),t},i.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var r=o.get(this);return n[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+r[t]})))}if("function"==typeof t){var i=this;return n[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!=typeof e[e.length-1]&&e.push(c(e,i)),t.apply(this,e)}))}return n[Symbol.replace].call(this,e,t)},Ne.apply(this,arguments)}function He(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Le(e,t)}function Ze(e){var t="function"==typeof Map?new Map:void 0;return(Ze=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return Ie(e,arguments,Ke(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),Le(n,e)})(e)}function Ie(e,t,r){return(Ie=Ue()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&Le(o,r.prototype),o}).apply(null,arguments)}function Ue(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function Le(e,t){return(Le=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Ke(e){return(Ke=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Ce(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ve(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ce(Object(r),!0).forEach((function(t){Xe(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ce(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Xe(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class Ge extends ae{constructor(e){super(Ve(Ve({},e),{},{dateFormat:"YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]",regex:Ne(/^([0-9]{4}\x2D[0-9]{2}\x2D[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}Z) (.*)/gm,{datetime:1,message:2})}))}}function Qe(e,t){Qe=function(e,t){return new i(e,void 0,t)};var r=tt(RegExp),n=RegExp.prototype,o=new WeakMap;function i(e,t,n){var i=r.call(this,e,t);return o.set(i,n||o.get(e)),i}function c(e,t){var r=o.get(t);return Object.keys(r).reduce((function(t,n){return t[n]=e[r[n]],t}),Object.create(null))}return et(i,r),i.prototype.exec=function(e){var t=n.exec.call(this,e);return t&&(t.groups=c(t,this)),t},i.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var r=o.get(this);return n[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+r[t]})))}if("function"==typeof t){var i=this;return n[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!=typeof e[e.length-1]&&e.push(c(e,i)),t.apply(this,e)}))}return n[Symbol.replace].call(this,e,t)},Qe.apply(this,arguments)}function et(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ot(e,t)}function tt(e){var t="function"==typeof Map?new Map:void 0;return(tt=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return rt(e,arguments,it(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),ot(n,e)})(e)}function rt(e,t,r){return(rt=nt()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&ot(o,r.prototype),o}).apply(null,arguments)}function nt(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function ot(e,t){return(ot=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function it(e){return(it=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ct(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ut(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ct(Object(r),!0).forEach((function(t){st(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ct(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function st(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class at extends ae{constructor(e){super(ut(ut({},e),{},{dateFormat:"DD/MMM/YYYY:HH:mm:ss ZZ",regex:Qe(/^([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+) [\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+ .*\[([0-9]{2}\/(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\/[0-9]{4}:[0-9]{2}:[0-9]{2}:[0-9]{2} [\+\x2D\|][0-9]{4})\] (.*)/gm,{client:1,datetime:2,message:15})}))}}function pt(e,t){pt=function(e,t){return new i(e,void 0,t)};var r=ft(RegExp),n=RegExp.prototype,o=new WeakMap;function i(e,t,n){var i=r.call(this,e,t);return o.set(i,n||o.get(e)),i}function c(e,t){var r=o.get(t);return Object.keys(r).reduce((function(t,n){return t[n]=e[r[n]],t}),Object.create(null))}return lt(i,r),i.prototype.exec=function(e){var t=n.exec.call(this,e);return t&&(t.groups=c(t,this)),t},i.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var r=o.get(this);return n[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+r[t]})))}if("function"==typeof t){var i=this;return n[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!=typeof e[e.length-1]&&e.push(c(e,i)),t.apply(this,e)}))}return n[Symbol.replace].call(this,e,t)},pt.apply(this,arguments)}function lt(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&bt(e,t)}function ft(e){var t="function"==typeof Map?new Map:void 0;return(ft=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return ht(e,arguments,gt(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),bt(n,e)})(e)}function ht(e,t,r){return(ht=yt()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&bt(o,r.prototype),o}).apply(null,arguments)}function yt(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function bt(e,t){return(bt=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function gt(e){return(gt=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function mt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ot(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?mt(Object(r),!0).forEach((function(t){dt(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):mt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function dt(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class vt extends ae{constructor(e){super(Ot(Ot({},e),{},{dateFormat:"YYYY/MM/DD HH:mm:ss",regex:pt(/^([0-9]{4}\/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}) \[([0-9A-Z_a-z]+)\] ([0-9]+).([0-9]+): (.*)/gm,{datetime:1,log_level:2,pid:3,tid:4,message:5})}))}}function wt(e,t){wt=function(e,t){return new i(e,void 0,t)};var r=xt(RegExp),n=RegExp.prototype,o=new WeakMap;function i(e,t,n){var i=r.call(this,e,t);return o.set(i,n||o.get(e)),i}function c(e,t){var r=o.get(t);return Object.keys(r).reduce((function(t,n){return t[n]=e[r[n]],t}),Object.create(null))}return jt(i,r),i.prototype.exec=function(e){var t=n.exec.call(this,e);return t&&(t.groups=c(t,this)),t},i.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var r=o.get(this);return n[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+r[t]})))}if("function"==typeof t){var i=this;return n[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!=typeof e[e.length-1]&&e.push(c(e,i)),t.apply(this,e)}))}return n[Symbol.replace].call(this,e,t)},wt.apply(this,arguments)}function jt(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&St(e,t)}function xt(e){var t="function"==typeof Map?new Map:void 0;return(xt=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return Pt(e,arguments,Et(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),St(n,e)})(e)}function Pt(e,t,r){return(Pt=Ft()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&St(o,r.prototype),o}).apply(null,arguments)}function Ft(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function St(e,t){return(St=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Et(e){return(Et=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Dt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _t(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Dt(Object(r),!0).forEach((function(t){Rt(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Dt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Rt(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Mt(e,t){Mt=function(e,t){return new i(e,void 0,t)};var r=kt(RegExp),n=RegExp.prototype,o=new WeakMap;function i(e,t,n){var i=r.call(this,e,t);return o.set(i,n||o.get(e)),i}function c(e,t){var r=o.get(t);return Object.keys(r).reduce((function(t,n){return t[n]=e[r[n]],t}),Object.create(null))}return qt(i,r),i.prototype.exec=function(e){var t=n.exec.call(this,e);return t&&(t.groups=c(t,this)),t},i.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var r=o.get(this);return n[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+r[t]})))}if("function"==typeof t){var i=this;return n[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!=typeof e[e.length-1]&&e.push(c(e,i)),t.apply(this,e)}))}return n[Symbol.replace].call(this,e,t)},Mt.apply(this,arguments)}function qt(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Yt(e,t)}function kt(e){var t="function"==typeof Map?new Map:void 0;return(kt=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return Tt(e,arguments,zt(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),Yt(n,e)})(e)}function Tt(e,t,r){return(Tt=$t()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&Yt(o,r.prototype),o}).apply(null,arguments)}function $t(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function Yt(e,t){return(Yt=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function zt(e){return(zt=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Wt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function At(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Wt(Object(r),!0).forEach((function(t){Jt(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Wt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Jt(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Bt={apache2:class{constructor(e){const{eventType:t}=e;return"http"===t?new ve(e):new Me(e)}},monolog:class extends ae{constructor(e){super(Je(Je({},e),{},{dateFormat:"YYYY-MM-DD HH:mm:ss",regex:qe(/^\[(.*)\] (.+?)\.([A-Z]+): ((?:[\0-\t\x0B-\uFFFF][\n ]?)+)$/gm,{datetime:1,channel:2,severity:3,message:4})}))}},mysql:class{constructor(e){const{eventType:t}=e;if("error"===t)return new Ge(e)}},nginx:class{constructor(e){const{eventType:t}=e;return"http"===t?new at(e):new vt(e)}},phpfpm:class extends ae{constructor(e){super(_t(_t({},e),{},{dateFormat:"DD-MMM-YYYY HH:mm:ss",regex:wt(/\[([\0-\\\^-\uFFFF]+)\].* ([A-Z]+:) (.*)/gm,{datetime:1,log_level:2,message:3})}))}},redis:class extends ae{constructor(e){super(At(At({},e),{},{dateFormat:"DD MMM YYYY HH:mm:ss.SSS",regex:Mt(/^([0-9]+:[A-Z]) ([0-9]{2} (Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?) [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}) (.*)/gm,{pid:1,datetime:2,message:15})}))}}};const Nt=r(10);class Ht extends Nt{constructor(e){super();const{hostname:t,files:r,chunks:n}=e;this.watcher=[],this.buffer=[];const o=Number(n)||1;this.config=r.forEach(e=>{const{metric:r,file:n,eventType:i,timezone:c,dateFormat:u,regex:s,fromBeginning:a}=e;if(!Object.keys(Bt).includes(r))return;const p=new Bt[r]({hostname:t,payload:o,metric:r,eventType:i,timezone:c,dateFormat:u,regex:s}),l=new te.Tail(n,{flushAtEOF:!0,fromBeginning:a});l.on("line",e=>{p.onBuffer(e,this.read.bind(this))}),l.on("error",e=>{this.emit("error",e)}),this.watcher.push(l)})}read(e){this.emit("buffer",e)}unwatch(){return new Promise((e,t)=>{try{this.watcher.forEach((e,t)=>{e.unwatch(),this.watcher.splice(t,1)}),e()}catch(e){t(e)}})}}function Zt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function It(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}c.a.normalize(process.execPath+"/../../lib/node_modules/@sherlog/cli");const Ut=JSON.parse(o.a.readFileSync("package.json","utf8")),Lt=new G.Readable({highWaterMark:1e5,objectMode:!0,encoding:"utf8"});Lt._read=()=>{};const Kt=e=>{process.on("warning",e=>{console.warn(e.stack),process.exit(1)});const t=k()(),r=z.a.createServer(t);t.use(D()()),t.use(S()()),t.use(R()()),t.use(P.a.json()),t.use(P.a.urlencoded({extended:!1}));o.a.existsSync("public")||(console.log("Unable to locate your global node_modules path"),process.exit(1)),t.use(k.a.static("public")),t.get("/ready",(e,t)=>{t.send("UP")}),t.use((e,t,r,n)=>{console.error(e.stack),n(e)}),j.a.getPortPromise().then(t=>{const n=e.port||t;r.listen(n,async()=>{const t=new $.a.Server({server:r}),o=e.backpressure?Number(e.backpressure):1e3,i=void 0===e.compression||Boolean(e.compression);ee()(!0);const c="http://localhost:"+n;console.log("Sherlog listening on:"),console.log("\n"),console.log("   - Dashboard:   "+C.a.green(c)),console.log("   - Websocket:   "+C.a.green("ws://localhost:"+n));const u=new Ht(e);u.on("buffer",e=>{Lt.push(((e,t)=>t?X.a.deflate(JSON.stringify(e),{to:"string"}):JSON.stringify(e))(e,i))});const s=f()(()=>{if(v()(t.clients)){const e=Lt.read();e&&t.clients.forEach(t=>{t.readyState===$.a.OPEN&&t.send(e)}),Lt.pause(),s()}},o,{maxWait:2e3});Lt.on("readable",s),u.on("error",e=>{console.error("ERROR: ",e)}),t.on("connection",async()=>{Lt.emit("readable")}),setTimeout(async()=>{e.browser&&await L()(c)},500)})})},Ct=o.a.existsSync(process.cwd()+"/.sherlog"),Vt=JSON.stringify(s()(M,{hostname:A.a.hostname()}),null,2),Xt=e=>{e.config&&!o.a.existsSync(e.config)&&(console.log("invalid config file path "+C.a.yellow(e.config)),process.exit(1)),Ct||e.config||(console.log(C.a.yellow(".sherlog")+" not found. run the init command to initialize the current working directory"),process.exit(1));const t=o.a.readFileSync(e.config||".sherlog","utf8");(e=>{try{return JSON.parse(e),!0}catch(e){return!1}})(t)||(console.log("your config file has an invalid JSON syntax"),process.exit(1));const r=(e=>{const t=new H.a({allErrors:!0}),r={type:"object",properties:{hostname:{type:"string",minimum:1},backpressure:{type:"number",minimum:0},chunks:{type:"number",minimum:1},env:{type:"string",minLength:1},compression:{type:"boolean",enum:[!0,!1]},files:{type:"array",uniqueItems:!0,minItems:1,maxItems:50,items:{type:"object",properties:{metric:{type:"string",enum:["apache2","nginx","phpfpm","monolog","mysql","redis"]},eventType:{type:"string",enum:["http","error"]},fromBeginning:{type:"boolean",enum:[!0,!1]},file:{type:"string",minLength:1},timezone:{type:"string",enum:I.a.tz.names()}},required:["metric","file","timezone"],if:{properties:{metric:{enum:["apache2","nginx","mysql"]}}},then:{required:["eventType"]}}}},required:["hostname","files"]},n=t.compile(r);return n(e)?[]:n.errors})(JSON.parse(t));g()(r)||(console.log((e=>p()(O()(e,e=>{if("if"!==e.keyword)return`${C.a.red("->")} ${e.dataPath} ${e.message} ${y()(e,"params.allowedValues","")}`})))(r).join(A.a.EOL)),process.exit(1))};B.a.command("init").option("-f, --force","force to overwrite .sherlog").description("initializes the project").action(e=>{!Ct||Ct&&e.force?(console.log("creating "+C.a.green(".sherlog")),o.a.writeFileSync(".sherlog",Vt),process.exit(0)):(console.log(`pass the --force option to overwrite your existing ${C.a.green(".sherlog")} config file`),process.exit(1))}),B.a.command("test").description("validate your config schema").option("-c, --config <path>","path to config file").action(e=>{Xt(e),console.log(`your ${C.a.green(e.config||".sherlog")} schema is valid!`),process.exit(0)}),B.a.command("start").description("start the server").option("-c, --config <path>","path to config file").option("-p, --port <port-number>","port number").option("--browser","open browser window").action(e=>{Xt(e);const t=JSON.parse(o.a.readFileSync(e.config||".sherlog","utf8")),r=O()(t.files,e=>new Promise((t,r)=>{o.a.access(e.file,o.a.constants.F_OK,n=>{n&&r(n.path),t(e.file)})}));Promise.all(r).then(()=>{Kt(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Zt(Object(r),!0).forEach((function(t){It(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Zt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({browser:Boolean(e.browser),port:e.port},t))}).catch(e=>{console.log("no such file "+C.a.yellow(e)),process.exit(1)})}),B.a.version(Ut.version,"-v, --version","print version"),B.a.parse(process.argv)}]);
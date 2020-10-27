#!/usr/bin/env node
!function(e){var t={};function r(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(s,i,function(t){return e[t]}.bind(null,i));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=24)}([function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("chalk")},function(e,t){e.exports=require("commander")},function(e,t){e.exports=require("os")},function(e,t){e.exports=require("moment-timezone")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("ws")},function(e,t){e.exports=require("events")},function(e,t){e.exports=require("portfinder")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("compression")},function(e){e.exports=JSON.parse('{"hostname":"","files":[{"metric":"","file":"","timezone":""}]}')},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("ajv")},function(e,t){e.exports=require("open")},function(e,t){e.exports=require("pako")},function(e,t){e.exports=require("stream")},function(e,t){e.exports=require("console-clear")},function(e,t,r){var s,i,n,o,a=function(e,t){if(!(e instanceof t))throw new Error("Bound instance method accessed before binding")};i=r(10),n=r(1),o=r(6),s=class e extends i.EventEmitter{readBlock(){var t,r;if(a(this,e),this.queue.length>=1&&(t=this.queue[0]).end>t.start)return(r=n.createReadStream(this.filename,{start:t.start,end:t.end-1,encoding:this.encoding})).on("error",e=>(this.logger&&this.logger.error("Tail error: "+e),this.emit("error",e))),r.on("end",()=>{if(this.emit("line","<<EOF>>"),this.queue.shift(),this.queue.length>0&&this.internalDispatcher.emit("next"),this.flushAtEOF&&this.buffer.length>0)return this.emit("line",this.buffer),this.buffer=""}),r.on("data",e=>{var t,r,s,i,n;if(null===this.separator)return this.emit("line",e);for(this.buffer+=e,i=this.buffer.split(this.separator),this.buffer=i.pop(),n=[],r=0,s=i.length;r<s;r++)t=i[r],n.push(this.emit("line",t));return n})}constructor(e,t={}){var r,s;if(super(e,t),this.readBlock=this.readBlock.bind(this),this.change=this.change.bind(this),this.filename=e,this.absPath=o.dirname(this.filename),({separator:this.separator=/[\r]{0,1}\n/,fsWatchOptions:this.fsWatchOptions={},follow:this.follow=!0,logger:this.logger,useWatchFile:this.useWatchFile=!1,flushAtEOF:this.flushAtEOF=!1,encoding:this.encoding="utf-8",fromBeginning:s=!1}=t),this.logger){this.logger.info("Tail starting..."),this.logger.info("filename: "+this.filename),this.logger.info("encoding: "+this.encoding);try{n.accessSync(this.filename,n.constants.F_OK)}catch(e){if("ENOENT"===(r=e).code)throw r}}this.buffer="",this.internalDispatcher=new i.EventEmitter,this.queue=[],this.isWatching=!1,this.internalDispatcher.on("next",()=>this.readBlock()),this.watch(s)}change(t){var r,s;a(this,e);try{s=n.statSync(t)}catch(e){return r=e,this.logger&&this.logger.error(`change event for ${t} failed: ${r}`),void this.emit("error",`change event for ${t} failed: ${r}`)}if(s.size<this.pos&&(this.pos=s.size),s.size>this.pos&&(this.queue.push({start:this.pos,end:s.size}),this.pos=s.size,1===this.queue.length))return this.internalDispatcher.emit("next")}watch(e){var t,r;if(!this.isWatching){this.logger&&(this.logger.info("filesystem.watch present? "+(void 0!==n.watch)),this.logger.info("useWatchFile: "+this.useWatchFile),this.logger.info("fromBeginning: "+e)),this.isWatching=!0;try{r=n.statSync(this.filename)}catch(e){return t=e,this.logger&&this.logger.error(`watch for ${this.filename} failed: ${t}`),void this.emit("error",`watch for ${this.filename} failed: ${t}`)}return this.pos=e?0:r.size,0===this.pos&&this.change(this.filename),!this.useWatchFile&&n.watch?(this.logger&&this.logger.info("watch strategy: watch"),this.watcher=n.watch(this.filename,this.fsWatchOptions,(e,t)=>this.watchEvent(e,t))):(this.logger&&this.logger.info("watch strategy: watchFile"),n.watchFile(this.filename,this.fsWatchOptions,(e,t)=>this.watchFileEvent(e,t)))}}rename(e){if(void 0===e||e!==this.filename)return this.unwatch(),this.follow?(this.filename=o.join(this.absPath,e),this.rewatchId=setTimeout(()=>this.watch(),1e3)):(this.logger&&this.logger.error(`'rename' event for ${this.filename}. File not available.`),this.emit("error",`'rename' event for ${this.filename}. File not available.`))}watchEvent(e,t){return"change"===e?this.change(this.filename):"rename"===e?this.rename(t):void 0}watchFileEvent(e,t){if(e.size>t.size&&(this.pos=e.size,this.queue.push({start:t.size,end:e.size}),1===this.queue.length))return this.internalDispatcher.emit("next")}unwatch(){if(this.watcher?this.watcher.close():n.unwatchFile(this.filename),this.rewatchId&&(clearTimeout(this.rewatchId),this.rewatchId=void 0),this.isWatching=!1,this.queue=[],this.logger)return this.logger.info("Unwatch ",this.filename)}},t.Tail=s},function(e,t){e.exports=require("string.prototype.matchall")},function(e,t,r){"use strict";r.r(t);var s=r(1),i=r.n(s),n=r(6),o=r.n(n),a=r(0),c=r(11),h=r.n(c),l=r(7),u=r.n(l),m=r(12),f=r.n(m),p=r(13),g=r.n(p),d=r(14),y=r.n(d),b=r(15),w=r(8),x=r.n(w),v=r(9),S=r.n(v),O=r(16),F=r.n(O),q=r(4),M=r.n(q),Y=r(3),j=r.n(Y),z=r(17),D=r.n(z),E=r(5),T=r.n(E),J=r(18),k=r.n(J),N=r(2),$=r.n(N),P=r(19),W=r.n(P),H=r(20),A=r(21),B=r.n(A),_=r(22),Z=r(23),I=r.n(Z);class R{constructor(e){const{dateFormat:t,hostname:r,payload:s,metric:i,regex:n,eventType:o,timezone:a}=e;this.dateFormat=t,this.hostname=r,this.payload=s,this.metric=i,this.regex=n,this.eventType=o,this.timezone=a,this.buffer=[]}tag(e,t){return{metric:this.metric,tags:{hostname:this.hostname,type:this.eventType,platform:M.a.platform()},timestamp:Number(t),values:e}}format(e){const t=[];return e.forEach(e=>{const r=T.a.tz(e.datetime,this.dateFormat,this.timezone).clone().tz("UTC");t.push(Object(a.assignIn)(e,{datetime:r.format(),timestamp:Number(r.format("X"))}))}),Object(a.map)(Object(a.groupBy)(t,"timestamp"),(e,t)=>this.tag(e,t))}dispatch(e,t){const r=Object(a.take)(this.buffer,e).join("\n"),s=[...I()(r,this.regex)];s.length&&t(this.format(Object(a.map)(s,"groups"))),this.buffer.splice(0,e)}onBuffer(e,t){if(this.buffer.length===this.payload||"<<EOF>>"===e){const e=this.buffer.length;this.dispatch(e,t)}this.buffer.push(e)}}class U extends R{constructor(e){super({...e,dateFormat:"DD/MMM/YYYY:HH:mm:ss ZZ",regex:/^(?<client>\S+) \S+ .*\[(?<datetime>\d{2}\/(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\/\d{4}:\d{2}:\d{2}:\d{2} [+|-]\d{4})] (?<message>.*)/gm})}}class K extends R{constructor(e){super({...e,dateFormat:"ddd MMM DD HH:mm:ss.SSSSSS YYYY",regex:/\[(?<datetime>((Mon|Tue(s)?|Wed(nes)?|Thu(rs|r)?|Fri|Sat(ur)?|Sun)(day)?) (Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?) \d{2} \d{2}:\d{2}:\d{2}\.\d{6} \d{4})] (?<message>.*)/gm})}}class L extends R{constructor(e){super({...e,dateFormat:"YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]",regex:/^(?<datetime>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z) (?<message>.*)/gm})}}class C extends R{constructor(e){super({...e,dateFormat:"DD/MMM/YYYY:HH:mm:ss ZZ",regex:/^(?<client>\S+) \S+ .*\[(?<datetime>\d{2}\/(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\/\d{4}:\d{2}:\d{2}:\d{2} [+|-]\d{4})] (?<message>.*)/gm})}}class V extends R{constructor(e){super({...e,dateFormat:"YYYY/MM/DD HH:mm:ss",regex:/^(?<datetime>\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) \[(?<log_level>\w+)] (?<pid>\d+).(?<tid>\d+): (?<message>.*)/gm})}}var X={apache2:class{constructor(e){const{eventType:t}=e;return"http"===t?new U(e):new K(e)}},monolog:class extends R{constructor(e){super({...e,dateFormat:"YYYY-MM-DD HH:mm:ss",regex:/^\[(?<datetime>.*)] (?<channel>.+?)\.(?<severity>[A-Z]+): (?<message>(?:[^\n][ \n]?)+)$/gm})}},mysql:class{constructor(e){const{eventType:t}=e;if("error"===t)return new L(e)}},nginx:class{constructor(e){const{eventType:t}=e;return"http"===t?new C(e):new V(e)}},phpfpm:class extends R{constructor(e){super({...e,dateFormat:"DD-MMM-YYYY HH:mm:ss",regex:/\[(?<datetime>[^\]]+)].* (?<log_level>[A-Z]+:) (?<message>.*)/gm})}},redis:class extends R{constructor(e){super({...e,dateFormat:"DD MMM YYYY HH:mm:ss.SSS",regex:/^(?<pid>\d+:[A-Z]) (?<datetime>\d{2} (Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?) \d{4} \d{2}:\d{2}:\d{2}\.\d{3}) (?<message>.*)/gm})}}};const G=r(10);class Q extends G{constructor(e){super();const{hostname:t,files:r,chunks:s}=e;this.watcher=[],this.buffer=[];const i=Number(s)||1;this.config=r.forEach(e=>{const{metric:r,file:s,eventType:n,timezone:o,dateFormat:a,regex:c,fromBeginning:h}=e;if(!Object.keys(X).includes(r))return;const l=new X[r]({hostname:t,payload:i,metric:r,eventType:n,timezone:o,dateFormat:a,regex:c}),u=new _.Tail(s,{flushAtEOF:!0,fromBeginning:h});u.on("line",e=>{l.onBuffer(e,this.read.bind(this))}),u.on("error",e=>{this.emit("error",e)}),this.watcher.push(u)})}read(e){this.emit("buffer",e)}unwatch(){return new Promise((e,t)=>{try{this.watcher.forEach((e,t)=>{e.unwatch(),this.watcher.splice(t,1)}),e()}catch(e){t(e)}})}}const ee=o.a.normalize(process.execPath+"/../../lib/node_modules/@sherlog/cli"),te=JSON.parse(i.a.readFileSync(ee+"/package.json","utf8")),re=new H.Readable({highWaterMark:1e5,objectMode:!0,encoding:"utf8"});re._read=()=>{};const se=e=>{process.on("warning",e=>{console.warn(e.stack),process.exit(1)});const t=x()(),r=F.a.createServer(t);t.use(g()({contentSecurityPolicy:!1})),t.use(f()()),t.use(y()()),t.use(u.a.json()),t.use(u.a.urlencoded({extended:!1}));const s=ee+"/public";i.a.existsSync(s)||(console.log("Unable to locate your global node_modules path"),process.exit(1)),t.use(x.a.static(s)),t.get("/ready",(e,t)=>{t.send("UP")}),t.use((e,t,r,s)=>{console.error(e.stack),s(e)}),h.a.getPortPromise().then(t=>{const s=e.port||t;r.listen(s,async()=>{const t=new S.a.Server({server:r}),i=e.backpressure?Number(e.backpressure):1e3,n=void 0===e.compression||Boolean(e.compression);B()(!0);const o="http://localhost:"+s;console.log("Sherlog listening on:"),console.log("\n"),console.log("   - Dashboard:   "+$.a.green(o)),console.log("   - Websocket:   "+$.a.green("ws://localhost:"+s));const c=new Q(e);c.on("buffer",e=>{re.push(((e,t)=>t?W.a.deflate(JSON.stringify(e),{to:"string"}):JSON.stringify(e))(e,n))});const h=Object(a.debounce)(()=>{if(Object(a.size)(t.clients)){const e=re.read();e&&t.clients.forEach(t=>{t.readyState===S.a.OPEN&&t.send(e)}),re.pause(),h()}},i,{maxWait:2e3});re.on("readable",h),c.on("error",e=>{console.error("ERROR: ",e)}),t.on("connection",async()=>{re.emit("readable")}),setTimeout(async()=>{e.browser&&await k()(o)},500)})})},ie=i.a.existsSync(process.cwd()+"/.sherlog"),ne=JSON.stringify(Object(a.assign)(b,{hostname:M.a.hostname()}),null,2),oe=e=>{e.config&&!i.a.existsSync(e.config)&&(console.log("invalid config file path "+$.a.yellow(e.config)),process.exit(1)),ie||e.config||(console.log($.a.yellow(".sherlog")+" not found. run the init command to initialize the current working directory"),process.exit(1));const t=i.a.readFileSync(e.config||".sherlog","utf8");(e=>{try{return JSON.parse(e),!0}catch(e){return!1}})(t)||(console.log("your config file has an invalid JSON syntax"),process.exit(1));const r=(e=>{const t=new D.a({allErrors:!0}),r={type:"object",properties:{hostname:{type:"string",minimum:1},backpressure:{type:"number",minimum:0},chunks:{type:"number",minimum:1},env:{type:"string",minLength:1},compression:{type:"boolean",enum:[!0,!1]},files:{type:"array",uniqueItems:!0,minItems:1,maxItems:50,items:{type:"object",properties:{metric:{type:"string",enum:["apache2","nginx","phpfpm","monolog","mysql","redis"]},eventType:{type:"string",enum:["http","error"]},fromBeginning:{type:"boolean",enum:[!0,!1]},file:{type:"string",minLength:1},timezone:{type:"string",enum:T.a.tz.names()}},required:["metric","file","timezone"],if:{properties:{metric:{enum:["apache2","nginx","mysql"]}}},then:{required:["eventType"]}}}},required:["hostname","files"]},s=t.compile(r);return s(e)?[]:s.errors})(JSON.parse(t));Object(a.isEmpty)(r)||(console.log((e=>Object(a.compact)(Object(a.map)(e,e=>{if("if"!==e.keyword)return`${$.a.red("->")} ${e.dataPath} ${e.message} ${Object(a.get)(e,"params.allowedValues","")}`})))(r).join(M.a.EOL)),process.exit(1))};j.a.command("init").option("-f, --force","force to overwrite .sherlog").description("initializes the project").action(e=>{!ie||ie&&e.force?(console.log("creating "+$.a.green(".sherlog")),i.a.writeFileSync(".sherlog",ne),process.exit(0)):(console.log(`pass the --force option to overwrite your existing ${$.a.green(".sherlog")} config file`),process.exit(1))}),j.a.command("test").description("validate your config schema").option("-c, --config <path>","path to config file").action(e=>{oe(e),console.log(`your ${$.a.green(e.config||".sherlog")} schema is valid!`),process.exit(0)}),j.a.command("start").description("start the server").option("-c, --config <path>","path to config file").option("-p, --port <port-number>","port number").option("--browser","open browser window").action(e=>{oe(e);const t=JSON.parse(i.a.readFileSync(e.config||".sherlog","utf8")),r=Object(a.map)(t.files,e=>new Promise((t,r)=>{i.a.access(e.file,i.a.constants.F_OK|i.a.constants.R_OK,s=>{s&&r(s),t(e.file)})}));Promise.all(r).then(()=>{se({browser:Boolean(e.browser),port:e.port,...t})}).catch(e=>{const t=-2===e.errno?"no such file":"permission denied";console.log(`${t} ${$.a.yellow(e.path)}`),process.exit(1)})}),j.a.version(te.version,"-v, --version","print version"),j.a.parse(process.argv)}]);
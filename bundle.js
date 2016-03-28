(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function styleColor(e){var r=e.convert("rgb"),o=["rgb(",Math.round(r.red)+",",Math.round(r.green)+",",Math.round(r.blue),")"].join("");document.body.style.backgroundColor=o}var vdom=require("virtual-dom"),h=require("virtual-dom/h"),loop=require("virtual-raf"),view=require("tcomb-view"),Color=require("../"),tree,props={type:Color,value:Color({type:"rgb",red:0,green:0,blue:0}),onUpdate:function(e){console.log("value",e);var r=props.value;e.type!==r.type&&(e=r.convert(e.type)),tree.update(Object.assign(props,{value:e})),styleColor(e)}};tree=loop(props,view(h),vdom),document.querySelector("main").appendChild(tree.render());

},{"../":2,"tcomb-view":228,"virtual-dom":202,"virtual-dom/h":201,"virtual-raf":226}],2:[function(require,module,exports){
"use strict";function getColorAlias(r){return null!=r.alias?r.alias[0]:r.name}var t=require("tcomb"),refineNumberInRange=require("t-range"),colors=require("color-space"),mapValues=require("lodash/mapValues"),values=require("lodash/values"),fromPairs=require("lodash/fromPairs"),STEP=.01,BaseColor=t.struct({type:t.maybe(t.enums(mapValues(colors,getColorAlias)))},"BaseColor"),colorTypesById=mapValues(colors,function(r,o){var e=getColorAlias(r,o),a=fromPairs(r.channel.map(function(o,e){return[o,refineNumberInRange({min:r.min[e],max:r.max[e],step:STEP})]})),n=BaseColor.extend(a,e);return n.prototype.toArray=function(){var o=this,e=new Array(r.channel.length);return r.channel.forEach(function(r,a){e[a]=o[r]},this),e},n.fromArray=function(e){var a={type:o};return r.channel.forEach(function(r,o){a[r]=e[o]},this),Color(a)},n.prototype.convert=function(o){var e=r[o](this.toArray()),a=colorTypesById[o];return a.fromArray(e)},n}),Color=t.union(values(colorTypesById),"Color");Color.dispatch=function(r){return null==r||null==r.type?BaseColor:colorTypesById[r.type]},module.exports=Color,module.exports.colorTypesById=colorTypesById;

},{"color-space":17,"lodash/fromPairs":119,"lodash/mapValues":137,"lodash/values":141,"t-range":148,"tcomb":149}],3:[function(require,module,exports){
function replacer(t,e){return util.isUndefined(e)?""+e:util.isNumber(e)&&!isFinite(e)?e.toString():util.isFunction(e)||util.isRegExp(e)?e.toString():e}function truncate(t,e){return util.isString(t)?t.length<e?t:t.slice(0,e):t}function getMessage(t){return truncate(JSON.stringify(t.actual,replacer),128)+" "+t.operator+" "+truncate(JSON.stringify(t.expected,replacer),128)}function fail(t,e,r,i,s){throw new assert.AssertionError({message:r,actual:t,expected:e,operator:i,stackStartFunction:s})}function ok(t,e){t||fail(t,!0,e,"==",assert.ok)}function _deepEqual(t,e){if(t===e)return!0;if(util.isBuffer(t)&&util.isBuffer(e)){if(t.length!=e.length)return!1;for(var r=0;r<t.length;r++)if(t[r]!==e[r])return!1;return!0}return util.isDate(t)&&util.isDate(e)?t.getTime()===e.getTime():util.isRegExp(t)&&util.isRegExp(e)?t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase:util.isObject(t)||util.isObject(e)?objEquiv(t,e):t==e}function isArguments(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function objEquiv(t,e){if(util.isNullOrUndefined(t)||util.isNullOrUndefined(e))return!1;if(t.prototype!==e.prototype)return!1;if(util.isPrimitive(t)||util.isPrimitive(e))return t===e;var r=isArguments(t),i=isArguments(e);if(r&&!i||!r&&i)return!1;if(r)return t=pSlice.call(t),e=pSlice.call(e),_deepEqual(t,e);var s,n,a=objectKeys(t),o=objectKeys(e);if(a.length!=o.length)return!1;for(a.sort(),o.sort(),n=a.length-1;n>=0;n--)if(a[n]!=o[n])return!1;for(n=a.length-1;n>=0;n--)if(s=a[n],!_deepEqual(t[s],e[s]))return!1;return!0}function expectedException(t,e){return t&&e?"[object RegExp]"==Object.prototype.toString.call(e)?e.test(t):t instanceof e?!0:e.call({},t)===!0:!1}function _throws(t,e,r,i){var s;util.isString(r)&&(i=r,r=null);try{e()}catch(n){s=n}if(i=(r&&r.name?" ("+r.name+").":".")+(i?" "+i:"."),t&&!s&&fail(s,r,"Missing expected exception"+i),!t&&expectedException(s,r)&&fail(s,r,"Got unwanted exception"+i),t&&s&&r&&!expectedException(s,r)||!t&&s)throw s}var util=require("util/"),pSlice=Array.prototype.slice,hasOwn=Object.prototype.hasOwnProperty,assert=module.exports=ok;assert.AssertionError=function(t){this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=getMessage(this),this.generatedMessage=!0);var e=t.stackStartFunction||fail;if(Error.captureStackTrace)Error.captureStackTrace(this,e);else{var r=new Error;if(r.stack){var i=r.stack,s=e.name,n=i.indexOf("\n"+s);if(n>=0){var a=i.indexOf("\n",n+1);i=i.substring(a+1)}this.stack=i}}},util.inherits(assert.AssertionError,Error),assert.fail=fail,assert.ok=ok,assert.equal=function(t,e,r){t!=e&&fail(t,e,r,"==",assert.equal)},assert.notEqual=function(t,e,r){t==e&&fail(t,e,r,"!=",assert.notEqual)},assert.deepEqual=function(t,e,r){_deepEqual(t,e)||fail(t,e,r,"deepEqual",assert.deepEqual)},assert.notDeepEqual=function(t,e,r){_deepEqual(t,e)&&fail(t,e,r,"notDeepEqual",assert.notDeepEqual)},assert.strictEqual=function(t,e,r){t!==e&&fail(t,e,r,"===",assert.strictEqual)},assert.notStrictEqual=function(t,e,r){t===e&&fail(t,e,r,"!==",assert.notStrictEqual)},assert["throws"]=function(t,e,r){_throws.apply(this,[!0].concat(pSlice.call(arguments)))},assert.doesNotThrow=function(t,e){_throws.apply(this,[!1].concat(pSlice.call(arguments)))},assert.ifError=function(t){if(t)throw t};var objectKeys=Object.keys||function(t){var e=[];for(var r in t)hasOwn.call(t,r)&&e.push(r);return e};

},{"util/":198}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
module.exports=function(e){var t,n=String.prototype.split,l=/()??/.exec("")[1]===e;return t=function(t,r,i){if("[object RegExp]"!==Object.prototype.toString.call(r))return n.call(t,r,i);var o,p,s,c,g=[],u=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.extended?"x":"")+(r.sticky?"y":""),x=0,r=new RegExp(r.source,u+"g");for(t+="",l||(o=new RegExp("^"+r.source+"$(?!\\s)",u)),i=i===e?-1>>>0:i>>>0;(p=r.exec(t))&&(s=p.index+p[0].length,!(s>x&&(g.push(t.slice(x,p.index)),!l&&p.length>1&&p[0].replace(o,function(){for(var t=1;t<arguments.length-2;t++)arguments[t]===e&&(p[t]=e)}),p.length>1&&p.index<t.length&&Array.prototype.push.apply(g,p.slice(1)),c=p[0].length,x=s,g.length>=i)));)r.lastIndex===p.index&&r.lastIndex++;return x===t.length?!c&&r.test("")||g.push(""):g.push(t.slice(x)),g.length>i?g.slice(0,i):g}}();

},{}],6:[function(require,module,exports){
var rgb=require("./rgb"),cmy=module.exports={name:"cmy",min:[0,0,0],max:[100,100,100],channel:["cyan","magenta","yellow"],alias:["CMY"]};cmy.rgb=function(r){var n=r[0]/100,a=r[1]/100,e=r[2]/100;return[255*(1-n),255*(1-a),255*(1-e)]},rgb.cmy=function(r){var n=r[0]/255,a=r[1]/255,e=r[2]/255;return[100*(1-n)||0,100*(1-a)||0,100*(1-e)||0]};

},{"./rgb":26}],7:[function(require,module,exports){
var rgb=require("./rgb");module.exports={name:"cmyk",min:[0,0,0,0],max:[100,100,100,100],channel:["cyan","magenta","yellow","black"],alias:["CMYK"],rgb:function(a){var n,r,m,e=a[0]/100,t=a[1]/100,i=a[2]/100,c=a[3]/100;return n=1-Math.min(1,e*(1-c)+c),r=1-Math.min(1,t*(1-c)+c),m=1-Math.min(1,i*(1-c)+c),[255*n,255*r,255*m]}},rgb.cmyk=function(a){var n,r,m,e,t=a[0]/255,i=a[1]/255,c=a[2]/255;return e=Math.min(1-t,1-i,1-c),n=(1-t-e)/(1-e)||0,r=(1-i-e)/(1-e)||0,m=(1-c-e)/(1-e)||0,[100*n,100*r,100*m,100*e]};

},{"./rgb":26}],8:[function(require,module,exports){
var xyy=require("./xyy"),xyz=require("./xyz"),coloroid={name:"coloroid",alias:["ATV"],channel:["A","T","V"],min:[10,0,0],max:[76,100,100]};coloroid.table=[[10,59,1.724349,.44987,.53641],[11,55.3,1.740844,.46248,.52444],[12,51.7,1.754985,.47451,.51298],[13,48.2,1.767087,.48601,.50325],[14,44.8,1.775953,.49578,.49052],[15,41.5,1.785073,.5079,.43035],[16,38.2,1.791104,.51874,.46934],[20,34.9,1.794831,.5298,.45783],[21,31.5,1.798664,.54137,.44559],[22,28,1.794819,.55367,.43253],[23,24.4,1.78961,.5668,.41811],[24,20.6,1.809483,.58128,.40176],[25,16.6,1.760983,.59766,.383],[26,12.3,1.723443,.61653,.36061],[30,7.7,1.652891,.63896,.33358],[31,2.8,1.502607,.66619,.2993],[32,-2.5,1.0725,.70061,.26753],[33,-8.4,1.136637,.63925,.22631],[34,-19.8,1.232286,.53962,.19721],[35,-31.6,1.31012,.5034,.17495],[40,-43.2,1.37661,.46041,.15603],[41,-54.6,1.438692,.42386,.13846],[42,-65.8,1.501582,.38991,.12083],[43,-76.8,1.570447,.35586,.10328],[44,-86.8,1.645583,.32195,.08496],[45,-95.8,1.732083,.28657,.05155],[46,-108.4,1.915753,.22202,.01771],[50,-117.2,2.14631,.15664,.05227],[51,-124.7,1.649939,.12736,.0902],[52,-131.8,1.273415,.10813,.12506],[53,-138.5,1.080809,.09414,.15741],[54,-145.1,.957076,.03249,.18958],[55,-152,.868976,.07206,.24109],[56,-163.4,.771731,.05787,.30378],[60,-177.2,.697108,.04353,.35696],[61,171.6,.655803,.03291,.41971],[62,152.4,.623958,.0224,.49954],[63,148.4,.596037,.01196,.60321],[64,136.8,.607413,.00425,.73542],[65,125.4,.659923,.01099,.83391],[66,114.2,.859517,.0805,.77474],[70,103.2,1.195683,.20259,.7046],[71,93.2,1.407534,.28807,.6523],[72,84.2,1.532829,.34422,.6193],[73,77.3,1.603792,.37838,.59533],[74,71.6,1.649448,.4029,.57716],[75,66.9,1.68108,.42141,.56222],[76,62.8,1.704979,.43647,.54895]];var table=coloroid.table,angleTable=[].concat(table.slice(-13),table.slice(0,-13)),i="D65",o=2,Xn=xyz.whitepoint[o][i][0],Yn=xyz.whitepoint[o][i][1],Zn=xyz.whitepoint[o][i][2],y0=Xn/(Xn+Yn+Zn),x0=Yn/(Xn+Yn+Zn),ew=(Xn+Yn+Zn)/100;xyy.coloroid=function(e){for(var o,a=e[0],n=e[1],l=e[2],r=10*Math.sqrt(l),t=180*Math.atan2(n-y0,a-x0)/Math.PI,i=angleTable.length-1,y=0;y<angleTable.length&&!(t>angleTable[y][1]);y++)i=y;o=Math.abs(angleTable[y+1][1]-t)>Math.abs(angleTable[i][1]-t)?angleTable[y+1]:angleTable[i];var x=o[0],c=o[4],b=o[2],w=o[3],d=c*b*100,h=100*l*(x0*ew-a*ew)/(100*(a*b-w*b)+d*(x0*ew-a*ew));return[x,h,r]},coloroid.xyy=function(e){for(var o,a=e[0],n=e[1],l=e[2],r=0;r<table.length;r++)if(a<=table[r][0]){o=table[r];break}var t=o[4],i=o[2],y=o[3],x=l*l/100,c=t*i*100,b=(100*x*x0*ew+100*y*i*n-c*n*x0*ew)/(100*n*i-c*n*ew+100*x*ew),w=(100*x+100*n*t*i-c*n)/(x*ew*100+100*n*i-n*c*ew);return[b,w,x]},xyz.coloroid=function(e){return xyy.coloroid(xyz.xyy(e))},coloroid.xyz=function(e){return xyy.xyz(coloroid.xyy(e))},module.exports=coloroid;

},{"./xyy":30,"./xyz":31}],9:[function(require,module,exports){
var rgb=require("./rgb"),clamp=require("mumath/clamp"),cubehelix=module.exports={name:"cubehelix",channel:["fraction"],min:[0],max:[1]},defaults=cubehelix.defaults={start:0,rotation:.5,hue:1,gamma:1};cubehelix.rgb=function(a,t){t=t||{},a.length&&(a=a[0]);var e=void 0!==t.start?t.start:defaults.start,r=void 0!==t.rotation?t.rotation:defaults.rotation,u=void 0!==t.gamma?t.gamma:defaults.gamma,i=void 0!==t.hue?t.hue:defaults.hue,o=2*Math.PI*(e/3+1+r*a);a=Math.pow(a,u);var h=i*a*(1-a)/2,l=a+h*(-.14861*Math.cos(o)+1.78277*Math.sin(o)),m=a+h*(-.29227*Math.cos(o)-.90649*Math.sin(o)),c=a+h*(1.97294*Math.cos(o));return l=clamp(l,0,1),m=clamp(m,0,1),c=clamp(c,0,1),[255*l,255*m,255*c]},rgb.cubehelix=function(a){};

},{"./rgb":26,"mumath/clamp":142}],10:[function(require,module,exports){
var rgb=require("./rgb"),hsl=require("./hsl"),hsv=require("./hsv"),hwb=require("./hwb"),mod=require("mumath/mod");module.exports={name:"hcg",min:[0,0,0],max:[360,100,100],channel:["hue","chroma","gray"],alias:["HCG","HST"],rgb:function(r){var a=r[0]/360,e=r[1]/100,n=r[2]/100;if(0===e)return[255*n,255*n,255*n];var h=6*mod(a,1),t=mod(h,1),u=[0,0,0],i=1-t;switch(Math.floor(h)){case 0:u[0]=1,u[1]=t,u[2]=0;break;case 1:u[0]=i,u[1]=1,u[2]=0;break;case 2:u[0]=0,u[1]=1,u[2]=t;break;case 3:u[0]=0,u[1]=i,u[2]=1;break;case 4:u[0]=t,u[1]=0,u[2]=1;break;default:u[0]=1,u[1]=0,u[2]=i}var c=(1-e)*n,o=[255*(e*u[0]+c),255*(e*u[1]+c),255*(e*u[2]+c)];return o},hsl:function(r){var a=r[1]/100,e=r[2]/100,n=e*(1-a)+.5*a,h=0;return 1>n&&n>0&&(h=.5>n?a/(2*n):a/(2*(1-n))),[r[0],100*h,100*n]},hsv:function(r){var a,e=r[1]/100,n=r[2]/100,h=e+n*(1-e);if(h>0){var t=e/h;a=[r[0],100*t,100*h]}else a=[r[0],0,100*h];return a},hwb:function(r){var a=r[1]/100,e=r[2]/100,n=a+e*(1-a);return[r[0],100*(n-a),100*(1-n)]}},rgb.hcg=function(r){var a,e,n=r[0]/255,h=r[1]/255,t=r[2]/255,u=Math.max(Math.max(n,h),t),i=Math.min(Math.min(n,h),t),c=u-i;return a=1>c?i/(1-c):0,c>0?(e=u===n?mod((h-t)/c,6):u===h?2+(t-n)/c:4+(n-h)/c,e/=6,e=mod(e,1)):e=0,[360*e,100*c,100*a]},hsl.hcg=function(r){var a=r[1]/100,e=r[2]/100,n=0;n=.5>e?2*a*e:2*a*(1-e);var h;if(1>n){var t=(e-.5*n)/(1-n);h=[r[0],100*n,100*t]}else h=[r[0],100*n,0];return h},hsv.hcg=function(r){var a,e=r[1]/100,n=r[2]/100,h=e*n;if(1>h){var t=(n-h)/(1-h);a=[r[0],100*h,100*t]}else a=[r[0],100*h,0];return a},hwb.hcg=function(r){var a=r[1]/100,e=r[2]/100,n=1-e,h=n-a,t=0;return 1>h&&(t=(n-h)/(1-h)),[r[0],100*h,100*t]};

},{"./hsl":12,"./hsv":13,"./hwb":16,"./rgb":26,"mumath/mod":143}],11:[function(require,module,exports){
var rgb=require("./rgb"),loop=require("mumath/mod"),clamp=require("mumath/clamp"),hsi=module.exports={name:"hsi",min:[0,0,0],max:[360,100,255],channel:["hue","saturation","intensity"],alias:["HSI"]};hsi.rgb=function(a){var t,h,o,s=loop(a[0],0,360)*Math.PI/180,r=clamp(a[1],0,100)/100,c=clamp(a[2],0,255)/255,M=Math.PI/3;return 2*M>s?(o=c*(1-r),t=c*(1+r*Math.cos(s)/Math.cos(M-s)),h=c*(1+r*(1-Math.cos(s)/Math.cos(M-s)))):4*M>s?(s-=2*M,t=c*(1-r),h=c*(1+r*Math.cos(s)/Math.cos(M-s)),o=c*(1+r*(1-Math.cos(s)/Math.cos(M-s)))):(s-=4*M,h=c*(1-r),o=c*(1+r*Math.cos(s)/Math.cos(M-s)),t=c*(1+r*(1-Math.cos(s)/Math.cos(M-s)))),[255*t,255*h,255*o]},rgb.hsi=function(a){var t=a[0]+a[1]+a[2],h=a[0]/t,o=a[1]/t,s=a[2]/t,r=Math.acos(.5*(h-o+(h-s))/Math.sqrt((h-o)*(h-o)+(h-s)*(o-s)));s>o&&(r=2*Math.PI-r);var c=1-3*Math.min(h,o,s),M=t/3;return[180*r/Math.PI,100*c,M]};

},{"./rgb":26,"mumath/clamp":142,"mumath/mod":143}],12:[function(require,module,exports){
var rgb=require("./rgb");module.exports={name:"hsl",min:[0,0,0],max:[360,100,100],channel:["hue","saturation","lightness"],alias:["HSL"],rgb:function(r){var a,n,t,e,i,u=r[0]/360,h=r[1]/100,m=r[2]/100;if(0===h)return i=255*m,[i,i,i];n=.5>m?m*(1+h):m+h-m*h,a=2*m-n,e=[0,0,0];for(var s=0;3>s;s++)t=u+1/3*-(s-1),0>t?t++:t>1&&t--,i=1>6*t?a+6*(n-a)*t:1>2*t?n:2>3*t?a+(n-a)*(2/3-t)*6:a,e[s]=255*i;return e}},rgb.hsl=function(r){var a,n,t,e=r[0]/255,i=r[1]/255,u=r[2]/255,h=Math.min(e,i,u),m=Math.max(e,i,u),s=m-h;return m===h?a=0:e===m?a=(i-u)/s:i===m?a=2+(u-e)/s:u===m&&(a=4+(e-i)/s),a=Math.min(60*a,360),0>a&&(a+=360),t=(h+m)/2,n=m===h?0:.5>=t?s/(m+h):s/(2-m-h),[a,100*n,100*t]};

},{"./rgb":26}],13:[function(require,module,exports){
var rgb=require("./rgb"),hsl=require("./hsl");module.exports={name:"hsv",min:[0,0,0],max:[360,100,100],channel:["hue","saturation","value"],alias:["HSV","HSB"],rgb:function(r){var e=r[0]/60,a=r[1]/100,n=r[2]/100,t=Math.floor(e)%6,u=e-Math.floor(e),s=255*n*(1-a),h=255*n*(1-a*u),c=255*n*(1-a*(1-u));switch(n*=255,t){case 0:return[n,c,s];case 1:return[h,n,s];case 2:return[s,n,c];case 3:return[s,h,n];case 4:return[c,s,n];case 5:return[n,s,h]}},hsl:function(r){var e,a,n=r[0],t=r[1]/100,u=r[2]/100;return a=(2-t)*u,e=t*u,e/=1>=a?a:2-a,e=e||0,a/=2,[n,100*e,100*a]}},rgb.hsv=function(r){var e,a,n,t=r[0],u=r[1],s=r[2],h=Math.min(t,u,s),c=Math.max(t,u,s),i=c-h;return a=0===c?0:i/c*100,c===h?e=0:t===c?e=(u-s)/i:u===c?e=2+(s-t)/i:s===c&&(e=4+(t-u)/i),e=Math.min(60*e,360),0>e&&(e+=360),n=c/255*1e3/10,[e,a,n]},hsl.hsv=function(r){var e,a,n=r[0],t=r[1]/100,u=r[2]/100;return u*=2,t*=1>=u?u:2-u,a=(u+t)/2,e=2*t/(u+t)||0,[n,100*e,100*a]};

},{"./hsl":12,"./rgb":26}],14:[function(require,module,exports){
var xyz=require("./xyz"),lchuv=require("./lchuv"),_husl=require("husl");module.exports={name:"husl",min:[0,0,0],max:[360,100,100],channel:["hue","saturation","lightness"],alias:["HuSL"],lchuv:_husl._conv.husl.lch,xyz:function(u){return lchuv.xyz(_husl._conv.husl.lch(u))},huslp:function(u){return _husl._conv.lch.huslp(_husl._conv.husl.lch(u))}},lchuv.husl=_husl._conv.lch.husl,xyz.husl=function(u){return _husl._conv.lch.husl(xyz.lchuv(u))};

},{"./lchuv":22,"./xyz":31,"husl":42}],15:[function(require,module,exports){
var xyz=require("./xyz"),lchuv=require("./lchuv"),_husl=require("husl");module.exports={name:"huslp",min:[0,0,0],max:[360,100,100],channel:["hue","saturation","lightness"],alias:["HuSLp"],lchuv:_husl._conv.huslp.lch,xyz:function(u){return lchuv.xyz(_husl._conv.huslp.lch(u))},husl:function(u){return _husl._conv.lch.husl(_husl._conv.huslp.lch(u))}},lchuv.huslp=_husl._conv.lch.huslp,xyz.huslp=function(u){return _husl._conv.lch.huslp(xyz.lchuv(u))};

},{"./lchuv":22,"./xyz":31,"husl":42}],16:[function(require,module,exports){
var rgb=require("./rgb"),hsv=require("./hsv"),hsl=require("./hsl"),hwb=module.exports={name:"hwb",min:[0,0,0],max:[360,100,100],channel:["hue","whiteness","blackness"],alias:["HWB"],rgb:function(r){var e,a,h,s,n,t,b,u=r[0]/360,c=r[1]/100,i=r[2]/100,l=c+i;switch(l>1&&(c/=l,i/=l),e=Math.floor(6*u),a=1-i,h=6*u-e,0!==(1&e)&&(h=1-h),s=c+h*(a-c),e){default:case 6:case 0:n=a,t=s,b=c;break;case 1:n=s,t=a,b=c;break;case 2:n=c,t=a,b=s;break;case 3:n=c,t=s,b=a;break;case 4:n=s,t=c,b=a;break;case 5:n=a,t=c,b=s}return[255*n,255*t,255*b]},hsv:function(r){var e,a,h=r[0],s=r[1],n=r[2];return s+n>=100?(e=0,a=100*s/(s+n)):(e=100-s/(1-n/100),a=100-n),[h,e,a]},hsl:function(r){return hsv.hsl(hwb.hsv(r))}};rgb.hwb=function(r){var e=r[0],a=r[1],h=r[2],s=rgb.hsl(r)[0],n=1/255*Math.min(e,Math.min(a,h));return h=1-1/255*Math.max(e,Math.max(a,h)),[s,100*n,100*h]},hsv.hwb=function(r){var e=r[0],a=r[1],h=r[2];return[e,0===h?0:h*(1-a/100),100-h]},hsl.hwb=function(r){return hsv.hwb(hsl.hsv(r))};

},{"./hsl":12,"./hsv":13,"./rgb":26}],17:[function(require,module,exports){
function getConvertor(e,r){var c=spaces[e];spaces[r];return e===r?function(e){return e}:c.xyz&&spaces.xyz[r]?function(e){return spaces.xyz[r](c.xyz(e))}:c.rgb&&spaces.rgb[r]?function(e){return spaces.rgb[r](c.rgb(e))}:void 0}var spaces={rgb:require("./rgb"),hsl:require("./hsl"),hsv:require("./hsv"),hsi:require("./hsi"),hwb:require("./hwb"),cmyk:require("./cmyk"),cmy:require("./cmy"),xyz:require("./xyz"),xyy:require("./xyy"),yiq:require("./yiq"),yuv:require("./yuv"),ydbdr:require("./ydbdr"),ycgco:require("./ycgco"),ypbpr:require("./ypbpr"),ycbcr:require("./ycbcr"),xvycc:require("./xvycc"),yccbccrc:require("./yccbccrc"),ucs:require("./ucs"),uvw:require("./uvw"),jpeg:require("./jpeg"),lab:require("./lab"),labh:require("./labh"),lms:require("./lms"),lchab:require("./lchab"),luv:require("./luv"),lchuv:require("./lchuv"),husl:require("./husl"),huslp:require("./huslp"),cubehelix:require("./cubehelix"),coloroid:require("./coloroid"),hcg:require("./hcg"),osaucs:require("./osaucs")},fromSpace,toSpace;for(var fromSpaceName in spaces){fromSpace=spaces[fromSpaceName];for(var toSpaceName in spaces)toSpace=spaces[toSpaceName],fromSpace[toSpaceName]||(fromSpace[toSpaceName]=getConvertor(fromSpaceName,toSpaceName))}module.exports=spaces;

},{"./cmy":6,"./cmyk":7,"./coloroid":8,"./cubehelix":9,"./hcg":10,"./hsi":11,"./hsl":12,"./hsv":13,"./husl":14,"./huslp":15,"./hwb":16,"./jpeg":18,"./lab":19,"./labh":20,"./lchab":21,"./lchuv":22,"./lms":23,"./luv":24,"./osaucs":25,"./rgb":26,"./ucs":27,"./uvw":28,"./xvycc":29,"./xyy":30,"./xyz":31,"./ycbcr":32,"./yccbccrc":33,"./ycgco":34,"./ydbdr":35,"./yiq":36,"./ypbpr":37,"./yuv":38}],18:[function(require,module,exports){
var rgb=require("./rgb"),jpeg=module.exports={name:"jpeg",min:[0,0,0],max:[255,255,255],channel:["Y","Cb","Cr"],alias:["JPEG"]};jpeg.rgb=function(r){var e=r[0],n=r[1],a=r[2];return[e+1.402*(a-128),e-.34414*(n-128)-.71414*(a-128),e+1.772*(n-128)]},rgb.jpeg=function(r){var e=r[0],n=r[1],a=r[2];return[.299*e+.587*n+.114*a,128-.168736*e-.331264*n+.5*a,128+.5*e-.418688*n-.081312*a]};

},{"./rgb":26}],19:[function(require,module,exports){
var xyz=require("./xyz");module.exports={name:"lab",min:[0,-100,-100],max:[100,100,100],channel:["lightness","a","b"],alias:["LAB","cielab"],xyz:function(a){var t,n,o,e,r=a[0],h=a[1],p=a[2];return 8>=r?(n=100*r/903.3,e=7.787*(n/100)+16/116):(n=100*Math.pow((r+16)/116,3),e=Math.pow(n/100,1/3)),t=.008856>=t/95.047?t=95.047*(h/500+e-16/116)/7.787:95.047*Math.pow(h/500+e,3),o=.008859>=o/108.883?o=108.883*(e-p/200-16/116)/7.787:108.883*Math.pow(e-p/200,3),[t,n,o]}},xyz.lab=function(a){var t,n,o,e=a[0],r=a[1],h=a[2];return e/=95.047,r/=100,h/=108.883,e=e>.008856?Math.pow(e,1/3):7.787*e+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,h=h>.008856?Math.pow(h,1/3):7.787*h+16/116,t=116*r-16,n=500*(e-r),o=200*(r-h),[t,n,o]};

},{"./xyz":31}],20:[function(require,module,exports){
var xyz=require("./xyz");module.exports={name:"labh",min:[0,-128,-128],max:[100,128,128],channel:["lightness","a","b"],alias:["LABh","hunter-lab","hlab"],xyz:function(a){var r=a[0],t=a[1],n=a[2],e=r/10,h=t/17.5*r/10,l=n/7*r/10,s=e*e,u=(h+s)/1.02,i=-(l-s)/.847;return[u,s,i]}},xyz.labh=function(a){var r=a[0],t=a[1],n=a[2],e=10*Math.sqrt(t),h=0===t?0:17.5*((1.02*r-t)/Math.sqrt(t)),l=0===t?0:7*((t-.847*n)/Math.sqrt(t));return[e,h,l]};

},{"./xyz":31}],21:[function(require,module,exports){
var xyz=require("./xyz"),lab=require("./lab"),lchab=module.exports={name:"lchab",min:[0,0,0],max:[100,100,360],channel:["lightness","chroma","hue"],alias:["LCHab","cielch","LCH","HLC","LSH"],xyz:function(a){return lab.xyz(lchab.lab(a))},lab:function(a){var l,n,r,t=a[0],h=a[1],b=a[2];return r=b/360*2*Math.PI,l=h*Math.cos(r),n=h*Math.sin(r),[t,l,n]}};lab.lchab=function(a){var l,n,r,t=a[0],h=a[1],b=a[2];return l=Math.atan2(b,h),n=360*l/2/Math.PI,0>n&&(n+=360),r=Math.sqrt(h*h+b*b),[t,r,n]},xyz.lchab=function(a){return lab.lchab(xyz.lab(a))};

},{"./lab":19,"./xyz":31}],22:[function(require,module,exports){
var luv=require("./luv"),xyz=require("./xyz"),lchuv=module.exports={name:"lchuv",channel:["lightness","chroma","hue"],alias:["LCHuv","cielchuv"],min:[0,0,0],max:[100,100,360],luv:function(u){var l,n,v,r=u[0],t=u[1],a=u[2];return v=a/360*2*Math.PI,l=t*Math.cos(v),n=t*Math.sin(v),[r,l,n]},xyz:function(u){return luv.xyz(lchuv.luv(u))}};luv.lchuv=function(u){var l=u[0],n=u[1],v=u[2],r=Math.sqrt(n*n+v*v),t=Math.atan2(v,n),a=360*t/2/Math.PI;return 0>a&&(a+=360),[l,r,a]},xyz.lchuv=function(u){return luv.lchuv(xyz.luv(u))};

},{"./luv":24,"./xyz":31}],23:[function(require,module,exports){
var xyz=require("./xyz"),lms=module.exports={name:"lms",min:[0,0,0],max:[100,100,100],channel:["long","medium","short"],xyz:function(n,r){var e=n[0],m=n[1],u=n[2];return r||(r=[1.096123820835514,-.278869000218287,.182745179382773,.454369041975359,.473533154307412,.072097803717229,-.009627608738429,-.005698031216113,1.015325639954543]),[e*r[0]+m*r[1]+u*r[2],e*r[3]+m*r[4]+u*r[5],e*r[6]+m*r[7]+u*r[8]]}};xyz.lms=function(n,r){var e=n[0],m=n[1],u=n[2];return r||(r=[.7328,.4296,-.1624,-.7036,1.6975,.0061,.003,.0136,.9834]),[e*r[0]+m*r[1]+u*r[2],e*r[3]+m*r[4]+u*r[5],e*r[6]+m*r[7]+u*r[8]]};

},{"./xyz":31}],24:[function(require,module,exports){
var xyz=require("./xyz");module.exports={name:"luv",min:[0,-134,-140],max:[100,224,122],channel:["lightness","u","v"],alias:["LUV","cieluv","cie1976"],xyz:function(i,t,e){var n,r,a,o,x,u,h,y,z,p,v,w,l;if(a=i[0],o=i[1],x=i[2],0===a)return[0,0,0];var c=.0011070564598794539;return t=t||"D65",e=e||2,z=xyz.whitepoint[e][t][0],p=xyz.whitepoint[e][t][1],v=xyz.whitepoint[e][t][2],w=4*z/(z+15*p+3*v),l=9*p/(z+15*p+3*v),n=o/(13*a)+w||0,r=x/(13*a)+l||0,h=a>8?p*Math.pow((a+16)/116,3):p*a*c,u=9*h*n/(4*r)||0,y=h*(12-3*n-20*r)/(4*r)||0,[u,h,y]}},xyz.luv=function(i,t,e){var n,r,a,o,x,u,h,y,z,p,v,w,l,c=.008856451679035631,m=903.2962962962961;t=t||"D65",e=e||2,z=xyz.whitepoint[e][t][0],p=xyz.whitepoint[e][t][1],v=xyz.whitepoint[e][t][2],w=4*z/(z+15*p+3*v),l=9*p/(z+15*p+3*v),u=i[0],h=i[1],y=i[2],n=4*u/(u+15*h+3*y)||0,r=9*h/(u+15*h+3*y)||0;var s=h/p;return a=c>=s?m*s:116*Math.pow(s,1/3)-16,o=13*a*(n-w),x=13*a*(r-l),[a,o,x]};

},{"./xyz":31}],25:[function(require,module,exports){
var xyz=require("./xyz"),osaucs={name:"osaucs",alias:["OSA-UCS"],channel:["L","j","g"],min:[-10,-6,-10],max:[8,12,6]};osaucs.xyz=function(a){throw"Unimplemented"},xyz.osaucs=function(a){var o=a[0],t=a[1],s=a[2],n=o/(o+t+s),e=t/(o+t+s),h=4.4934*n*n+4.3034*e*e-4.276*n*e-1.3744*n-2.56439*e+1.8103,r=h*t,u=5.9*(Math.pow(r,1/3)-2/3+.042*Math.pow(Math.max(r,30)-30,1/3)),c=(u-14.3993)/Math.sqrt(2),p=u/(5.9*(Math.pow(r,1/3)-2/3)),M=.779*o+.4194*t-.1648*s,m=-.4493*o+1.3265*t+.0927*s,w=-.1149*o+.3394*t+.717*s;M=Math.pow(M,1/3)||0,m=Math.pow(m,1/3)||0,w=Math.pow(w,1/3)||0;var x=-13.7*M+17.7*m-4*w,i=1.7*M+8*m-9.7*w,l=p*x,y=p*i;return[c,y,l]},module.exports=osaucs;

},{"./xyz":31}],26:[function(require,module,exports){
module.exports={name:"rgb",min:[0,0,0],max:[255,255,255],channel:["red","green","blue"],alias:["RGB"]};

},{}],27:[function(require,module,exports){
var xyz=require("./xyz"),luv=require("./luv"),ucs=module.exports={name:"ucs",min:[0,0,0],max:[100,100,100],channel:["U","V","W"],alias:["UCS","cie1960"]};ucs.xyz=function(u){var r=u[0],e=u[1],n=u[2];return[1.5*r,e,1.5*r-3*e+2*n]},xyz.ucs=function(u){var r=u[0],e=u[1],n=u[2];return[2*r/3,e,.5*(-r+3*e+n)]};

},{"./luv":24,"./xyz":31}],28:[function(require,module,exports){
var ucs=require("./ucs"),xyz=require("./xyz"),uvw=module.exports={name:"uvw",min:[-134,-140,0],max:[224,122,100],channel:["U","V","W"],alias:["UVW","cieuvw","cie1964"]};uvw.xyz=function(i,n,t){var u,w,e,o,r,a,v,x,c,y,h,p,z;return o=i[0],r=i[1],e=i[2],0===e?[0,0,0]:(n=n||"D65",t=t||2,c=xyz.whitepoint[t][n][0],y=xyz.whitepoint[t][n][1],h=xyz.whitepoint[t][n][2],p=4*c/(c+15*y+3*h),z=6*y/(c+15*y+3*h),v=Math.pow((e+17)/25,3),u=o/(13*e)+p||0,w=r/(13*e)+z||0,a=1.5*v*u/w,x=v*(2/w-.5*u/w-5),[a,v,x])},xyz.uvw=function(i,n,t){var u,w,e,o,r,a=i[0],v=i[1],x=i[2];n=n||"D65",t=t||2,u=xyz.whitepoint[t][n][0],w=xyz.whitepoint[t][n][1],e=xyz.whitepoint[t][n][2],o=4*u/(u+15*w+3*e),r=6*w/(u+15*w+3*e);var c=4*a/(a+15*v+3*x)||0,y=6*v/(a+15*v+3*x)||0,h=25*Math.pow(v,1/3)-17,p=13*h*(c-o),z=13*h*(y-r);return[p,z,h]},uvw.ucs=function(i){},ucs.uvw=function(i){var n=U/(U+V+W),t=V/(U+V+W);w=25*Math.pow(y,1/3)-17,n=13*w*(n-un),t=13*w*(t-vn)};

},{"./ucs":27,"./xyz":31}],29:[function(require,module,exports){
var rgb=require("./rgb"),ypbpr=require("./ypbpr"),xvycc=module.exports={name:"xvycc",min:[0,0,0],max:[255,255,255],channel:["Y","Cb","Cr"],alias:["xvYCC"]};ypbpr.xvycc=function(r){var c=r[0],p=r[1],n=r[2];return[16+219*c,128+224*p,128+224*n]},xvycc.ypbpr=function(r){var c=r[0],p=r[1],n=r[2];return[(c-16)/219,(p-128)/224,(n-128)/224]},xvycc.rgb=function(r,c,p){return ypbpr.rgb(xvycc.ypbpr(r),c,p)},rgb.xvycc=function(r,c,p){return ypbpr.xvycc(rgb.ypbpr(r,c,p))};

},{"./rgb":26,"./ypbpr":37}],30:[function(require,module,exports){
var xyz=require("./xyz"),xyy={name:"xyy",min:[0,0,0],max:[1,1,100],channel:["x","y","Y"],alias:["xyY","Yxy","yxy"]};xyy.xyz=function(y){var x,n,r,a,e;return a=y[0],e=y[1],n=y[2],0===e?[0,0,0]:(x=a*n/e,r=(1-a-e)*n/e,[x,n,r])},xyz.xyy=function(y){var x,n,r,a;return n=y[0],r=y[1],a=y[2],x=n+r+a,0===x?[0,0,r]:[n/x,r/x,r]},module.exports=xyy;

},{"./xyz":31}],31:[function(require,module,exports){
var rgb=require("./rgb"),xyz={name:"xyz",min:[0,0,0],channel:["X","Y","Z"],alias:["XYZ","ciexyz","cie1931"]};xyz.whitepoint={2:{A:[109.85,100,35.585],C:[98.074,100,118.232],D50:[96.422,100,82.521],D55:[95.682,100,92.149],D65:[95.045592705167,100,108.9057750759878],D75:[94.972,100,122.638],F2:[99.187,100,67.395],F7:[95.044,100,108.755],F11:[100.966,100,64.37],E:[100,100,100]},10:{A:[111.144,100,35.2],C:[97.285,100,116.145],D50:[96.72,100,81.427],D55:[95.799,100,90.926],D65:[94.811,100,107.304],D75:[94.416,100,120.641],F2:[103.28,100,69.026],F7:[95.792,100,107.687],F11:[103.866,100,65.627],E:[100,100,100]}},xyz.max=xyz.whitepoint[2].D65,xyz.rgb=function(a){var t,h,n,r=a[0]/100,i=a[1]/100,x=a[2]/100;return t=3.240969941904521*r+-1.537383177570093*i+x*-.498610760293,h=r*-.96924363628087+1.87596750150772*i+.041555057407175*x,n=.055630079696993*r+i*-.20397695888897+1.056971514242878*x,t=t>.0031308?1.055*Math.pow(t,1/2.4)-.055:t=12.92*t,h=h>.0031308?1.055*Math.pow(h,1/2.4)-.055:h=12.92*h,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n=12.92*n,t=Math.min(Math.max(0,t),1),h=Math.min(Math.max(0,h),1),n=Math.min(Math.max(0,n),1),[255*t,255*h,255*n]},rgb.xyz=function(a){var t=a[0]/255,h=a[1]/255,n=a[2]/255;t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,h=h>.04045?Math.pow((h+.055)/1.055,2.4):h/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92;var r=.41239079926595*t+.35758433938387*h+.18048078840183*n,i=.21263900587151*t+.71516867876775*h+.072192315360733*n,x=.019330818715591*t+.11919477979462*h+.95053215224966*n;return[100*r,100*i,100*x]},module.exports=xyz;

},{"./rgb":26}],32:[function(require,module,exports){
var rgb=require("./rgb"),ypbpr=require("./ypbpr"),ycbcr=module.exports={name:"ycbcr",min:[16,16,16],max:[235,240,240],channel:["Y","Cb","Cr"],alias:["YCbCr","YCC"]};ypbpr.ycbcr=function(r){var b=r[0],c=r[1],p=r[2];return[16+219*b,128+224*c,128+224*p]},ycbcr.ypbpr=function(r){var b=r[0],c=r[1],p=r[2];return[(b-16)/219,(c-128)/224,(p-128)/224]},ycbcr.rgb=function(r,b,c){return ypbpr.rgb(ycbcr.ypbpr(r),b,c)},rgb.ycbcr=function(r,b,c){return ypbpr.ycbcr(rgb.ypbpr(r,b,c))};

},{"./rgb":26,"./ypbpr":37}],33:[function(require,module,exports){
var rgb=require("./rgb"),ypbpr=require("./ypbpr"),yccbccrc=module.exports={name:"yccbccrc",min:[0,-.5,-.5],max:[1,.5,.5],channel:["Yc","Cbc","Crc"],alias:["YcCbcCrc"]};yccbccrc.rgb=function(c){return ypbpr.rgb(c,.0593,.2627)},rgb.yccbccrc=function(c){return rgb.ypbpr(c,.0593,.2627)};

},{"./rgb":26,"./ypbpr":37}],34:[function(require,module,exports){
var rgb=require("./rgb"),ycgco=module.exports={name:"ycgco",min:[0,-.5,-.5],max:[1,.5,.5],channel:["Y","Cg","Co"],alias:["YCgCo"]};ycgco.rgb=function(r){var c=r[0],g=r[1],n=r[2],o=c-g;return[255*(o+n),255*(c+g),255*(o-n)]},rgb.ycgco=function(r){var c=r[0]/255,g=r[1]/255,n=r[2]/255;return[.25*c+.5*g+.25*n,-.25*c+.5*g-.25*n,.5*c-.5*n]};

},{"./rgb":26}],35:[function(require,module,exports){
var rgb=require("./rgb"),yuv=require("./yuv"),ydbdr=module.exports={name:"ydbdr",min:[0,-1.333,-1.333],max:[1,1.333,1.333],channel:["Y","Db","Dr"],alias:["YDbDr"]};ydbdr.rgb=function(r){var n=r[0],u=r[1],e=r[2],d=n+92303716148e-15*u-.525912630661865*e,b=n-.129132898890509*u+.267899328207599*e,y=n+.664679059978955*u-79202543533e-15*e;return[255*d,255*b,255*y]},rgb.ydbdr=function(r){var n=r[0]/255,u=r[1]/255,e=r[2]/255;return[.299*n+.587*u+.114*e,-.45*n-.883*u+1.333*e,-1.333*n+1.116*u+.217*e]},yuv.ydbdr=function(r){return[r[0],3.059*r[1],-2.169*r[2]]},ydbdr.yuv=function(r){return[r[0],r[1]/3.059,-r[2]/2.169]};

},{"./rgb":26,"./yuv":38}],36:[function(require,module,exports){
var rgb=require("./rgb"),yiq=module.exports={name:"yiq",min:[0,-.5957,-.5226],max:[1,.5957,.5226],channel:["Y","I","Q"],alias:["YIQ"]};yiq.rgb=function(a){var r,n,i,t=a[0],m=a[1],e=a[2];return r=1*t+.956*m+.621*e,n=1*t+m*-.272+e*-.647,i=1*t+-1.108*m+1.705*e,r=Math.min(Math.max(0,r),1),n=Math.min(Math.max(0,n),1),i=Math.min(Math.max(0,i),1),[255*r,255*n,255*i]},rgb.yiq=function(a){var r=a[0]/255,n=a[1]/255,i=a[2]/255,t=.299*r+.587*n+.114*i,m=0,e=0;return r===n&&n===i||(m=.596*r+n*-.275+i*-.321,e=.212*r+n*-.528+.311*i),[t,m,e]};

},{"./rgb":26}],37:[function(require,module,exports){
var rgb=require("./rgb"),ypbpr=module.exports={name:"ypbpr",min:[0,-.5,-.5],max:[1,.5,.5],channel:["Y","Pb","Pr"],alias:["YPbPr","Y/PB/PR","YPRPB","PRPBY","PBPRY","Y/Pb/Pr","YPrPb","PrPbY","PbPrY","Y/R-Y/B-Y","Y(R-Y)(B-Y)","R-Y","B-Y"]};ypbpr.rgb=function(r,P,Y){var b=r[0],a=r[1],n=r[2];P=P||.0722,Y=Y||.2126;var p=b+2*n*(1-Y),e=b+2*a*(1-P),B=(b-Y*p-P*e)/(1-Y-P);return[255*p,255*B,255*e]},rgb.ypbpr=function(r,P,Y){var b=r[0]/255,a=r[1]/255,n=r[2]/255;P=P||.0722,Y=Y||.2126;var p=Y*b+(1-Y-P)*a+P*n,e=.5*(n-p)/(1-P),B=.5*(b-p)/(1-Y);return[p,e,B]};

},{"./rgb":26}],38:[function(require,module,exports){
var rgb=require("./rgb"),yuv=module.exports={name:"yuv",min:[0,-.5,-.5],max:[1,.5,.5],channel:["Y","U","V"],alias:["YUV","EBU"],rgb:function(a){var r,n,t,m=a[0],u=a[1],e=a[2];return r=1*m+0*u+1.13983*e,n=1*m+u*-.39465+e*-.5806,t=1*m+2.02311*u+0*e,r=Math.min(Math.max(0,r),1),n=Math.min(Math.max(0,n),1),t=Math.min(Math.max(0,t),1),[255*r,255*n,255*t]}};rgb.yuv=function(a){var r=a[0]/255,n=a[1]/255,t=a[2]/255,m=.299*r+.587*n+.114*t,u=r*-.14713+n*-.28886+.436*t,e=.615*r+n*-.51499+t*-.10001;return[m,u,e]};

},{"./rgb":26}],39:[function(require,module,exports){
module.exports=function(){for(var o=0;o<arguments.length;o++)if(void 0!==arguments[o])return arguments[o]};

},{}],40:[function(require,module,exports){
"use strict";function EvStore(e){var r=e[hashKey];return r||(r=e[hashKey]={}),r}var OneVersionConstraint=require("individual/one-version"),MY_VERSION="7";OneVersionConstraint("ev-store",MY_VERSION);var hashKey="__EV_STORE_KEY@"+MY_VERSION;module.exports=EvStore;

},{"individual/one-version":44}],41:[function(require,module,exports){
(function (global){
var topLevel="undefined"!=typeof global?global:"undefined"!=typeof window?window:{},minDoc=require("min-document");if("undefined"!=typeof document)module.exports=document;else{var doccy=topLevel["__GLOBAL_DOCUMENT_CACHE@4"];doccy||(doccy=topLevel["__GLOBAL_DOCUMENT_CACHE@4"]=minDoc),module.exports=doccy}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":4}],42:[function(require,module,exports){
(function(){var r,n,u,t,e,l,h,o,c,f,i,a,s,g,p,v,b,x,y;a={R:[3.2409699419045213,-1.5373831775700935,-.4986107602930033],G:[-.9692436362808798,1.8759675015077206,.04155505740717561],B:[.05563007969699361,-.20397695888897657,1.0569715142428786]},s={X:[.4123907992659595,.35758433938387796,.1804807884018343],Y:[.21263900587151036,.7151686787677559,.07219231536073371],Z:[.01933081871559185,.11919477979462599,.9505321522496606]},v=.19783000664283681,b=.468319994938791,f=903.2962962962963,l=.008856451679035631,o=function(r){var n,u,t,e,h,o,c,i,s,g,p,v,b,x,y,d,M,z;for(x=Math.pow(r+16,3)/1560896,y=x>l?x:r/f,b=[],g=["R","G","B"],t=0,h=g.length;h>t;t++)for(u=g[t],p=a[u],c=p[0],i=p[1],s=p[2],v=[0,1],e=0,o=v.length;o>e;e++)d=v[e],M=(284517*c-94839*s)*y,z=(838422*s+769860*i+731718*c)*r*y-769860*d*r,n=(632260*s-126452*i)*y+126452*d,b.push([M/n,z/n]);return b},c=function(r,n){return(r[1]-n[1])/(n[0]-r[0])},t=function(r){return Math.sqrt(Math.pow(r[0],2)+Math.pow(r[1],2))},i=function(r,n){var u,t,e;return e=n[0],u=n[1],t=u/(Math.sin(r)-e*Math.cos(r)),0>t?null:t},p=function(r){var n,u,e,l,h,f,i,a;for(l=[],f=o(r),u=0,e=f.length;e>u;u++)i=f[u],h=i[0],n=i[1],a=c([h,n],[-1/h,0]),l.push(t([a,n+a*h]));return Math.min.apply(Math,l)},g=function(r,n){var u,t,e,l,h,c,f;for(u=n/360*Math.PI*2,h=[],f=o(r),t=0,l=f.length;l>t;t++)c=f[t],e=i(u,c),null!==e&&h.push(e);return Math.min.apply(Math,h)},e=function(r,n){var u,t,e,l;for(l=0,u=t=0,e=r.length-1;e>=0?e>=t:t>=e;u=e>=0?++t:--t)l+=r[u]*n[u];return l},h=function(r){return.0031308>=r?12.92*r:1.055*Math.pow(r,1/2.4)-.055},y=function(r){var n;return n=.055,r>.04045?Math.pow((r+n)/(1+n),2.4):r/12.92},u={xyz:{},luv:{},lch:{},husl:{},huslp:{},rgb:{},hex:{}},u.xyz.rgb=function(r){var n,u,t;return t=h(e(a.R,r)),u=h(e(a.G,r)),n=h(e(a.B,r)),[t,u,n]},u.rgb.xyz=function(r){var n,u,t,l,h,o,c;return t=r[0],u=r[1],n=r[2],c=[y(t),y(u),y(n)],l=e(s.X,c),h=e(s.Y,c),o=e(s.Z,c),[l,h,o]},n=function(r){return l>=r?r*f:116*Math.pow(r,1/3)-16},r=function(r){return 8>=r?r/f:Math.pow((r+16)/116,3)},u.xyz.luv=function(r){var u,t,e,l,h,o,c,f;return l=r[0],h=r[1],o=r[2],0===h?[0,0,0]:(u=n(h),c=4*l/(l+15*h+3*o),f=9*h/(l+15*h+3*o),t=13*u*(c-v),e=13*u*(f-b),[u,t,e])},u.luv.xyz=function(n){var u,t,e,l,h,o,c,f;return u=n[0],t=n[1],e=n[2],0===u?[0,0,0]:(c=t/(13*u)+v,f=e/(13*u)+b,h=r(u),l=0-9*h*c/((c-4)*f-c*f),o=(9*h-15*f*h-f*l)/(3*f),[l,h,o])},u.luv.lch=function(r){var n,u,t,e,l,h;return e=r[0],l=r[1],h=r[2],n=Math.sqrt(Math.pow(l,2)+Math.pow(h,2)),1e-8>n?u=0:(t=Math.atan2(h,l),u=360*t/2/Math.PI,0>u&&(u=360+u)),[e,n,u]},u.lch.luv=function(r){var n,u,t,e,l,h;return e=r[0],n=r[1],u=r[2],t=u/360*2*Math.PI,l=Math.cos(t)*n,h=Math.sin(t)*n,[e,l,h]},u.husl.lch=function(r){var n,u,t,e,l;return u=r[0],e=r[1],t=r[2],t>99.9999999||1e-8>t?n=0:(l=g(t,u),n=l/100*e),[t,n,u]},u.lch.husl=function(r){var n,u,t,e,l;return t=r[0],n=r[1],u=r[2],t>99.9999999||1e-8>t?e=0:(l=g(t,u),e=n/l*100),[u,e,t]},u.huslp.lch=function(r){var n,u,t,e,l;return u=r[0],e=r[1],t=r[2],t>99.9999999||1e-8>t?n=0:(l=p(t),n=l/100*e),[t,n,u]},u.lch.huslp=function(r){var n,u,t,e,l;return t=r[0],n=r[1],u=r[2],t>99.9999999||1e-8>t?e=0:(l=p(t),e=n/l*100),[u,e,t]},u.rgb.hex=function(r){var n,u,t,e;for(u="#",t=0,e=r.length;e>t;t++){if(n=r[t],n=Math.round(1e6*n)/1e6,0>n||n>1)throw new Error("Illegal rgb value: "+n);n=Math.round(255*n).toString(16),1===n.length&&(n="0"+n),u+=n}return u},u.hex.rgb=function(r){var n,u,t,e,l,h,o,c;for("#"===r.charAt(0)&&(r=r.substring(1,7)),h=r.substring(0,2),u=r.substring(2,4),n=r.substring(4,6),o=[h,u,n],c=[],t=0,e=o.length;e>t;t++)l=o[t],c.push(parseInt(l,16)/255);return c},u.lch.rgb=function(r){return u.xyz.rgb(u.luv.xyz(u.lch.luv(r)))},u.rgb.lch=function(r){return u.luv.lch(u.xyz.luv(u.rgb.xyz(r)))},u.husl.rgb=function(r){return u.lch.rgb(u.husl.lch(r))},u.rgb.husl=function(r){return u.lch.husl(u.rgb.lch(r))},u.huslp.rgb=function(r){return u.lch.rgb(u.huslp.lch(r))},u.rgb.huslp=function(r){return u.lch.huslp(u.rgb.lch(r))},x={},x.fromRGB=function(r,n,t){return u.rgb.husl([r,n,t])},x.fromHex=function(r){return u.rgb.husl(u.hex.rgb(r))},x.toRGB=function(r,n,t){return u.husl.rgb([r,n,t])},x.toHex=function(r,n,t){return u.rgb.hex(u.husl.rgb([r,n,t]))},x.p={},x.p.toRGB=function(r,n,t){return u.xyz.rgb(u.luv.xyz(u.lch.luv(u.huslp.lch([r,n,t]))))},x.p.toHex=function(r,n,t){return u.rgb.hex(u.xyz.rgb(u.luv.xyz(u.lch.luv(u.huslp.lch([r,n,t])))))},x.p.fromRGB=function(r,n,t){return u.lch.huslp(u.luv.lch(u.xyz.luv(u.rgb.xyz([r,n,t]))))},x.p.fromHex=function(r){return u.lch.huslp(u.luv.lch(u.xyz.luv(u.rgb.xyz(u.hex.rgb(r)))))},x._conv=u,x._getBounds=o,x._maxChromaForLH=g,x._maxSafeChromaForL=p,"undefined"!=typeof module&&null!==module||"undefined"!=typeof jQuery&&null!==jQuery||"undefined"!=typeof requirejs&&null!==requirejs||(this.HUSL=x),"undefined"!=typeof module&&null!==module&&(module.exports=x),"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.husl=x),"undefined"!=typeof requirejs&&null!==requirejs&&"undefined"!=typeof define&&null!==define&&define(x)}).call(this);

},{}],43:[function(require,module,exports){
(function (global){
"use strict";function Individual(o,n){return o in root?root[o]:(root[o]=n,n)}var root="undefined"!=typeof window?window:"undefined"!=typeof global?global:{};module.exports=Individual;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],44:[function(require,module,exports){
"use strict";function OneVersion(n,e,i){var r="__INDIVIDUAL_ONE_VERSION_"+n,o=r+"_ENFORCE_SINGLETON",a=Individual(o,e);if(a!==e)throw new Error("Can only have one copy of "+n+".\nYou already have version "+a+" installed.\nThis means you cannot install version "+e);return Individual(r,i)}var Individual=require("./index.js");module.exports=OneVersion;

},{"./index.js":43}],45:[function(require,module,exports){
"function"==typeof Object.create?module.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};

},{}],46:[function(require,module,exports){
"use strict";module.exports=function(t){return"object"==typeof t&&null!==t};

},{}],47:[function(require,module,exports){
function Hash(){}var nativeCreate=require("./_nativeCreate"),objectProto=Object.prototype;Hash.prototype=nativeCreate?nativeCreate(null):objectProto,module.exports=Hash;

},{"./_nativeCreate":108}],48:[function(require,module,exports){
var getNative=require("./_getNative"),root=require("./_root"),Map=getNative(root,"Map");module.exports=Map;

},{"./_getNative":88,"./_root":110}],49:[function(require,module,exports){
function MapCache(e){var a=-1,p=e?e.length:0;for(this.clear();++a<p;){var t=e[a];this.set(t[0],t[1])}}var mapClear=require("./_mapClear"),mapDelete=require("./_mapDelete"),mapGet=require("./_mapGet"),mapHas=require("./_mapHas"),mapSet=require("./_mapSet");MapCache.prototype.clear=mapClear,MapCache.prototype["delete"]=mapDelete,MapCache.prototype.get=mapGet,MapCache.prototype.has=mapHas,MapCache.prototype.set=mapSet,module.exports=MapCache;

},{"./_mapClear":102,"./_mapDelete":103,"./_mapGet":104,"./_mapHas":105,"./_mapSet":106}],50:[function(require,module,exports){
var getNative=require("./_getNative"),root=require("./_root"),Set=getNative(root,"Set");module.exports=Set;

},{"./_getNative":88,"./_root":110}],51:[function(require,module,exports){
function Stack(t){var e=-1,a=t?t.length:0;for(this.clear();++e<a;){var c=t[e];this.set(c[0],c[1])}}var stackClear=require("./_stackClear"),stackDelete=require("./_stackDelete"),stackGet=require("./_stackGet"),stackHas=require("./_stackHas"),stackSet=require("./_stackSet");Stack.prototype.clear=stackClear,Stack.prototype["delete"]=stackDelete,Stack.prototype.get=stackGet,Stack.prototype.has=stackHas,Stack.prototype.set=stackSet,module.exports=Stack;

},{"./_stackClear":112,"./_stackDelete":113,"./_stackGet":114,"./_stackHas":115,"./_stackSet":116}],52:[function(require,module,exports){
var root=require("./_root"),Symbol=root.Symbol;module.exports=Symbol;

},{"./_root":110}],53:[function(require,module,exports){
var root=require("./_root"),Uint8Array=root.Uint8Array;module.exports=Uint8Array;

},{"./_root":110}],54:[function(require,module,exports){
var getNative=require("./_getNative"),root=require("./_root"),WeakMap=getNative(root,"WeakMap");module.exports=WeakMap;

},{"./_getNative":88,"./_root":110}],55:[function(require,module,exports){
function arrayMap(r,a){for(var e=-1,n=r.length,o=Array(n);++e<n;)o[e]=a(r[e],e,r);return o}module.exports=arrayMap;

},{}],56:[function(require,module,exports){
function arraySome(r,e){for(var o=-1,a=r.length;++o<a;)if(e(r[o],o,r))return!0;return!1}module.exports=arraySome;

},{}],57:[function(require,module,exports){
function assocDelete(e,r){var o=assocIndexOf(e,r);if(0>o)return!1;var a=e.length-1;return o==a?e.pop():splice.call(e,o,1),!0}var assocIndexOf=require("./_assocIndexOf"),arrayProto=Array.prototype,splice=arrayProto.splice;module.exports=assocDelete;

},{"./_assocIndexOf":60}],58:[function(require,module,exports){
function assocGet(s,e){var o=assocIndexOf(s,e);return 0>o?void 0:s[o][1]}var assocIndexOf=require("./_assocIndexOf");module.exports=assocGet;

},{"./_assocIndexOf":60}],59:[function(require,module,exports){
function assocHas(s,a){return assocIndexOf(s,a)>-1}var assocIndexOf=require("./_assocIndexOf");module.exports=assocHas;

},{"./_assocIndexOf":60}],60:[function(require,module,exports){
function assocIndexOf(e,r){for(var n=e.length;n--;)if(eq(e[n][0],r))return n;return-1}var eq=require("./eq");module.exports=assocIndexOf;

},{"./eq":118}],61:[function(require,module,exports){
function assocSet(s,e,o){var a=assocIndexOf(s,e);0>a?s.push([e,o]):s[a][1]=o}var assocIndexOf=require("./_assocIndexOf");module.exports=assocSet;

},{"./_assocIndexOf":60}],62:[function(require,module,exports){
function baseCastPath(r){return isArray(r)?r:stringToPath(r)}var isArray=require("./isArray"),stringToPath=require("./_stringToPath");module.exports=baseCastPath;

},{"./_stringToPath":117,"./isArray":124}],63:[function(require,module,exports){
var createBaseFor=require("./_createBaseFor"),baseFor=createBaseFor();module.exports=baseFor;

},{"./_createBaseFor":82}],64:[function(require,module,exports){
function baseForOwn(e,r){return e&&baseFor(e,r,keys)}var baseFor=require("./_baseFor"),keys=require("./keys");module.exports=baseForOwn;

},{"./_baseFor":63,"./keys":135}],65:[function(require,module,exports){
function baseGet(e,a){a=isKey(a,e)?[a+""]:baseCastPath(a);for(var s=0,t=a.length;null!=e&&t>s;)e=e[a[s++]];return s&&s==t?e:void 0}var baseCastPath=require("./_baseCastPath"),isKey=require("./_isKey");module.exports=baseGet;

},{"./_baseCastPath":62,"./_isKey":98}],66:[function(require,module,exports){
function baseHas(t,o){return hasOwnProperty.call(t,o)||"object"==typeof t&&o in t&&null===getPrototypeOf(t)}var objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,getPrototypeOf=Object.getPrototypeOf;module.exports=baseHas;

},{}],67:[function(require,module,exports){
function baseHasIn(e,n){return n in Object(e)}module.exports=baseHasIn;

},{}],68:[function(require,module,exports){
function baseIsEqual(e,s,u,a,i){return e===s?!0:null==e||null==s||!isObject(e)&&!isObjectLike(s)?e!==e&&s!==s:baseIsEqualDeep(e,s,baseIsEqual,u,a,i)}var baseIsEqualDeep=require("./_baseIsEqualDeep"),isObject=require("./isObject"),isObjectLike=require("./isObjectLike");module.exports=baseIsEqual;

},{"./_baseIsEqualDeep":69,"./isObject":130,"./isObjectLike":131}],69:[function(require,module,exports){
function baseIsEqualDeep(e,r,a,t,s,c){var o=isArray(e),u=isArray(r),g=arrayTag,y=arrayTag;o||(g=getTag(e),g=g==argsTag?objectTag:g),u||(y=getTag(r),y=y==argsTag?objectTag:y);var i=g==objectTag&&!isHostObject(e),T=y==objectTag&&!isHostObject(r),b=g==y;if(b&&!i)return c||(c=new Stack),o||isTypedArray(e)?equalArrays(e,r,a,t,s,c):equalByTag(e,r,g,a,t,s,c);if(!(s&PARTIAL_COMPARE_FLAG)){var A=i&&hasOwnProperty.call(e,"__wrapped__"),j=T&&hasOwnProperty.call(r,"__wrapped__");if(A||j)return c||(c=new Stack),a(A?e.value():e,j?r.value():r,t,s,c)}return b?(c||(c=new Stack),equalObjects(e,r,a,t,s,c)):!1}var Stack=require("./_Stack"),equalArrays=require("./_equalArrays"),equalByTag=require("./_equalByTag"),equalObjects=require("./_equalObjects"),getTag=require("./_getTag"),isArray=require("./isArray"),isHostObject=require("./_isHostObject"),isTypedArray=require("./isTypedArray"),PARTIAL_COMPARE_FLAG=2,argsTag="[object Arguments]",arrayTag="[object Array]",objectTag="[object Object]",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=baseIsEqualDeep;

},{"./_Stack":51,"./_equalArrays":83,"./_equalByTag":84,"./_equalObjects":85,"./_getTag":89,"./_isHostObject":96,"./isArray":124,"./isTypedArray":134}],70:[function(require,module,exports){
function baseIsMatch(r,e,a,t){var i=a.length,u=i,n=!t;if(null==r)return!u;for(r=Object(r);i--;){var s=a[i];if(n&&s[2]?s[1]!==r[s[0]]:!(s[0]in r))return!1}for(;++i<u;){s=a[i];var A=s[0],E=r[A],R=s[1];if(n&&s[2]){if(void 0===E&&!(A in r))return!1}else{var _=new Stack,f=t?t(E,R,A,r,e,_):void 0;if(!(void 0===f?baseIsEqual(R,E,t,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG,_):f))return!1}}return!0}var Stack=require("./_Stack"),baseIsEqual=require("./_baseIsEqual"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2;module.exports=baseIsMatch;

},{"./_Stack":51,"./_baseIsEqual":68}],71:[function(require,module,exports){
function baseIteratee(e){var r=typeof e;return"function"==r?e:null==e?identity:"object"==r?isArray(e)?baseMatchesProperty(e[0],e[1]):baseMatches(e):property(e)}var baseMatches=require("./_baseMatches"),baseMatchesProperty=require("./_baseMatchesProperty"),identity=require("./identity"),isArray=require("./isArray"),property=require("./property");module.exports=baseIteratee;

},{"./_baseMatches":73,"./_baseMatchesProperty":74,"./identity":122,"./isArray":124,"./property":138}],72:[function(require,module,exports){
function baseKeys(e){return nativeKeys(Object(e))}var nativeKeys=Object.keys;module.exports=baseKeys;

},{}],73:[function(require,module,exports){
function baseMatches(t){var a=getMatchData(t);if(1==a.length&&a[0][2]){var e=a[0][0],r=a[0][1];return function(t){return null==t?!1:t[e]===r&&(void 0!==r||e in Object(t))}}return function(e){return e===t||baseIsMatch(e,t,a)}}var baseIsMatch=require("./_baseIsMatch"),getMatchData=require("./_getMatchData");module.exports=baseMatches;

},{"./_baseIsMatch":70,"./_getMatchData":87}],74:[function(require,module,exports){
function baseMatchesProperty(e,r){return function(a){var s=get(a,e);return void 0===s&&s===r?hasIn(a,e):baseIsEqual(r,s,void 0,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG)}}var baseIsEqual=require("./_baseIsEqual"),get=require("./get"),hasIn=require("./hasIn"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2;module.exports=baseMatchesProperty;

},{"./_baseIsEqual":68,"./get":120,"./hasIn":121}],75:[function(require,module,exports){
function baseProperty(r){return function(e){return null==e?void 0:e[r]}}module.exports=baseProperty;

},{}],76:[function(require,module,exports){
function basePropertyDeep(e){return function(r){return baseGet(r,e)}}var baseGet=require("./_baseGet");module.exports=basePropertyDeep;

},{"./_baseGet":65}],77:[function(require,module,exports){
function baseSlice(e,r,a){var l=-1,n=e.length;0>r&&(r=-r>n?0:n+r),a=a>n?n:a,0>a&&(a+=n),n=r>a?0:a-r>>>0,r>>>=0;for(var o=Array(n);++l<n;)o[l]=e[l+r];return o}module.exports=baseSlice;

},{}],78:[function(require,module,exports){
function baseTimes(e,r){for(var s=-1,a=Array(e);++s<e;)a[s]=r(s);return a}module.exports=baseTimes;

},{}],79:[function(require,module,exports){
function baseToPairs(r,a){return arrayMap(a,function(a){return[a,r[a]]})}var arrayMap=require("./_arrayMap");module.exports=baseToPairs;

},{"./_arrayMap":55}],80:[function(require,module,exports){
function baseValues(a,r){return arrayMap(r,function(r){return a[r]})}var arrayMap=require("./_arrayMap");module.exports=baseValues;

},{"./_arrayMap":55}],81:[function(require,module,exports){
function checkGlobal(c){return c&&c.Object===Object?c:null}module.exports=checkGlobal;

},{}],82:[function(require,module,exports){
function createBaseFor(e){return function(r,t,a){for(var n=-1,o=Object(r),c=a(r),u=c.length;u--;){var f=c[e?u:++n];if(t(o[f],f,o)===!1)break}return r}}module.exports=createBaseFor;

},{}],83:[function(require,module,exports){
function equalArrays(r,e,a,A,i,t){var n=-1,f=i&PARTIAL_COMPARE_FLAG,u=i&UNORDERED_COMPARE_FLAG,o=r.length,R=e.length;if(o!=R&&!(f&&R>o))return!1;var _=t.get(r);if(_)return _==e;var E=!0;for(t.set(r,e);++n<o;){var l=r[n],v=e[n];if(A)var L=f?A(v,l,n,e,r,t):A(l,v,n,r,e,t);if(void 0!==L){if(L)continue;E=!1;break}if(u){if(!arraySome(e,function(r){return l===r||a(l,r,A,i,t)})){E=!1;break}}else if(l!==v&&!a(l,v,A,i,t)){E=!1;break}}return t["delete"](r),E}var arraySome=require("./_arraySome"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2;module.exports=equalArrays;

},{"./_arraySome":56}],84:[function(require,module,exports){
function equalByTag(e,r,a,o,t,s,y){switch(a){case arrayBufferTag:return!(e.byteLength!=r.byteLength||!o(new Uint8Array(e),new Uint8Array(r)));case boolTag:case dateTag:return+e==+r;case errorTag:return e.name==r.name&&e.message==r.message;case numberTag:return e!=+e?r!=+r:e==+r;case regexpTag:case stringTag:return e==r+"";case mapTag:var g=mapToArray;case setTag:var l=s&PARTIAL_COMPARE_FLAG;if(g||(g=setToArray),e.size!=r.size&&!l)return!1;var u=y.get(e);return u?u==r:equalArrays(g(e),g(r),o,t,s|UNORDERED_COMPARE_FLAG,y.set(e,r));case symbolTag:if(symbolValueOf)return symbolValueOf.call(e)==symbolValueOf.call(r)}return!1}var Symbol=require("./_Symbol"),Uint8Array=require("./_Uint8Array"),equalArrays=require("./_equalArrays"),mapToArray=require("./_mapToArray"),setToArray=require("./_setToArray"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2,boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",mapTag="[object Map]",numberTag="[object Number]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",symbolTag="[object Symbol]",arrayBufferTag="[object ArrayBuffer]",symbolProto=Symbol?Symbol.prototype:void 0,symbolValueOf=symbolProto?symbolProto.valueOf:void 0;module.exports=equalByTag;

},{"./_Symbol":52,"./_Uint8Array":53,"./_equalArrays":83,"./_mapToArray":107,"./_setToArray":111}],85:[function(require,module,exports){
function equalObjects(r,e,t,n,o,a){var s=o&PARTIAL_COMPARE_FLAG,c=keys(r),i=c.length,u=keys(e),f=u.length;if(i!=f&&!s)return!1;for(var v=i;v--;){var A=c[v];if(!(s?A in e:baseHas(e,A)))return!1}var b=a.get(r);if(b)return b==e;var l=!0;a.set(r,e);for(var y=s;++v<i;){A=c[v];var k=r[A],_=e[A];if(n)var q=s?n(_,k,A,e,r,a):n(k,_,A,r,e,a);if(!(void 0===q?k===_||t(k,_,n,o,a):q)){l=!1;break}y||(y="constructor"==A)}if(l&&!y){var L=r.constructor,O=e.constructor;L!=O&&"constructor"in r&&"constructor"in e&&!("function"==typeof L&&L instanceof L&&"function"==typeof O&&O instanceof O)&&(l=!1)}return a["delete"](r),l}var baseHas=require("./_baseHas"),keys=require("./keys"),PARTIAL_COMPARE_FLAG=2;module.exports=equalObjects;

},{"./_baseHas":66,"./keys":135}],86:[function(require,module,exports){
var baseProperty=require("./_baseProperty"),getLength=baseProperty("length");module.exports=getLength;

},{"./_baseProperty":75}],87:[function(require,module,exports){
function getMatchData(r){for(var t=toPairs(r),a=t.length;a--;)t[a][2]=isStrictComparable(t[a][1]);return t}var isStrictComparable=require("./_isStrictComparable"),toPairs=require("./toPairs");module.exports=getMatchData;

},{"./_isStrictComparable":101,"./toPairs":139}],88:[function(require,module,exports){
function getNative(e,i){var t=e[i];return isNative(t)?t:void 0}var isNative=require("./isNative");module.exports=getNative;

},{"./isNative":129}],89:[function(require,module,exports){
function getTag(t){return objectToString.call(t)}var Map=require("./_Map"),Set=require("./_Set"),WeakMap=require("./_WeakMap"),mapTag="[object Map]",objectTag="[object Object]",setTag="[object Set]",weakMapTag="[object WeakMap]",objectProto=Object.prototype,funcToString=Function.prototype.toString,objectToString=objectProto.toString,mapCtorString=Map?funcToString.call(Map):"",setCtorString=Set?funcToString.call(Set):"",weakMapCtorString=WeakMap?funcToString.call(WeakMap):"";(Map&&getTag(new Map)!=mapTag||Set&&getTag(new Set)!=setTag||WeakMap&&getTag(new WeakMap)!=weakMapTag)&&(getTag=function(t){var e=objectToString.call(t),a=e==objectTag?t.constructor:null,r="function"==typeof a?funcToString.call(a):"";if(r)switch(r){case mapCtorString:return mapTag;case setCtorString:return setTag;case weakMapCtorString:return weakMapTag}return e}),module.exports=getTag;

},{"./_Map":48,"./_Set":50,"./_WeakMap":54}],90:[function(require,module,exports){
function hasPath(e,r,i){if(null==e)return!1;var s=i(e,r);s||isKey(r)||(r=baseCastPath(r),e=parent(e,r),null!=e&&(r=last(r),s=i(e,r)));var t=e?e.length:void 0;return s||!!t&&isLength(t)&&isIndex(r,t)&&(isArray(e)||isString(e)||isArguments(e))}var baseCastPath=require("./_baseCastPath"),isArguments=require("./isArguments"),isArray=require("./isArray"),isIndex=require("./_isIndex"),isKey=require("./_isKey"),isLength=require("./isLength"),isString=require("./isString"),last=require("./last"),parent=require("./_parent");module.exports=hasPath;

},{"./_baseCastPath":62,"./_isIndex":97,"./_isKey":98,"./_parent":109,"./isArguments":123,"./isArray":124,"./isLength":128,"./isString":132,"./last":136}],91:[function(require,module,exports){
function hashDelete(e,h){return hashHas(e,h)&&delete e[h]}var hashHas=require("./_hashHas");module.exports=hashDelete;

},{"./_hashHas":93}],92:[function(require,module,exports){
function hashGet(e,t){if(nativeCreate){var r=e[t];return r===HASH_UNDEFINED?void 0:r}return hasOwnProperty.call(e,t)?e[t]:void 0}var nativeCreate=require("./_nativeCreate"),HASH_UNDEFINED="__lodash_hash_undefined__",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=hashGet;

},{"./_nativeCreate":108}],93:[function(require,module,exports){
function hashHas(e,t){return nativeCreate?void 0!==e[t]:hasOwnProperty.call(e,t)}var nativeCreate=require("./_nativeCreate"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=hashHas;

},{"./_nativeCreate":108}],94:[function(require,module,exports){
function hashSet(e,a,t){e[a]=nativeCreate&&void 0===t?HASH_UNDEFINED:t}var nativeCreate=require("./_nativeCreate"),HASH_UNDEFINED="__lodash_hash_undefined__";module.exports=hashSet;

},{"./_nativeCreate":108}],95:[function(require,module,exports){
function indexKeys(e){var i=e?e.length:void 0;return isLength(i)&&(isArray(e)||isString(e)||isArguments(e))?baseTimes(i,String):null}var baseTimes=require("./_baseTimes"),isArguments=require("./isArguments"),isArray=require("./isArray"),isLength=require("./isLength"),isString=require("./isString");module.exports=indexKeys;

},{"./_baseTimes":78,"./isArguments":123,"./isArray":124,"./isLength":128,"./isString":132}],96:[function(require,module,exports){
function isHostObject(t){var o=!1;if(null!=t&&"function"!=typeof t.toString)try{o=!!(t+"")}catch(n){}return o}module.exports=isHostObject;

},{}],97:[function(require,module,exports){
function isIndex(e,n){return e="number"==typeof e||reIsUint.test(e)?+e:-1,n=null==n?MAX_SAFE_INTEGER:n,e>-1&&e%1==0&&n>e}var MAX_SAFE_INTEGER=9007199254740991,reIsUint=/^(?:0|[1-9]\d*)$/;module.exports=isIndex;

},{}],98:[function(require,module,exports){
function isKey(r,e){return"number"==typeof r?!0:!isArray(r)&&(reIsPlainProp.test(r)||!reIsDeepProp.test(r)||null!=e&&r in Object(e))}var isArray=require("./isArray"),reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/;module.exports=isKey;

},{"./isArray":124}],99:[function(require,module,exports){
function isKeyable(e){var o=typeof e;return"number"==o||"boolean"==o||"string"==o&&"__proto__"!=e||null==e}module.exports=isKeyable;

},{}],100:[function(require,module,exports){
function isPrototype(o){var t=o&&o.constructor,r="function"==typeof t&&t.prototype||objectProto;return o===r}var objectProto=Object.prototype;module.exports=isPrototype;

},{}],101:[function(require,module,exports){
function isStrictComparable(e){return e===e&&!isObject(e)}var isObject=require("./isObject");module.exports=isStrictComparable;

},{"./isObject":130}],102:[function(require,module,exports){
function mapClear(){this.__data__={hash:new Hash,map:Map?new Map:[],string:new Hash}}var Hash=require("./_Hash"),Map=require("./_Map");module.exports=mapClear;

},{"./_Hash":47,"./_Map":48}],103:[function(require,module,exports){
function mapDelete(e){var a=this.__data__;return isKeyable(e)?hashDelete("string"==typeof e?a.string:a.hash,e):Map?a.map["delete"](e):assocDelete(a.map,e)}var Map=require("./_Map"),assocDelete=require("./_assocDelete"),hashDelete=require("./_hashDelete"),isKeyable=require("./_isKeyable");module.exports=mapDelete;

},{"./_Map":48,"./_assocDelete":57,"./_hashDelete":91,"./_isKeyable":99}],104:[function(require,module,exports){
function mapGet(e){var a=this.__data__;return isKeyable(e)?hashGet("string"==typeof e?a.string:a.hash,e):Map?a.map.get(e):assocGet(a.map,e)}var Map=require("./_Map"),assocGet=require("./_assocGet"),hashGet=require("./_hashGet"),isKeyable=require("./_isKeyable");module.exports=mapGet;

},{"./_Map":48,"./_assocGet":58,"./_hashGet":92,"./_isKeyable":99}],105:[function(require,module,exports){
function mapHas(a){var s=this.__data__;return isKeyable(a)?hashHas("string"==typeof a?s.string:s.hash,a):Map?s.map.has(a):assocHas(s.map,a)}var Map=require("./_Map"),assocHas=require("./_assocHas"),hashHas=require("./_hashHas"),isKeyable=require("./_isKeyable");module.exports=mapHas;

},{"./_Map":48,"./_assocHas":59,"./_hashHas":93,"./_isKeyable":99}],106:[function(require,module,exports){
function mapSet(e,a){var s=this.__data__;return isKeyable(e)?hashSet("string"==typeof e?s.string:s.hash,e,a):Map?s.map.set(e,a):assocSet(s.map,e,a),this}var Map=require("./_Map"),assocSet=require("./_assocSet"),hashSet=require("./_hashSet"),isKeyable=require("./_isKeyable");module.exports=mapSet;

},{"./_Map":48,"./_assocSet":61,"./_hashSet":94,"./_isKeyable":99}],107:[function(require,module,exports){
function mapToArray(r){var a=-1,o=Array(r.size);return r.forEach(function(r,n){o[++a]=[n,r]}),o}module.exports=mapToArray;

},{}],108:[function(require,module,exports){
var getNative=require("./_getNative"),nativeCreate=getNative(Object,"create");module.exports=nativeCreate;

},{"./_getNative":88}],109:[function(require,module,exports){
function parent(e,r){return 1==r.length?e:get(e,baseSlice(r,0,-1))}var baseSlice=require("./_baseSlice"),get=require("./get");module.exports=parent;

},{"./_baseSlice":77,"./get":120}],110:[function(require,module,exports){
(function (global){
var checkGlobal=require("./_checkGlobal"),objectTypes={"function":!0,object:!0},freeExports=objectTypes[typeof exports]&&exports&&!exports.nodeType?exports:void 0,freeModule=objectTypes[typeof module]&&module&&!module.nodeType?module:void 0,freeGlobal=checkGlobal(freeExports&&freeModule&&"object"==typeof global&&global),freeSelf=checkGlobal(objectTypes[typeof self]&&self),freeWindow=checkGlobal(objectTypes[typeof window]&&window),thisGlobal=checkGlobal(objectTypes[typeof this]&&this),root=freeGlobal||freeWindow!==(thisGlobal&&thisGlobal.window)&&freeWindow||freeSelf||thisGlobal||Function("return this")();module.exports=root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_checkGlobal":81}],111:[function(require,module,exports){
function setToArray(r){var o=-1,e=Array(r.size);return r.forEach(function(r){e[++o]=r}),e}module.exports=setToArray;

},{}],112:[function(require,module,exports){
function stackClear(){this.__data__={array:[],map:null}}module.exports=stackClear;

},{}],113:[function(require,module,exports){
function stackDelete(e){var t=this.__data__,a=t.array;return a?assocDelete(a,e):t.map["delete"](e)}var assocDelete=require("./_assocDelete");module.exports=stackDelete;

},{"./_assocDelete":57}],114:[function(require,module,exports){
function stackGet(t){var a=this.__data__,e=a.array;return e?assocGet(e,t):a.map.get(t)}var assocGet=require("./_assocGet");module.exports=stackGet;

},{"./_assocGet":58}],115:[function(require,module,exports){
function stackHas(a){var s=this.__data__,r=s.array;return r?assocHas(r,a):s.map.has(a)}var assocHas=require("./_assocHas");module.exports=stackHas;

},{"./_assocHas":59}],116:[function(require,module,exports){
function stackSet(a,e){var t=this.__data__,r=t.array;r&&(r.length<LARGE_ARRAY_SIZE-1?assocSet(r,a,e):(t.array=null,t.map=new MapCache(r)));var s=t.map;return s&&s.set(a,e),this}var MapCache=require("./_MapCache"),assocSet=require("./_assocSet"),LARGE_ARRAY_SIZE=200;module.exports=stackSet;

},{"./_MapCache":49,"./_assocSet":61}],117:[function(require,module,exports){
function stringToPath(r){var e=[];return toString(r).replace(rePropName,function(r,t,a,o){e.push(a?o.replace(reEscapeChar,"$1"):t||r)}),e}var toString=require("./toString"),rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g,reEscapeChar=/\\(\\)?/g;module.exports=stringToPath;

},{"./toString":140}],118:[function(require,module,exports){
function eq(e,n){return e===n||e!==e&&n!==n}module.exports=eq;

},{}],119:[function(require,module,exports){
function fromPairs(r){for(var o=-1,a=r?r.length:0,e={};++o<a;){var f=r[o];e[f[0]]=f[1]}return e}module.exports=fromPairs;

},{}],120:[function(require,module,exports){
function get(e,t,r){var a=null==e?void 0:baseGet(e,t);return void 0===a?r:a}var baseGet=require("./_baseGet");module.exports=get;

},{"./_baseGet":65}],121:[function(require,module,exports){
function hasIn(a,s){return hasPath(a,s,baseHasIn)}var baseHasIn=require("./_baseHasIn"),hasPath=require("./_hasPath");module.exports=hasIn;

},{"./_baseHasIn":67,"./_hasPath":90}],122:[function(require,module,exports){
function identity(t){return t}module.exports=identity;

},{}],123:[function(require,module,exports){
function isArguments(r){return isArrayLikeObject(r)&&hasOwnProperty.call(r,"callee")&&(!propertyIsEnumerable.call(r,"callee")||objectToString.call(r)==argsTag)}var isArrayLikeObject=require("./isArrayLikeObject"),argsTag="[object Arguments]",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,objectToString=objectProto.toString,propertyIsEnumerable=objectProto.propertyIsEnumerable;module.exports=isArguments;

},{"./isArrayLikeObject":126}],124:[function(require,module,exports){
var isArray=Array.isArray;module.exports=isArray;

},{}],125:[function(require,module,exports){
function isArrayLike(e){return null!=e&&isLength(getLength(e))&&!isFunction(e)}var getLength=require("./_getLength"),isFunction=require("./isFunction"),isLength=require("./isLength");module.exports=isArrayLike;

},{"./_getLength":86,"./isFunction":127,"./isLength":128}],126:[function(require,module,exports){
function isArrayLikeObject(e){return isObjectLike(e)&&isArrayLike(e)}var isArrayLike=require("./isArrayLike"),isObjectLike=require("./isObjectLike");module.exports=isArrayLikeObject;

},{"./isArrayLike":125,"./isObjectLike":131}],127:[function(require,module,exports){
function isFunction(t){var o=isObject(t)?objectToString.call(t):"";return o==funcTag||o==genTag}var isObject=require("./isObject"),funcTag="[object Function]",genTag="[object GeneratorFunction]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isFunction;

},{"./isObject":130}],128:[function(require,module,exports){
function isLength(e){return"number"==typeof e&&e>-1&&e%1==0&&MAX_SAFE_INTEGER>=e}var MAX_SAFE_INTEGER=9007199254740991;module.exports=isLength;

},{}],129:[function(require,module,exports){
function isNative(t){return null==t?!1:isFunction(t)?reIsNative.test(funcToString.call(t)):isObjectLike(t)&&(isHostObject(t)?reIsNative:reIsHostCtor).test(t)}var isFunction=require("./isFunction"),isHostObject=require("./_isHostObject"),isObjectLike=require("./isObjectLike"),reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reIsHostCtor=/^\[object .+?Constructor\]$/,objectProto=Object.prototype,funcToString=Function.prototype.toString,hasOwnProperty=objectProto.hasOwnProperty,reIsNative=RegExp("^"+funcToString.call(hasOwnProperty).replace(reRegExpChar,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");module.exports=isNative;

},{"./_isHostObject":96,"./isFunction":127,"./isObjectLike":131}],130:[function(require,module,exports){
function isObject(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}module.exports=isObject;

},{}],131:[function(require,module,exports){
function isObjectLike(e){return!!e&&"object"==typeof e}module.exports=isObjectLike;

},{}],132:[function(require,module,exports){
function isString(t){return"string"==typeof t||!isArray(t)&&isObjectLike(t)&&objectToString.call(t)==stringTag}var isArray=require("./isArray"),isObjectLike=require("./isObjectLike"),stringTag="[object String]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isString;

},{"./isArray":124,"./isObjectLike":131}],133:[function(require,module,exports){
function isSymbol(o){return"symbol"==typeof o||isObjectLike(o)&&objectToString.call(o)==symbolTag}var isObjectLike=require("./isObjectLike"),symbolTag="[object Symbol]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isSymbol;

},{"./isObjectLike":131}],134:[function(require,module,exports){
function isTypedArray(a){return isObjectLike(a)&&isLength(a.length)&&!!typedArrayTags[objectToString.call(a)]}var isLength=require("./isLength"),isObjectLike=require("./isObjectLike"),argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=!0,typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=!1;var objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isTypedArray;

},{"./isLength":128,"./isObjectLike":131}],135:[function(require,module,exports){
function keys(e){var r=isPrototype(e);if(!r&&!isArrayLike(e))return baseKeys(e);var s=indexKeys(e),i=!!s,a=s||[],n=a.length;for(var t in e)!baseHas(e,t)||i&&("length"==t||isIndex(t,n))||r&&"constructor"==t||a.push(t);return a}var baseHas=require("./_baseHas"),baseKeys=require("./_baseKeys"),indexKeys=require("./_indexKeys"),isArrayLike=require("./isArrayLike"),isIndex=require("./_isIndex"),isPrototype=require("./_isPrototype");module.exports=keys;

},{"./_baseHas":66,"./_baseKeys":72,"./_indexKeys":95,"./_isIndex":97,"./_isPrototype":100,"./isArrayLike":125}],136:[function(require,module,exports){
function last(t){var e=t?t.length:0;return e?t[e-1]:void 0}module.exports=last;

},{}],137:[function(require,module,exports){
function mapValues(e,a){var r={};return a=baseIteratee(a,3),baseForOwn(e,function(e,t,s){r[t]=a(e,t,s)}),r}var baseForOwn=require("./_baseForOwn"),baseIteratee=require("./_baseIteratee");module.exports=mapValues;

},{"./_baseForOwn":64,"./_baseIteratee":71}],138:[function(require,module,exports){
function property(e){return isKey(e)?baseProperty(e):basePropertyDeep(e)}var baseProperty=require("./_baseProperty"),basePropertyDeep=require("./_basePropertyDeep"),isKey=require("./_isKey");module.exports=property;

},{"./_baseProperty":75,"./_basePropertyDeep":76,"./_isKey":98}],139:[function(require,module,exports){
function toPairs(e){return baseToPairs(e,keys(e))}var baseToPairs=require("./_baseToPairs"),keys=require("./keys");module.exports=toPairs;

},{"./_baseToPairs":79,"./keys":135}],140:[function(require,module,exports){
function toString(o){if("string"==typeof o)return o;if(null==o)return"";if(isSymbol(o))return symbolToString?symbolToString.call(o):"";var r=o+"";return"0"==r&&1/o==-INFINITY?"-0":r}var Symbol=require("./_Symbol"),isSymbol=require("./isSymbol"),INFINITY=1/0,symbolProto=Symbol?Symbol.prototype:void 0,symbolToString=symbolProto?symbolProto.toString:void 0;module.exports=toString;

},{"./_Symbol":52,"./isSymbol":133}],141:[function(require,module,exports){
function values(e){return e?baseValues(e,keys(e)):[]}var baseValues=require("./_baseValues"),keys=require("./keys");module.exports=values;

},{"./_baseValues":80,"./keys":135}],142:[function(require,module,exports){
module.exports=require("./wrap")(function(a,t,r){return r>t?Math.max(Math.min(a,r),t):Math.max(Math.min(a,t),r)});

},{"./wrap":144}],143:[function(require,module,exports){
module.exports=require("./wrap")(function(r,e,i){if(void 0===i&&(i=e,e=0),e>i){var o=i;i=e,e=o}var u=i-e;return r=(r+e)%u-e,e>r&&(r+=u),r>i&&(r-=u),r});

},{"./wrap":144}],144:[function(require,module,exports){
module.exports=function(r){return function(t){var n=arguments;if(t instanceof Array){for(var e,a=new Array(t.length),o=0;o<t.length;o++){e=[];for(var f,p=0,i=n.length;i>p;p++)f=n[p]instanceof Array?n[p][o]:n[p],f=f,e.push(f);a[o]=r.apply(this,e)}return a}if("object"==typeof t){var e,a={};for(var o in t){e=[];for(var f,p=0,i=n.length;i>p;p++)f="object"==typeof n[p]?n[p][o]:n[p],f=f,e.push(f);a[o]=r.apply(this,e)}return a}return r.apply(this,n)}};

},{}],145:[function(require,module,exports){
(function (process){
(function(){var e,n,r;"undefined"!=typeof performance&&null!==performance&&performance.now?module.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(module.exports=function(){return(e()-r)/1e6},n=process.hrtime,e=function(){var e;return e=n(),1e9*e[0]+e[1]},r=e()):Date.now?(module.exports=function(){return Date.now()-r},r=Date.now()):(module.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this);

}).call(this,require('_process'))
},{"_process":146}],146:[function(require,module,exports){
function cleanUpNextTick(){draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue()}function drainQueue(){if(!draining){var e=setTimeout(cleanUpNextTick);draining=!0;for(var n=queue.length;n;){for(currentQueue=queue,queue=[];++queueIndex<n;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,n=queue.length}currentQueue=null,draining=!1,clearTimeout(e)}}function Item(e,n){this.fun=e,this.array=n}function noop(){}var process=module.exports={},queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)n[r-1]=arguments[r];queue.push(new Item(e,n)),1!==queue.length||draining||setTimeout(drainQueue,0)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

},{}],147:[function(require,module,exports){
for(var now=require("performance-now"),global="undefined"==typeof window?{}:window,vendors=["moz","webkit"],suffix="AnimationFrame",raf=global["request"+suffix],caf=global["cancel"+suffix]||global["cancelRequest"+suffix],isNative=!0,i=0;i<vendors.length&&!raf;i++)raf=global[vendors[i]+"Request"+suffix],caf=global[vendors[i]+"Cancel"+suffix]||global[vendors[i]+"CancelRequest"+suffix];if(!raf||!caf){isNative=!1;var last=0,id=0,queue=[],frameDuration=1e3/60;raf=function(e){if(0===queue.length){var a=now(),l=Math.max(0,frameDuration-(a-last));last=l+a,setTimeout(function(){var e=queue.slice(0);queue.length=0;for(var a=0;a<e.length;a++)if(!e[a].cancelled)try{e[a].callback(last)}catch(l){setTimeout(function(){throw l},0)}},Math.round(l))}return queue.push({handle:++id,callback:e,cancelled:!1}),id},caf=function(e){for(var a=0;a<queue.length;a++)queue[a].handle===e&&(queue[a].cancelled=!0)}}module.exports=function(e){return isNative?raf.call(global,function(){try{e.apply(this,arguments)}catch(a){setTimeout(function(){throw a},0)}}):raf.call(global,e)},module.exports.cancel=function(){caf.apply(global,arguments)};

},{"performance-now":145}],148:[function(require,module,exports){
function refineNumberInRange(e){var n=defined(e.min,0),r=defined(e.max,100),u=defined(e.step,1),a=t.refinement(t.Number,function(e){return e>=n&&r>=e},"NumberInRange between "+n+" and "+r+" (exclusive)");return a.view=function(e,t){function a(e){t.onUpdate(Number(e.target.value))}var i=defined(t.value,n+(r-n)/2);return e("div",{className:"inputs"},[e("input",{className:"number",type:"number",value:i,min:n,max:r,step:u,onchange:a}),e("input",{className:"range",type:"range",value:i,min:n,max:r,step:u,oninput:a})])},a}var t=require("tcomb"),defined=require("defined");module.exports=refineNumberInRange;

},{"defined":39,"tcomb":149}],149:[function(require,module,exports){
var t=require("./lib/assert");t.Any=require("./lib/Any"),t.Array=require("./lib/Array"),t.Boolean=require("./lib/Boolean"),t.Date=require("./lib/Date"),t.Error=require("./lib/Error"),t.Function=require("./lib/Function"),t.Nil=require("./lib/Nil"),t.Number=require("./lib/Number"),t.Object=require("./lib/Object"),t.RegExp=require("./lib/RegExp"),t.String=require("./lib/String"),t.Arr=t.Array,t.Bool=t.Boolean,t.Dat=t.Date,t.Err=t.Error,t.Func=t.Function,t.Num=t.Number,t.Obj=t.Object,t.Re=t.RegExp,t.Str=t.String,t.dict=require("./lib/dict"),t.declare=require("./lib/declare"),t.enums=require("./lib/enums"),t.irreducible=require("./lib/irreducible"),t.list=require("./lib/list"),t.maybe=require("./lib/maybe"),t.refinement=require("./lib/refinement"),t.struct=require("./lib/struct"),t.tuple=require("./lib/tuple"),t.union=require("./lib/union"),t.func=require("./lib/func"),t.intersection=require("./lib/intersection"),t.subtype=t.refinement,t.assert=t,t.update=require("./lib/update"),t.mixin=require("./lib/mixin"),t.isType=require("./lib/isType"),t.is=require("./lib/is"),t.getTypeName=require("./lib/getTypeName"),t.match=require("./lib/match"),module.exports=t;

},{"./lib/Any":150,"./lib/Array":151,"./lib/Boolean":152,"./lib/Date":153,"./lib/Error":154,"./lib/Function":155,"./lib/Nil":156,"./lib/Number":157,"./lib/Object":158,"./lib/RegExp":159,"./lib/String":160,"./lib/assert":161,"./lib/declare":163,"./lib/dict":164,"./lib/enums":165,"./lib/func":168,"./lib/getTypeName":170,"./lib/intersection":171,"./lib/irreducible":172,"./lib/is":173,"./lib/isType":184,"./lib/list":187,"./lib/match":188,"./lib/maybe":189,"./lib/mixin":190,"./lib/refinement":191,"./lib/struct":193,"./lib/tuple":194,"./lib/union":195,"./lib/update":196}],150:[function(require,module,exports){
var irreducible=require("./irreducible");module.exports=irreducible("Any",function(){return!0});

},{"./irreducible":172}],151:[function(require,module,exports){
var irreducible=require("./irreducible"),isArray=require("./isArray");module.exports=irreducible("Array",isArray);

},{"./irreducible":172,"./isArray":174}],152:[function(require,module,exports){
var irreducible=require("./irreducible"),isBoolean=require("./isBoolean");module.exports=irreducible("Boolean",isBoolean);

},{"./irreducible":172,"./isBoolean":175}],153:[function(require,module,exports){
var irreducible=require("./irreducible");module.exports=irreducible("Date",function(e){return e instanceof Date});

},{"./irreducible":172}],154:[function(require,module,exports){
var irreducible=require("./irreducible");module.exports=irreducible("Error",function(r){return r instanceof Error});

},{"./irreducible":172}],155:[function(require,module,exports){
var irreducible=require("./irreducible"),isFunction=require("./isFunction");module.exports=irreducible("Function",isFunction);

},{"./irreducible":172,"./isFunction":176}],156:[function(require,module,exports){
var irreducible=require("./irreducible"),isNil=require("./isNil");module.exports=irreducible("Nil",isNil);

},{"./irreducible":172,"./isNil":179}],157:[function(require,module,exports){
var irreducible=require("./irreducible"),isNumber=require("./isNumber");module.exports=irreducible("Number",isNumber);

},{"./irreducible":172,"./isNumber":180}],158:[function(require,module,exports){
var irreducible=require("./irreducible"),isObject=require("./isObject");module.exports=irreducible("Object",isObject);

},{"./irreducible":172,"./isObject":181}],159:[function(require,module,exports){
var irreducible=require("./irreducible");module.exports=irreducible("RegExp",function(e){return e instanceof RegExp});

},{"./irreducible":172}],160:[function(require,module,exports){
var irreducible=require("./irreducible"),isString=require("./isString");module.exports=irreducible("String",isString);

},{"./irreducible":172,"./isString":182}],161:[function(require,module,exports){
function assert(i,s){i!==!0&&(isFunction(s)?s=s():isNil(s)&&(s='Assert failed (turn on "Pause on exceptions" in your Source panel)'),assert.fail(s))}var isFunction=require("./isFunction"),isNil=require("./isNil"),fail=require("./fail"),stringify=require("./stringify");assert.fail=fail,assert.stringify=stringify,module.exports=assert;

},{"./fail":166,"./isFunction":176,"./isNil":179,"./stringify":192}],162:[function(require,module,exports){
(function (process){
var isType=require("./isType"),isStruct=require("./isStruct"),getFunctionName=require("./getFunctionName"),assert=require("./assert"),stringify=require("./stringify");module.exports=function(e,i,r){return isType(e)?isStruct(e)?new e(i,r):e(i,r):("production"!==process.env.NODE_ENV&&(r=r||[getFunctionName(e)],assert(i instanceof e,function(){return"Invalid value "+stringify(i)+" supplied to "+r.join("/")})),i)};

}).call(this,require('_process'))
},{"./assert":161,"./getFunctionName":169,"./isStruct":183,"./isType":184,"./stringify":192,"_process":146}],163:[function(require,module,exports){
(function (process){
var assert=require("./assert"),isTypeName=require("./isTypeName"),isType=require("./isType"),isNil=require("./isNil"),mixin=require("./mixin"),getTypeName=require("./getTypeName"),nextDeclareUniqueId=1;module.exports=function(e){function t(e,t){return"production"!==process.env.NODE_ENV&&assert(!isNil(n),function(){return"Type declared but not defined, don't forget to call .define on every declared type"}),n(e,t)}"production"!==process.env.NODE_ENV&&assert(isTypeName(e),function(){return"Invalid argument name "+e+" supplied to declare([name]) (expected a string)"});var n;return t.define=function(i){return"production"!==process.env.NODE_ENV&&(assert(isType(i),function(){return"Invalid argument type "+assert.stringify(i)+" supplied to define(type) (expected a type)"}),assert(isNil(n),function(){return"Declare.define(type) can only be invoked once"}),assert(isNil(i.meta.name)&&0===Object.keys(i.prototype).length,function(){return"Invalid argument type "+assert.stringify(i)+" supplied to define(type) (expected a fresh, unnamed type)"})),n=i,mixin(t,n,!0),e&&(n.displayName=t.displayName=e,t.meta.name=e),t.meta.identity=!1,t.prototype=n.prototype,t},t.displayName=e||getTypeName(t)+"$"+nextDeclareUniqueId++,t.meta={identity:!1},t.prototype=null,t};

}).call(this,require('_process'))
},{"./assert":161,"./getTypeName":170,"./isNil":179,"./isType":184,"./isTypeName":185,"./mixin":190,"_process":146}],164:[function(require,module,exports){
(function (process){
function getDefaultName(e,t){return"{[key: "+getTypeName(e)+"]: "+getTypeName(t)+"}"}function dict(e,t,i){function n(i,n){if("production"===process.env.NODE_ENV&&o)return i;"production"!==process.env.NODE_ENV&&(n=n||[r],assert(isObject(i),function(){return"Invalid value "+assert.stringify(i)+" supplied to "+n.join("/")}));var c=!0,u={};for(var d in i)if(i.hasOwnProperty(d)){d=create(e,d,"production"!==process.env.NODE_ENV?n.concat(a):null);var p=i[d],m=create(t,p,"production"!==process.env.NODE_ENV?n.concat(d+": "+s):null);c=c&&p===m,u[d]=m}return c&&(u=i),"production"!==process.env.NODE_ENV&&Object.freeze(u),u}"production"!==process.env.NODE_ENV&&(assert(isFunction(e),function(){return"Invalid argument domain "+assert.stringify(e)+" supplied to dict(domain, codomain, [name]) combinator (expected a type)"}),assert(isFunction(t),function(){return"Invalid argument codomain "+assert.stringify(t)+" supplied to dict(domain, codomain, [name]) combinator (expected a type)"}),assert(isTypeName(i),function(){return"Invalid argument name "+assert.stringify(i)+" supplied to dict(domain, codomain, [name]) combinator (expected a string)"}));var r=i||getDefaultName(e,t),a=getTypeName(e),s=getTypeName(t),o=isIdentity(e)&&isIdentity(t);return n.meta={kind:"dict",domain:e,codomain:t,name:i,identity:o},n.displayName=r,n.is=function(i){if(!isObject(i))return!1;for(var n in i)if(i.hasOwnProperty(n)&&(!is(n,e)||!is(i[n],t)))return!1;return!0},n.update=function(e,t){return n(assert.update(e,t))},n}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),getTypeName=require("./getTypeName"),isIdentity=require("./isIdentity"),isObject=require("./isObject"),create=require("./create"),is=require("./is");dict.getDefaultName=getDefaultName,module.exports=dict;

}).call(this,require('_process'))
},{"./assert":161,"./create":162,"./getTypeName":170,"./is":173,"./isFunction":176,"./isIdentity":177,"./isObject":181,"./isTypeName":185,"_process":146}],165:[function(require,module,exports){
(function (process){
function getDefaultName(e){return Object.keys(e).map(function(e){return assert.stringify(e)}).join(" | ")}function enums(e,t){function r(t,i){return"production"!==process.env.NODE_ENV&&(forbidNewOperator(this,r),i=i||[n],assert(r.is(t),function(){return"Invalid value "+assert.stringify(t)+" supplied to "+i.join("/")+" (expected one of "+assert.stringify(Object.keys(e))+")"})),t}"production"!==process.env.NODE_ENV&&(assert(isObject(e),function(){return"Invalid argument map "+assert.stringify(e)+" supplied to enums(map, [name]) combinator (expected a dictionary of String -> String | Number)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to enums(map, [name]) combinator (expected a string)"}));var n=t||getDefaultName(e);return r.meta={kind:"enums",map:e,name:t,identity:!0},r.displayName=n,r.is=function(t){return e.hasOwnProperty(t)},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),forbidNewOperator=require("./forbidNewOperator"),isString=require("./isString"),isObject=require("./isObject");enums.of=function(e,t){e=isString(e)?e.split(" "):e;var r={};return e.forEach(function(e){r[e]=e}),enums(r,t)},enums.getDefaultName=getDefaultName,module.exports=enums;

}).call(this,require('_process'))
},{"./assert":161,"./forbidNewOperator":167,"./isObject":181,"./isString":182,"./isTypeName":185,"_process":146}],166:[function(require,module,exports){
module.exports=function(o){throw new TypeError("[tcomb] "+o)};

},{}],167:[function(require,module,exports){
var assert=require("./assert"),getTypeName=require("./getTypeName");module.exports=function(e,t){assert(!(e instanceof t),function(){return"Cannot use the new operator to instantiate the type "+getTypeName(t)})};

},{"./assert":161,"./getTypeName":170}],168:[function(require,module,exports){
(function (process){
function getDefaultName(e,n){return"("+e.map(getTypeName).join(", ")+") => "+getTypeName(n)}function isInstrumented(e){return FunctionType.is(e)&&isObject(e.instrumentation)}function func(e,n,t){function i(e,n){return isInstrumented(e)?("production"!==process.env.NODE_ENV&&assert(i.is(e),function(){return"Invalid value "+assert.stringify(e)+" supplied to "+r}),e):i.of(e,n)}e=isArray(e)?e:[e],"production"!==process.env.NODE_ENV&&(assert(list(FunctionType).is(e),function(){return"Invalid argument domain "+assert.stringify(e)+" supplied to func(domain, codomain, [name]) combinator (expected an array of types)"}),assert(FunctionType.is(n),function(){return"Invalid argument codomain "+assert.stringify(n)+" supplied to func(domain, codomain, [name]) combinator (expected a type)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to func(domain, codomain, [name]) combinator (expected a string)"}));var r=t||getDefaultName(e,n);return i.meta={kind:"func",domain:e,codomain:n,name:t,identity:!0},i.displayName=r,i.is=function(t){return isInstrumented(t)&&t.instrumentation.domain.length===e.length&&t.instrumentation.domain.every(function(n,t){return n===e[t]})&&t.instrumentation.codomain===n},i.of=function(t,a){function o(){var i=Array.prototype.slice.call(arguments),r=a?i.length:e.length,o=tuple(e.slice(0,r));if(i=o(i),r===e.length)return create(n,t.apply(this,i));var u=Function.prototype.bind.apply(t,[this].concat(i)),s=func(e.slice(r),n);return s.of(u,a)}return"production"!==process.env.NODE_ENV&&(assert(FunctionType.is(t),function(){return"Invalid argument f supplied to func.of "+r+" (expected a function)"}),assert(isNil(a)||isBoolean(a),function(){return"Invalid argument curried "+assert.stringify(a)+" supplied to func.of "+r+" (expected a boolean)"})),i.is(t)?t:(o.instrumentation={domain:e,codomain:n,f:t},o.displayName=getFunctionName(t),o)},i}var assert=require("./assert"),isTypeName=require("./isTypeName"),FunctionType=require("./Function"),isArray=require("./isArray"),list=require("./list"),isObject=require("./isObject"),create=require("./create"),isNil=require("./isNil"),isBoolean=require("./isBoolean"),tuple=require("./tuple"),getFunctionName=require("./getFunctionName"),getTypeName=require("./getTypeName");func.getDefaultName=getDefaultName,module.exports=func;

}).call(this,require('_process'))
},{"./Function":155,"./assert":161,"./create":162,"./getFunctionName":169,"./getTypeName":170,"./isArray":174,"./isBoolean":175,"./isNil":179,"./isObject":181,"./isTypeName":185,"./list":187,"./tuple":194,"_process":146}],169:[function(require,module,exports){
module.exports=function(n){return n.displayName||n.name||"<function"+n.length+">"};

},{}],170:[function(require,module,exports){
var isType=require("./isType"),getFunctionName=require("./getFunctionName");module.exports=function(e){return isType(e)?e.displayName:getFunctionName(e)};

},{"./getFunctionName":169,"./isType":184}],171:[function(require,module,exports){
(function (process){
function getDefaultName(e){return e.map(getTypeName).join(" & ")}function intersection(e,t){function r(e,t){return"production"!==process.env.NODE_ENV&&(forbidNewOperator(this,r),t=t||[i],assert(r.is(e),function(){return"Invalid value "+assert.stringify(e)+" supplied to "+t.join("/")})),e}"production"!==process.env.NODE_ENV&&(assert(isArray(e)&&e.every(isFunction)&&e.length>=2,function(){return"Invalid argument types "+assert.stringify(e)+" supplied to intersection(types, [name]) combinator (expected an array of at least 2 types)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to intersection(types, [name]) combinator (expected a string)"}));var i=t||getDefaultName(e);return r.meta={kind:"intersection",types:e,name:t,identity:!0},r.displayName=i,r.is=function(t){return e.every(function(e){return is(t,e)})},r.update=function(e,t){return r(assert.update(e,t))},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),isArray=require("./isArray"),forbidNewOperator=require("./isIdentity"),is=require("./is"),getTypeName=require("./getTypeName");intersection.getDefaultName=getDefaultName,module.exports=intersection;

}).call(this,require('_process'))
},{"./assert":161,"./getTypeName":170,"./is":173,"./isArray":174,"./isFunction":176,"./isIdentity":177,"./isTypeName":185,"_process":146}],172:[function(require,module,exports){
(function (process){
var assert=require("./assert"),isString=require("./isString"),isFunction=require("./isFunction"),forbidNewOperator=require("./forbidNewOperator");module.exports=function(e,r){function i(t,n){return"production"!==process.env.NODE_ENV&&(forbidNewOperator(this,i),n=n||[e],assert(r(t),function(){return"Invalid value "+assert.stringify(t)+" supplied to "+n.join("/")})),t}return"production"!==process.env.NODE_ENV&&(assert(isString(e),function(){return"Invalid argument name "+assert.stringify(e)+" supplied to irreducible(name, predicate) (expected a string)"}),assert(isFunction(r),"Invalid argument predicate "+assert.stringify(r)+" supplied to irreducible(name, predicate) (expected a function)")),i.meta={kind:"irreducible",name:e,predicate:r,identity:!0},i.displayName=e,i.is=r,i};

}).call(this,require('_process'))
},{"./assert":161,"./forbidNewOperator":167,"./isFunction":176,"./isString":182,"_process":146}],173:[function(require,module,exports){
var isType=require("./isType");module.exports=function(e,i){return isType(i)?i.is(e):e instanceof i};

},{"./isType":184}],174:[function(require,module,exports){
module.exports=function(n){return n instanceof Array};

},{}],175:[function(require,module,exports){
module.exports=function(e){return e===!0||e===!1};

},{}],176:[function(require,module,exports){
module.exports=function(n){return"function"==typeof n};

},{}],177:[function(require,module,exports){
(function (process){
var assert=require("./assert"),Boolean=require("./Boolean"),isType=require("./isType"),getTypeName=require("./getTypeName");module.exports=function(e){return isType(e)?("production"!==process.env.NODE_ENV&&assert(Boolean.is(e.meta.identity),function(){return"Invalid meta identity "+assert.stringify(e.meta.identity)+" supplied to type "+getTypeName(e)}),e.meta.identity):!0};

}).call(this,require('_process'))
},{"./Boolean":152,"./assert":161,"./getTypeName":170,"./isType":184,"_process":146}],178:[function(require,module,exports){
var isType=require("./isType");module.exports=function(e){return isType(e)&&"maybe"===e.meta.kind};

},{"./isType":184}],179:[function(require,module,exports){
module.exports=function(n){return null===n||void 0===n};

},{}],180:[function(require,module,exports){
module.exports=function(e){return"number"==typeof e&&isFinite(e)&&!isNaN(e)};

},{}],181:[function(require,module,exports){
var isNil=require("./isNil"),isArray=require("./isArray");module.exports=function(r){return!isNil(r)&&"object"==typeof r&&!isArray(r)};

},{"./isArray":174,"./isNil":179}],182:[function(require,module,exports){
module.exports=function(t){return"string"==typeof t};

},{}],183:[function(require,module,exports){
var isType=require("./isType");module.exports=function(e){return isType(e)&&"struct"===e.meta.kind};

},{"./isType":184}],184:[function(require,module,exports){
var isFunction=require("./isFunction"),isObject=require("./isObject");module.exports=function(i){return isFunction(i)&&isObject(i.meta)};

},{"./isFunction":176,"./isObject":181}],185:[function(require,module,exports){
var isNil=require("./isNil"),isString=require("./isString");module.exports=function(i){return isNil(i)||isString(i)};

},{"./isNil":179,"./isString":182}],186:[function(require,module,exports){
var isType=require("./isType");module.exports=function(e){return isType(e)&&"union"===e.meta.kind};

},{"./isType":184}],187:[function(require,module,exports){
(function (process){
function getDefaultName(e){return"Array<"+getTypeName(e)+">"}function list(e,t){function r(t,r){if("production"===process.env.NODE_ENV&&s)return t;"production"!==process.env.NODE_ENV&&(r=r||[i],assert(isArray(t),function(){return"Invalid value "+assert.stringify(t)+" supplied to "+r.join("/")+" (expected an array of "+n+")"}));for(var a=!0,u=[],o=0,p=t.length;p>o;o++){var c=t[o],y=create(e,c,"production"!==process.env.NODE_ENV?r.concat(o+": "+n):null);a=a&&c===y,u.push(y)}return a&&(u=t),"production"!==process.env.NODE_ENV&&Object.freeze(u),u}"production"!==process.env.NODE_ENV&&(assert(isFunction(e),function(){return"Invalid argument type "+assert.stringify(e)+" supplied to list(type, [name]) combinator (expected a type)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to list(type, [name]) combinator (expected a string)"}));var i=t||getDefaultName(e),n=getTypeName(e),s=isIdentity(e);return r.meta={kind:"list",type:e,name:t,identity:s},r.displayName=i,r.is=function(t){return isArray(t)&&t.every(function(t){return is(t,e)})},r.update=function(e,t){return r(assert.update(e,t))},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),getTypeName=require("./getTypeName"),isIdentity=require("./isIdentity"),create=require("./create"),is=require("./is"),isArray=require("./isArray");list.getDefaultName=getDefaultName,module.exports=list;

}).call(this,require('_process'))
},{"./assert":161,"./create":162,"./getTypeName":170,"./is":173,"./isArray":174,"./isFunction":176,"./isIdentity":177,"./isTypeName":185,"_process":146}],188:[function(require,module,exports){
(function (process){
var assert=require("./assert"),isFunction=require("./isFunction"),isType=require("./isType"),Any=require("./Any");module.exports=function(n){for(var i,e,r,s,t=1,u=arguments.length;u>t;)if(i=arguments[t],e=arguments[t+1],r=arguments[t+2],isFunction(r)&&!isType(r)?t+=3:(r=e,e=Any.is,t+=2),"production"!==process.env.NODE_ENV&&(s=(s||0)+1,assert(isType(i),function(){return"Invalid type in clause #"+s}),assert(isFunction(e),function(){return"Invalid guard in clause #"+s}),assert(isFunction(r),function(){return"Invalid block in clause #"+s})),i.is(n)&&e(n))return r(n);assert.fail("Match error")};

}).call(this,require('_process'))
},{"./Any":150,"./assert":161,"./isFunction":176,"./isType":184,"_process":146}],189:[function(require,module,exports){
(function (process){
function getDefaultName(e){return"?"+getTypeName(e)}function maybe(e,i){function r(i,t){return"production"!==process.env.NODE_ENV&&forbidNewOperator(this,r),Nil.is(i)?i:create(e,i,t)}if(isMaybe(e)||e===Any||e===Nil)return e;"production"!==process.env.NODE_ENV&&(assert(isFunction(e),function(){return"Invalid argument type "+assert.stringify(e)+" supplied to maybe(type, [name]) combinator (expected a type)"}),assert(isTypeName(i),function(){return"Invalid argument name "+assert.stringify(i)+" supplied to maybe(type, [name]) combinator (expected a string)"}));var t=i||getDefaultName(e);return r.meta={kind:"maybe",type:e,name:i,identity:isIdentity(e)},r.displayName=t,r.is=function(i){return Nil.is(i)||is(i,e)},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),isMaybe=require("./isMaybe"),isIdentity=require("./isIdentity"),Any=require("./Any"),create=require("./create"),Nil=require("./Nil"),forbidNewOperator=require("./forbidNewOperator"),is=require("./is"),getTypeName=require("./getTypeName");maybe.getDefaultName=getDefaultName,module.exports=maybe;

}).call(this,require('_process'))
},{"./Any":150,"./Nil":156,"./assert":161,"./create":162,"./forbidNewOperator":167,"./getTypeName":170,"./is":173,"./isFunction":176,"./isIdentity":177,"./isMaybe":178,"./isTypeName":185,"_process":146}],190:[function(require,module,exports){
(function (process){
var isNil=require("./isNil"),assert=require("./assert");module.exports=function(r,e,t){if(isNil(e))return r;for(var i in e)e.hasOwnProperty(i)&&(t!==!0&&"production"!==process.env.NODE_ENV&&assert(!r.hasOwnProperty(i),function(){return'Invalid call to mixin(target, source, [overwrite]): cannot overwrite property "'+i+'" of target object'}),r[i]=e[i]);return r};

}).call(this,require('_process'))
},{"./assert":161,"./isNil":179,"_process":146}],191:[function(require,module,exports){
(function (process){
function getDefaultName(e,t){return"{"+getTypeName(e)+" | "+getFunctionName(t)+"}"}function refinement(e,t,r){function n(r,a){"production"!==process.env.NODE_ENV&&(forbidNewOperator(this,n),a=a||[i]);var u=create(e,r,a);return"production"!==process.env.NODE_ENV&&assert(t(u),function(){return"Invalid value "+assert.stringify(r)+" supplied to "+a.join("/")}),u}"production"!==process.env.NODE_ENV&&(assert(isFunction(e),function(){return"Invalid argument type "+assert.stringify(e)+" supplied to refinement(type, predicate, [name]) combinator (expected a type)"}),assert(isFunction(t),function(){return"Invalid argument predicate supplied to refinement(type, predicate, [name]) combinator (expected a function)"}),assert(isTypeName(r),function(){return"Invalid argument name "+assert.stringify(r)+" supplied to refinement(type, predicate, [name]) combinator (expected a string)"}));var i=r||getDefaultName(e,t),a=isIdentity(e);return n.meta={kind:"subtype",type:e,predicate:t,name:r,identity:a},n.displayName=i,n.is=function(r){return is(r,e)&&t(r)},n.update=function(e,t){return n(assert.update(e,t))},n}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),forbidNewOperator=require("./forbidNewOperator"),isIdentity=require("./isIdentity"),create=require("./create"),is=require("./is"),getTypeName=require("./getTypeName"),getFunctionName=require("./getFunctionName");refinement.getDefaultName=getDefaultName,module.exports=refinement;

}).call(this,require('_process'))
},{"./assert":161,"./create":162,"./forbidNewOperator":167,"./getFunctionName":169,"./getTypeName":170,"./is":173,"./isFunction":176,"./isIdentity":177,"./isTypeName":185,"_process":146}],192:[function(require,module,exports){
module.exports=function(r){try{return JSON.stringify(r,null,2)}catch(t){return String(r)}};

},{}],193:[function(require,module,exports){
(function (process){
function getDefaultName(e){return"{"+Object.keys(e).map(function(t){return t+": "+getTypeName(e[t])}).join(", ")+"}"}function extend(e,t){"production"!==process.env.NODE_ENV&&assert(isArray(e)&&e.every(function(e){return isObject(e)||isStruct(e)}),function(){return"Invalid argument mixins supplied to extend(mixins, name), expected an array of objects or structs"});var r={},n={};e.forEach(function(e){isObject(e)?mixin(r,e):(mixin(r,e.meta.props),mixin(n,e.prototype))});var i=struct(r,t);return mixin(i.prototype,n),i}function struct(e,t){function r(t,i){if(r.is(t))return t;if("production"!==process.env.NODE_ENV&&(i=i||[n],assert(isObject(t),function(){return"Invalid value "+assert.stringify(t)+" supplied to "+i.join("/")+" (expected an object)"})),!(this instanceof r))return new r(t,i);for(var s in e)if(e.hasOwnProperty(s)){var u=e[s],a=t[s];this[s]=create(u,a,"production"!==process.env.NODE_ENV?i.concat(s+": "+getTypeName(u)):null)}"production"!==process.env.NODE_ENV&&Object.freeze(this)}"production"!==process.env.NODE_ENV&&(assert(dict(String,Function).is(e),function(){return"Invalid argument props "+assert.stringify(e)+" supplied to struct(props, [name]) combinator (expected a dictionary String -> Type)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to struct(props, [name]) combinator (expected a string)"}));var n=t||getDefaultName(e);return r.meta={kind:"struct",props:e,name:t,identity:!1},r.displayName=n,r.is=function(e){return e instanceof r},r.update=function(e,t){return new r(assert.update(e,t))},r.extend=function(e,t){return extend([r].concat(e),t)},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),String=require("./String"),Function=require("./Function"),isArray=require("./isArray"),isObject=require("./isObject"),create=require("./create"),mixin=require("./mixin"),isStruct=require("./isStruct"),getTypeName=require("./getTypeName"),dict=require("./dict");struct.getDefaultName=getDefaultName,struct.extend=extend,module.exports=struct;

}).call(this,require('_process'))
},{"./Function":155,"./String":160,"./assert":161,"./create":162,"./dict":164,"./getTypeName":170,"./isArray":174,"./isObject":181,"./isStruct":183,"./isTypeName":185,"./mixin":190,"_process":146}],194:[function(require,module,exports){
(function (process){
function getDefaultName(e){return"["+e.map(getTypeName).join(", ")+"]"}function tuple(e,t){function r(t,r){if("production"===process.env.NODE_ENV&&i)return t;"production"!==process.env.NODE_ENV&&(r=r||[n],assert(isArray(t)&&t.length===e.length,function(){return"Invalid value "+assert.stringify(t)+" supplied to "+r.join("/")+" (expected an array of length "+e.length+")"}));for(var a=!0,s=[],u=0,p=e.length;p>u;u++){var o=e[u],c=t[u],y=create(o,c,"production"!==process.env.NODE_ENV?r.concat(u+": "+getTypeName(o)):null);a=a&&c===y,s.push(y)}return a&&(s=t),"production"!==process.env.NODE_ENV&&Object.freeze(s),s}"production"!==process.env.NODE_ENV&&(assert(isArray(e)&&e.every(isFunction),function(){return"Invalid argument types "+assert.stringify(e)+" supplied to tuple(types, [name]) combinator (expected an array of types)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to tuple(types, [name]) combinator (expected a string)"}));var n=t||getDefaultName(e),i=e.every(isIdentity);return r.meta={kind:"tuple",types:e,name:t,identity:i},r.displayName=n,r.is=function(t){return isArray(t)&&t.length===e.length&&e.every(function(e,r){return is(t[r],e)})},r.update=function(e,t){return r(assert.update(e,t))},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),getTypeName=require("./getTypeName"),isIdentity=require("./isIdentity"),isArray=require("./isArray"),create=require("./create"),is=require("./is");tuple.getDefaultName=getDefaultName,module.exports=tuple;

}).call(this,require('_process'))
},{"./assert":161,"./create":162,"./getTypeName":170,"./is":173,"./isArray":174,"./isFunction":176,"./isIdentity":177,"./isTypeName":185,"_process":146}],195:[function(require,module,exports){
(function (process){
function getDefaultName(e){return e.map(getTypeName).join(" | ")}function union(e,r){function i(e,r){if("production"===process.env.NODE_ENV&&n)return e;var s=i.dispatch(e);return!s&&i.is(e)?e:("production"!==process.env.NODE_ENV&&(forbidNewOperator(this,i),r=r||[t],assert(isType(s),function(){return"Invalid value "+assert.stringify(e)+" supplied to "+r.join("/")+" (no constructor returned by dispatch)"}),r[r.length-1]+="("+getTypeName(s)+")"),create(s,e,r))}"production"!==process.env.NODE_ENV&&(assert(isArray(e)&&e.every(isFunction)&&e.length>=2,function(){return"Invalid argument types "+assert.stringify(e)+" supplied to union(types, [name]) combinator (expected an array of at least 2 types)"}),assert(isTypeName(r),function(){return"Invalid argument name "+assert.stringify(r)+" supplied to union(types, [name]) combinator (expected a string)"}));var t=r||getDefaultName(e),n=e.every(isIdentity);return i.meta={kind:"union",types:e,name:r,identity:n},i.displayName=t,i.is=function(r){return e.some(function(e){return is(r,e)})},i.dispatch=function(r){for(var i=0,t=e.length;t>i;i++){var n=e[i];if(isUnion(n)){var s=n.dispatch(r);if(!isNil(s))return s}else if(is(r,n))return n}},i.update=function(e,r){return i(assert.update(e,r))},i}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),getTypeName=require("./getTypeName"),isIdentity=require("./isIdentity"),isArray=require("./isArray"),create=require("./create"),is=require("./is"),forbidNewOperator=require("./forbidNewOperator"),isType=require("./isType"),isUnion=require("./isUnion"),isNil=require("./isNil");union.getDefaultName=getDefaultName,module.exports=union;

}).call(this,require('_process'))
},{"./assert":161,"./create":162,"./forbidNewOperator":167,"./getTypeName":170,"./is":173,"./isArray":174,"./isFunction":176,"./isIdentity":177,"./isNil":179,"./isType":184,"./isTypeName":185,"./isUnion":186,"_process":146}],196:[function(require,module,exports){
(function (process){
function getShallowCopy(e){return isArray(e)?e.concat():e instanceof Date||e instanceof RegExp?e:isObject(e)?mixin({},e):e}function update(e,t){"production"!==process.env.NODE_ENV&&assert(isObject(t),function(){return"Invalid argument patch "+assert.stringify(t)+" supplied to function update(instance, patch): expected an object containing commands"});var r=getShallowCopy(e),i=!1;for(var a in t)if(t.hasOwnProperty(a))if(update.commands.hasOwnProperty(a))r=update.commands[a](t[a],r),i=!0;else{var n=update(r[a],t[a]);i=i||n!==r[a],r[a]=n}return i?r:e}function $apply(e,t){return"production"!==process.env.NODE_ENV&&assert(isFunction(e),"Invalid argument f supplied to immutability helper { $apply: f } (expected a function)"),e(t)}function $push(e,t){return"production"!==process.env.NODE_ENV&&(assert(isArray(e),"Invalid argument elements supplied to immutability helper { $push: elements } (expected an array)"),assert(isArray(t),"Invalid value supplied to immutability helper $push (expected an array)")),t.concat(e)}function $remove(e,t){"production"!==process.env.NODE_ENV&&(assert(isArray(e),"Invalid argument keys supplied to immutability helper { $remove: keys } (expected an array)"),assert(isObject(t),"Invalid value supplied to immutability helper $remove (expected an object)"));for(var r=0,i=e.length;i>r;r++)delete t[e[r]];return t}function $set(e){return e}function $splice(e,t){return"production"!==process.env.NODE_ENV&&(assert(isArray(e)&&e.every(isArray),"Invalid argument splices supplied to immutability helper { $splice: splices } (expected an array of arrays)"),assert(isArray(t),"Invalid value supplied to immutability helper $splice (expected an array)")),e.reduce(function(e,t){return e.splice.apply(e,t),e},t)}function $swap(e,t){"production"!==process.env.NODE_ENV&&(assert(isObject(e),"Invalid argument config supplied to immutability helper { $swap: config } (expected an object)"),assert(isNumber(e.from),"Invalid argument config.from supplied to immutability helper { $swap: config } (expected a number)"),assert(isNumber(e.to),"Invalid argument config.to supplied to immutability helper { $swap: config } (expected a number)"),assert(isArray(t),"Invalid value supplied to immutability helper $swap (expected an array)"));var r=t[e.to];return t[e.to]=t[e.from],t[e.from]=r,t}function $unshift(e,t){return"production"!==process.env.NODE_ENV&&(assert(isArray(e),"Invalid argument elements supplied to immutability helper {$unshift: elements} (expected an array)"),assert(isArray(t),"Invalid value supplied to immutability helper $unshift (expected an array)")),e.concat(t)}function $merge(e,t){return mixin(mixin({},t),e,!0)}var assert=require("./assert"),isObject=require("./isObject"),isFunction=require("./isFunction"),isArray=require("./isArray"),isNumber=require("./isNumber"),mixin=require("./mixin");update.commands={$apply:$apply,$push:$push,$remove:$remove,$set:$set,$splice:$splice,$swap:$swap,$unshift:$unshift,$merge:$merge},module.exports=update;

}).call(this,require('_process'))
},{"./assert":161,"./isArray":174,"./isFunction":176,"./isNumber":180,"./isObject":181,"./mixin":190,"_process":146}],197:[function(require,module,exports){
module.exports=function(o){return o&&"object"==typeof o&&"function"==typeof o.copy&&"function"==typeof o.fill&&"function"==typeof o.readUInt8};

},{}],198:[function(require,module,exports){
(function (process,global){
function inspect(e,r){var t={seen:[],stylize:stylizeNoColor};return arguments.length>=3&&(t.depth=arguments[2]),arguments.length>=4&&(t.colors=arguments[3]),isBoolean(r)?t.showHidden=r:r&&exports._extend(t,r),isUndefined(t.showHidden)&&(t.showHidden=!1),isUndefined(t.depth)&&(t.depth=2),isUndefined(t.colors)&&(t.colors=!1),isUndefined(t.customInspect)&&(t.customInspect=!0),t.colors&&(t.stylize=stylizeWithColor),formatValue(t,e,t.depth)}function stylizeWithColor(e,r){var t=inspect.styles[r];return t?"["+inspect.colors[t][0]+"m"+e+"["+inspect.colors[t][1]+"m":e}function stylizeNoColor(e,r){return e}function arrayToHash(e){var r={};return e.forEach(function(e,t){r[e]=!0}),r}function formatValue(e,r,t){if(e.customInspect&&r&&isFunction(r.inspect)&&r.inspect!==exports.inspect&&(!r.constructor||r.constructor.prototype!==r)){var n=r.inspect(t,e);return isString(n)||(n=formatValue(e,n,t)),n}var i=formatPrimitive(e,r);if(i)return i;var o=Object.keys(r),s=arrayToHash(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(r)),isError(r)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return formatError(r);if(0===o.length){if(isFunction(r)){var u=r.name?": "+r.name:"";return e.stylize("[Function"+u+"]","special")}if(isRegExp(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(isDate(r))return e.stylize(Date.prototype.toString.call(r),"date");if(isError(r))return formatError(r)}var c="",a=!1,l=["{","}"];if(isArray(r)&&(a=!0,l=["[","]"]),isFunction(r)){var p=r.name?": "+r.name:"";c=" [Function"+p+"]"}if(isRegExp(r)&&(c=" "+RegExp.prototype.toString.call(r)),isDate(r)&&(c=" "+Date.prototype.toUTCString.call(r)),isError(r)&&(c=" "+formatError(r)),0===o.length&&(!a||0==r.length))return l[0]+c+l[1];if(0>t)return isRegExp(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special");e.seen.push(r);var f;return f=a?formatArray(e,r,t,s,o):o.map(function(n){return formatProperty(e,r,t,s,n,a)}),e.seen.pop(),reduceToSingleString(f,c,l)}function formatPrimitive(e,r){if(isUndefined(r))return e.stylize("undefined","undefined");if(isString(r)){var t="'"+JSON.stringify(r).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(t,"string")}return isNumber(r)?e.stylize(""+r,"number"):isBoolean(r)?e.stylize(""+r,"boolean"):isNull(r)?e.stylize("null","null"):void 0}function formatError(e){return"["+Error.prototype.toString.call(e)+"]"}function formatArray(e,r,t,n,i){for(var o=[],s=0,u=r.length;u>s;++s)hasOwnProperty(r,String(s))?o.push(formatProperty(e,r,t,n,String(s),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(formatProperty(e,r,t,n,i,!0))}),o}function formatProperty(e,r,t,n,i,o){var s,u,c;if(c=Object.getOwnPropertyDescriptor(r,i)||{value:r[i]},c.get?u=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(u=e.stylize("[Setter]","special")),hasOwnProperty(n,i)||(s="["+i+"]"),u||(e.seen.indexOf(c.value)<0?(u=isNull(t)?formatValue(e,c.value,null):formatValue(e,c.value,t-1),u.indexOf("\n")>-1&&(u=o?u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+u.split("\n").map(function(e){return"   "+e}).join("\n"))):u=e.stylize("[Circular]","special")),isUndefined(s)){if(o&&i.match(/^\d+$/))return u;s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+u}function reduceToSingleString(e,r,t){var n=0,i=e.reduce(function(e,r){return n++,r.indexOf("\n")>=0&&n++,e+r.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?t[0]+(""===r?"":r+"\n ")+" "+e.join(",\n  ")+" "+t[1]:t[0]+r+" "+e.join(", ")+" "+t[1]}function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isSymbol(e){return"symbol"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function isPrimitive(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function objectToString(e){return Object.prototype.toString.call(e)}function pad(e){return 10>e?"0"+e.toString(10):e.toString(10)}function timestamp(){var e=new Date,r=[pad(e.getHours()),pad(e.getMinutes()),pad(e.getSeconds())].join(":");return[e.getDate(),months[e.getMonth()],r].join(" ")}function hasOwnProperty(e,r){return Object.prototype.hasOwnProperty.call(e,r)}var formatRegExp=/%[sdj%]/g;exports.format=function(e){if(!isString(e)){for(var r=[],t=0;t<arguments.length;t++)r.push(inspect(arguments[t]));return r.join(" ")}for(var t=1,n=arguments,i=n.length,o=String(e).replace(formatRegExp,function(e){if("%%"===e)return"%";if(t>=i)return e;switch(e){case"%s":return String(n[t++]);case"%d":return Number(n[t++]);case"%j":try{return JSON.stringify(n[t++])}catch(r){return"[Circular]"}default:return e}}),s=n[t];i>t;s=n[++t])o+=isNull(s)||!isObject(s)?" "+s:" "+inspect(s);return o},exports.deprecate=function(e,r){function t(){if(!n){if(process.throwDeprecation)throw new Error(r);process.traceDeprecation?console.trace(r):console.error(r),n=!0}return e.apply(this,arguments)}if(isUndefined(global.process))return function(){return exports.deprecate(e,r).apply(this,arguments)};if(process.noDeprecation===!0)return e;var n=!1;return t};var debugs={},debugEnviron;exports.debuglog=function(e){if(isUndefined(debugEnviron)&&(debugEnviron=process.env.NODE_DEBUG||""),e=e.toUpperCase(),!debugs[e])if(new RegExp("\\b"+e+"\\b","i").test(debugEnviron)){var r=process.pid;debugs[e]=function(){var t=exports.format.apply(exports,arguments);console.error("%s %d: %s",e,r,t)}}else debugs[e]=function(){};return debugs[e]},exports.inspect=inspect,inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},inspect.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=require("./support/isBuffer");var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))},exports.inherits=require("inherits"),exports._extend=function(e,r){if(!r||!isObject(r))return e;for(var t=Object.keys(r),n=t.length;n--;)e[t[n]]=r[t[n]];return e};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":197,"_process":146,"inherits":45}],199:[function(require,module,exports){
var createElement=require("./vdom/create-element.js");module.exports=createElement;

},{"./vdom/create-element.js":205}],200:[function(require,module,exports){
var diff=require("./vtree/diff.js");module.exports=diff;

},{"./vtree/diff.js":225}],201:[function(require,module,exports){
var h=require("./virtual-hyperscript/index.js");module.exports=h;

},{"./virtual-hyperscript/index.js":212}],202:[function(require,module,exports){
var diff=require("./diff.js"),patch=require("./patch.js"),h=require("./h.js"),create=require("./create-element.js"),VNode=require("./vnode/vnode.js"),VText=require("./vnode/vtext.js");module.exports={diff:diff,patch:patch,h:h,create:create,VNode:VNode,VText:VText};

},{"./create-element.js":199,"./diff.js":200,"./h.js":201,"./patch.js":203,"./vnode/vnode.js":221,"./vnode/vtext.js":223}],203:[function(require,module,exports){
var patch=require("./vdom/patch.js");module.exports=patch;

},{"./vdom/patch.js":208}],204:[function(require,module,exports){
function applyProperties(o,t,e){for(var r in t){var i=t[r];void 0===i?removeProperty(o,r,i,e):isHook(i)?(removeProperty(o,r,i,e),i.hook&&i.hook(o,r,e?e[r]:void 0)):isObject(i)?patchObject(o,t,e,r,i):o[r]=i}}function removeProperty(o,t,e,r){if(r){var i=r[t];if(isHook(i))i.unhook&&i.unhook(o,t,e);else if("attributes"===t)for(var v in i)o.removeAttribute(v);else if("style"===t)for(var s in i)o.style[s]="";else"string"==typeof i?o[t]="":o[t]=null}}function patchObject(o,t,e,r,i){var v=e?e[r]:void 0;if("attributes"!==r){if(v&&isObject(v)&&getPrototype(v)!==getPrototype(i))return void(o[r]=i);isObject(o[r])||(o[r]={});var s="style"===r?"":void 0;for(var n in i){var p=i[n];o[r][n]=void 0===p?s:p}}else for(var c in i){var u=i[c];void 0===u?o.removeAttribute(c):o.setAttribute(c,u)}}function getPrototype(o){return Object.getPrototypeOf?Object.getPrototypeOf(o):o.__proto__?o.__proto__:o.constructor?o.constructor.prototype:void 0}var isObject=require("is-object"),isHook=require("../vnode/is-vhook.js");module.exports=applyProperties;

},{"../vnode/is-vhook.js":216,"is-object":46}],205:[function(require,module,exports){
function createElement(e,r){var t=r?r.document||document:document,n=r?r.warn:null;if(e=handleThunk(e).a,isWidget(e))return e.init();if(isVText(e))return t.createTextNode(e.text);if(!isVNode(e))return n&&n("Item is not a valid virtual dom node",e),null;var i=null===e.namespace?t.createElement(e.tagName):t.createElementNS(e.namespace,e.tagName),a=e.properties;applyProperties(i,a);for(var d=e.children,l=0;l<d.length;l++){var o=createElement(d[l],r);o&&i.appendChild(o)}return i}var document=require("global/document"),applyProperties=require("./apply-properties"),isVNode=require("../vnode/is-vnode.js"),isVText=require("../vnode/is-vtext.js"),isWidget=require("../vnode/is-widget.js"),handleThunk=require("../vnode/handle-thunk.js");module.exports=createElement;

},{"../vnode/handle-thunk.js":214,"../vnode/is-vnode.js":217,"../vnode/is-vtext.js":218,"../vnode/is-widget.js":219,"./apply-properties":204,"global/document":41}],206:[function(require,module,exports){
function domIndex(n,e,r,i){return r&&0!==r.length?(r.sort(ascending),recurse(n,e,r,i,0)):{}}function recurse(n,e,r,i,t){if(i=i||{},n){indexInRange(r,t,t)&&(i[t]=n);var d=e.children;if(d)for(var u=n.childNodes,o=0;o<e.children.length;o++){t+=1;var c=d[o]||noChild,f=t+(c.count||0);indexInRange(r,t,f)&&recurse(u[o],c,r,i,t),t=f}}return i}function indexInRange(n,e,r){if(0===n.length)return!1;for(var i,t,d=0,u=n.length-1;u>=d;){if(i=(u+d)/2>>0,t=n[i],d===u)return t>=e&&r>=t;if(e>t)d=i+1;else{if(!(t>r))return!0;u=i-1}}return!1}function ascending(n,e){return n>e?1:-1}var noChild={};module.exports=domIndex;

},{}],207:[function(require,module,exports){
function applyPatch(e,r,t){var a=e.type,n=e.vNode,o=e.patch;switch(a){case VPatch.REMOVE:return removeNode(r,n);case VPatch.INSERT:return insertNode(r,o,t);case VPatch.VTEXT:return stringPatch(r,n,o,t);case VPatch.WIDGET:return widgetPatch(r,n,o,t);case VPatch.VNODE:return vNodePatch(r,n,o,t);case VPatch.ORDER:return reorderChildren(r,o),r;case VPatch.PROPS:return applyProperties(r,o,n.properties),r;case VPatch.THUNK:return replaceRoot(r,t.patch(r,o,t));default:return r}}function removeNode(e,r){var t=e.parentNode;return t&&t.removeChild(e),destroyWidget(e,r),null}function insertNode(e,r,t){var a=t.render(r,t);return e&&e.appendChild(a),e}function stringPatch(e,r,t,a){var n;if(3===e.nodeType)e.replaceData(0,e.length,t.text),n=e;else{var o=e.parentNode;n=a.render(t,a),o&&n!==e&&o.replaceChild(n,e)}return n}function widgetPatch(e,r,t,a){var n,o=updateWidget(r,t);n=o?t.update(r,e)||e:a.render(t,a);var d=e.parentNode;return d&&n!==e&&d.replaceChild(n,e),o||destroyWidget(e,r),n}function vNodePatch(e,r,t,a){var n=e.parentNode,o=a.render(t,a);return n&&o!==e&&n.replaceChild(o,e),o}function destroyWidget(e,r){"function"==typeof r.destroy&&isWidget(r)&&r.destroy(e)}function reorderChildren(e,r){for(var t,a,n,o=e.childNodes,d={},i=0;i<r.removes.length;i++)a=r.removes[i],t=o[a.from],a.key&&(d[a.key]=t),e.removeChild(t);for(var c=o.length,p=0;p<r.inserts.length;p++)n=r.inserts[p],t=d[n.key],e.insertBefore(t,n.to>=c++?null:o[n.to])}function replaceRoot(e,r){return e&&r&&e!==r&&e.parentNode&&e.parentNode.replaceChild(r,e),r}var applyProperties=require("./apply-properties"),isWidget=require("../vnode/is-widget.js"),VPatch=require("../vnode/vpatch.js"),updateWidget=require("./update-widget");module.exports=applyPatch;

},{"../vnode/is-widget.js":219,"../vnode/vpatch.js":222,"./apply-properties":204,"./update-widget":209}],208:[function(require,module,exports){
function patch(r,e,t){return t=t||{},t.patch=t.patch&&t.patch!==patch?t.patch:patchRecursive,t.render=t.render||render,t.patch(r,e,t)}function patchRecursive(r,e,t){var a=patchIndices(e);if(0===a.length)return r;var n=domIndex(r,e.a,a),c=r.ownerDocument;t.document||c===document||(t.document=c);for(var p=0;p<a.length;p++){var u=a[p];r=applyPatch(r,n[u],e[u],t)}return r}function applyPatch(r,e,t,a){if(!e)return r;var n;if(isArray(t))for(var c=0;c<t.length;c++)n=patchOp(t[c],e,a),e===r&&(r=n);else n=patchOp(t,e,a),e===r&&(r=n);return r}function patchIndices(r){var e=[];for(var t in r)"a"!==t&&e.push(Number(t));return e}var document=require("global/document"),isArray=require("x-is-array"),render=require("./create-element"),domIndex=require("./dom-index"),patchOp=require("./patch-op");module.exports=patch;

},{"./create-element":205,"./dom-index":206,"./patch-op":207,"global/document":41,"x-is-array":227}],209:[function(require,module,exports){
function updateWidget(i,e){return isWidget(i)&&isWidget(e)?"name"in i&&"name"in e?i.id===e.id:i.init===e.init:!1}var isWidget=require("../vnode/is-widget.js");module.exports=updateWidget;

},{"../vnode/is-widget.js":219}],210:[function(require,module,exports){
"use strict";function EvHook(o){return this instanceof EvHook?void(this.value=o):new EvHook(o)}var EvStore=require("ev-store");module.exports=EvHook,EvHook.prototype.hook=function(o,t){var e=EvStore(o),r=t.substr(3);e[r]=this.value},EvHook.prototype.unhook=function(o,t){var e=EvStore(o),r=t.substr(3);e[r]=void 0};

},{"ev-store":40}],211:[function(require,module,exports){
"use strict";function SoftSetHook(o){return this instanceof SoftSetHook?void(this.value=o):new SoftSetHook(o)}module.exports=SoftSetHook,SoftSetHook.prototype.hook=function(o,t){o[t]!==this.value&&(o[t]=this.value)};

},{}],212:[function(require,module,exports){
"use strict";function h(e,r,i){var t,n,o,s,a=[];return!i&&isChildren(r)&&(i=r,n={}),n=n||r||{},t=parseTag(e,n),n.hasOwnProperty("key")&&(o=n.key,n.key=void 0),n.hasOwnProperty("namespace")&&(s=n.namespace,n.namespace=void 0),"INPUT"!==t||s||!n.hasOwnProperty("value")||void 0===n.value||isHook(n.value)||(n.value=softSetHook(n.value)),transformProperties(n),void 0!==i&&null!==i&&addChild(i,a,t,n),new VNode(t,n,a,o,s)}function addChild(e,r,i,t){if("string"==typeof e)r.push(new VText(e));else if("number"==typeof e)r.push(new VText(String(e)));else if(isChild(e))r.push(e);else{if(!isArray(e)){if(null===e||void 0===e)return;throw UnexpectedVirtualElement({foreignObject:e,parentVnode:{tagName:i,properties:t}})}for(var n=0;n<e.length;n++)addChild(e[n],r,i,t)}}function transformProperties(e){for(var r in e)if(e.hasOwnProperty(r)){var i=e[r];if(isHook(i))continue;"ev-"===r.substr(0,3)&&(e[r]=evHook(i))}}function isChild(e){return isVNode(e)||isVText(e)||isWidget(e)||isVThunk(e)}function isChildren(e){return"string"==typeof e||isArray(e)||isChild(e)}function UnexpectedVirtualElement(e){var r=new Error;return r.type="virtual-hyperscript.unexpected.virtual-element",r.message="Unexpected virtual child passed to h().\nExpected a VNode / Vthunk / VWidget / string but:\ngot:\n"+errorString(e.foreignObject)+".\nThe parent vnode is:\n"+errorString(e.parentVnode),r.foreignObject=e.foreignObject,r.parentVnode=e.parentVnode,r}function errorString(e){try{return JSON.stringify(e,null,"    ")}catch(r){return String(e)}}var isArray=require("x-is-array"),VNode=require("../vnode/vnode.js"),VText=require("../vnode/vtext.js"),isVNode=require("../vnode/is-vnode"),isVText=require("../vnode/is-vtext"),isWidget=require("../vnode/is-widget"),isHook=require("../vnode/is-vhook"),isVThunk=require("../vnode/is-thunk"),parseTag=require("./parse-tag.js"),softSetHook=require("./hooks/soft-set-hook.js"),evHook=require("./hooks/ev-hook.js");module.exports=h;

},{"../vnode/is-thunk":215,"../vnode/is-vhook":216,"../vnode/is-vnode":217,"../vnode/is-vtext":218,"../vnode/is-widget":219,"../vnode/vnode.js":221,"../vnode/vtext.js":223,"./hooks/ev-hook.js":210,"./hooks/soft-set-hook.js":211,"./parse-tag.js":213,"x-is-array":227}],213:[function(require,module,exports){
"use strict";function parseTag(s,a){if(!s)return"DIV";var t=!a.hasOwnProperty("id"),e=split(s,classIdSplit),r=null;notClassId.test(e[1])&&(r="DIV");var l,n,i,p;for(p=0;p<e.length;p++)n=e[p],n&&(i=n.charAt(0),r?"."===i?(l=l||[],l.push(n.substring(1,n.length))):"#"===i&&t&&(a.id=n.substring(1,n.length)):r=n);return l&&(a.className&&l.push(a.className),a.className=l.join(" ")),a.namespace?r:r.toUpperCase()}var split=require("browser-split"),classIdSplit=/([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/,notClassId=/^\.|#/;module.exports=parseTag;

},{"browser-split":5}],214:[function(require,module,exports){
function handleThunk(e,n){var r=e,i=n;return isThunk(n)&&(i=renderThunk(n,e)),isThunk(e)&&(r=renderThunk(e,null)),{a:r,b:i}}function renderThunk(e,n){var r=e.vnode;if(r||(r=e.vnode=e.render(n)),!(isVNode(r)||isVText(r)||isWidget(r)))throw new Error("thunk did not return a valid node");return r}var isVNode=require("./is-vnode"),isVText=require("./is-vtext"),isWidget=require("./is-widget"),isThunk=require("./is-thunk");module.exports=handleThunk;

},{"./is-thunk":215,"./is-vnode":217,"./is-vtext":218,"./is-widget":219}],215:[function(require,module,exports){
function isThunk(n){return n&&"Thunk"===n.type}module.exports=isThunk;

},{}],216:[function(require,module,exports){
function isHook(o){return o&&("function"==typeof o.hook&&!o.hasOwnProperty("hook")||"function"==typeof o.unhook&&!o.hasOwnProperty("unhook"))}module.exports=isHook;

},{}],217:[function(require,module,exports){
function isVirtualNode(e){return e&&"VirtualNode"===e.type&&e.version===version}var version=require("./version");module.exports=isVirtualNode;

},{"./version":220}],218:[function(require,module,exports){
function isVirtualText(e){return e&&"VirtualText"===e.type&&e.version===version}var version=require("./version");module.exports=isVirtualText;

},{"./version":220}],219:[function(require,module,exports){
function isWidget(e){return e&&"Widget"===e.type}module.exports=isWidget;

},{}],220:[function(require,module,exports){
module.exports="2";

},{}],221:[function(require,module,exports){
function VirtualNode(e,i,o,s,r){this.tagName=e,this.properties=i||noProperties,this.children=o||noChildren,this.key=null!=s?String(s):void 0,this.namespace="string"==typeof r?r:null;var t,n=o&&o.length||0,h=0,a=!1,d=!1,u=!1;for(var k in i)if(i.hasOwnProperty(k)){var l=i[k];isVHook(l)&&l.unhook&&(t||(t={}),t[k]=l)}for(var p=0;n>p;p++){var v=o[p];isVNode(v)?(h+=v.count||0,!a&&v.hasWidgets&&(a=!0),!d&&v.hasThunks&&(d=!0),u||!v.hooks&&!v.descendantHooks||(u=!0)):!a&&isWidget(v)?"function"==typeof v.destroy&&(a=!0):!d&&isThunk(v)&&(d=!0)}this.count=n+h,this.hasWidgets=a,this.hasThunks=d,this.hooks=t,this.descendantHooks=u}var version=require("./version"),isVNode=require("./is-vnode"),isWidget=require("./is-widget"),isThunk=require("./is-thunk"),isVHook=require("./is-vhook");module.exports=VirtualNode;var noProperties={},noChildren=[];VirtualNode.prototype.version=version,VirtualNode.prototype.type="VirtualNode";

},{"./is-thunk":215,"./is-vhook":216,"./is-vnode":217,"./is-widget":219,"./version":220}],222:[function(require,module,exports){
function VirtualPatch(t,a,r){this.type=Number(t),this.vNode=a,this.patch=r}var version=require("./version");VirtualPatch.NONE=0,VirtualPatch.VTEXT=1,VirtualPatch.VNODE=2,VirtualPatch.WIDGET=3,VirtualPatch.PROPS=4,VirtualPatch.ORDER=5,VirtualPatch.INSERT=6,VirtualPatch.REMOVE=7,VirtualPatch.THUNK=8,module.exports=VirtualPatch,VirtualPatch.prototype.version=version,VirtualPatch.prototype.type="VirtualPatch";

},{"./version":220}],223:[function(require,module,exports){
function VirtualText(t){this.text=String(t)}var version=require("./version");module.exports=VirtualText,VirtualText.prototype.version=version,VirtualText.prototype.type="VirtualText";

},{"./version":220}],224:[function(require,module,exports){
function diffProps(o,t){var e;for(var r in o){r in t||(e=e||{},e[r]=void 0);var i=o[r],f=t[r];if(i!==f)if(isObject(i)&&isObject(f))if(getPrototype(f)!==getPrototype(i))e=e||{},e[r]=f;else if(isHook(f))e=e||{},e[r]=f;else{var s=diffProps(i,f);s&&(e=e||{},e[r]=s)}else e=e||{},e[r]=f}for(var n in t)n in o||(e=e||{},e[n]=t[n]);return e}function getPrototype(o){return Object.getPrototypeOf?Object.getPrototypeOf(o):o.__proto__?o.__proto__:o.constructor?o.constructor.prototype:void 0}var isObject=require("is-object"),isHook=require("../vnode/is-vhook");module.exports=diffProps;

},{"../vnode/is-vhook":216,"is-object":46}],225:[function(require,module,exports){
function diff(e,n){var t={a:e};return walk(e,n,t,0),t}function walk(e,n,t,r){if(e!==n){var h=t[r],a=!1;if(isThunk(e)||isThunk(n))thunks(e,n,t,r);else if(null==n)isWidget(e)||(clearState(e,t,r),h=t[r]),h=appendPatch(h,new VPatch(VPatch.REMOVE,e,n));else if(isVNode(n))if(isVNode(e))if(e.tagName===n.tagName&&e.namespace===n.namespace&&e.key===n.key){var i=diffProps(e.properties,n.properties);i&&(h=appendPatch(h,new VPatch(VPatch.PROPS,e,i))),h=diffChildren(e,n,t,h,r)}else h=appendPatch(h,new VPatch(VPatch.VNODE,e,n)),a=!0;else h=appendPatch(h,new VPatch(VPatch.VNODE,e,n)),a=!0;else isVText(n)?isVText(e)?e.text!==n.text&&(h=appendPatch(h,new VPatch(VPatch.VTEXT,e,n))):(h=appendPatch(h,new VPatch(VPatch.VTEXT,e,n)),a=!0):isWidget(n)&&(isWidget(e)||(a=!0),h=appendPatch(h,new VPatch(VPatch.WIDGET,e,n)));h&&(t[r]=h),a&&clearState(e,t,r)}}function diffChildren(e,n,t,r,h){for(var a=e.children,i=reorder(a,n.children),s=i.children,o=a.length,u=s.length,c=o>u?o:u,d=0;c>d;d++){var l=a[d],f=s[d];h+=1,l?walk(l,f,t,h):f&&(r=appendPatch(r,new VPatch(VPatch.INSERT,null,f))),isVNode(l)&&l.count&&(h+=l.count)}return i.moves&&(r=appendPatch(r,new VPatch(VPatch.ORDER,e,i.moves))),r}function clearState(e,n,t){unhook(e,n,t),destroyWidgets(e,n,t)}function destroyWidgets(e,n,t){if(isWidget(e))"function"==typeof e.destroy&&(n[t]=appendPatch(n[t],new VPatch(VPatch.REMOVE,e,null)));else if(isVNode(e)&&(e.hasWidgets||e.hasThunks))for(var r=e.children,h=r.length,a=0;h>a;a++){var i=r[a];t+=1,destroyWidgets(i,n,t),isVNode(i)&&i.count&&(t+=i.count)}else isThunk(e)&&thunks(e,null,n,t)}function thunks(e,n,t,r){var h=handleThunk(e,n),a=diff(h.a,h.b);hasPatches(a)&&(t[r]=new VPatch(VPatch.THUNK,null,a))}function hasPatches(e){for(var n in e)if("a"!==n)return!0;return!1}function unhook(e,n,t){if(isVNode(e)){if(e.hooks&&(n[t]=appendPatch(n[t],new VPatch(VPatch.PROPS,e,undefinedKeys(e.hooks)))),e.descendantHooks||e.hasThunks)for(var r=e.children,h=r.length,a=0;h>a;a++){var i=r[a];t+=1,unhook(i,n,t),isVNode(i)&&i.count&&(t+=i.count)}}else isThunk(e)&&thunks(e,null,n,t)}function undefinedKeys(e){var n={};for(var t in e)n[t]=void 0;return n}function reorder(e,n){var t=keyIndex(n),r=t.keys,h=t.free;if(h.length===n.length)return{children:n,moves:null};var a=keyIndex(e),i=a.keys,s=a.free;if(s.length===e.length)return{children:n,moves:null};for(var o=[],u=0,c=h.length,d=0,l=0;l<e.length;l++){var f,k=e[l];k.key?r.hasOwnProperty(k.key)?(f=r[k.key],o.push(n[f])):(f=l-d++,o.push(null)):c>u?(f=h[u++],o.push(n[f])):(f=l-d++,o.push(null))}for(var p=u>=h.length?n.length:h[u],P=0;P<n.length;P++){var v=n[P];v.key?i.hasOwnProperty(v.key)||o.push(v):P>=p&&o.push(v)}for(var y,V=o.slice(),g=0,T=[],m=[],w=0;w<n.length;){var N=n[w];for(y=V[g];null===y&&V.length;)T.push(remove(V,g,null)),y=V[g];y&&y.key===N.key?(g++,w++):N.key?(y&&y.key&&r[y.key]!==w+1?(T.push(remove(V,g,y.key)),y=V[g],y&&y.key===N.key?g++:m.push({key:N.key,to:w})):m.push({key:N.key,to:w}),w++):y&&y.key&&T.push(remove(V,g,y.key))}for(;g<V.length;)y=V[g],T.push(remove(V,g,y&&y.key));return T.length!==d||m.length?{children:o,moves:{removes:T,inserts:m}}:{children:o,moves:null}}function remove(e,n,t){return e.splice(n,1),{from:n,key:t}}function keyIndex(e){for(var n={},t=[],r=e.length,h=0;r>h;h++){var a=e[h];a.key?n[a.key]=h:t.push(h)}return{keys:n,free:t}}function appendPatch(e,n){return e?(isArray(e)?e.push(n):e=[e,n],e):n}var isArray=require("x-is-array"),VPatch=require("../vnode/vpatch"),isVNode=require("../vnode/is-vnode"),isVText=require("../vnode/is-vtext"),isWidget=require("../vnode/is-widget"),isThunk=require("../vnode/is-thunk"),handleThunk=require("../vnode/handle-thunk"),diffProps=require("./diff-props");module.exports=diff;

},{"../vnode/handle-thunk":214,"../vnode/is-thunk":215,"../vnode/is-vnode":217,"../vnode/is-vtext":218,"../vnode/is-widget":219,"../vnode/vpatch":222,"./diff-props":224,"x-is-array":227}],226:[function(require,module,exports){
function virtualRaf(e,t,r){function n(){return i=t(e),o=r.create(i)}function a(e){assert.ifError(u,"infinite loop detected"),null!==l||f||(f=!0,raf(function(){if(f=!1,l){u=!0;var e=t(l);const n=r.diff(i,e);u=!1,o=r.patch(o,n),i=e,l=null}})),l=e}e=e||{},assert.equal(typeof e,"object"),assert.equal(typeof t,"function"),assert.equal(typeof r,"object");var u=!1,f=!1,l=null,o=null,i=null;return{render:n,update:a}}const assert=require("assert"),raf=require("raf");module.exports=virtualRaf;

},{"assert":3,"raf":147}],227:[function(require,module,exports){
function isArray(r){return"[object Array]"===toString.call(r)}var nativeIsArray=Array.isArray,toString=Object.prototype.toString;module.exports=nativeIsArray||isArray;

},{}],228:[function(require,module,exports){
"use strict";function view(e,r){var i=getType(r.type,r.value),u=getViewFromType(i);t.assert(!t.Nil.is(u),"cannot find view from type or kind");var n=r.layout||defaultLayout,a=n(u,r);return a(e,Props.update(r,{type:{$set:i}}))}function defaultLayout(e,t){return e}function getType(e,t){return"union"===e.meta.kind?e.dispatch(t):e}function getViewFromType(e){var t=e.meta.kind,r=e.view||defaultViews[e]||defaultViews[t]||null;return r}var t=require("tcomb"),_require=require("./types"),H=_require.H,Props=_require.Props,View=_require.View;module.exports=View.of(view,!0);var defaultViews=require("./views");

},{"./types":374,"./views":376,"tcomb":326}],229:[function(require,module,exports){
function Hash(){}var nativeCreate=require("./_nativeCreate"),objectProto=Object.prototype;Hash.prototype=nativeCreate?nativeCreate(null):objectProto,module.exports=Hash;

},{"./_nativeCreate":293}],230:[function(require,module,exports){
var getNative=require("./_getNative"),root=require("./_root"),Map=getNative(root,"Map");module.exports=Map;

},{"./_getNative":273,"./_root":295}],231:[function(require,module,exports){
function MapCache(e){var a=-1,p=e?e.length:0;for(this.clear();++a<p;){var t=e[a];this.set(t[0],t[1])}}var mapClear=require("./_mapClear"),mapDelete=require("./_mapDelete"),mapGet=require("./_mapGet"),mapHas=require("./_mapHas"),mapSet=require("./_mapSet");MapCache.prototype.clear=mapClear,MapCache.prototype["delete"]=mapDelete,MapCache.prototype.get=mapGet,MapCache.prototype.has=mapHas,MapCache.prototype.set=mapSet,module.exports=MapCache;

},{"./_mapClear":287,"./_mapDelete":288,"./_mapGet":289,"./_mapHas":290,"./_mapSet":291}],232:[function(require,module,exports){
var getNative=require("./_getNative"),root=require("./_root"),Set=getNative(root,"Set");module.exports=Set;

},{"./_getNative":273,"./_root":295}],233:[function(require,module,exports){
function Stack(t){var e=-1,a=t?t.length:0;for(this.clear();++e<a;){var c=t[e];this.set(c[0],c[1])}}var stackClear=require("./_stackClear"),stackDelete=require("./_stackDelete"),stackGet=require("./_stackGet"),stackHas=require("./_stackHas"),stackSet=require("./_stackSet");Stack.prototype.clear=stackClear,Stack.prototype["delete"]=stackDelete,Stack.prototype.get=stackGet,Stack.prototype.has=stackHas,Stack.prototype.set=stackSet,module.exports=Stack;

},{"./_stackClear":297,"./_stackDelete":298,"./_stackGet":299,"./_stackHas":300,"./_stackSet":301}],234:[function(require,module,exports){
var root=require("./_root"),Symbol=root.Symbol;module.exports=Symbol;

},{"./_root":295}],235:[function(require,module,exports){
var root=require("./_root"),Uint8Array=root.Uint8Array;module.exports=Uint8Array;

},{"./_root":295}],236:[function(require,module,exports){
var getNative=require("./_getNative"),root=require("./_root"),WeakMap=getNative(root,"WeakMap");module.exports=WeakMap;

},{"./_getNative":273,"./_root":295}],237:[function(require,module,exports){
function arrayMap(r,a){for(var e=-1,n=r.length,o=Array(n);++e<n;)o[e]=a(r[e],e,r);return o}module.exports=arrayMap;

},{}],238:[function(require,module,exports){
function arraySome(r,e){for(var o=-1,a=r.length;++o<a;)if(e(r[o],o,r))return!0;return!1}module.exports=arraySome;

},{}],239:[function(require,module,exports){
function assocDelete(e,r){var o=assocIndexOf(e,r);if(0>o)return!1;var a=e.length-1;return o==a?e.pop():splice.call(e,o,1),!0}var assocIndexOf=require("./_assocIndexOf"),arrayProto=Array.prototype,splice=arrayProto.splice;module.exports=assocDelete;

},{"./_assocIndexOf":242}],240:[function(require,module,exports){
function assocGet(s,e){var o=assocIndexOf(s,e);return 0>o?void 0:s[o][1]}var assocIndexOf=require("./_assocIndexOf");module.exports=assocGet;

},{"./_assocIndexOf":242}],241:[function(require,module,exports){
function assocHas(s,a){return assocIndexOf(s,a)>-1}var assocIndexOf=require("./_assocIndexOf");module.exports=assocHas;

},{"./_assocIndexOf":242}],242:[function(require,module,exports){
function assocIndexOf(e,r){for(var n=e.length;n--;)if(eq(e[n][0],r))return n;return-1}var eq=require("./eq");module.exports=assocIndexOf;

},{"./eq":303}],243:[function(require,module,exports){
function assocSet(s,e,o){var a=assocIndexOf(s,e);0>a?s.push([e,o]):s[a][1]=o}var assocIndexOf=require("./_assocIndexOf");module.exports=assocSet;

},{"./_assocIndexOf":242}],244:[function(require,module,exports){
function baseCastPath(r){return isArray(r)?r:stringToPath(r)}var isArray=require("./isArray"),stringToPath=require("./_stringToPath");module.exports=baseCastPath;

},{"./_stringToPath":302,"./isArray":309}],245:[function(require,module,exports){
var baseForOwn=require("./_baseForOwn"),createBaseEach=require("./_createBaseEach"),baseEach=createBaseEach(baseForOwn);module.exports=baseEach;

},{"./_baseForOwn":248,"./_createBaseEach":266}],246:[function(require,module,exports){
function baseFindIndex(e,n,r){for(var d=e.length,t=r?d:-1;r?t--:++t<d;)if(n(e[t],t,e))return t;return-1}module.exports=baseFindIndex;

},{}],247:[function(require,module,exports){
var createBaseFor=require("./_createBaseFor"),baseFor=createBaseFor();module.exports=baseFor;

},{"./_createBaseFor":267}],248:[function(require,module,exports){
function baseForOwn(e,r){return e&&baseFor(e,r,keys)}var baseFor=require("./_baseFor"),keys=require("./keys");module.exports=baseForOwn;

},{"./_baseFor":247,"./keys":320}],249:[function(require,module,exports){
function baseGet(e,a){a=isKey(a,e)?[a+""]:baseCastPath(a);for(var s=0,t=a.length;null!=e&&t>s;)e=e[a[s++]];return s&&s==t?e:void 0}var baseCastPath=require("./_baseCastPath"),isKey=require("./_isKey");module.exports=baseGet;

},{"./_baseCastPath":244,"./_isKey":283}],250:[function(require,module,exports){
function baseHas(t,o){return hasOwnProperty.call(t,o)||"object"==typeof t&&o in t&&null===getPrototypeOf(t)}var objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,getPrototypeOf=Object.getPrototypeOf;module.exports=baseHas;

},{}],251:[function(require,module,exports){
function baseHasIn(e,n){return n in Object(e)}module.exports=baseHasIn;

},{}],252:[function(require,module,exports){
function baseIsEqual(e,s,u,a,i){return e===s?!0:null==e||null==s||!isObject(e)&&!isObjectLike(s)?e!==e&&s!==s:baseIsEqualDeep(e,s,baseIsEqual,u,a,i)}var baseIsEqualDeep=require("./_baseIsEqualDeep"),isObject=require("./isObject"),isObjectLike=require("./isObjectLike");module.exports=baseIsEqual;

},{"./_baseIsEqualDeep":253,"./isObject":315,"./isObjectLike":316}],253:[function(require,module,exports){
function baseIsEqualDeep(e,r,a,t,s,c){var o=isArray(e),u=isArray(r),g=arrayTag,y=arrayTag;o||(g=getTag(e),g=g==argsTag?objectTag:g),u||(y=getTag(r),y=y==argsTag?objectTag:y);var i=g==objectTag&&!isHostObject(e),T=y==objectTag&&!isHostObject(r),b=g==y;if(b&&!i)return c||(c=new Stack),o||isTypedArray(e)?equalArrays(e,r,a,t,s,c):equalByTag(e,r,g,a,t,s,c);if(!(s&PARTIAL_COMPARE_FLAG)){var A=i&&hasOwnProperty.call(e,"__wrapped__"),j=T&&hasOwnProperty.call(r,"__wrapped__");if(A||j)return c||(c=new Stack),a(A?e.value():e,j?r.value():r,t,s,c)}return b?(c||(c=new Stack),equalObjects(e,r,a,t,s,c)):!1}var Stack=require("./_Stack"),equalArrays=require("./_equalArrays"),equalByTag=require("./_equalByTag"),equalObjects=require("./_equalObjects"),getTag=require("./_getTag"),isArray=require("./isArray"),isHostObject=require("./_isHostObject"),isTypedArray=require("./isTypedArray"),PARTIAL_COMPARE_FLAG=2,argsTag="[object Arguments]",arrayTag="[object Array]",objectTag="[object Object]",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=baseIsEqualDeep;

},{"./_Stack":233,"./_equalArrays":268,"./_equalByTag":269,"./_equalObjects":270,"./_getTag":274,"./_isHostObject":281,"./isArray":309,"./isTypedArray":319}],254:[function(require,module,exports){
function baseIsMatch(r,e,a,t){var i=a.length,u=i,n=!t;if(null==r)return!u;for(r=Object(r);i--;){var s=a[i];if(n&&s[2]?s[1]!==r[s[0]]:!(s[0]in r))return!1}for(;++i<u;){s=a[i];var A=s[0],E=r[A],R=s[1];if(n&&s[2]){if(void 0===E&&!(A in r))return!1}else{var _=new Stack,f=t?t(E,R,A,r,e,_):void 0;if(!(void 0===f?baseIsEqual(R,E,t,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG,_):f))return!1}}return!0}var Stack=require("./_Stack"),baseIsEqual=require("./_baseIsEqual"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2;module.exports=baseIsMatch;

},{"./_Stack":233,"./_baseIsEqual":252}],255:[function(require,module,exports){
function baseIteratee(e){var r=typeof e;return"function"==r?e:null==e?identity:"object"==r?isArray(e)?baseMatchesProperty(e[0],e[1]):baseMatches(e):property(e)}var baseMatches=require("./_baseMatches"),baseMatchesProperty=require("./_baseMatchesProperty"),identity=require("./identity"),isArray=require("./isArray"),property=require("./property");module.exports=baseIteratee;

},{"./_baseMatches":258,"./_baseMatchesProperty":259,"./identity":307,"./isArray":309,"./property":323}],256:[function(require,module,exports){
function baseKeys(e){return nativeKeys(Object(e))}var nativeKeys=Object.keys;module.exports=baseKeys;

},{}],257:[function(require,module,exports){
function baseMap(r,a){var e=-1,i=isArrayLike(r)?Array(r.length):[];return baseEach(r,function(r,s,n){i[++e]=a(r,s,n)}),i}var baseEach=require("./_baseEach"),isArrayLike=require("./isArrayLike");module.exports=baseMap;

},{"./_baseEach":245,"./isArrayLike":310}],258:[function(require,module,exports){
function baseMatches(t){var a=getMatchData(t);if(1==a.length&&a[0][2]){var e=a[0][0],r=a[0][1];return function(t){return null==t?!1:t[e]===r&&(void 0!==r||e in Object(t))}}return function(e){return e===t||baseIsMatch(e,t,a)}}var baseIsMatch=require("./_baseIsMatch"),getMatchData=require("./_getMatchData");module.exports=baseMatches;

},{"./_baseIsMatch":254,"./_getMatchData":272}],259:[function(require,module,exports){
function baseMatchesProperty(e,r){return function(a){var s=get(a,e);return void 0===s&&s===r?hasIn(a,e):baseIsEqual(r,s,void 0,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG)}}var baseIsEqual=require("./_baseIsEqual"),get=require("./get"),hasIn=require("./hasIn"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2;module.exports=baseMatchesProperty;

},{"./_baseIsEqual":252,"./get":305,"./hasIn":306}],260:[function(require,module,exports){
function baseProperty(r){return function(e){return null==e?void 0:e[r]}}module.exports=baseProperty;

},{}],261:[function(require,module,exports){
function basePropertyDeep(e){return function(r){return baseGet(r,e)}}var baseGet=require("./_baseGet");module.exports=basePropertyDeep;

},{"./_baseGet":249}],262:[function(require,module,exports){
function baseSlice(e,r,a){var l=-1,n=e.length;0>r&&(r=-r>n?0:n+r),a=a>n?n:a,0>a&&(a+=n),n=r>a?0:a-r>>>0,r>>>=0;for(var o=Array(n);++l<n;)o[l]=e[l+r];return o}module.exports=baseSlice;

},{}],263:[function(require,module,exports){
function baseTimes(e,r){for(var s=-1,a=Array(e);++s<e;)a[s]=r(s);return a}module.exports=baseTimes;

},{}],264:[function(require,module,exports){
function baseToPairs(r,a){return arrayMap(a,function(a){return[a,r[a]]})}var arrayMap=require("./_arrayMap");module.exports=baseToPairs;

},{"./_arrayMap":237}],265:[function(require,module,exports){
function checkGlobal(c){return c&&c.Object===Object?c:null}module.exports=checkGlobal;

},{}],266:[function(require,module,exports){
function createBaseEach(r,e){return function(a,i){if(null==a)return a;if(!isArrayLike(a))return r(a,i);for(var t=a.length,n=e?t:-1,u=Object(a);(e?n--:++n<t)&&i(u[n],n,u)!==!1;);return a}}var isArrayLike=require("./isArrayLike");module.exports=createBaseEach;

},{"./isArrayLike":310}],267:[function(require,module,exports){
function createBaseFor(e){return function(r,t,a){for(var n=-1,o=Object(r),c=a(r),u=c.length;u--;){var f=c[e?u:++n];if(t(o[f],f,o)===!1)break}return r}}module.exports=createBaseFor;

},{}],268:[function(require,module,exports){
function equalArrays(r,e,a,A,i,t){var n=-1,f=i&PARTIAL_COMPARE_FLAG,u=i&UNORDERED_COMPARE_FLAG,o=r.length,R=e.length;if(o!=R&&!(f&&R>o))return!1;var _=t.get(r);if(_)return _==e;var E=!0;for(t.set(r,e);++n<o;){var l=r[n],v=e[n];if(A)var L=f?A(v,l,n,e,r,t):A(l,v,n,r,e,t);if(void 0!==L){if(L)continue;E=!1;break}if(u){if(!arraySome(e,function(r){return l===r||a(l,r,A,i,t)})){E=!1;break}}else if(l!==v&&!a(l,v,A,i,t)){E=!1;break}}return t["delete"](r),E}var arraySome=require("./_arraySome"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2;module.exports=equalArrays;

},{"./_arraySome":238}],269:[function(require,module,exports){
function equalByTag(e,r,a,o,t,s,y){switch(a){case arrayBufferTag:return!(e.byteLength!=r.byteLength||!o(new Uint8Array(e),new Uint8Array(r)));case boolTag:case dateTag:return+e==+r;case errorTag:return e.name==r.name&&e.message==r.message;case numberTag:return e!=+e?r!=+r:e==+r;case regexpTag:case stringTag:return e==r+"";case mapTag:var g=mapToArray;case setTag:var l=s&PARTIAL_COMPARE_FLAG;if(g||(g=setToArray),e.size!=r.size&&!l)return!1;var u=y.get(e);return u?u==r:equalArrays(g(e),g(r),o,t,s|UNORDERED_COMPARE_FLAG,y.set(e,r));case symbolTag:if(symbolValueOf)return symbolValueOf.call(e)==symbolValueOf.call(r)}return!1}var Symbol=require("./_Symbol"),Uint8Array=require("./_Uint8Array"),equalArrays=require("./_equalArrays"),mapToArray=require("./_mapToArray"),setToArray=require("./_setToArray"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2,boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",mapTag="[object Map]",numberTag="[object Number]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",symbolTag="[object Symbol]",arrayBufferTag="[object ArrayBuffer]",symbolProto=Symbol?Symbol.prototype:void 0,symbolValueOf=symbolProto?symbolProto.valueOf:void 0;module.exports=equalByTag;

},{"./_Symbol":234,"./_Uint8Array":235,"./_equalArrays":268,"./_mapToArray":292,"./_setToArray":296}],270:[function(require,module,exports){
function equalObjects(r,e,t,n,o,a){var s=o&PARTIAL_COMPARE_FLAG,c=keys(r),i=c.length,u=keys(e),f=u.length;if(i!=f&&!s)return!1;for(var v=i;v--;){var A=c[v];if(!(s?A in e:baseHas(e,A)))return!1}var b=a.get(r);if(b)return b==e;var l=!0;a.set(r,e);for(var y=s;++v<i;){A=c[v];var k=r[A],_=e[A];if(n)var q=s?n(_,k,A,e,r,a):n(k,_,A,r,e,a);if(!(void 0===q?k===_||t(k,_,n,o,a):q)){l=!1;break}y||(y="constructor"==A)}if(l&&!y){var L=r.constructor,O=e.constructor;L!=O&&"constructor"in r&&"constructor"in e&&!("function"==typeof L&&L instanceof L&&"function"==typeof O&&O instanceof O)&&(l=!1)}return a["delete"](r),l}var baseHas=require("./_baseHas"),keys=require("./keys"),PARTIAL_COMPARE_FLAG=2;module.exports=equalObjects;

},{"./_baseHas":250,"./keys":320}],271:[function(require,module,exports){
var baseProperty=require("./_baseProperty"),getLength=baseProperty("length");module.exports=getLength;

},{"./_baseProperty":260}],272:[function(require,module,exports){
function getMatchData(r){for(var t=toPairs(r),a=t.length;a--;)t[a][2]=isStrictComparable(t[a][1]);return t}var isStrictComparable=require("./_isStrictComparable"),toPairs=require("./toPairs");module.exports=getMatchData;

},{"./_isStrictComparable":286,"./toPairs":324}],273:[function(require,module,exports){
function getNative(e,i){var t=e[i];return isNative(t)?t:void 0}var isNative=require("./isNative");module.exports=getNative;

},{"./isNative":314}],274:[function(require,module,exports){
function getTag(t){return objectToString.call(t)}var Map=require("./_Map"),Set=require("./_Set"),WeakMap=require("./_WeakMap"),mapTag="[object Map]",objectTag="[object Object]",setTag="[object Set]",weakMapTag="[object WeakMap]",objectProto=Object.prototype,funcToString=Function.prototype.toString,objectToString=objectProto.toString,mapCtorString=Map?funcToString.call(Map):"",setCtorString=Set?funcToString.call(Set):"",weakMapCtorString=WeakMap?funcToString.call(WeakMap):"";(Map&&getTag(new Map)!=mapTag||Set&&getTag(new Set)!=setTag||WeakMap&&getTag(new WeakMap)!=weakMapTag)&&(getTag=function(t){var e=objectToString.call(t),a=e==objectTag?t.constructor:null,r="function"==typeof a?funcToString.call(a):"";if(r)switch(r){case mapCtorString:return mapTag;case setCtorString:return setTag;case weakMapCtorString:return weakMapTag}return e}),module.exports=getTag;

},{"./_Map":230,"./_Set":232,"./_WeakMap":236}],275:[function(require,module,exports){
function hasPath(e,r,i){if(null==e)return!1;var s=i(e,r);s||isKey(r)||(r=baseCastPath(r),e=parent(e,r),null!=e&&(r=last(r),s=i(e,r)));var t=e?e.length:void 0;return s||!!t&&isLength(t)&&isIndex(r,t)&&(isArray(e)||isString(e)||isArguments(e))}var baseCastPath=require("./_baseCastPath"),isArguments=require("./isArguments"),isArray=require("./isArray"),isIndex=require("./_isIndex"),isKey=require("./_isKey"),isLength=require("./isLength"),isString=require("./isString"),last=require("./last"),parent=require("./_parent");module.exports=hasPath;

},{"./_baseCastPath":244,"./_isIndex":282,"./_isKey":283,"./_parent":294,"./isArguments":308,"./isArray":309,"./isLength":313,"./isString":317,"./last":321}],276:[function(require,module,exports){
function hashDelete(e,h){return hashHas(e,h)&&delete e[h]}var hashHas=require("./_hashHas");module.exports=hashDelete;

},{"./_hashHas":278}],277:[function(require,module,exports){
function hashGet(e,t){if(nativeCreate){var r=e[t];return r===HASH_UNDEFINED?void 0:r}return hasOwnProperty.call(e,t)?e[t]:void 0}var nativeCreate=require("./_nativeCreate"),HASH_UNDEFINED="__lodash_hash_undefined__",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=hashGet;

},{"./_nativeCreate":293}],278:[function(require,module,exports){
function hashHas(e,t){return nativeCreate?void 0!==e[t]:hasOwnProperty.call(e,t)}var nativeCreate=require("./_nativeCreate"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=hashHas;

},{"./_nativeCreate":293}],279:[function(require,module,exports){
function hashSet(e,a,t){e[a]=nativeCreate&&void 0===t?HASH_UNDEFINED:t}var nativeCreate=require("./_nativeCreate"),HASH_UNDEFINED="__lodash_hash_undefined__";module.exports=hashSet;

},{"./_nativeCreate":293}],280:[function(require,module,exports){
function indexKeys(e){var i=e?e.length:void 0;return isLength(i)&&(isArray(e)||isString(e)||isArguments(e))?baseTimes(i,String):null}var baseTimes=require("./_baseTimes"),isArguments=require("./isArguments"),isArray=require("./isArray"),isLength=require("./isLength"),isString=require("./isString");module.exports=indexKeys;

},{"./_baseTimes":263,"./isArguments":308,"./isArray":309,"./isLength":313,"./isString":317}],281:[function(require,module,exports){
function isHostObject(t){var o=!1;if(null!=t&&"function"!=typeof t.toString)try{o=!!(t+"")}catch(n){}return o}module.exports=isHostObject;

},{}],282:[function(require,module,exports){
function isIndex(e,n){return e="number"==typeof e||reIsUint.test(e)?+e:-1,n=null==n?MAX_SAFE_INTEGER:n,e>-1&&e%1==0&&n>e}var MAX_SAFE_INTEGER=9007199254740991,reIsUint=/^(?:0|[1-9]\d*)$/;module.exports=isIndex;

},{}],283:[function(require,module,exports){
function isKey(r,e){return"number"==typeof r?!0:!isArray(r)&&(reIsPlainProp.test(r)||!reIsDeepProp.test(r)||null!=e&&r in Object(e))}var isArray=require("./isArray"),reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/;module.exports=isKey;

},{"./isArray":309}],284:[function(require,module,exports){
function isKeyable(e){var o=typeof e;return"number"==o||"boolean"==o||"string"==o&&"__proto__"!=e||null==e}module.exports=isKeyable;

},{}],285:[function(require,module,exports){
function isPrototype(o){var t=o&&o.constructor,r="function"==typeof t&&t.prototype||objectProto;return o===r}var objectProto=Object.prototype;module.exports=isPrototype;

},{}],286:[function(require,module,exports){
function isStrictComparable(e){return e===e&&!isObject(e)}var isObject=require("./isObject");module.exports=isStrictComparable;

},{"./isObject":315}],287:[function(require,module,exports){
function mapClear(){this.__data__={hash:new Hash,map:Map?new Map:[],string:new Hash}}var Hash=require("./_Hash"),Map=require("./_Map");module.exports=mapClear;

},{"./_Hash":229,"./_Map":230}],288:[function(require,module,exports){
function mapDelete(e){var a=this.__data__;return isKeyable(e)?hashDelete("string"==typeof e?a.string:a.hash,e):Map?a.map["delete"](e):assocDelete(a.map,e)}var Map=require("./_Map"),assocDelete=require("./_assocDelete"),hashDelete=require("./_hashDelete"),isKeyable=require("./_isKeyable");module.exports=mapDelete;

},{"./_Map":230,"./_assocDelete":239,"./_hashDelete":276,"./_isKeyable":284}],289:[function(require,module,exports){
function mapGet(e){var a=this.__data__;return isKeyable(e)?hashGet("string"==typeof e?a.string:a.hash,e):Map?a.map.get(e):assocGet(a.map,e)}var Map=require("./_Map"),assocGet=require("./_assocGet"),hashGet=require("./_hashGet"),isKeyable=require("./_isKeyable");module.exports=mapGet;

},{"./_Map":230,"./_assocGet":240,"./_hashGet":277,"./_isKeyable":284}],290:[function(require,module,exports){
function mapHas(a){var s=this.__data__;return isKeyable(a)?hashHas("string"==typeof a?s.string:s.hash,a):Map?s.map.has(a):assocHas(s.map,a)}var Map=require("./_Map"),assocHas=require("./_assocHas"),hashHas=require("./_hashHas"),isKeyable=require("./_isKeyable");module.exports=mapHas;

},{"./_Map":230,"./_assocHas":241,"./_hashHas":278,"./_isKeyable":284}],291:[function(require,module,exports){
function mapSet(e,a){var s=this.__data__;return isKeyable(e)?hashSet("string"==typeof e?s.string:s.hash,e,a):Map?s.map.set(e,a):assocSet(s.map,e,a),this}var Map=require("./_Map"),assocSet=require("./_assocSet"),hashSet=require("./_hashSet"),isKeyable=require("./_isKeyable");module.exports=mapSet;

},{"./_Map":230,"./_assocSet":243,"./_hashSet":279,"./_isKeyable":284}],292:[function(require,module,exports){
function mapToArray(r){var a=-1,o=Array(r.size);return r.forEach(function(r,n){o[++a]=[n,r]}),o}module.exports=mapToArray;

},{}],293:[function(require,module,exports){
var getNative=require("./_getNative"),nativeCreate=getNative(Object,"create");module.exports=nativeCreate;

},{"./_getNative":273}],294:[function(require,module,exports){
function parent(e,r){return 1==r.length?e:get(e,baseSlice(r,0,-1))}var baseSlice=require("./_baseSlice"),get=require("./get");module.exports=parent;

},{"./_baseSlice":262,"./get":305}],295:[function(require,module,exports){
(function (global){
var checkGlobal=require("./_checkGlobal"),objectTypes={"function":!0,object:!0},freeExports=objectTypes[typeof exports]&&exports&&!exports.nodeType?exports:void 0,freeModule=objectTypes[typeof module]&&module&&!module.nodeType?module:void 0,freeGlobal=checkGlobal(freeExports&&freeModule&&"object"==typeof global&&global),freeSelf=checkGlobal(objectTypes[typeof self]&&self),freeWindow=checkGlobal(objectTypes[typeof window]&&window),thisGlobal=checkGlobal(objectTypes[typeof this]&&this),root=freeGlobal||freeWindow!==(thisGlobal&&thisGlobal.window)&&freeWindow||freeSelf||thisGlobal||Function("return this")();module.exports=root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_checkGlobal":265}],296:[function(require,module,exports){
function setToArray(r){var o=-1,e=Array(r.size);return r.forEach(function(r){e[++o]=r}),e}module.exports=setToArray;

},{}],297:[function(require,module,exports){
function stackClear(){this.__data__={array:[],map:null}}module.exports=stackClear;

},{}],298:[function(require,module,exports){
function stackDelete(e){var t=this.__data__,a=t.array;return a?assocDelete(a,e):t.map["delete"](e)}var assocDelete=require("./_assocDelete");module.exports=stackDelete;

},{"./_assocDelete":239}],299:[function(require,module,exports){
function stackGet(t){var a=this.__data__,e=a.array;return e?assocGet(e,t):a.map.get(t)}var assocGet=require("./_assocGet");module.exports=stackGet;

},{"./_assocGet":240}],300:[function(require,module,exports){
function stackHas(a){var s=this.__data__,r=s.array;return r?assocHas(r,a):s.map.has(a)}var assocHas=require("./_assocHas");module.exports=stackHas;

},{"./_assocHas":241}],301:[function(require,module,exports){
function stackSet(a,e){var t=this.__data__,r=t.array;r&&(r.length<LARGE_ARRAY_SIZE-1?assocSet(r,a,e):(t.array=null,t.map=new MapCache(r)));var s=t.map;return s&&s.set(a,e),this}var MapCache=require("./_MapCache"),assocSet=require("./_assocSet"),LARGE_ARRAY_SIZE=200;module.exports=stackSet;

},{"./_MapCache":231,"./_assocSet":243}],302:[function(require,module,exports){
function stringToPath(r){var e=[];return toString(r).replace(rePropName,function(r,t,a,o){e.push(a?o.replace(reEscapeChar,"$1"):t||r)}),e}var toString=require("./toString"),rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g,reEscapeChar=/\\(\\)?/g;module.exports=stringToPath;

},{"./toString":325}],303:[function(require,module,exports){
function eq(e,n){return e===n||e!==e&&n!==n}module.exports=eq;

},{}],304:[function(require,module,exports){
function findIndex(e,n){return e&&e.length?baseFindIndex(e,baseIteratee(n,3)):-1}var baseFindIndex=require("./_baseFindIndex"),baseIteratee=require("./_baseIteratee");module.exports=findIndex;

},{"./_baseFindIndex":246,"./_baseIteratee":255}],305:[function(require,module,exports){
function get(e,t,r){var a=null==e?void 0:baseGet(e,t);return void 0===a?r:a}var baseGet=require("./_baseGet");module.exports=get;

},{"./_baseGet":249}],306:[function(require,module,exports){
function hasIn(a,s){return hasPath(a,s,baseHasIn)}var baseHasIn=require("./_baseHasIn"),hasPath=require("./_hasPath");module.exports=hasIn;

},{"./_baseHasIn":251,"./_hasPath":275}],307:[function(require,module,exports){
function identity(t){return t}module.exports=identity;

},{}],308:[function(require,module,exports){
function isArguments(r){return isArrayLikeObject(r)&&hasOwnProperty.call(r,"callee")&&(!propertyIsEnumerable.call(r,"callee")||objectToString.call(r)==argsTag)}var isArrayLikeObject=require("./isArrayLikeObject"),argsTag="[object Arguments]",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,objectToString=objectProto.toString,propertyIsEnumerable=objectProto.propertyIsEnumerable;module.exports=isArguments;

},{"./isArrayLikeObject":311}],309:[function(require,module,exports){
var isArray=Array.isArray;module.exports=isArray;

},{}],310:[function(require,module,exports){
function isArrayLike(e){return null!=e&&isLength(getLength(e))&&!isFunction(e)}var getLength=require("./_getLength"),isFunction=require("./isFunction"),isLength=require("./isLength");module.exports=isArrayLike;

},{"./_getLength":271,"./isFunction":312,"./isLength":313}],311:[function(require,module,exports){
function isArrayLikeObject(e){return isObjectLike(e)&&isArrayLike(e)}var isArrayLike=require("./isArrayLike"),isObjectLike=require("./isObjectLike");module.exports=isArrayLikeObject;

},{"./isArrayLike":310,"./isObjectLike":316}],312:[function(require,module,exports){
function isFunction(t){var o=isObject(t)?objectToString.call(t):"";return o==funcTag||o==genTag}var isObject=require("./isObject"),funcTag="[object Function]",genTag="[object GeneratorFunction]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isFunction;

},{"./isObject":315}],313:[function(require,module,exports){
function isLength(e){return"number"==typeof e&&e>-1&&e%1==0&&MAX_SAFE_INTEGER>=e}var MAX_SAFE_INTEGER=9007199254740991;module.exports=isLength;

},{}],314:[function(require,module,exports){
function isNative(t){return null==t?!1:isFunction(t)?reIsNative.test(funcToString.call(t)):isObjectLike(t)&&(isHostObject(t)?reIsNative:reIsHostCtor).test(t)}var isFunction=require("./isFunction"),isHostObject=require("./_isHostObject"),isObjectLike=require("./isObjectLike"),reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reIsHostCtor=/^\[object .+?Constructor\]$/,objectProto=Object.prototype,funcToString=Function.prototype.toString,hasOwnProperty=objectProto.hasOwnProperty,reIsNative=RegExp("^"+funcToString.call(hasOwnProperty).replace(reRegExpChar,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");module.exports=isNative;

},{"./_isHostObject":281,"./isFunction":312,"./isObjectLike":316}],315:[function(require,module,exports){
function isObject(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}module.exports=isObject;

},{}],316:[function(require,module,exports){
function isObjectLike(e){return!!e&&"object"==typeof e}module.exports=isObjectLike;

},{}],317:[function(require,module,exports){
function isString(t){return"string"==typeof t||!isArray(t)&&isObjectLike(t)&&objectToString.call(t)==stringTag}var isArray=require("./isArray"),isObjectLike=require("./isObjectLike"),stringTag="[object String]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isString;

},{"./isArray":309,"./isObjectLike":316}],318:[function(require,module,exports){
function isSymbol(o){return"symbol"==typeof o||isObjectLike(o)&&objectToString.call(o)==symbolTag}var isObjectLike=require("./isObjectLike"),symbolTag="[object Symbol]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isSymbol;

},{"./isObjectLike":316}],319:[function(require,module,exports){
function isTypedArray(a){return isObjectLike(a)&&isLength(a.length)&&!!typedArrayTags[objectToString.call(a)]}var isLength=require("./isLength"),isObjectLike=require("./isObjectLike"),argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=!0,typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=!1;var objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isTypedArray;

},{"./isLength":313,"./isObjectLike":316}],320:[function(require,module,exports){
function keys(e){var r=isPrototype(e);if(!r&&!isArrayLike(e))return baseKeys(e);var s=indexKeys(e),i=!!s,a=s||[],n=a.length;for(var t in e)!baseHas(e,t)||i&&("length"==t||isIndex(t,n))||r&&"constructor"==t||a.push(t);return a}var baseHas=require("./_baseHas"),baseKeys=require("./_baseKeys"),indexKeys=require("./_indexKeys"),isArrayLike=require("./isArrayLike"),isIndex=require("./_isIndex"),isPrototype=require("./_isPrototype");module.exports=keys;

},{"./_baseHas":250,"./_baseKeys":256,"./_indexKeys":280,"./_isIndex":282,"./_isPrototype":285,"./isArrayLike":310}],321:[function(require,module,exports){
function last(t){var e=t?t.length:0;return e?t[e-1]:void 0}module.exports=last;

},{}],322:[function(require,module,exports){
function map(a,r){var e=isArray(a)?arrayMap:baseMap;return e(a,baseIteratee(r,3))}var arrayMap=require("./_arrayMap"),baseIteratee=require("./_baseIteratee"),baseMap=require("./_baseMap"),isArray=require("./isArray");module.exports=map;

},{"./_arrayMap":237,"./_baseIteratee":255,"./_baseMap":257,"./isArray":309}],323:[function(require,module,exports){
function property(e){return isKey(e)?baseProperty(e):basePropertyDeep(e)}var baseProperty=require("./_baseProperty"),basePropertyDeep=require("./_basePropertyDeep"),isKey=require("./_isKey");module.exports=property;

},{"./_baseProperty":260,"./_basePropertyDeep":261,"./_isKey":283}],324:[function(require,module,exports){
function toPairs(e){return baseToPairs(e,keys(e))}var baseToPairs=require("./_baseToPairs"),keys=require("./keys");module.exports=toPairs;

},{"./_baseToPairs":264,"./keys":320}],325:[function(require,module,exports){
function toString(o){if("string"==typeof o)return o;if(null==o)return"";if(isSymbol(o))return symbolToString?symbolToString.call(o):"";var r=o+"";return"0"==r&&1/o==-INFINITY?"-0":r}var Symbol=require("./_Symbol"),isSymbol=require("./isSymbol"),INFINITY=1/0,symbolProto=Symbol?Symbol.prototype:void 0,symbolToString=symbolProto?symbolProto.toString:void 0;module.exports=toString;

},{"./_Symbol":234,"./isSymbol":318}],326:[function(require,module,exports){
var t=require("./lib/assert");t.Any=require("./lib/Any"),t.Array=require("./lib/Array"),t.Boolean=require("./lib/Boolean"),t.Date=require("./lib/Date"),t.Error=require("./lib/Error"),t.Function=require("./lib/Function"),t.Nil=require("./lib/Nil"),t.Number=require("./lib/Number"),t.Object=require("./lib/Object"),t.RegExp=require("./lib/RegExp"),t.String=require("./lib/String"),t.Arr=t.Array,t.Bool=t.Boolean,t.Dat=t.Date,t.Err=t.Error,t.Func=t.Function,t.Num=t.Number,t.Obj=t.Object,t.Re=t.RegExp,t.Str=t.String,t.dict=require("./lib/dict"),t.declare=require("./lib/declare"),t.enums=require("./lib/enums"),t.irreducible=require("./lib/irreducible"),t.list=require("./lib/list"),t.maybe=require("./lib/maybe"),t.refinement=require("./lib/refinement"),t.struct=require("./lib/struct"),t.tuple=require("./lib/tuple"),t.union=require("./lib/union"),t.func=require("./lib/func"),t.intersection=require("./lib/intersection"),t.subtype=t.refinement,t.assert=t,t.update=require("./lib/update"),t.mixin=require("./lib/mixin"),t.isType=require("./lib/isType"),t.is=require("./lib/is"),t.getTypeName=require("./lib/getTypeName"),t.match=require("./lib/match"),module.exports=t;

},{"./lib/Any":327,"./lib/Array":328,"./lib/Boolean":329,"./lib/Date":330,"./lib/Error":331,"./lib/Function":332,"./lib/Nil":333,"./lib/Number":334,"./lib/Object":335,"./lib/RegExp":336,"./lib/String":337,"./lib/assert":338,"./lib/declare":340,"./lib/dict":341,"./lib/enums":342,"./lib/func":345,"./lib/getTypeName":347,"./lib/intersection":348,"./lib/irreducible":349,"./lib/is":350,"./lib/isType":361,"./lib/list":364,"./lib/match":365,"./lib/maybe":366,"./lib/mixin":367,"./lib/refinement":368,"./lib/struct":370,"./lib/tuple":371,"./lib/union":372,"./lib/update":373}],327:[function(require,module,exports){
var irreducible=require("./irreducible");module.exports=irreducible("Any",function(){return!0});

},{"./irreducible":349}],328:[function(require,module,exports){
var irreducible=require("./irreducible"),isArray=require("./isArray");module.exports=irreducible("Array",isArray);

},{"./irreducible":349,"./isArray":351}],329:[function(require,module,exports){
var irreducible=require("./irreducible"),isBoolean=require("./isBoolean");module.exports=irreducible("Boolean",isBoolean);

},{"./irreducible":349,"./isBoolean":352}],330:[function(require,module,exports){
var irreducible=require("./irreducible");module.exports=irreducible("Date",function(e){return e instanceof Date});

},{"./irreducible":349}],331:[function(require,module,exports){
var irreducible=require("./irreducible");module.exports=irreducible("Error",function(r){return r instanceof Error});

},{"./irreducible":349}],332:[function(require,module,exports){
var irreducible=require("./irreducible"),isFunction=require("./isFunction");module.exports=irreducible("Function",isFunction);

},{"./irreducible":349,"./isFunction":353}],333:[function(require,module,exports){
var irreducible=require("./irreducible"),isNil=require("./isNil");module.exports=irreducible("Nil",isNil);

},{"./irreducible":349,"./isNil":356}],334:[function(require,module,exports){
var irreducible=require("./irreducible"),isNumber=require("./isNumber");module.exports=irreducible("Number",isNumber);

},{"./irreducible":349,"./isNumber":357}],335:[function(require,module,exports){
var irreducible=require("./irreducible"),isObject=require("./isObject");module.exports=irreducible("Object",isObject);

},{"./irreducible":349,"./isObject":358}],336:[function(require,module,exports){
var irreducible=require("./irreducible");module.exports=irreducible("RegExp",function(e){return e instanceof RegExp});

},{"./irreducible":349}],337:[function(require,module,exports){
var irreducible=require("./irreducible"),isString=require("./isString");module.exports=irreducible("String",isString);

},{"./irreducible":349,"./isString":359}],338:[function(require,module,exports){
function assert(i,s){i!==!0&&(isFunction(s)?s=s():isNil(s)&&(s='Assert failed (turn on "Pause on exceptions" in your Source panel)'),assert.fail(s))}var isFunction=require("./isFunction"),isNil=require("./isNil"),fail=require("./fail"),stringify=require("./stringify");assert.fail=fail,assert.stringify=stringify,module.exports=assert;

},{"./fail":343,"./isFunction":353,"./isNil":356,"./stringify":369}],339:[function(require,module,exports){
(function (process){
var isType=require("./isType"),isStruct=require("./isStruct"),getFunctionName=require("./getFunctionName"),assert=require("./assert"),stringify=require("./stringify");module.exports=function(e,i,r){return isType(e)?isStruct(e)?new e(i,r):e(i,r):("production"!==process.env.NODE_ENV&&(r=r||[getFunctionName(e)],assert(i instanceof e,function(){return"Invalid value "+stringify(i)+" supplied to "+r.join("/")})),i)};

}).call(this,require('_process'))
},{"./assert":338,"./getFunctionName":346,"./isStruct":360,"./isType":361,"./stringify":369,"_process":146}],340:[function(require,module,exports){
(function (process){
var assert=require("./assert"),isTypeName=require("./isTypeName"),isType=require("./isType"),isNil=require("./isNil"),mixin=require("./mixin"),getTypeName=require("./getTypeName"),nextDeclareUniqueId=1;module.exports=function(e){function t(e,t){return"production"!==process.env.NODE_ENV&&assert(!isNil(n),function(){return"Type declared but not defined, don't forget to call .define on every declared type"}),n(e,t)}"production"!==process.env.NODE_ENV&&assert(isTypeName(e),function(){return"Invalid argument name "+e+" supplied to declare([name]) (expected a string)"});var n;return t.define=function(i){return"production"!==process.env.NODE_ENV&&(assert(isType(i),function(){return"Invalid argument type "+assert.stringify(i)+" supplied to define(type) (expected a type)"}),assert(isNil(n),function(){return"Declare.define(type) can only be invoked once"}),assert(isNil(i.meta.name)&&0===Object.keys(i.prototype).length,function(){return"Invalid argument type "+assert.stringify(i)+" supplied to define(type) (expected a fresh, unnamed type)"})),n=i,mixin(t,n,!0),e&&(n.displayName=t.displayName=e,t.meta.name=e),t.meta.identity=!1,t.prototype=n.prototype,t},t.displayName=e||getTypeName(t)+"$"+nextDeclareUniqueId++,t.meta={identity:!1},t.prototype=null,t};

}).call(this,require('_process'))
},{"./assert":338,"./getTypeName":347,"./isNil":356,"./isType":361,"./isTypeName":362,"./mixin":367,"_process":146}],341:[function(require,module,exports){
(function (process){
function getDefaultName(e,t){return"{[key: "+getTypeName(e)+"]: "+getTypeName(t)+"}"}function dict(e,t,i){function n(i,n){if("production"===process.env.NODE_ENV&&o)return i;"production"!==process.env.NODE_ENV&&(n=n||[r],assert(isObject(i),function(){return"Invalid value "+assert.stringify(i)+" supplied to "+n.join("/")}));var c=!0,u={};for(var d in i)if(i.hasOwnProperty(d)){d=create(e,d,"production"!==process.env.NODE_ENV?n.concat(a):null);var p=i[d],m=create(t,p,"production"!==process.env.NODE_ENV?n.concat(d+": "+s):null);c=c&&p===m,u[d]=m}return c&&(u=i),"production"!==process.env.NODE_ENV&&Object.freeze(u),u}"production"!==process.env.NODE_ENV&&(assert(isFunction(e),function(){return"Invalid argument domain "+assert.stringify(e)+" supplied to dict(domain, codomain, [name]) combinator (expected a type)"}),assert(isFunction(t),function(){return"Invalid argument codomain "+assert.stringify(t)+" supplied to dict(domain, codomain, [name]) combinator (expected a type)"}),assert(isTypeName(i),function(){return"Invalid argument name "+assert.stringify(i)+" supplied to dict(domain, codomain, [name]) combinator (expected a string)"}));var r=i||getDefaultName(e,t),a=getTypeName(e),s=getTypeName(t),o=isIdentity(e)&&isIdentity(t);return n.meta={kind:"dict",domain:e,codomain:t,name:i,identity:o},n.displayName=r,n.is=function(i){if(!isObject(i))return!1;for(var n in i)if(i.hasOwnProperty(n)&&(!is(n,e)||!is(i[n],t)))return!1;return!0},n.update=function(e,t){return n(assert.update(e,t))},n}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),getTypeName=require("./getTypeName"),isIdentity=require("./isIdentity"),isObject=require("./isObject"),create=require("./create"),is=require("./is");dict.getDefaultName=getDefaultName,module.exports=dict;

}).call(this,require('_process'))
},{"./assert":338,"./create":339,"./getTypeName":347,"./is":350,"./isFunction":353,"./isIdentity":354,"./isObject":358,"./isTypeName":362,"_process":146}],342:[function(require,module,exports){
(function (process){
function getDefaultName(e){return Object.keys(e).map(function(e){return assert.stringify(e)}).join(" | ")}function enums(e,t){function r(t,i){return"production"!==process.env.NODE_ENV&&(forbidNewOperator(this,r),i=i||[n],assert(r.is(t),function(){return"Invalid value "+assert.stringify(t)+" supplied to "+i.join("/")+" (expected one of "+assert.stringify(Object.keys(e))+")"})),t}"production"!==process.env.NODE_ENV&&(assert(isObject(e),function(){return"Invalid argument map "+assert.stringify(e)+" supplied to enums(map, [name]) combinator (expected a dictionary of String -> String | Number)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to enums(map, [name]) combinator (expected a string)"}));var n=t||getDefaultName(e);return r.meta={kind:"enums",map:e,name:t,identity:!0},r.displayName=n,r.is=function(t){return e.hasOwnProperty(t)},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),forbidNewOperator=require("./forbidNewOperator"),isString=require("./isString"),isObject=require("./isObject");enums.of=function(e,t){e=isString(e)?e.split(" "):e;var r={};return e.forEach(function(e){r[e]=e}),enums(r,t)},enums.getDefaultName=getDefaultName,module.exports=enums;

}).call(this,require('_process'))
},{"./assert":338,"./forbidNewOperator":344,"./isObject":358,"./isString":359,"./isTypeName":362,"_process":146}],343:[function(require,module,exports){
module.exports=function(o){throw new TypeError("[tcomb] "+o)};

},{}],344:[function(require,module,exports){
var assert=require("./assert"),getTypeName=require("./getTypeName");module.exports=function(e,t){assert(!(e instanceof t),function(){return"Cannot use the new operator to instantiate the type "+getTypeName(t)})};

},{"./assert":338,"./getTypeName":347}],345:[function(require,module,exports){
(function (process){
function getDefaultName(e,n){return"("+e.map(getTypeName).join(", ")+") => "+getTypeName(n)}function isInstrumented(e){return FunctionType.is(e)&&isObject(e.instrumentation)}function func(e,n,t){function i(e,n){return isInstrumented(e)?("production"!==process.env.NODE_ENV&&assert(i.is(e),function(){return"Invalid value "+assert.stringify(e)+" supplied to "+r}),e):i.of(e,n)}e=isArray(e)?e:[e],"production"!==process.env.NODE_ENV&&(assert(list(FunctionType).is(e),function(){return"Invalid argument domain "+assert.stringify(e)+" supplied to func(domain, codomain, [name]) combinator (expected an array of types)"}),assert(FunctionType.is(n),function(){return"Invalid argument codomain "+assert.stringify(n)+" supplied to func(domain, codomain, [name]) combinator (expected a type)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to func(domain, codomain, [name]) combinator (expected a string)"}));var r=t||getDefaultName(e,n);return i.meta={kind:"func",domain:e,codomain:n,name:t,identity:!0},i.displayName=r,i.is=function(t){return isInstrumented(t)&&t.instrumentation.domain.length===e.length&&t.instrumentation.domain.every(function(n,t){return n===e[t]})&&t.instrumentation.codomain===n},i.of=function(t,a){function o(){var i=Array.prototype.slice.call(arguments),r=a?i.length:e.length,o=tuple(e.slice(0,r));if(i=o(i),r===e.length)return create(n,t.apply(this,i));var u=Function.prototype.bind.apply(t,[this].concat(i)),s=func(e.slice(r),n);return s.of(u,a)}return"production"!==process.env.NODE_ENV&&(assert(FunctionType.is(t),function(){return"Invalid argument f supplied to func.of "+r+" (expected a function)"}),assert(isNil(a)||isBoolean(a),function(){return"Invalid argument curried "+assert.stringify(a)+" supplied to func.of "+r+" (expected a boolean)"})),i.is(t)?t:(o.instrumentation={domain:e,codomain:n,f:t},o.displayName=getFunctionName(t),o)},i}var assert=require("./assert"),isTypeName=require("./isTypeName"),FunctionType=require("./Function"),isArray=require("./isArray"),list=require("./list"),isObject=require("./isObject"),create=require("./create"),isNil=require("./isNil"),isBoolean=require("./isBoolean"),tuple=require("./tuple"),getFunctionName=require("./getFunctionName"),getTypeName=require("./getTypeName");func.getDefaultName=getDefaultName,module.exports=func;

}).call(this,require('_process'))
},{"./Function":332,"./assert":338,"./create":339,"./getFunctionName":346,"./getTypeName":347,"./isArray":351,"./isBoolean":352,"./isNil":356,"./isObject":358,"./isTypeName":362,"./list":364,"./tuple":371,"_process":146}],346:[function(require,module,exports){
module.exports=function(n){return n.displayName||n.name||"<function"+n.length+">"};

},{}],347:[function(require,module,exports){
var isType=require("./isType"),getFunctionName=require("./getFunctionName");module.exports=function(e){return isType(e)?e.displayName:getFunctionName(e)};

},{"./getFunctionName":346,"./isType":361}],348:[function(require,module,exports){
(function (process){
function getDefaultName(e){return e.map(getTypeName).join(" & ")}function intersection(e,t){function r(e,t){return"production"!==process.env.NODE_ENV&&(forbidNewOperator(this,r),t=t||[i],assert(r.is(e),function(){return"Invalid value "+assert.stringify(e)+" supplied to "+t.join("/")})),e}"production"!==process.env.NODE_ENV&&(assert(isArray(e)&&e.every(isFunction)&&e.length>=2,function(){return"Invalid argument types "+assert.stringify(e)+" supplied to intersection(types, [name]) combinator (expected an array of at least 2 types)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to intersection(types, [name]) combinator (expected a string)"}));var i=t||getDefaultName(e);return r.meta={kind:"intersection",types:e,name:t,identity:!0},r.displayName=i,r.is=function(t){return e.every(function(e){return is(t,e)})},r.update=function(e,t){return r(assert.update(e,t))},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),isArray=require("./isArray"),forbidNewOperator=require("./isIdentity"),is=require("./is"),getTypeName=require("./getTypeName");intersection.getDefaultName=getDefaultName,module.exports=intersection;

}).call(this,require('_process'))
},{"./assert":338,"./getTypeName":347,"./is":350,"./isArray":351,"./isFunction":353,"./isIdentity":354,"./isTypeName":362,"_process":146}],349:[function(require,module,exports){
(function (process){
var assert=require("./assert"),isString=require("./isString"),isFunction=require("./isFunction"),forbidNewOperator=require("./forbidNewOperator");module.exports=function(e,r){function i(t,n){return"production"!==process.env.NODE_ENV&&(forbidNewOperator(this,i),n=n||[e],assert(r(t),function(){return"Invalid value "+assert.stringify(t)+" supplied to "+n.join("/")})),t}return"production"!==process.env.NODE_ENV&&(assert(isString(e),function(){return"Invalid argument name "+assert.stringify(e)+" supplied to irreducible(name, predicate) (expected a string)"}),assert(isFunction(r),"Invalid argument predicate "+assert.stringify(r)+" supplied to irreducible(name, predicate) (expected a function)")),i.meta={kind:"irreducible",name:e,predicate:r,identity:!0},i.displayName=e,i.is=r,i};

}).call(this,require('_process'))
},{"./assert":338,"./forbidNewOperator":344,"./isFunction":353,"./isString":359,"_process":146}],350:[function(require,module,exports){
var isType=require("./isType");module.exports=function(e,i){return isType(i)?i.is(e):e instanceof i};

},{"./isType":361}],351:[function(require,module,exports){
module.exports=function(n){return n instanceof Array};

},{}],352:[function(require,module,exports){
module.exports=function(e){return e===!0||e===!1};

},{}],353:[function(require,module,exports){
module.exports=function(n){return"function"==typeof n};

},{}],354:[function(require,module,exports){
(function (process){
var assert=require("./assert"),Boolean=require("./Boolean"),isType=require("./isType"),getTypeName=require("./getTypeName");module.exports=function(e){return isType(e)?("production"!==process.env.NODE_ENV&&assert(Boolean.is(e.meta.identity),function(){return"Invalid meta identity "+assert.stringify(e.meta.identity)+" supplied to type "+getTypeName(e)}),e.meta.identity):!0};

}).call(this,require('_process'))
},{"./Boolean":329,"./assert":338,"./getTypeName":347,"./isType":361,"_process":146}],355:[function(require,module,exports){
var isType=require("./isType");module.exports=function(e){return isType(e)&&"maybe"===e.meta.kind};

},{"./isType":361}],356:[function(require,module,exports){
module.exports=function(n){return null===n||void 0===n};

},{}],357:[function(require,module,exports){
module.exports=function(e){return"number"==typeof e&&isFinite(e)&&!isNaN(e)};

},{}],358:[function(require,module,exports){
var isNil=require("./isNil"),isArray=require("./isArray");module.exports=function(r){return!isNil(r)&&"object"==typeof r&&!isArray(r)};

},{"./isArray":351,"./isNil":356}],359:[function(require,module,exports){
module.exports=function(t){return"string"==typeof t};

},{}],360:[function(require,module,exports){
var isType=require("./isType");module.exports=function(e){return isType(e)&&"struct"===e.meta.kind};

},{"./isType":361}],361:[function(require,module,exports){
var isFunction=require("./isFunction"),isObject=require("./isObject");module.exports=function(i){return isFunction(i)&&isObject(i.meta)};

},{"./isFunction":353,"./isObject":358}],362:[function(require,module,exports){
var isNil=require("./isNil"),isString=require("./isString");module.exports=function(i){return isNil(i)||isString(i)};

},{"./isNil":356,"./isString":359}],363:[function(require,module,exports){
var isType=require("./isType");module.exports=function(e){return isType(e)&&"union"===e.meta.kind};

},{"./isType":361}],364:[function(require,module,exports){
(function (process){
function getDefaultName(e){return"Array<"+getTypeName(e)+">"}function list(e,t){function r(t,r){if("production"===process.env.NODE_ENV&&s)return t;"production"!==process.env.NODE_ENV&&(r=r||[i],assert(isArray(t),function(){return"Invalid value "+assert.stringify(t)+" supplied to "+r.join("/")+" (expected an array of "+n+")"}));for(var a=!0,u=[],o=0,p=t.length;p>o;o++){var c=t[o],y=create(e,c,"production"!==process.env.NODE_ENV?r.concat(o+": "+n):null);a=a&&c===y,u.push(y)}return a&&(u=t),"production"!==process.env.NODE_ENV&&Object.freeze(u),u}"production"!==process.env.NODE_ENV&&(assert(isFunction(e),function(){return"Invalid argument type "+assert.stringify(e)+" supplied to list(type, [name]) combinator (expected a type)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to list(type, [name]) combinator (expected a string)"}));var i=t||getDefaultName(e),n=getTypeName(e),s=isIdentity(e);return r.meta={kind:"list",type:e,name:t,identity:s},r.displayName=i,r.is=function(t){return isArray(t)&&t.every(function(t){return is(t,e)})},r.update=function(e,t){return r(assert.update(e,t))},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),getTypeName=require("./getTypeName"),isIdentity=require("./isIdentity"),create=require("./create"),is=require("./is"),isArray=require("./isArray");list.getDefaultName=getDefaultName,module.exports=list;

}).call(this,require('_process'))
},{"./assert":338,"./create":339,"./getTypeName":347,"./is":350,"./isArray":351,"./isFunction":353,"./isIdentity":354,"./isTypeName":362,"_process":146}],365:[function(require,module,exports){
(function (process){
var assert=require("./assert"),isFunction=require("./isFunction"),isType=require("./isType"),Any=require("./Any");module.exports=function(n){for(var i,e,r,s,t=1,u=arguments.length;u>t;)if(i=arguments[t],e=arguments[t+1],r=arguments[t+2],isFunction(r)&&!isType(r)?t+=3:(r=e,e=Any.is,t+=2),"production"!==process.env.NODE_ENV&&(s=(s||0)+1,assert(isType(i),function(){return"Invalid type in clause #"+s}),assert(isFunction(e),function(){return"Invalid guard in clause #"+s}),assert(isFunction(r),function(){return"Invalid block in clause #"+s})),i.is(n)&&e(n))return r(n);assert.fail("Match error")};

}).call(this,require('_process'))
},{"./Any":327,"./assert":338,"./isFunction":353,"./isType":361,"_process":146}],366:[function(require,module,exports){
(function (process){
function getDefaultName(e){return"?"+getTypeName(e)}function maybe(e,i){function r(i,t){return"production"!==process.env.NODE_ENV&&forbidNewOperator(this,r),Nil.is(i)?i:create(e,i,t)}if(isMaybe(e)||e===Any||e===Nil)return e;"production"!==process.env.NODE_ENV&&(assert(isFunction(e),function(){return"Invalid argument type "+assert.stringify(e)+" supplied to maybe(type, [name]) combinator (expected a type)"}),assert(isTypeName(i),function(){return"Invalid argument name "+assert.stringify(i)+" supplied to maybe(type, [name]) combinator (expected a string)"}));var t=i||getDefaultName(e);return r.meta={kind:"maybe",type:e,name:i,identity:isIdentity(e)},r.displayName=t,r.is=function(i){return Nil.is(i)||is(i,e)},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),isMaybe=require("./isMaybe"),isIdentity=require("./isIdentity"),Any=require("./Any"),create=require("./create"),Nil=require("./Nil"),forbidNewOperator=require("./forbidNewOperator"),is=require("./is"),getTypeName=require("./getTypeName");maybe.getDefaultName=getDefaultName,module.exports=maybe;

}).call(this,require('_process'))
},{"./Any":327,"./Nil":333,"./assert":338,"./create":339,"./forbidNewOperator":344,"./getTypeName":347,"./is":350,"./isFunction":353,"./isIdentity":354,"./isMaybe":355,"./isTypeName":362,"_process":146}],367:[function(require,module,exports){
(function (process){
var isNil=require("./isNil"),assert=require("./assert");module.exports=function(r,e,t){if(isNil(e))return r;for(var i in e)e.hasOwnProperty(i)&&(t!==!0&&"production"!==process.env.NODE_ENV&&assert(!r.hasOwnProperty(i),function(){return'Invalid call to mixin(target, source, [overwrite]): cannot overwrite property "'+i+'" of target object'}),r[i]=e[i]);return r};

}).call(this,require('_process'))
},{"./assert":338,"./isNil":356,"_process":146}],368:[function(require,module,exports){
(function (process){
function getDefaultName(e,t){return"{"+getTypeName(e)+" | "+getFunctionName(t)+"}"}function refinement(e,t,r){function n(r,a){"production"!==process.env.NODE_ENV&&(forbidNewOperator(this,n),a=a||[i]);var u=create(e,r,a);return"production"!==process.env.NODE_ENV&&assert(t(u),function(){return"Invalid value "+assert.stringify(r)+" supplied to "+a.join("/")}),u}"production"!==process.env.NODE_ENV&&(assert(isFunction(e),function(){return"Invalid argument type "+assert.stringify(e)+" supplied to refinement(type, predicate, [name]) combinator (expected a type)"}),assert(isFunction(t),function(){return"Invalid argument predicate supplied to refinement(type, predicate, [name]) combinator (expected a function)"}),assert(isTypeName(r),function(){return"Invalid argument name "+assert.stringify(r)+" supplied to refinement(type, predicate, [name]) combinator (expected a string)"}));var i=r||getDefaultName(e,t),a=isIdentity(e);return n.meta={kind:"subtype",type:e,predicate:t,name:r,identity:a},n.displayName=i,n.is=function(r){return is(r,e)&&t(r)},n.update=function(e,t){return n(assert.update(e,t))},n}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),forbidNewOperator=require("./forbidNewOperator"),isIdentity=require("./isIdentity"),create=require("./create"),is=require("./is"),getTypeName=require("./getTypeName"),getFunctionName=require("./getFunctionName");refinement.getDefaultName=getDefaultName,module.exports=refinement;

}).call(this,require('_process'))
},{"./assert":338,"./create":339,"./forbidNewOperator":344,"./getFunctionName":346,"./getTypeName":347,"./is":350,"./isFunction":353,"./isIdentity":354,"./isTypeName":362,"_process":146}],369:[function(require,module,exports){
module.exports=function(r){try{return JSON.stringify(r,null,2)}catch(t){return String(r)}};

},{}],370:[function(require,module,exports){
(function (process){
function getDefaultName(e){return"{"+Object.keys(e).map(function(t){return t+": "+getTypeName(e[t])}).join(", ")+"}"}function extend(e,t){"production"!==process.env.NODE_ENV&&assert(isArray(e)&&e.every(function(e){return isObject(e)||isStruct(e)}),function(){return"Invalid argument mixins supplied to extend(mixins, name), expected an array of objects or structs"});var r={},n={};e.forEach(function(e){isObject(e)?mixin(r,e):(mixin(r,e.meta.props),mixin(n,e.prototype))});var i=struct(r,t);return mixin(i.prototype,n),i}function struct(e,t){function r(t,i){if(r.is(t))return t;if("production"!==process.env.NODE_ENV&&(i=i||[n],assert(isObject(t),function(){return"Invalid value "+assert.stringify(t)+" supplied to "+i.join("/")+" (expected an object)"})),!(this instanceof r))return new r(t,i);for(var s in e)if(e.hasOwnProperty(s)){var u=e[s],a=t[s];this[s]=create(u,a,"production"!==process.env.NODE_ENV?i.concat(s+": "+getTypeName(u)):null)}"production"!==process.env.NODE_ENV&&Object.freeze(this)}"production"!==process.env.NODE_ENV&&(assert(dict(String,Function).is(e),function(){return"Invalid argument props "+assert.stringify(e)+" supplied to struct(props, [name]) combinator (expected a dictionary String -> Type)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to struct(props, [name]) combinator (expected a string)"}));var n=t||getDefaultName(e);return r.meta={kind:"struct",props:e,name:t,identity:!1},r.displayName=n,r.is=function(e){return e instanceof r},r.update=function(e,t){return new r(assert.update(e,t))},r.extend=function(e,t){return extend([r].concat(e),t)},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),String=require("./String"),Function=require("./Function"),isArray=require("./isArray"),isObject=require("./isObject"),create=require("./create"),mixin=require("./mixin"),isStruct=require("./isStruct"),getTypeName=require("./getTypeName"),dict=require("./dict");struct.getDefaultName=getDefaultName,struct.extend=extend,module.exports=struct;

}).call(this,require('_process'))
},{"./Function":332,"./String":337,"./assert":338,"./create":339,"./dict":341,"./getTypeName":347,"./isArray":351,"./isObject":358,"./isStruct":360,"./isTypeName":362,"./mixin":367,"_process":146}],371:[function(require,module,exports){
(function (process){
function getDefaultName(e){return"["+e.map(getTypeName).join(", ")+"]"}function tuple(e,t){function r(t,r){if("production"===process.env.NODE_ENV&&i)return t;"production"!==process.env.NODE_ENV&&(r=r||[n],assert(isArray(t)&&t.length===e.length,function(){return"Invalid value "+assert.stringify(t)+" supplied to "+r.join("/")+" (expected an array of length "+e.length+")"}));for(var a=!0,s=[],u=0,p=e.length;p>u;u++){var o=e[u],c=t[u],y=create(o,c,"production"!==process.env.NODE_ENV?r.concat(u+": "+getTypeName(o)):null);a=a&&c===y,s.push(y)}return a&&(s=t),"production"!==process.env.NODE_ENV&&Object.freeze(s),s}"production"!==process.env.NODE_ENV&&(assert(isArray(e)&&e.every(isFunction),function(){return"Invalid argument types "+assert.stringify(e)+" supplied to tuple(types, [name]) combinator (expected an array of types)"}),assert(isTypeName(t),function(){return"Invalid argument name "+assert.stringify(t)+" supplied to tuple(types, [name]) combinator (expected a string)"}));var n=t||getDefaultName(e),i=e.every(isIdentity);return r.meta={kind:"tuple",types:e,name:t,identity:i},r.displayName=n,r.is=function(t){return isArray(t)&&t.length===e.length&&e.every(function(e,r){return is(t[r],e)})},r.update=function(e,t){return r(assert.update(e,t))},r}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),getTypeName=require("./getTypeName"),isIdentity=require("./isIdentity"),isArray=require("./isArray"),create=require("./create"),is=require("./is");tuple.getDefaultName=getDefaultName,module.exports=tuple;

}).call(this,require('_process'))
},{"./assert":338,"./create":339,"./getTypeName":347,"./is":350,"./isArray":351,"./isFunction":353,"./isIdentity":354,"./isTypeName":362,"_process":146}],372:[function(require,module,exports){
(function (process){
function getDefaultName(e){return e.map(getTypeName).join(" | ")}function union(e,r){function i(e,r){if("production"===process.env.NODE_ENV&&n)return e;var s=i.dispatch(e);return!s&&i.is(e)?e:("production"!==process.env.NODE_ENV&&(forbidNewOperator(this,i),r=r||[t],assert(isType(s),function(){return"Invalid value "+assert.stringify(e)+" supplied to "+r.join("/")+" (no constructor returned by dispatch)"}),r[r.length-1]+="("+getTypeName(s)+")"),create(s,e,r))}"production"!==process.env.NODE_ENV&&(assert(isArray(e)&&e.every(isFunction)&&e.length>=2,function(){return"Invalid argument types "+assert.stringify(e)+" supplied to union(types, [name]) combinator (expected an array of at least 2 types)"}),assert(isTypeName(r),function(){return"Invalid argument name "+assert.stringify(r)+" supplied to union(types, [name]) combinator (expected a string)"}));var t=r||getDefaultName(e),n=e.every(isIdentity);return i.meta={kind:"union",types:e,name:r,identity:n},i.displayName=t,i.is=function(r){return e.some(function(e){return is(r,e)})},i.dispatch=function(r){for(var i=0,t=e.length;t>i;i++){var n=e[i];if(isUnion(n)){var s=n.dispatch(r);if(!isNil(s))return s}else if(is(r,n))return n}},i.update=function(e,r){return i(assert.update(e,r))},i}var assert=require("./assert"),isTypeName=require("./isTypeName"),isFunction=require("./isFunction"),getTypeName=require("./getTypeName"),isIdentity=require("./isIdentity"),isArray=require("./isArray"),create=require("./create"),is=require("./is"),forbidNewOperator=require("./forbidNewOperator"),isType=require("./isType"),isUnion=require("./isUnion"),isNil=require("./isNil");union.getDefaultName=getDefaultName,module.exports=union;

}).call(this,require('_process'))
},{"./assert":338,"./create":339,"./forbidNewOperator":344,"./getTypeName":347,"./is":350,"./isArray":351,"./isFunction":353,"./isIdentity":354,"./isNil":356,"./isType":361,"./isTypeName":362,"./isUnion":363,"_process":146}],373:[function(require,module,exports){
(function (process){
function getShallowCopy(e){return isArray(e)?e.concat():e instanceof Date||e instanceof RegExp?e:isObject(e)?mixin({},e):e}function update(e,t){"production"!==process.env.NODE_ENV&&assert(isObject(t),function(){return"Invalid argument patch "+assert.stringify(t)+" supplied to function update(instance, patch): expected an object containing commands"});var r=getShallowCopy(e),i=!1;for(var a in t)if(t.hasOwnProperty(a))if(update.commands.hasOwnProperty(a))r=update.commands[a](t[a],r),i=!0;else{var n=update(r[a],t[a]);i=i||n!==r[a],r[a]=n}return i?r:e}function $apply(e,t){return"production"!==process.env.NODE_ENV&&assert(isFunction(e),"Invalid argument f supplied to immutability helper { $apply: f } (expected a function)"),e(t)}function $push(e,t){return"production"!==process.env.NODE_ENV&&(assert(isArray(e),"Invalid argument elements supplied to immutability helper { $push: elements } (expected an array)"),assert(isArray(t),"Invalid value supplied to immutability helper $push (expected an array)")),t.concat(e)}function $remove(e,t){"production"!==process.env.NODE_ENV&&(assert(isArray(e),"Invalid argument keys supplied to immutability helper { $remove: keys } (expected an array)"),assert(isObject(t),"Invalid value supplied to immutability helper $remove (expected an object)"));for(var r=0,i=e.length;i>r;r++)delete t[e[r]];return t}function $set(e){return e}function $splice(e,t){return"production"!==process.env.NODE_ENV&&(assert(isArray(e)&&e.every(isArray),"Invalid argument splices supplied to immutability helper { $splice: splices } (expected an array of arrays)"),assert(isArray(t),"Invalid value supplied to immutability helper $splice (expected an array)")),e.reduce(function(e,t){return e.splice.apply(e,t),e},t)}function $swap(e,t){"production"!==process.env.NODE_ENV&&(assert(isObject(e),"Invalid argument config supplied to immutability helper { $swap: config } (expected an object)"),assert(isNumber(e.from),"Invalid argument config.from supplied to immutability helper { $swap: config } (expected a number)"),assert(isNumber(e.to),"Invalid argument config.to supplied to immutability helper { $swap: config } (expected a number)"),assert(isArray(t),"Invalid value supplied to immutability helper $swap (expected an array)"));var r=t[e.to];return t[e.to]=t[e.from],t[e.from]=r,t}function $unshift(e,t){return"production"!==process.env.NODE_ENV&&(assert(isArray(e),"Invalid argument elements supplied to immutability helper {$unshift: elements} (expected an array)"),assert(isArray(t),"Invalid value supplied to immutability helper $unshift (expected an array)")),e.concat(t)}function $merge(e,t){return mixin(mixin({},t),e,!0)}var assert=require("./assert"),isObject=require("./isObject"),isFunction=require("./isFunction"),isArray=require("./isArray"),isNumber=require("./isNumber"),mixin=require("./mixin");update.commands={$apply:$apply,$push:$push,$remove:$remove,$set:$set,$splice:$splice,$swap:$swap,$unshift:$unshift,$merge:$merge},module.exports=update;

}).call(this,require('_process'))
},{"./assert":338,"./isArray":351,"./isFunction":353,"./isNumber":357,"./isObject":358,"./mixin":367,"_process":146}],374:[function(require,module,exports){
"use strict";var t=require("tcomb"),H=t.refinement(t.Function,function(t){return 3===t.length},"HyperscriptCompatibleFunction");t.Type=t.Type||t.irreducible("Type",t.isType);var Props=t.struct({value:t.Any,type:t.Type,layout:t.maybe(t.Function),onUpdate:t.maybe(t.Function)}),View=t.func([H,Props],t.Any);module.exports={H:H,Props:Props,View:View};

},{"tcomb":326}],375:[function(require,module,exports){
"use strict";function viewEnums(e,n){function t(e){i(e.target.value)}var a=n.type,r=n.key,u=n.value,i=n.onUpdate,d=findIndex(a.meta.map,function(e,n){return n===u});return e("select",{name:r,selectedIndex:d,onchange:t},["\n      ",map(a.meta.map,function(n,t){return e("option",{value:t},["\n            ",n,"\n          "])}),"\n    "])}var hyperx=0,map=require("lodash/map"),findIndex=require("lodash/findIndex");module.exports=viewEnums;

},{"lodash/findIndex":304,"lodash/map":322}],376:[function(require,module,exports){
"use strict";function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var _module$exports,t=require("tcomb");module.exports=(_module$exports={},_defineProperty(_module$exports,t.String,require("./string")),_defineProperty(_module$exports,"irreducible",require("./irreducible")),_defineProperty(_module$exports,"struct",require("./struct")),_defineProperty(_module$exports,"subtype",require("./subtype")),_defineProperty(_module$exports,"enums",require("./enums")),_defineProperty(_module$exports,"maybe",require("./maybe")),_module$exports);

},{"./enums":375,"./irreducible":377,"./maybe":378,"./string":379,"./struct":380,"./subtype":381,"tcomb":326}],377:[function(require,module,exports){
"use strict";function irreducibleView(e,r){var i=(r.type,r.value);return e("div",{className:"value"},["\n      ",i,"\n    "])}var hyperx=0;module.exports=irreducibleView;

},{}],378:[function(require,module,exports){
"use strict";function viewMaybe(e,r){return view(e,Props.update(r,{type:{$set:r.type.meta.type}}))}var view=require("../"),_require=require("../types"),Props=_require.Props;module.exports=viewMaybe;

},{"../":228,"../types":374}],379:[function(require,module,exports){
"use strict";function viewString(t,e){function n(t){u(t.target.value)}var r=(e.type,e.value),u=e.onUpdate;return t("input",{type:"text",value:r,oninput:n})}var hyperx=0;module.exports=viewString;

},{}],380:[function(require,module,exports){
"use strict";function _defineProperty(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function structView(e,r){function n(e){return function(r){var n=_defineProperty({},e,{$set:r});i(a.update(t,n))}}var a=r.type,t=r.value,i=r.onUpdate;return e("div",{className:"props"},["\n      ",map(a.meta.props,function(r,a){var i=t[a];return e("div",{className:"key-value-pair"},["\n            ",e("div",{className:"key"},["\n              ",a,"\n            "]),"\n            ",e("div",{className:"value"},["\n              ",view(e,{type:r,key:a,value:i,onUpdate:n(a)}),"\n            "]),"\n          "])}),"\n    "])}var hyperx=0,map=require("lodash/map"),view=require("../");module.exports=structView;

},{"../":228,"lodash/map":322}],381:[function(require,module,exports){
"use strict";function viewSubtype(e,r){return view(e,Props.update(r,{type:{$set:r.type.meta.type}}))}var view=require("../"),_require=require("../types"),Props=_require.Props;module.exports=viewSubtype;

},{"../":228,"../types":374}]},{},[1]);

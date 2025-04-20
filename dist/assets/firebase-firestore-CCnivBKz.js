import{g as El,_ as vl,a as Il,d as Al,c as wl,L as Rl,b as Ot,F as Vl,S as Pl,e as Cl,C as Sl,r as oo,f as Dl,h as bt,i as bl,j as kl}from"./firebase-app-CzzSlWfx.js";var ao=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Wt,ua;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,p){function _(){}_.prototype=p.prototype,E.D=p.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(y,T,A){for(var g=Array(arguments.length-2),xt=2;xt<arguments.length;xt++)g[xt-2]=arguments[xt];return p.prototype[T].apply(y,g)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,p,_){_||(_=0);var y=Array(16);if(typeof p=="string")for(var T=0;16>T;++T)y[T]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(T=0;16>T;++T)y[T]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=E.g[0],_=E.g[1],T=E.g[2];var A=E.g[3],g=p+(A^_&(T^A))+y[0]+3614090360&4294967295;p=_+(g<<7&4294967295|g>>>25),g=A+(T^p&(_^T))+y[1]+3905402710&4294967295,A=p+(g<<12&4294967295|g>>>20),g=T+(_^A&(p^_))+y[2]+606105819&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(p^T&(A^p))+y[3]+3250441966&4294967295,_=T+(g<<22&4294967295|g>>>10),g=p+(A^_&(T^A))+y[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(T^p&(_^T))+y[5]+1200080426&4294967295,A=p+(g<<12&4294967295|g>>>20),g=T+(_^A&(p^_))+y[6]+2821735955&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(p^T&(A^p))+y[7]+4249261313&4294967295,_=T+(g<<22&4294967295|g>>>10),g=p+(A^_&(T^A))+y[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(T^p&(_^T))+y[9]+2336552879&4294967295,A=p+(g<<12&4294967295|g>>>20),g=T+(_^A&(p^_))+y[10]+4294925233&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(p^T&(A^p))+y[11]+2304563134&4294967295,_=T+(g<<22&4294967295|g>>>10),g=p+(A^_&(T^A))+y[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(T^p&(_^T))+y[13]+4254626195&4294967295,A=p+(g<<12&4294967295|g>>>20),g=T+(_^A&(p^_))+y[14]+2792965006&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(p^T&(A^p))+y[15]+1236535329&4294967295,_=T+(g<<22&4294967295|g>>>10),g=p+(T^A&(_^T))+y[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(p^_))+y[6]+3225465664&4294967295,A=p+(g<<9&4294967295|g>>>23),g=T+(p^_&(A^p))+y[11]+643717713&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(T^A))+y[0]+3921069994&4294967295,_=T+(g<<20&4294967295|g>>>12),g=p+(T^A&(_^T))+y[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(p^_))+y[10]+38016083&4294967295,A=p+(g<<9&4294967295|g>>>23),g=T+(p^_&(A^p))+y[15]+3634488961&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(T^A))+y[4]+3889429448&4294967295,_=T+(g<<20&4294967295|g>>>12),g=p+(T^A&(_^T))+y[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(p^_))+y[14]+3275163606&4294967295,A=p+(g<<9&4294967295|g>>>23),g=T+(p^_&(A^p))+y[3]+4107603335&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(T^A))+y[8]+1163531501&4294967295,_=T+(g<<20&4294967295|g>>>12),g=p+(T^A&(_^T))+y[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(p^_))+y[2]+4243563512&4294967295,A=p+(g<<9&4294967295|g>>>23),g=T+(p^_&(A^p))+y[7]+1735328473&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(T^A))+y[12]+2368359562&4294967295,_=T+(g<<20&4294967295|g>>>12),g=p+(_^T^A)+y[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^T)+y[8]+2272392833&4294967295,A=p+(g<<11&4294967295|g>>>21),g=T+(A^p^_)+y[11]+1839030562&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^p)+y[14]+4259657740&4294967295,_=T+(g<<23&4294967295|g>>>9),g=p+(_^T^A)+y[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^T)+y[4]+1272893353&4294967295,A=p+(g<<11&4294967295|g>>>21),g=T+(A^p^_)+y[7]+4139469664&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^p)+y[10]+3200236656&4294967295,_=T+(g<<23&4294967295|g>>>9),g=p+(_^T^A)+y[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^T)+y[0]+3936430074&4294967295,A=p+(g<<11&4294967295|g>>>21),g=T+(A^p^_)+y[3]+3572445317&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^p)+y[6]+76029189&4294967295,_=T+(g<<23&4294967295|g>>>9),g=p+(_^T^A)+y[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^T)+y[12]+3873151461&4294967295,A=p+(g<<11&4294967295|g>>>21),g=T+(A^p^_)+y[15]+530742520&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^p)+y[2]+3299628645&4294967295,_=T+(g<<23&4294967295|g>>>9),g=p+(T^(_|~A))+y[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~T))+y[7]+1126891415&4294967295,A=p+(g<<10&4294967295|g>>>22),g=T+(p^(A|~_))+y[14]+2878612391&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~p))+y[5]+4237533241&4294967295,_=T+(g<<21&4294967295|g>>>11),g=p+(T^(_|~A))+y[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~T))+y[3]+2399980690&4294967295,A=p+(g<<10&4294967295|g>>>22),g=T+(p^(A|~_))+y[10]+4293915773&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~p))+y[1]+2240044497&4294967295,_=T+(g<<21&4294967295|g>>>11),g=p+(T^(_|~A))+y[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~T))+y[15]+4264355552&4294967295,A=p+(g<<10&4294967295|g>>>22),g=T+(p^(A|~_))+y[6]+2734768916&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~p))+y[13]+1309151649&4294967295,_=T+(g<<21&4294967295|g>>>11),g=p+(T^(_|~A))+y[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~T))+y[11]+3174756917&4294967295,A=p+(g<<10&4294967295|g>>>22),g=T+(p^(A|~_))+y[2]+718787259&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~p))+y[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(T+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+A&4294967295}n.prototype.u=function(E,p){p===void 0&&(p=E.length);for(var _=p-this.blockSize,y=this.B,T=this.h,A=0;A<p;){if(T==0)for(;A<=_;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<p;)if(y[T++]=E.charCodeAt(A++),T==this.blockSize){i(this,y),T=0;break}}else for(;A<p;)if(y[T++]=E[A++],T==this.blockSize){i(this,y),T=0;break}}this.h=T,this.o+=p},n.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;var _=8*this.o;for(p=E.length-8;p<E.length;++p)E[p]=_&255,_/=256;for(this.u(E),E=Array(16),p=_=0;4>p;++p)for(var y=0;32>y;y+=8)E[_++]=this.g[p]>>>y&255;return E};function o(E,p){var _=c;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=p(E)}function u(E,p){this.h=p;for(var _=[],y=!0,T=E.length-1;0<=T;T--){var A=E[T]|0;y&&A==p||(_[T]=A,y=!1)}this.g=_}var c={};function h(E){return-128<=E&&128>E?o(E,function(p){return new u([p|0],0>p?-1:0)}):new u([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return v;if(0>E)return D(d(-E));for(var p=[],_=1,y=0;E>=_;y++)p[y]=E/_|0,_*=4294967296;return new u(p,0)}function m(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return D(m(E.substring(1),p));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(p,8)),y=v,T=0;T<E.length;T+=8){var A=Math.min(8,E.length-T),g=parseInt(E.substring(T,T+A),p);8>A?(A=d(Math.pow(p,A)),y=y.j(A).add(d(g))):(y=y.j(_),y=y.add(d(g)))}return y}var v=h(0),w=h(1),C=h(16777216);r=u.prototype,r.m=function(){if(x(this))return-D(this).m();for(var E=0,p=1,_=0;_<this.g.length;_++){var y=this.i(_);E+=(0<=y?y:4294967296+y)*p,p*=4294967296}return E},r.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(b(this))return"0";if(x(this))return"-"+D(this).toString(E);for(var p=d(Math.pow(E,6)),_=this,y="";;){var T=rt(_,p).g;_=z(_,T.j(p));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=T,b(_))return A+y;for(;6>A.length;)A="0"+A;y=A+y}},r.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function b(E){if(E.h!=0)return!1;for(var p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function x(E){return E.h==-1}r.l=function(E){return E=z(this,E),x(E)?-1:b(E)?0:1};function D(E){for(var p=E.g.length,_=[],y=0;y<p;y++)_[y]=~E.g[y];return new u(_,~E.h).add(w)}r.abs=function(){return x(this)?D(this):this},r.add=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0,T=0;T<=p;T++){var A=y+(this.i(T)&65535)+(E.i(T)&65535),g=(A>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);y=g>>>16,A&=65535,g&=65535,_[T]=g<<16|A}return new u(_,_[_.length-1]&-2147483648?-1:0)};function z(E,p){return E.add(D(p))}r.j=function(E){if(b(this)||b(E))return v;if(x(this))return x(E)?D(this).j(D(E)):D(D(this).j(E));if(x(E))return D(this.j(D(E)));if(0>this.l(C)&&0>E.l(C))return d(this.m()*E.m());for(var p=this.g.length+E.g.length,_=[],y=0;y<2*p;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var T=0;T<E.g.length;T++){var A=this.i(y)>>>16,g=this.i(y)&65535,xt=E.i(T)>>>16,xe=E.i(T)&65535;_[2*y+2*T]+=g*xe,G(_,2*y+2*T),_[2*y+2*T+1]+=A*xe,G(_,2*y+2*T+1),_[2*y+2*T+1]+=g*xt,G(_,2*y+2*T+1),_[2*y+2*T+2]+=A*xt,G(_,2*y+2*T+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new u(_,0)};function G(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function K(E,p){this.g=E,this.h=p}function rt(E,p){if(b(p))throw Error("division by zero");if(b(E))return new K(v,v);if(x(E))return p=rt(D(E),p),new K(D(p.g),D(p.h));if(x(p))return p=rt(E,D(p)),new K(D(p.g),p.h);if(30<E.g.length){if(x(E)||x(p))throw Error("slowDivide_ only works with positive integers.");for(var _=w,y=p;0>=y.l(E);)_=Nt(_),y=Nt(y);var T=it(_,1),A=it(y,1);for(y=it(y,2),_=it(_,2);!b(y);){var g=A.add(y);0>=g.l(E)&&(T=T.add(_),A=g),y=it(y,1),_=it(_,1)}return p=z(E,T.j(p)),new K(T,p)}for(T=v;0<=E.l(p);){for(_=Math.max(1,Math.floor(E.m()/p.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),A=d(_),g=A.j(p);x(g)||0<g.l(E);)_-=y,A=d(_),g=A.j(p);b(A)&&(A=w),T=T.add(A),E=z(E,g)}return new K(T,E)}r.A=function(E){return rt(this,E).h},r.and=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)&E.i(y);return new u(_,this.h&E.h)},r.or=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)|E.i(y);return new u(_,this.h|E.h)},r.xor=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)^E.i(y);return new u(_,this.h^E.h)};function Nt(E){for(var p=E.g.length+1,_=[],y=0;y<p;y++)_[y]=E.i(y)<<1|E.i(y-1)>>>31;return new u(_,E.h)}function it(E,p){var _=p>>5;p%=32;for(var y=E.g.length-_,T=[],A=0;A<y;A++)T[A]=0<p?E.i(A+_)>>>p|E.i(A+_+1)<<32-p:E.i(A+_);return new u(T,E.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,ua=n,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.A,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=d,u.fromString=m,Wt=u}).apply(typeof ao<"u"?ao:typeof self<"u"?self:typeof window<"u"?window:{});var Fn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var la,Ye,ca,zn,rs,ha,fa,da;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,a,l){return s==Array.prototype||s==Object.prototype||(s[a]=l.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Fn=="object"&&Fn];for(var a=0;a<s.length;++a){var l=s[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var n=e(this);function i(s,a){if(a)t:{var l=n;s=s.split(".");for(var f=0;f<s.length-1;f++){var I=s[f];if(!(I in l))break t;l=l[I]}s=s[s.length-1],f=l[s],a=a(f),a!=f&&a!=null&&t(l,s,{configurable:!0,writable:!0,value:a})}}function o(s,a){s instanceof String&&(s+="");var l=0,f=!1,I={next:function(){if(!f&&l<s.length){var R=l++;return{value:a(R,s[R]),done:!1}}return f=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}i("Array.prototype.values",function(s){return s||function(){return o(this,function(a,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var u=u||{},c=this||self;function h(s){var a=typeof s;return a=a!="object"?a:s?Array.isArray(s)?"array":a:"null",a=="array"||a=="object"&&typeof s.length=="number"}function d(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function m(s,a,l){return s.call.apply(s.bind,arguments)}function v(s,a,l){if(!s)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,f),s.apply(a,I)}}return function(){return s.apply(a,arguments)}}function w(s,a,l){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:v,w.apply(null,arguments)}function C(s,a){var l=Array.prototype.slice.call(arguments,1);return function(){var f=l.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function b(s,a){function l(){}l.prototype=a.prototype,s.aa=a.prototype,s.prototype=new l,s.prototype.constructor=s,s.Qb=function(f,I,R){for(var S=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)S[Q-2]=arguments[Q];return a.prototype[I].apply(f,S)}}function x(s){const a=s.length;if(0<a){const l=Array(a);for(let f=0;f<a;f++)l[f]=s[f];return l}return[]}function D(s,a){for(let l=1;l<arguments.length;l++){const f=arguments[l];if(h(f)){const I=s.length||0,R=f.length||0;s.length=I+R;for(let S=0;S<R;S++)s[I+S]=f[S]}else s.push(f)}}class z{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function G(s){return/^[\s\xa0]*$/.test(s)}function K(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function rt(s){return rt[" "](s),s}rt[" "]=function(){};var Nt=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function it(s,a,l){for(const f in s)a.call(l,s[f],f,s)}function E(s,a){for(const l in s)a.call(void 0,s[l],l,s)}function p(s){const a={};for(const l in s)a[l]=s[l];return a}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,a){let l,f;for(let I=1;I<arguments.length;I++){f=arguments[I];for(l in f)s[l]=f[l];for(let R=0;R<_.length;R++)l=_[R],Object.prototype.hasOwnProperty.call(f,l)&&(s[l]=f[l])}}function T(s){var a=1;s=s.split(":");const l=[];for(;0<a&&s.length;)l.push(s.shift()),a--;return s.length&&l.push(s.join(":")),l}function A(s){c.setTimeout(()=>{throw s},0)}function g(){var s=Sr;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class xt{constructor(){this.h=this.g=null}add(a,l){const f=xe.get();f.set(a,l),this.h?this.h.next=f:this.g=f,this.h=f}}var xe=new z(()=>new Uu,s=>s.reset());class Uu{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Me,Le=!1,Sr=new xt,oi=()=>{const s=c.Promise.resolve(void 0);Me=()=>{s.then(qu)}};var qu=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(l){A(l)}var a=xe;a.j(s),100>a.h&&(a.h++,s.next=a.g,a.g=s)}Le=!1};function zt(){this.s=this.s,this.C=this.C}zt.prototype.s=!1,zt.prototype.ma=function(){this.s||(this.s=!0,this.N())},zt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ct(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}ct.prototype.h=function(){this.defaultPrevented=!0};var Bu=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};c.addEventListener("test",l,a),c.removeEventListener("test",l,a)}catch{}return s}();function Oe(s,a){if(ct.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var l=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget){if(Nt){t:{try{rt(a.nodeName);var I=!0;break t}catch{}I=!1}I||(a=null)}}else l=="mouseover"?a=s.fromElement:l=="mouseout"&&(a=s.toElement);this.relatedTarget=a,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:ju[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&Oe.aa.h.call(this)}}b(Oe,ct);var ju={2:"touch",3:"pen",4:"mouse"};Oe.prototype.h=function(){Oe.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var Tn="closure_listenable_"+(1e6*Math.random()|0),zu=0;function $u(s,a,l,f,I){this.listener=s,this.proxy=null,this.src=a,this.type=l,this.capture=!!f,this.ha=I,this.key=++zu,this.da=this.fa=!1}function En(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function vn(s){this.src=s,this.g={},this.h=0}vn.prototype.add=function(s,a,l,f,I){var R=s.toString();s=this.g[R],s||(s=this.g[R]=[],this.h++);var S=br(s,a,f,I);return-1<S?(a=s[S],l||(a.fa=!1)):(a=new $u(a,this.src,R,!!f,I),a.fa=l,s.push(a)),a};function Dr(s,a){var l=a.type;if(l in s.g){var f=s.g[l],I=Array.prototype.indexOf.call(f,a,void 0),R;(R=0<=I)&&Array.prototype.splice.call(f,I,1),R&&(En(a),s.g[l].length==0&&(delete s.g[l],s.h--))}}function br(s,a,l,f){for(var I=0;I<s.length;++I){var R=s[I];if(!R.da&&R.listener==a&&R.capture==!!l&&R.ha==f)return I}return-1}var kr="closure_lm_"+(1e6*Math.random()|0),Nr={};function ai(s,a,l,f,I){if(Array.isArray(a)){for(var R=0;R<a.length;R++)ai(s,a[R],l,f,I);return null}return l=ci(l),s&&s[Tn]?s.K(a,l,d(f)?!!f.capture:!1,I):Gu(s,a,l,!1,f,I)}function Gu(s,a,l,f,I,R){if(!a)throw Error("Invalid event type");var S=d(I)?!!I.capture:!!I,Q=Mr(s);if(Q||(s[kr]=Q=new vn(s)),l=Q.add(a,l,f,S,R),l.proxy)return l;if(f=Ku(),l.proxy=f,f.src=s,f.listener=l,s.addEventListener)Bu||(I=S),I===void 0&&(I=!1),s.addEventListener(a.toString(),f,I);else if(s.attachEvent)s.attachEvent(li(a.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return l}function Ku(){function s(l){return a.call(s.src,s.listener,l)}const a=Qu;return s}function ui(s,a,l,f,I){if(Array.isArray(a))for(var R=0;R<a.length;R++)ui(s,a[R],l,f,I);else f=d(f)?!!f.capture:!!f,l=ci(l),s&&s[Tn]?(s=s.i,a=String(a).toString(),a in s.g&&(R=s.g[a],l=br(R,l,f,I),-1<l&&(En(R[l]),Array.prototype.splice.call(R,l,1),R.length==0&&(delete s.g[a],s.h--)))):s&&(s=Mr(s))&&(a=s.g[a.toString()],s=-1,a&&(s=br(a,l,f,I)),(l=-1<s?a[s]:null)&&xr(l))}function xr(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[Tn])Dr(a.i,s);else{var l=s.type,f=s.proxy;a.removeEventListener?a.removeEventListener(l,f,s.capture):a.detachEvent?a.detachEvent(li(l),f):a.addListener&&a.removeListener&&a.removeListener(f),(l=Mr(a))?(Dr(l,s),l.h==0&&(l.src=null,a[kr]=null)):En(s)}}}function li(s){return s in Nr?Nr[s]:Nr[s]="on"+s}function Qu(s,a){if(s.da)s=!0;else{a=new Oe(a,this);var l=s.listener,f=s.ha||s.src;s.fa&&xr(s),s=l.call(f,a)}return s}function Mr(s){return s=s[kr],s instanceof vn?s:null}var Lr="__closure_events_fn_"+(1e9*Math.random()>>>0);function ci(s){return typeof s=="function"?s:(s[Lr]||(s[Lr]=function(a){return s.handleEvent(a)}),s[Lr])}function ht(){zt.call(this),this.i=new vn(this),this.M=this,this.F=null}b(ht,zt),ht.prototype[Tn]=!0,ht.prototype.removeEventListener=function(s,a,l,f){ui(this,s,a,l,f)};function yt(s,a){var l,f=s.F;if(f)for(l=[];f;f=f.F)l.push(f);if(s=s.M,f=a.type||a,typeof a=="string")a=new ct(a,s);else if(a instanceof ct)a.target=a.target||s;else{var I=a;a=new ct(f,s),y(a,I)}if(I=!0,l)for(var R=l.length-1;0<=R;R--){var S=a.g=l[R];I=In(S,f,!0,a)&&I}if(S=a.g=s,I=In(S,f,!0,a)&&I,I=In(S,f,!1,a)&&I,l)for(R=0;R<l.length;R++)S=a.g=l[R],I=In(S,f,!1,a)&&I}ht.prototype.N=function(){if(ht.aa.N.call(this),this.i){var s=this.i,a;for(a in s.g){for(var l=s.g[a],f=0;f<l.length;f++)En(l[f]);delete s.g[a],s.h--}}this.F=null},ht.prototype.K=function(s,a,l,f){return this.i.add(String(s),a,!1,l,f)},ht.prototype.L=function(s,a,l,f){return this.i.add(String(s),a,!0,l,f)};function In(s,a,l,f){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();for(var I=!0,R=0;R<a.length;++R){var S=a[R];if(S&&!S.da&&S.capture==l){var Q=S.listener,ot=S.ha||S.src;S.fa&&Dr(s.i,S),I=Q.call(ot,f)!==!1&&I}}return I&&!f.defaultPrevented}function hi(s,a,l){if(typeof s=="function")l&&(s=w(s,l));else if(s&&typeof s.handleEvent=="function")s=w(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:c.setTimeout(s,a||0)}function fi(s){s.g=hi(()=>{s.g=null,s.i&&(s.i=!1,fi(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class Wu extends zt{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:fi(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Fe(s){zt.call(this),this.h=s,this.g={}}b(Fe,zt);var di=[];function mi(s){it(s.g,function(a,l){this.g.hasOwnProperty(l)&&xr(a)},s),s.g={}}Fe.prototype.N=function(){Fe.aa.N.call(this),mi(this)},Fe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Or=c.JSON.stringify,Hu=c.JSON.parse,Xu=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function Fr(){}Fr.prototype.h=null;function pi(s){return s.h||(s.h=s.i())}function gi(){}var Ue={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ur(){ct.call(this,"d")}b(Ur,ct);function qr(){ct.call(this,"c")}b(qr,ct);var se={},_i=null;function An(){return _i=_i||new ht}se.La="serverreachability";function yi(s){ct.call(this,se.La,s)}b(yi,ct);function qe(s){const a=An();yt(a,new yi(a))}se.STAT_EVENT="statevent";function Ti(s,a){ct.call(this,se.STAT_EVENT,s),this.stat=a}b(Ti,ct);function Tt(s){const a=An();yt(a,new Ti(a,s))}se.Ma="timingevent";function Ei(s,a){ct.call(this,se.Ma,s),this.size=a}b(Ei,ct);function Be(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},a)}function je(){this.g=!0}je.prototype.xa=function(){this.g=!1};function Yu(s,a,l,f,I,R){s.info(function(){if(s.g)if(R)for(var S="",Q=R.split("&"),ot=0;ot<Q.length;ot++){var j=Q[ot].split("=");if(1<j.length){var ft=j[0];j=j[1];var dt=ft.split("_");S=2<=dt.length&&dt[1]=="type"?S+(ft+"="+j+"&"):S+(ft+"=redacted&")}}else S=null;else S=R;return"XMLHTTP REQ ("+f+") [attempt "+I+"]: "+a+`
`+l+`
`+S})}function Ju(s,a,l,f,I,R,S){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+I+"]: "+a+`
`+l+`
`+R+" "+S})}function de(s,a,l,f){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+tl(s,l)+(f?" "+f:"")})}function Zu(s,a){s.info(function(){return"TIMEOUT: "+a})}je.prototype.info=function(){};function tl(s,a){if(!s.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(s=0;s<l.length;s++)if(Array.isArray(l[s])){var f=l[s];if(!(2>f.length)){var I=f[1];if(Array.isArray(I)&&!(1>I.length)){var R=I[0];if(R!="noop"&&R!="stop"&&R!="close")for(var S=1;S<I.length;S++)I[S]=""}}}}return Or(l)}catch{return a}}var wn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},vi={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Br;function Rn(){}b(Rn,Fr),Rn.prototype.g=function(){return new XMLHttpRequest},Rn.prototype.i=function(){return{}},Br=new Rn;function $t(s,a,l,f){this.j=s,this.i=a,this.l=l,this.R=f||1,this.U=new Fe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ii}function Ii(){this.i=null,this.g="",this.h=!1}var Ai={},jr={};function zr(s,a,l){s.L=1,s.v=Sn(Mt(a)),s.m=l,s.P=!0,wi(s,null)}function wi(s,a){s.F=Date.now(),Vn(s),s.A=Mt(s.v);var l=s.A,f=s.R;Array.isArray(f)||(f=[String(f)]),Fi(l.i,"t",f),s.C=0,l=s.j.J,s.h=new Ii,s.g=no(s.j,l?a:null,!s.m),0<s.O&&(s.M=new Wu(w(s.Y,s,s.g),s.O)),a=s.U,l=s.g,f=s.ca;var I="readystatechange";Array.isArray(I)||(I&&(di[0]=I.toString()),I=di);for(var R=0;R<I.length;R++){var S=ai(l,I[R],f||a.handleEvent,!1,a.h||a);if(!S)break;a.g[S.key]=S}a=s.H?p(s.H):{},s.m?(s.u||(s.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,a)):(s.u="GET",s.g.ea(s.A,s.u,null,a)),qe(),Yu(s.i,s.u,s.A,s.l,s.R,s.m)}$t.prototype.ca=function(s){s=s.target;const a=this.M;a&&Lt(s)==3?a.j():this.Y(s)},$t.prototype.Y=function(s){try{if(s==this.g)t:{const dt=Lt(this.g);var a=this.g.Ba();const ge=this.g.Z();if(!(3>dt)&&(dt!=3||this.g&&(this.h.h||this.g.oa()||Gi(this.g)))){this.J||dt!=4||a==7||(a==8||0>=ge?qe(3):qe(2)),$r(this);var l=this.g.Z();this.X=l;e:if(Ri(this)){var f=Gi(this.g);s="";var I=f.length,R=Lt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ie(this),ze(this);var S="";break e}this.h.i=new c.TextDecoder}for(a=0;a<I;a++)this.h.h=!0,s+=this.h.i.decode(f[a],{stream:!(R&&a==I-1)});f.length=0,this.h.g+=s,this.C=0,S=this.h.g}else S=this.g.oa();if(this.o=l==200,Ju(this.i,this.u,this.A,this.l,this.R,dt,l),this.o){if(this.T&&!this.K){e:{if(this.g){var Q,ot=this.g;if((Q=ot.g?ot.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(Q)){var j=Q;break e}}j=null}if(l=j)de(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Gr(this,l);else{this.o=!1,this.s=3,Tt(12),ie(this),ze(this);break t}}if(this.P){l=!0;let Vt;for(;!this.J&&this.C<S.length;)if(Vt=el(this,S),Vt==jr){dt==4&&(this.s=4,Tt(14),l=!1),de(this.i,this.l,null,"[Incomplete Response]");break}else if(Vt==Ai){this.s=4,Tt(15),de(this.i,this.l,S,"[Invalid Chunk]"),l=!1;break}else de(this.i,this.l,Vt,null),Gr(this,Vt);if(Ri(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),dt!=4||S.length!=0||this.h.h||(this.s=1,Tt(16),l=!1),this.o=this.o&&l,!l)de(this.i,this.l,S,"[Invalid Chunked Response]"),ie(this),ze(this);else if(0<S.length&&!this.W){this.W=!0;var ft=this.j;ft.g==this&&ft.ba&&!ft.M&&(ft.j.info("Great, no buffering proxy detected. Bytes received: "+S.length),Yr(ft),ft.M=!0,Tt(11))}}else de(this.i,this.l,S,null),Gr(this,S);dt==4&&ie(this),this.o&&!this.J&&(dt==4?Ji(this.j,this):(this.o=!1,Vn(this)))}else yl(this.g),l==400&&0<S.indexOf("Unknown SID")?(this.s=3,Tt(12)):(this.s=0,Tt(13)),ie(this),ze(this)}}}catch{}finally{}};function Ri(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function el(s,a){var l=s.C,f=a.indexOf(`
`,l);return f==-1?jr:(l=Number(a.substring(l,f)),isNaN(l)?Ai:(f+=1,f+l>a.length?jr:(a=a.slice(f,f+l),s.C=f+l,a)))}$t.prototype.cancel=function(){this.J=!0,ie(this)};function Vn(s){s.S=Date.now()+s.I,Vi(s,s.I)}function Vi(s,a){if(s.B!=null)throw Error("WatchDog timer not null");s.B=Be(w(s.ba,s),a)}function $r(s){s.B&&(c.clearTimeout(s.B),s.B=null)}$t.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Zu(this.i,this.A),this.L!=2&&(qe(),Tt(17)),ie(this),this.s=2,ze(this)):Vi(this,this.S-s)};function ze(s){s.j.G==0||s.J||Ji(s.j,s)}function ie(s){$r(s);var a=s.M;a&&typeof a.ma=="function"&&a.ma(),s.M=null,mi(s.U),s.g&&(a=s.g,s.g=null,a.abort(),a.ma())}function Gr(s,a){try{var l=s.j;if(l.G!=0&&(l.g==s||Kr(l.h,s))){if(!s.K&&Kr(l.h,s)&&l.G==3){try{var f=l.Da.g.parse(a)}catch{f=null}if(Array.isArray(f)&&f.length==3){var I=f;if(I[0]==0){t:if(!l.u){if(l.g)if(l.g.F+3e3<s.F)Mn(l),Nn(l);else break t;Xr(l),Tt(18)}}else l.za=I[1],0<l.za-l.T&&37500>I[2]&&l.F&&l.v==0&&!l.C&&(l.C=Be(w(l.Za,l),6e3));if(1>=Si(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else ae(l,11)}else if((s.K||l.g==s)&&Mn(l),!G(a))for(I=l.Da.g.parse(a),a=0;a<I.length;a++){let j=I[a];if(l.T=j[0],j=j[1],l.G==2)if(j[0]=="c"){l.K=j[1],l.ia=j[2];const ft=j[3];ft!=null&&(l.la=ft,l.j.info("VER="+l.la));const dt=j[4];dt!=null&&(l.Aa=dt,l.j.info("SVER="+l.Aa));const ge=j[5];ge!=null&&typeof ge=="number"&&0<ge&&(f=1.5*ge,l.L=f,l.j.info("backChannelRequestTimeoutMs_="+f)),f=l;const Vt=s.g;if(Vt){const On=Vt.g?Vt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(On){var R=f.h;R.g||On.indexOf("spdy")==-1&&On.indexOf("quic")==-1&&On.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Qr(R,R.h),R.h=null))}if(f.D){const Jr=Vt.g?Vt.g.getResponseHeader("X-HTTP-Session-Id"):null;Jr&&(f.ya=Jr,W(f.I,f.D,Jr))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-s.F,l.j.info("Handshake RTT: "+l.R+"ms")),f=l;var S=s;if(f.qa=eo(f,f.J?f.ia:null,f.W),S.K){Di(f.h,S);var Q=S,ot=f.L;ot&&(Q.I=ot),Q.B&&($r(Q),Vn(Q)),f.g=S}else Xi(f);0<l.i.length&&xn(l)}else j[0]!="stop"&&j[0]!="close"||ae(l,7);else l.G==3&&(j[0]=="stop"||j[0]=="close"?j[0]=="stop"?ae(l,7):Hr(l):j[0]!="noop"&&l.l&&l.l.ta(j),l.v=0)}}qe(4)}catch{}}var nl=class{constructor(s,a){this.g=s,this.map=a}};function Pi(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ci(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Si(s){return s.h?1:s.g?s.g.size:0}function Kr(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function Qr(s,a){s.g?s.g.add(a):s.h=a}function Di(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}Pi.prototype.cancel=function(){if(this.i=bi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function bi(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const l of s.g.values())a=a.concat(l.D);return a}return x(s.i)}function rl(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var a=[],l=s.length,f=0;f<l;f++)a.push(s[f]);return a}a=[],l=0;for(f in s)a[l++]=s[f];return a}function sl(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var a=[];s=s.length;for(var l=0;l<s;l++)a.push(l);return a}a=[],l=0;for(const f in s)a[l++]=f;return a}}}function ki(s,a){if(s.forEach&&typeof s.forEach=="function")s.forEach(a,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,a,void 0);else for(var l=sl(s),f=rl(s),I=f.length,R=0;R<I;R++)a.call(void 0,f[R],l&&l[R],s)}var Ni=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function il(s,a){if(s){s=s.split("&");for(var l=0;l<s.length;l++){var f=s[l].indexOf("="),I=null;if(0<=f){var R=s[l].substring(0,f);I=s[l].substring(f+1)}else R=s[l];a(R,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function oe(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof oe){this.h=s.h,Pn(this,s.j),this.o=s.o,this.g=s.g,Cn(this,s.s),this.l=s.l;var a=s.i,l=new Ke;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),xi(this,l),this.m=s.m}else s&&(a=String(s).match(Ni))?(this.h=!1,Pn(this,a[1]||"",!0),this.o=$e(a[2]||""),this.g=$e(a[3]||"",!0),Cn(this,a[4]),this.l=$e(a[5]||"",!0),xi(this,a[6]||"",!0),this.m=$e(a[7]||"")):(this.h=!1,this.i=new Ke(null,this.h))}oe.prototype.toString=function(){var s=[],a=this.j;a&&s.push(Ge(a,Mi,!0),":");var l=this.g;return(l||a=="file")&&(s.push("//"),(a=this.o)&&s.push(Ge(a,Mi,!0),"@"),s.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&s.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(Ge(l,l.charAt(0)=="/"?ul:al,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",Ge(l,cl)),s.join("")};function Mt(s){return new oe(s)}function Pn(s,a,l){s.j=l?$e(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function Cn(s,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);s.s=a}else s.s=null}function xi(s,a,l){a instanceof Ke?(s.i=a,hl(s.i,s.h)):(l||(a=Ge(a,ll)),s.i=new Ke(a,s.h))}function W(s,a,l){s.i.set(a,l)}function Sn(s){return W(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function $e(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Ge(s,a,l){return typeof s=="string"?(s=encodeURI(s).replace(a,ol),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function ol(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Mi=/[#\/\?@]/g,al=/[#\?:]/g,ul=/[#\?]/g,ll=/[#\?@]/g,cl=/#/g;function Ke(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function Gt(s){s.g||(s.g=new Map,s.h=0,s.i&&il(s.i,function(a,l){s.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}r=Ke.prototype,r.add=function(s,a){Gt(this),this.i=null,s=me(this,s);var l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(a),this.h+=1,this};function Li(s,a){Gt(s),a=me(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function Oi(s,a){return Gt(s),a=me(s,a),s.g.has(a)}r.forEach=function(s,a){Gt(this),this.g.forEach(function(l,f){l.forEach(function(I){s.call(a,I,f,this)},this)},this)},r.na=function(){Gt(this);const s=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let f=0;f<a.length;f++){const I=s[f];for(let R=0;R<I.length;R++)l.push(a[f])}return l},r.V=function(s){Gt(this);let a=[];if(typeof s=="string")Oi(this,s)&&(a=a.concat(this.g.get(me(this,s))));else{s=Array.from(this.g.values());for(let l=0;l<s.length;l++)a=a.concat(s[l])}return a},r.set=function(s,a){return Gt(this),this.i=null,s=me(this,s),Oi(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},r.get=function(s,a){return s?(s=this.V(s),0<s.length?String(s[0]):a):a};function Fi(s,a,l){Li(s,a),0<l.length&&(s.i=null,s.g.set(me(s,a),x(l)),s.h+=l.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var f=a[l];const R=encodeURIComponent(String(f)),S=this.V(f);for(f=0;f<S.length;f++){var I=R;S[f]!==""&&(I+="="+encodeURIComponent(String(S[f]))),s.push(I)}}return this.i=s.join("&")};function me(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function hl(s,a){a&&!s.j&&(Gt(s),s.i=null,s.g.forEach(function(l,f){var I=f.toLowerCase();f!=I&&(Li(this,f),Fi(this,I,l))},s)),s.j=a}function fl(s,a){const l=new je;if(c.Image){const f=new Image;f.onload=C(Kt,l,"TestLoadImage: loaded",!0,a,f),f.onerror=C(Kt,l,"TestLoadImage: error",!1,a,f),f.onabort=C(Kt,l,"TestLoadImage: abort",!1,a,f),f.ontimeout=C(Kt,l,"TestLoadImage: timeout",!1,a,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else a(!1)}function dl(s,a){const l=new je,f=new AbortController,I=setTimeout(()=>{f.abort(),Kt(l,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:f.signal}).then(R=>{clearTimeout(I),R.ok?Kt(l,"TestPingServer: ok",!0,a):Kt(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(I),Kt(l,"TestPingServer: error",!1,a)})}function Kt(s,a,l,f,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),f(l)}catch{}}function ml(){this.g=new Xu}function pl(s,a,l){const f=l||"";try{ki(s,function(I,R){let S=I;d(I)&&(S=Or(I)),a.push(f+R+"="+encodeURIComponent(S))})}catch(I){throw a.push(f+"type="+encodeURIComponent("_badmap")),I}}function Dn(s){this.l=s.Ub||null,this.j=s.eb||!1}b(Dn,Fr),Dn.prototype.g=function(){return new bn(this.l,this.j)},Dn.prototype.i=function(s){return function(){return s}}({});function bn(s,a){ht.call(this),this.D=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(bn,ht),r=bn.prototype,r.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=a,this.readyState=1,We(this)},r.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(a.body=s),(this.D||c).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Qe(this)),this.readyState=0},r.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,We(this)),this.g&&(this.readyState=3,We(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ui(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ui(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}r.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?Qe(this):We(this),this.readyState==3&&Ui(this)}},r.Ra=function(s){this.g&&(this.response=this.responseText=s,Qe(this))},r.Qa=function(s){this.g&&(this.response=s,Qe(this))},r.ga=function(){this.g&&Qe(this)};function Qe(s){s.readyState=4,s.l=null,s.j=null,s.v=null,We(s)}r.setRequestHeader=function(s,a){this.u.append(s,a)},r.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=a.next();return s.join(`\r
`)};function We(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(bn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function qi(s){let a="";return it(s,function(l,f){a+=f,a+=":",a+=l,a+=`\r
`}),a}function Wr(s,a,l){t:{for(f in l){var f=!1;break t}f=!0}f||(l=qi(l),typeof s=="string"?l!=null&&encodeURIComponent(String(l)):W(s,a,l))}function Y(s){ht.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(Y,ht);var gl=/^https?$/i,_l=["POST","PUT"];r=Y.prototype,r.Ha=function(s){this.J=s},r.ea=function(s,a,l,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Br.g(),this.v=this.o?pi(this.o):pi(Br),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(R){Bi(this,R);return}if(s=l||"",l=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var I in f)l.set(I,f[I]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())l.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(l.keys()).find(R=>R.toLowerCase()=="content-type"),I=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(_l,a,void 0))||f||I||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,S]of l)this.g.setRequestHeader(R,S);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$i(this),this.u=!0,this.g.send(s),this.u=!1}catch(R){Bi(this,R)}};function Bi(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.m=5,ji(s),kn(s)}function ji(s){s.A||(s.A=!0,yt(s,"complete"),yt(s,"error"))}r.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,yt(this,"complete"),yt(this,"abort"),kn(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),kn(this,!0)),Y.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?zi(this):this.bb())},r.bb=function(){zi(this)};function zi(s){if(s.h&&typeof u<"u"&&(!s.v[1]||Lt(s)!=4||s.Z()!=2)){if(s.u&&Lt(s)==4)hi(s.Ea,0,s);else if(yt(s,"readystatechange"),Lt(s)==4){s.h=!1;try{const S=s.Z();t:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var l;if(!(l=a)){var f;if(f=S===0){var I=String(s.D).match(Ni)[1]||null;!I&&c.self&&c.self.location&&(I=c.self.location.protocol.slice(0,-1)),f=!gl.test(I?I.toLowerCase():"")}l=f}if(l)yt(s,"complete"),yt(s,"success");else{s.m=6;try{var R=2<Lt(s)?s.g.statusText:""}catch{R=""}s.l=R+" ["+s.Z()+"]",ji(s)}}finally{kn(s)}}}}function kn(s,a){if(s.g){$i(s);const l=s.g,f=s.v[0]?()=>{}:null;s.g=null,s.v=null,a||yt(s,"ready");try{l.onreadystatechange=f}catch{}}}function $i(s){s.I&&(c.clearTimeout(s.I),s.I=null)}r.isActive=function(){return!!this.g};function Lt(s){return s.g?s.g.readyState:0}r.Z=function(){try{return 2<Lt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),Hu(a)}};function Gi(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function yl(s){const a={};s=(s.g&&2<=Lt(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(G(s[f]))continue;var l=T(s[f]);const I=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const R=a[I]||[];a[I]=R,R.push(l)}E(a,function(f){return f.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function He(s,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||a}function Ki(s){this.Aa=0,this.i=[],this.j=new je,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=He("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=He("baseRetryDelayMs",5e3,s),this.cb=He("retryDelaySeedMs",1e4,s),this.Wa=He("forwardChannelMaxRetries",2,s),this.wa=He("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Pi(s&&s.concurrentRequestLimit),this.Da=new ml,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Ki.prototype,r.la=8,r.G=1,r.connect=function(s,a,l,f){Tt(0),this.W=s,this.H=a||{},l&&f!==void 0&&(this.H.OSID=l,this.H.OAID=f),this.F=this.X,this.I=eo(this,null,this.W),xn(this)};function Hr(s){if(Qi(s),s.G==3){var a=s.U++,l=Mt(s.I);if(W(l,"SID",s.K),W(l,"RID",a),W(l,"TYPE","terminate"),Xe(s,l),a=new $t(s,s.j,a),a.L=2,a.v=Sn(Mt(l)),l=!1,c.navigator&&c.navigator.sendBeacon)try{l=c.navigator.sendBeacon(a.v.toString(),"")}catch{}!l&&c.Image&&(new Image().src=a.v,l=!0),l||(a.g=no(a.j,null),a.g.ea(a.v)),a.F=Date.now(),Vn(a)}to(s)}function Nn(s){s.g&&(Yr(s),s.g.cancel(),s.g=null)}function Qi(s){Nn(s),s.u&&(c.clearTimeout(s.u),s.u=null),Mn(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function xn(s){if(!Ci(s.h)&&!s.s){s.s=!0;var a=s.Ga;Me||oi(),Le||(Me(),Le=!0),Sr.add(a,s),s.B=0}}function Tl(s,a){return Si(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=a.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=Be(w(s.Ga,s,a),Zi(s,s.B)),s.B++,!0)}r.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const I=new $t(this,this.j,s);let R=this.o;if(this.S&&(R?(R=p(R),y(R,this.S)):R=this.S),this.m!==null||this.O||(I.H=R,R=null),this.P)t:{for(var a=0,l=0;l<this.i.length;l++){e:{var f=this.i[l];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(a+=f,4096<a){a=l;break t}if(a===4096||l===this.i.length-1){a=l+1;break t}}a=1e3}else a=1e3;a=Hi(this,I,a),l=Mt(this.I),W(l,"RID",s),W(l,"CVER",22),this.D&&W(l,"X-HTTP-Session-Id",this.D),Xe(this,l),R&&(this.O?a="headers="+encodeURIComponent(String(qi(R)))+"&"+a:this.m&&Wr(l,this.m,R)),Qr(this.h,I),this.Ua&&W(l,"TYPE","init"),this.P?(W(l,"$req",a),W(l,"SID","null"),I.T=!0,zr(I,l,null)):zr(I,l,a),this.G=2}}else this.G==3&&(s?Wi(this,s):this.i.length==0||Ci(this.h)||Wi(this))};function Wi(s,a){var l;a?l=a.l:l=s.U++;const f=Mt(s.I);W(f,"SID",s.K),W(f,"RID",l),W(f,"AID",s.T),Xe(s,f),s.m&&s.o&&Wr(f,s.m,s.o),l=new $t(s,s.j,l,s.B+1),s.m===null&&(l.H=s.o),a&&(s.i=a.D.concat(s.i)),a=Hi(s,l,1e3),l.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Qr(s.h,l),zr(l,f,a)}function Xe(s,a){s.H&&it(s.H,function(l,f){W(a,f,l)}),s.l&&ki({},function(l,f){W(a,f,l)})}function Hi(s,a,l){l=Math.min(s.i.length,l);var f=s.l?w(s.l.Na,s.l,s):null;t:{var I=s.i;let R=-1;for(;;){const S=["count="+l];R==-1?0<l?(R=I[0].g,S.push("ofs="+R)):R=0:S.push("ofs="+R);let Q=!0;for(let ot=0;ot<l;ot++){let j=I[ot].g;const ft=I[ot].map;if(j-=R,0>j)R=Math.max(0,I[ot].g-100),Q=!1;else try{pl(ft,S,"req"+j+"_")}catch{f&&f(ft)}}if(Q){f=S.join("&");break t}}}return s=s.i.splice(0,l),a.D=s,f}function Xi(s){if(!s.g&&!s.u){s.Y=1;var a=s.Fa;Me||oi(),Le||(Me(),Le=!0),Sr.add(a,s),s.v=0}}function Xr(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=Be(w(s.Fa,s),Zi(s,s.v)),s.v++,!0)}r.Fa=function(){if(this.u=null,Yi(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=Be(w(this.ab,this),s)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Tt(10),Nn(this),Yi(this))};function Yr(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function Yi(s){s.g=new $t(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var a=Mt(s.qa);W(a,"RID","rpc"),W(a,"SID",s.K),W(a,"AID",s.T),W(a,"CI",s.F?"0":"1"),!s.F&&s.ja&&W(a,"TO",s.ja),W(a,"TYPE","xmlhttp"),Xe(s,a),s.m&&s.o&&Wr(a,s.m,s.o),s.L&&(s.g.I=s.L);var l=s.g;s=s.ia,l.L=1,l.v=Sn(Mt(a)),l.m=null,l.P=!0,wi(l,s)}r.Za=function(){this.C!=null&&(this.C=null,Nn(this),Xr(this),Tt(19))};function Mn(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function Ji(s,a){var l=null;if(s.g==a){Mn(s),Yr(s),s.g=null;var f=2}else if(Kr(s.h,a))l=a.D,Di(s.h,a),f=1;else return;if(s.G!=0){if(a.o)if(f==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var I=s.B;f=An(),yt(f,new Ei(f,l)),xn(s)}else Xi(s);else if(I=a.s,I==3||I==0&&0<a.X||!(f==1&&Tl(s,a)||f==2&&Xr(s)))switch(l&&0<l.length&&(a=s.h,a.i=a.i.concat(l)),I){case 1:ae(s,5);break;case 4:ae(s,10);break;case 3:ae(s,6);break;default:ae(s,2)}}}function Zi(s,a){let l=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(l*=2),l*a}function ae(s,a){if(s.j.info("Error code "+a),a==2){var l=w(s.fb,s),f=s.Xa;const I=!f;f=new oe(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Pn(f,"https"),Sn(f),I?fl(f.toString(),l):dl(f.toString(),l)}else Tt(2);s.G=0,s.l&&s.l.sa(a),to(s),Qi(s)}r.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Tt(2)):(this.j.info("Failed to ping google.com"),Tt(1))};function to(s){if(s.G=0,s.ka=[],s.l){const a=bi(s.h);(a.length!=0||s.i.length!=0)&&(D(s.ka,a),D(s.ka,s.i),s.h.i.length=0,x(s.i),s.i.length=0),s.l.ra()}}function eo(s,a,l){var f=l instanceof oe?Mt(l):new oe(l);if(f.g!="")a&&(f.g=a+"."+f.g),Cn(f,f.s);else{var I=c.location;f=I.protocol,a=a?a+"."+I.hostname:I.hostname,I=+I.port;var R=new oe(null);f&&Pn(R,f),a&&(R.g=a),I&&Cn(R,I),l&&(R.l=l),f=R}return l=s.D,a=s.ya,l&&a&&W(f,l,a),W(f,"VER",s.la),Xe(s,f),f}function no(s,a,l){if(a&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Ca&&!s.pa?new Y(new Dn({eb:l})):new Y(s.pa),a.Ha(s.J),a}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function ro(){}r=ro.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Ln(){}Ln.prototype.g=function(s,a){return new At(s,a)};function At(s,a){ht.call(this),this.g=new Ki(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(s?s["X-WebChannel-Client-Profile"]=a.va:s={"X-WebChannel-Client-Profile":a.va}),this.g.S=s,(s=a&&a.Sb)&&!G(s)&&(this.g.m=s),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!G(a)&&(this.g.D=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new pe(this)}b(At,ht),At.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){Hr(this.g)},At.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.u&&(l={},l.__data__=Or(s),s=l);a.i.push(new nl(a.Ya++,s)),a.G==3&&xn(a)},At.prototype.N=function(){this.g.l=null,delete this.j,Hr(this.g),delete this.g,At.aa.N.call(this)};function so(s){Ur.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){t:{for(const l in a){s=l;break t}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}b(so,Ur);function io(){qr.call(this),this.status=1}b(io,qr);function pe(s){this.g=s}b(pe,ro),pe.prototype.ua=function(){yt(this.g,"a")},pe.prototype.ta=function(s){yt(this.g,new so(s))},pe.prototype.sa=function(s){yt(this.g,new io)},pe.prototype.ra=function(){yt(this.g,"b")},Ln.prototype.createWebChannel=Ln.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,da=function(){return new Ln},fa=function(){return An()},ha=se,rs={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},wn.NO_ERROR=0,wn.TIMEOUT=8,wn.HTTP_ERROR=6,zn=wn,vi.COMPLETE="complete",ca=vi,gi.EventType=Ue,Ue.OPEN="a",Ue.CLOSE="b",Ue.ERROR="c",Ue.MESSAGE="d",ht.prototype.listen=ht.prototype.K,Ye=gi,Y.prototype.listenOnce=Y.prototype.L,Y.prototype.getLastError=Y.prototype.Ka,Y.prototype.getLastErrorCode=Y.prototype.Ba,Y.prototype.getStatus=Y.prototype.Z,Y.prototype.getResponseJson=Y.prototype.Oa,Y.prototype.getResponseText=Y.prototype.oa,Y.prototype.send=Y.prototype.ea,Y.prototype.setWithCredentials=Y.prototype.Ha,la=Y}).apply(typeof Fn<"u"?Fn:typeof self<"u"?self:typeof window<"u"?window:{});const uo="@firebase/firestore",lo="4.7.10";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}pt.UNAUTHENTICATED=new pt(null),pt.GOOGLE_CREDENTIALS=new pt("google-credentials-uid"),pt.FIRST_PARTY=new pt("first-party-uid"),pt.MOCK_USER=new pt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Se="11.5.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le=new Rl("@firebase/firestore");function _e(){return le.logLevel}function N(r,...t){if(le.logLevel<=Ot.DEBUG){const e=t.map(Es);le.debug(`Firestore (${Se}): ${r}`,...e)}}function Ut(r,...t){if(le.logLevel<=Ot.ERROR){const e=t.map(Es);le.error(`Firestore (${Se}): ${r}`,...e)}}function Ie(r,...t){if(le.logLevel<=Ot.WARN){const e=t.map(Es);le.warn(`Firestore (${Se}): ${r}`,...e)}}function Es(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(r="Unexpected state"){const t=`FIRESTORE (${Se}) INTERNAL ASSERTION FAILED: `+r;throw Ut(t),new Error(t)}function $(r,t){r||L()}function F(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends Vl{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Nl{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(pt.UNAUTHENTICATED))}shutdown(){}}class xl{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Ml{constructor(t){this.t=t,this.currentUser=pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){$(this.o===void 0);let n=this.i;const i=h=>this.i!==n?(n=this.i,e(h)):Promise.resolve();let o=new Ft;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Ft,t.enqueueRetryable(()=>i(this.currentUser))};const u=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},c=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),u())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Ft)}},0),u()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?($(typeof n.accessToken=="string"),new ma(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return $(t===null||typeof t=="string"),new pt(t)}}class Ll{constructor(t,e,n){this.l=t,this.h=e,this.P=n,this.type="FirstParty",this.user=pt.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const t=this.I();return t&&this.T.set("Authorization",t),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class Ol{constructor(t,e,n){this.l=t,this.h=e,this.P=n}getToken(){return Promise.resolve(new Ll(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(pt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class co{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Fl{constructor(t,e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,Dl(t)&&t.settings.appCheckToken&&(this.V=t.settings.appCheckToken)}start(t,e){$(this.o===void 0);const n=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const u=o.token!==this.R;return this.R=o.token,N("FirebaseAppCheckTokenProvider",`Received ${u?"new":"existing"} token.`),u?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>n(o))};const i=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new co(this.V));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?($(typeof e.token=="string"),this.R=e.token,new co(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pa(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=Ul(40);for(let o=0;o<i.length;++o)n.length<20&&i[o]<e&&(n+=t.charAt(i[o]%62))}return n}}function U(r,t){return r<t?-1:r>t?1:0}function ss(r,t){let e=0;for(;e<r.length&&e<t.length;){const n=r.codePointAt(e),i=t.codePointAt(e);if(n!==i){if(n<128&&i<128)return U(n,i);{const o=pa(),u=ql(o.encode(ho(r,e)),o.encode(ho(t,e)));return u!==0?u:U(n,i)}}e+=n>65535?2:1}return U(r.length,t.length)}function ho(r,t){return r.codePointAt(t)>65535?r.substring(t,t+2):r.substring(t,t+1)}function ql(r,t){for(let e=0;e<r.length&&e<t.length;++e)if(r[e]!==t[e])return U(r[e],t[e]);return U(r.length,t.length)}function Ae(r,t,e){return r.length===t.length&&r.every((n,i)=>e(n,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=-62135596800,mo=1e6;class et{static now(){return et.fromMillis(Date.now())}static fromDate(t){return et.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*mo);return new et(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new k(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new k(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<fo)throw new k(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new k(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/mo}_compareTo(t){return this.seconds===t.seconds?U(this.nanoseconds,t.nanoseconds):U(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-fo;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{static fromTimestamp(t){return new O(t)}static min(){return new O(new et(0,0))}static max(){return new O(new et(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const po="__name__";class Ct{constructor(t,e,n){e===void 0?e=0:e>t.length&&L(),n===void 0?n=t.length-e:n>t.length-e&&L(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Ct.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ct?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const o=Ct.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return U(t.length,e.length)}static compareSegments(t,e){const n=Ct.isNumericId(t),i=Ct.isNumericId(e);return n&&!i?-1:!n&&i?1:n&&i?Ct.extractNumericId(t).compare(Ct.extractNumericId(e)):ss(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Wt.fromString(t.substring(4,t.length-2))}}class H extends Ct{construct(t,e,n){return new H(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new k(V.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(i=>i.length>0))}return new H(e)}static emptyPath(){return new H([])}}const Bl=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ut extends Ct{construct(t,e,n){return new ut(t,e,n)}static isValidIdentifier(t){return Bl.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ut.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===po}static keyField(){return new ut([po])}static fromServerFormat(t){const e=[];let n="",i=0;const o=()=>{if(n.length===0)throw new k(V.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let u=!1;for(;i<t.length;){const c=t[i];if(c==="\\"){if(i+1===t.length)throw new k(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new k(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=h,i+=2}else c==="`"?(u=!u,i++):c!=="."||u?(n+=c,i++):(o(),i++)}if(o(),u)throw new k(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ut(e)}static emptyPath(){return new ut([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(H.fromString(t))}static fromName(t){return new M(H.fromString(t).popFirst(5))}static empty(){return new M(H.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&H.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return H.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new H(t.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on=-1;function jl(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=O.fromTimestamp(n===1e9?new et(e+1,0):new et(e,n));return new Xt(i,M.empty(),t)}function zl(r){return new Xt(r.readTime,r.key,on)}class Xt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Xt(O.min(),M.empty(),on)}static max(){return new Xt(O.max(),M.empty(),on)}}function $l(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(r.documentKey,t.documentKey),e!==0?e:U(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Kl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function De(r){if(r.code!==V.FAILED_PRECONDITION||r.message!==Gl)throw r;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new P((n,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(n,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(n,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof P?e:P.resolve(e)}catch(e){return P.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):P.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):P.reject(e)}static resolve(t){return new P((e,n)=>{e(t)})}static reject(t){return new P((e,n)=>{n(t)})}static waitFor(t){return new P((e,n)=>{let i=0,o=0,u=!1;t.forEach(c=>{++i,c.next(()=>{++o,u&&o===i&&e()},h=>n(h))}),u=!0,o===i&&e()})}static or(t){let e=P.resolve(!1);for(const n of t)e=e.next(i=>i?P.resolve(i):n());return e}static forEach(t,e){const n=[];return t.forEach((i,o)=>{n.push(e.call(this,i,o))}),this.waitFor(n)}static mapArray(t,e){return new P((n,i)=>{const o=t.length,u=new Array(o);let c=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next(m=>{u[d]=m,++c,c===o&&n(u)},m=>i(m))}})}static doWhile(t,e){return new P((n,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):n()};o()})}}function Ql(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function be(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.oe(n),this._e=n=>e.writeSequenceNumber(n))}oe(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this._e&&this._e(t),t}}ar.ae=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vs=-1;function ur(r){return r==null}function Hn(r){return r===0&&1/r==-1/0}function Wl(r){return typeof r=="number"&&Number.isInteger(r)&&!Hn(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a="";function Hl(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=go(t)),t=Xl(r.get(e),t);return go(t)}function Xl(r,t){let e=t;const n=r.length;for(let i=0;i<n;i++){const o=r.charAt(i);switch(o){case"\0":e+="";break;case _a:e+="";break;default:e+=o}}return e}function go(r){return r+_a+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _o(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function ne(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function ya(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(t,e){this.comparator=t,this.root=e||at.EMPTY}insert(t,e){return new X(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,at.BLACK,null,null))}remove(t){return new X(this.comparator,this.root.remove(t,this.comparator).copy(null,null,at.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(t,n.key);if(i===0)return e+n.left.size;i<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Un(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Un(this.root,t,this.comparator,!1)}getReverseIterator(){return new Un(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Un(this.root,t,this.comparator,!0)}}class Un{constructor(t,e,n,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class at{constructor(t,e,n,i,o){this.key=t,this.value=e,this.color=n??at.RED,this.left=i??at.EMPTY,this.right=o??at.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,i,o){return new at(t??this.key,e??this.value,n??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let i=this;const o=n(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,n),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return at.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return at.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,at.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,at.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();const t=this.left.check();if(t!==this.right.check())throw L();return t+(this.isRed()?0:1)}}at.EMPTY=null,at.RED=!0,at.BLACK=!1;at.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(t,e,n,i,o){return this}insert(t,e,n){return new at(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(t){this.comparator=t,this.data=new X(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new yo(this.data.getIterator())}getIteratorFrom(t){return new yo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof nt)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new nt(this.comparator);return e.data=t,e}}class yo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.fields=t,t.sort(ut.comparator)}static empty(){return new wt([])}unionWith(t){let e=new nt(ut.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new wt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Ae(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Ta("Invalid base64 string: "+o):o}}(t);return new lt(e)}static fromUint8Array(t){const e=function(i){let o="";for(let u=0;u<i.length;++u)o+=String.fromCharCode(i[u]);return o}(t);return new lt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return U(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}lt.EMPTY_BYTE_STRING=new lt("");const Yl=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Yt(r){if($(!!r),typeof r=="string"){let t=0;const e=Yl.exec(r);if($(!!e),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:J(r.seconds),nanos:J(r.nanos)}}function J(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Jt(r){return typeof r=="string"?lt.fromBase64String(r):lt.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea="server_timestamp",va="__type__",Ia="__previous_value__",Aa="__local_write_time__";function Is(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{})[va])===null||e===void 0?void 0:e.stringValue)===Ea}function lr(r){const t=r.mapValue.fields[Ia];return Is(t)?lr(t):t}function an(r){const t=Yt(r.mapValue.fields[Aa].timestampValue);return new et(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(t,e,n,i,o,u,c,h,d){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=i,this.ssl=o,this.forceLongPolling=u,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=d}}const Xn="(default)";class un{constructor(t,e){this.projectId=t,this.database=e||Xn}static empty(){return new un("","")}get isDefaultDatabase(){return this.database===Xn}isEqual(t){return t instanceof un&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa="__type__",Zl="__max__",qn={mapValue:{}},Ra="__vector__",Yn="value";function Zt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Is(r)?4:ec(r)?9007199254740991:tc(r)?10:11:L()}function kt(r,t){if(r===t)return!0;const e=Zt(r);if(e!==Zt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return an(r).isEqual(an(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=Yt(i.timestampValue),c=Yt(o.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(i,o){return Jt(i.bytesValue).isEqual(Jt(o.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(i,o){return J(i.geoPointValue.latitude)===J(o.geoPointValue.latitude)&&J(i.geoPointValue.longitude)===J(o.geoPointValue.longitude)}(r,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return J(i.integerValue)===J(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const u=J(i.doubleValue),c=J(o.doubleValue);return u===c?Hn(u)===Hn(c):isNaN(u)&&isNaN(c)}return!1}(r,t);case 9:return Ae(r.arrayValue.values||[],t.arrayValue.values||[],kt);case 10:case 11:return function(i,o){const u=i.mapValue.fields||{},c=o.mapValue.fields||{};if(_o(u)!==_o(c))return!1;for(const h in u)if(u.hasOwnProperty(h)&&(c[h]===void 0||!kt(u[h],c[h])))return!1;return!0}(r,t);default:return L()}}function ln(r,t){return(r.values||[]).find(e=>kt(e,t))!==void 0}function we(r,t){if(r===t)return 0;const e=Zt(r),n=Zt(t);if(e!==n)return U(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return U(r.booleanValue,t.booleanValue);case 2:return function(o,u){const c=J(o.integerValue||o.doubleValue),h=J(u.integerValue||u.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(r,t);case 3:return To(r.timestampValue,t.timestampValue);case 4:return To(an(r),an(t));case 5:return ss(r.stringValue,t.stringValue);case 6:return function(o,u){const c=Jt(o),h=Jt(u);return c.compareTo(h)}(r.bytesValue,t.bytesValue);case 7:return function(o,u){const c=o.split("/"),h=u.split("/");for(let d=0;d<c.length&&d<h.length;d++){const m=U(c[d],h[d]);if(m!==0)return m}return U(c.length,h.length)}(r.referenceValue,t.referenceValue);case 8:return function(o,u){const c=U(J(o.latitude),J(u.latitude));return c!==0?c:U(J(o.longitude),J(u.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return Eo(r.arrayValue,t.arrayValue);case 10:return function(o,u){var c,h,d,m;const v=o.fields||{},w=u.fields||{},C=(c=v[Yn])===null||c===void 0?void 0:c.arrayValue,b=(h=w[Yn])===null||h===void 0?void 0:h.arrayValue,x=U(((d=C==null?void 0:C.values)===null||d===void 0?void 0:d.length)||0,((m=b==null?void 0:b.values)===null||m===void 0?void 0:m.length)||0);return x!==0?x:Eo(C,b)}(r.mapValue,t.mapValue);case 11:return function(o,u){if(o===qn.mapValue&&u===qn.mapValue)return 0;if(o===qn.mapValue)return 1;if(u===qn.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),d=u.fields||{},m=Object.keys(d);h.sort(),m.sort();for(let v=0;v<h.length&&v<m.length;++v){const w=ss(h[v],m[v]);if(w!==0)return w;const C=we(c[h[v]],d[m[v]]);if(C!==0)return C}return U(h.length,m.length)}(r.mapValue,t.mapValue);default:throw L()}}function To(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return U(r,t);const e=Yt(r),n=Yt(t),i=U(e.seconds,n.seconds);return i!==0?i:U(e.nanos,n.nanos)}function Eo(r,t){const e=r.values||[],n=t.values||[];for(let i=0;i<e.length&&i<n.length;++i){const o=we(e[i],n[i]);if(o)return o}return U(e.length,n.length)}function Re(r){return is(r)}function is(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=Yt(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return Jt(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return M.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",i=!0;for(const o of e.values||[])i?i=!1:n+=",",n+=is(o);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const u of n)o?o=!1:i+=",",i+=`${u}:${is(e.fields[u])}`;return i+"}"}(r.mapValue):L()}function $n(r){switch(Zt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=lr(r);return t?16+$n(t):16;case 5:return 2*r.stringValue.length;case 6:return Jt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,o)=>i+$n(o),0)}(r.arrayValue);case 10:case 11:return function(n){let i=0;return ne(n.fields,(o,u)=>{i+=o.length+$n(u)}),i}(r.mapValue);default:throw L()}}function vo(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function os(r){return!!r&&"integerValue"in r}function As(r){return!!r&&"arrayValue"in r}function Io(r){return!!r&&"nullValue"in r}function Ao(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Gn(r){return!!r&&"mapValue"in r}function tc(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{})[wa])===null||e===void 0?void 0:e.stringValue)===Ra}function en(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return ne(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=en(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=en(r.arrayValue.values[e]);return t}return Object.assign({},r)}function ec(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Zl}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(t){this.value=t}static empty(){return new vt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Gn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=en(e)}setAll(t){let e=ut.emptyPath(),n={},i=[];t.forEach((u,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,n,i),n={},i=[],e=c.popLast()}u?n[c.lastSegment()]=en(u):i.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,n,i)}delete(t){const e=this.field(t.popLast());Gn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return kt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let i=e.mapValue.fields[t.get(n)];Gn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,n){ne(e,(i,o)=>t[i]=o);for(const i of n)delete t[i]}clone(){return new vt(en(this.value))}}function Va(r){const t=[];return ne(r.fields,(e,n)=>{const i=new ut([e]);if(Gn(n)){const o=Va(n.mapValue).fields;if(o.length===0)t.push(i);else for(const u of o)t.push(i.child(u))}else t.push(i)}),new wt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t,e,n,i,o,u,c){this.key=t,this.documentType=e,this.version=n,this.readTime=i,this.createTime=o,this.data=u,this.documentState=c}static newInvalidDocument(t){return new gt(t,0,O.min(),O.min(),O.min(),vt.empty(),0)}static newFoundDocument(t,e,n,i){return new gt(t,1,e,O.min(),n,i,0)}static newNoDocument(t,e){return new gt(t,2,e,O.min(),O.min(),vt.empty(),0)}static newUnknownDocument(t,e){return new gt(t,3,e,O.min(),O.min(),vt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(O.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=vt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=vt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=O.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof gt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new gt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(t,e){this.position=t,this.inclusive=e}}function wo(r,t,e){let n=0;for(let i=0;i<r.position.length;i++){const o=t[i],u=r.position[i];if(o.field.isKeyField()?n=M.comparator(M.fromName(u.referenceValue),e.key):n=we(u,e.data.field(o.field)),o.dir==="desc"&&(n*=-1),n!==0)break}return n}function Ro(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!kt(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(t,e="asc"){this.field=t,this.dir=e}}function nc(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{}class tt extends Pa{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new sc(t,e,n):e==="array-contains"?new ac(t,n):e==="in"?new uc(t,n):e==="not-in"?new lc(t,n):e==="array-contains-any"?new cc(t,n):new tt(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new ic(t,n):new oc(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(we(e,this.value)):e!==null&&Zt(this.value)===Zt(e)&&this.matchesComparison(we(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Pt extends Pa{constructor(t,e){super(),this.filters=t,this.op=e,this.ce=null}static create(t,e){return new Pt(t,e)}matches(t){return Ca(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function Ca(r){return r.op==="and"}function Sa(r){return rc(r)&&Ca(r)}function rc(r){for(const t of r.filters)if(t instanceof Pt)return!1;return!0}function as(r){if(r instanceof tt)return r.field.canonicalString()+r.op.toString()+Re(r.value);if(Sa(r))return r.filters.map(t=>as(t)).join(",");{const t=r.filters.map(e=>as(e)).join(",");return`${r.op}(${t})`}}function Da(r,t){return r instanceof tt?function(n,i){return i instanceof tt&&n.op===i.op&&n.field.isEqual(i.field)&&kt(n.value,i.value)}(r,t):r instanceof Pt?function(n,i){return i instanceof Pt&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((o,u,c)=>o&&Da(u,i.filters[c]),!0):!1}(r,t):void L()}function ba(r){return r instanceof tt?function(e){return`${e.field.canonicalString()} ${e.op} ${Re(e.value)}`}(r):r instanceof Pt?function(e){return e.op.toString()+" {"+e.getFilters().map(ba).join(" ,")+"}"}(r):"Filter"}class sc extends tt{constructor(t,e,n){super(t,e,n),this.key=M.fromName(n.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class ic extends tt{constructor(t,e){super(t,"in",e),this.keys=ka("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class oc extends tt{constructor(t,e){super(t,"not-in",e),this.keys=ka("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function ka(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>M.fromName(n.referenceValue))}class ac extends tt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return As(e)&&ln(e.arrayValue,this.value)}}class uc extends tt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&ln(this.value.arrayValue,e)}}class lc extends tt{constructor(t,e){super(t,"not-in",e)}matches(t){if(ln(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!ln(this.value.arrayValue,e)}}class cc extends tt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!As(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>ln(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(t,e=null,n=[],i=[],o=null,u=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=i,this.limit=o,this.startAt=u,this.endAt=c,this.le=null}}function Vo(r,t=null,e=[],n=[],i=null,o=null,u=null){return new hc(r,t,e,n,i,o,u)}function ws(r){const t=F(r);if(t.le===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>as(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(o){return o.field.canonicalString()+o.dir}(n)).join(","),ur(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>Re(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>Re(n)).join(",")),t.le=e}return t.le}function Rs(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!nc(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!Da(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Ro(r.startAt,t.startAt)&&Ro(r.endAt,t.endAt)}function us(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(t,e=null,n=[],i=[],o=null,u="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=i,this.limit=o,this.limitType=u,this.startAt=c,this.endAt=h,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function fc(r,t,e,n,i,o,u,c){return new ke(r,t,e,n,i,o,u,c)}function cr(r){return new ke(r)}function Po(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Na(r){return r.collectionGroup!==null}function nn(r){const t=F(r);if(t.he===null){t.he=[];const e=new Set;for(const o of t.explicitOrderBy)t.he.push(o),e.add(o.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let c=new nt(ut.comparator);return u.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.he.push(new cn(o,n))}),e.has(ut.keyField().canonicalString())||t.he.push(new cn(ut.keyField(),n))}return t.he}function St(r){const t=F(r);return t.Pe||(t.Pe=dc(t,nn(r))),t.Pe}function dc(r,t){if(r.limitType==="F")return Vo(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new cn(i.field,o)});const e=r.endAt?new Jn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Jn(r.startAt.position,r.startAt.inclusive):null;return Vo(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function ls(r,t){const e=r.filters.concat([t]);return new ke(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function Zn(r,t,e){return new ke(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function hr(r,t){return Rs(St(r),St(t))&&r.limitType===t.limitType}function xa(r){return`${ws(St(r))}|lt:${r.limitType}`}function ye(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(i=>ba(i)).join(", ")}]`),ur(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(i=>function(u){return`${u.field.canonicalString()} (${u.dir})`}(i)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(i=>Re(i)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(i=>Re(i)).join(",")),`Target(${n})`}(St(r))}; limitType=${r.limitType})`}function fr(r,t){return t.isFoundDocument()&&function(n,i){const o=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):M.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)}(r,t)&&function(n,i){for(const o of nn(n))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(r,t)&&function(n,i){for(const o of n.filters)if(!o.matches(i))return!1;return!0}(r,t)&&function(n,i){return!(n.startAt&&!function(u,c,h){const d=wo(u,c,h);return u.inclusive?d<=0:d<0}(n.startAt,nn(n),i)||n.endAt&&!function(u,c,h){const d=wo(u,c,h);return u.inclusive?d>=0:d>0}(n.endAt,nn(n),i))}(r,t)}function mc(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Ma(r){return(t,e)=>{let n=!1;for(const i of nn(r)){const o=pc(i,t,e);if(o!==0)return o;n=n||i.field.isKeyField()}return 0}}function pc(r,t,e){const n=r.field.isKeyField()?M.comparator(t.key,e.key):function(o,u,c){const h=u.data.field(o),d=c.data.field(o);return h!==null&&d!==null?we(h,d):L()}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[i,o]of n)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),i=this.inner[n];if(i===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],t))return n.length===1?delete this.inner[e]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(t){ne(this.inner,(e,n)=>{for(const[i,o]of n)t(i,o)})}isEmpty(){return ya(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc=new X(M.comparator);function qt(){return gc}const La=new X(M.comparator);function Je(...r){let t=La;for(const e of r)t=t.insert(e.key,e);return t}function Oa(r){let t=La;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function ue(){return rn()}function Fa(){return rn()}function rn(){return new he(r=>r.toString(),(r,t)=>r.isEqual(t))}const _c=new X(M.comparator),yc=new nt(M.comparator);function q(...r){let t=yc;for(const e of r)t=t.add(e);return t}const Tc=new nt(U);function Ec(){return Tc}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Hn(t)?"-0":t}}function Ua(r){return{integerValue:""+r}}function vc(r,t){return Wl(t)?Ua(t):Vs(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(){this._=void 0}}function Ic(r,t,e){return r instanceof hn?function(i,o){const u={fields:{[va]:{stringValue:Ea},[Aa]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Is(o)&&(o=lr(o)),o&&(u.fields[Ia]=o),{mapValue:u}}(e,t):r instanceof fn?Ba(r,t):r instanceof dn?ja(r,t):function(i,o){const u=qa(i,o),c=Co(u)+Co(i.Ie);return os(u)&&os(i.Ie)?Ua(c):Vs(i.serializer,c)}(r,t)}function Ac(r,t,e){return r instanceof fn?Ba(r,t):r instanceof dn?ja(r,t):e}function qa(r,t){return r instanceof tr?function(n){return os(n)||function(o){return!!o&&"doubleValue"in o}(n)}(t)?t:{integerValue:0}:null}class hn extends dr{}class fn extends dr{constructor(t){super(),this.elements=t}}function Ba(r,t){const e=za(t);for(const n of r.elements)e.some(i=>kt(i,n))||e.push(n);return{arrayValue:{values:e}}}class dn extends dr{constructor(t){super(),this.elements=t}}function ja(r,t){let e=za(t);for(const n of r.elements)e=e.filter(i=>!kt(i,n));return{arrayValue:{values:e}}}class tr extends dr{constructor(t,e){super(),this.serializer=t,this.Ie=e}}function Co(r){return J(r.integerValue||r.doubleValue)}function za(r){return As(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(t,e){this.field=t,this.transform=e}}function Rc(r,t){return r.field.isEqual(t.field)&&function(n,i){return n instanceof fn&&i instanceof fn||n instanceof dn&&i instanceof dn?Ae(n.elements,i.elements,kt):n instanceof tr&&i instanceof tr?kt(n.Ie,i.Ie):n instanceof hn&&i instanceof hn}(r.transform,t.transform)}class Vc{constructor(t,e){this.version=t,this.transformResults=e}}class Rt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Rt}static exists(t){return new Rt(void 0,t)}static updateTime(t){return new Rt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Kn(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class mr{}function $a(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new Ps(r.key,Rt.none()):new mn(r.key,r.data,Rt.none());{const e=r.data,n=vt.empty();let i=new nt(ut.comparator);for(let o of t.fields)if(!i.has(o)){let u=e.field(o);u===null&&o.length>1&&(o=o.popLast(),u=e.field(o)),u===null?n.delete(o):n.set(o,u),i=i.add(o)}return new re(r.key,n,new wt(i.toArray()),Rt.none())}}function Pc(r,t,e){r instanceof mn?function(i,o,u){const c=i.value.clone(),h=Do(i.fieldTransforms,o,u.transformResults);c.setAll(h),o.convertToFoundDocument(u.version,c).setHasCommittedMutations()}(r,t,e):r instanceof re?function(i,o,u){if(!Kn(i.precondition,o))return void o.convertToUnknownDocument(u.version);const c=Do(i.fieldTransforms,o,u.transformResults),h=o.data;h.setAll(Ga(i)),h.setAll(c),o.convertToFoundDocument(u.version,h).setHasCommittedMutations()}(r,t,e):function(i,o,u){o.convertToNoDocument(u.version).setHasCommittedMutations()}(0,t,e)}function sn(r,t,e,n){return r instanceof mn?function(o,u,c,h){if(!Kn(o.precondition,u))return c;const d=o.value.clone(),m=bo(o.fieldTransforms,h,u);return d.setAll(m),u.convertToFoundDocument(u.version,d).setHasLocalMutations(),null}(r,t,e,n):r instanceof re?function(o,u,c,h){if(!Kn(o.precondition,u))return c;const d=bo(o.fieldTransforms,h,u),m=u.data;return m.setAll(Ga(o)),m.setAll(d),u.convertToFoundDocument(u.version,m).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(v=>v.field))}(r,t,e,n):function(o,u,c){return Kn(o.precondition,u)?(u.convertToNoDocument(u.version).setHasLocalMutations(),null):c}(r,t,e)}function Cc(r,t){let e=null;for(const n of r.fieldTransforms){const i=t.data.field(n.field),o=qa(n.transform,i||null);o!=null&&(e===null&&(e=vt.empty()),e.set(n.field,o))}return e||null}function So(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&Ae(n,i,(o,u)=>Rc(o,u))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class mn extends mr{constructor(t,e,n,i=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class re extends mr{constructor(t,e,n,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Ga(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function Do(r,t,e){const n=new Map;$(r.length===e.length);for(let i=0;i<e.length;i++){const o=r[i],u=o.transform,c=t.data.field(o.field);n.set(o.field,Ac(u,c,e[i]))}return n}function bo(r,t,e){const n=new Map;for(const i of r){const o=i.transform,u=e.data.field(i.field);n.set(i.field,Ic(o,u,t))}return n}class Ps extends mr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Sc extends mr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(t,e,n,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&Pc(o,t,n[i])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=sn(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=sn(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Fa();return this.mutations.forEach(i=>{const o=t.get(i.key),u=o.overlayedDocument;let c=this.applyToLocalView(u,o.mutatedFields);c=e.has(i.key)?null:c;const h=$a(u,c);h!==null&&n.set(i.key,h),u.isValidDocument()||u.convertToNoDocument(O.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),q())}isEqual(t){return this.batchId===t.batchId&&Ae(this.mutations,t.mutations,(e,n)=>So(e,n))&&Ae(this.baseMutations,t.baseMutations,(e,n)=>So(e,n))}}class Cs{constructor(t,e,n,i){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=i}static from(t,e,n){$(t.mutations.length===n.length);let i=function(){return _c}();const o=t.mutations;for(let u=0;u<o.length;u++)i=i.insert(o[u].key,n[u].version);return new Cs(t,e,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z,B;function Nc(r){switch(r){case V.OK:return L();case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return L()}}function Ka(r){if(r===void 0)return Ut("GRPC error has no .code"),V.UNKNOWN;switch(r){case Z.OK:return V.OK;case Z.CANCELLED:return V.CANCELLED;case Z.UNKNOWN:return V.UNKNOWN;case Z.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case Z.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case Z.INTERNAL:return V.INTERNAL;case Z.UNAVAILABLE:return V.UNAVAILABLE;case Z.UNAUTHENTICATED:return V.UNAUTHENTICATED;case Z.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case Z.NOT_FOUND:return V.NOT_FOUND;case Z.ALREADY_EXISTS:return V.ALREADY_EXISTS;case Z.PERMISSION_DENIED:return V.PERMISSION_DENIED;case Z.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case Z.ABORTED:return V.ABORTED;case Z.OUT_OF_RANGE:return V.OUT_OF_RANGE;case Z.UNIMPLEMENTED:return V.UNIMPLEMENTED;case Z.DATA_LOSS:return V.DATA_LOSS;default:return L()}}(B=Z||(Z={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc=new Wt([4294967295,4294967295],0);function ko(r){const t=pa().encode(r),e=new ua;return e.update(t),new Uint8Array(e.digest())}function No(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Wt([e,n],0),new Wt([i,o],0)]}class Ss{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Ze(`Invalid padding: ${e}`);if(n<0)throw new Ze(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new Ze(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new Ze(`Invalid padding when bitmap length is 0: ${e}`);this.Ee=8*t.length-e,this.de=Wt.fromNumber(this.Ee)}Ae(t,e,n){let i=t.add(e.multiply(Wt.fromNumber(n)));return i.compare(xc)===1&&(i=new Wt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.de).toNumber()}Re(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.Ee===0)return!1;const e=ko(t),[n,i]=No(e);for(let o=0;o<this.hashCount;o++){const u=this.Ae(n,i,o);if(!this.Re(u))return!1}return!0}static create(t,e,n){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),u=new Ss(o,i,e);return n.forEach(c=>u.insert(c)),u}insert(t){if(this.Ee===0)return;const e=ko(t),[n,i]=No(e);for(let o=0;o<this.hashCount;o++){const u=this.Ae(n,i,o);this.Ve(u)}}Ve(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Ze extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(t,e,n,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const i=new Map;return i.set(t,pn.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new pr(O.min(),i,new X(U),qt(),q())}}class pn{constructor(t,e,n,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new pn(n,e,q(),q(),q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(t,e,n,i){this.me=t,this.removedTargetIds=e,this.key=n,this.fe=i}}class Qa{constructor(t,e){this.targetId=t,this.ge=e}}class Wa{constructor(t,e,n=lt.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=i}}class xo{constructor(){this.pe=0,this.ye=Mo(),this.we=lt.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(t){t.approximateByteSize()>0&&(this.be=!0,this.we=t)}Fe(){let t=q(),e=q(),n=q();return this.ye.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:n=n.add(i);break;default:L()}}),new pn(this.we,this.Se,t,e,n)}Me(){this.be=!1,this.ye=Mo()}xe(t,e){this.be=!0,this.ye=this.ye.insert(t,e)}Oe(t){this.be=!0,this.ye=this.ye.remove(t)}Ne(){this.pe+=1}Be(){this.pe-=1,$(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class Mc{constructor(t){this.ke=t,this.qe=new Map,this.Qe=qt(),this.$e=Bn(),this.Ue=Bn(),this.Ke=new X(U)}We(t){for(const e of t.me)t.fe&&t.fe.isFoundDocument()?this.Ge(e,t.fe):this.ze(e,t.key,t.fe);for(const e of t.removedTargetIds)this.ze(e,t.key,t.fe)}je(t){this.forEachTarget(t,e=>{const n=this.He(e);switch(t.state){case 0:this.Je(e)&&n.Ce(t.resumeToken);break;case 1:n.Be(),n.De||n.Me(),n.Ce(t.resumeToken);break;case 2:n.Be(),n.De||this.removeTarget(e);break;case 3:this.Je(e)&&(n.Le(),n.Ce(t.resumeToken));break;case 4:this.Je(e)&&(this.Ye(e),n.Ce(t.resumeToken));break;default:L()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.qe.forEach((n,i)=>{this.Je(i)&&e(i)})}Ze(t){const e=t.targetId,n=t.ge.count,i=this.Xe(e);if(i){const o=i.target;if(us(o))if(n===0){const u=new M(o.path);this.ze(e,u,gt.newNoDocument(u,O.min()))}else $(n===1);else{const u=this.et(e);if(u!==n){const c=this.tt(t),h=c?this.nt(c,t,u):1;if(h!==0){this.Ye(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(e,d)}}}}}tt(t){const e=t.ge.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:o=0}=e;let u,c;try{u=Jt(n).toUint8Array()}catch(h){if(h instanceof Ta)return Ie("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new Ss(u,i,o)}catch(h){return Ie(h instanceof Ze?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.Ee===0?null:c}nt(t,e,n){return e.ge.count===n-this.st(t,e.targetId)?0:2}st(t,e){const n=this.ke.getRemoteKeysForTarget(e);let i=0;return n.forEach(o=>{const u=this.ke.it(),c=`projects/${u.projectId}/databases/${u.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.ze(e,o,null),i++)}),i}ot(t){const e=new Map;this.qe.forEach((o,u)=>{const c=this.Xe(u);if(c){if(o.current&&us(c.target)){const h=new M(c.target.path);this._t(h).has(u)||this.ut(u,h)||this.ze(u,h,gt.newNoDocument(h,t))}o.ve&&(e.set(u,o.Fe()),o.Me())}});let n=q();this.Ue.forEach((o,u)=>{let c=!0;u.forEachWhile(h=>{const d=this.Xe(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(o))}),this.Qe.forEach((o,u)=>u.setReadTime(t));const i=new pr(t,e,this.Ke,this.Qe,n);return this.Qe=qt(),this.$e=Bn(),this.Ue=Bn(),this.Ke=new X(U),i}Ge(t,e){if(!this.Je(t))return;const n=this.ut(t,e.key)?2:0;this.He(t).xe(e.key,n),this.Qe=this.Qe.insert(e.key,e),this.$e=this.$e.insert(e.key,this._t(e.key).add(t)),this.Ue=this.Ue.insert(e.key,this.ct(e.key).add(t))}ze(t,e,n){if(!this.Je(t))return;const i=this.He(t);this.ut(t,e)?i.xe(e,1):i.Oe(e),this.Ue=this.Ue.insert(e,this.ct(e).delete(t)),this.Ue=this.Ue.insert(e,this.ct(e).add(t)),n&&(this.Qe=this.Qe.insert(e,n))}removeTarget(t){this.qe.delete(t)}et(t){const e=this.He(t).Fe();return this.ke.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ne(t){this.He(t).Ne()}He(t){let e=this.qe.get(t);return e||(e=new xo,this.qe.set(t,e)),e}ct(t){let e=this.Ue.get(t);return e||(e=new nt(U),this.Ue=this.Ue.insert(t,e)),e}_t(t){let e=this.$e.get(t);return e||(e=new nt(U),this.$e=this.$e.insert(t,e)),e}Je(t){const e=this.Xe(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}Xe(t){const e=this.qe.get(t);return e&&e.De?null:this.ke.lt(t)}Ye(t){this.qe.set(t,new xo),this.ke.getRemoteKeysForTarget(t).forEach(e=>{this.ze(t,e,null)})}ut(t,e){return this.ke.getRemoteKeysForTarget(t).has(e)}}function Bn(){return new X(M.comparator)}function Mo(){return new X(M.comparator)}const Lc={asc:"ASCENDING",desc:"DESCENDING"},Oc={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Fc={and:"AND",or:"OR"};class Uc{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function cs(r,t){return r.useProto3Json||ur(t)?t:{value:t}}function er(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Ha(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function qc(r,t){return er(r,t.toTimestamp())}function Dt(r){return $(!!r),O.fromTimestamp(function(e){const n=Yt(e);return new et(n.seconds,n.nanos)}(r))}function Ds(r,t){return hs(r,t).canonicalString()}function hs(r,t){const e=function(i){return new H(["projects",i.projectId,"databases",i.database])}(r).child("documents");return t===void 0?e:e.child(t)}function Xa(r){const t=H.fromString(r);return $(eu(t)),t}function fs(r,t){return Ds(r.databaseId,t.path)}function Zr(r,t){const e=Xa(t);if(e.get(1)!==r.databaseId.projectId)throw new k(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new k(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new M(Ja(e))}function Ya(r,t){return Ds(r.databaseId,t)}function Bc(r){const t=Xa(r);return t.length===4?H.emptyPath():Ja(t)}function ds(r){return new H(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Ja(r){return $(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Lo(r,t,e){return{name:fs(r,t),fields:e.value.mapValue.fields}}function jc(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:L()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(d,m){return d.useProto3Json?($(m===void 0||typeof m=="string"),lt.fromBase64String(m||"")):($(m===void 0||m instanceof Buffer||m instanceof Uint8Array),lt.fromUint8Array(m||new Uint8Array))}(r,t.targetChange.resumeToken),u=t.targetChange.cause,c=u&&function(d){const m=d.code===void 0?V.UNKNOWN:Ka(d.code);return new k(m,d.message||"")}(u);e=new Wa(n,i,o,c||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const i=Zr(r,n.document.name),o=Dt(n.document.updateTime),u=n.document.createTime?Dt(n.document.createTime):O.min(),c=new vt({mapValue:{fields:n.document.fields}}),h=gt.newFoundDocument(i,o,u,c),d=n.targetIds||[],m=n.removedTargetIds||[];e=new Qn(d,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const i=Zr(r,n.document),o=n.readTime?Dt(n.readTime):O.min(),u=gt.newNoDocument(i,o),c=n.removedTargetIds||[];e=new Qn([],c,u.key,u)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const i=Zr(r,n.document),o=n.removedTargetIds||[];e=new Qn([],o,i,null)}else{if(!("filter"in t))return L();{t.filter;const n=t.filter;n.targetId;const{count:i=0,unchangedNames:o}=n,u=new kc(i,o),c=n.targetId;e=new Qa(c,u)}}return e}function zc(r,t){let e;if(t instanceof mn)e={update:Lo(r,t.key,t.value)};else if(t instanceof Ps)e={delete:fs(r,t.key)};else if(t instanceof re)e={update:Lo(r,t.key,t.data),updateMask:Jc(t.fieldMask)};else{if(!(t instanceof Sc))return L();e={verify:fs(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(o,u){const c=u.transform;if(c instanceof hn)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof fn)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof dn)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof tr)return{fieldPath:u.field.canonicalString(),increment:c.Ie};throw L()}(0,n))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:qc(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:L()}(r,t.precondition)),e}function $c(r,t){return r&&r.length>0?($(t!==void 0),r.map(e=>function(i,o){let u=i.updateTime?Dt(i.updateTime):Dt(o);return u.isEqual(O.min())&&(u=Dt(o)),new Vc(u,i.transformResults||[])}(e,t))):[]}function Gc(r,t){return{documents:[Ya(r,t.path)]}}function Kc(r,t){const e={structuredQuery:{}},n=t.path;let i;t.collectionGroup!==null?(i=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=Ya(r,i);const o=function(d){if(d.length!==0)return tu(Pt.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const u=function(d){if(d.length!==0)return d.map(m=>function(w){return{field:Te(w.field),direction:Hc(w.dir)}}(m))}(t.orderBy);u&&(e.structuredQuery.orderBy=u);const c=cs(r,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{ht:e,parent:i}}function Qc(r){let t=Bc(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let i=null;if(n>0){$(n===1);const m=e.from[0];m.allDescendants?i=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(v){const w=Za(v);return w instanceof Pt&&Sa(w)?w.getFilters():[w]}(e.where));let u=[];e.orderBy&&(u=function(v){return v.map(w=>function(b){return new cn(Ee(b.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(w))}(e.orderBy));let c=null;e.limit&&(c=function(v){let w;return w=typeof v=="object"?v.value:v,ur(w)?null:w}(e.limit));let h=null;e.startAt&&(h=function(v){const w=!!v.before,C=v.values||[];return new Jn(C,w)}(e.startAt));let d=null;return e.endAt&&(d=function(v){const w=!v.before,C=v.values||[];return new Jn(C,w)}(e.endAt)),fc(t,i,u,o,c,"F",h,d)}function Wc(r,t){const e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Za(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Ee(e.unaryFilter.field);return tt.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=Ee(e.unaryFilter.field);return tt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ee(e.unaryFilter.field);return tt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const u=Ee(e.unaryFilter.field);return tt.create(u,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(r):r.fieldFilter!==void 0?function(e){return tt.create(Ee(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return Pt.create(e.compositeFilter.filters.map(n=>Za(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return L()}}(e.compositeFilter.op))}(r):L()}function Hc(r){return Lc[r]}function Xc(r){return Oc[r]}function Yc(r){return Fc[r]}function Te(r){return{fieldPath:r.canonicalString()}}function Ee(r){return ut.fromServerFormat(r.fieldPath)}function tu(r){return r instanceof tt?function(e){if(e.op==="=="){if(Ao(e.value))return{unaryFilter:{field:Te(e.field),op:"IS_NAN"}};if(Io(e.value))return{unaryFilter:{field:Te(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ao(e.value))return{unaryFilter:{field:Te(e.field),op:"IS_NOT_NAN"}};if(Io(e.value))return{unaryFilter:{field:Te(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Te(e.field),op:Xc(e.op),value:e.value}}}(r):r instanceof Pt?function(e){const n=e.getFilters().map(i=>tu(i));return n.length===1?n[0]:{compositeFilter:{op:Yc(e.op),filters:n}}}(r):L()}function Jc(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function eu(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(t,e,n,i,o=O.min(),u=O.min(),c=lt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=u,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new Qt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(t){this.Tt=t}}function th(r){const t=Qc({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Zn(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(){this.Tn=new nh}addToCollectionParentIndex(t,e){return this.Tn.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.Tn.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(Xt.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(Xt.min())}updateCollectionGroup(t,e,n){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}}class nh{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e]||new nt(H.comparator),o=!i.has(n);return this.index[e]=i.add(n),o}has(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e];return i&&i.has(n)}getEntries(t){return(this.index[t]||new nt(H.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},nu=41943040;class Et{static withCacheSize(t){return new Et(t,Et.DEFAULT_COLLECTION_PERCENTILE,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Et.DEFAULT_COLLECTION_PERCENTILE=10,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Et.DEFAULT=new Et(nu,Et.DEFAULT_COLLECTION_PERCENTILE,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Et.DISABLED=new Et(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(t){this.$n=t}next(){return this.$n+=2,this.$n}static Un(){return new Ve(0)}static Kn(){return new Ve(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo="LruGarbageCollector",rh=1048576;function Uo([r,t],[e,n]){const i=U(r,e);return i===0?U(t,n):i}class sh{constructor(t){this.Hn=t,this.buffer=new nt(Uo),this.Jn=0}Yn(){return++this.Jn}Zn(t){const e=[t,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Uo(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class ih{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(t){N(Fo,`Garbage collection scheduled in ${t}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){be(e)?N(Fo,"Ignoring IndexedDB error during garbage collection: ",e):await De(e)}await this.er(3e5)})}}class oh{constructor(t,e){this.tr=t,this.params=e}calculateTargetCount(t,e){return this.tr.nr(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return P.resolve(ar.ae);const n=new sh(e);return this.tr.forEachTarget(t,i=>n.Zn(i.sequenceNumber)).next(()=>this.tr.rr(t,i=>n.Zn(i))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.tr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.tr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Oo)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Oo):this.ir(t,e))}getCacheSize(t){return this.tr.getCacheSize(t)}ir(t,e){let n,i,o,u,c,h,d;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(v=>(v>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${v}`),i=this.params.maximumSequenceNumbersToCollect):i=v,u=Date.now(),this.nthSequenceNumber(t,i))).next(v=>(n=v,c=Date.now(),this.removeTargets(t,n,e))).next(v=>(o=v,h=Date.now(),this.removeOrphanedDocuments(t,n))).next(v=>(d=Date.now(),_e()<=Ot.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${u-m}ms
	Determined least recently used ${i} in `+(c-u)+`ms
	Removed ${o} targets in `+(h-c)+`ms
	Removed ${v} documents in `+(d-h)+`ms
Total Duration: ${d-m}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:v})))}}function ah(r,t){return new oh(r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(){this.changes=new he(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,gt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?P.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(t,e,n,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=i}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(n=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(n!==null&&sn(n.mutation,i,wt.empty(),et.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,q()).next(()=>n))}getLocalViewOfDocuments(t,e,n=q()){const i=ue();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,n).next(o=>{let u=Je();return o.forEach((c,h)=>{u=u.insert(c,h.overlayedDocument)}),u}))}getOverlayedDocuments(t,e){const n=ue();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,q()))}populateOverlays(t,e,n){const i=[];return n.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((u,c)=>{e.set(u,c)})})}computeViews(t,e,n,i){let o=qt();const u=rn(),c=function(){return rn()}();return e.forEach((h,d)=>{const m=n.get(d.key);i.has(d.key)&&(m===void 0||m.mutation instanceof re)?o=o.insert(d.key,d):m!==void 0?(u.set(d.key,m.mutation.getFieldMask()),sn(m.mutation,d,m.mutation.getFieldMask(),et.now())):u.set(d.key,wt.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((d,m)=>u.set(d,m)),e.forEach((d,m)=>{var v;return c.set(d,new lh(m,(v=u.get(d))!==null&&v!==void 0?v:null))}),c))}recalculateAndSaveOverlays(t,e){const n=rn();let i=new X((u,c)=>u-c),o=q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(u=>{for(const c of u)c.keys().forEach(h=>{const d=e.get(h);if(d===null)return;let m=n.get(h)||wt.empty();m=c.applyToLocalView(d,m),n.set(h,m);const v=(i.get(c.batchId)||q()).add(h);i=i.insert(c.batchId,v)})}).next(()=>{const u=[],c=i.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),d=h.key,m=h.value,v=Fa();m.forEach(w=>{if(!o.has(w)){const C=$a(e.get(w),n.get(w));C!==null&&v.set(w,C),o=o.add(w)}}),u.push(this.documentOverlayCache.saveOverlays(t,d,v))}return P.waitFor(u)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,i){return function(u){return M.isDocumentKey(u.path)&&u.collectionGroup===null&&u.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Na(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,i):this.getDocumentsMatchingCollectionQuery(t,e,n,i)}getNextDocuments(t,e,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,i).next(o=>{const u=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,i-o.size):P.resolve(ue());let c=on,h=o;return u.next(d=>P.forEach(d,(m,v)=>(c<v.largestBatchId&&(c=v.largestBatchId),o.get(m)?P.resolve():this.remoteDocumentCache.getEntry(t,m).next(w=>{h=h.insert(m,w)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,h,d,q())).next(m=>({batchId:c,changes:Oa(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(n=>{let i=Je();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,n,i){const o=e.collectionGroup;let u=Je();return this.indexManager.getCollectionParents(t,o).next(c=>P.forEach(c,h=>{const d=function(v,w){return new ke(w,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,n,i).next(m=>{m.forEach((v,w)=>{u=u.insert(v,w)})})}).next(()=>u))}getDocumentsMatchingCollectionQuery(t,e,n,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(u=>(o=u,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,o,i))).next(u=>{o.forEach((h,d)=>{const m=d.getKey();u.get(m)===null&&(u=u.insert(m,gt.newInvalidDocument(m)))});let c=Je();return u.forEach((h,d)=>{const m=o.get(h);m!==void 0&&sn(m.mutation,d,wt.empty(),et.now()),fr(e,d)&&(c=c.insert(h,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(t){this.serializer=t,this.dr=new Map,this.Ar=new Map}getBundleMetadata(t,e){return P.resolve(this.dr.get(e))}saveBundleMetadata(t,e){return this.dr.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Dt(i.createTime)}}(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.Ar.get(e))}saveNamedQuery(t,e){return this.Ar.set(e.name,function(i){return{name:i.name,query:th(i.bundledQuery),readTime:Dt(i.readTime)}}(e)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(){this.overlays=new X(M.comparator),this.Rr=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){const n=ue();return P.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&n.set(i,o)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((i,o)=>{this.Et(t,e,o)}),P.resolve()}removeOverlaysForBatchId(t,e,n){const i=this.Rr.get(n);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Rr.delete(n)),P.resolve()}getOverlaysForCollection(t,e,n){const i=ue(),o=e.length+1,u=new M(e.child("")),c=this.overlays.getIteratorFrom(u);for(;c.hasNext();){const h=c.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>n&&i.set(h.getKey(),h)}return P.resolve(i)}getOverlaysForCollectionGroup(t,e,n,i){let o=new X((d,m)=>d-m);const u=this.overlays.getIterator();for(;u.hasNext();){const d=u.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let m=o.get(d.largestBatchId);m===null&&(m=ue(),o=o.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const c=ue(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,m)=>c.set(d,m)),!(c.size()>=i)););return P.resolve(c)}Et(t,e,n){const i=this.overlays.get(n.key);if(i!==null){const u=this.Rr.get(i.largestBatchId).delete(n.key);this.Rr.set(i.largestBatchId,u)}this.overlays=this.overlays.insert(n.key,new bc(e,n));let o=this.Rr.get(e);o===void 0&&(o=q(),this.Rr.set(e,o)),this.Rr.set(e,o.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(){this.sessionToken=lt.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(){this.Vr=new nt(st.mr),this.gr=new nt(st.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(t,e){const n=new st(t,e);this.Vr=this.Vr.add(n),this.gr=this.gr.add(n)}yr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.wr(new st(t,e))}Sr(t,e){t.forEach(n=>this.removeReference(n,e))}br(t){const e=new M(new H([])),n=new st(e,t),i=new st(e,t+1),o=[];return this.gr.forEachInRange([n,i],u=>{this.wr(u),o.push(u.key)}),o}Dr(){this.Vr.forEach(t=>this.wr(t))}wr(t){this.Vr=this.Vr.delete(t),this.gr=this.gr.delete(t)}vr(t){const e=new M(new H([])),n=new st(e,t),i=new st(e,t+1);let o=q();return this.gr.forEachInRange([n,i],u=>{o=o.add(u.key)}),o}containsKey(t){const e=new st(t,0),n=this.Vr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class st{constructor(t,e){this.key=t,this.Cr=e}static mr(t,e){return M.comparator(t.key,e.key)||U(t.Cr,e.Cr)}static pr(t,e){return U(t.Cr,e.Cr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Fr=1,this.Mr=new nt(st.mr)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,i){const o=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const u=new Dc(o,e,n,i);this.mutationQueue.push(u);for(const c of i)this.Mr=this.Mr.add(new st(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return P.resolve(u)}lookupMutationBatch(t,e){return P.resolve(this.Or(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,i=this.Nr(n),o=i<0?0:i;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?vs:this.Fr-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new st(e,0),i=new st(e,Number.POSITIVE_INFINITY),o=[];return this.Mr.forEachInRange([n,i],u=>{const c=this.Or(u.Cr);o.push(c)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new nt(U);return e.forEach(i=>{const o=new st(i,0),u=new st(i,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([o,u],c=>{n=n.add(c.Cr)})}),P.resolve(this.Br(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,i=n.length+1;let o=n;M.isDocumentKey(o)||(o=o.child(""));const u=new st(new M(o),0);let c=new nt(U);return this.Mr.forEachWhile(h=>{const d=h.key.path;return!!n.isPrefixOf(d)&&(d.length===i&&(c=c.add(h.Cr)),!0)},u),P.resolve(this.Br(c))}Br(t){const e=[];return t.forEach(n=>{const i=this.Or(n);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){$(this.Lr(e.batchId,"removed")===0),this.mutationQueue.shift();let n=this.Mr;return P.forEach(e.mutations,i=>{const o=new st(i.key,e.batchId);return n=n.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.Mr=n})}qn(t){}containsKey(t,e){const n=new st(e,0),i=this.Mr.firstAfterOrEqual(n);return P.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}Lr(t,e){return this.Nr(t)}Nr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Or(t){const e=this.Nr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(t){this.kr=t,this.docs=function(){return new X(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,i=this.docs.get(n),o=i?i.size:0,u=this.kr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:u}),this.size+=u-o,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return P.resolve(n?n.document.mutableCopy():gt.newInvalidDocument(e))}getEntries(t,e){let n=qt();return e.forEach(i=>{const o=this.docs.get(i);n=n.insert(i,o?o.document.mutableCopy():gt.newInvalidDocument(i))}),P.resolve(n)}getDocumentsMatchingQuery(t,e,n,i){let o=qt();const u=e.path,c=new M(u.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:d,value:{document:m}}=h.getNext();if(!u.isPrefixOf(d.path))break;d.path.length>u.length+1||$l(zl(m),n)<=0||(i.has(m.key)||fr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(t,e,n,i){L()}qr(t,e){return P.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new gh(this)}getSize(t){return P.resolve(this.size)}}class gh extends uh{constructor(t){super(),this.Ir=t}applyChanges(t){const e=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?e.push(this.Ir.addEntry(t,i)):this.Ir.removeEntry(n)}),P.waitFor(e)}getFromCache(t,e){return this.Ir.getEntry(t,e)}getAllFromCache(t,e){return this.Ir.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(t){this.persistence=t,this.Qr=new he(e=>ws(e),Rs),this.lastRemoteSnapshotVersion=O.min(),this.highestTargetId=0,this.$r=0,this.Ur=new bs,this.targetCount=0,this.Kr=Ve.Un()}forEachTarget(t,e){return this.Qr.forEach((n,i)=>e(i)),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.$r)}allocateTargetId(t){return this.highestTargetId=this.Kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.$r&&(this.$r=e),P.resolve()}zn(t){this.Qr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.Kr=new Ve(e),this.highestTargetId=e),t.sequenceNumber>this.$r&&(this.$r=t.sequenceNumber)}addTargetData(t,e){return this.zn(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.zn(e),P.resolve()}removeTargetData(t,e){return this.Qr.delete(e.target),this.Ur.br(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,n){let i=0;const o=[];return this.Qr.forEach((u,c)=>{c.sequenceNumber<=e&&n.get(c.targetId)===null&&(this.Qr.delete(u),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),i++)}),P.waitFor(o).next(()=>i)}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){const n=this.Qr.get(e)||null;return P.resolve(n)}addMatchingKeys(t,e,n){return this.Ur.yr(e,n),P.resolve()}removeMatchingKeys(t,e,n){this.Ur.Sr(e,n);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(u=>{o.push(i.markPotentiallyOrphaned(t,u))}),P.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.Ur.br(e),P.resolve()}getMatchingKeysForTargetId(t,e){const n=this.Ur.vr(e);return P.resolve(n)}containsKey(t,e){return P.resolve(this.Ur.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(t,e){this.Wr={},this.overlays={},this.Gr=new ar(0),this.zr=!1,this.zr=!0,this.jr=new dh,this.referenceDelegate=t(this),this.Hr=new _h(this),this.indexManager=new eh,this.remoteDocumentCache=function(i){return new ph(i)}(n=>this.referenceDelegate.Jr(n)),this.serializer=new Zc(e),this.Yr=new hh(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new fh,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.Wr[t.toKey()];return n||(n=new mh(e,this.referenceDelegate),this.Wr[t.toKey()]=n),n}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(t,e,n){N("MemoryPersistence","Starting transaction:",t);const i=new yh(this.Gr.next());return this.referenceDelegate.Zr(),n(i).next(o=>this.referenceDelegate.Xr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}ei(t,e){return P.or(Object.values(this.Wr).map(n=>()=>n.containsKey(t,e)))}}class yh extends Kl{constructor(t){super(),this.currentSequenceNumber=t}}class ks{constructor(t){this.persistence=t,this.ti=new bs,this.ni=null}static ri(t){return new ks(t)}get ii(){if(this.ni)return this.ni;throw L()}addReference(t,e,n){return this.ti.addReference(n,e),this.ii.delete(n.toString()),P.resolve()}removeReference(t,e,n){return this.ti.removeReference(n,e),this.ii.add(n.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.ii.add(e.toString()),P.resolve()}removeTarget(t,e){this.ti.br(e.targetId).forEach(i=>this.ii.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.ii.add(o.toString()))}).next(()=>n.removeTargetData(t,e))}Zr(){this.ni=new Set}Xr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.ii,n=>{const i=M.fromPath(n);return this.si(t,i).next(o=>{o||e.removeEntry(i,O.min())})}).next(()=>(this.ni=null,e.apply(t)))}updateLimboDocument(t,e){return this.si(t,e).next(n=>{n?this.ii.delete(e.toString()):this.ii.add(e.toString())})}Jr(t){return 0}si(t,e){return P.or([()=>P.resolve(this.ti.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.ei(t,e)])}}class nr{constructor(t,e){this.persistence=t,this.oi=new he(n=>Hl(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=ah(this,e)}static ri(t,e){return new nr(t,e)}Zr(){}Xr(t){return P.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}nr(t){const e=this.sr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(i=>n+i))}sr(t){let e=0;return this.rr(t,n=>{e++}).next(()=>e)}rr(t,e){return P.forEach(this.oi,(n,i)=>this.ar(t,n,i).next(o=>o?P.resolve():e(i)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.qr(t,u=>this.ar(t,u,e).next(c=>{c||(n++,o.removeEntry(u,O.min()))})).next(()=>o.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.oi.set(e,t.currentSequenceNumber),P.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.oi.set(n,t.currentSequenceNumber),P.resolve()}removeReference(t,e,n){return this.oi.set(n,t.currentSequenceNumber),P.resolve()}updateLimboDocument(t,e){return this.oi.set(e,t.currentSequenceNumber),P.resolve()}Jr(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=$n(t.data.value)),e}ar(t,e,n){return P.or([()=>this.persistence.ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.oi.get(e);return P.resolve(i!==void 0&&i>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(t,e,n,i){this.targetId=t,this.fromCache=e,this.Hi=n,this.Ji=i}static Yi(t,e){let n=q(),i=q();for(const o of e.docChanges)switch(o.type){case 0:n=n.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Ns(t,e.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return bl()?8:Ql(kl())>0?6:4}()}initialize(t,e){this.ns=t,this.indexManager=e,this.Zi=!0}getDocumentsMatchingQuery(t,e,n,i){const o={result:null};return this.rs(t,e).next(u=>{o.result=u}).next(()=>{if(!o.result)return this.ss(t,e,i,n).next(u=>{o.result=u})}).next(()=>{if(o.result)return;const u=new Th;return this._s(t,e,u).next(c=>{if(o.result=c,this.Xi)return this.us(t,e,u,c.size)})}).next(()=>o.result)}us(t,e,n,i){return n.documentReadCount<this.es?(_e()<=Ot.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",ye(e),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),P.resolve()):(_e()<=Ot.DEBUG&&N("QueryEngine","Query:",ye(e),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.ts*i?(_e()<=Ot.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",ye(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,St(e))):P.resolve())}rs(t,e){if(Po(e))return P.resolve(null);let n=St(e);return this.indexManager.getIndexType(t,n).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=Zn(e,null,"F"),n=St(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(o=>{const u=q(...o);return this.ns.getDocuments(t,u).next(c=>this.indexManager.getMinOffset(t,n).next(h=>{const d=this.cs(e,c);return this.ls(e,d,u,h.readTime)?this.rs(t,Zn(e,null,"F")):this.hs(t,d,e,h)}))})))}ss(t,e,n,i){return Po(e)||i.isEqual(O.min())?P.resolve(null):this.ns.getDocuments(t,n).next(o=>{const u=this.cs(e,o);return this.ls(e,u,n,i)?P.resolve(null):(_e()<=Ot.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),ye(e)),this.hs(t,u,e,jl(i,on)).next(c=>c))})}cs(t,e){let n=new nt(Ma(t));return e.forEach((i,o)=>{fr(t,o)&&(n=n.add(o))}),n}ls(t,e,n,i){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}_s(t,e,n){return _e()<=Ot.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",ye(e)),this.ns.getDocumentsMatchingQuery(t,e,Xt.min(),n)}hs(t,e,n,i){return this.ns.getDocumentsMatchingQuery(t,n,i).next(o=>(e.forEach(u=>{o=o.insert(u.key,u)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs="LocalStore",vh=3e8;class Ih{constructor(t,e,n,i){this.persistence=t,this.Ps=e,this.serializer=i,this.Ts=new X(U),this.Is=new he(o=>ws(o),Rs),this.Es=new Map,this.ds=t.getRemoteDocumentCache(),this.Hr=t.getTargetCache(),this.Yr=t.getBundleCache(),this.As(n)}As(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new ch(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ts))}}function Ah(r,t,e,n){return new Ih(r,t,e,n)}async function su(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let i;return e.mutationQueue.getAllMutationBatches(n).next(o=>(i=o,e.As(t),e.mutationQueue.getAllMutationBatches(n))).next(o=>{const u=[],c=[];let h=q();for(const d of i){u.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}for(const d of o){c.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(n,h).next(d=>({Rs:d,removedBatchIds:u,addedBatchIds:c}))})})}function wh(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=t.batch.keys(),o=e.ds.newChangeBuffer({trackRemovals:!0});return function(c,h,d,m){const v=d.batch,w=v.keys();let C=P.resolve();return w.forEach(b=>{C=C.next(()=>m.getEntry(h,b)).next(x=>{const D=d.docVersions.get(b);$(D!==null),x.version.compareTo(D)<0&&(v.applyToRemoteDocument(x,d),x.isValidDocument()&&(x.setReadTime(d.commitVersion),m.addEntry(x)))})}),C.next(()=>c.mutationQueue.removeMutationBatch(h,v))}(e,n,t,o).next(()=>o.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let h=q();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(h=h.add(c.batch.mutations[d].key));return h}(t))).next(()=>e.localDocuments.getDocuments(n,i))})}function iu(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Hr.getLastRemoteSnapshotVersion(e))}function Rh(r,t){const e=F(r),n=t.snapshotVersion;let i=e.Ts;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const u=e.ds.newChangeBuffer({trackRemovals:!0});i=e.Ts;const c=[];t.targetChanges.forEach((m,v)=>{const w=i.get(v);if(!w)return;c.push(e.Hr.removeMatchingKeys(o,m.removedDocuments,v).next(()=>e.Hr.addMatchingKeys(o,m.addedDocuments,v)));let C=w.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(v)!==null?C=C.withResumeToken(lt.EMPTY_BYTE_STRING,O.min()).withLastLimboFreeSnapshotVersion(O.min()):m.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(m.resumeToken,n)),i=i.insert(v,C),function(x,D,z){return x.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=vh?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(w,C,m)&&c.push(e.Hr.updateTargetData(o,C))});let h=qt(),d=q();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),c.push(Vh(o,u,t.documentUpdates).next(m=>{h=m.Vs,d=m.fs})),!n.isEqual(O.min())){const m=e.Hr.getLastRemoteSnapshotVersion(o).next(v=>e.Hr.setTargetsMetadata(o,o.currentSequenceNumber,n));c.push(m)}return P.waitFor(c).next(()=>u.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(e.Ts=i,o))}function Vh(r,t,e){let n=q(),i=q();return e.forEach(o=>n=n.add(o)),t.getEntries(r,n).next(o=>{let u=qt();return e.forEach((c,h)=>{const d=o.get(c);h.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),h.isNoDocument()&&h.version.isEqual(O.min())?(t.removeEntry(c,h.readTime),u=u.insert(c,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),u=u.insert(c,h)):N(xs,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",h.version)}),{Vs:u,fs:i}})}function Ph(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=vs),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function Ch(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return e.Hr.getTargetData(n,t).next(o=>o?(i=o,P.resolve(i)):e.Hr.allocateTargetId(n).next(u=>(i=new Qt(t,u,"TargetPurposeListen",n.currentSequenceNumber),e.Hr.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=e.Ts.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.Ts=e.Ts.insert(n.targetId,n),e.Is.set(t,n.targetId)),n})}async function ms(r,t,e){const n=F(r),i=n.Ts.get(t),o=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",o,u=>n.persistence.referenceDelegate.removeTarget(u,i))}catch(u){if(!be(u))throw u;N(xs,`Failed to update sequence numbers for target ${t}: ${u}`)}n.Ts=n.Ts.remove(t),n.Is.delete(i.target)}function qo(r,t,e){const n=F(r);let i=O.min(),o=q();return n.persistence.runTransaction("Execute query","readwrite",u=>function(h,d,m){const v=F(h),w=v.Is.get(m);return w!==void 0?P.resolve(v.Ts.get(w)):v.Hr.getTargetData(d,m)}(n,u,St(t)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.Hr.getMatchingKeysForTargetId(u,c.targetId).next(h=>{o=h})}).next(()=>n.Ps.getDocumentsMatchingQuery(u,t,e?i:O.min(),e?o:q())).next(c=>(Sh(n,mc(t),c),{documents:c,gs:o})))}function Sh(r,t,e){let n=r.Es.get(t)||O.min();e.forEach((i,o)=>{o.readTime.compareTo(n)>0&&(n=o.readTime)}),r.Es.set(t,n)}class Bo{constructor(){this.activeTargetIds=Ec()}Ds(t){this.activeTargetIds=this.activeTargetIds.add(t)}vs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}bs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Dh{constructor(){this.ho=new Bo,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.ho.Ds(t),this.Po[t]||"not-current"}updateQueryState(t,e,n){this.Po[t]=e}removeLocalQueryTarget(t){this.ho.vs(t)}isLocalQueryTarget(t){return this.ho.activeTargetIds.has(t)}clearQueryState(t){delete this.Po[t]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(t){return this.ho.activeTargetIds.has(t)}start(){return this.ho=new Bo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{To(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo="ConnectivityMonitor";class zo{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(t){this.Vo.push(t)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){N(jo,"Network connectivity changed: AVAILABLE");for(const t of this.Vo)t(0)}Ro(){N(jo,"Network connectivity changed: UNAVAILABLE");for(const t of this.Vo)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jn=null;function ps(){return jn===null?jn=function(){return 268435456+Math.round(2147483648*Math.random())}():jn++,"0x"+jn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ts="RestConnection",kh={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Nh{get fo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.po=e+"://"+t.host,this.yo=`projects/${n}/databases/${i}`,this.wo=this.databaseId.database===Xn?`project_id=${n}`:`project_id=${n}&database_id=${i}`}So(t,e,n,i,o){const u=ps(),c=this.bo(t,e.toUriEncodedString());N(ts,`Sending RPC '${t}' ${u}:`,c,n);const h={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(h,i,o),this.vo(t,c,h,n).then(d=>(N(ts,`Received RPC '${t}' ${u}: `,d),d),d=>{throw Ie(ts,`RPC '${t}' ${u} failed with error: `,d,"url: ",c,"request:",n),d})}Co(t,e,n,i,o,u){return this.So(t,e,n,i,o)}Do(t,e,n){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Se}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((i,o)=>t[o]=i),n&&n.headers.forEach((i,o)=>t[o]=i)}bo(t,e){const n=kh[t];return`${this.po}/v1/${e}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(t){this.Fo=t.Fo,this.Mo=t.Mo}xo(t){this.Oo=t}No(t){this.Bo=t}Lo(t){this.ko=t}onMessage(t){this.qo=t}close(){this.Mo()}send(t){this.Fo(t)}Qo(){this.Oo()}$o(){this.Bo()}Uo(t){this.ko(t)}Ko(t){this.qo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt="WebChannelConnection";class Mh extends Nh{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}vo(t,e,n,i){const o=ps();return new Promise((u,c)=>{const h=new la;h.setWithCredentials(!0),h.listenOnce(ca.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case zn.NO_ERROR:const m=h.getResponseJson();N(mt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(m)),u(m);break;case zn.TIMEOUT:N(mt,`RPC '${t}' ${o} timed out`),c(new k(V.DEADLINE_EXCEEDED,"Request time out"));break;case zn.HTTP_ERROR:const v=h.getStatus();if(N(mt,`RPC '${t}' ${o} failed with status:`,v,"response text:",h.getResponseText()),v>0){let w=h.getResponseJson();Array.isArray(w)&&(w=w[0]);const C=w==null?void 0:w.error;if(C&&C.status&&C.message){const b=function(D){const z=D.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(z)>=0?z:V.UNKNOWN}(C.status);c(new k(b,C.message))}else c(new k(V.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new k(V.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{N(mt,`RPC '${t}' ${o} completed.`)}});const d=JSON.stringify(i);N(mt,`RPC '${t}' ${o} sending request:`,i),h.send(e,"POST",d,n,15)})}Wo(t,e,n){const i=ps(),o=[this.po,"/","google.firestore.v1.Firestore","/",t,"/channel"],u=da(),c=fa(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Do(h.initMessageHeaders,e,n),h.encodeInitMessageHeaders=!0;const m=o.join("");N(mt,`Creating RPC '${t}' stream ${i}: ${m}`,h);const v=u.createWebChannel(m,h);let w=!1,C=!1;const b=new xh({Fo:D=>{C?N(mt,`Not sending because RPC '${t}' stream ${i} is closed:`,D):(w||(N(mt,`Opening RPC '${t}' stream ${i} transport.`),v.open(),w=!0),N(mt,`RPC '${t}' stream ${i} sending:`,D),v.send(D))},Mo:()=>v.close()}),x=(D,z,G)=>{D.listen(z,K=>{try{G(K)}catch(rt){setTimeout(()=>{throw rt},0)}})};return x(v,Ye.EventType.OPEN,()=>{C||(N(mt,`RPC '${t}' stream ${i} transport opened.`),b.Qo())}),x(v,Ye.EventType.CLOSE,()=>{C||(C=!0,N(mt,`RPC '${t}' stream ${i} transport closed`),b.Uo())}),x(v,Ye.EventType.ERROR,D=>{C||(C=!0,Ie(mt,`RPC '${t}' stream ${i} transport errored:`,D),b.Uo(new k(V.UNAVAILABLE,"The operation could not be completed")))}),x(v,Ye.EventType.MESSAGE,D=>{var z;if(!C){const G=D.data[0];$(!!G);const K=G,rt=(K==null?void 0:K.error)||((z=K[0])===null||z===void 0?void 0:z.error);if(rt){N(mt,`RPC '${t}' stream ${i} received error:`,rt);const Nt=rt.status;let it=function(_){const y=Z[_];if(y!==void 0)return Ka(y)}(Nt),E=rt.message;it===void 0&&(it=V.INTERNAL,E="Unknown error status: "+Nt+" with message "+rt.message),C=!0,b.Uo(new k(it,E)),v.close()}else N(mt,`RPC '${t}' stream ${i} received:`,G),b.Ko(G)}}),x(c,ha.STAT_EVENT,D=>{D.stat===rs.PROXY?N(mt,`RPC '${t}' stream ${i} detected buffering proxy`):D.stat===rs.NOPROXY&&N(mt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{b.$o()},0),b}}function es(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(r){return new Uc(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(t,e,n=1e3,i=1.5,o=6e4){this.Ti=t,this.timerId=e,this.Go=n,this.zo=i,this.jo=o,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(t){this.cancel();const e=Math.floor(this.Ho+this.e_()),n=Math.max(0,Date.now()-this.Yo),i=Math.max(0,e-n);i>0&&N("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ho} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,i,()=>(this.Yo=Date.now(),t())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $o="PersistentStream";class au{constructor(t,e,n,i,o,u,c,h){this.Ti=t,this.n_=n,this.r_=i,this.connection=o,this.authCredentialsProvider=u,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new ou(t,e)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(t){this.E_(),this.stream.send(t)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(t,e){this.E_(),this.d_(),this.a_.cancel(),this.i_++,t!==4?this.a_.reset():e&&e.code===V.RESOURCE_EXHAUSTED?(Ut(e.toString()),Ut("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Lo(e)}A_(){}auth(){this.state=1;const t=this.R_(this.i_),e=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.i_===e&&this.V_(n,i)},n=>{t(()=>{const i=new k(V.UNKNOWN,"Fetching auth token failed: "+n.message);return this.m_(i)})})}V_(t,e){const n=this.R_(this.i_);this.stream=this.f_(t,e),this.stream.xo(()=>{n(()=>this.listener.xo())}),this.stream.No(()=>{n(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(i=>{n(()=>this.m_(i))}),this.stream.onMessage(i=>{n(()=>++this.__==1?this.g_(i):this.onNext(i))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(t){return N($o,`close with error: ${t}`),this.stream=null,this.close(4,t)}R_(t){return e=>{this.Ti.enqueueAndForget(()=>this.i_===t?e():(N($o,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Lh extends au{constructor(t,e,n,i,o,u){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}f_(t,e){return this.connection.Wo("Listen",t,e)}g_(t){return this.onNext(t)}onNext(t){this.a_.reset();const e=jc(this.serializer,t),n=function(o){if(!("targetChange"in o))return O.min();const u=o.targetChange;return u.targetIds&&u.targetIds.length?O.min():u.readTime?Dt(u.readTime):O.min()}(t);return this.listener.p_(e,n)}y_(t){const e={};e.database=ds(this.serializer),e.addTarget=function(o,u){let c;const h=u.target;if(c=us(h)?{documents:Gc(o,h)}:{query:Kc(o,h).ht},c.targetId=u.targetId,u.resumeToken.approximateByteSize()>0){c.resumeToken=Ha(o,u.resumeToken);const d=cs(o,u.expectedCount);d!==null&&(c.expectedCount=d)}else if(u.snapshotVersion.compareTo(O.min())>0){c.readTime=er(o,u.snapshotVersion.toTimestamp());const d=cs(o,u.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,t);const n=Wc(this.serializer,t);n&&(e.labels=n),this.I_(e)}w_(t){const e={};e.database=ds(this.serializer),e.removeTarget=t,this.I_(e)}}class Oh extends au{constructor(t,e,n,i,o,u){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(t,e){return this.connection.Wo("Write",t,e)}g_(t){return $(!!t.streamToken),this.lastStreamToken=t.streamToken,$(!t.writeResults||t.writeResults.length===0),this.listener.D_()}onNext(t){$(!!t.streamToken),this.lastStreamToken=t.streamToken,this.a_.reset();const e=$c(t.writeResults,t.commitTime),n=Dt(t.commitTime);return this.listener.v_(n,e)}C_(){const t={};t.database=ds(this.serializer),this.I_(t)}b_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>zc(this.serializer,n))};this.I_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{}class Uh extends Fh{constructor(t,e,n,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=i,this.F_=!1}M_(){if(this.F_)throw new k(V.FAILED_PRECONDITION,"The client has already been terminated.")}So(t,e,n,i){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.So(t,hs(e,n),i,o,u)).catch(o=>{throw o.name==="FirebaseError"?(o.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new k(V.UNKNOWN,o.toString())})}Co(t,e,n,i,o){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([u,c])=>this.connection.Co(t,hs(e,n),i,u,c,o)).catch(u=>{throw u.name==="FirebaseError"?(u.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new k(V.UNKNOWN,u.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class qh{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(t){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.L_("Offline")))}set(t){this.Q_(),this.x_=0,t==="Online"&&(this.N_=!1),this.L_(t)}L_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}k_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(Ut(e),this.N_=!1):N("OnlineStateTracker",e)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce="RemoteStore";class Bh{constructor(t,e,n,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=o,this.z_.To(u=>{n.enqueueAndForget(async()=>{fe(this)&&(N(ce,"Restarting streams for network reachability change."),await async function(h){const d=F(h);d.W_.add(4),await gn(d),d.j_.set("Unknown"),d.W_.delete(4),await _r(d)}(this))})}),this.j_=new qh(n,i)}}async function _r(r){if(fe(r))for(const t of r.G_)await t(!0)}async function gn(r){for(const t of r.G_)await t(!1)}function uu(r,t){const e=F(r);e.K_.has(t.targetId)||(e.K_.set(t.targetId,t),Fs(e)?Os(e):Ne(e).c_()&&Ls(e,t))}function Ms(r,t){const e=F(r),n=Ne(e);e.K_.delete(t),n.c_()&&lu(e,t),e.K_.size===0&&(n.c_()?n.P_():fe(e)&&e.j_.set("Unknown"))}function Ls(r,t){if(r.H_.Ne(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(O.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Ne(r).y_(t)}function lu(r,t){r.H_.Ne(t),Ne(r).w_(t)}function Os(r){r.H_=new Mc({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),lt:t=>r.K_.get(t)||null,it:()=>r.datastore.serializer.databaseId}),Ne(r).start(),r.j_.B_()}function Fs(r){return fe(r)&&!Ne(r).u_()&&r.K_.size>0}function fe(r){return F(r).W_.size===0}function cu(r){r.H_=void 0}async function jh(r){r.j_.set("Online")}async function zh(r){r.K_.forEach((t,e)=>{Ls(r,t)})}async function $h(r,t){cu(r),Fs(r)?(r.j_.q_(t),Os(r)):r.j_.set("Unknown")}async function Gh(r,t,e){if(r.j_.set("Online"),t instanceof Wa&&t.state===2&&t.cause)try{await async function(i,o){const u=o.cause;for(const c of o.targetIds)i.K_.has(c)&&(await i.remoteSyncer.rejectListen(c,u),i.K_.delete(c),i.H_.removeTarget(c))}(r,t)}catch(n){N(ce,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await rr(r,n)}else if(t instanceof Qn?r.H_.We(t):t instanceof Qa?r.H_.Ze(t):r.H_.je(t),!e.isEqual(O.min()))try{const n=await iu(r.localStore);e.compareTo(n)>=0&&await function(o,u){const c=o.H_.ot(u);return c.targetChanges.forEach((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.K_.get(d);m&&o.K_.set(d,m.withResumeToken(h.resumeToken,u))}}),c.targetMismatches.forEach((h,d)=>{const m=o.K_.get(h);if(!m)return;o.K_.set(h,m.withResumeToken(lt.EMPTY_BYTE_STRING,m.snapshotVersion)),lu(o,h);const v=new Qt(m.target,h,d,m.sequenceNumber);Ls(o,v)}),o.remoteSyncer.applyRemoteEvent(c)}(r,e)}catch(n){N(ce,"Failed to raise snapshot:",n),await rr(r,n)}}async function rr(r,t,e){if(!be(t))throw t;r.W_.add(1),await gn(r),r.j_.set("Offline"),e||(e=()=>iu(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{N(ce,"Retrying IndexedDB access"),await e(),r.W_.delete(1),await _r(r)})}function hu(r,t){return t().catch(e=>rr(r,e,t))}async function yr(r){const t=F(r),e=te(t);let n=t.U_.length>0?t.U_[t.U_.length-1].batchId:vs;for(;Kh(t);)try{const i=await Ph(t.localStore,n);if(i===null){t.U_.length===0&&e.P_();break}n=i.batchId,Qh(t,i)}catch(i){await rr(t,i)}fu(t)&&du(t)}function Kh(r){return fe(r)&&r.U_.length<10}function Qh(r,t){r.U_.push(t);const e=te(r);e.c_()&&e.S_&&e.b_(t.mutations)}function fu(r){return fe(r)&&!te(r).u_()&&r.U_.length>0}function du(r){te(r).start()}async function Wh(r){te(r).C_()}async function Hh(r){const t=te(r);for(const e of r.U_)t.b_(e.mutations)}async function Xh(r,t,e){const n=r.U_.shift(),i=Cs.from(n,t,e);await hu(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await yr(r)}async function Yh(r,t){t&&te(r).S_&&await async function(n,i){if(function(u){return Nc(u)&&u!==V.ABORTED}(i.code)){const o=n.U_.shift();te(n).h_(),await hu(n,()=>n.remoteSyncer.rejectFailedWrite(o.batchId,i)),await yr(n)}}(r,t),fu(r)&&du(r)}async function Go(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),N(ce,"RemoteStore received new credentials");const n=fe(e);e.W_.add(3),await gn(e),n&&e.j_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.W_.delete(3),await _r(e)}async function Jh(r,t){const e=F(r);t?(e.W_.delete(2),await _r(e)):t||(e.W_.add(2),await gn(e),e.j_.set("Unknown"))}function Ne(r){return r.J_||(r.J_=function(e,n,i){const o=F(e);return o.M_(),new Lh(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{xo:jh.bind(null,r),No:zh.bind(null,r),Lo:$h.bind(null,r),p_:Gh.bind(null,r)}),r.G_.push(async t=>{t?(r.J_.h_(),Fs(r)?Os(r):r.j_.set("Unknown")):(await r.J_.stop(),cu(r))})),r.J_}function te(r){return r.Y_||(r.Y_=function(e,n,i){const o=F(e);return o.M_(),new Oh(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{xo:()=>Promise.resolve(),No:Wh.bind(null,r),Lo:Yh.bind(null,r),D_:Hh.bind(null,r),v_:Xh.bind(null,r)}),r.G_.push(async t=>{t?(r.Y_.h_(),await yr(r)):(await r.Y_.stop(),r.U_.length>0&&(N(ce,`Stopping write stream with ${r.U_.length} pending writes`),r.U_=[]))})),r.Y_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(t,e,n,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=i,this.removalCallback=o,this.deferred=new Ft,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(u=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,i,o){const u=Date.now()+n,c=new Us(t,e,u,i,o);return c.start(n),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function qs(r,t){if(Ut("AsyncQueue",`${t}: ${r}`),be(r))return new k(V.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{static emptySet(t){return new ve(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||M.comparator(e.key,n.key):(e,n)=>M.comparator(e.key,n.key),this.keyedMap=Je(),this.sortedSet=new X(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ve)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new ve;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(){this.Z_=new X(M.comparator)}track(t){const e=t.doc.key,n=this.Z_.get(e);n?t.type!==0&&n.type===3?this.Z_=this.Z_.insert(e,t):t.type===3&&n.type!==1?this.Z_=this.Z_.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.Z_=this.Z_.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.Z_=this.Z_.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.Z_=this.Z_.remove(e):t.type===1&&n.type===2?this.Z_=this.Z_.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.Z_=this.Z_.insert(e,{type:2,doc:t.doc}):L():this.Z_=this.Z_.insert(e,t)}X_(){const t=[];return this.Z_.inorderTraversal((e,n)=>{t.push(n)}),t}}class Pe{constructor(t,e,n,i,o,u,c,h,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=o,this.fromCache=u,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,i,o){const u=[];return e.forEach(c=>{u.push({type:0,doc:c})}),new Pe(t,e,ve.emptySet(e),u,n,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&hr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==n[i].type||!e[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(t=>t.ra())}}class tf{constructor(){this.queries=Qo(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(e,n){const i=F(e),o=i.queries;i.queries=Qo(),o.forEach((u,c)=>{for(const h of c.ta)h.onError(n)})})(this,new k(V.ABORTED,"Firestore shutting down"))}}function Qo(){return new he(r=>xa(r),hr)}async function Bs(r,t){const e=F(r);let n=3;const i=t.query;let o=e.queries.get(i);o?!o.na()&&t.ra()&&(n=2):(o=new Zh,n=t.ra()?0:1);try{switch(n){case 0:o.ea=await e.onListen(i,!0);break;case 1:o.ea=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(u){const c=qs(u,`Initialization of query '${ye(t.query)}' failed`);return void t.onError(c)}e.queries.set(i,o),o.ta.push(t),t.sa(e.onlineState),o.ea&&t.oa(o.ea)&&zs(e)}async function js(r,t){const e=F(r),n=t.query;let i=3;const o=e.queries.get(n);if(o){const u=o.ta.indexOf(t);u>=0&&(o.ta.splice(u,1),o.ta.length===0?i=t.ra()?0:1:!o.na()&&t.ra()&&(i=2))}switch(i){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function ef(r,t){const e=F(r);let n=!1;for(const i of t){const o=i.query,u=e.queries.get(o);if(u){for(const c of u.ta)c.oa(i)&&(n=!0);u.ea=i}}n&&zs(e)}function nf(r,t,e){const n=F(r),i=n.queries.get(t);if(i)for(const o of i.ta)o.onError(e);n.queries.delete(t)}function zs(r){r.ia.forEach(t=>{t.next()})}var gs,Wo;(Wo=gs||(gs={}))._a="default",Wo.Cache="cache";class $s{constructor(t,e,n){this.query=t,this.aa=e,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=n||{}}oa(t){if(!this.options.includeMetadataChanges){const n=[];for(const i of t.docChanges)i.type!==3&&n.push(i);t=new Pe(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ua?this.la(t)&&(this.aa.next(t),e=!0):this.ha(t,this.onlineState)&&(this.Pa(t),e=!0),this.ca=t,e}onError(t){this.aa.error(t)}sa(t){this.onlineState=t;let e=!1;return this.ca&&!this.ua&&this.ha(this.ca,t)&&(this.Pa(this.ca),e=!0),e}ha(t,e){if(!t.fromCache||!this.ra())return!0;const n=e!=="Offline";return(!this.options.Ta||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}la(t){if(t.docChanges.length>0)return!0;const e=this.ca&&this.ca.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}Pa(t){t=Pe.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ua=!0,this.aa.next(t)}ra(){return this.options.source!==gs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(t){this.key=t}}class pu{constructor(t){this.key=t}}class rf{constructor(t,e){this.query=t,this.fa=e,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=q(),this.mutatedKeys=q(),this.ya=Ma(t),this.wa=new ve(this.ya)}get Sa(){return this.fa}ba(t,e){const n=e?e.Da:new Ko,i=e?e.wa:this.wa;let o=e?e.mutatedKeys:this.mutatedKeys,u=i,c=!1;const h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((m,v)=>{const w=i.get(m),C=fr(this.query,v)?v:null,b=!!w&&this.mutatedKeys.has(w.key),x=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let D=!1;w&&C?w.data.isEqual(C.data)?b!==x&&(n.track({type:3,doc:C}),D=!0):this.va(w,C)||(n.track({type:2,doc:C}),D=!0,(h&&this.ya(C,h)>0||d&&this.ya(C,d)<0)&&(c=!0)):!w&&C?(n.track({type:0,doc:C}),D=!0):w&&!C&&(n.track({type:1,doc:w}),D=!0,(h||d)&&(c=!0)),D&&(C?(u=u.add(C),o=x?o.add(m):o.delete(m)):(u=u.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;u.size>this.query.limit;){const m=this.query.limitType==="F"?u.last():u.first();u=u.delete(m.key),o=o.delete(m.key),n.track({type:1,doc:m})}return{wa:u,Da:n,ls:c,mutatedKeys:o}}va(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,i){const o=this.wa;this.wa=t.wa,this.mutatedKeys=t.mutatedKeys;const u=t.Da.X_();u.sort((m,v)=>function(C,b){const x=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return x(C)-x(b)}(m.type,v.type)||this.ya(m.doc,v.doc)),this.Ca(n),i=i!=null&&i;const c=e&&!i?this.Fa():[],h=this.pa.size===0&&this.current&&!i?1:0,d=h!==this.ga;return this.ga=h,u.length!==0||d?{snapshot:new Pe(this.query,t.wa,o,u,t.mutatedKeys,h===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),Ma:c}:{Ma:c}}sa(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new Ko,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(t){return!this.fa.has(t)&&!!this.wa.has(t)&&!this.wa.get(t).hasLocalMutations}Ca(t){t&&(t.addedDocuments.forEach(e=>this.fa=this.fa.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.fa=this.fa.delete(e)),this.current=t.current)}Fa(){if(!this.current)return[];const t=this.pa;this.pa=q(),this.wa.forEach(n=>{this.xa(n.key)&&(this.pa=this.pa.add(n.key))});const e=[];return t.forEach(n=>{this.pa.has(n)||e.push(new pu(n))}),this.pa.forEach(n=>{t.has(n)||e.push(new mu(n))}),e}Oa(t){this.fa=t.gs,this.pa=q();const e=this.ba(t.documents);return this.applyChanges(e,!0)}Na(){return Pe.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const Gs="SyncEngine";class sf{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class of{constructor(t){this.key=t,this.Ba=!1}}class af{constructor(t,e,n,i,o,u){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=u,this.La={},this.ka=new he(c=>xa(c),hr),this.qa=new Map,this.Qa=new Set,this.$a=new X(M.comparator),this.Ua=new Map,this.Ka=new bs,this.Wa={},this.Ga=new Map,this.za=Ve.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function uf(r,t,e=!0){const n=vu(r);let i;const o=n.ka.get(t);return o?(n.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.Na()):i=await gu(n,t,e,!0),i}async function lf(r,t){const e=vu(r);await gu(e,t,!0,!1)}async function gu(r,t,e,n){const i=await Ch(r.localStore,St(t)),o=i.targetId,u=r.sharedClientState.addLocalQueryTarget(o,e);let c;return n&&(c=await cf(r,t,o,u==="current",i.resumeToken)),r.isPrimaryClient&&e&&uu(r.remoteStore,i),c}async function cf(r,t,e,n,i){r.Ha=(v,w,C)=>async function(x,D,z,G){let K=D.view.ba(z);K.ls&&(K=await qo(x.localStore,D.query,!1).then(({documents:E})=>D.view.ba(E,K)));const rt=G&&G.targetChanges.get(D.targetId),Nt=G&&G.targetMismatches.get(D.targetId)!=null,it=D.view.applyChanges(K,x.isPrimaryClient,rt,Nt);return Xo(x,D.targetId,it.Ma),it.snapshot}(r,v,w,C);const o=await qo(r.localStore,t,!0),u=new rf(t,o.gs),c=u.ba(o.documents),h=pn.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",i),d=u.applyChanges(c,r.isPrimaryClient,h);Xo(r,e,d.Ma);const m=new sf(t,e,u);return r.ka.set(t,m),r.qa.has(e)?r.qa.get(e).push(t):r.qa.set(e,[t]),d.snapshot}async function hf(r,t,e){const n=F(r),i=n.ka.get(t),o=n.qa.get(i.targetId);if(o.length>1)return n.qa.set(i.targetId,o.filter(u=>!hr(u,t))),void n.ka.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await ms(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),e&&Ms(n.remoteStore,i.targetId),_s(n,i.targetId)}).catch(De)):(_s(n,i.targetId),await ms(n.localStore,i.targetId,!0))}async function ff(r,t){const e=F(r),n=e.ka.get(t),i=e.qa.get(n.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Ms(e.remoteStore,n.targetId))}async function df(r,t,e){const n=Ef(r);try{const i=await function(u,c){const h=F(u),d=et.now(),m=c.reduce((C,b)=>C.add(b.key),q());let v,w;return h.persistence.runTransaction("Locally write mutations","readwrite",C=>{let b=qt(),x=q();return h.ds.getEntries(C,m).next(D=>{b=D,b.forEach((z,G)=>{G.isValidDocument()||(x=x.add(z))})}).next(()=>h.localDocuments.getOverlayedDocuments(C,b)).next(D=>{v=D;const z=[];for(const G of c){const K=Cc(G,v.get(G.key).overlayedDocument);K!=null&&z.push(new re(G.key,K,Va(K.value.mapValue),Rt.exists(!0)))}return h.mutationQueue.addMutationBatch(C,d,z,c)}).next(D=>{w=D;const z=D.applyToLocalDocumentSet(v,x);return h.documentOverlayCache.saveOverlays(C,D.batchId,z)})}).then(()=>({batchId:w.batchId,changes:Oa(v)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(i.batchId),function(u,c,h){let d=u.Wa[u.currentUser.toKey()];d||(d=new X(U)),d=d.insert(c,h),u.Wa[u.currentUser.toKey()]=d}(n,i.batchId,e),await _n(n,i.changes),await yr(n.remoteStore)}catch(i){const o=qs(i,"Failed to persist write");e.reject(o)}}async function _u(r,t){const e=F(r);try{const n=await Rh(e.localStore,t);t.targetChanges.forEach((i,o)=>{const u=e.Ua.get(o);u&&($(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?u.Ba=!0:i.modifiedDocuments.size>0?$(u.Ba):i.removedDocuments.size>0&&($(u.Ba),u.Ba=!1))}),await _n(e,n,t)}catch(n){await De(n)}}function Ho(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const i=[];n.ka.forEach((o,u)=>{const c=u.view.sa(t);c.snapshot&&i.push(c.snapshot)}),function(u,c){const h=F(u);h.onlineState=c;let d=!1;h.queries.forEach((m,v)=>{for(const w of v.ta)w.sa(c)&&(d=!0)}),d&&zs(h)}(n.eventManager,t),i.length&&n.La.p_(i),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function mf(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const i=n.Ua.get(t),o=i&&i.key;if(o){let u=new X(M.comparator);u=u.insert(o,gt.newNoDocument(o,O.min()));const c=q().add(o),h=new pr(O.min(),new Map,new X(U),u,c);await _u(n,h),n.$a=n.$a.remove(o),n.Ua.delete(t),Ks(n)}else await ms(n.localStore,t,!1).then(()=>_s(n,t,e)).catch(De)}async function pf(r,t){const e=F(r),n=t.batch.batchId;try{const i=await wh(e.localStore,t);Tu(e,n,null),yu(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await _n(e,i)}catch(i){await De(i)}}async function gf(r,t,e){const n=F(r);try{const i=await function(u,c){const h=F(u);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return h.mutationQueue.lookupMutationBatch(d,c).next(v=>($(v!==null),m=v.keys(),h.mutationQueue.removeMutationBatch(d,v))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,m,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>h.localDocuments.getDocuments(d,m))})}(n.localStore,t);Tu(n,t,e),yu(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await _n(n,i)}catch(i){await De(i)}}function yu(r,t){(r.Ga.get(t)||[]).forEach(e=>{e.resolve()}),r.Ga.delete(t)}function Tu(r,t,e){const n=F(r);let i=n.Wa[n.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),n.Wa[n.currentUser.toKey()]=i}}function _s(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.qa.get(t))r.ka.delete(n),e&&r.La.Ja(n,e);r.qa.delete(t),r.isPrimaryClient&&r.Ka.br(t).forEach(n=>{r.Ka.containsKey(n)||Eu(r,n)})}function Eu(r,t){r.Qa.delete(t.path.canonicalString());const e=r.$a.get(t);e!==null&&(Ms(r.remoteStore,e),r.$a=r.$a.remove(t),r.Ua.delete(e),Ks(r))}function Xo(r,t,e){for(const n of e)n instanceof mu?(r.Ka.addReference(n.key,t),_f(r,n)):n instanceof pu?(N(Gs,"Document no longer in limbo: "+n.key),r.Ka.removeReference(n.key,t),r.Ka.containsKey(n.key)||Eu(r,n.key)):L()}function _f(r,t){const e=t.key,n=e.path.canonicalString();r.$a.get(e)||r.Qa.has(n)||(N(Gs,"New document in limbo: "+e),r.Qa.add(n),Ks(r))}function Ks(r){for(;r.Qa.size>0&&r.$a.size<r.maxConcurrentLimboResolutions;){const t=r.Qa.values().next().value;r.Qa.delete(t);const e=new M(H.fromString(t)),n=r.za.next();r.Ua.set(n,new of(e)),r.$a=r.$a.insert(e,n),uu(r.remoteStore,new Qt(St(cr(e.path)),n,"TargetPurposeLimboResolution",ar.ae))}}async function _n(r,t,e){const n=F(r),i=[],o=[],u=[];n.ka.isEmpty()||(n.ka.forEach((c,h)=>{u.push(n.Ha(h,t,e).then(d=>{var m;if((d||e)&&n.isPrimaryClient){const v=d?!d.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;n.sharedClientState.updateQueryState(h.targetId,v?"current":"not-current")}if(d){i.push(d);const v=Ns.Yi(h.targetId,d);o.push(v)}}))}),await Promise.all(u),n.La.p_(i),await async function(h,d){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>P.forEach(d,w=>P.forEach(w.Hi,C=>m.persistence.referenceDelegate.addReference(v,w.targetId,C)).next(()=>P.forEach(w.Ji,C=>m.persistence.referenceDelegate.removeReference(v,w.targetId,C)))))}catch(v){if(!be(v))throw v;N(xs,"Failed to update sequence numbers: "+v)}for(const v of d){const w=v.targetId;if(!v.fromCache){const C=m.Ts.get(w),b=C.snapshotVersion,x=C.withLastLimboFreeSnapshotVersion(b);m.Ts=m.Ts.insert(w,x)}}}(n.localStore,o))}async function yf(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){N(Gs,"User change. New user:",t.toKey());const n=await su(e.localStore,t);e.currentUser=t,function(o,u){o.Ga.forEach(c=>{c.forEach(h=>{h.reject(new k(V.CANCELLED,u))})}),o.Ga.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await _n(e,n.Rs)}}function Tf(r,t){const e=F(r),n=e.Ua.get(t);if(n&&n.Ba)return q().add(n.key);{let i=q();const o=e.qa.get(t);if(!o)return i;for(const u of o){const c=e.ka.get(u);i=i.unionWith(c.view.Sa)}return i}}function vu(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=_u.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Tf.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=mf.bind(null,t),t.La.p_=ef.bind(null,t.eventManager),t.La.Ja=nf.bind(null,t.eventManager),t}function Ef(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=pf.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=gf.bind(null,t),t}class sr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=gr(t.databaseInfo.databaseId),this.sharedClientState=this.Za(t),this.persistence=this.Xa(t),await this.persistence.start(),this.localStore=this.eu(t),this.gcScheduler=this.tu(t,this.localStore),this.indexBackfillerScheduler=this.nu(t,this.localStore)}tu(t,e){return null}nu(t,e){return null}eu(t){return Ah(this.persistence,new Eh,t.initialUser,this.serializer)}Xa(t){return new ru(ks.ri,this.serializer)}Za(t){return new Dh}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}sr.provider={build:()=>new sr};class vf extends sr{constructor(t){super(),this.cacheSizeBytes=t}tu(t,e){$(this.persistence.referenceDelegate instanceof nr);const n=this.persistence.referenceDelegate.garbageCollector;return new ih(n,t.asyncQueue,e)}Xa(t){const e=this.cacheSizeBytes!==void 0?Et.withCacheSize(this.cacheSizeBytes):Et.DEFAULT;return new ru(n=>nr.ri(n,e),this.serializer)}}class ys{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Ho(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=yf.bind(null,this.syncEngine),await Jh(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new tf}()}createDatastore(t){const e=gr(t.databaseInfo.databaseId),n=function(o){return new Mh(o)}(t.databaseInfo);return function(o,u,c,h){return new Uh(o,u,c,h)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,i,o,u,c){return new Bh(n,i,o,u,c)}(this.localStore,this.datastore,t.asyncQueue,e=>Ho(this.syncEngine,e,0),function(){return zo.D()?new zo:new bh}())}createSyncEngine(t,e){return function(i,o,u,c,h,d,m){const v=new af(i,o,u,c,h,d);return m&&(v.ja=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=F(i);N(ce,"RemoteStore shutting down."),o.W_.add(5),await gn(o),o.z_.shutdown(),o.j_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}ys.provider={build:()=>new ys};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.iu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.iu(this.observer.error,t):Ut("Uncaught Error in snapshot listener:",t.toString()))}su(){this.muted=!0}iu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee="FirestoreClient";class If{constructor(t,e,n,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=i,this.user=pt.UNAUTHENTICATED,this.clientId=ga.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(n,async u=>{N(ee,"Received user=",u.uid),await this.authCredentialListener(u),this.user=u}),this.appCheckCredentials.start(n,u=>(N(ee,"Received new app check token=",u),this.appCheckCredentialListener(u,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ft;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=qs(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function ns(r,t){r.asyncQueue.verifyOperationInProgress(),N(ee,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await su(t.localStore,i),n=i)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function Yo(r,t){r.asyncQueue.verifyOperationInProgress();const e=await Af(r);N(ee,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Go(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>Go(t.remoteStore,i)),r._onlineComponents=t}async function Af(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){N(ee,"Using user provided OfflineComponentProvider");try{await ns(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(i){return i.name==="FirebaseError"?i.code===V.FAILED_PRECONDITION||i.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;Ie("Error using user provided cache. Falling back to memory cache: "+e),await ns(r,new sr)}}else N(ee,"Using default OfflineComponentProvider"),await ns(r,new vf(void 0));return r._offlineComponents}async function Iu(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(N(ee,"Using user provided OnlineComponentProvider"),await Yo(r,r._uninitializedComponentsProvider._online)):(N(ee,"Using default OnlineComponentProvider"),await Yo(r,new ys))),r._onlineComponents}function wf(r){return Iu(r).then(t=>t.syncEngine)}async function ir(r){const t=await Iu(r),e=t.eventManager;return e.onListen=uf.bind(null,t.syncEngine),e.onUnlisten=hf.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=lf.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=ff.bind(null,t.syncEngine),e}function Rf(r,t,e={}){const n=new Ft;return r.asyncQueue.enqueueAndForget(async()=>function(o,u,c,h,d){const m=new Qs({next:w=>{m.su(),u.enqueueAndForget(()=>js(o,v));const C=w.docs.has(c);!C&&w.fromCache?d.reject(new k(V.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&w.fromCache&&h&&h.source==="server"?d.reject(new k(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(w)},error:w=>d.reject(w)}),v=new $s(cr(c.path),m,{includeMetadataChanges:!0,Ta:!0});return Bs(o,v)}(await ir(r),r.asyncQueue,t,e,n)),n.promise}function Vf(r,t,e={}){const n=new Ft;return r.asyncQueue.enqueueAndForget(async()=>function(o,u,c,h,d){const m=new Qs({next:w=>{m.su(),u.enqueueAndForget(()=>js(o,v)),w.fromCache&&h.source==="server"?d.reject(new k(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(w)},error:w=>d.reject(w)}),v=new $s(c,m,{includeMetadataChanges:!0,Ta:!0});return Bs(o,v)}(await ir(r),r.asyncQueue,t,e,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Au(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wu(r,t,e){if(!e)throw new k(V.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Pf(r,t,e,n){if(t===!0&&n===!0)throw new k(V.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Zo(r){if(!M.isDocumentKey(r))throw new k(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function ta(r){if(M.isDocumentKey(r))throw new k(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Tr(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":L()}function It(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new k(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Tr(r);throw new k(V.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}function Cf(r,t){if(t<=0)throw new k(V.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru="firestore.googleapis.com",ea=!0;class na{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new k(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ru,this.ssl=ea}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:ea;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=nu;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<rh)throw new k(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Pf("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Au((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new k(V.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new k(V.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new k(V.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Er{constructor(t,e,n,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new na({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new k(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new na(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Nl;switch(n.type){case"firstParty":return new Ol(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new k(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Jo.get(e);n&&(N("ComponentProvider","Removing Datastore"),Jo.delete(e),n.terminate())}(this),Promise.resolve()}}function Sf(r,t,e,n={}){var i;const o=(r=It(r,Er))._getSettings(),u=Object.assign(Object.assign({},o),{emulatorOptions:r._getEmulatorOptions()}),c=`${t}:${e}`;o.host!==Ru&&o.host!==c&&Ie("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},o),{host:c,ssl:!1,emulatorOptions:n});if(!Al(h,u)&&(r._setSettings(h),n.mockUserToken)){let d,m;if(typeof n.mockUserToken=="string")d=n.mockUserToken,m=pt.MOCK_USER;else{d=wl(n.mockUserToken,(i=r._app)===null||i===void 0?void 0:i.options.projectId);const v=n.mockUserToken.sub||n.mockUserToken.user_id;if(!v)throw new k(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new pt(v)}r._authCredentials=new xl(new ma(d,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new jt(this.firestore,t,this._query)}}class _t{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ht(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new _t(this.firestore,t,this._key)}}class Ht extends jt{constructor(t,e,n){super(t,e,cr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new _t(this.firestore,null,new M(t))}withConverter(t){return new Ht(this.firestore,t,this._path)}}function $f(r,t,...e){if(r=bt(r),wu("collection","path",t),r instanceof Er){const n=H.fromString(t,...e);return ta(n),new Ht(r,null,n)}{if(!(r instanceof _t||r instanceof Ht))throw new k(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(H.fromString(t,...e));return ta(n),new Ht(r.firestore,null,n)}}function Df(r,t,...e){if(r=bt(r),arguments.length===1&&(t=ga.newId()),wu("doc","path",t),r instanceof Er){const n=H.fromString(t,...e);return Zo(n),new _t(r,null,new M(n))}{if(!(r instanceof _t||r instanceof Ht))throw new k(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(H.fromString(t,...e));return Zo(n),new _t(r.firestore,r instanceof Ht?r.converter:null,new M(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="AsyncQueue";class sa{constructor(t=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new ou(this,"async_queue_retry"),this.Su=()=>{const n=es();n&&N(ra,"Visibility state changed to "+n.visibilityState),this.a_.t_()},this.bu=t;const e=es();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Du(),this.vu(t)}enterRestrictedMode(t){if(!this.mu){this.mu=!0,this.yu=t||!1;const e=es();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Su)}}enqueue(t){if(this.Du(),this.mu)return new Promise(()=>{});const e=new Ft;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Vu.push(t),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(t){if(!be(t))throw t;N(ra,"Operation failed with retryable error: "+t)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(t){const e=this.bu.then(()=>(this.pu=!0,t().catch(n=>{this.gu=n,this.pu=!1;const i=function(u){let c=u.message||"";return u.stack&&(c=u.stack.includes(u.message)?u.stack:u.message+`
`+u.stack),c}(n);throw Ut("INTERNAL UNHANDLED ERROR: ",i),n}).then(n=>(this.pu=!1,n))));return this.bu=e,e}enqueueAfterDelay(t,e,n){this.Du(),this.wu.indexOf(t)>-1&&(e=0);const i=Us.createAndSchedule(this,t,e,n,o=>this.Fu(o));return this.fu.push(i),i}Du(){this.gu&&L()}verifyOperationInProgress(){}async Mu(){let t;do t=this.bu,await t;while(t!==this.bu)}xu(t){for(const e of this.fu)if(e.timerId===t)return!0;return!1}Ou(t){return this.Mu().then(()=>{this.fu.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.fu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Mu()})}Nu(t){this.wu.push(t)}Fu(t){const e=this.fu.indexOf(t);this.fu.splice(e,1)}}function ia(r){return function(e,n){if(typeof e!="object"||e===null)return!1;const i=e;for(const o of n)if(o in i&&typeof i[o]=="function")return!0;return!1}(r,["next","error","complete"])}class Bt extends Er{constructor(t,e,n,i){super(t,e,n,i),this.type="firestore",this._queue=new sa,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new sa(t),this._firestoreClient=void 0,await t}}}function Gf(r,t){const e=typeof r=="object"?r:El(),n=typeof r=="string"?r:t||Xn,i=vl(e,"firestore").getImmediate({identifier:n});if(!i._initialized){const o=Il("firestore");o&&Sf(i,...o)}return i}function vr(r){if(r._terminated)throw new k(V.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||bf(r),r._firestoreClient}function bf(r){var t,e,n;const i=r._freezeSettings(),o=function(c,h,d,m){return new Jl(c,h,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Au(m.experimentalLongPollingOptions),m.useFetchStreams)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new If(r._authCredentials,r._appCheckCredentials,r._queue,o,r._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ce(lt.fromBase64String(t))}catch(e){throw new k(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ce(lt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new k(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ut(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new k(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new k(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return U(this._lat,t._lat)||U(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,i){if(n.length!==i.length)return!1;for(let o=0;o<n.length;++o)if(n[o]!==i[o])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kf=/^__.*__$/;class Nf{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new re(t,this.data,this.fieldMask,e,this.fieldTransforms):new mn(t,this.data,e,this.fieldTransforms)}}class Vu{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new re(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Pu(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}class Xs{constructor(t,e,n,i,o,u){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=i,o===void 0&&this.Bu(),this.fieldTransforms=o||[],this.fieldMask=u||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(t){return new Xs(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.ku({path:n,Qu:!1});return i.$u(t),i}Uu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.ku({path:n,Qu:!1});return i.Bu(),i}Ku(t){return this.ku({path:void 0,Qu:!0})}Wu(t){return or(t,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Bu(){if(this.path)for(let t=0;t<this.path.length;t++)this.$u(this.path.get(t))}$u(t){if(t.length===0)throw this.Wu("Document fields must not be empty");if(Pu(this.Lu)&&kf.test(t))throw this.Wu('Document fields cannot begin and end with "__"')}}class xf{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||gr(t)}ju(t,e,n,i=!1){return new Xs({Lu:t,methodName:e,zu:n,path:ut.emptyPath(),Qu:!1,Gu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function wr(r){const t=r._freezeSettings(),e=gr(r._databaseId);return new xf(r._databaseId,!!t.ignoreUndefinedProperties,e)}function Cu(r,t,e,n,i,o={}){const u=r.ju(o.merge||o.mergeFields?2:0,t,e,i);Js("Data must be an object, but it was:",u,n);const c=Su(n,u);let h,d;if(o.merge)h=new wt(u.fieldMask),d=u.fieldTransforms;else if(o.mergeFields){const m=[];for(const v of o.mergeFields){const w=Ts(t,v,e);if(!u.contains(w))throw new k(V.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);bu(m,w)||m.push(w)}h=new wt(m),d=u.fieldTransforms.filter(v=>h.covers(v.field))}else h=null,d=u.fieldTransforms;return new Nf(new vt(c),h,d)}class Rr extends Ar{_toFieldTransform(t){if(t.Lu!==2)throw t.Lu===1?t.Wu(`${this._methodName}() can only appear at the top level of your update data`):t.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Rr}}class Ys extends Ar{_toFieldTransform(t){return new wc(t.path,new hn)}isEqual(t){return t instanceof Ys}}function Mf(r,t,e,n){const i=r.ju(1,t,e);Js("Data must be an object, but it was:",i,n);const o=[],u=vt.empty();ne(n,(h,d)=>{const m=Zs(t,h,e);d=bt(d);const v=i.Uu(m);if(d instanceof Rr)o.push(m);else{const w=yn(d,v);w!=null&&(o.push(m),u.set(m,w))}});const c=new wt(o);return new Vu(u,c,i.fieldTransforms)}function Lf(r,t,e,n,i,o){const u=r.ju(1,t,e),c=[Ts(t,n,e)],h=[i];if(o.length%2!=0)throw new k(V.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<o.length;w+=2)c.push(Ts(t,o[w])),h.push(o[w+1]);const d=[],m=vt.empty();for(let w=c.length-1;w>=0;--w)if(!bu(d,c[w])){const C=c[w];let b=h[w];b=bt(b);const x=u.Uu(C);if(b instanceof Rr)d.push(C);else{const D=yn(b,x);D!=null&&(d.push(C),m.set(C,D))}}const v=new wt(d);return new Vu(m,v,u.fieldTransforms)}function Of(r,t,e,n=!1){return yn(e,r.ju(n?4:3,t))}function yn(r,t){if(Du(r=bt(r)))return Js("Unsupported field value:",t,r),Su(r,t);if(r instanceof Ar)return function(n,i){if(!Pu(i.Lu))throw i.Wu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Wu(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.Qu&&t.Lu!==4)throw t.Wu("Nested arrays are not supported");return function(n,i){const o=[];let u=0;for(const c of n){let h=yn(c,i.Ku(u));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),u++}return{arrayValue:{values:o}}}(r,t)}return function(n,i){if((n=bt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return vc(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=et.fromDate(n);return{timestampValue:er(i.serializer,o)}}if(n instanceof et){const o=new et(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:er(i.serializer,o)}}if(n instanceof Ws)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ce)return{bytesValue:Ha(i.serializer,n._byteString)};if(n instanceof _t){const o=i.databaseId,u=n.firestore._databaseId;if(!u.isEqual(o))throw i.Wu(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Ds(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Hs)return function(u,c){return{mapValue:{fields:{[wa]:{stringValue:Ra},[Yn]:{arrayValue:{values:u.toArray().map(d=>{if(typeof d!="number")throw c.Wu("VectorValues must only contain numeric values.");return Vs(c.serializer,d)})}}}}}}(n,i);throw i.Wu(`Unsupported field value: ${Tr(n)}`)}(r,t)}function Su(r,t){const e={};return ya(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ne(r,(n,i)=>{const o=yn(i,t.qu(n));o!=null&&(e[n]=o)}),{mapValue:{fields:e}}}function Du(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof et||r instanceof Ws||r instanceof Ce||r instanceof _t||r instanceof Ar||r instanceof Hs)}function Js(r,t,e){if(!Du(e)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(e)){const n=Tr(e);throw n==="an object"?t.Wu(r+" a custom object"):t.Wu(r+" "+n)}}function Ts(r,t,e){if((t=bt(t))instanceof Ir)return t._internalPath;if(typeof t=="string")return Zs(r,t);throw or("Field path arguments must be of type string or ",r,!1,void 0,e)}const Ff=new RegExp("[~\\*/\\[\\]]");function Zs(r,t,e){if(t.search(Ff)>=0)throw or(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new Ir(...t.split("."))._internalPath}catch{throw or(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function or(r,t,e,n,i){const o=n&&!n.isEmpty(),u=i!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||u)&&(h+=" (found",o&&(h+=` in field ${n}`),u&&(h+=` in document ${i}`),h+=")"),new k(V.INVALID_ARGUMENT,c+r+h)}function bu(r,t){return r.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(t,e,n,i,o){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new _t(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Uf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Vr("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Uf extends ku{data(){return super.data()}}function Vr(r,t){return typeof t=="string"?Zs(r,t):t instanceof Ir?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new k(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ti{}class ei extends ti{}function Kf(r,t,...e){let n=[];t instanceof ti&&n.push(t),n=n.concat(e),function(o){const u=o.filter(h=>h instanceof ni).length,c=o.filter(h=>h instanceof Pr).length;if(u>1||u>0&&c>0)throw new k(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const i of n)r=i._apply(r);return r}class Pr extends ei{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Pr(t,e,n)}_apply(t){const e=this._parse(t);return xu(t._query,e),new jt(t.firestore,t.converter,ls(t._query,e))}_parse(t){const e=wr(t.firestore);return function(o,u,c,h,d,m,v){let w;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new k(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){aa(v,m);const b=[];for(const x of v)b.push(oa(h,o,x));w={arrayValue:{values:b}}}else w=oa(h,o,v)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||aa(v,m),w=Of(c,u,v,m==="in"||m==="not-in");return tt.create(d,m,w)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function Qf(r,t,e){const n=t,i=Vr("where",r);return Pr._create(i,n,e)}class ni extends ti{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new ni(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:Pt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(i,o){let u=i;const c=o.getFlattenedFilters();for(const h of c)xu(u,h),u=ls(u,h)}(t._query,e),new jt(t.firestore,t.converter,ls(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ri extends ei{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new ri(t,e)}_apply(t){const e=function(i,o,u){if(i.startAt!==null)throw new k(V.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new k(V.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new cn(o,u)}(t._query,this._field,this._direction);return new jt(t.firestore,t.converter,function(i,o){const u=i.explicitOrderBy.concat([o]);return new ke(i.path,i.collectionGroup,u,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(t._query,e))}}function Wf(r,t="asc"){const e=t,n=Vr("orderBy",r);return ri._create(n,e)}class si extends ei{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new si(t,e,n)}_apply(t){return new jt(t.firestore,t.converter,Zn(t._query,this._limit,this._limitType))}}function Hf(r){return Cf("limit",r),si._create("limit",r,"F")}function oa(r,t,e){if(typeof(e=bt(e))=="string"){if(e==="")throw new k(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Na(t)&&e.indexOf("/")!==-1)throw new k(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(H.fromString(e));if(!M.isDocumentKey(n))throw new k(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return vo(r,new M(n))}if(e instanceof _t)return vo(r,e._key);throw new k(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Tr(e)}.`)}function aa(r,t){if(!Array.isArray(r)||r.length===0)throw new k(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function xu(r,t){const e=function(i,o){for(const u of i)for(const c of u.getFlattenedFilters())if(o.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new k(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new k(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class qf{convertValue(t,e="none"){switch(Zt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return J(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Jt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw L()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return ne(t,(i,o)=>{n[i]=this.convertValue(o,e)}),n}convertVectorValue(t){var e,n,i;const o=(i=(n=(e=t.fields)===null||e===void 0?void 0:e[Yn].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(u=>J(u.doubleValue));return new Hs(o)}convertGeoPoint(t){return new Ws(J(t.latitude),J(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=lr(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(an(t));default:return null}}convertTimestamp(t){const e=Yt(t);return new et(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=H.fromString(t);$(eu(n));const i=new un(n.get(1),n.get(3)),o=new M(n.popFirst(5));return i.isEqual(e)||Ut(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mu(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Lu extends ku{constructor(t,e,n,i,o,u){super(t,e,n,i,u),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Wn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Vr("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Wn extends Lu{data(t={}){return super.data(t)}}class Ou{constructor(t,e,n,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new tn(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new Wn(this._firestore,this._userDataWriter,n.key,n,new tn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new k(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let u=0;return i._snapshot.docChanges.map(c=>{const h=new Wn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new tn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:u++}})}{let u=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const h=new Wn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new tn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,m=-1;return c.type!==0&&(d=u.indexOf(c.doc.key),u=u.delete(c.doc.key)),c.type!==1&&(u=u.add(c.doc),m=u.indexOf(c.doc.key)),{type:Bf(c.type),doc:h,oldIndex:d,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Bf(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(r){r=It(r,_t);const t=It(r.firestore,Bt);return Rf(vr(t),r._key).then(e=>Fu(t,r,e))}class ii extends qf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ce(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new _t(this.firestore,null,e)}}function Yf(r){r=It(r,jt);const t=It(r.firestore,Bt),e=vr(t),n=new ii(t);return Nu(r._query),Vf(e,r._query).then(i=>new Ou(t,n,r,i))}function Jf(r,t,e){r=It(r,_t);const n=It(r.firestore,Bt),i=Mu(r.converter,t,e);return Cr(n,[Cu(wr(n),"setDoc",r._key,i,r.converter!==null,e).toMutation(r._key,Rt.none())])}function Zf(r,t,e,...n){r=It(r,_t);const i=It(r.firestore,Bt),o=wr(i);let u;return u=typeof(t=bt(t))=="string"||t instanceof Ir?Lf(o,"updateDoc",r._key,t,e,n):Mf(o,"updateDoc",r._key,t),Cr(i,[u.toMutation(r._key,Rt.exists(!0))])}function td(r){return Cr(It(r.firestore,Bt),[new Ps(r._key,Rt.none())])}function ed(r,t){const e=It(r.firestore,Bt),n=Df(r),i=Mu(r.converter,t);return Cr(e,[Cu(wr(r.firestore),"addDoc",n._key,i,r.converter!==null,{}).toMutation(n._key,Rt.exists(!1))]).then(()=>n)}function nd(r,...t){var e,n,i;r=bt(r);let o={includeMetadataChanges:!1,source:"default"},u=0;typeof t[u]!="object"||ia(t[u])||(o=t[u],u++);const c={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(ia(t[u])){const v=t[u];t[u]=(e=v.next)===null||e===void 0?void 0:e.bind(v),t[u+1]=(n=v.error)===null||n===void 0?void 0:n.bind(v),t[u+2]=(i=v.complete)===null||i===void 0?void 0:i.bind(v)}let h,d,m;if(r instanceof _t)d=It(r.firestore,Bt),m=cr(r._key.path),h={next:v=>{t[u]&&t[u](Fu(d,r,v))},error:t[u+1],complete:t[u+2]};else{const v=It(r,jt);d=It(v.firestore,Bt),m=v._query;const w=new ii(d);h={next:C=>{t[u]&&t[u](new Ou(d,w,v,C))},error:t[u+1],complete:t[u+2]},Nu(r._query)}return function(w,C,b,x){const D=new Qs(x),z=new $s(C,D,b);return w.asyncQueue.enqueueAndForget(async()=>Bs(await ir(w),z)),()=>{D.su(),w.asyncQueue.enqueueAndForget(async()=>js(await ir(w),z))}}(vr(d),m,c,h)}function Cr(r,t){return function(n,i){const o=new Ft;return n.asyncQueue.enqueueAndForget(async()=>df(await wf(n),i,o)),o.promise}(vr(r),t)}function Fu(r,t,e){const n=e.docs.get(t._key),i=new ii(r);return new Lu(r,i,t._key,n,new tn(e.hasPendingWrites,e.fromCache),t.converter)}function rd(){return new Ys("serverTimestamp")}(function(t,e=!0){(function(i){Se=i})(Pl),Cl(new Sl("firestore",(n,{instanceIdentifier:i,options:o})=>{const u=n.getProvider("app").getImmediate(),c=new Bt(new Ml(n.getProvider("auth-internal")),new Fl(u,n.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new k(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new un(d.options.projectId,m)}(u,i),u);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),oo(uo,lo,t),oo(uo,lo,"esm2017")})();export{qf as AbstractUserDataWriter,Ce as Bytes,Ht as CollectionReference,_t as DocumentReference,Lu as DocumentSnapshot,Ir as FieldPath,Ar as FieldValue,Bt as Firestore,k as FirestoreError,Ws as GeoPoint,jt as Query,ni as QueryCompositeFilterConstraint,ei as QueryConstraint,Wn as QueryDocumentSnapshot,Pr as QueryFieldFilterConstraint,si as QueryLimitConstraint,ri as QueryOrderByConstraint,Ou as QuerySnapshot,tn as SnapshotMetadata,et as Timestamp,Hs as VectorValue,ga as _AutoId,lt as _ByteString,un as _DatabaseId,M as _DocumentKey,Nl as _EmptyAuthCredentialsProvider,ut as _FieldPath,It as _cast,Ie as _logWarn,Pf as _validateIsNotUsedTogether,ed as addDoc,$f as collection,Sf as connectFirestoreEmulator,td as deleteDoc,Df as doc,vr as ensureFirestoreConfigured,Cr as executeWrite,Xf as getDoc,Yf as getDocs,Gf as getFirestore,Hf as limit,nd as onSnapshot,Wf as orderBy,Kf as query,rd as serverTimestamp,Jf as setDoc,Zf as updateDoc,Qf as where};
//# sourceMappingURL=firebase-firestore-CCnivBKz.js.map

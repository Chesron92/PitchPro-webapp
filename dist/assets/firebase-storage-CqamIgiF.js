import{g as _e,h as v,_ as ge,a as me,c as Re,f as be,F as we,e as Te,C as ye,r as z,S as ke}from"./firebase-app-CzzSlWfx.js";/**
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
 */const Z="firebasestorage.googleapis.com",J="storageBucket",Ae=2*60*1e3,Ee=10*60*1e3;/**
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
 */class h extends we{constructor(t,n,s=0){super(B(t),`Firebase Storage: ${n} (${B(t)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,h.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return B(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var l;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(l||(l={}));function B(e){return"storage/"+e}function H(){const e="An unknown error occurred, please check the error payload for server response.";return new h(l.UNKNOWN,e)}function Ue(e){return new h(l.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function Oe(e){return new h(l.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Ie(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new h(l.UNAUTHENTICATED,e)}function Ne(){return new h(l.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Pe(e){return new h(l.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function Ce(){return new h(l.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function De(){return new h(l.CANCELED,"User canceled the upload/download.")}function xe(e){return new h(l.INVALID_URL,"Invalid URL '"+e+"'.")}function ve(e){return new h(l.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function Le(){return new h(l.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+J+"' property when initializing the app?")}function Se(){return new h(l.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Be(){return new h(l.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Fe(e){return new h(l.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function M(e){return new h(l.INVALID_ARGUMENT,e)}function Q(){return new h(l.APP_DELETED,"The Firebase app was deleted.")}function Me(e){return new h(l.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function P(e,t){return new h(l.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function N(e){throw new h(l.INTERNAL_ERROR,"Internal error: "+e)}/**
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
 */class _{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let s;try{s=_.makeFromUrl(t,n)}catch{return new _(t,"")}if(s.path==="")return s;throw ve(t)}static makeFromUrl(t,n){let s=null;const r="([A-Za-z0-9.\\-_]+)";function o(p){p.path.charAt(p.path.length-1)==="/"&&(p.path_=p.path_.slice(0,-1))}const i="(/(.*))?$",a=new RegExp("^gs://"+r+i,"i"),u={bucket:1,path:3};function c(p){p.path_=decodeURIComponent(p.path)}const g="v[A-Za-z0-9_]+",R=n.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",b=new RegExp(`^https?://${R}/${g}/b/${r}/o${m}`,"i"),w={bucket:1,path:3},O=n===Z?"(?:storage.googleapis.com|storage.cloud.google.com)":n,f="([^?#]*)",I=new RegExp(`^https?://${O}/${r}/${f}`,"i"),T=[{regex:a,indices:u,postModify:o},{regex:b,indices:w,postModify:c},{regex:I,indices:{bucket:1,path:2},postModify:c}];for(let p=0;p<T.length;p++){const C=T[p],L=C.regex.exec(t);if(L){const pe=L[C.indices.bucket];let S=L[C.indices.path];S||(S=""),s=new _(pe,S),C.postModify(s);break}}if(s==null)throw xe(t);return s}}class He{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
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
 */function $e(e,t,n){let s=1,r=null,o=null,i=!1,a=0;function u(){return a===2}let c=!1;function g(...f){c||(c=!0,t.apply(null,f))}function R(f){r=setTimeout(()=>{r=null,e(b,u())},f)}function m(){o&&clearTimeout(o)}function b(f,...I){if(c){m();return}if(f){m(),g.call(null,f,...I);return}if(u()||i){m(),g.call(null,f,...I);return}s<64&&(s*=2);let T;a===1?(a=2,T=0):T=(s+Math.random())*1e3,R(T)}let w=!1;function O(f){w||(w=!0,m(),!c&&(r!==null?(f||(a=2),clearTimeout(r),R(0)):f||(a=1)))}return R(0),o=setTimeout(()=>{i=!0,O(!0)},n),O}function je(e){e(!1)}/**
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
 */function Ve(e){return e!==void 0}function qe(e){return typeof e=="object"&&!Array.isArray(e)}function $(e){return typeof e=="string"||e instanceof String}function W(e){return j()&&e instanceof Blob}function j(){return typeof Blob<"u"}function X(e,t,n,s){if(s<t)throw M(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw M(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
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
 */function V(e,t,n){let s=t;return n==null&&(s=`https://${t}`),`${n}://${s}/v0${e}`}function ee(e){const t=encodeURIComponent;let n="?";for(const s in e)if(e.hasOwnProperty(s)){const r=t(s)+"="+t(e[s]);n=n+r+"&"}return n=n.slice(0,-1),n}var E;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(E||(E={}));/**
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
 */function ze(e,t){const n=e>=500&&e<600,r=[408,429].indexOf(e)!==-1,o=t.indexOf(e)!==-1;return n||r||o}/**
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
 */class We{constructor(t,n,s,r,o,i,a,u,c,g,R,m=!0){this.url_=t,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=o,this.additionalRetryCodes_=i,this.callback_=a,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=g,this.connectionFactory_=R,this.retry=m,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,w)=>{this.resolve_=b,this.reject_=w,this.start_()})}start_(){const t=(s,r)=>{if(r){s(!1,new D(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const i=a=>{const u=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&o.addUploadProgressListener(i),o.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(i),this.pendingConnection_=null;const a=o.getErrorCode()===E.NO_ERROR,u=o.getStatus();if(!a||ze(u,this.additionalRetryCodes_)&&this.retry){const g=o.getErrorCode()===E.ABORT;s(!1,new D(!1,null,g));return}const c=this.successCodes_.indexOf(u)!==-1;s(!0,new D(c,o))})},n=(s,r)=>{const o=this.resolve_,i=this.reject_,a=r.connection;if(r.wasSuccessCode)try{const u=this.callback_(a,a.getResponse());Ve(u)?o(u):o()}catch(u){i(u)}else if(a!==null){const u=H();u.serverResponse=a.getErrorText(),this.errorCallback_?i(this.errorCallback_(a,u)):i(u)}else if(r.canceled){const u=this.appDelete_?Q():De();i(u)}else{const u=Ce();i(u)}};this.canceled_?n(!1,new D(!1,null,!0)):this.backoffId_=$e(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&je(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class D{constructor(t,n,s){this.wasSuccessCode=t,this.connection=n,this.canceled=!!s}}function Xe(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function Ke(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Ge(e,t){t&&(e["X-Firebase-GMPID"]=t)}function Ye(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function Ze(e,t,n,s,r,o,i=!0){const a=ee(e.urlParams),u=e.url+a,c=Object.assign({},e.headers);return Ge(c,t),Xe(c,n),Ke(c,o),Ye(c,s),new We(u,e.method,c,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r,i)}/**
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
 */function Je(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Qe(...e){const t=Je();if(t!==void 0){const n=new t;for(let s=0;s<e.length;s++)n.append(e[s]);return n.getBlob()}else{if(j())return new Blob(e);throw new h(l.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function et(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
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
 */function tt(e){if(typeof atob>"u")throw Fe("base-64");return atob(e)}/**
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
 */const y={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class F{constructor(t,n){this.data=t,this.contentType=n||null}}function nt(e,t){switch(e){case y.RAW:return new F(te(t));case y.BASE64:case y.BASE64URL:return new F(ne(e,t));case y.DATA_URL:return new F(rt(t),ot(t))}throw H()}function te(e){const t=[];for(let n=0;n<e.length;n++){let s=e.charCodeAt(n);if(s<=127)t.push(s);else if(s<=2047)t.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const o=s,i=e.charCodeAt(++n);s=65536|(o&1023)<<10|i&1023,t.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?t.push(239,191,189):t.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(t)}function st(e){let t;try{t=decodeURIComponent(e)}catch{throw P(y.DATA_URL,"Malformed data URL.")}return te(t)}function ne(e,t){switch(e){case y.BASE64:{const r=t.indexOf("-")!==-1,o=t.indexOf("_")!==-1;if(r||o)throw P(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case y.BASE64URL:{const r=t.indexOf("+")!==-1,o=t.indexOf("/")!==-1;if(r||o)throw P(e,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=tt(t)}catch(r){throw r.message.includes("polyfill")?r:P(e,"Invalid character found")}const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}class se{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw P(y.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=n[1]||null;s!=null&&(this.base64=it(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=t.substring(t.indexOf(",")+1)}}function rt(e){const t=new se(e);return t.base64?ne(y.BASE64,t.rest):st(t.rest)}function ot(e){return new se(e).contentType}function it(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
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
 */class k{constructor(t,n){let s=0,r="";W(t)?(this.data_=t,s=t.size,r=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),s=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),s=t.length),this.size_=s,this.type_=r}size(){return this.size_}type(){return this.type_}slice(t,n){if(W(this.data_)){const s=this.data_,r=et(s,t,n);return r===null?null:new k(r)}else{const s=new Uint8Array(this.data_.buffer,t,n-t);return new k(s,!0)}}static getBlob(...t){if(j()){const n=t.map(s=>s instanceof k?s.data_:s);return new k(Qe.apply(null,n))}else{const n=t.map(i=>$(i)?nt(y.RAW,i).data:i.data_);let s=0;n.forEach(i=>{s+=i.byteLength});const r=new Uint8Array(s);let o=0;return n.forEach(i=>{for(let a=0;a<i.length;a++)r[o++]=i[a]}),new k(r,!0)}}uploadData(){return this.data_}}/**
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
 */function re(e){let t;try{t=JSON.parse(e)}catch{return null}return qe(t)?t:null}/**
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
 */function at(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function ut(e,t){const n=t.split("/").filter(s=>s.length>0).join("/");return e.length===0?n:e+"/"+n}function oe(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
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
 */function ct(e,t){return t}class d{constructor(t,n,s,r){this.server=t,this.local=n||t,this.writable=!!s,this.xform=r||ct}}let x=null;function lt(e){return!$(e)||e.length<2?e:oe(e)}function ie(){if(x)return x;const e=[];e.push(new d("bucket")),e.push(new d("generation")),e.push(new d("metageneration")),e.push(new d("name","fullPath",!0));function t(o,i){return lt(i)}const n=new d("name");n.xform=t,e.push(n);function s(o,i){return i!==void 0?Number(i):i}const r=new d("size");return r.xform=s,e.push(r),e.push(new d("timeCreated")),e.push(new d("updated")),e.push(new d("md5Hash",null,!0)),e.push(new d("cacheControl",null,!0)),e.push(new d("contentDisposition",null,!0)),e.push(new d("contentEncoding",null,!0)),e.push(new d("contentLanguage",null,!0)),e.push(new d("contentType",null,!0)),e.push(new d("metadata","customMetadata",!0)),x=e,x}function ht(e,t){function n(){const s=e.bucket,r=e.fullPath,o=new _(s,r);return t._makeStorageReference(o)}Object.defineProperty(e,"ref",{get:n})}function dt(e,t,n){const s={};s.type="file";const r=n.length;for(let o=0;o<r;o++){const i=n[o];s[i.local]=i.xform(s,t[i.server])}return ht(s,e),s}function ae(e,t,n){const s=re(t);return s===null?null:dt(e,s,n)}function ft(e,t,n,s){const r=re(t);if(r===null||!$(r.downloadTokens))return null;const o=r.downloadTokens;if(o.length===0)return null;const i=encodeURIComponent;return o.split(",").map(c=>{const g=e.bucket,R=e.fullPath,m="/b/"+i(g)+"/o/"+i(R),b=V(m,n,s),w=ee({alt:"media",token:c});return b+w})[0]}function pt(e,t){const n={},s=t.length;for(let r=0;r<s;r++){const o=t[r];o.writable&&(n[o.server]=e[o.local])}return JSON.stringify(n)}class ue{constructor(t,n,s,r){this.url=t,this.method=n,this.handler=s,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function ce(e){if(!e)throw H()}function _t(e,t){function n(s,r){const o=ae(e,r,t);return ce(o!==null),o}return n}function gt(e,t){function n(s,r){const o=ae(e,r,t);return ce(o!==null),ft(o,r,e.host,e._protocol)}return n}function le(e){function t(n,s){let r;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?r=Ne():r=Ie():n.getStatus()===402?r=Oe(e.bucket):n.getStatus()===403?r=Pe(e.path):r=s,r.status=n.getStatus(),r.serverResponse=s.serverResponse,r}return t}function mt(e){const t=le(e);function n(s,r){let o=t(s,r);return s.getStatus()===404&&(o=Ue(e.path)),o.serverResponse=r.serverResponse,o}return n}function Rt(e,t,n){const s=t.fullServerUrl(),r=V(s,e.host,e._protocol),o="GET",i=e.maxOperationRetryTime,a=new ue(r,o,gt(e,n),i);return a.errorHandler=mt(t),a}function bt(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function wt(e,t,n){const s=Object.assign({},n);return s.fullPath=e.path,s.size=t.size(),s.contentType||(s.contentType=bt(null,t)),s}function Tt(e,t,n,s,r){const o=t.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"};function a(){let T="";for(let p=0;p<2;p++)T=T+Math.random().toString().slice(2);return T}const u=a();i["Content-Type"]="multipart/related; boundary="+u;const c=wt(t,s,r),g=pt(c,n),R="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+g+`\r
--`+u+`\r
Content-Type: `+c.contentType+`\r
\r
`,m=`\r
--`+u+"--",b=k.getBlob(R,s,m);if(b===null)throw Se();const w={name:c.fullPath},O=V(o,e.host,e._protocol),f="POST",I=e.maxUploadRetryTime,A=new ue(O,f,_t(e,n),I);return A.urlParams=w,A.headers=i,A.body=b.uploadData(),A.errorHandler=le(t),A}class yt{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=E.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=E.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=E.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,s,r){if(this.sent_)throw N("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,t,!0),r!==void 0)for(const o in r)r.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,r[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw N("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw N("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw N("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw N("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class kt extends yt{initXhr(){this.xhr_.responseType="text"}}function he(){return new kt}/**
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
 */class U{constructor(t,n){this._service=t,n instanceof _?this._location=n:this._location=_.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new U(t,n)}get root(){const t=new _(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return oe(this._location.path)}get storage(){return this._service}get parent(){const t=at(this._location.path);if(t===null)return null;const n=new _(this._location.bucket,t);return new U(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw Me(t)}}function At(e,t,n){e._throwIfRoot("uploadBytes");const s=Tt(e.storage,e._location,ie(),new k(t,!0),n);return e.storage.makeRequestWithTokens(s,he).then(r=>({metadata:r,ref:e}))}function Et(e){e._throwIfRoot("getDownloadURL");const t=Rt(e.storage,e._location,ie());return e.storage.makeRequestWithTokens(t,he).then(n=>{if(n===null)throw Be();return n})}function Ut(e,t){const n=ut(e._location.path,t),s=new _(e._location.bucket,n);return new U(e.storage,s)}/**
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
 */function Ot(e){return/^[A-Za-z]+:\/\//.test(e)}function It(e,t){return new U(e,t)}function de(e,t){if(e instanceof q){const n=e;if(n._bucket==null)throw Le();const s=new U(n,n._bucket);return t!=null?de(s,t):s}else return t!==void 0?Ut(e,t):e}function Nt(e,t){if(t&&Ot(t)){if(e instanceof q)return It(e,t);throw M("To use ref(service, url), the first argument must be a Storage instance.")}else return de(e,t)}function K(e,t){const n=t==null?void 0:t[J];return n==null?null:_.makeFromBucketSpec(n,e)}function Pt(e,t,n,s={}){e.host=`${t}:${n}`,e._protocol="http";const{mockUserToken:r}=s;r&&(e._overrideAuthToken=typeof r=="string"?r:Re(r,e.app.options.projectId))}class q{constructor(t,n,s,r,o){this.app=t,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=o,this._bucket=null,this._host=Z,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ae,this._maxUploadRetryTime=Ee,this._requests=new Set,r!=null?this._bucket=_.makeFromBucketSpec(r,this._host):this._bucket=K(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=_.makeFromBucketSpec(this._url,t):this._bucket=K(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){X("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){X("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(be(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new U(this,t)}_makeRequest(t,n,s,r,o=!0){if(this._deleted)return new He(Q());{const i=Ze(t,this._appId,s,r,n,this._firebaseVersion,o);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(t,n){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,s,r).getPromise()}}const G="@firebase/storage",Y="0.13.7";/**
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
 */const fe="storage";function Lt(e,t,n){return e=v(e),At(e,t,n)}function St(e){return e=v(e),Et(e)}function Bt(e,t){return e=v(e),Nt(e,t)}function Ft(e=_e(),t){e=v(e);const s=ge(e,fe).getImmediate({identifier:t}),r=me("storage");return r&&Ct(s,...r),s}function Ct(e,t,n,s={}){Pt(e,t,n,s)}function Dt(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return new q(n,s,r,t,ke)}function xt(){Te(new ye(fe,Dt,"PUBLIC").setMultipleInstances(!0)),z(G,Y,""),z(G,Y,"esm2017")}xt();export{h as StorageError,l as StorageErrorCode,y as StringFormat,k as _FbsBlob,_ as _Location,nt as _dataFromString,M as _invalidArgument,Me as _invalidRootOperation,Ct as connectStorageEmulator,St as getDownloadURL,Ft as getStorage,Bt as ref,Lt as uploadBytes};
//# sourceMappingURL=firebase-storage-CqamIgiF.js.map

(this["webpackJsonpdalgona-meme"]=this["webpackJsonpdalgona-meme"]||[]).push([[0],{105:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(22),c=n.n(i),o=(n(95),n(10)),s=(n(96),n(156)),l=n(157),u=n(19),d=n.n(u),h=n(30),b=n(31),f=n(34),j=n(164),g=n(73),p=n.n(g),x=n(150),v=n(158),m=n(154),O=n(159),y=n(160),w=n(152),I=n(153),k=n(44),P=Object(k.b)({name:"dalgona-state",initialState:{scale:1,isLoading:!1,download:!1},reducers:{changeDalgonaState:function(e,t){return t.payload}}}),M=P.actions.changeDalgonaState,C=P.reducer,L=n(161),S=n(162),D=n(75),R=n.n(D),E=n(74),z=n.n(E),T=n(163),F=function(e){var t=e.action,n=e.category,a=e.label,r=e.value;window.gtag("event",t,{event_category:n,event_label:a,value:r})},B=n(2),G=function(e){var t,n=e.onClickGenerate,a=r.a.useState(),i=Object(o.a)(a,2),c=i[0],l=i[1],u=r.a.useState(1),g=Object(o.a)(u,2),k=g[0],P=g[1],C=r.a.useState(""),D=Object(o.a)(C,2),E=D[0],G=D[1],A=r.a.useState(""),U=Object(o.a)(A,2),N=U[0],X=U[1],Y=Object(f.c)((function(e){return e.dalgonaState})),_=Object(f.b)();r.a.useEffect((function(){if("number"===typeof k){var e=Object(b.a)({},Y);e.scale=k,_(M(e))}}),[k]),r.a.useEffect((function(){var e,t;Y.lt!==E&&G(null!==(e=null===Y||void 0===Y||null===(t=Y.lt)||void 0===t?void 0:t.toFixed(2))&&void 0!==e?e:"")}),[Y.lt]),r.a.useEffect((function(){var e,t;Y.ut!==N&&X(null!==(e=null===Y||void 0===Y||null===(t=Y.ut)||void 0===t?void 0:t.toFixed(2))&&void 0!==e?e:"")}),[Y.ut]),r.a.useEffect((function(){console.log("dalgonaState.isLoading: ".concat(Y.isLoading))}),[Y.isLoading]);var J=function(){var e=Object(h.a)(d.a.mark((function e(){var t,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==c){e.next=3;break}return alert("\uc0ac\uc6a9\ud560 \uc774\ubbf8\uc9c0\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694."),e.abrupt("return");case 3:return t=Date.now(),e.next=6,c.arrayBuffer();case 6:a=e.sent,n(a),r=Date.now()-t,F({action:"generate",category:"click",label:JSON.stringify({elapsed:r}),value:0});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(e){return function(t,n){"number"===typeof n?e(n):console.error("invalid type of newValue (type: ".concat(typeof n,")"))}},q=function(e){return function(t){e(""===t.target.value?"":Number(t.target.value))}},H=function(e){G(e);var t=Object(b.a)({},Y);t.lt="number"===typeof e?e:void 0,_(M(t))},V=function(e){X(e);var t=Object(b.a)({},Y);t.ut="number"===typeof e?e:void 0,_(M(t))};return Object(B.jsxs)("form",{children:[Object(B.jsx)("input",{type:"file",id:"input-photo",accept:"image/*",onChange:function(e){if(console.log(e.target.value),console.log(e.currentTarget.files),e.currentTarget.files&&e.currentTarget.files.length>0){var t=e.currentTarget.files[0];l(t)}},disabled:Y.isLoading}),Object(B.jsx)(x.a,{title:"Select image",children:Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)("label",{htmlFor:"input-photo",children:Object(B.jsx)(v.a,{color:"primary","aria-label":"upload picture",component:"span",disabled:Y.isLoading,children:Object(B.jsx)(p.a,{fontSize:"large"})})}),Object(B.jsx)(O.a,{children:Object(B.jsxs)(s.a,{container:!0,spacing:2,alignItems:"center",children:[Object(B.jsx)(s.a,{item:!0,xs:6,children:Object(B.jsx)(y.a,{id:"lt-slider",gutterBottom:!0,children:"Lower Threshold (0-1)"})}),Object(B.jsx)(s.a,{item:!0,xs:6,children:Object(B.jsx)(L.a,{children:Object(B.jsx)(S.a,{control:Object(B.jsx)(I.a,{disabled:Y.isLoading,checked:void 0===Y.lt,onChange:function(e){var t=e.target.checked;H(t?"":.01)}}),label:"auto"})})})]})}),Object(B.jsx)(O.a,{children:Object(B.jsxs)(s.a,{container:!0,spacing:2,alignItems:"center",children:[Object(B.jsx)(s.a,{item:!0,xs:10,children:Object(B.jsx)(m.a,{track:!1,"aria-labelledby":"lt-slider",valueLabelDisplay:"auto",value:void 0===Y.lt?0:Y.lt,onChange:W(H),step:.01,min:0,max:1,disabled:Y.isLoading})}),Object(B.jsx)(s.a,{item:!0,xs:!0,children:Object(B.jsx)(w.a,{value:E,size:"small",inputProps:{min:0,max:1,step:.01,type:"number","aria-labelledby":"lt-slider"},onChange:q(H),disabled:Y.isLoading})})]})}),Object(B.jsx)(O.a,{children:Object(B.jsxs)(s.a,{container:!0,spacing:2,alignItems:"center",children:[Object(B.jsx)(s.a,{item:!0,xs:6,children:Object(B.jsx)(y.a,{id:"ut-slider",gutterBottom:!0,children:"Upper Threshold (0-1)"})}),Object(B.jsx)(s.a,{item:!0,xs:6,children:Object(B.jsx)(L.a,{children:Object(B.jsx)(S.a,{control:Object(B.jsx)(I.a,{disabled:Y.isLoading,checked:void 0===Y.ut,onChange:function(e){var t=e.target.checked;V(t?"":.5)}}),label:"auto"})})})]})}),Object(B.jsx)(O.a,{children:Object(B.jsxs)(s.a,{container:!0,spacing:2,alignItems:"center",children:[Object(B.jsx)(s.a,{item:!0,xs:10,children:Object(B.jsx)(m.a,{track:!1,"aria-labelledby":"ut-slider",valueLabelDisplay:"auto",value:null!==(t=null===Y||void 0===Y?void 0:Y.ut)&&void 0!==t?t:0,onChange:W(V),step:.01,min:0,max:1,disabled:Y.isLoading})}),Object(B.jsx)(s.a,{item:!0,xs:!0,children:Object(B.jsx)(w.a,{value:N,size:"small",inputProps:{min:0,max:1,step:.01,type:"number","aria-labelledby":"ut-slider"},onChange:q(V),disabled:Y.isLoading})})]})}),Object(B.jsxs)(O.a,{children:[Object(B.jsx)(y.a,{id:"scale-slider",gutterBottom:!0,children:"Image scale"}),Object(B.jsxs)(s.a,{container:!0,spacing:2,alignItems:"center",children:[Object(B.jsx)(s.a,{item:!0,xs:10,children:Object(B.jsx)(m.a,{track:!1,"aria-labelledby":"scale-slider",valueLabelDisplay:"auto",value:"number"===typeof k?k:1,onChange:W(P),step:.1,min:.1,max:2,disabled:Y.isLoading})}),Object(B.jsx)(s.a,{item:!0,xs:!0,children:Object(B.jsx)(w.a,{value:k,size:"small",inputProps:{min:.1,max:2,step:.1,type:"number","aria-labelledby":"scale-slider"},onChange:q(P),disabled:Y.isLoading})})]})]}),Object(B.jsx)(O.a,{style:{marginTop:"18px"},children:Object(B.jsx)(s.a,{container:!0,spacing:2,alignItems:"center",children:Y.isLoading?Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(s.a,{item:!0,xs:5}),Object(B.jsx)(s.a,{item:!0,xs:2,children:Object(B.jsx)(T.a,{})}),Object(B.jsx)(s.a,{item:!0,xs:5})]}):Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(s.a,{item:!0,xs:6,children:Object(B.jsx)(j.a,{variant:"outlined",onClick:J,startIcon:Object(B.jsx)(z.a,{}),children:"Generate"})}),Object(B.jsx)(s.a,{item:!0,xs:6,children:Object(B.jsx)(j.a,{variant:"outlined",onClick:function(){var e=Object(b.a)({},Y);e.download=!0,_(M(e)),F({action:"download",category:"click",label:"",value:0})},startIcon:Object(B.jsx)(R.a,{}),children:"Download"})})]})})})]})})]})},A=[[.0121,.0261,.0337,.0261,.0121],[.0261,.0561,.0724,.0561,.0261],[.0337,.0724,.0935,.0724,.0337],[.0261,.0561,.0724,.0561,.0261],[.0121,.0261,.0337,.0261,.0121]],U=[[1,0,-1],[2,0,-2],[1,0,-1]],N=[[-1,-2,-1],[0,0,0],[1,2,1]];function X(e,t){var n=Array.prototype.slice.call(arguments,0);return"undefined"===typeof t&&(n[1]=e.length),t===n.length-2?e.apply(void 0,n.slice(2)):function(){return X.apply(void 0,n.concat(Array.prototype.slice.call(arguments,0)))}}X((function(e,t){var n;return null===(n=e.getContext("2d"))||void 0===n||n.drawImage(t,0,0),t}));X((function(e,t){var n;return t.naturalWidth,t.naturalHeight,e.style.width="",null===(n=e.getContext("2d"))||void 0===n||n.clearRect(0,0,t.width,t.height),e.height=t.height,e.width=t.width,t}));X((function(e,t,n,a){var r;null===(r=n.getContext("2d"))||void 0===r||r.putImageData(new ImageData(new Uint8ClampedArray(a),e,t),0,0)}));var Y=X((function(e,t,n,a,r){console.time("toConvolution");for(var i,c,o,s=[],l=0;l<e;l++)for(var u=0;u<t;u++){i=0;for(var d=l-a;d<l+a+1;d++)for(var h=u-a;h<u+a+1;h++)c=d-(l-a),o=h-(u-a),i+=r[(h+t)%t*e+(d+e)%e]*n[c][o];s[u*e+l]=i}return console.time("toConvolution"),s}));function _(e){console.time("toDenormalized");var t=e.map((function(e){return 255*e}));return console.timeEnd("toDenormalized"),t}function J(e){return e.reduce((function(e,t){return t>e?t:e}),-1)}function W(e){var t=e.reduce((function(e,t){return t+e}),0)/e.filter((function(e){return 0!==e})).length;return{ut:t,lt:.4*t}}function q(e){console.time("toPixels");var t=[];return e.forEach((function(e){t.push(e),t.push(e),t.push(e),t.push(255)})),console.timeEnd("toPixels"),t}function H(e,t,n,a,r,i){var c=Y(t,n),o=q(function(e,t,n){console.time("toGrayscale");for(var a=[],r=0;r<e.length;r+=4){var i=.299*e[r+2]+.587*e[r+1]+.114*e[r];a.push(i)}return console.timeEnd("toGrayscale"),a}(e));i({type:"grayscale",data:o});var s=function(e){console.time("toNormalized");for(var t=[],n=0;n<e.length;n+=4)t.push(e[n]/255);return console.timeEnd("toNormalized"),t}(o);i({type:"normalized"});var l=c(A,2,s);i({type:"blurred",data:q(_(l))});var u=c(U,1,l);i({type:"xAxis",data:q(_(u))});var d=c(N,1,l);i({type:"yAxis",data:q(_(d))}),a&&(a>1&&(a=1),a<0&&(a=0)),r&&(r>1&&(r=1),r<0&&(r=0));var h=function(e,t,n,a){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;console.time("toGradientMagnitude");for(var c,o,s=[],l=[],u=0;u<a;u++)for(var d=0;d<n;d++)s[c=u*n+d]=Math.sqrt(e[c]*e[c]+t[c]*t[c]),(o=Math.atan2(e[c],t[c]))>=-Math.PI/8&&o<Math.PI/8||o<=-7*Math.PI/8&&o>7*Math.PI/8?l[c]=0:o>=Math.PI/8&&o<3*Math.PI/8||o<=-5*Math.PI/8&&o>-7*Math.PI/8?l[c]=Math.PI/4:o>=3*Math.PI/8&&o<=5*Math.PI/8||-3*Math.PI/8>=o&&o>-5*Math.PI/8?l[c]=Math.PI/2:(o<-Math.PI/8&&o>=-3*Math.PI/8||o>5*Math.PI/8&&o<=7*Math.PI/8)&&(l[c]=-Math.PI/4);var h=J(s),b=s.map((function(e){return e/h}));if(!i&&!r){var f=W(b);i=f.ut,r=f.lt}for(var j=b.map((function(e){return e<r?0:e})),g=1;g<a-1;g++)for(var p=1;p<n-1;p++)(0==l[c=g*n+p]&&(j[c]<=j[g*n+p-1]||j[c]<=j[g*n+p+1])||l[c]==Math.PI/2&&(j[c]<=j[(g-1)*n+p]||j[(g+1)*n+p]>=j[c])||l[c]==Math.PI/4&&(j[c]<=j[(g+1)*n+p-1]||j[c]<=j[(g-1)*n+p+1])||l[c]==-Math.PI/4&&(j[c]<=j[(g-1)*n+p-1]||j[c]<=j[(g+1)*n+p+1]))&&(j[c]=0);for(var x=2;x<a-2;x++)for(var v=2;v<n-2;v++)0==l[x*n+v]&&(j[x*n+v-2]>j[x*n+v]||j[x*n+v+2]>j[x*n+v])&&(j[x*n+v]=0),l[x*n+v]==Math.PI/2&&(j[(x-2)*n+v]>j[x*n+v]||j[(x+2)*n+v]>j[x*n+v])&&(j[x*n+v]=0),l[x*n+v]==Math.PI/4&&(j[(x+2)*n+v-2]>j[x*n+v]||j[(x-2)*n+v+2]>j[x*n+v])&&(j[x*n+v]=0),l[x*n+v]==-Math.PI/4&&(j[(x+2)*n+v+2]>j[x*n+v]||j[(x-2)*n+v-2]>j[x*n+v])&&(j[x*n+v]=0);for(var m=j.map((function(e){return e>i?1:e})),O=0,y=!0,w=[];y;){O+=1;for(var I=1;I<a-1;I++)for(var k=1;k<n-1;k++)if(m[I*n+k]<=i&&m[I*n+k]>=r){var P=m[(I-1)*n+k-1],M=m[(I-1)*n+k],C=m[(I-1)*n+k+1],L=m[I*n+k-1],S=m[I*n+k+1],D=m[(I+1)*n+k-1],R=m[(I+1)*n+k],E=m[(I+1)*n+k+1];1!==P&&1!==M&&1!==C&&1!==L&&1!==S&&1!==D&&1!==R&&1!==E||(m[I*n+k]=1,1)}y=O<=2,w=m.map((function(e){return e<=i?0:e}))}return console.timeEnd("toGradientMagnitude"),{data:w,threshold:{ut:i,lt:r}}}(u,d,t,n,a,r);i({type:"gradientMagnitude",data:q(_(h.data)),threshold:h.threshold})}var V=n.p+"static/media/background.d52b6394.png",K=n.p+"static/media/mask.5c3c32d3.png",Q=function(e){return"data:image/png;base64,".concat(function(e){var t=new Uint8Array(e);return btoa(t.reduce((function(e,t){return e+String.fromCharCode(t)}),""))}(e))},Z=function(e){var t=e.imgBuf,n=1543,a=770,i=82,c=48,s=12,l=r.a.useRef(null),u=r.a.useRef(null),j=r.a.useRef(null),g=r.a.useRef(null),p=r.a.useRef(null),x=r.a.useRef(null),v=r.a.useRef(null),m=r.a.useState(!1),O=Object(o.a)(m,2),y=O[0],w=O[1],I=r.a.useState({x:0,y:0}),k=Object(o.a)(I,2),P=k[0],C=k[1],L=r.a.useState({x:818,y:376}),S=Object(o.a)(L,2),D=S[0],R=S[1],E=Object(f.c)((function(e){return e.dalgonaState})),z=Object(f.b)();r.a.useEffect((function(){if(E.download){A();var e=Object(b.a)({},E);e.download=!1,z(M(e))}}),[E.download]),r.a.useEffect((function(){G(D.x,D.y).then()}),[E.scale]);var T=function(){var e=Object(h.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var a=new Image;a.src=t,a.crossOrigin="Anonymous",a.onload=function(){console.timeEnd("loadImage"),e(a)}})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=function(){var e=Object(h.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"!==typeof l){e.next=3;break}return console.time("canvasBackgroundRef is undefined"),e.abrupt("return");case 3:if(null!==(t=l.current)){e.next=7;break}return console.log("canvasBackgroundRef.current is null"),e.abrupt("return");case 7:if(null!==(n=t.getContext("2d"))){e.next=10;break}return e.abrupt("return");case 10:return e.t0=n,e.next=13,T(V);case 13:e.t1=e.sent,e.t0.drawImage.call(e.t0,e.t1,0,0),n.save();case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=Object(h.a)(d.a.mark((function e(t,n){var a,r,i,c,o,s,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"!==typeof u&&null!==u){e.next=3;break}return console.time("canvasPictureRef is undefined or null"),e.abrupt("return");case 3:if(null!==p){e.next=6;break}return console.time("imageRef is null"),e.abrupt("return");case 6:if(null!==(a=u.current)){e.next=10;break}return console.log("canvasPictureRef.current is null"),e.abrupt("return");case 10:if(null!==(r=a.getContext("2d"))){e.next=13;break}return e.abrupt("return");case 13:r.clearRect(0,0,a.width,a.height),r.beginPath(),r.drawImage(x.current,0,0),r.save(),r.translate(771.5,385),r.globalCompositeOperation="source-in",i=(-771.5+t)*E.scale,c=(-385+n)*E.scale,console.log("posX: ".concat(i,", posY: ").concat(c)),o=v.current,s=parseInt(o.width+"")*E.scale,l=parseInt(o.height+"")*E.scale,r.drawImage(o,i,c,s,l),r.restore();case 27:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),A=function(){var e,t=l.current,n=u.current,a=g.current,r=a.getContext("2d");r.drawImage(t,0,0),r.drawImage(n,0,0);var i=a.toDataURL().replace("image/png","image/octet-stream"),c=document.createElement("a");c.href=i,c.setAttribute("download","dalgona.png"),document.body.appendChild(c),c.click(),null===(e=c.parentNode)||void 0===e||e.removeChild(c)};r.a.useEffect((function(){F().then()}),[l]),r.a.useEffect((function(){if(void 0!==t&&null!==p&&null!==x){U(!0);var e=x.current;e.onload=function(){var e=p.current;e.onload=function(){if(void 0!==t){var n=j.current,a=n.getContext("2d");a.clearRect(0,0,e.width,e.height),n.height=e.height,n.width=e.width,console.log("width: ".concat(n.width)),console.log("height: ".concat(n.height)),a.drawImage(e,0,0,e.width,e.height),a.save(),H(a.getImageData(0,0,e.width,e.height).data,e.width,e.height,E.lt,E.ut,X),console.log("onload")}},e.src=Q(t)},e.src=K}}),[t,p,x]);var U=function(e){var t=Object(b.a)({},E);t.isLoading=e,z(M(t))},N=function(e){for(var t=new Uint8ClampedArray(e),n=0;n<t.length;n+=4){var a=255-t[n],r=255-t[n+1],o=255-t[n+2];255===a&&255===r&&255===o?t[n+3]=0:(a+=i,r+=c,o+=s),t[n]=a,t[n+1]=r,t[n+2]=o}return t},X=function(){var e=Object(h.a)(d.a.mark((function e(t){var n,a,r,o,l,u,f,g,p,x;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.type,a=t.data,r=t.threshold,console.log("type: ".concat(n)),void 0!==a){e.next=4;break}return e.abrupt("return");case 4:o=j.current,(l=o.getContext("2d")).clearRect(0,0,o.width,o.height),u=N(a),f=new ImageData(u,o.width,o.height),l.putImageData(f,0,0),l.shadowBlur=1,l.shadowColor="rgb(".concat(i,", ").concat(c,", ").concat(s,")"),l.drawImage(o,0,0),g=818-o.width/2,p=376-o.height/2,console.log("relativePosX: ".concat(g,", relativePosY: ").concat(p)),R({x:g,y:p}),C({x:0,y:0}),(x=v.current).onload=Object(h.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G(g,p);case 2:(t=Object(b.a)({},E)).isLoading=!1,r&&(t.lt=r.lt,t.ut=r.ut),z(M(t));case 6:case"end":return e.stop()}}),e)}))),x.src=o.toDataURL();case 21:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(h.a)(d.a.mark((function e(t){var n,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y){e.next=2;break}return e.abrupt("return");case 2:return n={x:t.pageX,y:t.pageY},a={x:n.x-P.x,y:n.y-P.y},r={x:D.x+a.x,y:D.y+a.y},C(n),R(r),e.next=9,G(r.x,r.y);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(B.jsx)(B.Fragment,{children:Object(B.jsxs)("div",{style:{position:"relative",padding:0,margin:0},children:[Object(B.jsx)("canvas",{ref:l,width:n,height:a,style:{position:"relative",width:"100%",zIndex:1}}),Object(B.jsx)("canvas",{ref:u,width:n,height:a,style:{position:"absolute",width:"100%",zIndex:2,top:0,left:0},onMouseDown:function(e){w(!0);var t={x:e.pageX,y:e.pageY};C(t),console.log("mouse down {x: ".concat(e.pageX,", y: ").concat(e.pageY,"}"))},onMouseUp:function(e){w(!1),console.log("mouse up")},onMouseMove:Y}),Object(B.jsx)("canvas",{ref:j,width:n,height:a,style:{visibility:"hidden",width:"100%",zIndex:2,display:"none"}}),Object(B.jsx)("canvas",{ref:g,width:n,height:a,style:{visibility:"hidden",width:"100%",zIndex:2,display:"none"}}),Object(B.jsx)("img",{ref:p,style:{visibility:"hidden",display:"none"},alt:""}),Object(B.jsx)("img",{ref:x,style:{visibility:"hidden",display:"none"},alt:""}),Object(B.jsx)("img",{ref:v,style:{visibility:"hidden",display:"none"},alt:""})]})})},$=n(155),ee=n(165),te=function(){return Object(B.jsx)($.a,{position:"static",children:Object(B.jsx)(ee.a,{children:Object(B.jsx)(y.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Dalgona meme generator"})})})},ne=n(76),ae=n.n(ne),re=function(){return Object(B.jsx)(l.a,{id:"footer",maxWidth:"lg",sx:{marginTop:"15px",paddingTop:"15px",borderTop:"1px solid #eee"},children:Object(B.jsxs)(y.a,{component:"div",sx:{flexGrow:1},children:["Developed by ",Object(B.jsx)("a",{href:"https://rajephon.dev",target:"_blank",children:"rajephon"})," / ",Object(B.jsxs)("a",{href:"https://github.com/rajephon/dalgona-meme",target:"_blank",children:[Object(B.jsx)(ae.a,{fontSize:"inherit"})," Github"]}),Object(B.jsx)("br",{}),Object(B.jsx)("a",{href:"https://github.com/rajephon/dalgona-meme/issues",target:"_blank",children:"Report bug & issue"})]})})};var ie=function(){var e=r.a.useState(),t=Object(o.a)(e,2),n=t[0],a=t[1];return Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(te,{}),Object(B.jsx)(l.a,{maxWidth:"lg",sx:{marginTop:"15px"},children:Object(B.jsxs)(s.a,{container:!0,spacing:2,children:[Object(B.jsx)(s.a,{item:!0,xs:12,md:8,children:Object(B.jsx)(Z,{imgBuf:n})}),Object(B.jsx)(s.a,{item:!0,xs:12,md:4,children:Object(B.jsx)(G,{onClickGenerate:function(e){a(e)}})})]})}),Object(B.jsx)(re,{})]})},ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,166)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),i(e),c(e)}))},oe=n(24),se=Object(oe.b)({dalgonaState:C}),le=n(77),ue=n.n(le),de=Object(k.a)({reducer:se,middleware:function(e){return e().concat(ue.a)}});c.a.render(Object(B.jsx)(r.a.StrictMode,{children:Object(B.jsx)(f.a,{store:de,children:Object(B.jsx)(ie,{})})}),document.getElementById("root")),ce()},95:function(e,t,n){},96:function(e,t,n){}},[[105,1,2]]]);
//# sourceMappingURL=main.7cca0438.chunk.js.map
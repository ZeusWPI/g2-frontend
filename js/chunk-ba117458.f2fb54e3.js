(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba117458"],{"8f67":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",{attrs:{tile:""}},[r("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[r("v-btn",{attrs:{icon:"",dark:""},on:{click:e.close}},[r("v-icon",[e._v("mdi-close")])],1),r("v-toolbar-title",[e._v("Repository Manager")]),r("v-spacer"),r("v-toolbar-items",[r("v-btn",{attrs:{dark:"",text:"",disabled:e.loading,loading:e.loading},on:{click:e.save}},[e._v(" Save ")])],1)],1),r("v-card-text",[e.repositories.isLoading()?[r("v-skeleton-loader",{attrs:{type:"table"}})]:e.repositories.isSuccess()?[r("v-row",[r("v-col",{attrs:{cols:"12",sm:"","align-self":"center"}},e._l(e.tableSelected,(function(t,a){return r("v-chip",{key:a,staticClass:"mr-2 mb-2",attrs:{close:""},on:{"click:close":function(r){return e.removeSelection(t)}}},[e._v(" "+e._s(t.name)+" ")])})),1),r("v-col",{attrs:{cols:"12",sm:"","align-self":"center"}},[r("v-text-field",{attrs:{label:"Search for repository","append-icon":"mdi-magnify","hide-details":"",outlined:"",dense:""},model:{value:e.tableSearch,callback:function(t){e.tableSearch=t},expression:"tableSearch"}})],1)],1),r("v-data-table",{attrs:{items:e.repositories.data,headers:e.tableHeaders,search:e.tableSearch,"show-select":"","item-key":"name"},model:{value:e.tableSelected,callback:function(t){e.tableSelected=t},expression:"tableSelected"}})]:e.repositories.isError()?[r("error-placeholder",{attrs:{error:e.repositories.error,options:{style:"SECTION"}}})]:e._e()],2)],1)},n=[],o=(r("4de4"),r("caad"),r("2532"),r("b85c")),i=(r("96cf"),r("1da1")),c=r("d4ec"),l=r("bee2"),s=r("262e"),u=r("2caf"),d=r("9ab4"),b=r("60a3"),p=r("3ded"),f=(r("c975"),r("a434"),r("2b0e")),v=function(){function e(){Object(c["a"])(this,e)}return Object(l["a"])(e,null,[{key:"delete",value:function(e,t){e.splice(e.indexOf(t),1)}},{key:"update",value:function(e,t,r){var a=e.indexOf(t);e[a]=r,f["default"].set(e,a,r)}}]),e}(),h=r("c1c4"),O=function(e){Object(s["a"])(r,e);var t=Object(u["a"])(r);function r(){return Object(c["a"])(this,r),t.apply(this,arguments)}return Object(l["a"])(r,[{key:"getAll",value:function(){return{}}},{key:"get",value:function(e){return{}}},{key:"linkProject",value:function(e,t){return{}}},{key:"unlinkProject",value:function(e,t){return{}}}]),r}(h["EchoService"]);Object(d["a"])([Object(h["GET"])("/repositories")],O.prototype,"getAll",null),Object(d["a"])([Object(h["GET"])("/repositories/{id}"),Object(d["b"])(0,Object(h["Path"])("id"))],O.prototype,"get",null),Object(d["a"])([Object(h["POST"])("/repositories/{id}/link/{pid}"),Object(d["b"])(0,Object(h["Path"])("id")),Object(d["b"])(1,Object(h["Path"])("pid"))],O.prototype,"linkProject",null),Object(d["a"])([Object(h["POST"])("/repositories/{id}/unlink/{pid}"),Object(d["b"])(0,Object(h["Path"])("id")),Object(d["b"])(1,Object(h["Path"])("pid"))],O.prototype,"unlinkProject",null);var j=(new h["EchoServiceBuilder"]).setBaseUrl("http://52.137.51.108").build(O),y=r("1cec"),k=r("8cd5"),m=r("704c"),S=r("da70"),x=function(e){Object(s["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.repositories=j.getAll(),e.loading=!1,e.tableHeaders=[{text:"Name",value:"name"},{text:"Description",value:"description"},{text:"URL",value:"url"}],e.tableSearch="",e.tableSelected=e.payload.projectRepositories,e}return Object(l["a"])(r,[{key:"close",value:function(){p["a"].close()}},{key:"removeSelection",value:function(e){v["delete"](this.tableSelected,e)}},{key:"save",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,r,a,n,i,c,l,s,u=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.loading=!0,t=this.tableSelected.filter((function(e){return!u.payload.projectRepositories.includes(e)})),r=this.payload.projectRepositories.filter((function(e){return!u.tableSelected.includes(e)})),a=Object(o["a"])(t),e.prev=4,a.s();case 6:if((n=a.n()).done){e.next=20;break}return i=n.value,e.prev=8,e.next=11,j.linkProject(i.id,this.payload.project.id);case 11:e.next=18;break;case 13:return e.prev=13,e.t0=e["catch"](8),k["a"].handle(e.t0,{style:"SNACKBAR"}),this.loading=!1,e.abrupt("return");case 18:e.next=6;break;case 20:e.next=25;break;case 22:e.prev=22,e.t1=e["catch"](4),a.e(e.t1);case 25:return e.prev=25,a.f(),e.finish(25);case 28:c=Object(o["a"])(r),e.prev=29,c.s();case 31:if((l=c.n()).done){e.next=45;break}return s=l.value,e.prev=33,e.next=36,j.unlinkProject(s.id,this.payload.project.id);case 36:e.next=43;break;case 38:return e.prev=38,e.t2=e["catch"](33),k["a"].handle(e.t2,{style:"SNACKBAR"}),this.loading=!1,e.abrupt("return");case 43:e.next=31;break;case 45:e.next=50;break;case 47:e.prev=47,e.t3=e["catch"](29),c.e(e.t3);case 50:return e.prev=50,c.f(),e.finish(50);case 53:return this.loading=!1,m["a"].open({message:"Linked repositories have been updated",color:"success"}),p["a"].close(),e.next=58,S["a"].reload(this.$router);case 58:case"end":return e.stop()}}),e,this,[[4,22,25,28],[8,13],[29,47,50,53],[33,38]])})));function t(){return e.apply(this,arguments)}return t}()}]),r}(b["d"]);Object(d["a"])([Object(b["b"])()],x.prototype,"payload",void 0),x=Object(d["a"])([Object(b["a"])({components:{ErrorPlaceholder:y["a"]}})],x);var g=x,w=g,P=r("2877"),T=r("6544"),V=r.n(T),A=r("8336"),C=r("b0af"),E=r("99d9"),R=r("cc20"),_=r("62ad"),B=r("8fea"),I=r("132d"),L=r("0fd9"),M=r("3129"),N=r("2fa4"),D=r("8654"),G=r("71d9"),H=r("2a7f"),J=Object(P["a"])(w,a,n,!1,null,null,null);t["default"]=J.exports;V()(J,{VBtn:A["a"],VCard:C["a"],VCardText:E["c"],VChip:R["a"],VCol:_["a"],VDataTable:B["a"],VIcon:I["a"],VRow:L["a"],VSkeletonLoader:M["a"],VSpacer:N["a"],VTextField:D["a"],VToolbar:G["a"],VToolbarItems:H["a"],VToolbarTitle:H["b"]})},a434:function(e,t,r){"use strict";var a=r("23e7"),n=r("23cb"),o=r("a691"),i=r("50c4"),c=r("7b0b"),l=r("65f0"),s=r("8418"),u=r("1dde"),d=r("ae40"),b=u("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,v=Math.min,h=9007199254740991,O="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!b||!p},{splice:function(e,t){var r,a,u,d,b,p,j=c(this),y=i(j.length),k=n(e,y),m=arguments.length;if(0===m?r=a=0:1===m?(r=0,a=y-k):(r=m-2,a=v(f(o(t),0),y-k)),y+r-a>h)throw TypeError(O);for(u=l(j,a),d=0;d<a;d++)b=k+d,b in j&&s(u,d,j[b]);if(u.length=a,r<a){for(d=k;d<y-a;d++)b=d+a,p=d+r,b in j?j[p]=j[b]:delete j[p];for(d=y;d>y-a+r;d--)delete j[d-1]}else if(r>a)for(d=y-a;d>k;d--)b=d+a-1,p=d+r-1,b in j?j[p]=j[b]:delete j[p];for(d=0;d<r;d++)j[d+k]=arguments[d+2];return j.length=y-a+r,u}})},b85c:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var a=r("06c5");function n(e,t){var r;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=Object(a["a"])(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,l=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return c=e.done,e},e:function(e){l=!0,i=e},f:function(){try{c||null==r["return"]||r["return"]()}finally{if(l)throw i}}}}},c975:function(e,t,r){"use strict";var a=r("23e7"),n=r("4d64").indexOf,o=r("a640"),i=r("ae40"),c=[].indexOf,l=!!c&&1/[1].indexOf(1,-0)<0,s=o("indexOf"),u=i("indexOf",{ACCESSORS:!0,1:0});a({target:"Array",proto:!0,forced:l||!s||!u},{indexOf:function(e){return l?c.apply(this,arguments)||0:n(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-ba117458.f2fb54e3.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-371325e9"],{2532:function(t,e,r){"use strict";var a=r("23e7"),c=r("5a34"),o=r("1d80"),s=r("ab13");a({target:"String",proto:!0,forced:!s("includes")},{includes:function(t){return!!~String(o(this)).indexOf(c(t),arguments.length>1?arguments[1]:void 0)}})},"4de4":function(t,e,r){"use strict";var a=r("23e7"),c=r("b727").filter,o=r("1dde"),s=r("ae40"),n=o("filter"),i=s("filter");a({target:"Array",proto:!0,forced:!n||!i},{filter:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}})},acca:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{staticClass:"container--small"},[r("v-row",{attrs:{justify:"space-between"}},[r("v-col",{attrs:{cols:"12",sm:""}},[r("v-text-field",{attrs:{label:t.t("projects.search"),"append-icon":"mdi-magnify",outlined:"",dense:"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),r("v-col",{attrs:{cols:"auto"}},[r("v-btn",{attrs:{color:"primary",depressed:""},on:{click:t.openCreate}},[t._v(" "+t._s(t.t("projects.new"))+" "),r("v-icon",{attrs:{right:"",dark:""}},[t._v("mdi-plus-circle-outline")])],1)],1)],1),r("v-row",[t.projects.isLoading()?t._l(8,(function(t){return r("project-card",{key:t,attrs:{loading:!0}})})):t.projects.isSuccess()&&t.projectsFiltered.length<=0?[r("v-col",{attrs:{cols:"12"}},[r("h2",[t._v(t._s(t.t("projects.empty.title")))]),r("p",[t._v(" "+t._s(t.t("projects.empty.desc"))+" ")])])]:t.projects.isSuccess()?t._l(t.projectsFiltered,(function(t,e){return r("project-card",{key:e,attrs:{project:t}})})):t.projects.isError()?[r("error-placeholder",{attrs:{error:t.projects.error,options:{style:"SECTION",displayFullPage:!0}}})]:t._e()],2)],1)},c=[],o=(r("4de4"),r("caad"),r("b0c0"),r("ac1f"),r("2532"),r("841c"),r("d4ec")),s=r("bee2"),n=r("262e"),i=r("2caf"),l=r("9ab4"),d=r("60a3"),p=r("4783"),u=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[t.loading?[r("v-skeleton-loader",{attrs:{type:"image, article, actions"}})]:t.project?r("v-card",{staticClass:"fill-height",attrs:{to:"/projects/"+t.project.id}},[r("v-img",{attrs:{src:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",height:"200px"}}),r("v-card-title",[t._v(" "+t._s(t.project.name)+" ")]),r("v-card-subtitle",[t._v(" "+t._s(t.project.description)+" ")]),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{text:"",color:"primary",to:"projects/"+t.project.id}},[t._v(" "+t._s(t.t("projects.more"))+" ")])],1)],1):t._e()],2)},v=[],j=function(t){Object(n["a"])(r,t);var e=Object(i["a"])(r);function r(){return Object(o["a"])(this,r),e.apply(this,arguments)}return r}(d["d"]);Object(l["a"])([Object(d["b"])({default:!1})],j.prototype,"loading",void 0),Object(l["a"])([Object(d["b"])()],j.prototype,"project",void 0),j=Object(l["a"])([d["a"]],j);var f=j,b=f,h=r("2877"),g=r("6544"),m=r.n(g),_=r("8336"),y=r("b0af"),O=r("99d9"),C=r("62ad"),V=r("adda"),w=r("3129"),k=r("2fa4"),S=Object(h["a"])(b,u,v,!1,null,null,null),x=S.exports;m()(S,{VBtn:_["a"],VCard:y["a"],VCardActions:O["a"],VCardSubtitle:O["b"],VCardTitle:O["d"],VCol:C["a"],VImg:V["a"],VSkeletonLoader:w["a"],VSpacer:k["a"]});var E=r("1cec"),A=r("3ded"),F=r("3e4d"),L=function(t){Object(n["a"])(r,t);var e=Object(i["a"])(r);function r(){var t;return Object(o["a"])(this,r),t=e.apply(this,arguments),t.projects=p["a"].getAll(),t.search="",t}return Object(s["a"])(r,[{key:"openCreate",value:function(){A["a"].open({component:F["a"],responsive:!0})}},{key:"projectsFiltered",get:function(){var t=this,e=this.projects.data||[];return e.filter((function(e){return e.name.toLowerCase().includes(t.search.toLowerCase())}))}}]),r}(d["d"]);L=Object(l["a"])([Object(d["a"])({components:{ProjectCard:x,ErrorPlaceholder:E["a"]}})],L);var I=L,P=I,T=r("a523"),B=r("132d"),J=r("0fd9"),R=r("8654"),$=Object(h["a"])(P,a,c,!1,null,null,null);e["default"]=$.exports;m()($,{VBtn:_["a"],VCol:C["a"],VContainer:T["a"],VIcon:B["a"],VRow:J["a"],VTextField:R["a"]})},caad:function(t,e,r){"use strict";var a=r("23e7"),c=r("4d64").includes,o=r("44d2"),s=r("ae40"),n=s("indexOf",{ACCESSORS:!0,1:0});a({target:"Array",proto:!0,forced:!n},{includes:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")}}]);
//# sourceMappingURL=chunk-371325e9.b5d88f7e.js.map
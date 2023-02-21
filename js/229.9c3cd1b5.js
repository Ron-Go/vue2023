"use strict";(self["webpackChunkweek03"]=self["webpackChunkweek03"]||[]).push([[229],{9284:function(t,e,a){a(7658);var s=a(2578),i=a(6294);e["Z"]=(0,s.Q_)("adminStore",{state:()=>({checkResult:null,tempProducts:[],api:{url:"https://vue3-course-api.hexschool.io/v2",path:"vue2022ron"},tempData:{},AllCategory:[""],operateMode:"",pagination:{},selectEl:null,uploadEl:null}),getters:{},actions:{getAllCategory(){this.axios.get(`${this.api.url}/api/${this.api.path}/admin/products/all`).then((t=>{const e=t.data.products,a=Object.keys(e);a.forEach((t=>{let a=0;this.AllCategory.forEach((s=>{s===e[t].category?a++:a+=0})),0===a&&this.AllCategory.push(e[t].category)}))})).catch((t=>{const e=(0,i.Z)(),{message:a}=t.response.data;e.swAlert("center","error",a,!1,!1)}))},selectOnChange(t){this.getProducts(t.target.value)},getProducts(t=""){this.axios.get(`${this.api.url}/api/${this.api.path}/admin/products/?category=${t}`).then((t=>{this.tempProducts=t.data.products,this.pagination=t.data.pagination})).catch((t=>{const e=(0,i.Z)(),{message:a}=t.response.data;e.swAlert("center","error",a,!1,!1)}))},checkStatus(){(async()=>{const t=document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");this.axios.defaults.headers.common["Authorization"]=t;try{const t=await this.axios.post(`${this.api.url}/api/user/check`);this.checkResult=t.data.success,this.getProducts()}catch(e){const{message:t}=e.response.data,a=(0,i.Z)();await a.swAlert("center","error",t,!1,!1),this.router.push("/login")}})()},add(t){(async()=>{const e=(0,i.Z)();try{const a=await this.axios.post(`${this.api.url}/api/${this.api.path}/admin/product`,{data:t});this.getProducts(this.selectEl.value),e.swAlert("top-end","success",a.data.message,!1,!0)}catch(a){e.swAlert("top-end","error",a.response.data.message,!1,!0)}})()},put(t,e){(async()=>{const a=(0,i.Z)();try{const s=await this.axios.put(`${this.api.url}/api/${this.api.path}/admin/product/${t}`,{data:e});this.getProducts(this.selectEl.value),await a.swAlert("top-end","success",s.data.message,!1,!0)}catch(s){a.swAlert("top-end","error",s.response.data.message,!1,!0)}})()},uploadFile(){if(""===this.uploadEl.value)return;const t=this.uploadEl.files[0],e=new FormData;e.append("file-to-upload",t),this.axios.post(`${this.api.url}/api/${this.api.path}/admin/upload`,e).then((t=>{this.Swal.fire({title:"上傳成功",html:'<input class="form-control imageUrl" id="imageUrl" type="text" value="1234">',didOpen:()=>{document.querySelector(".imageUrl").value=t.data.imageUrl},icon:"success",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"複製圖片位置 ",cancelButtonText:"取消"}).then((t=>{if(t.isConfirmed){const t=document.querySelector(".imageUrl");navigator.clipboard.writeText(t.value),this.uploadEl.value=""}}))})).catch((t=>{this.Swal.fire("上傳失敗",t.message,"error")}))},changePage(t){this.axios.get(`${this.api.url}/api/${this.api.path}/admin/products/?page=${t}`).then((t=>{this.tempProducts=t.data.products,this.pagination=t.data.pagination})).catch((t=>{const e=(0,i.Z)();e.swAlert("top-end","error",t.response.data,!1,!0)}))},changeStatus(t){const{id:e}=t,a={...t};a.is_enabled=!a.is_enabled,this.put(e,a)},confirmProduct(){const{id:t}=this.tempData;"edit"===this.operateMode?this.put(t,this.tempData):"add"===this.operateMode&&this.add(this.tempData)},itemSort(t){this.tempProducts.sort(((e,a)=>a[t]-e[t]))}}})},8450:function(t,e,a){a(7658);var s=a(2578),i=a(6294),o=a(4677);e["Z"]=(0,s.Q_)("orderStore",{state:()=>({submitData:{user:{name:"",email:"",tel:"",address:""},message:""},tempOrders:[],tempData:{},pagination:{},api:{url:"https://vue3-course-api.hexschool.io/v2",path:"vue2022ron"}}),getters:{},actions:{getOrders(){this.axios.get(`${this.api.url}/api/${this.api.path}/admin/orders`).then((t=>{this.tempOrders=t.data.orders,this.pagination=t.data.pagination})).catch((t=>{const e=(0,i.Z)();e.swAlert("center","error",t.response.data.message,!1,!1)}))},checkStatus(){(async()=>{const t=document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");this.axios.defaults.headers.common["Authorization"]=t;try{const t=await this.axios.post(`${this.api.url}/api/user/check`);this.checkResult=t.data.success,this.getProducts()}catch(e){const t=(0,i.Z)();await t.swAlert("center","error",e.response.data.message,!1,!1),this.router.push("/login")}})()},submit(){const t=(0,i.Z)(),e=(0,o.Z)();this.axios.post(`${this.api.url}/api/${this.api.path}/order`,{data:this.submitData}).then((a=>{e.getCart(),t.swAlert("center","success",`訂購的商品${a.data.message}`,!1,!1)})).catch((e=>{t.swAlert("center","error",e.response.data.message,!1,!1)}))},changePaid(){this.axios.put(`${this.api.url}/api/${this.api.path}/admin/order/${this.tempData.id}`,{data:this.tempData}).then((t=>{console.log(t)})).catch((t=>{console.log(t)}))},async put(){const t=(0,i.Z)();try{const e=await this.axios.put(`${this.api.url}/api/${this.api.path}/admin/product/${id}`,{data:putData});this.getProducts(this.selectEl.value),await t.swAlert("top-end","success",e.data.message,!1,!0)}catch(e){t.swAlert("top-end","error",e.response.data.message,!1,!0)}}}})},4677:function(t,e,a){var s=a(2578),i=a(6294);e["Z"]=(0,s.Q_)("cartStore",{state:()=>({api:{url:"https://vue3-course-api.hexschool.io/v2",path:"vue2022ron"},tempCart:{}}),getters:{},actions:{getCart(){this.axios.get(`${this.api.url}/api/${this.api.path}/cart`).then((t=>{this.tempCart=t.data.data})).catch((t=>{const e=(0,i.Z)();e.swAlert("center","error",t.response.data.message,!1,!1)}))},addCart(t,e=1){const a=(0,i.Z)();this.axios.post(`${this.api.url}/api/${this.api.path}/cart`,{data:{product_id:t,qty:e}}).then((t=>{this.getCart(),a.swAlert("top-end","success",`此商品${t.data.message}`,!1,!0)})).catch((t=>{a.swAlert("center","error",t.response.data.message,!1,!1)}))},changeQty(t){const e=(0,i.Z)();this.axios.put(`${this.api.url}/api/${this.api.path}/cart/${t.id}`,{data:{product_id:t.id,qty:t.qty}}).then((t=>{this.getCart(),e.swAlert("top-end","success",`${t.data.message}商品數量`,!1,!0)})).catch((t=>{e.swAlert("center","error",t.response.data.message,!1,!1)}))},delCartItem(t){const e=(0,i.Z)();this.axios.delete(`${this.api.url}/api/${this.api.path}/cart/${t}`).then((t=>{this.getCart(),e.swAlert("top-end","success",`此商品${t.data.message}`,!1,!0)})).catch((t=>{e.swAlert("center","error",t.response.data.message,!1,!1)}))},delCartItems(){const t=(0,i.Z)();this.axios.delete(`${this.api.url}/api/${this.api.path}/carts`).then((e=>{this.getCart(),t.swAlert("top-end","success",`購物車全部${e.data.message}`,!1,!0)})).catch((e=>{t.swAlert("center","error",e.response.data.message,!1,!1)}))}},debounce:{changeQty:500,addCart:500}})},6294:function(t,e,a){a(7658);var s=a(2578),i=a(9284);e["Z"]=(0,s.Q_)("statusStore",{state:()=>({api:{url:"https://vue3-course-api.hexschool.io/v2",path:"vue2022ron"}}),getters:{},actions:{swAlert(t,e,a,s,i){return new Promise(((o,r)=>{o(this.Swal.fire({position:t,icon:e,title:a,showConfirmButton:s,timer:2500,toast:i}))}))},swDelect(t){this.Swal.fire({title:`刪除產品『${t.title}』?`,text:"資料刪除後，將無法恢復！",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"確認刪除",cancelButtonText:"取消"}).then((e=>{e.isConfirmed&&this.axios.delete(`${this.api.url}/api/${this.api.path}/admin/product/${t.id}`).then((t=>{this.Swal.fire(t.data.message,"你的資料已被刪除","success");const e=(0,i.Z)();this.axios.get(`${this.api.url}/api/${this.api.path}/admin/products/?category=${e.selectEl.value}`).then((t=>{e.tempProducts=t.data.products})).catch((t=>{this.swAlert("center","error",t.response.data.message,!1,!0)}))})).catch((t=>{this.Swal.fire(t.response.data.message,"你的資料尚未被刪除","error")}))}))},logout(){this.Swal.fire({title:"是否『登出』後台",text:"",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"確認登出",cancelButtonText:"取消"}).then((t=>{t.isConfirmed&&this.axios.post(`${this.api.url}/logout`).then((t=>{this.Swal.fire(t.data.message,"","success").then((t=>{t.isConfirmed&&this.router.push("/login")}))})).catch((t=>{this.Swal.fire(t.response.data.message,"","error")}))}))}}})},4229:function(t,e,a){a.r(e),a.d(e,{default:function(){return Y}});var s=a(3396),i=a(9242);const o={class:"body__container d-flex"},r={class:"aside d-flex flex-column py-5 fixed-top"},n=(0,s._)("h1",{class:"aside__logo ml-3"},[(0,s._)("a",{href:"",class:"aside__logo__link"},"logo")],-1),l={class:"mb-auto"},c={class:"aside__list ps-0 mb-0"},d={class:"aside__list__item"},u=(0,s._)("span",{class:"material-symbols-outlined icon--pill me-3"},"inventory_2",-1),p={class:"aside__list__item"},h=(0,s._)("span",{class:"material-symbols-outlined icon--pill me-3"},"order_approve",-1),m={class:"aside__list__item"},g=(0,s._)("span",{class:"material-symbols-outlined icon--pill me-3"},"local_activity",-1),f={class:"aside__list__item"},w=(0,s._)("span",{class:"material-symbols-outlined icon--pill me-3"},"article",-1),v={class:"aside__list__item"},y=(0,s._)("span",{class:"material-symbols-outlined icon--pill me-3"},"logout",-1),b={class:"position-relative ms-auto me-3",ref:"contentDom"};function _(t,e,a,_,x,$){const C=(0,s.up)("router-link"),k=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("aside",r,[n,(0,s._)("nav",l,[(0,s._)("ul",c,[(0,s._)("li",d,[(0,s.Wm)(C,{class:"item__link d-flex py-1 fw-bold",to:"/admin/products"},{default:(0,s.w5)((()=>[u,(0,s.Uk)(" Products ")])),_:1})]),(0,s._)("li",p,[(0,s.Wm)(C,{class:"item__link d-flex py-1 fw-bold",to:"/admin/orders"},{default:(0,s.w5)((()=>[h,(0,s.Uk)(" Orders ")])),_:1})]),(0,s._)("li",m,[(0,s.Wm)(C,{class:"item__link d-flex py-1 fw-bold",to:"/admin/coupon"},{default:(0,s.w5)((()=>[g,(0,s.Uk)(" Coupon ")])),_:1})]),(0,s._)("li",f,[(0,s.Wm)(C,{class:"item__link d-flex py-1 fw-bold",to:"/admin/article"},{default:(0,s.w5)((()=>[w,(0,s.Uk)(" Article ")])),_:1})]),(0,s._)("li",v,[(0,s._)("a",{class:"item__link d-flex py-1 fw-bold",href:"",onClick:e[0]||(e[0]=(0,i.iM)((t=>_.status.logout()),["prevent"]))},[y,(0,s.Uk)(" Logout ")])])])])]),(0,s._)("main",b,[(0,s.Wm)(k,{store:{admin:_.admin,status:_.status}},null,8,["store"])],512)])}var x=a(9284),$=a(8450),C=a(6294),k=a(4870),A=(0,s.aZ)({name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}});const S=(0,s.Wm)("g",{fill:"none","fill-rule":"evenodd"},[(0,s.Wm)("g",{transform:"translate(1 1)","stroke-width":"2"},[(0,s.Wm)("circle",{"stroke-opacity":".25",cx:"18",cy:"18",r:"18"}),(0,s.Wm)("path",{d:"M36 18c0-9.94-8.06-18-18-18"},[(0,s.Wm)("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"0.8s",repeatCount:"indefinite"})])])],-1);function W(t,e,a,i,o,r){return(0,s.wg)(),(0,s.j4)("svg",{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:t.width,height:t.height,stroke:t.color},[S],8,["width","height","stroke"])}A.render=W,A.__file="src/loaders/Spinner.vue";var Z=(0,s.aZ)({name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}});const B=(0,s.Wm)("circle",{cx:"15",cy:"15",r:"15"},[(0,s.Wm)("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),(0,s.Wm)("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})],-1),P=(0,s.Wm)("circle",{cx:"60",cy:"15",r:"9","fill-opacity":"0.3"},[(0,s.Wm)("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),(0,s.Wm)("animate",{attributeName:"fill-opacity",from:"0.5",to:"0.5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})],-1),N=(0,s.Wm)("circle",{cx:"105",cy:"15",r:"15"},[(0,s.Wm)("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),(0,s.Wm)("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})],-1);function T(t,e,a,i,o,r){return(0,s.wg)(),(0,s.j4)("svg",{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:t.color,width:t.width,height:t.height},[B,P,N],8,["fill","width","height"])}Z.render=T,Z.__file="src/loaders/Dots.vue";var M=(0,s.aZ)({name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}});const E=(0,s.Wm)("rect",{x:"0",y:"13",width:"4",height:"5"},[(0,s.Wm)("animate",{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}),(0,s.Wm)("animate",{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0s",dur:"0.6s",repeatCount:"indefinite"})],-1),D=(0,s.Wm)("rect",{x:"10",y:"13",width:"4",height:"5"},[(0,s.Wm)("animate",{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"}),(0,s.Wm)("animate",{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.15s",dur:"0.6s",repeatCount:"indefinite"})],-1),L=(0,s.Wm)("rect",{x:"20",y:"13",width:"4",height:"5"},[(0,s.Wm)("animate",{attributeName:"height",attributeType:"XML",values:"5;21;5",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"}),(0,s.Wm)("animate",{attributeName:"y",attributeType:"XML",values:"13; 5; 13",begin:"0.3s",dur:"0.6s",repeatCount:"indefinite"})],-1);function F(t,e,a,i,o,r){return(0,s.wg)(),(0,s.j4)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:t.height,width:t.width,fill:t.color},[E,D,L],8,["height","width","fill"])}M.render=F,M.__file="src/loaders/Bars.vue";var O={Spinner:A,Dots:Z,Bars:M},j=(0,s.aZ)({name:"vue-loading",props:{active:Boolean,programmatic:Boolean,container:[Object,Function,HTMLElement],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!1},transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,blur:{type:String,default:"2px"},opacity:Number,width:Number,height:Number,zIndex:{type:Number,default:100},loader:{type:String,default:"spinner"}},setup(t,e){const a=(0,k.iH)(t.active),i=(0,s.Fl)((()=>{let e={background:t.backgroundColor,opacity:t.opacity,backdropFilter:`blur(${t.blur})`};return e})),o=()=>{t.programmatic&&(a.value=!1,setTimeout((()=>{}),150))},r=()=>{t.canCancel&&a.value&&(o(),t.onCancel())},n=t=>{27===t.keyCode&&r()},l=()=>{t.isFullPage&&t.lockScroll&&document.body.classList.add("vld-shown")},c=()=>{t.isFullPage&&t.lockScroll&&document.body.classList.remove("vld-shown")};return(0,s.bv)((()=>{t.programmatic&&(a.value=!0,document.addEventListener("keyup",n))})),(0,s.Ah)((()=>{document.removeEventListener("keyup",n)})),(0,s.YP)((()=>t.active),(()=>{a.value=t.active})),(0,s.YP)(a,(()=>{a.value?l():c()})),{isActive:a,bgStyle:i,hide:o,cancel:r}},components:O});const U={class:"vld-icon"};function I(t,e,a,o,r,n){return(0,s.wg)(),(0,s.j4)(i.uT,{ref:"root",name:t.transition},{default:(0,s.w5)((()=>[(0,s.wy)((0,s.Wm)("div",{tabindex:"0",class:["vld-overlay is-active",{"is-full-page":t.isFullPage}],"aria-busy":t.isActive,"aria-label":"Loading",style:{zIndex:t.zIndex}},[(0,s.Wm)("div",{class:"vld-background",onClick:e[1]||(e[1]=(0,i.iM)(((...e)=>t.cancel&&t.cancel(...e)),["prevent"])),style:t.bgStyle},null,4),(0,s.Wm)("div",U,[(0,s.WI)(t.$slots,"before"),(0,s.WI)(t.$slots,"default",{},(()=>[((0,s.wg)(),(0,s.j4)((0,s.LL)(t.loader),{color:t.color,width:t.width,height:t.height},null,8,["color","width","height"]))])),(0,s.WI)(t.$slots,"after")])],14,["aria-busy"]),[[i.F8,t.isActive]])])),_:3},8,["name"])}function z(t,e,a){const o=(0,s.h)(t,e),r=document.createElement("div");return a.appendChild(r),(0,i.sY)(o,r),o.component}function Q(t){var e;"undefined"!==typeof t.remove?t.remove():null===(e=t.parentNode)||void 0===e||e.removeChild(t)}function X(t={},e={}){let a=null;const s={show(s=t,i=e){const o={programmatic:!0,lockScroll:!0,isFullPage:!1},r=Object.assign({},t,s,o);let n=r.container;r.container||(n=document.body,r.isFullPage=!0),a=z(j,r,n);const l=Object.assign({},e,i);Object.keys(l).map((t=>{null!=a&&(a.slots[t]=l[t])}))},hide(){if(null!=a){a.ctx.hide();let t=a.vnode.el;Q(t.parentElement)}}};return s}j.render=I,j.__file="src/main/Component.vue";var q={components:{},setup(){const t=(0,C.Z)(),e=(0,x.Z)(),a=(0,$.Z)();e.$onAction((({name:t,after:e,onError:a})=>{"checkStatus"!==t&&"changePage"!==t||(o.show(),e((()=>{o.hide()})))})),a.$onAction((({name:t,after:e,onError:a})=>{"getOrders"===t&&(o.show(),e((()=>{o.hide()})))}));let s=(0,k.iH)(null);const i=t=>{const e=X({container:t.value,canCancel:!1,loader:"Bars",color:"green",width:50,height:50,backgroundColor:"#ffffff",opacity:.8,zindex:999});return{show:()=>{e.show()},hide:()=>{setTimeout((()=>{e.hide()}),1e3)}}},o=i(s);return{admin:e,status:t,contentDom:s,loader:o}}},H=a(89);const R=(0,H.Z)(q,[["render",_]]);var Y=R}}]);
//# sourceMappingURL=229.9c3cd1b5.js.map
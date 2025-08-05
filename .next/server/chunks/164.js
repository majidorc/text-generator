"use strict";exports.id=164,exports.ids=[164],exports.modules={1164:(e,a,r)=>{r.r(a),r.d(a,{default:()=>$});var t=r(997),o=r(6689),i=r.n(o),n=r(8983),l=r.n(n),d=r(9404),s=r.n(d),c=r(4965),u=r.n(c),p=r(8697),m=r.n(p),h=r(3890),x=r.n(h),f=r(6259),b=r.n(f),g=r(3280),k=r(298),y=r(5753),j=r(1635),v=r.n(j),w=r(6619),C=r.n(w),F=r(3291),T=r.n(F),W=r(8442);function $({sharedName:e,setSharedName:a,form:r,setForm:o,companyName:n}){let[d,c]=i().useState(!1),[p,h]=i().useState({open:!1,message:""});(0,W.useTheme)();let f=e=>{let{name:r,value:t,type:i,checked:n}=e.target;if("name"===r){a(t),o(e=>({...e,name:t}));return}o(e=>({...e,[r]:"checkbox"===i?n:t}))},j=e=>{o(a=>({...a,withFee:e,showFeeFields:e})),c(!0),navigator.clipboard.writeText(F(e)),h({open:!0,message:"Copied to clipboard!"})},w=()=>{o(e=>e.withFee?{...e,withFee:!1,showFeeFields:!1}:{...e,withFee:!0,showFeeFields:!0})},C=()=>{o({tourDate:v()().tz("Asia/Bangkok").add(1,"day").startOf("day"),name:"",pickUp:"",exTransfer:"",pickupFrom:v()().hour(8).minute(0),pickupTo:v()().hour(9).minute(0),sendNow:!1,feeAdult:"0",feeChild:"0",showFeeFields:!1,withFee:!1}),c(!1),a("")},F=a=>{let t=n&&n.trim()?n:"Thailand Tours",o=r.exTransfer?`Pick up: ${r.pickUp} ( extra charge for private transfer ${r.exTransfer}THB )`:`Pick up: ${r.pickUp}`;return a?`Hello ${e||""} ,

Warm Greetings from ${t}
Thank you for choosing to book your trip with us!

We are pleased to confirm your booking, as detailed below.

Tour date:  ${r.tourDate?v()(r.tourDate).format("DD MMM YYYY").replace(/(\d{2}) (\w{3}) (\d{4})/,(e,a,r,t)=>`${parseInt(a)} ${r} ${t}`):""}
${o}
Pickup time: ${r.pickupFrom?v()(r.pickupFrom).format("HH:mm"):""} ~ ${r.pickupTo?v()(r.pickupTo).format("HH:mm"):""}

**Please be prepared and ready at the reception a few minutes before, and please note that the driver could be late by 15-30 minutes due to traffic and unwanted clauses.
We will try to be on time as possible, please just call us if driver be later more than 10 mins**

The national park fee of THB ${r.feeAdult} per adult and THB ${r.feeChild} per child is excluded from the tour price. Please prepare cash for this fee. This fee is a maintenance fee collected by the Thai government department. There is no exception.

Should you require any other assistance, please do not hesitate to contact us at anytime by replying to this email.

We wish you a great day and a fantastic trip!

Best Regards,
${t} team`:`Hello ${e} ,

Warm Greetings from ${t}
Thank you for choosing to book your trip with us!

We are pleased to confirm your booking, as detailed below.

Tour date: ${r.tourDate?v()(r.tourDate).format("DD MMM YYYY"):""}
${o}
Pickup time: ${r.pickupFrom?v()(r.pickupFrom).format("HH:mm"):""} ~ ${r.pickupTo?v()(r.pickupTo).format("HH:mm"):""}

** Please be prepared and ready at the reception a few minutes before, and please note that the driver could be late by 15-30 minutes due to traffic and unwanted clauses.
We will try to be on time as possible , please just call us if driver be later more than 10 mins**

Should you require any other assistance, please do not hesitate to contact us at anytime by replying to this email.

We wish you a great day and a fantastic trip!

Best Regards,
${t} team`};return(0,t.jsxs)(l(),{maxWidth:"xl",sx:{mt:2},children:[t.jsx(s(),{sx:{p:3,bgcolor:"background.paper",color:"text.primary",borderRadius:2,mb:4},children:(0,t.jsxs)(u(),{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[t.jsx(u(),{item:!0,xs:12,md:3,children:t.jsx(y.LocalizationProvider,{dateAdapter:k.AdapterDayjs,children:t.jsx(g.DatePicker,{label:"tour Date :",value:r.tourDate,onChange:e=>{o(a=>({...a,tourDate:e}))},renderInput:e=>t.jsx(m(),{...e,fullWidth:!0,variant:"outlined",sx:{bgcolor:"background.default"}})})})}),t.jsx(u(),{item:!0,xs:12,md:3,children:t.jsx(m(),{fullWidth:!0,label:"Name :*",name:"name",value:e,onChange:f,variant:"outlined",sx:{bgcolor:"background.default"}})}),t.jsx(u(),{item:!0,xs:12,md:3,children:t.jsx(m(),{fullWidth:!0,label:"Pick up :",name:"pickUp",value:r.pickUp,onChange:f,variant:"outlined",sx:{bgcolor:"background.default"}})}),t.jsx(u(),{item:!0,xs:12,md:3,children:t.jsx(m(),{fullWidth:!0,label:"Ex/Transfer",name:"exTransfer",value:r.exTransfer,onChange:f,variant:"outlined",sx:{bgcolor:"background.default"},type:"number",inputProps:{min:0}})}),t.jsx(u(),{item:!0,xs:12,md:3,children:t.jsx(y.LocalizationProvider,{dateAdapter:k.AdapterDayjs,children:t.jsx(g.TimePicker,{label:"Pickup time from:",value:r.pickupFrom,onChange:e=>{o(a=>({...a,pickupFrom:e}))},renderInput:e=>t.jsx(m(),{...e,fullWidth:!0,variant:"outlined",sx:{bgcolor:"background.default"}})})})}),t.jsx(u(),{item:!0,xs:12,md:3,children:t.jsx(y.LocalizationProvider,{dateAdapter:k.AdapterDayjs,children:t.jsx(g.TimePicker,{label:"Pickup time to:",value:r.pickupTo,onChange:e=>{o(a=>({...a,pickupTo:e}))},renderInput:e=>t.jsx(m(),{...e,fullWidth:!0,variant:"outlined",sx:{bgcolor:"background.default"}})})})}),r.showFeeFields&&(0,t.jsxs)(t.Fragment,{children:[t.jsx(u(),{item:!0,xs:12,md:3,children:t.jsx(m(),{fullWidth:!0,label:"FEE Adult :",name:"feeAdult",value:r.feeAdult,onChange:f,variant:"outlined",sx:{bgcolor:"background.default"}})}),t.jsx(u(),{item:!0,xs:12,md:3,children:t.jsx(m(),{fullWidth:!0,label:"FEE Child :",name:"feeChild",value:r.feeChild,onChange:f,variant:"outlined",sx:{bgcolor:"background.default"}})})]}),(0,t.jsxs)(u(),{item:!0,xs:12,mt:2,display:"flex",justifyContent:"center",gap:2,flexWrap:"wrap",children:[!r.showFeeFields&&(0,t.jsxs)(t.Fragment,{children:[t.jsx(x(),{variant:"contained",color:"primary",sx:{minWidth:160,fontWeight:600},onClick:()=>j(!1),children:"OK / Copy"}),t.jsx(x(),{variant:"contained",color:"secondary",sx:{minWidth:160,fontWeight:600},onClick:w,children:"With Fee"}),t.jsx(x(),{variant:"outlined",color:"secondary",onClick:C,sx:{minWidth:160,fontWeight:600,borderRadius:2,px:4,borderColor:"primary.main",color:"primary.main",bgcolor:"background.default","&:hover":{bgcolor:"primary.main",color:"background.paper",borderColor:"primary.main"}},children:"CLEAR"})]}),r.showFeeFields&&(0,t.jsxs)(t.Fragment,{children:[t.jsx(x(),{variant:"contained",color:"primary",sx:{minWidth:160,fontWeight:600},onClick:()=>{c(!0),navigator.clipboard.writeText(F(!0)),h({open:!0,message:"Copied to clipboard!"})},children:"OK / Copy"}),t.jsx(x(),{variant:"contained",color:"secondary",sx:{minWidth:160,fontWeight:600},onClick:w,children:"Without Fee"}),t.jsx(x(),{variant:"outlined",color:"secondary",onClick:C,sx:{minWidth:160,fontWeight:600,borderRadius:2,px:4,borderColor:"primary.main",color:"primary.main",bgcolor:"background.default","&:hover":{bgcolor:"primary.main",color:"background.paper",borderColor:"primary.main"}},children:"CLEAR"})]})]})]})}),d&&(0,t.jsxs)(s(),{sx:{p:3,bgcolor:"#231f3a",color:"#fff",borderRadius:2,mb:4},children:[t.jsx("pre",{style:{color:"#fff",fontFamily:"inherit",fontSize:16,whiteSpace:"pre-wrap",wordBreak:"break-word"},children:F(r.withFee)}),t.jsx(x(),{variant:"contained",sx:{bgcolor:"#a084e8",mt:2},onClick:()=>{navigator.clipboard.writeText(F(r.withFee)),h({open:!0,message:"Copied to clipboard!"})},children:"Copy Email"})]}),t.jsx(b(),{open:p.open,autoHideDuration:2e3,onClose:()=>h({open:!1,message:""}),message:p.message})]})}v().extend(C()),v().extend(T()),$.pageTitle="Customer"}};
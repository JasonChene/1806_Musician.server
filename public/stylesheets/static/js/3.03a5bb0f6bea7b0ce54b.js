webpackJsonp([3],{d1Qo:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l={data:function(){return{ruleForm:{name:"",phone:""},formInline:{user:"",region:""},rules:{name:[{validator:function(e,r,t){r?!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(r)||r.length>0?t(new Error("姓名不能为空且只能是中英文或者数字")):t():t(new Error("请输入账号"))},trigger:"blur"}],password:[{validator:function(e,r,t){return/^1[0-9]{10}$/.test(r)?11!==r.toString().length?t(new Error("电话号码必须是11位数字")):void t():t(new Error("请输入正确格式的电话号码"))},trigger:"blur"}]},tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}]}},methods:{onSubmit:function(){console.log("submit!")}}},o={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"layout"},[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.ruleForm,rules:e.rules}},[t("el-form-item",[t("el-input",{attrs:{placeholder:"姓名"},model:{value:e.ruleForm.user,callback:function(r){e.$set(e.ruleForm,"user",r)},expression:"ruleForm.user"}})],1),e._v(" "),t("el-form-item",[t("el-input",{attrs:{placeholder:"手机号"},model:{value:e.ruleForm.phone,callback:function(r){e.$set(e.ruleForm,"phone",r)},expression:"ruleForm.phone"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.onSubmitByAdd}},[e._v("添加")])],1)],1),e._v(" "),t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.ruleForm,rules:e.rules}},[t("el-form-item",[t("el-input",{attrs:{placeholder:"手机号"},model:{value:e.ruleForm.phone,callback:function(r){e.$set(e.ruleForm,"phone",r)},expression:"ruleForm.phone"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.onSubmitByAdd}},[e._v("查询")])],1)],1),e._v(" "),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[t("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{prop:"address",label:"地址"}})],1)],1)},staticRenderFns:[]};var a=t("VU/8")(l,o,!1,function(e){t("kmrP")},"data-v-6c1c2854",null);r.default=a.exports},kmrP:function(e,r,t){var l=t("uUpb");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);t("rjj0")("22dc4c39",l,!0)},uUpb:function(e,r,t){(e.exports=t("FZ+f")(!1)).push([e.i,"\n.layout[data-v-6c1c2854] {\n  padding: 20px 20px;\n  margin-right: 30%;\n}\n",""])}});
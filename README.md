#### VERJS

#### 一、使用须知：
 verjs是一款原生js代码编写的表单验证插件，提供了常用的10种表单验证方式，包括身份证号码验证、手机电话号码、电子邮箱验证、必填字段验证、正则自定义验证、多次对比验证、最大值/最小值验证……，后续功能正在开发中敬请期待
#### 二、方法介绍
 使用verJs.js只需在js中new一个既可以使用，如下面实例：
 ~~~
 new VerJs({
     form:"#form",
     success:function (d) {
         alert(1)
     },
     fail:function (d) {
         alert(2)
     }
 });
 <form action="#" id="form" data-form="ajax">
     <fieldset>
         <div>form表单验证</div>
         <dl>
             <dt>必填</dt>
             <dd>
                 <input type="text" data-required="参数不能为空" id="eq">
             </dd>
         </dl>
         <dl>
             <dt>相等</dt>
             <dd>
                 <input type="text" data-equal="#eq" data-required="参数不能为空">
             </dd>
         </dl>
         <dl>
             <dt>最小/大值</dt>
             <dd>
                 <input type="number" data-min="7" data-max="15">
             </dd>
         </dl>
         <dl>
             <dt>最小/大长度</dt>
             <dd>
                 <input type="text" data-minlength="5" data-maxlength="15">
             </dd>
         </dl>
         <dl>
             <dt>手机</dt>
             <dd>
                 <input type="text" data-mobile="true">
             </dd>
         </dl>
         <dl>
             <dt>邮箱</dt>
             <dd>
                 <input type="text" data-email="true">
             </dd>
         </dl>
         <dl>
             <dt>身份证</dt>
             <dd>
                 <input type="text" data-idcard="true">
             </dd>
         </dl>
         <dl>
             <dt>气泡+正则</dt>
             <dd>
                 <input type="text" data-rule="^[A-Za-z]\w{5,11}$" data-rule-message="请输入6~12字符，以字母开头" data-required="请输入6~12字符，以字母开头" data-block="true">
             </dd>
         </dl>
 
         <button type="submit">提交</button>
     </fieldset>
 </form>
 ~~~
   >form : 绑定的表单（id,class,tag）
   >
   >data : 验证的数据集合以验证表单数据的name为键值，也可在表单中加入相关属性参数加入验证组
   >
   >message : 验证的数据集合提示消息以验证表单数据的name为键值，也可在表单中加入相关属性参数加入验证组(详情请见第三章)
   >
   >success : 数据请求成功后的回调函数（验证通过并成功返回请求信息）
   >
   >fail : 数据请求失败后的回调函数（验证通过并未返回请求信息）   
#### 三、属性说明
 1. 必填参数【data-required="当前参数不能为空"】
 2. 最小参数【data-min="1"】
 3. 最大参数【data-max="1"】
 4. 相等参数【data-equal="#eq"】
 5. 最小长度【data-minlength="6"】
 6. 最大长度【data-maxlength="6"】
 7. 正则验证【data-rule="$\d+$" data-rule-message="只能输入数字"】
 8. 手机/电话号码验证【data-mobile="true"】
 9. 邮箱验证【data-email="true"】
 10. 身份证号码验证【data-idcard="true"】
 11. 表单提交方式 【data-form='ajax'】 
#### 四、实例
[表单验证](https://www.xincheng-blog.cn/ver.form.html)
#### 版权信息
 > Copyright © 2018 by [搬砖的小白](https://www.xincheng-blog.cn)  
 > All rights reserved。
 # 一、使用须知：
 verjs是一款原生js代码编写的表单验证插件，提供了常用的10种表单验证方式，包括身份证号码验证、手机电话号码、电子邮箱验证、必填字段验证、正则自定义验证、多次对比验证、最大值/最小值验证……，后续功能正在开发中敬请期待
 # 二、方法介绍
 init:初始化verJs验证数据，实例化verJs后绑定的唯一入口，传递参数：
   >form : 绑定的表单（id,class,tag）
   >
   >data : 验证的数据集合以验证表单数据的name为键值，也可在表单中加入相关属性参数加入验证组
   >
   >message : 验证的数据集合提示消息以验证表单数据的name为键值，也可在表单中加入相关属性参数加入验证组(详情请见第三章)
   >
   >success : 数据请求成功后的回调函数（验证通过并成功返回请求信息）
   >
   >fail : 数据请求失败后的回调函数（验证通过并未返回请求信息）
   
 # 三、属性说明
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
 # 四、插件下载
 [verJs下载中心](https://xincheng-blog.cn/download/verJs.rar)
 
 # 五、文件目录结构
 ~~~
 www 网站部署目录
 |——verJs  verjs文件夹
 |————need  样式文件夹
 |——————common.css  verjs基础样式
 |——————vericon.css icon样式
 |————verJs.js  verJS文件
 |————verApi.js verapi接口调用文件
 |————verSelectList.js  select下拉选框
 |————verTabList.js 复选
 ~~~
 # 版权信息
 > Copyright © 2018 by [搬砖的小白](https://www.yum-blog.cn)  
 > All rights reserved。
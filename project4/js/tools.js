var tools = {
	/* 查找DOM对象
	 * @param selector string css基本选择器
	 * @param [parent] DOMobj 父级元素对象
	 * @return   DOMobj || HTMLCollection
	 */
// 	$:function("#li",parent){
// 		parent = parent || document;
// 		switch(li.charAt(0)){
// 		case "#":return document.getElementById(#li.slice(1));
// 		case ".": return parent.getElementsByClassName(.li.slice(1));
// 		default:return parent.getElementsByTagName(li);
// 		}
// 	},
	$: function(selector ,parent){
		parent = parent || document;
		switch(selector.charAt(0)){
			case "#":
				return document.getElementById(selector.slice(1));
			case ".":
				return parent.getElementsByClassName(selector.slice(1));
			default:
				return parent.getElementsByTagName(selector);
		}
	},
	
	/*获取外部样式
	 * @param obj  DOMobj 要获取属性的DOM对象 
	 * @param attr string 获取某一条属性的属性名
	 * @return  string  obj的attr属性值
	 */
// 	getstyle:function(obj,attr){
// 		if(obj.currentStyle){
// 			return obj.currentStyle[attr];
// 		}else{
// 			return getComputedStyle(obj,false)[attr];
// 		}
// 	}
	
	getStyle: function(obj, attr){
		if(obj.currentStyle){ //针对IE
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	},
	
	/* 获取body宽高
	 * 
	 * @return obj {width,height}
	 * */
// getbody: function(){
// 	return {width:document.documentElement.clientWidth || document.body.clientWidth,
// 	       height:document.documentElement.clientHeight || document.body.clientHeight;
// 		}   
// }	 
	 
	 
	getBody: function(){
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight
		};
	},
	
	/*让元素在body里绝对居中
	 * @param obj  DOMobj 居中的那个元素对象
	 */
// 	showcenteer: function(obj){
// 		var this1=this;
// 	document.body.appendChild(obj);
// 		obj.style.position="absolute";
// 		function cneter(){
// 			var _left =(this1.getBody().width- obj.offsetWidth)/2,
// 			     _top = (this1.getBody().height-obj.offsetHeight)/2;
// 				 
// 				 obj.styel.left=_left+"px";
// 				 obj.style.top=_top+"px";
// 		}
// 		center();
// 		window.onresize=center;
// 	}
	showCenter: function(obj){
		
		//console.log(this);
		//this在不同执行环境指向的对象是不一样的，所以用一个变量在指向变化之前先存下来
		var _this = this;
		
		//obj相对于body定位
		document.body.appendChild(obj);
		obj.style.position = "absolute";
		
		function center(){
			//console.log(_this);
			var _left = (_this.getBody().width - obj.offsetWidth)/2,
				_top = (_this.getBody().height - obj.offsetHeight)/2;
			obj.style.left = _left + "px";
			obj.style.top = _top + "px";
		}
		
		center();
		window.onresize = center;
		
	},
	/* 获取和设置样式,,内部样式；
	 * @param obj DOMobj 设置谁的样式
	 * @param oAttr obj  {left:"200px",top:"100px"} 设置css
	 * @param oAttr string 获取属性值  @return string  oAttr对应的属性值
	 * */
// 	css:  function(obj,oattr){
// 		if(typeof oattr ==="string"){
// 			return obj.style[oattr]
// 		}else{
// 			return for(var key in obj){
// 				obj.style[key]=oattr[key];
// 			}
// 		}
// 	}
	 
	css: function(obj,oAttr){
		if(typeof oAttr === "string"){
			return obj.style[oAttr];  // 得到的oAttr的值
		}else{
			for(var key in oAttr){
				obj.style[key] = oAttr[key]; 
			}
		}
		
	},
	
	/*添加事件监听
	 * @param obj DOMobj 添加事件的DOM元素
	 * @param type string 事件句柄
	 * @param fn Function 事件处理函数
	 * */
// 	 on: function(obj,type,fn){
// 		 if(window.attachEvent("on"+type,fn){;
// 	 }else{
// 		 obj.addEventListener(type,fn,false);
// 	 }
// 	 }
	on: function(obj, type, fn){
		//兼容判断
		if(window.attachEvent){
			obj.attachEvent("on"+type, fn);
		}else{
			obj.addEventListener(type, fn, false); //第三个参数指是否捕获，默认是false
		}
	},
	
	/*移除事件监听
	 * @param obj DOMobj 添加事件的DOM元素
	 * @param type string 事件句柄
	 * @param fn Function 事件处理函数
	 * */
// 	 off: function(obj,type,fn){
// 		if(window.detachEvent){
// 		obj.detachEvent("on"+type,fn);	
// 		}else{
// 			obj.removeEventListener(type,fn,false);
// 		}
// 	 }
	off: function(obj, type, fn){
		window.detachEvent ?
			obj.detachEvent("on"+type, fn) :
			obj.removeEventListener(type, fn, false);
	},
	
	// 	cookie:function(key,value,exp){
// 		if(value === undefined){
// 			var obj =new Object();
// 			var str=document.cookie;
// 			var arr=str.split(";");
// 			for(var i=0;i<arr.length;i++){
// 				var item=arr[i].split("=");
// 				obj[item[0]]=item[1];
// 			}
// 		
// 		return obj[key]? decodeURIComponent(obj[key]) : undefined;
// 	}else{
// 		var str ="";
// 		if(exp){
// 			var d =new Date();
// 			d.setDate(d.getDate()+exp.exprires);
// 			str+=";expires="+d;
// 		}if(exp.path){
// 			str+=";path="+exp.path;
// 		}
// 		document.cookie =key+'='+encodeURIComponent(value)+str;
// 	}
// 	} 
	
	/* 存取cookie
	 * @param key string cookie的名称
	 * @param [value] string cookie的值  如果不传，获取cookie
	 * @param [exp] object  {expires:3,path:"/"} 
	 * */
	cookie: function(key, value, exp){
		//判断value是否有效
		if(value === undefined){
			//获取
			var obj = new Object();
			var str = document.cookie;
			var arr = str.split("; ");
			for(var i = 0; i < arr.length; i++){
				var item = arr[i].split("=");
				obj[item[0]] = item[1];
			}
			//判断有没有取到
			return obj[key] ? decodeURIComponent(obj[key]) : undefined;
			
		}else{
			//拼接expires
			var str = "";
			if(exp){
				//如果传了过期时间
				if(exp.expires){
					//设置new Date到过期的那一天
					var d = new Date();
					d.setDate(d.getDate()+exp.expires);
					str += ";expires="+d;
				}
				//如果传了path
				if(exp.path){
					str += ";path="+exp.path;
				}
			}
			
			document.cookie = key+"="+encodeURIComponent(value)+str;
		}
	},
	/*
	* 封装ajax的get请求方法
	* @param url string 请求路径
	* @param params Object 请求携带的参数
	* @param cb  Function  请求成功之后的回调函数
	* @param isJson boolean true代表是json 默认值就是true false就是普通字符串
	*/
// ajaxGet:function(url,params,cb,isJson){
// 	var ajax=new XMLHttpRequest();
// 	if(typeof params === "function"){
// 		 if(cb === undefined){
// 		  isJson=true;	 
// 		 }else{
// 		 isJson=cb;
// 		 }
// 	cb=params;
// 	}else{
// 	url+="?";
//     for(let Key in params){
// 	url+= key+ "="+params[key]+"&";
//      }	
// 	url= url.slice(0,-1); 截取0，到最后一位，，返回截取的数值	
// 	}
// ajax.open("GET",url);
// ajax.send(null);
// //监听状态
// ajax.onreadystatechange==function(){
// 	//状态码的判断，4与200，正常
// if(ajax.readyState ===4 && ajax.status===200){
// cb(isJson? JSON.parse(ajax.responseText):ajax.responseText);	
// }	
// }		
// },	
// 
// ajaxPost:function(url,params,cb,isJson){
// 	var ajax = new XMLHttpRequest();
// 	var str="";//接收参数，，pos提交参数没有在url后面；
// 	if(typeof params === "function"){
// 		str=null;
// 	if(cb === undefined){
// 		isJson=true;
// 	}else{
// 	isJson=cb;
// 	}	
// 	cb=params;
// 	}else{
// 	for(let Key in params){
// 	//拼接参数
// 	str+= key +"="+params[key]+"&";
// 	}
// 	//去掉最后一个&；
// 	str=str.slice(0,-1);
// 	}
// ajax.open("POST",url);
// //设置请求头的content-type，，识别提交的这种方式；post一定要写
// ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// //传参数
// ajax.send(str);
// ajax.onreadystatechange=function(){
// if(ajax.readyState === 4 && ajax.status===200){
// cb(isJson? JSON.parse(ajax.responseText): ajax.responseText);	
// }	
// }	
// },
// 
// /*
// 	* 封装ajax方法，get、post都能请求
// 	* @param  obj object  
// 	*           --method  string   get|post
// 	*           --url     string   请求的接口地址
// 	*           --params  object   请求携带的参数
// 	*           --cbSucc  function 请求成功的回调函数
// 	*           --cbFail  function 请求失败的回调函数
// 	*           --isJson  boolean  是否转换json，默认值为true
// 	*/
// ajax:function(obj){
// //判断json有没有传,没传默认为true
// if(obj.isJson === undefined){
// isJson = true;	
// }
// //判断是否传参数,拼接参数
// var str="";
// if(obj.params){
// for(let key in obj.params){
//  str+= key +"="+ obj.params[key]+"&";	
// }	
// str=str.slice(0,-1);//删除最后一个&
// }else{
// str=null;
// }
// var ajax = new XMLHttpRequest();
// if(obj.method.toUpperCase()==="GET"){
// 	//GET提交拼接参数
// ajax.open("GET",obj.url+"?"+str);	
// ajax.send(null);
// }else if(obj.method.toUpperCase()==="POST"){
// ajax.open("POST",obj.url);
// //设置请求头的content-type，，识别提交的这种方式；post一定要写
// ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// ajax.send(str);
// }else{
// //其它的，，回调错误函数，结束函数；
// obj.cbFail();
// return;//结束函数
// }
// ajax.onreadystatechange=function(){
// if(ajax.readyState===4){
// if(ajax.status===200){
// //回调一个 响应 json格式的文本，，，或者普通字符串 
// obj.cbSucc(obj.isJson ? JSON.parse(ajax.responseText) : ajax.responseText);	
// }else{
// obj.cbFail();	//否则回调错误函数
// }	
// }	
// }	
// },	

//老师代码
ajaxGet: function(url, params, cb, isJson = true){  
		//1、new对象
		var ajax = new XMLHttpRequest();

		//拼接url+params
		if(typeof params === "function"){
			//参数都往前移动一位，isJson默认值为true
			if(cb === undefined){
				//cb没有传
				isJson = true;
			}else{
				//传了cb
			 	isJson = cb;
			}
			cb = params;
		}else{
			//id=1&name=zhangsan
			url += "?";
			for(var key in params){
				url += key+"="+params[key]+"&";
			}
			//url删除最后一个 &
			url = url.substr(0,url.length-1);
		}
		//2、打开连接
		//第三个参数代表是否异步，默认为true
		ajax.open("GET", url);

		//3、发送请求
		ajax.send(null);

		//4、状态改变
		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4 && ajax.status === 200){
				cb(isJson? JSON.parse(ajax.responseText):ajax.responseText);
			}
		}
	},

	/*
	* 封装ajax的post请求方法
	* @param url string 请求路径
	* @param params Object 请求携带的参数
	* @param cb  Function  请求成功之后的回调函数
	* @param isJson boolean true代表是json 默认值就是true false就是普通字符串
	*/
	ajaxPost: function(url, params, cb, isJson=true){
		//判断是否有参数
		var str = "";
		if(typeof params === "function"){
			//没有参数要发送
			str = null;
			
			//参数都往前移动一位，isJson默认值为true
			if(cb === undefined){
				//cb没有传
				isJson = true;
			}else{
				//传了cb
			 	isJson = cb;
			}
			cb = params;
		}else{
			for(let key in params){
				str += key+"="+params[key]+"&";
			}
			str = str.slice(0, -1);
		
		}

		//1、new 对象
		var ajax = new XMLHttpRequest();

		//2、打开连接
		ajax.open("POST", url, true);
		//设置请求头的content-type
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//3、发送请求
		ajax.send(str);

		//4、监听状态改变
		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4 && ajax.status === 200){
				cb(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
			}
		}


	},


	/*
	* 封装ajax方法，get、post都能请求
	* @param  obj object  
	*           --method  string   get|post
	*           --url     string   请求的接口地址
	*           --params  object   请求携带的参数
	*           --cbSucc  function 请求成功的回调函数
	*           --cbFail  function 请求失败的回调函数
	*           --isJson  boolean  是否转换json，默认值为true
	*/
	ajax: function(obj){
		//method, url, params, cbSucc, cbFail, isJson
		//如果没有传isJson，默认值为true
		if(obj.isJson === undefined){
			obj.isJson = true;
		}
		//判断是否有参数
		let str = "";
		if(obj.params){
			for(let key in obj.params){
				str += key+"="+obj.params[key]+"&";
			}
			str = str.slice(0,-1);
		}else{
			str = null;
		}

		var ajax = new XMLHttpRequest();

		if(obj.method.toUpperCase() === "GET"){
			ajax.open("GET", obj.url+"?"+str);

			ajax.send(null);

		}else if(obj.method.toUpperCase() === "POST"){
			ajax.open("POST", obj.url);
			//设置请求头的content-type
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			ajax.send(str);

		}else{
			obj.cbFail();
			return;
		}

		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4){
				if(ajax.status === 200){
					obj.cbSucc(obj.isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
				}else{
					obj.cbFail();
				}
			}
		}



	},
	
	
	
}

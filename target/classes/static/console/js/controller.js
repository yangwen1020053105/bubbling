$(function() {
	//初始化菜单树
	$.ajax({
        type: "POST",  
        url: "/proxyService/indexService/getIndexInfor",  
        contentType: 'application/json;charset=UTF-8',  
        data: null,  
        dataType: "json",
        async: false,//ajax设置为同步  
        success: function(res){  
                   $("#userName").text(res.data.userName);
                   setFunc(res.data.func)
                 },  
        error:function(e){  
                    
        }  
    }); 
})
function setFunc(func){
	for( var key in func ){
	     
	    if(func[key].pid==1){
	    	if(func[key].viewPath==null||func[key].viewPath==""){
		    	$("#nav").html($("#nav").html()+"<li><a href='javascript:;'><i class='iconfont left-nav-li' lay-tips='"+func[key].funcName+"'>"+func[key].imagePath+"</i><cite>"+func[key].funcName+"</cite><i class='iconfont nav_right'>&#xe697;</i></a><ul id='"+func[key].id+"' class='sub-menu'></ul></li>");
		    	setFuncF(func,func[key].id);
	    	}else{
	    		$("#nav").html($("#nav").html()+"<li><a onclick=\"xadmin.add_tab('"+func[key].funcName+"','"+func[key].viewPath+"')\"><i class=\"iconfont\">"+func[key].imagePath+"</i><cite>"+func[key].funcName+"</cite></a></li>");
	    	}
	    }
	    
	}
}
function setFuncF(func,pid){
	for( var key in func ){
		if(func[key].pid==pid){
		if(func[key].viewPath==null||func[key].viewPath==""){
			$("#"+pid).html($("#"+pid).html()+"<li><a href='javascript:;'><i class='iconfont left-nav-li' lay-tips='"+func[key].funcName+"'>"+func[key].imagePath+"</i><cite>"+func[key].funcName+"</cite><i class='iconfont nav_right'>&#xe697;</i></a><ul id='"+func[key].pid+"' class='sub-menu'></ul></li>");
			setFuncF(func,func[key].id);
    	}else{
    		$("#"+pid).html($("#"+pid).html()+"<li><a onclick=\"xadmin.add_tab('"+func[key].funcName+"','"+func[key].viewPath+"')\"><i class=\"iconfont\">"+func[key].imagePath+"</i><cite>"+func[key].funcName+"</cite></a></li>");
    	}
		}
	}
}
function updatePassword(){
	show("model","修改密码",400,250);
}
function save(){
	var password=$("#password").val();
	var repass=$("#repass").val();
	if(password==""||password==null){
		showMes("info","密码不能为空！");
	}
	else if(password!=repass){
		showMes("info","两次密码不相同！");
	}else{
		var p={};
		p.pass=password;
		$.ajax({
	        type: "POST",  
	        url: "/proxyService/indexService/updatePassword",  
	        data:JSON.stringify(p),  
	        contentType: 'application/json;charset=UTF-8',  
	        dataType: "json",
	        async: false,//ajax设置为同步  
	        success: function(res){  
	        	        hide("model");
	        	        showMes("success","修改成功！");
	                 },  
	        error:function(e){  
	        	showMes("success","修改失败！");   
	        }  
	    }); 
	}
}
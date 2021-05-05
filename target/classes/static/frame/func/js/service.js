var funcServices = angular.module('funcServices', [])
funcServices.factory('func', [
	  '$http',
	  function($http) {
		  var isNode=false;
		  /**
		    * 查询收文
		    */
		  function getTreeList() {
			  ajax($http,"/proxyService/frameService/getFuncList",null).then(function(res){
				  if(res.rtnCode=="200"){
					  layui.use('tree', function(){
						    var tree = layui.tree;
						    //渲染
						    var inst1 = tree.render({
			                   elem: '#funcTree'  //绑定元素
						      ,edit: ['add', 'update', 'del'] //操作节点的图标
						      ,addFunction:addFunc
						      ,runDelete:false
						      ,runUpdate:false
						      ,deleteFunction:deleteFunc
						      ,updateFunction:updateFunc
						      ,click: function(obj){
						        
						      }
						      ,data: toTreeJson(res.data,'id','pid','funcName','1')
						    });
						  });
				  }
				  refreshForm();
			  });
		  }
		  function addFunc(obj){
			  if(obj.data.viewPath!=null&&obj.data.viewPath!=""){
				  isNode=true;
			  }
			  $('input[name="id"]').val("");
			  $('input[name="pid"]').val(obj.data.id);
			  $('input[name="pName"]').val(obj.data.title);
			  $('input[name="funcName"]').val("未命名");
		  }
		  function updateFunc(obj){
			  $('input[name="id"]').val(obj.data.id);
			  $('input[name="pid"]').val(obj.data.pid);
			  $('input[name="pName"]').val("");
			  $('input[name="funcName"]').val(obj.data.funcName);
			  $('input[name="imagePath"]').val(obj.data.imagePath);
			  $('input[name="viewPath"]').val(obj.data.viewPath)
		  }
		  function deleteFunc(obj){
			  if(JSON.stringify(obj.data.children)=="[]"||obj.data.children==null){
				  var params ={};
				  params.objName="com.emrs.frame.model.TAcFunc";
				  params.id=obj.data.id;
				  ajax($http,"/proxyService/frameService/deleteFunc",params).then(function(res){
					  if(res.rtnCode=="200"){
						  getTreeList();
					  }
					  
				  });
			  }else{
				  layui.use(['notice', 'jquery', 'layer'], function () {
				        var notice = layui.notice;
				        var layer = layui.layer;
				        var $ = layui.jquery;
				        notice.error("子节点不为空！");
				    });
				  
			  }
			  
		  }
		  function saveFunc(){
			  if(isNode){
				  layui.use(['notice', 'jquery', 'layer'], function () {
				        var notice = layui.notice;
				        var layer = layui.layer;
				        var $ = layui.jquery;
				        notice.error("此节点为最底层节点，不允许添加！");
				    });
			  }else{
				  var params = arrToJson($("#funcForm").serializeArray());
				    ajax($http,"/proxyService/frameService/saveFunc",params).then(function(res){
						  if(res.rtnCode=="200"){
							  getTreeList();
						  }
						  
					  });
			  }
		  }
		  function refreshForm(){
			  $("#funcForm")[0].reset();
		  }
		  return {
			  getTreeList:getTreeList,
			  saveFunc:saveFunc,
	    }
	  }
	])

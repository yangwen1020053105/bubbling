var orgServices = angular.module('orgServices', [])

orgServices.factory('org', [
	  '$http',
	  function($http) {
		  function getTreeList(){
			  ajax($http,"/proxyService/frameService/getOrgList",null).then(function(res){
				  if(res.rtnCode=="200"){
					  layui.use('tree', function(){
						    var tree = layui.tree;
						    //渲染
						    var inst1 = tree.render({
			                   elem: '#orgTree'  //绑定元素
						      ,edit: ['add', 'update', 'del'] //操作节点的图标
						      ,runDelete:false
						      ,runUpdate:false
						      ,addFunction:addOrg
						      ,deleteFunction:deleteOrg
						      ,updateFunction:updateOrg
						      ,click: function(obj){
						        
						      }
						      ,data: toTreeJson(res.data,'id','pid','orgName','1')
						    });
						  });
				  }
				  refreshForm();
			  });
		  }
		  function addOrg(obj){
			  $('input[name="id"]').val("");
			  $('input[name="pid"]').val(obj.data.id);
			  $('input[name="pName"]').val(obj.data.title);
			  $('input[name="orgName"]').val("未命名");
		  }
		  function updateOrg(obj){
			  $('input[name="id"]').val(obj.data.id);
			  $('input[name="pid"]').val(obj.data.pid);
			  $('input[name="pName"]').val("");
			  $('input[name="orgName"]').val(obj.data.orgName);
		  }
		  function deleteOrg(obj){
			  if(JSON.stringify(obj.data.children)=="[]"||obj.data.children==null){
				  var params ={};
				  params.objName="com.emrs.frame.model.TAcOrg";
				  params.id=obj.data.id;
				  ajax($http,"/proxyService/frameService/deleteOrg",params).then(function(res){
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
		  function saveOrg(){
				var params = arrToJson($("#orgForm").serializeArray());
				ajax($http,"/proxyService/frameService/saveOrUpdateOrg",params).then(function(res){
					if(res.rtnCode=="200"){
						getTreeList();
					}  
				});
		  }
		  function refreshForm(){
			  $("#orgForm")[0].reset();
		  }
		  return {
			  getTreeList:getTreeList,
			  saveOrg:saveOrg,
	    }
	  }
	])

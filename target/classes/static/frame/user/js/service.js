var table;
var transfer;
var userServices = angular.module('userServices', [])
userServices.factory('user', [
	  '$http',
	  function($http) {
		  function getTreeList(){
			  ajax($http,"/proxyService/frameService/getOrgList",null).then(function(res){
				  if(res.rtnCode=="200"){
					  layui.use('tree', function(){
						    var tree = layui.tree;
						    var inst1 = tree.render({
			                   elem: '#orgTree'  //绑定元素
						      ,click: queryUser
						      ,data: toTreeJson(res.data,'id','pid','orgName','1')
						    });
						  });
				  }
			  });
		  }
		  var objBak;
		  function queryUser(obj){
			  objBak=obj;
			  var params ={};
			  params.orgId=obj.data.id;
			  layui.use('table', function(){
				  table = layui.table;
				  table.render({
				    elem: '#userTable'
				    ,height: 'full-270'
				    ,url: '/proxyService/frameService/getUserByOrg' //数据接口
				    ,where: params
				    ,method: 'post'
				    ,contentType : 'application/json'
				    ,page: true //开启分页
				    ,cols: [[ //表头
				       {type:'radio'}
				      ,{field: 'id', title: 'ID'}
				      ,{field: 'loginName', title: '登录名'}
				      ,{field: 'userName', title: '用户名', sort: true}
				      ,{field: 'sex', title: '性别', sort: true, toolbar: '#sexToolBar'} 
				      ,{field: 'email', title: '邮箱地址'} 
				      ,{field: 'phone', title: '电话'}
				    ]]
				    ,parseData: function(res){ //res 即为原始返回的数据
				    	if(res.rtnCode=="200"){
				    		return {
				    			"code": 0, //解析接口状态
				    		    "msg": "", //解析提示文本
				    		    "count": 0, //解析数据长度
				    		    "data": res.data//解析数据列表
					          };
					        }
				    	}  
				  });
				});
		  }
		  function save(){
			    var params = arrToJson($("#manager").serializeArray());
			    params.orgId=getTreeSelectId();
				ajax($http,"/proxyService/frameService/saveOrUpdateUser",params).then(function(res){
					if(res.rtnCode=="200"){
						queryUser(objBak);
						hide("model");
					}else{
						showMes("info",res.rtnMsg);
					}
				});
		  }
		  function deleteUser(id){
			    var params = {};
			    params.id=id;
			    params.objName="com.emrs.frame.model.TAcUser";
				ajax($http,"/proxyService/frameService/deleteUserIsVaild",params).then(function(res){
					if(res.rtnCode=="200"){
						queryUser(objBak);
					}  
				});
		  }
		  function setRole(userId){
			    var params = {};
			    params.userId=userId;
			    params.orgId=getTreeSelectId();
				ajax($http,"/proxyService/frameService/queryRoleByOrg",params).then(function(res){
					if(res.rtnCode=="200"){
						console.log(res.data)
						var idselect=[];
						for(var key in res.data.roleSelect){ 
							idselect[key]=res.data.roleSelect[key].id;
					    }
						layui.use(['transfer', 'layer', 'util'], function(){
							  var $ = layui.$
							  ,layer = layui.layer
							  ,util = layui.util;
							  transfer = layui.transfer
							  //显示搜索框
							  transfer.render({
							    elem: '#roleList'
							    ,height: 400 //定义高度
							    ,data: res.data.roles
							    ,title: ['未选择', '以选择']
							    ,value: idselect
							    ,id:"roleList"
							    ,showSearch: true
							  })
						});
					}  
				});
		  }
		  function saveRole(userId,roleIds){
			  var params = {};
			  params.userId=userId;
			  params.roleIds=roleIds;
			  ajax($http,"/proxyService/frameService/saveUserRole",params).then(function(res){
					if(res.rtnCode=="200"){
						hide("modelRole");
					}
				});
		  }
		  function updatePassword(userId){
			  var params = {};
			  params.id=userId;
			  console.log(params.userId)
			  ajax($http,"/proxyService/frameService/updatePassword",params).then(function(res){
					if(res.rtnCode=="200"){
						showMes("success","重置成功，默认密码：111111");
					}else{
						showMes("info","重置失败");
					}
				});
		  }
		  return {
			  setRole:setRole,
			  getTreeList:getTreeList,
			  save:save,
			  deleteUser:deleteUser,
			  saveRole:saveRole,
			  updatePassword:updatePassword,
	    }
	  }
	])

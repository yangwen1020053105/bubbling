var table;
var tree;
var treefunc;
var services = angular.module('services', [])
services.factory('service', [
	  '$http',
	  function($http) {
		  function getTreeList(){
			  ajax($http,"/proxyService/frameService/getOrgList",null).then(function(res){
				  if(res.rtnCode=="200"){
					  layui.use('tree', function(){
						    tree = layui.tree
						    var inst1 = tree.render({
			                   elem: '#orgTree'  //绑定元素
						      ,click: query
						      ,data: toTreeJson(res.data,'id','pid','orgName','1')
						    });
						  });
				  }
			  });
		  }
		  var objBak;
		  function query(obj){
			  objBak=obj;
			  var params ={};
			  params.orgId=obj.data.id;
			  layui.use('table', function(){
				  table = layui.table;
				  table.render({
				    elem: '#table'
				    ,height: 'full-270'
				    ,limit:30
				    ,url: '/proxyService/frameService/getRoleByOrg' //数据接口
				    ,where: params
				    ,method: 'post'
				    ,contentType : 'application/json'
				    ,page: true //开启分页
				    ,cols: [[ //表头
				       {type:'radio'}
				      ,{field: 'id', title: 'ID',minWidth:100, sort: true}
				      ,{field: 'roleName', title: '角色名称',minWidth:100, sort: true}
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
		  function setRole(roleId){
			  var params = {};
			  params.id=roleId;
			  ajax($http,"/proxyService/frameService/queryFuncByRole",params).then(function(res){
					if(res.rtnCode=="200"){
						layui.use('tree', function(){
							   treefunc=layui.tree;
							   treefunc.render({
			                   elem: '#funcTree'  //绑定元素
						      ,data: toTreeJson(res.data.all,'id','pid','funcName','1')
						      ,id:"id"
						      ,showCheckbox:true
						    });
						  });
						var idselect=[];
						for(var key in res.data.select){ 
							idselect[key]=res.data.select[key].id;
					    }
						treefunc.setChecked("id",idselect);
					}else{
						showMes("info",res.rtnMsg);
					}
				});
		  }
		  function save(){
			    var params = arrToJson($("#manager").serializeArray());
			    params.orgId=getTreeSelectId();
				ajax($http,"/proxyService/frameService/saveOrUpdateRole",params).then(function(res){
					if(res.rtnCode=="200"){
						query(objBak);
						hide("model");
					}else{
						showMes("info",res.rtnMsg);
					}
				});
		  }
		  function saveRole(roleId){
			    var params = {};
			    var checkedData = treefunc.getChecked('id');
			    params.funcs=treetoArrJson(treefunc.getChecked('id'));
			    params.roleId=roleId;
				ajax($http,"/proxyService/frameService/saveFuncs",params).then(function(res){
					if(res.rtnCode=="200"){
						hide("modelRole");
					}else{
						showMes("info",res.rtnMsg);
					}
				});
		  }
		  function deleteRole(id){
			  var params = {};
			    params.id=id;
				ajax($http,"/proxyService/frameService/deleteRoleIsVaild",params).then(function(res){
					if(res.rtnCode=="200"){
						query(objBak);
						hide("modelDelete");
					}  
				});
		  }
		  return {
			  getTreeList:getTreeList,
			  save:save,
			  deleteRole:deleteRole,
			  setRole:setRole,
			  saveRole:saveRole,
	    }
	  }
	])

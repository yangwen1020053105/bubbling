
var app = angular.module('app', ['services'])
/**
 * controller定义
 */
app.controller('controller', [
  '$scope','$rootScope','service',
  function($scope,$rootScope,service) {
	  //初始化
	  service.getTreeList();
	  $scope.showAdd=function(){
		  if(getTreeSelectId()!=null&&getTreeSelectId()!=""){
			  $scope.role=null;
			  show("model","添加角色",550,300);
		  }else{
			  showMes("info","请选择部门！");
		  }
		  
	  }
	  $scope.showUpdate=function(){
		  var checkStatus = table.checkStatus('table');
		  $scope.role=null;
		  if(checkStatus.data.length!=0){
			  $scope.role=checkStatus.data[0];
			  show("model","修改角色",550,300);
		  }else{
			  showMes("info","请选择角色！");
		  }
	  }
	  $scope.showDelete=function(){
		  var checkStatus = table.checkStatus('table');
		  if(checkStatus.data.length!=0){
			  $scope.text=checkStatus.data[0].roleName;
			  show("modelDelete","删除角色",300,200);
		  }else{
			  showMes("info","请选择角色！");
		  }
		  
	  }
	  $scope.showRole=function(){
		  var checkStatus = table.checkStatus('table');
		  if(checkStatus.data.length!=0){
			  service.setRole(checkStatus.data[0].id);
			  show("modelRole","授予权限",300,500);
		  }else{
			  showMes("info","请选择角色！");
		  }
	  }
	  $scope.save=function(){
		  if(verificationForm("manager")){
			  service.save();
		  }
	  }
	  $scope.saveRole=function(){
		  var checkStatus = table.checkStatus('table');
		  service.saveRole(checkStatus.data[0].id);
	  }
	  
	  $scope.close=function(){
		  hide("modelDelete");
		  hide("model");
		  hide("modelRole");
	  }
	  $scope.ok=function(){
		  var checkStatus = table.checkStatus('table');
		  service.deleteRole(checkStatus.data[0].id);
	  }
  }
])
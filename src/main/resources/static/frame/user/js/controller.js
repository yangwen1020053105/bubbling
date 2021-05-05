
var userApp = angular.module('userApp', ['userServices'])
/**
 * controller定义
 */
userApp.controller('userController', [
  '$scope','$rootScope','user',
  function($scope,$rootScope,user) {
	  //初始化
	  user.getTreeList();
	  $scope.showAdd=function(){
		  fomrReset("manager");
		  $("#password").attr("verify", "required");
		  $("#repass").attr("verify", "required");
		  showEle("#passwordBox");
		  showEle("#repassBox");
		  show("model","添加用户",550,500);
	  }
	  $scope.showUpdate=function(){
		  var checkStatus = table.checkStatus('userTable');
		  fomrReset("manager");
		  if(checkStatus.data.length!=0){
			  $('input[name="id"]').val(checkStatus.data[0].id);
			  $('input[name="loginName"]').val(checkStatus.data[0].loginName);
			  $("#sex").val(checkStatus.data[0].sex);
			  $("#password").attr("verify", "");
			  $("#repass").attr("verify", "");
			  hideEle("#passwordBox");
			  hideEle("#repassBox");
			  $('input[name="userName"]').val(checkStatus.data[0].userName);
			  $('input[name="email"]').val(checkStatus.data[0].email);
			  $('input[name="phone"]').val(checkStatus.data[0].phone);
			  show("model","修改用户",550,500);
		  }else{
			  showMes("info","请选择数据！");
		  }
		  
	  }
	  $scope.showDelete=function(){
		  var checkStatus = table.checkStatus('userTable');
		  if(checkStatus.data.length!=0){
			  $scope.userNameText=checkStatus.data[0].userName;
			  show("modelDelete","删除用户",300,200);
		  }else{
			  showMes("info","请选择用户！");
		  }
		  
		  
	  }
	  $scope.showRole=function(){
		  var checkStatus = table.checkStatus('userTable');
		  if(checkStatus.data.length!=0){
			  show("modelRole","授予角色",600,600);
			  user.setRole(checkStatus.data[0].id);
		  }else{
			  showMes("info","请选择用户！");
		  }
		  
		  
	  }
	  $scope.saveRole=function(){
		  var getData = transfer.getData('roleList'); //获取右侧数据
	      console.log(JSON.stringify(getData))
		  var checkStatus = table.checkStatus('userTable');
		  if(checkStatus.data.length!=0){
			  user.saveRole(checkStatus.data[0].id,getData);
		  }else{
			  showMes("info","请选择用户！");
		  }
	  }
	  $scope.updatePassword=function(){
		  var checkStatus = table.checkStatus('userTable');
		  if(checkStatus.data.length!=0){
			  console.log(checkStatus.data[0].id)
			  user.updatePassword(checkStatus.data[0].id);
		  }else{
			  showMes("info","请选择用户！");
		  }
	  }
	  $scope.close=function(){
		  hide("modelDelete");
		  hide("model");
		  hide("modelRole");
	  }
	  $scope.ok=function(){
		  var checkStatus = table.checkStatus('userTable');
		  user.deleteUser(checkStatus.data[0].id);
	  }
	  $scope.save=function(){
		  if(verificationForm("manager")){
			  user.save();
		  }
	  }
  }
])
var orgApp = angular.module('orgApp', ['orgServices'])
/**
 * controller定义
 */
orgApp.controller('orgController', [
  '$scope','$rootScope','org',
  function($scope,$rootScope,org) {
	  //初始化
	  org.getTreeList();
	  $scope.save=function(){
		  org.saveOrg();
	  }
  }
])
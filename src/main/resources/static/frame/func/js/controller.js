var funcApp = angular.module('funcApp', ['funcServices'])
/**
 * controller定义
 */
funcApp.controller('funcController', [
  '$scope','$rootScope','func',
  function($scope,$rootScope,func) {
	  //初始化
	  func.getTreeList();
	  $scope.save=function(){
		  func.saveFunc();
	  }
	  
  }
])

var table;
var tree;
var treefunc;
var laydate;
var defaultValues;
var tableType="bqgl";
var frsfj1Id="";
var frsfj2Id="";
var jcglfjId="";
var jcglType="";
var courseTableCol;
var getCourseList;
var search;
/**
 * 模块初始化
 */
var modelType="course";
if(modelType=="course"){
	getCourseList="getCourseList";
	search="search";
	courseTableCol=[[ //表头
	    {type:'radio'}
	   ,{field: 'patientId', title: '病号'}
	   ,{field: 'name', title: '姓名'}
	   ,{field: 'sex', title: '性别', sort: true, toolbar: '#sexToolBar'} 
	   ,{field: 'address', title: '家庭住址'}
	   ,{field: 'age', title: '年龄',toolbar: '#ageToolBar'}
	   ,{field: 'phone', title: '电话'}
	   ,{field: 'isCollection', title: '收藏', templet: '#collection'}
	   ,{field: 'isToday', title: '今日就诊', templet: '#today'}
	 ]]
}else if(modelType=="allCourse"){
	getCourseList="getAllCourseList";
	search="searchAll";
	$(".moddelType").remove();
	courseTableCol=[[ //表头
	    {type:'radio'}
	   ,{field: 'patientId', title: '病号'}
	   ,{field: 'name', title: '姓名'}
	   ,{field: 'sex', title: '性别', sort: true, toolbar: '#sexToolBar'} 
	   ,{field: 'address', title: '家庭住址'}
	   ,{field: 'age', title: '年龄',toolbar: '#ageToolBar'}
	   ,{field: 'phone', title: '电话'}
	   ,{field: 'userId', title: '所属医师'}
	   ,{field: 'isCollection', title: '收藏', templet: '#collection'}
	 ]]
}else if(modelType=="collection"){
	getCourseList="getCourseListCollection";
	search="searchCollection";
	$(".moddelType").remove();
	courseTableCol=[[ //表头
	    {type:'radio'}
	   ,{field: 'patientId', title: '病号'}
	   ,{field: 'name', title: '姓名'}
	   ,{field: 'sex', title: '性别', sort: true, toolbar: '#sexToolBar'} 
	   ,{field: 'address', title: '家庭住址'}
	   ,{field: 'age', title: '年龄',toolbar: '#ageToolBar'}
	   ,{field: 'phone', title: '电话'}
	   ,{field: 'userId', title: '所属医师'}
	   ,{field: 'isCollection', title: '收藏', templet: '#collection'}
	 ]]
}else if(modelType=="today"){
	getCourseList="getCourseListToday";
	search="searchToday";
	courseTableCol=[[ //表头
	    {type:'radio'}
	   ,{field: 'patientId', title: '病号'}
	   ,{field: 'name', title: '姓名'}
	   ,{field: 'sex', title: '性别', sort: true, toolbar: '#sexToolBar'} 
	   ,{field: 'address', title: '家庭住址'}
	   ,{field: 'age', title: '年龄',toolbar: '#ageToolBar'}
	   ,{field: 'phone', title: '电话'}
	   ,{field: 'isCollection', title: '收藏', templet: '#collection'}
	   ,{field: 'isToday', title: '今日就诊', templet: '#today'}
	 ]]
}

var services = angular.module('services', [])
services.factory('service', [
	  '$http',
	  function($http) {
		  function initCourseTable(){
			//初始化表格
			  var params =null;
			  layui.use('table', function(){
				  table = layui.table;
				  table.render({
				    elem: '#courseTable'
				    ,height: '350'//full-230
				    ,url: '/proxyService/courseService/'+getCourseList //数据接口
				    ,where: params
				    ,method: 'post'
				    ,contentType : 'application/json'
				    ,page: true //开启分页
				    ,cols: courseTableCol
				    ,parseData: function(res){ //res 即为原始返回的数据
				    	if(res.rtnCode=="200"){
				    		return {
				    			"code": 0, //解析接口状态
				    		    "msg": "", //解析提示文本
				    		    "count": res.data.count, //解析数据长度
				    		    "data": res.data.list//解析数据列表
					          };
					        }else{
					    		showMes("info",res.rtnMsg);
					    	}
				    	}  
				  });
				  //监听单元格事件
				  table.on('row(courseTable)', function(obj){
				    var p={};
				    p.id=obj.data.id;
				    ajax($http,"/proxyService/courseService/queryBc",p).then(function(res){
			        	  if(res.rtnCode=="200"){
			        		  setData("bcTable",res.data);
			        		  setData("medicalTable",[]);
			        	  }else{
			        		  showMes("info",res.rtnMsg);
			        	  }
			        });
				    
				  });
				  table.render({
					    elem: '#bcTable'
					    ,height: 'full-660'
					    ,page: false //开启分页
					    ,cols: bcTableCol
					    ,data:[]
					  });
				  table.on('row(bcTable)', function(obj){
					    findList(obj.data.id);
					  });
				  table.render({
					    elem: '#medicalTable'
					    ,height: 'full-660'
					    ,page: false //开启分页
					    ,cols: medicalTableCol
					    ,data:[]
					  });
				  table.render({
					    elem: '#jcglTable'
					    ,height: 'full-660'
					    ,page: false //开启分页
					    ,cols: jcglTableCol
					    ,data:[]
					  });
				});
		  }
		  function findList(id){
			  var p={};
			  p.id=id;
			  ajax($http,"/proxyService/courseService/queryMedicalCourse",p).then(function(res){
		      	  if(res.rtnCode=="200"){
		      		  setData("medicalTable",res.data);
		      	  }else{
		      		  showMes("info",res.rtnMsg);
		      	  }
		      });
//			  ajax($http,"/proxyService/courseService/getJcglList",p).then(function(res){
//		      	  if(res.rtnCode=="200"){
//		      		  setData("jcglTable",res.data);
//		      	  }else{
//		      		  showMes("info",res.rtnMsg);
//		      	  }
//		      });
				  
			  
			  
		  }
		  function searchList(p){
			  layui.use('table', function(){
				  table = layui.table;
				  table.render({
				    elem: '#courseTable'
				    ,height: '350'
				    ,url: '/proxyService/courseService/'+search //数据接口
				    ,where: p
				    ,method: 'post'
				    ,contentType : 'application/json'
				    ,page: true //开启分页
				    ,cols: courseTableCol
				    ,parseData: function(res){ //res 即为原始返回的数据
				    	if(res.rtnCode=="200"){
				    		return {
				    			"code": 0, //解析接口状态
				    		    "msg": "", //解析提示文本
				    		    "count": res.data.count, //解析数据长度
				    		    "data": res.data.list//解析数据列表
					          };
					        }
				    	else{
				    		showMes("info",res.rtnMsg);
				    	}
				    	}  
				  });
				});
			  setData("bcTable",[]);
			  setData("medicalTable",[]);
          }
		  function getDictionaries($scope,$compile){
			//初始化下拉选择框
			  ajax($http,"/proxyService/courseService/queryDictionaries",null).then(function(res){
					if(res.rtnCode=="200"){
						setRadioOption("sex",res.data.sex,$scope,$compile);
						setRadioOption("addSex",res.data.sex,$scope,$compile);
						setRadioOption("sexShow",res.data.sex,$scope,$compile);
						setRadioOption("color",res.data.color,$scope,$compile);
						setRadioOption("liang",res.data.liang,$scope,$compile);
						setRadioOption("xk",res.data.xk,$scope,$compile);
						setRadioOption("yaosuan",res.data.ys,$scope,$compile);
						setRadioOption("rz",res.data.rz,$scope,$compile);
						$scope.maritalStatusValue=res.data.maritalStatus;
						$scope.fertilityRequirementValue=res.data.fertilityRequirement;
						$scope.contraceptionStatusValue=res.data.contraceptionStatus;
						$scope.medicineAccessValue=res.data.medicineAccess;
						setSelectOption("tj",res.data.tj)
						setSelectOption("zd",res.data.zd)
						setSelectOption("zdSearch",res.data.zd)
						var formSelects = layui.formSelects;
				        formSelects.render();
				        formSelects.filter('zd',function(id, inputVal, val, isDisabled){
				        	var py=pinyin.getCamelChars(val.name);
				        	var pyxx=py.toLowerCase();
				        	if(py.indexOf(inputVal)!=-1||pyxx.indexOf(inputVal)!=-1){
				        		return false;
				        	}else{
				        		return true;
				        	}
				            
				        }); 
				        formSelects.filter('zdSearch',function(id, inputVal, val, isDisabled){
				        	var py=pinyin.getCamelChars(val.name);
				        	var pyxx=py.toLowerCase();
				        	if(py.indexOf(inputVal)!=-1||pyxx.indexOf(inputVal)!=-1){
				        		return false;
				        	}else{
				        		return true;
				        	}
				            
				        }); 
					}else{
						showMes("info",res.rtnMsg);
					}
				});
		  }
		  function setRadioOption(id,data,$scope,$compile){
		  		var options = "";
		  		var modelVal=$('#'+id).attr("modelVal");
		  		var modelId=$('#'+id).attr("modelId");
		  		if(data!=null){
		  			for (var i = 0; i < data.length; i++) {
		  				options = "<input type='radio' name='"+id+"' ng-model='"+modelVal+"."+modelId+"' value='"+data[i].val+"' title='"+data[i].display+"'/>";
		  				$('#'+id).append($compile(options)($scope))
		  			}
		  		}
		  	}
		  function setSelectOption(id,data){
		  		var options = "";
		  		if(data!=null){
		  			for (var i = 0; i < data.length; i++) {
		  				options = "<option value='"+data[i].val+"'>"+data[i].display+"</option>";
		  				$('#'+id).append(options)
		  			}
		  		}
		  	}
		  function init(){
			  //初始化默认值
			  ajax($http,"/proxyService/courseService/queryDefaultValue",null).then(function(res){
				  if(res.rtnCode=="200"){
					  defaultValues=res.data;
				  }else{
					  showMes("info",res.rtnMsg);
				  }
			  });
			  //初始化上传组件
			  layui.use('upload', function(){
				  var upload = layui.upload;
				  var uploadInst1 = upload.render({
				    elem: '#fjone' //绑定元素
				    ,url: '/empty.do' //上传接口
				    ,accept: 'file'
				    ,before: function(obj){
				      //预读本地文件示例，不支持ie8
				      obj.preview(function(index, file, result){
				        $("#fj1").val(result)
				        $("#fj1").change()
				      });
				    }
				    ,done: function(res){
				          
				    }
				    ,error: function(){
				    	
				    }
				  });
				  var uploadInst2 = upload.render({
					    elem: '#fjtwo' //绑定元素
					    ,url: '/empty.do' //上传接口
					    ,accept: 'file'
					    ,before: function(obj){
					      //预读本地文件示例，不支持ie8
					      obj.preview(function(index, file, result){
					        $("#fj2").val(result)
					        $("#fj2").change();
					      });
					    }
					    ,done: function(res){
					          
					    }
					    ,error: function(){
					    	
					    }
					  });
				  var uploadInst3 = upload.render({
					    elem: '#frsfjone' //绑定元素
					    ,url: '/empty.do' //上传接口
					    ,accept: 'file'
					    ,before: function(obj){
					      //预读本地文件示例，不支持ie8
					      obj.preview(function(index, file, result){
					        var frs=layui.table.cache["frs"];
					        for(var i = 0; i < frs.length; i++){ 
					        	  if(frs[i].id==frsfj1Id){
					        		  frs[i].fj1=result;
					        	  }
					        	 
					        }
					        setData('frs',frs);
					      });
					    }
					    ,done: function(res){
					          
					    }
					    ,error: function(){
					    	
					    }
					  });
				  var uploadInst4 = upload.render({
					    elem: '#frsfjtwo' //绑定元素
					    ,url: '/empty.do' //上传接口
					    ,accept: 'file'
					    ,before: function(obj){
					      //预读本地文件示例，不支持ie8
					      obj.preview(function(index, file, result){
					        var frs=layui.table.cache["frs"];
					        for(var i = 0; i < frs.length; i++){ 
					        	  if(frs[i].id==frsfj2Id){
					        		  frs[i].fj2=result;
					        	  }
					        	 
					        }
					        setData('frs',frs);
					      });
					    }
					    ,done: function(res){
					          
					    }
					    ,error: function(){
					    	
					    }
					  });
				  var jcglLoad = upload.render({
					    elem: '#jcglfj' //绑定元素
					    ,url: '/empty.do' //上传接口
					    ,accept: 'file'
					    ,before: function(obj){
					      //预读本地文件示例，不支持ie8
					      obj.preview(function(index, file, result){
					        if(jcglType==1){
					        	var arr=layui.table.cache["jcgl"];
					        	for(var i = 0; i < arr.length; i++){ 
						        	  if(arr[i].id==jcglfjId){
						        		  arr[i].fj1=result;
						        	  } 
						        }
					        	setData('jcgl',arr);
					        }else if(jcglType==2){
					        	var arr=layui.table.cache["jcgl"];
					        	for(var i = 0; i < arr.length; i++){ 
						        	  if(arr[i].id==jcglfjId){
						        		  arr[i].fj2=result;
						        	  } 
						        }
					        	setData('jcgl',arr);
					        }else if(jcglType==3){
					        	var arr=layui.table.cache["fkjc"];
					        	for(var i = 0; i < arr.length; i++){ 
						        	  if(arr[i].id==jcglfjId){
						        		  arr[i].fj=result;
						        	  } 
						        }
					        	setData('fkjc',arr);
					        }
					        
					      });
					    }
					    ,done: function(res){
					          
					    }
					    ,error: function(){
					    	
					    }
					  });
				});
			  
			  //初始化时间选择器
			  layui.use('laydate', function(){
				  laydate = layui.laydate;
				  laydate.render({
				    elem: '#visitingTime'	
				    ,type: 'datetime'
				  });
				  laydate.render({
					    elem: '#bqglTime'	
					    ,type: 'datetime'
					  });
				  laydate.render({
					    elem: '#jcglTime'	
					    ,type: 'datetime'
					  });
				  laydate.render({
						elem: '#bqgcTime'	
						,type: 'datetime'
					  });
				});
			  initCourseTable();
			  layui.use('table', function(){
				  table = layui.table;
				  //白带常规
				  table.render({
				    elem: '#bdcg'
				    ,height: 200
				    ,limit: 10000
				    ,page: false //开启分页
				    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
				    ,cols: bdcgCol
				    ,data:[]
				  });
				  //妇科检查
				  table.render({
				    elem: '#fkjc'
				    ,height: 200
				    ,limit: 10000
				    ,page: false //开启分页
				    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
				    ,cols: fkjcCol
				    ,data:[]
				  });
				  //HPV、TCT、电子阴道镜
				  table.render({
					    elem: '#dzydj'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: dzydjCol
					    ,data:[]
					  });
				  //支原体
				  table.render({
					    elem: '#zyt'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: zytCol
					    ,data:[]
					  });
				  //B超—非妊娠
				  table.render({
					    elem: '#frs'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: frsCol
					    ,data:[]
					  });
				  //B超—妊娠期
				  table.render({
					    elem: '#rsq'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: rsqCol
					    ,data:[]
					  });
				  //性激素六项
				  table.render({
					    elem: '#xjslx'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: xjslxCol
					    ,data:[]
					  });
				  //孕三项
				  table.render({
					    elem: '#ysx'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: ysxCol
					    ,data:[]
					  });
				  //HCG
				  table.render({
					    elem: '#hcg'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: hcgCol
					    ,data:[]
					  });
				  //AMH
				  table.render({
					    elem: '#amh'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: amhCol
					    ,data:[]
					  });
				  //甲功
				  table.render({
					    elem: '#jg'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: jgCol
					    ,data:[]
					  });
				  //优生五项(TORCH)
				  table.render({
					    elem: '#yswx'
					    ,height: 200
					    ,limit: 10000
					    ,cellMinWidth:100
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: yswxCol
					    ,data:[]
					  });
				  //叶酸
				  table.render({
					    elem: '#ys'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: ysCol
					    ,data:[]
					  });
				  //生殖免疫抗体
				  table.render({
					    elem: '#szmykt'
					    ,height: 200
					    ,limit: 10000
					    ,cellMinWidth:150
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: szmyktCol
					    ,data:[]
					  });
				  //凝血功能
				  table.render({
					    elem: '#nxgn'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: nxgnCol
					    ,data:[]
					  });
				  //输卵管检查
				  table.render({
					    elem: '#slgjc'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: slgjcCol
					    ,data:[]
					  });
				  //精液常规+顶体酶
				  table.render({
					    elem: '#jycg'
					    ,width : 'auto'
					    ,height: 200
					    ,limit: 10000
					    ,cellMinWidth:150
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: jycgCol 
					    ,data:[]
					  });
				  //其他
				  table.render({
					    elem: '#qt'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: qtCol
					    ,data:[]
					  });
				  //病情概览
				  table.render({
					    elem: '#bqgl'
					    ,height: 600
					    ,page: false //开启分页
//					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: bqglCol
					    ,data:[]
					  });
				//检查概览
				  table.render({
					    elem: '#jcgl'
					    ,height: 600
					    ,limit: 10000
					    ,page: false //开启分页
					    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
					    ,cols: jcglCol
					    ,data:[]
					  });
				//病情观察
				  table.render({
					    elem: '#bqgc'
					    ,height: 500
					    ,limit: 10000
					    ,page: false //开启分页
					    ,cols: bqgcCol
					    ,data:[]
					  });
				  //检查概览
				//白带常规
				  table.render({
				    elem: '#bdcgGl'
				    ,height: 200
				    ,limit: 10000
				    ,page: false //开启分页
				    ,cols: bdcgCol
				    ,data:[]
				  });
				  //妇科检查
				  table.render({
				    elem: '#fkjcGl'
				    ,height: 200
				    ,limit: 10000
				    ,page: false //开启分页
				    
				    ,cols: fkjcCol
				    ,data:[]
				  });
				  //HPV、TCT、电子阴道镜
				  table.render({
					    elem: '#dzydjGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: dzydjCol
					    ,data:[]
					  });
				  //支原体
				  table.render({
					    elem: '#zytGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: zytCol
					    ,data:[]
					  });
				  //B超—非妊娠
				  table.render({
					    elem: '#frsGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: frsCol
					    ,data:[]
					  });
				  //B超—妊娠期
				  table.render({
					    elem: '#rsqGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: rsqCol
					    ,data:[]
					  });
				  //性激素六项
				  table.render({
					    elem: '#xjslxGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: xjslxCol
					    ,data:[]
					  });
				  //孕三项
				  table.render({
					    elem: '#ysxGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: ysxCol
					    ,data:[]
					  });
				  //HCG
				  table.render({
					    elem: '#hcgGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: hcgCol
					    ,data:[]
					  });
				  //AMH
				  table.render({
					    elem: '#amhGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: amhCol
					    ,data:[]
					  });
				  //甲功
				  table.render({
					    elem: '#jgGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: jgCol
					    ,data:[]
					  });
				  //优生五项(TORCH)
				  table.render({
					    elem: '#yswxGl'
					    ,height: 200
					    ,limit: 10000
					    ,cellMinWidth:100
					    ,page: false //开启分页
					    
					    ,cols: yswxCol
					    ,data:[]
					  });
				  //叶酸
				  table.render({
					    elem: '#ysGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: ysCol
					    ,data:[]
					  });
				  //生殖免疫抗体
				  table.render({
					    elem: '#szmyktGl'
					    ,height: 200
					    ,limit: 10000
					    ,cellMinWidth:150
					    ,page: false //开启分页
					    
					    ,cols: szmyktCol
					    ,data:[]
					  });
				  //凝血功能
				  table.render({
					    elem: '#nxgnGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: nxgnCol
					    ,data:[]
					  });
				  //输卵管检查
				  table.render({
					    elem: '#slgjcGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: slgjcCol
					    ,data:[]
					  });
				  //精液常规+顶体酶
				  table.render({
					    elem: '#jycgGl'
					    ,width : 'auto'
					    ,height: 200
					    ,limit: 10000
					    ,cellMinWidth:150
					    ,page: false //开启分页
					    
					    ,cols: jycgCol 
					    ,data:[]
					  });
				  //其他
				  table.render({
					    elem: '#qtGl'
					    ,height: 200
					    ,limit: 10000
					    ,page: false //开启分页
					    
					    ,cols: qtCol
					    ,data:[]
					  });
				  table.on('tool(fuzjFilter)', function (obj) {
		            	var data = obj.data;
		            	var newdata = {};
		            	if (obj.event === 'date') {
		            	var field = $(this).data('field');
		            	laydate.render({
		            	elem: this.firstChild
		            	,type:'datetime'
		            	, show: true //直接显示
		            	, closeStop: this
		            	, done: function (value, date) {
		            	newdata[field] = value;
		            	obj.update(newdata);
		            	}
		            	});
		            	}
		            });
				  
				});	  
			  
		  }
		  function addCourse($scope,medicalId){
			  var p={};
			  p.medicalId=medicalId;
			  ajax($http,"/proxyService/courseService/getCourseInforUp",p).then(function(res){
		      	  if(res.rtnCode=="200"){
		      		closeCheckBox();
		      		if(res.data.medical!=null){
		      			res.data.medical.visitingTime=transferTime(res.data.medical.visitingTime);
		      		}
					$scope.medical=res.data.medical;
					if(res.data.panel!=null){
						$scope.panel=res.data.panel;
					}else{
						$scope.panel={panelStr:""};
					}
					if(res.data.panel!=null&&res.data.panel.panelStr!=""){
						var arr=res.data.panel.panelStr.split(",");
						for (var a in arr) {
							if(!$("#"+arr[a]).prop("checked")){
								$("#"+arr[a]).next().click();
							}
						}
					}
					$scope.zjfj=res.data.zjfj;
					$scope.xbs=res.data.xbs;
					$scope.yjs=res.data.yjs;
					$scope.dx=res.data.dx;
					$scope.ycs=res.data.ycs;
					$scope.chqk=res.data.chqk;
					$scope.jws=res.data.jws;
					$scope.grs=res.data.grs;
					$scope.tgjc=res.data.tgjc;
					putNul();
					if(res.data.bdcg.length!=0){
						$("#bdcgSelect").next().click();
					}
					setData('bdcg',res.data.bdcg);
					if(res.data.bdcg.length!=0){
						$("#fkjcSelect").next().click();
					}
					setData('fkjc',res.data.fkjc);
					if(res.data.dzydj.length!=0){
						$("#dzydjSelect").next().click();
					}
					setData('dzydj',res.data.dzydj);
					if(res.data.zyt.length!=0){
						$("#zytSelect").next().click();
					}
					setData('zyt',res.data.zyt);
					if(res.data.frs.length!=0){
						$("#frsSelect").next().click();
					}
					setData('frs',res.data.frs);
					if(res.data.rsq.length!=0){
						$("#rsqSelect").next().click();
					}
					setData('rsq',res.data.rsq);
					if(res.data.xjslx.length!=0){
						$("#xjslxSelect").next().click();
					}
					setData('xjslx',res.data.xjslx);
					if(res.data.ysx.length!=0){
						$("#ysxSelect").next().click();
					}
					setData('ysx',res.data.ysx);
					if(res.data.hcg.length!=0){
						$("#hcgSelect").next().click();
					}
					setData('hcg',res.data.hcg);
					if(res.data.amh.length!=0){
						$("#amhSelect").next().click();
					}
					setData('amh',res.data.amh);
					if(res.data.jg.length!=0){
						$("#jgSelect").next().click();
					}
					setData('jg',res.data.jg);
					if(res.data.yswx.length!=0){
						$("#yswxSelect").next().click();
					}
					setData('yswx',res.data.yswx);
					if(res.data.ys.length!=0){
						$("#ysSelect").next().click();
					}
					setData('ys',res.data.ys);
					if(res.data.szmykt.length!=0){
						$("#szmyktSelect").next().click();
					}
					setData('szmykt',res.data.szmykt);
					if(res.data.nxgn.length!=0){
						$("#nxgnSelect").next().click();
					}
					setData('nxgn',res.data.nxgn);
					if(res.data.slgjc.length!=0){
						$("#slgjcSelect").next().click();
					}
					setData('slgjc',res.data.slgjc);
					if(res.data.jycg.length!=0){
						$("#jycgSelect").next().click();
					}
					setData('jycg',res.data.jycg);
					if(res.data.qt.length!=0){
						$("#qtSelect").next().click();
					}
					setData('qt',res.data.qt);
					//检查概览
					if(res.data.bdcgGl.length!=0){
						$("#bdcgPanelGl").removeClass("hide");
					}else{
						$("#bdcgPanelGl").addClass("hide");
					}
					setDataGl('bdcgGl',res.data.bdcgGl);
					if(res.data.bdcgGl.length!=0){
						$("#fkjcPanelGl").removeClass("hide");
					}else{
						$("#fkjcPanelGl").addClass("hide");
					}
					setDataGl('fkjcGl',res.data.fkjcGl);
					if(res.data.dzydjGl.length!=0){
						$("#dzydjPanelGl").removeClass("hide");
					}else{
						$("#dzydjPanelGl").addClass("hide");
					}
					setDataGl('dzydjGl',res.data.dzydjGl);
					if(res.data.zytGl.length!=0){
						$("#zytPanelGl").removeClass("hide");
					}else{
						$("#zytPanelGl").addClass("hide");
					}
					setDataGl('zytGl',res.data.zytGl);
					if(res.data.frsGl.length!=0){
						$("#frsPanelGl").removeClass("hide");
					}else{
						$("#frsPanelGl").addClass("hide");
					}
					setDataGl('frsGl',res.data.frsGl);
					if(res.data.rsqGl.length!=0){
						$("#rsqPanelGl").removeClass("hide");
					}else{
						$("#rsqPanelGl").addClass("hide");
					}
					setDataGl('rsqGl',res.data.rsqGl);
					if(res.data.xjslxGl.length!=0){
						$("#xjslxPanelGl").removeClass("hide");
					}else{
						$("#xjslxPanelGl").addClass("hide");
					}
					setDataGl('xjslxGl',res.data.xjslxGl);
					if(res.data.ysxGl.length!=0){
						$("#ysxPanelGl").removeClass("hide");
					}else{
						$("#ysxPanelGl").addClass("hide");
					}
					setDataGl('ysxGl',res.data.ysxGl);
					if(res.data.hcgGl.length!=0){
						$("#hcgPanelGl").removeClass("hide");
					}else{
						$("#hcgPanelGl").addClass("hide");
					}
					setDataGl('hcgGl',res.data.hcgGl);
					if(res.data.amhGl.length!=0){
						$("#amhPanelGl").removeClass("hide");
					}else{
						$("#amhPanelGl").addClass("hide");
					}
					setDataGl('amhGl',res.data.amhGl);
					if(res.data.jgGl.length!=0){
						$("#jgPanelGl").removeClass("hide");
					}else{
						$("#jgPanelGl").addClass("hide");
					}
					setDataGl('jgGl',res.data.jgGl);
					if(res.data.yswxGl.length!=0){
						$("#yswxPanelGl").removeClass("hide");
					}else{
						$("#yswxPanelGl").addClass("hide");
					}
					setDataGl('yswxGl',res.data.yswxGl);
					if(res.data.ysGl.length!=0){
						$("#ysPanelGl").removeClass("hide");
					}else{
						$("#ysPanelGl").addClass("hide");
					}
					setDataGl('ysGl',res.data.ysGl);
					if(res.data.szmyktGl.length!=0){
						$("#szmyktPanelGl").removeClass("hide");
					}else{
						$("#szmyktPanelGl").addClass("hide");
					}
					setDataGl('szmyktGl',res.data.szmyktGl);
					if(res.data.nxgnGl.length!=0){
						$("#nxgnPanelGl").removeClass("hide");
					}else{
						$("#nxgnPanelGl").addClass("hide");
					}
					setDataGl('nxgnGl',res.data.nxgnGl);
					if(res.data.slgjcGl.length!=0){
						$("#slgjcPanelGl").removeClass("hide");
					}else{
						$("#slgjcPanelGl").addClass("hide");
					}
					setDataGl('slgjcGl',res.data.slgjcGl);
					if(res.data.jycgGl.length!=0){
						$("#jycgPanelGl").removeClass("hide");
					}else{
						$("#jycgPanelGl").addClass("hide");
					}
					setDataGl('jycgGl',res.data.jycgGl);
					if(res.data.qtGl.length!=0){
						$("#qtPanelGl").removeClass("hide");
					}else{
						$("#qtPanelGl").addClass("hide");
					}
					setDataGl('qtGl',res.data.qtGl);
					
					//--------
					$scope.zd=res.data.zd;
					$scope.cl=res.data.cl;
					if(res.data.bqgl!=null){
						res.data.bqgl.time=transferTime(res.data.bqgl.time);
		      		}
					$scope.bqgl=res.data.bqgl;
					if(res.data.jcgl!=null){
						res.data.jcgl.time=transferTime(res.data.jcgl.time);
		      		}
//					setData('jcgl',res.data.jcgl);
					setData('bqgc',res.data.bqgc);
					setData('bqgl',res.data.bqglTable);
					$scope.medical.visitingAddress=defaultValues.visitingAddress;
					setTimeout(function() {
						  layui.form.render();
						  cxShow($(".cx"));
						  cxShow($(".lpm")[0]);
						  cxShow($(".lpm")[1]);
						  cxShow($(".lpm")[2]);
					  }, 100)
		      	  }else{
		      		  showMes("info",res.rtnMsg);
		      	  }
		      });
			  
//			  closeCheckBox();
//			  $scope.panel={};
//			  $scope.medical={};
//			  $scope.zjfj={};
//			  $scope.xbs={};
//			  $scope.yjs={};
//			  $scope.dx={};
//			  $scope.ycs={};
//			  $scope.chqk={};
//			  $scope.jws={};
//			  $scope.grs={};
//			  putNul();
//			  $scope.zd={};
//			  $scope.cl={};
//			  $scope.medical={visitingTime: getNowDate(),visitingAddress:defaultValues.visitingAddress,sex:'2'};
//			  $scope.ycs={czqk:'xxxx年顺产1子'};
//			  setTimeout(function() {
//				  layui.form.render()
//			  }, 1000)
//			  show("model","添加病历",$(document.body).width(),$(document.body).height(),0,0);
		  }
		  function save(params,searchP){
			  
			  ajax($http,"/proxyService/courseService/save",params).then(function(res){
					if(res.rtnCode=="200"){
						var checkStatus = table.checkStatus('bcTable');
						var medicalId=checkStatus.data[0].id;
						findList(medicalId);
						showMes("success","保存成功!");
					}else{
						showMes("info",res.rtnMsg);
					}
				});
		  }
		  function getCourse(id,$scope){
			  var params ={};
			  params.id=id;
			  ajax($http,"/proxyService/courseService/getCourseInfor",params).then(function(res){
					if(res.rtnCode=="200"){
						res.data.medical.visitingTime=transferTime(res.data.medical.visitingTime);
						$scope.medical=res.data.medical;
						$scope.panel=res.data.panel;
						if(res.data.panel!=null&&res.data.panel.panelStr!=""){
							var arr=res.data.panel.panelStr.split(",");
							for (var a in arr) {
								if(!$("#"+arr[a]).prop("checked")){
									$("#"+arr[a]).next().click();
								}
							}
						}
						$scope.zjfj=res.data.zjfj;
						$scope.xbs=res.data.xbs;
						$scope.yjs=res.data.yjs;
						$scope.dx=res.data.dx;
						$scope.ycs=res.data.ycs;
						$scope.chqk=res.data.chqk;
						$scope.jws=res.data.jws;
						$scope.grs=res.data.grs;
						$scope.tgjc=res.data.tgjc;
						if(res.data.bdcg.length!=0){
							$("#bdcgSelect").next().click();
						}
						setData('bdcg',res.data.bdcg);
						if(res.data.fkjc.length!=0){
							$("#fkjcSelect").next().click();
						}
						setData('fkjc',res.data.fkjc);
						if(res.data.dzydj.length!=0){
							$("#dzydjSelect").next().click();
						}
						setData('dzydj',res.data.dzydj);
						if(res.data.zyt.length!=0){
							$("#zytSelect").next().click();
						}
						setData('zyt',res.data.zyt);
						if(res.data.frs.length!=0){
							$("#frsSelect").next().click();
						}
						setData('frs',res.data.frs);
						if(res.data.rsq.length!=0){
							$("#rsqSelect").next().click();
						}
						setData('rsq',res.data.rsq);
						if(res.data.xjslx.length!=0){
							$("#xjslxSelect").next().click();
						}
						setData('xjslx',res.data.xjslx);
						if(res.data.ysx.length!=0){
							$("#ysxSelect").next().click();
						}
						setData('ysx',res.data.ysx);
						if(res.data.hcg.length!=0){
							$("#hcgSelect").next().click();
						}
						setData('hcg',res.data.hcg);
						if(res.data.amh.length!=0){
							$("#amhSelect").next().click();
						}
						setData('amh',res.data.amh);
						if(res.data.jg.length!=0){
							$("#jgSelect").next().click();
						}
						setData('jg',res.data.jg);
						if(res.data.yswx.length!=0){
							$("#yswxSelect").next().click();
						}
						setData('yswx',res.data.yswx);
						if(res.data.ys.length!=0){
							$("#ysSelect").next().click();
						}
						setData('ys',res.data.ys);
						if(res.data.szmykt.length!=0){
							$("#szmyktSelect").next().click();
						}
						setData('szmykt',res.data.szmykt);
						if(res.data.nxgn.length!=0){
							$("#nxgnSelect").next().click();
						}
						setData('nxgn',res.data.nxgn);
						if(res.data.slgjc.length!=0){
							$("#slgjcSelect").next().click();	
						}
						setData('slgjc',res.data.slgjc);
						if(res.data.jycg.length!=0){
							$("#jycgSelect").next().click();	
						}
						setData('jycg',res.data.jycg);
						if(res.data.qt.length!=0){
							$("#qtSelect").next().click();
						}
						setData('qt',res.data.qt);
						//检查概览
						if(res.data.bdcgGl.length!=0){
							$("#bdcgPanelGl").removeClass("hide");
						}else{
							$("#bdcgPanelGl").addClass("hide");
						}
						setDataGl('bdcgGl',res.data.bdcgGl);
						if(res.data.fkjcGl.length!=0){
							$("#fkjcPanelGl").removeClass("hide");
						}else{
							$("#fkjcPanelGl").addClass("hide");
						}
						setDataGl('fkjcGl',res.data.fkjcGl);
						if(res.data.dzydjGl.length!=0){
							$("#dzydjPanelGl").removeClass("hide");
						}else{
							$("#dzydjPanelGl").addClass("hide");
						}
						setDataGl('dzydjGl',res.data.dzydjGl);
						if(res.data.zytGl.length!=0){
							$("#zytPanelGl").removeClass("hide");
						}else{
							$("#zytPanelGl").addClass("hide");
						}
						setDataGl('zytGl',res.data.zytGl);
						if(res.data.frsGl.length!=0){
							$("#frsPanelGl").removeClass("hide");
						}else{
							$("#frsPanelGl").addClass("hide");
						}
						setDataGl('frsGl',res.data.frsGl);
						if(res.data.rsqGl.length!=0){
							$("#rsqPanelGl").removeClass("hide");
						}else{
							$("#rsqPanelGl").addClass("hide");
						}
						setDataGl('rsqGl',res.data.rsqGl);
						if(res.data.xjslxGl.length!=0){
							$("#xjslxPanelGl").removeClass("hide");
						}else{
							$("#xjslxPanelGl").addClass("hide");
						}
						setDataGl('xjslxGl',res.data.xjslxGl);
						if(res.data.ysxGl.length!=0){
							$("#ysxPanelGl").removeClass("hide");
						}else{
							$("#ysxPanelGl").addClass("hide");
						}
						setDataGl('ysxGl',res.data.ysxGl);
						if(res.data.hcgGl.length!=0){
							$("#hcgPanelGl").removeClass("hide");
						}else{
							$("#hcgPanelGl").addClass("hide");
						}
						setDataGl('hcgGl',res.data.hcgGl);
						if(res.data.amhGl.length!=0){
							$("#amhPanelGl").removeClass("hide");
						}else{
							$("#amhPanelGl").addClass("hide");
						}
						setDataGl('amhGl',res.data.amhGl);
						if(res.data.jgGl.length!=0){
							$("#jgPanelGl").removeClass("hide");
						}else{
							$("#jgPanelGl").addClass("hide");
						}
						setDataGl('jgGl',res.data.jgGl);
						if(res.data.yswxGl.length!=0){
							$("#yswxPanelGl").removeClass("hide");
						}else{
							$("#yswxPanelGl").addClass("hide");
						}
						setDataGl('yswxGl',res.data.yswxGl);
						if(res.data.ysGl.length!=0){
							$("#ysPanelGl").removeClass("hide");
						}else{
							$("#ysPanelGl").addClass("hide");
						}
						setDataGl('ysGl',res.data.ysGl);
						if(res.data.szmyktGl.length!=0){
							$("#szmyktPanelGl").removeClass("hide");
						}else{
							$("#szmyktPanelGl").addClass("hide");
						}
						setDataGl('szmyktGl',res.data.szmyktGl);
						if(res.data.nxgnGl.length!=0){
							$("#nxgnPanelGl").removeClass("hide");
						}else{
							$("#nxgnPanelGl").addClass("hide");
						}
						setDataGl('nxgnGl',res.data.nxgnGl);
						if(res.data.slgjcGl.length!=0){
							$("#slgjcPanelGl").removeClass("hide");
						}else{
							$("#slgjcPanelGl").addClass("hide");
						}
						setDataGl('slgjcGl',res.data.slgjcGl);
						if(res.data.jycgGl.length!=0){
							$("#jycgPanelGl").removeClass("hide");
						}else{
							$("#jycgPanelGl").addClass("hide");
						}
						setDataGl('jycgGl',res.data.jycgGl);
						if(res.data.qtGl.length!=0){
							$("#qtPanelGl").removeClass("hide");
						}else{
							$("#qtPanelGl").addClass("hide");
						}
						setDataGl('qtGl',res.data.qtGl);
						
						//--------
						$scope.zd=res.data.zd;
						$scope.cl=res.data.cl;
						if(res.data.bqgl!=null){
							res.data.bqgl.time=transferTime(res.data.bqgl.time);
						}
						$scope.bqgl=res.data.bqgl;
						setData('bqgl',res.data.bqglTable);
//						setData('jcgl',res.data.jcgl);
						setData('bqgc',res.data.bqgc);
						editor.setValue(res.data.bqgc.bqgc);
						setTimeout(function() {
							  layui.form.render();
							  cxShow($(".cx"));
							  cxShow($(".lpm")[0]);
							  cxShow($(".lpm")[1]);
							  cxShow($(".lpm")[2]);
						  }, 1000)
					}else{
						showMes("info",res.rtnMsg);
					}
				});
		  }
		  function queryBqgl(mid){
			  var params ={};
			  params.mid=mid;
			  layui.use('table', function(){
				  table = layui.table;
				  table.render({
				    elem: '#bqglTable'
				    ,height: 'full-170'
				    ,url: '/proxyService/courseService/getBqglList' //数据接口
				    ,where: params
				    ,method: 'post'
				    ,contentType : 'application/json'
				    ,page: true //开启分页
				    ,cols: [[ //表头
				       {type:'radio'}
				      ,{field: 'time',minWidth:150, title: '时间',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
				      ,{field: 'zc', title: '诊次'}
				      ,{field: 'zz', title: '主证'} 
				      ,{field: 'cz', title: '次证、兼证'}
				      ,{field: 'sm', title: '舌脉'}
				      ,{field: 'zd', title: '诊断'}
				      ,{field: 'zl', title: '治疗'}
				    ]]
				    ,parseData: function(res){ //res 即为原始返回的数据
				    	if(res.rtnCode=="200"){
				    		return {
				    			"code": 0, //解析接口状态
				    		    "msg": "", //解析提示文本
				    		    "count": res.data.count, //解析数据长度
				    		    "data": res.data.list//解析数据列表
					          };
					        }else{
					    		showMes("info",res.rtnMsg);
					    	}
				    	}  
				  });
				});
		  }
		  function queryJcgl(mid){
			  var params ={};
			  params.mid=mid;
			  layui.use('table', function(){
				  table = layui.table;
				  table.render({
				    elem: '#jcglTable'
				    ,height: 'full-170'
				    ,url: '/proxyService/courseService/getJcglList' //数据接口
				    ,where: params
				    ,method: 'post'
				    ,contentType : 'application/json'
				    ,page: true //开启分页
				    ,cols: [[ //表头
				       {type:'radio'}
				      ,{field: 'time',minWidth:150, title: '时间',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
				      ,{field: 'yjzq', title: '诊次'}
				      ,{field: 'zg', title: '主证'} 
				      ,{field: 'nm', title: '次证、兼证'}
				      ,{field: 'fj1', title: '附件一', toolbar: '#fj1Bar'}
				      ,{field: 'fj2', title: '附件二', toolbar: '#fj2Bar'}
				      ,{field: 'qt', title: '诊断'}
				    ]]
				    ,parseData: function(res){ //res 即为原始返回的数据
				    	if(res.rtnCode=="200"){
				    		return {
				    			"code": 0, //解析接口状态
				    		    "msg": "", //解析提示文本
				    		    "count": res.data.count, //解析数据长度
				    		    "data": res.data.list//解析数据列表
					          };
					        }else{
					    		showMes("info",res.rtnMsg);
					    	}
				    	}  
				  });
				});
		  }
		  function saveBqgl(p){
			  ajax($http,"/proxyService/courseService/saveBqgl",p).then(function(res){
				  if(res.rtnCode=="200"){
					  showMes("success","保存成功！");
				  }else{
					  showMes("info",res.rtnMsg);
				  }
			  });
		  }
          function saveJcgl(p){
        	  ajax($http,"/proxyService/courseService/saveJcgl",p).then(function(res){
        		  if(res.rtnCode=="200"){
					  showMes("success","保存成功！");
				  }else{
					  showMes("info",res.rtnMsg);
				  }
			  });
		  }
          function delCourse(id,searchP){
        	  var params ={};
			  params.id=id;
        	  ajax($http,"/proxyService/courseService/delCourse",params).then(function(res){
        		  if(res.rtnCode=="200"){
        			  var checkStatus = table.checkStatus('bcTable');
					  var medicalId=checkStatus.data[0].id;
					  findList(medicalId);
					  showMes("success","删除成功！");
				  }else{
					  showMes("info",res.rtnMsg);
				  }
			  });
          }
          function delBaseInfo(id,searchP){
        	  var params ={};
			  params.id=id;
        	  ajax($http,"/proxyService/courseService/delBaseInfo",params).then(function(res){
        		  if(res.rtnCode=="200"){
        			  searchList(searchP);
					  showMes("success","删除成功！");
				  }else{
					  showMes("info",res.rtnMsg);
				  }
			  });
          }
          function delBc(id,searchP){
        	  var params ={};
			  params.id=id;
        	  ajax($http,"/proxyService/courseService/delBc",params).then(function(res){
        		  if(res.rtnCode=="200"){
        			  searchList(searchP);
					  showMes("success","删除成功！");
				  }else{
					  showMes("info",res.rtnMsg);
				  }
			  });
          }
          
          function addBc(medicalId){
        	  var params ={};
			  params.medicalId=medicalId;
        	  ajax($http,"/proxyService/courseService/addBc",params).then(function(res){
        		  if(res.rtnCode=="200"){
        			  setData("bcTable",res.data);
				  }else{
					  showMes("info",res.rtnMsg);
				  }
			  });
          }
          function saveBaseInfo(p,where){
        	  ajax($http,"/proxyService/courseService/saveBaseInfo",p).then(function(res){
        		  if(res.rtnCode=="200"){
        			  searchList(where)
				  }else{
					  showMes("info",res.rtnMsg);
				  }
			  });
          }
		  return {
			  init:init,
			  save:save,
			  getCourse:getCourse,
			  initCourseTable:initCourseTable,
			  queryBqgl:queryBqgl,
			  queryJcgl:queryJcgl,
			  saveBqgl:saveBqgl,
			  saveJcgl:saveJcgl,
			  getDictionaries:getDictionaries,
			  searchList:searchList,
			  delCourse:delCourse,
			  delBaseInfo:delBaseInfo,
			  delBc:delBc,
			  addBc:addBc,
			  addCourse:addCourse,
			  saveBaseInfo:saveBaseInfo,
	    }
	  }
	])
	
//========================================================================
              //白带常规
		  var bdcgCol=[[ //表头
		       {type:'radio'}
		      ,{field: 'time',minWidth:150,minWidth:100, event: 'date', data_field: "dBeginDate", title: '时间',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'qjd', title: '清洁度', edit: 'text'}
		      ,{field: 'dc', title: '滴虫', edit: 'text'} 
		      ,{field: 'jdngj', title: '加德纳杆菌', edit: 'text'}
		      ,{field: 'jsjmj', title: '假丝酵母菌', edit: 'text'}
		      ,{field: 'ts', title: '提示', edit: 'text'}
		    ]];
             //妇科检查
             var fkjcCol=[[ //表头
                  {type:'radio'}
                 ,{field: 'time',minWidth:150,minWidth:100, event: 'date', title: '时间',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
                 ,{field: 'wy', title: '外阴', edit: 'text'}
                 ,{field: 'yd', title: '阴道', edit: 'text'} 
                 ,{field: 'gj', title: '宫颈', edit: 'text'}
                 ,{field: 'zg', title: '子宫', edit: 'text'}
//                 ,{field: 'fj', title: '附件',minWidth:120, edit: 'text',toolbar: '#fkjcFjBar'}
                 ,{field: 'fjtext', title: '附件', edit: 'text'}
                 ,{field: 'fmw', title: '分泌物', edit: 'text'}
                 ,{field: 'qt', title: '其他', edit: 'text'}
               ]];
		  //HPV、TCT、电子阴道镜
             var dzydjCol=[[ //表头
		       {type:'radio'}
		      ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'qjd', title: 'HPV筛查', edit: 'text'}
		      ,{field: 'dc', title: 'TCT筛查', edit: 'text'} 
		      ,{field: 'jdngj', title: '电子阴道镜', edit: 'text'}
		    ]];
		  //支原体
             var zytCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'zytgrqk', title: '支原体感染情况', edit: 'text'}
		      ,{field: 'zytfyqk', title: '支原体服药情况', edit: 'text'}
		      ,{field: 'yytgrqk', title: '衣原体感染情况', edit: 'text'} 
		      ,{field: 'yytfyqk', title: '衣原体服药情况', edit: 'text'}
		    ]] 
		  
		    //B超—非妊娠
               var frsCol=[[ //表头
			       {type:'radio'}
				  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
			      ,{field: 'yjzq', title: '月经周期', edit: 'text'}
			      ,{field: 'zg', title: '子宫', edit: 'text'}
			      ,{field: 'nm', title: '内膜', edit: 'text'} 
//			      ,{field: 'fj1',minWidth:120, title: '双附件', edit: 'text',toolbar: '#frsFj1Bar'}
//			      ,{field: 'fj2',minWidth:120, title: '附件二', edit: 'text',toolbar: '#frsFj2Bar'}
			      ,{field: 'fjtext', title: '双附件', edit: 'text'}
			      ,{field: 'qt', title: '其他', edit: 'text'}
			    ]] 
		    
		    //B超—妊娠期
               var rsqCol=[[ //表头
			       {type:'radio'}
				  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
			      ,{field: 'yz', title: '孕周', edit: 'text'}
			      ,{field: 'zg', title: '子宫', edit: 'text'}
			      ,{field: 'nm', title: '内膜', edit: 'text'} 
			      ,{field: 'tx', title: '胎心', edit: 'text'}
			      ,{field: 'ty', title: '胎芽', edit: 'text'}
			      ,{field: 'ysxgbd',minWidth:120, title: '原始心管搏动', edit: 'text'}
			      ,{field: 'lhn', title: '卵黄囊',minWidth:100, edit: 'text'}
			      ,{field: 'qt', title: '其他', edit: 'text'}
			    ]];
		   
		  //性激素六项
             var xjslxCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'yjzq',minWidth:100, title: '月经周期', edit: 'text'}
		      ,{field: 'fsh', title: 'FSH', edit: 'text'}
		      ,{field: 'lh', title: 'LH', edit: 'text'} 
		      ,{field: 'p', title: 'P', edit: 'text'}
		      ,{field: 'e2', title: 'E2', edit: 'text'}
		      ,{field: 'prl', title: 'PRL', edit: 'text'}
		      ,{field: 't', title: 'T', edit: 'text'}
		      ,{field: 'ts', title: '提示', edit: 'text'}
		    ]] ;
		    
		  //孕三项
             var ysxCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'yz', title: '孕周', edit: 'text'}
		      ,{field: 'hcg', title: 'HCG', edit: 'text'}
		      ,{field: 'r', title: 'P', edit: 'text'} 
		      ,{field: 'e2', title: 'E2', edit: 'text'}
		      ,{field: 'ts', title: '提示', edit: 'text'}
		    ]] ;
		  //HCG
             var hcgCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'nhcg', title: '尿-HCG', edit: 'text'}
		      ,{field: 'xhcg', title: '血-HCG', edit: 'text'}
//		      ,{field: 'yytgrqk', title: '衣原体感染情况', edit: 'text'} 
		      ,{field: 'ts', title: '提示', edit: 'text'}
		    ]] ;
		  //AMH
             var amhCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'amh', title: 'AMH', edit: 'text'}
		      ,{field: 'ts', title: '提示', edit: 'text'}
		    ]] ;
		  //甲功
             var jgCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'tsh', title: 'TSH', edit: 'text'}
		      ,{field: 't3', title: 'T3', edit: 'text'}
		      ,{field: 't4', title: 'T4', edit: 'text'}
		      ,{field: 'ft3', title: 'FT3', edit: 'text'}
		      ,{field: 'ft4', title: 'FT4', edit: 'text'}
		      ,{field: 'trab', title: 'TR-Ab', edit: 'text'}
		      ,{field: 'ts', title: '提示', edit: 'text'}
		      ,{field: 'fyqk', title: '服药情况', edit: 'text'}
		    ]] ;
		    
		  //优生五项(TORCH)
             var yswxCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'toxigg', title: 'TOX-Ig-G', edit: 'text'}
		      ,{field: 'toxygm', title: 'TOX-Ig-M', edit: 'text'}
		      ,{field: 'rvigg', title: 'RV-Ig-G', edit: 'text'} 
		      ,{field: 'rvigm', title: 'RV-Ig-M', edit: 'text'}
		      ,{field: 'cmvigg', title: 'Cmv-Ig-G', edit: 'text'}
		      ,{field: 'cmvigm', title: 'Cmv-Ig-M', edit: 'text'}
		      ,{field: 'hsvigg', title: 'HSV-Ig-G', edit: 'text'}
		      ,{field: 'hsvigm', title: 'HSV-Ig-M', edit: 'text'}
		      ,{field: 'other', title: 'Other', edit: 'text'}

		    ]] ;
		    
		  //叶酸
             var ysCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'a1298c', title: '位点-A1298C', edit: 'text'}
		      ,{field: 'c677t', title: '位点-C677T', edit: 'text'}
		      ,{field: 'a66g', title: '位点-A66G', edit: 'text'} 
		      ,{field: 'dxnl', title: '代谢能力', edit: 'text'}
		      ,{field: 'fyqk', title: '服药情况', edit: 'text'}
		    ]] ;
		    
		  //生殖免疫抗体
             var szmyktCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'kjzkt', title: '抗精子抗体', edit: 'text'}
		      ,{field: 'ktmdkt', title: '抗透明带抗体', edit: 'text'}
		      ,{field: 'kzgnmkt', title: '抗子宫内膜抗体', edit: 'text'} 
		      ,{field: 'krrmmcxxjstk',minWidth:200, title: '抗人绒毛膜促性腺激素抗体', edit: 'text'}
		      ,{field: 'kxlzkt', title: '抗心磷脂抗体', edit: 'text'}
		      ,{field: 'klckt', title: '抗卵巢抗体', edit: 'text'}
		    ]] ;
		    
		  //凝血功能
             var nxgnCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'pt', title: 'PT', edit: 'text'}
		      ,{field: 'tt', title: 'TT', edit: 'text'}
		      ,{field: 'aptt', title: 'APTT', edit: 'text'} 
		      ,{field: 'fbg', title: 'FBG', edit: 'text'}
		      ,{field: 'at111', title: 'AT-III', edit: 'text'}
		      ,{field: 'd2', title: 'D2', edit: 'text'}
		      ,{field: 'ts', title: '提示/服药情况', edit: 'text'}
		    ]] ;
		    
		  //输卵管检查
             var slgjcCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'tsjczc', title: '通水检查-左侧', edit: 'text'}
		      ,{field: 'tsjcyc', title: '通水检查-右侧', edit: 'text'}
		      ,{field: 'tyjczc', title: '造影检查-左侧', edit: 'text'} 
		      ,{field: 'tyjcyc', title: '造影检查-右侧', edit: 'text'}
		      ,{field: 'ts', title: '提示', edit: 'text'}
		    ]] ;
		    
		  //精液常规+顶体酶
             var jycgCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'l', title: '精液常规-量', edit: 'text'}
		      ,{field: 'yhsj', title: '精液常规-液化时间', edit: 'text'}
		      ,{field: 'zihdl', title: '精液常规-精子活动率',minWidth:180, edit: 'text'} 
		      ,{field: 'xqydjz', title: '精液常规-向前运动精子',minWidth:180, edit: 'text'}
		      ,{field: 'xwjjj', title: '精液常规-显微镜镜检', edit: 'text'}
		      ,{field: 'dtm', title: '顶体酶', edit: 'text'}
		      ,{field: 'ts', title: '提示/服药情况', edit: 'text'}
		    ]] ;
		    
		  //其他
             var qtCol=[[ //表头
		       {type:'radio'}
			  ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
		      ,{field: 'xm', title: '项目', edit: 'text'}
		      ,{field: 'jcqk', title: '检查情况', edit: 'text'}
		      ,{field: 'ts', title: '提示/服药情况', edit: 'text'} 
		    ]] ;
           //病情概览
             var bqglCol=[[ //表头
            	  {type:'radio'}
			      ,{field: 'time',minWidth:150, title: '就诊时间',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
				  ,{field: 'zc', title: '诊次'}
			      ,{field: 'zz', title: '主证'} 
			      ,{field: 'cz', title: '次证、兼证'} 
			      ,{field: 'sm', title: '舌脉'} 
			      ,{field: 'zd', title: '诊断'} 
			      ,{field: 'zl', title: '治疗'} 
			    ]] 
		    //检查概览
             var jcglCol=[[ //表头
			       {type:'radio'}
			      ,{field: 'time',minWidth:150, title: '时间',event: 'date',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
			      ,{field: 'yjzq', title: '月经周期', edit: 'text'}
			      ,{field: 'zg', title: '子宫', edit: 'text'} 
			      ,{field: 'nm', title: '内膜', edit: 'text'}
			      ,{field: 'fj1', title: '附件一',minWidth:120,toolbar: '#jcglFj1Bar'}
			      ,{field: 'fj2', title: '附件二',minWidth:120,toolbar: '#jcglFj2Bar'}
			      ,{field: 'qt', title: '其他', edit: 'text'}
			    ]]
             //病情观察
             var bqgcCol=[[ //表头
			       {type:'radio'}
			      ,{field: 'time',minWidth:150, title: '时间',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
			      ,{field: 'bqgc', title: '病情观察',toolbar: '#bqgcBar'}
			    ]]
             var bcTableCol=[[ //表头
			    {type:'radio'}
			   ,{field: 'oneTime', title: '首次就诊时间'}
			   ,{field: 'zd', title: '诊断信息'}
			   ,{field: 'jzcx', title: '次序'}
			   ,{field: 'sfzy', title: '是否治愈', templet: '#sfzy'} 
			 ]];
			 var medicalTableCol=[[ //表头
				{type:'radio'}
			   ,{field: 'time',minWidth:150, title: '就诊时间',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
			   ,{field: 'zc', title: '诊次'}
		       ,{field: 'zz', title: '主证'} 
		       ,{field: 'cz', title: '次证、兼证'} 
		       ,{field: 'sm', title: '舌脉'} 
		       ,{field: 'zd', title: '诊断'} 
		       ,{field: 'zl', title: '治疗'} 
			 ]];
			 var jcglTableCol=[[ //表头
			       {type:'radio'}
			      ,{field: 'time',minWidth:150, title: '时间',edit: 'text',templet:'<div>{{ layui.util.toDateString(d.time, "yyyy-MM-dd HH:mm:ss") }}</div>'}
			      ,{field: 'yjzq', title: '月经周期',edit: 'text'}
			      ,{field: 'zg', title: '子宫',edit: 'text'} 
			      ,{field: 'nm', title: '内膜',edit: 'text'}
			      ,{field: 'fj1', title: '附件一', toolbar: '#fj1Bar'}
			      ,{field: 'fj2', title: '附件二', toolbar: '#fj2Bar'}
			      ,{field: 'qt', title: '其他',edit: 'text'}
			    ]]

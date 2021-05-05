
var app = angular.module('app', ['services'])
/**
 * controller定义
 */
app.controller('controller', [
  '$scope','$rootScope','$compile','service',
  function($scope,$rootScope,$compile,service) {
	  service.init();
	  service.getDictionaries($scope,$compile);
	  $scope.addCourse=function(){
		  $("#print").addClass("hide")
		  closeCheckBox();
		  selectOne();
		  var checkStatus = table.checkStatus('bcTable');
		  if(checkStatus.data.length!=0){
			  var medicalId=checkStatus.data[0].id;
			  service.addCourse($scope,medicalId);
			  show("model","添加病历",$(document.body).width(),$(document.body).height(),0,0);
		  }else{
			  showMes("info","请选择数据！");
		  }
	  }
	  $scope.updateCourse=function(){
		  $("#print").removeClass("hide")
		  closeCheckBox();
		  selectOne();
		  var checkStatus = table.checkStatus('medicalTable');
//		  var checkStatusJcgl = table.checkStatus('jcglTable');
		  if(checkStatus.data.length!=0){
			  service.getCourse(checkStatus.data[0].medicalId,$scope);
			  show("model","修改病历",$(document.body).width(),$(document.body).height(),0,0);
		  }
//		  else if(checkStatusJcgl.data.length!=0){
//			  service.getCourse(checkStatusJcgl.data[0].medicalId,$scope);
//			  show("model","修改病历",$(document.body).width(),$(document.body).height(),0,0);
//		  }
		  else{
			  showMes("info","请选择数据！");
		  }
		  
	  }
	  $scope.delCourse=function(){
		  var checkStatus = table.checkStatus('medicalTable');
		  if(checkStatus.data.length!=0){
		  layui.use('layer',function(){
			    var layer=layui.layer;
			    layer.open({
			        type:1,
			        content:'  确认删除？',
			        btn:['确定','取消'],
			        yes:function(index,layero)
			        {
			        	console.log(checkStatus.data[0].medicalId)
			  		  	service.delCourse(checkStatus.data[0].medicalId,$scope.search);
			        	layer.closeAll();
			        },btn2:function(index,layero){//按钮二回到
			        	layer.closeAll();
			        },
			        cancel:function(){//右上角关闭毁回调
			            //return false;
			        }
			    })
			})
		    }else{
  		  	    showMes("info","请选择数据！");
  		    }
	  }
	  $scope.addBaseInfo=function(){
		  $scope.addMedical={sex:'2'}
		  setTimeout(function() {
			  layui.form.render();
		  }, 100)
		  show("addBaseInfoModel","添加基本信息",400,500,0,0);
	  }
      $scope.updateBaseInfo=function(){
    	  var checkStatus = table.checkStatus('courseTable');
		  if(checkStatus.data.length!=0){
			  $scope.addMedical=checkStatus.data[0];
			  setTimeout(function() {
				  layui.form.render();
			  }, 100)
			  show("addBaseInfoModel","修改基本信息",400,500,0,0);
		  }
	  }
      $scope.delBaseInfo=function(){
    	  var checkStatus = table.checkStatus('courseTable');
		  if(checkStatus.data.length!=0){
		  layui.use('layer',function(){
			    var layer=layui.layer;
			    layer.open({
			        type:1,
			        content:'  确认删除?',
			        btn:['确定','取消'],
			        yes:function(index,layero)
			        {
			  		  	service.delBaseInfo(checkStatus.data[0].id,$scope.search);
			        	layer.closeAll();
			        },btn2:function(index,layero){//按钮二回到
			        	layer.closeAll();
			        },
			        cancel:function(){//右上角关闭毁回调
			            //return false;
			        }
			    })
			})
		    }else{
  		  	    showMes("info","请选择数据！");
  		    }
      }
	  $scope.save=function(){
		  if(!verificationForm("blsx")){
			  return;
		  }
		  $scope.panel.panelStr=getPanel();
		  var params ={};
		  params.medical=$scope.medical;
		  params.panel=$scope.panel;
		  params.zjfj=$scope.zjfj;
		  params.xbs=$scope.xbs;
		  params.yjs=$scope.yjs;
		  params.dx=$scope.dx;
		  params.ycs=$scope.ycs;
		  params.chqk=$scope.chqk;
		  params.jws=$scope.jws;
		  params.grs=$scope.grs;
		  params.tgjc=$scope.tgjc;
		  params.bdcg=layui.table.cache["bdcg"];
		  params.fkjc=layui.table.cache["fkjc"];
		  params.dzydj=layui.table.cache["dzydj"];
		  params.zyt=layui.table.cache["zyt"];
		  params.frs=layui.table.cache["frs"];
		  params.rsq=layui.table.cache["rsq"];
		  params.xjslx=layui.table.cache["xjslx"];
		  params.ysx=layui.table.cache["ysx"];
		  params.hcg=layui.table.cache["hcg"];
		  params.amh=layui.table.cache["amh"];
		  params.jg=layui.table.cache["jg"];
		  params.yswx=layui.table.cache["yswx"];
		  params.ys=layui.table.cache["ys"];
		  params.szmykt=layui.table.cache["szmykt"];
		  params.nxgn=layui.table.cache["nxgn"];
		  params.slgjc=layui.table.cache["slgjc"];
		  params.jycg=layui.table.cache["jycg"];
		  params.qt=layui.table.cache["qt"];
		  params.zd=$scope.zd;
		  params.cl=$scope.cl;
		  params.bqgl=$scope.bqgl;
//		  params.jcgl=layui.table.cache["jcgl"];
		  var checkStatus = table.checkStatus('bcTable');
		  var medicalId=checkStatus.data[0].id;
		  params.medicalId=medicalId;
		  params.bqgc=layui.table.cache["bqgc"];
		  service.save(params,$scope.search);
		  hide("model");
	  }
	  $scope.closeAdd=function(){
		  hide("addBaseInfoModel");
	  }
	  $scope.saveBaseInfo=function(){
		  service.saveBaseInfo($scope.addMedical,$scope.search);
		  hide("addBaseInfoModel");
	  }
	  
	  $scope.close=function(){
		  hide("model");
	  }
      $scope.seeCourse=function(){
    	  var checkStatus = table.checkStatus('medicalTable');
		  if(checkStatus.data.length!=0){
			  var medicalId=checkStatus.data[0].medicalId;
			  console.log(medicalId)
			  $("#fReport").attr("src","/ReportServer?reportlet=course.cpt&medicalId="+medicalId);
			  show("modelSee","查看",1200,885,0,0);
		  }else{
			  showMes("info","请选择数据！");
		  }
      }
      $scope.searchList=function(){
    	  service.searchList($scope.search);
      }
      $scope.fjoneM=function(){
    	  if($scope.jcgl!=null&&$scope.jcgl.fj1!=null&&$scope.jcgl.fj1!=""){
    		  return "重新上传";
    	  }else{
    		  return "上传文件";
    	  } 
      }
      $scope.fjtowM=function(){
    	  if($scope.jcgl!=null&&$scope.jcgl.fj2!=null&&$scope.jcgl.fj2!=""){
    		  return "重新上传";
    	  }else{
    		  return "上传文件";
    	  }
      }
      $scope.addBc=function(){
    	  var checkStatus = table.checkStatus('courseTable');
		  if(checkStatus.data.length!=0){
			  var medicalId=checkStatus.data[0].id;
			  service.addBc(medicalId);
		  }else{
			  showMes("info","请选择数据！");
		  }
    	  
      }
      $scope.changeTbale=function(){
    	  if(tableType=="bqgl"){
    		  $("#medicalTableBox").addClass("hide");
        	  $("#jcglTableBox").removeClass("hide");
        	  $("#tableTypeBut").text("查看病情概览");
        	  tableType="jcgl"
    	  }else{
    		  $("#jcglTableBox").addClass("hide");
        	  $("#medicalTableBox").removeClass("hide");
        	  $("#tableTypeBut").text("查看检查概览");
        	  tableType="bqgl"
    	  }
    	  
      }
      $scope.delBc=function(){
    	  var checkStatus = table.checkStatus('bcTable');
		  if(checkStatus.data.length!=0){
		  layui.use('layer',function(){
			    var layer=layui.layer;
			    layer.open({
			        type:1,
			        content:'  确认删除？',
			        btn:['确定','取消'],
			        yes:function(index,layero)
			        {
			  		  	service.delBc(checkStatus.data[0].id,$scope.search);
			        	layer.closeAll();
			        },btn2:function(index,layero){//按钮二回到
			        	layer.closeAll();
			        },
			        cancel:function(){//右上角关闭毁回调
			            //return false;
			        }
			    })
			})
		    }else{
  		  	    showMes("info","请选择数据！");
  		    }
      }
      $scope.addBqgc=function(){
    	  editor.setValue("");
    	  $("#bqgcId").val("");
    	  $("#bqgcTime").val(getNowDate());
    	  $("#bqgcTime").removeClass("hide");
    	  show("bqgcModel","添加",$(document.body).width(),$(document.body).height(),0,0);
      }
      $scope.updateBqgc=function(){
    	  var checkStatus = table.checkStatus('bqgc');
		  if(checkStatus.data.length!=0){
			  var id=checkStatus.data[0].id;
			  editor.setValue(checkStatus.data[0].bqgc);
			  if(checkStatus.data[0].id!=null){
				  $("#bqgcId").val(checkStatus.data[0].id);
			  }else{
				  $("#bqgcId").val(checkStatus.data[0].bakid);
			  }
	    	  
	    	  $("#bqgcTime").val(checkStatus.data[0].time);
	    	  $("#bqgcTime").removeClass("hide");
			  show("bqgcModel","修改",$(document.body).width(),$(document.body).height(),0,0);
		  }else{
			  showMes("info","请选择数据！");
		  }
    	  
      }
      $scope.delBqgc=function(){
    	  var checkStatus = table.checkStatus('bqgc');
		  if(checkStatus.data.length!=0){
		  layui.use('layer',function(){
			    var layer=layui.layer;
			    layer.open({
			        type:1,
			        content:'  确认删除？',
			        btn:['确定','取消'],
			        yes:function(index,layero)
			        {
			        	var arr=layui.table.cache["bqgc"];
			        	for (var i = 0; i < arr.length; i++) {
			        		if(arr[i].id!=null){
			    				  if(arr[i].id==$("#bqgcId").val()){
			  	        			arr.splice(i,1)
			  	        		  }
			    			  }else{
			    				  if(arr[i].bakid==$("#bqgcId").val()){
			    	        		arr.splice(i,1)
			    	        	  }
			    			  }
			        	}
			        	setData('bqgc',arr);
			        	layer.closeAll();
			        },btn2:function(index,layero){//按钮二回到
			        	layer.closeAll();
			        },
			        cancel:function(){//右上角关闭毁回调
			            //return false;
			        }
			    })
			})
		    }else{
  		  	    showMes("info","请选择数据！");
  		    }
      }
      $scope.saveBqgc=function(){
    	  var t=editor.getValue();
    	  if($("#bqgcId").val()!=null&&$("#bqgcId").val()!=""){
    		  var arr=layui.table.cache["bqgc"];
    		  for (var i = 0; i < arr.length; i++) {
    			  
    			  if(arr[i].id!=null){
    				  if(arr[i].id==$("#bqgcId").val()){
    					  arr[i].bqgc=t.replace(/"/g,"'")
    					  arr[i].time=$("#bqgcTime").val()
  	        		  }
    			  }else{
    				  if(arr[i].bakid==$("#bqgcId").val()){
    					  arr[i].bqgc=t.replace(/"/g,"'")
    					  arr[i].time=$("#bqgcTime").val()
    	        	  }
    			  }
	        		
	        	}
    		  console.log(arr)
	          setData('bqgc',arr);
    		  hide("bqgcModel");
    	  }else{
    		  var arr=layui.table.cache["bqgc"];
        	  arr.push({time:$("#bqgcTime").val(),bqgc:t.replace(/"/g,"'"),bakid:getId(5)});
        	  console.log(arr)
        	  setData('bqgc',arr);
        	  hide("bqgcModel");
    	  }
    	  
      }
      $scope.closeBqgcAdd=function(){
    	  hide("bqgcModel");
      }
      $scope.getBqglInfo=function(type){
    	  if(type=="zd"){
    		  if($scope.zd.zdtext!=null){
        		  $scope.bqgl.zd=$("#zdQ").next().next().children(".xm-form-select").children(".xm-select-title").children(".xm-input").attr("title")+","+$scope.zd.zdtext;
    		  }else{
    			  $scope.bqgl.zd=$("#zdQ").next().next().children(".xm-form-select").children(".xm-select-title").children(".xm-input").attr("title")
    		  }
    	  }else if(type=="zl"){
    		  $scope.bqgl.zl=$scope.cl.cl;
    	  }
    	  
      }
  }
])
function closeCheckBox(){
		  var str="bdcgSelect,fkjcSelect,dzydjSelect,zytSelect,frsSelect,rsqSelect,xjslxSelect,ysxSelect,hcgSelect,amhSelect,jgSelect,yswxSelect,ysSelect,szmyktSelect,nxgnSelect,slgjcSelect,jycgSelect,qtSelect,zzfzSelect,xbsSelect,yjsSelect,mcyjSelect,dxSelect,ycsSelect,chqkSelect,jwsSelect,grsSelect,tgjcSelect,fzjcSelect,clSelect";
		  var arr=str.split(",");
		  for (var i = 0; i < arr.length; i++) {
			  var clas=$("#"+arr[i]).next().attr("class");
			  if(clas.indexOf("layui-form-checked")!=-1){
				  $("#"+arr[i]).next().click();
			  }
		  }
	  }
function selectOne(){
	$("#blsxLi").click();
}
function putNul(){
	var str="bdcg,dzydj,zyt,frs,rsq,xjslx,ysx,hcg,amh,jg,yswx,ys,szmykt,nxgn,slgjc,jycg,qt";
	var arr=str.split(",");
	for (var i = 0; i < arr.length; i++) {
		setData(arr[i],[]);
	}
	
}
function getPanel(){
		  var str="";
		  var arr=$("#panelRow").children();
		  for (var i = 0; i < arr.length; i++) {
			  if($(arr[i]).prop("checked")){
				  str=str+$(arr[i]).attr("id")+",";
			  }
		  }
		  if(str!=""){
			  str=str.substr(0,str.length-1); 
		  }
		  return str;
	  }
function fzjcShow(a){
	  var id=$(a).attr("id").replace("Select", "");
	  if($(a).prop("checked")){
		  $("#"+id+"Panel").removeClass("hide");
	  }else{
		  $("#"+id+"Panel").addClass("hide");
	  }  
}
function blSelect(a){
	  var id=$(a).attr("id").replace("Select", "");
	  if($(a).prop("checked")){
		  $("#"+id+"Panel").removeClass("hide");
		  $("#"+id+"Panel").children(".layui-colla-content").addClass("layui-show");
	  }else{
		  $("#"+id+"Panel").addClass("hide");
	  }  
}
function add(a){
	var tableId=$(a).parent().parent().parent().parent().attr("lay-id");
	var col=eval(tableId+"Col");
	var arr=layui.table.cache[tableId];
	arr.push({id:'',time:getNowDate()});
	table.reload(tableId,{data:arr,cols: col});
}
function del(a){
	var tableId=$(a).parent().parent().parent().parent().attr("lay-id");
	if(table.checkStatus(tableId).data[0]!=null){
	layer.open({
        type: 1
        ,offset:'auto' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        ,id: 'delData' //防止重复弹出
        ,content: '<div style="padding: 20px 100px;">确认删除？</div>'
        ,btn: ['确定', '取消']
        ,btnAlign: 'c' //按钮居中
        ,shade: 0.6 //不显示遮罩
        ,yes: function(){
        	var tableId=$(a).parent().parent().parent().parent().attr("lay-id");
            var col=eval(tableId+"Col");
            var id=table.checkStatus(tableId).data[0].id;
            var time=table.checkStatus(tableId).data[0].time;
            var arr=layui.table.cache[tableId];
            for (var i = 0; i < arr.length; i++) {
           	  if(id==arr[i].id&&time==arr[i].time){
           		  arr.splice(i,1);
           	  }
            }
            table.reload(tableId,{data:arr,cols: col});
          layer.closeAll();
        }
        ,btn2: function(){
          layer.closeAll();
        }
      });
	}else{
  	  showMes("info","请选择要删除的数据！");
    }
}
function setData(id,arr){
	var tableId=id;
	var col=eval(tableId+"Col");
	table.reload(tableId,{data:arr,cols: col});
}
function setDataGl(id,arr){
	var tableId=id;
	var col=eval(tableId.replace(/Gl/g,"")+"Col");
	table.reload(tableId,{data:arr,cols: col});
	$("#"+tableId).next().find('td').data('edit', false)
}
function cxShow(a){
	if($(a).attr("class").indexOf("lpm")!=-1){
		var arr=document.getElementsByClassName("lpm");
		var is=true;
		for (var i = 0; i < arr.length; i++) {
			if($(arr[i]).val()!=""){
				is=false;
			}
		}
		if(is){
			$(".cx").removeAttr("disabled")
		}else{
			$(".cx").attr("disabled", "disabled")
		}
	}else{
		if($(a).val()!=""){
			$(".lpm").attr("disabled", "disabled")
		}else{
			$(".lpm").removeAttr("disabled")
		}
	}
}
function changeSwitch(a,str){
	var p={};
	p.id=$(a).attr("value");
	p.type=str;
	console.log(p)
	
//	ajax($http,"/proxyService/courseService/changeSwitch",p).then(function(res){
//		  if(res.rtnCode=="200"){
//			  showMes("success","保存成功！");
//		  }else{
//			  showMes("info",res.rtnMsg);
//		  }
//	  });
	$.ajax({ 
           url: "/proxyService/courseService/changeSwitch",
           context: document.body,
           type:'POST',
           dataType:'json',
           data : JSON.stringify(p),
         　　            contentType:"application/json",
           success: function(res){
		if(res.rtnCode=="200"){
			  showMes("success","保存成功！");
		  }else{
			  showMes("info",res.rtnMsg);
		  }
      }});
}
function frsFj1Click(id){
	frsfj1Id=id;
	$("#frsfjone").click();
}
function frsFj2Click(id){
	frsfj2Id=id;
	$("#frsfjtwo").click();
}
function jcglFj1Click(id){
	jcglfjId=id;
	jcglType=1;
	$("#jcglfj").click();
}
function jcglFj2Click(id){
	jcglfjId=id;
	jcglType=2;
	$("#jcglfj").click();
}
function seeBqgc(text){
//	console.log(text)
//	editor.setValue(text);
//	$("#bqgcTime").addClass("hide");
//	show("bqgcModel","查看",$(document.body).width(),$(document.body).height(),0,0);
	setTimeout(function() {
	  var checkStatus = table.checkStatus('bqgc');
	  if(checkStatus.data.length!=0){
		  editor.setValue(checkStatus.data[0].bqgc);
		  $("#bqgcTime").addClass("hide");
		  show("bqgcModel","查看",$(document.body).width(),$(document.body).height(),0,0);
	  }
	}, 200)
};
function fkjcFjClick(id){
	jcglfjId=id;
	jcglType=3;
	$("#jcglfj").click();
}



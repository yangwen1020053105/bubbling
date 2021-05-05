package com.bubbling.frame.base.controller;


import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.alibaba.fastjson.JSONObject;
import com.bubbling.frame.base.model.ResponseBean;
import com.bubbling.frame.base.tools.BaseUtils;
import com.bubbling.frame.base.tools.SessionUtils;

@Controller
public class BaseController {
	 @Autowired
	 private ApplicationContext applicationContext;
	/**
     * 此方法为登录接口，进行登录操作和错误处理
     *
     * @param userName 用户名
     * @param password 密码
     * @return ResponseMap
     */
    @PostMapping("/login.do")
    @ResponseBody
    public ResponseBean login(@RequestParam("userName") String userName,
                              @RequestParam("password") String password) throws Exception {
    	// 添加用户认证信息
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(userName, BaseUtils.getMD5String(password));
        // 进行验证，这里可以捕获异常，然后返回对应信息
        try {
        	SecurityUtils.getSubject().login(usernamePasswordToken);
		} catch (UnknownAccountException e) {
			// 用户名不存在
			return ResponseBean.error("500", "用户名不存在");
		} catch (IncorrectCredentialsException e) {
			// 密码错误
			return ResponseBean.error("500", "密码错误");
		}
        return ResponseBean.success();
    }
    public ResponseBean loginout() {
    	
		return null;
	}
    @PostMapping("/empty.do")
    @ResponseBody
    public ResponseBean empty() throws Exception {
    	return ResponseBean.success();
    }
    /**
     * 该方法用于统一service访问入口
     *
     * @param serviceName @PathVariable：一般我们使用URI template样式映射使用，即url/{param}这种形式，
     *                    也就是一般我们使用的GET，DELETE，PUT方法会使用到的，我们可以获取URL后所跟的参数。
     * @param methodName  @RequestParam：一般我们使用该注解来获取多个参数，一般用于form表单提交 在（）内写入需要获取参数的参数名即可，一般在PUT，POST中比较常用。
     * @param reqMap      @RequestBody：该注解和@RequestParam殊途同归，一般用于content-type是json类型的 我们使用该注解将所有参数转换，在代码部分在一个个取出来，也是目前我使用到最多的注解来获取参数（因为前端不愿意一个一个接口的调试）
     * @return map
     */
    @PostMapping("/proxyService/{serviceName}/{methodName}")
    @ResponseBody
    public ResponseBean postService(HttpServletRequest request, @PathVariable String serviceName, @PathVariable String methodName, @RequestBody(required = false) Map<String, Object> reqMap) throws Throwable {
    	Map<String, Object> map = new HashMap<>(16);
        reqMap = reqMap == null ? new HashMap<>(16) : reqMap;
        if (!checkAuth(SessionUtils.getUserId())){
            throw new Exception("无权限访问当前接口");
        }
        Object result = null;
        try {
            //java反射类对象
            //通过spring上下文获取Service层对象
            Object object = applicationContext.getBean(serviceName);
            Class<?> cls = object.getClass();
            if (cls.isInstance(object)) {
                Method method = cls.getDeclaredMethod(methodName, Map.class);
                result = method.invoke(object, reqMap);
            }
        } catch (InvocationTargetException e) {
            e.printStackTrace();
            return ResponseBean.error("500",e.toString());
        }

        if (result instanceof ResponseBean) {
            return (ResponseBean) result;
        } else {
            JSONObject json = JSONObject.parseObject((String) result);

            for (Map.Entry<String, Object> entry : json.entrySet()) {
                map.put(entry.getKey(), entry.getValue());
            }
            return ResponseBean.rtn((String) map.get("rtnCode"), (String) map.get("rtnMsg"), map.get("data"));
        }
    }
    private Boolean checkAuth(String userId) {
    	//权限认证
        return true;
    }
}

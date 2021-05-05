package com.bubbling.frame.shiro;

import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShiroConfig {

	public String shiroUser;
	@Value("${shiro.user}")
	public void setShiroUser(String value){
		shiroUser=value;
	}
	/**
	 * 创建shiroFilterFactoryBean
	 */
	@Bean
	public ShiroFilterFactoryBean getshiroFilterFactoryBean(@Qualifier("securityManager")DefaultWebSecurityManager securityManager) {
		ShiroFilterFactoryBean filterFactoryBean=new ShiroFilterFactoryBean();
		filterFactoryBean.setSecurityManager(securityManager);
		/**
		 * 过滤器
		 * anon:无需认证
		 * authc:必须认证
		 * user:如果使用remember的功能可以直接访问
		 * perms:该资源必须授权
		 * role:必须得到角色权限
		 */
		Map<String, String> filterMap = new HashMap<String, String>();
		if(shiroUser.equals("true")){
			filterMap.put("/css/**", "anon");
			filterMap.put("/login.do", "anon");
			filterMap.put("/frame/image/loginBackground.jpeg", "anon");
			filterMap.put("/logout", "logout");
			filterMap.put("/**", "authc");
		}
		//拦截跳转
		filterFactoryBean.setLoginUrl("/login.html");
		filterFactoryBean.setFilterChainDefinitionMap(filterMap);
		return filterFactoryBean;
	}
	/**
	 * 创建DefaultWebSecurityManager
	 */
	@Bean(name="securityManager")
	public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("realm")Realm realm) {
		DefaultWebSecurityManager securityManager=new DefaultWebSecurityManager();
		//
		securityManager.setRealm(realm);
		return securityManager;
		
	}
	/**
	 * 创建realm
	 */
	@Bean(name="realm")
	public Realm getRealm() {
		return new Realm();
		
	}
}

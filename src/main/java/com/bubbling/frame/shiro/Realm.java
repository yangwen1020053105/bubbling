package com.bubbling.frame.shiro;



import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import com.bubbling.frame.base.tools.BaseUtils;
import com.bubbling.frame.model.TAcUser;
import com.bubbling.frame.service.impl.UserService;

public class Realm extends AuthorizingRealm {

	@Autowired
	@Lazy
	private UserService userService;
	/**
	 * 执行授权逻辑
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
		System.out.println("执行授权");
		return null;
	}

	/**
	 * 执行认证逻辑
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken arg0) throws AuthenticationException {
		System.out.println("执行认证");
		UsernamePasswordToken token=(UsernamePasswordToken) arg0;
		TAcUser user = null;
		try {
			user = userService.quertUser(token.getUsername());
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (BaseUtils.isNull(user)) {
			return null;
		}
		//密码不正确
		return new SimpleAuthenticationInfo(user, user.getPassword(),"");
	}

}

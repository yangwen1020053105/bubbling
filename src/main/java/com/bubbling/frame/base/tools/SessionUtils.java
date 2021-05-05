package com.bubbling.frame.base.tools;

import org.apache.shiro.SecurityUtils;

import com.bubbling.frame.model.TAcUser;

public class SessionUtils {

	public static TAcUser getUser() {
		if (ApplicationUtil.shiroUser.equals("true")){
			return (TAcUser) SecurityUtils.getSubject().getPrincipal();
		}else{
			TAcUser user=new TAcUser();
			user.setId("00000");
			user.setUserName("管理员");
			return user;
		}

	}

	public static String getUserId() {
		return getUser().getId();
	}
}

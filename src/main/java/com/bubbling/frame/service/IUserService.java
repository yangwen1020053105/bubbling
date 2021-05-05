package com.bubbling.frame.service;

import org.springframework.stereotype.Service;

import com.bubbling.frame.model.TAcUser;
@Service
public interface IUserService {

	/**
	 * 获取用户
	 * @author         dc_yangwen
	 * @Date           2019年12月15日 下午7:58:32
	 */
	TAcUser quertUser(String userName) throws Exception;
	
}

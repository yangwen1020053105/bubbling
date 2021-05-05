package com.bubbling.frame.service.impl;

import java.util.List;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bubbling.frame.mapper.TAcUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bubbling.frame.base.service.impl.BaseService;
import com.bubbling.frame.model.TAcUser;
import com.bubbling.frame.service.IUserService;
@Service
public class UserService extends BaseService implements IUserService {

	@Autowired
	private TAcUserMapper tAcUserMapper;
	@Override
	public TAcUser quertUser(String userName) throws Exception {
		QueryWrapper queryWrapper=new QueryWrapper();
		queryWrapper.eq("login_name",userName);
		List<TAcUser> users=tAcUserMapper.selectList(queryWrapper);
		if (users.size()!=0) {
			return users.get(0);
		}else {
			return null;
		}
		
	}


}

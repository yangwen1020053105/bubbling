package com.bubbling.frame.service.impl;

import java.util.HashMap;
import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bubbling.frame.mapper.TAcFuncMapper;
import com.bubbling.frame.mapper.TAcUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bubbling.frame.base.model.ResponseBean;
import com.bubbling.frame.base.service.impl.BaseService;
import com.bubbling.frame.base.tools.BaseUtils;
import com.bubbling.frame.base.tools.SessionUtils;
import com.bubbling.frame.model.TAcFunc;
import com.bubbling.frame.model.TAcUser;
import com.bubbling.frame.service.IIndexService;
@Service
public class IndexService extends BaseService implements IIndexService {
	@Autowired
	private TAcFuncMapper tAcFuncMapper;
	@Autowired
	private TAcUserMapper tAcUserMapper;
	@Override
	public ResponseBean getIndexInfor(Map<String, Object> map) throws Exception {
		Map<String, Object> reMap=new HashMap<String, Object>();
		if (SessionUtils.getUser().getId().equals("001")) {
			QueryWrapper queryWrapper=new QueryWrapper<>().eq("is_valid",1);
			reMap.put("func",tAcFuncMapper.selectList(queryWrapper));
		}else {
			QueryWrapper queryWrapper=new QueryWrapper<>();
			queryWrapper.exists("select 1 from t_ac_user_role b left join t_ac_role_func c on b.role_id=c.role_id where c.func_id=t_ac_func.id and b.user_id='"+SessionUtils.getUser().getId()+"' and b.is_valid=1 and c.is_valid=1");
			queryWrapper.eq("is_valid",1);
			reMap.put("func",tAcFuncMapper.selectList(queryWrapper));
		}
		reMap.put("userName", SessionUtils.getUser().getUserName());
		return ResponseBean.success(reMap);
	}
	@Override
	public ResponseBean updatePassword(Map<String, Object> map) throws Exception {
		String password=(String) map.get("pass");
		QueryWrapper queryWrapper=new QueryWrapper<>();
		queryWrapper.eq("id",SessionUtils.getUser().getId());
		queryWrapper.eq("is_valid",1);
		TAcUser user= tAcUserMapper.selectOne(queryWrapper);
		if (BaseUtils.isNotNull(user)) {
			user.setPassword(BaseUtils.getMD5String(password));
			tAcUserMapper.updateById(user);
			return ResponseBean.success();
		}else {
			return ResponseBean.error("505", "为找到用户！");
		}
		
	}
	
}

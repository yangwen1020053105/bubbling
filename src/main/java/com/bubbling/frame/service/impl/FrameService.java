package com.bubbling.frame.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.bubbling.frame.base.tools.SessionUtils;
import com.bubbling.frame.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bubbling.frame.base.model.ResponseBean;
import com.bubbling.frame.base.service.impl.BaseService;
import com.bubbling.frame.base.tools.BaseUtils;
import com.bubbling.frame.model.TAcFunc;
import com.bubbling.frame.model.TAcOrg;
import com.bubbling.frame.model.TAcRole;
import com.bubbling.frame.model.TAcRoleFunc;
import com.bubbling.frame.model.TAcRoleOrg;
import com.bubbling.frame.model.TAcUser;
import com.bubbling.frame.model.TAcUserOrg;
import com.bubbling.frame.model.TAcUserRole;
import com.bubbling.frame.service.IFrameService;
@Service
public class FrameService extends BaseService implements IFrameService {
	@Autowired
	private TAcFuncMapper tAcFuncMapper;
	@Autowired
	private TAcOrgMapper tAcOrgMapper;
	@Autowired
	private TAcUserMapper tAcUserMapper;
	@Autowired
	private TAcRoleMapper tAcRoleMapper;
	@Autowired
	private TAcUserOrgMapper tAcUserOrgMapper;
	@Autowired
	private TAcRoleOrgMapper tAcRoleOrgMapper;
	@Autowired
	private TAcRoleFuncMapper tAcRoleFuncMapper;
	@Autowired
	private TAcUserRoleMapper tAcUserRoleMapper;

	@Override
	public ResponseBean getFuncList(Map<String, Object> map) throws Exception {
		QueryWrapper wrapper=new QueryWrapper();
		wrapper.eq("is_valid",1);
		List<TAcFunc> list=tAcFuncMapper.selectList(wrapper);
		return ResponseBean.success(list);
	}
	@Override
	public ResponseBean saveFunc(Map<String, Object> map) throws Exception {
		TAcFunc func=new TAcFunc();
		func=BaseUtils.mapToObject(map, func);
		if (BaseUtils.isNull((String)map.get("id"))) {
			tAcFuncMapper.insert(func);
		}else {
			func.setId((String) map.get("id"));
			tAcFuncMapper.updateById(func);
		}
		return ResponseBean.success();
	}
	@Override
	public ResponseBean getOrgList(Map<String, Object> map) throws Exception {
		QueryWrapper wrapper=new QueryWrapper();
		wrapper.eq("is_valid",1);
		List<TAcOrg> list=tAcOrgMapper.selectList(wrapper);
		return ResponseBean.success(list);
	}
	@Override
	public ResponseBean getUserByOrg(Map<String, Object> map) throws Exception {
		List<TAcUser> list=tAcUserMapper.queryUserByOrgId((String)map.get("orgId"));
		return ResponseBean.success(list);
	}
	@Override
	public ResponseBean getRoleByOrg(Map<String, Object> map) throws Exception {
		List<TAcRole> list=tAcRoleMapper.queryRoleByOrgId((String)map.get("orgId"));
		return ResponseBean.success(list);
	}
	@Override
	public ResponseBean saveOrUpdateUser(Map<String, Object> map) throws Exception {
		TAcUser user=new TAcUser();
		map.put("password", BaseUtils.getMD5String((String)map.get("password")));
		user=BaseUtils.mapToObject(map, user);
		if (BaseUtils.isNull(user.getId())) {
			QueryWrapper wrapper=new QueryWrapper();
			wrapper.eq("login_name", user.getLoginName());
			TAcUser userQuery=tAcUserMapper.selectOne(wrapper);
			if (BaseUtils.isNotNull(userQuery)) {
				if (userQuery.getIsValid()==1) {
					return ResponseBean.error("300", "登录名已存在！");
				}else {
					user.setId(userQuery.getId());
					user.setIsValid(1);
				}
			}
		}
		user.setIsValid(1);
		tAcUserMapper.insertOrUpdate(user);
		if (BaseUtils.isNull((String)map.get("id"))) {
			TAcUserOrg tAcUserOrg=new TAcUserOrg();
			tAcUserOrg.setUserId(user.getId());
			tAcUserOrg.setOrgId((String) map.get("orgId"));
			tAcUserOrgMapper.insert(tAcUserOrg);
		}
		return ResponseBean.success();
	}
	@Override
	public ResponseBean saveOrUpdateRole(Map<String, Object> map) throws Exception {
		TAcRole role=new TAcRole();
		role=BaseUtils.mapToObject(map, role);
		if (BaseUtils.isNull(role.getId())) {
			TAcRole roleQuery=tAcRoleMapper.queryRoleByOrgIdAndName((String) map.get("orgId"),role.getRoleName());
			if (BaseUtils.isNotNull(roleQuery)) {
				if (roleQuery.getIsValid()==1) {
					return ResponseBean.error("300", "角色名已存在！");
				}else {
					role.setId(roleQuery.getId());
					role.setIsValid(1);
				}
			}
		}
		tAcRoleMapper.insertOrUpdate(role);
		if (BaseUtils.isNull((String)map.get("id"))) {
			TAcRoleOrg roleOrg=new TAcRoleOrg();
			roleOrg.setRoleId(role.getId());
			roleOrg.setOrgId((String) map.get("orgId"));
			tAcRoleOrgMapper.insert(roleOrg);
		}
		return ResponseBean.success();
	}
	@Override
	public ResponseBean queryFuncByRole(Map<String, Object> map) throws Exception {
		QueryWrapper queryWrapper=new QueryWrapper();
		queryWrapper.eq("is_valid",1);
		List<TAcFunc> funcAll=tAcFuncMapper.selectList(queryWrapper);
		queryWrapper=new QueryWrapper();
		queryWrapper.exists("select 1 from t_ac_role_func b where b.FUNC_ID=t_ac_func.id and b.role_id='"+map.get("id")+"' and b.IS_VALID=1");
		List<TAcFunc> funcSelect=tAcFuncMapper.selectList(queryWrapper);
		funcSelect=BaseUtils.getRootNode(funcSelect, "id", "pid");
		Map<String, Object> retMap=new HashMap<String, Object>();
		retMap.put("all", funcAll);
		retMap.put("select", funcSelect);
		return ResponseBean.success(retMap);
	}
	@Override
	public ResponseBean saveFuncs(Map<String, Object> map) throws Exception {
		List<Map<String, Object>> funcs=(List<Map<String, Object>>) map.get("funcs");
		String roleId=(String) map.get("roleId");
		UpdateWrapper updateWrapper=new UpdateWrapper();
		updateWrapper.eq("role_id",roleId);
		TAcRoleFunc tAcRoleFunc=new TAcRoleFunc();
		tAcRoleFunc.setIsValid(2);
		tAcRoleFuncMapper.update(tAcRoleFunc,updateWrapper);
		for (Map<String, Object> m : funcs) {
			String funcId=(String) m.get("id");
			QueryWrapper queryWrapper=new QueryWrapper();
			queryWrapper.eq("role_id",roleId);
			queryWrapper.eq("func_id",funcId);
			TAcRoleFunc roleFunc=tAcRoleFuncMapper.selectOne(queryWrapper);
			if (BaseUtils.isNotNull(roleFunc)) {
				if (roleFunc.getIsValid()!=1) {
					roleFunc.setIsValid(1);
					tAcRoleFuncMapper.updateById(roleFunc);
				}
			}else {
				roleFunc=new TAcRoleFunc();
				roleFunc.setFuncId(funcId);
				roleFunc.setRoleId(roleId);
				tAcRoleFuncMapper.insert(roleFunc);
			}
		}
		return ResponseBean.success();
	}
	@Override
	public ResponseBean queryRoleByOrg(Map<String, Object> map) throws Exception {
		String userId=(String) map.get("userId");
		String orgId=(String) map.get("orgId");
		QueryWrapper queryWrapper=new QueryWrapper();
		queryWrapper.select("id as value","role_name as title ");
		queryWrapper.inSql("id","select role_id from t_ac_role_org b where b.org_id='"+orgId+"' and b.is_valid=1");
		List<Map<String, Object>> rolesMaps=tAcRoleMapper.selectMaps(queryWrapper);
		queryWrapper=new QueryWrapper();
		queryWrapper.select("id as id");
		queryWrapper.inSql("id","select role_id from t_ac_user_role b where b.user_id='"+userId+"' and b.is_valid=1");
		List<Map<String, Object>> roleSelectMaps=tAcRoleMapper.selectMaps(queryWrapper);
		Map<String, Object> retMap=new HashMap<String, Object>();
		retMap.put("roles", rolesMaps);
		retMap.put("roleSelect", roleSelectMaps);
		return ResponseBean.success(retMap);
	}
	@Override
	public ResponseBean saveUserRole(Map<String, Object> map) throws Exception {
		String userId=(String) map.get("userId");
		List<Map<String, Object>> roleIds=(List<Map<String, Object>>) map.get("roleIds");
		UpdateWrapper updateWrapper=new UpdateWrapper();
		updateWrapper.eq("user_id",userId);
		TAcUserRole tAcRoleFunc=new TAcUserRole();
		tAcRoleFunc.setIsValid(2);
		tAcUserRoleMapper.update(tAcRoleFunc,updateWrapper);
		for (Map<String, Object> role : roleIds) {
			String roleId=(String) role.get("value");
			QueryWrapper queryWrapper=new QueryWrapper();
			queryWrapper.eq("role_id",roleId);
			queryWrapper.eq("user_Id",userId);
			TAcUserRole userRole=tAcUserRoleMapper.selectOne(queryWrapper);
			if (BaseUtils.isNotNull(userRole)) {
				if (userRole.getIsValid()!=1) {
					userRole.setIsValid(1);
					tAcUserRoleMapper.updateById(userRole);
				}
			}else {
				userRole=new TAcUserRole();
				userRole.setUserId(userId);
				userRole.setRoleId(roleId);
				tAcUserRoleMapper.insert(userRole);
			}

		}
		return ResponseBean.success();
	}
	@Override
	public ResponseBean updatePassword(Map<String, Object> map) throws Exception {
		String userId=(String) map.get("id");
		QueryWrapper queryWrapper=new QueryWrapper();
		queryWrapper.eq("id",userId);
		queryWrapper.eq("is_valid",1);
		TAcUser user=tAcUserMapper.selectOne(queryWrapper);
		if (BaseUtils.isNotNull(user)) {
			user.setPassword(BaseUtils.getMD5String("111111"));
			tAcUserMapper.updateById(user);
		}
		return ResponseBean.success();
	}
	@Override
	public ResponseBean deleteOrg(Map<String, Object> map) throws Exception {
		String orgId=(String) map.get("id");
		tAcOrgMapper.deleteById(orgId);
		return ResponseBean.success();
	}
	@Override
	public ResponseBean deleteFunc(Map<String, Object> map) throws Exception {
		String funcId=(String) map.get("id");
		tAcFuncMapper.deleteById(funcId);
		return ResponseBean.success();
	}
	@Override
	public ResponseBean saveOrUpdateOrg(Map<String, Object> map) throws Exception {
		TAcOrg org=new TAcOrg();
		org=BaseUtils.mapToObject(map, org);
		tAcOrgMapper.insertOrUpdate(org);
		return ResponseBean.success();
	}
	@Override
	public ResponseBean deleteRoleIsVaild(Map<String, Object> map) throws Exception {
		String id= (String) map.get("id");
		tAcRoleMapper.deleteById(id);
		return ResponseBean.success();
	}
	@Override
	public ResponseBean deleteUserIsVaild(Map<String, Object> map) throws Exception {
		String id= (String) map.get("id");
		TAcUser tAcUser=new TAcUser();
		tAcUser.setId(id);
		tAcUser.setIsValid(2);
		tAcUserMapper.updateById(tAcUser);
		return ResponseBean.success();
	}

}

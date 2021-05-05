package com.bubbling.frame.service;

import java.util.Map;

import com.bubbling.frame.base.model.ResponseBean;

public interface IFrameService {

	/**
	 * 获取菜单树
	 * @author         dc_yangwen
	 * @Date           2019年12月21日 下午9:56:40
	 */
	ResponseBean getFuncList(Map<String, Object> map) throws Exception;
	/**
	 * 保存菜单树
	 * @author         dc_yangwen
	 * @Date           2019年12月21日 下午9:57:33
	 */
	ResponseBean saveFunc(Map<String, Object> map) throws Exception;
	/**
	 * 获取部门树
	 * @param map
	 * @return
	 * @throws Exception
	 */
	ResponseBean getOrgList(Map<String, Object> map) throws Exception;
	/**
	 * 根据部门获取用户
	 * @param map
	 * @return
	 * @throws Exception
	 */
	ResponseBean getUserByOrg(Map<String, Object> map) throws Exception;
	/**
	 * 根据部门获取角色
	 * @param map
	 * @return
	 * @throws Exception
	 */
	ResponseBean getRoleByOrg(Map<String, Object> map) throws Exception;
	/**
	 * 保存用户
	 * @author         dc_yangwen
	 * @Date           2019年12月15日 下午7:58:32
	 */
	ResponseBean saveOrUpdateUser(Map<String, Object> map) throws Exception;
	/**
	 * 保存角色
	 * @param map
	 * @return
	 * @throws Exception
	 */
	ResponseBean saveOrUpdateRole(Map<String, Object> map) throws Exception;
	/**
	 * 查询角色对应分菜单
	 * @param map
	 * @author         dc_yangwen
	 * @Date           2019年12月15日 下午7:58:32
	 * @throws Exception
	 */
	ResponseBean queryFuncByRole(Map<String, Object> map) throws Exception;
	/**
	 * 设置权限
	 * @param map
	 * @return
	 * @throws Exception
	 */
	ResponseBean saveFuncs(Map<String, Object> map) throws Exception;
	/**
	 * 获取角色
	 * @param map
	 * @return
	 * @throws Exception
	 */
	ResponseBean queryRoleByOrg(Map<String, Object> map) throws Exception;
	/**
	 * 保存授权
	 * @param map
	 * @return
	 * @throws Exception
	 */
	ResponseBean saveUserRole(Map<String, Object> map) throws Exception;
	/**
	 * 重置密码
	 * @param map
	 * @return
	 * @throws Exception
	 */
	ResponseBean updatePassword(Map<String, Object> map) throws Exception;
	/*
	 * 类描述: 删除部门
	 * @Author: dc_yangwen
	 * @Date: 2021/5/4 19:31
	 */
    ResponseBean deleteOrg(Map<String, Object> map) throws Exception;
    /*
     * 类描述: 删除菜单
     * @Author: dc_yangwen
     * @Date: 2021/5/4 19:33
     */
	ResponseBean deleteFunc(Map<String, Object> map) throws Exception;
	/*
	 * 类描述: 保存或修改部门
	 * @Author: dc_yangwen
	 * @Date: 2021/5/4 19:33
	 */
	ResponseBean saveOrUpdateOrg(Map<String, Object> map) throws Exception;
	/*
	 * 类描述: 删除角色
	 * @Author: dc_yangwen
	 * @Date: 2021/5/4 19:37
	 */
	ResponseBean deleteRoleIsVaild(Map<String, Object> map) throws Exception;
	/*
	 * 类描述: 删除用户
	 * @Author: dc_yangwen
	 * @Date: 2021/5/4 19:40
	 */
	ResponseBean deleteUserIsVaild(Map<String, Object> map) throws Exception;
}

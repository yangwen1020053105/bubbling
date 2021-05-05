package com.bubbling.frame.service;

import java.util.Map;

import com.bubbling.frame.base.model.ResponseBean;

public interface IIndexService {

	/**
	 * 获取菜单
	 * @author         dc_yangwen
	 * @Date           2019年12月19日 下午9:52:01
	 */
	ResponseBean getIndexInfor(Map<String, Object> map) throws Exception;

	/**
	 * 修改密码
	 * @param map
	 * @return
	 * @throws Exception
	 */
	ResponseBean updatePassword(Map<String, Object> map) throws Exception;
}

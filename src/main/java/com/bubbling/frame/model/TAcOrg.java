package com.bubbling.frame.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Timestamp;


/**
 * TAcOrg entity. @author MyEclipse Persistence Tools
 */
@Data
@TableName("t_ac_org")
public class TAcOrg implements java.io.Serializable {
	@TableId(type = IdType.ASSIGN_UUID)
	private String id;
	private String orgName;
	private String pid;
	private String createUser;
	private Timestamp createTime;
	private String updateUser;
	private Timestamp updateTime;
	private Integer isValid;

}
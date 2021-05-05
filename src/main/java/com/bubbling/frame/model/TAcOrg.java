package com.bubbling.frame.model;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;


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
	@TableField(fill = FieldFill.INSERT)
	private String createUser;
	@TableField(fill = FieldFill.INSERT)
	private Date createTime;
	@TableField(fill = FieldFill.INSERT_UPDATE)
	private String updateUser;
	@TableField(fill = FieldFill.INSERT_UPDATE)
	private Date updateTime;
	@TableLogic
	@TableField(fill = FieldFill.INSERT)
	private Integer isValid;

}
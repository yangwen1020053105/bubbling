package com.bubbling.frame.model;

import java.sql.Timestamp;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
@TableName("t_ac_user_role")
public class TAcUserRole implements java.io.Serializable {
	@TableId(type = IdType.ASSIGN_UUID)
	private String id;
	private String userId;
	private String roleId;
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
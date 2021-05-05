package com.bubbling.frame.model;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;


@Data
@TableName("t_ac_role")
public class TAcRole implements java.io.Serializable {
	@TableId(type = IdType.ASSIGN_UUID)
	private String id;
	private String roleName;
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
package com.bubbling.frame.model;

import java.sql.Timestamp;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("t_ac_role_func")
public class TAcRoleFunc implements java.io.Serializable {
	@TableId(type = IdType.ASSIGN_UUID)
	private String id;
	private String funcId;
	private String roleId;
	private String createUser;
	private Timestamp createTime;
	private String updateUser;
	private Timestamp updateTime;
	private Integer isValid;

}
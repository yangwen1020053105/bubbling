package com.bubbling.frame.model;

import java.sql.Timestamp;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName("t_ac_role")
public class TAcRole implements java.io.Serializable {
	@TableId(type = IdType.ASSIGN_UUID)
	private String id;
	private String roleName;
	private String createUser;
	private Timestamp createTime;
	private String updateUser;
	private Timestamp updateTime;
	private Integer isValid;

}
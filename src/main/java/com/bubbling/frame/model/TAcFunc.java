package com.bubbling.frame.model;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TAcFunc entity. @author MyEclipse Persistence Tools
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("t_ac_func")
public class TAcFunc implements java.io.Serializable {
	@TableId(type = IdType.ASSIGN_UUID)
	private String id;
	private String pid;
	private String funcName;
	private String viewPath;
	private String imagePath;
	private String createUser;
	private Date createTime;
	private String updateUser;
	private Date updateTime;
	private Integer isValid;
}
/*
 Navicat MySQL Data Transfer

 Source Server         : nas
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : yangwen.i234.me:3306
 Source Schema         : bubbling_frame1.0

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 05/05/2021 18:21:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_ac_func
-- ----------------------------
DROP TABLE IF EXISTS `t_ac_func`;
CREATE TABLE `t_ac_func`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `FUNC_NAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `VIEW_PATH` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `IMAGE_PATH` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CREATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `CREATE_TIME` datetime(0) NULL DEFAULT NULL,
  `UPDATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `UPDATE_TIME` datetime(0) NULL DEFAULT NULL,
  `IS_VALID` int(0) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_ac_func
-- ----------------------------
INSERT INTO `t_ac_func` VALUES ('1', '0', '根节点', NULL, NULL, 'syscreate', '2019-12-19 21:42:51', NULL, NULL, 1);
INSERT INTO `t_ac_func` VALUES ('2', '1', '系统权限', '', '&#xe604;', 'syscreate', '2019-12-19 21:44:05', NULL, NULL, 1);
INSERT INTO `t_ac_func` VALUES ('4', '2', '用户管理', '../frame/user/index.html', '&#xe602;', 'syscreate', '2019-12-19 21:44:47', NULL, NULL, 1);
INSERT INTO `t_ac_func` VALUES ('4028fc8b6f3d4c16016f3d4f98c40000', '2', '部门管理', '../frame/org/index.html', '&#xe601;', '00001', '2019-12-25 21:51:00', '00001', '2019-12-25 21:51:00', 1);
INSERT INTO `t_ac_func` VALUES ('5', '2', '角色管理', '../frame/role/index.html', '&#xe603;', 'syscreate', '2019-12-19 21:44:47', NULL, NULL, 1);
INSERT INTO `t_ac_func` VALUES ('6', '2', '菜单管理', '../frame/func/index.html', '&#xe605;', 'syscreate', '2019-12-19 21:44:47', NULL, NULL, 1);

-- ----------------------------
-- Table structure for t_ac_org
-- ----------------------------
DROP TABLE IF EXISTS `t_ac_org`;
CREATE TABLE `t_ac_org`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ORG_NAME` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门名称',
  `PID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上级节点',
  `CREATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `CREATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `UPDATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人',
  `UPDATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `IS_VALID` int(0) NULL DEFAULT NULL COMMENT '是否有效（1有效2无效）',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_ac_org
-- ----------------------------
INSERT INTO `t_ac_org` VALUES ('1', '根节点', '0', 'syscreate', '2019-12-29 21:25:26', NULL, NULL, 1);
INSERT INTO `t_ac_org` VALUES ('2', '开发部门', '1', 'syscreate', '2019-12-29 21:25:26', NULL, NULL, 1);
INSERT INTO `t_ac_org` VALUES ('3', '维护部门', '1', 'syscreate', '2019-12-29 21:25:26', NULL, NULL, 1);
INSERT INTO `t_ac_org` VALUES ('4', '开发一组', '2', 'syscreate', '2019-12-29 21:25:26', NULL, NULL, 1);
INSERT INTO `t_ac_org` VALUES ('4028fc8b6f56cfab016f56cff7650000', '开发二组', '2', 'syscreate', '2019-12-29 21:25:26', '00001', '2020-01-01 14:40:45', 1);

-- ----------------------------
-- Table structure for t_ac_role
-- ----------------------------
DROP TABLE IF EXISTS `t_ac_role`;
CREATE TABLE `t_ac_role`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ROLE_NAME` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门名称',
  `CREATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `CREATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `UPDATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人',
  `UPDATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `IS_VALID` int(0) NULL DEFAULT NULL COMMENT '是否有效（1有效2无效）',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_ac_role
-- ----------------------------
INSERT INTO `t_ac_role` VALUES ('00001', '管理员', 'sys', '2020-01-18 19:40:25', NULL, NULL, 1);
INSERT INTO `t_ac_role` VALUES ('40281e816fb875e8016fb87a597e0001', '程序员鼓励师1', '00001', '2020-01-18 19:47:04', '00001', '2020-01-18 20:07:11', 1);

-- ----------------------------
-- Table structure for t_ac_role_func
-- ----------------------------
DROP TABLE IF EXISTS `t_ac_role_func`;
CREATE TABLE `t_ac_role_func`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FUNC_ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `ROLE_ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门id',
  `CREATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `CREATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `UPDATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人',
  `UPDATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `IS_VALID` int(0) NULL DEFAULT NULL COMMENT '是否有效（1有效2无效）',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_ac_role_func
-- ----------------------------
INSERT INTO `t_ac_role_func` VALUES ('402880f36fd60b6b016fd6103bc40000', '2', '40281e816fb875e8016fb87a597e0001', '00001', '2020-01-24 13:39:46', '00001', '2020-01-25 20:03:01', 1);
INSERT INTO `t_ac_role_func` VALUES ('402880f36fd60b6b016fd6103c660001', '4', '40281e816fb875e8016fb87a597e0001', '00001', '2020-01-24 13:39:46', '00001', '2020-01-25 20:03:01', 1);
INSERT INTO `t_ac_role_func` VALUES ('402880f36fd60b6b016fd6103ce00002', '4028fc8b6f3d4c16016f3d4f98c40000', '40281e816fb875e8016fb87a597e0001', '00001', '2020-01-24 13:39:46', NULL, NULL, 2);
INSERT INTO `t_ac_role_func` VALUES ('402880f36fd60b6b016fd6103db30003', '5', '40281e816fb875e8016fb87a597e0001', '00001', '2020-01-24 13:39:46', NULL, NULL, 2);
INSERT INTO `t_ac_role_func` VALUES ('402880f36fd60b6b016fd6103e1c0004', '6', '40281e816fb875e8016fb87a597e0001', '00001', '2020-01-24 13:39:46', NULL, NULL, 2);

-- ----------------------------
-- Table structure for t_ac_role_org
-- ----------------------------
DROP TABLE IF EXISTS `t_ac_role_org`;
CREATE TABLE `t_ac_role_org`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ORG_ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `ROLE_ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门id',
  `CREATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `CREATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `UPDATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人',
  `UPDATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `IS_VALID` int(0) NULL DEFAULT NULL COMMENT '是否有效（1有效2无效）',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_ac_role_org
-- ----------------------------
INSERT INTO `t_ac_role_org` VALUES ('40281e816fb875e8016fb87a608e0002', '4', '40281e816fb875e8016fb87a597e0001', '00001', '2020-01-18 19:47:05', NULL, NULL, 1);

-- ----------------------------
-- Table structure for t_ac_user
-- ----------------------------
DROP TABLE IF EXISTS `t_ac_user`;
CREATE TABLE `t_ac_user`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LOGIN_NAME` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录名',
  `PASSWORD` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `USER_NAME` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `SEX` int(0) NULL DEFAULT NULL COMMENT '1男2女',
  `EMAIL` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `PHONE` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机',
  `CREATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `CREATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `UPDATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人',
  `UPDATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `IS_VALID` int(0) NULL DEFAULT NULL COMMENT '是否有效（1有效2无效）',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_ac_user
-- ----------------------------
INSERT INTO `t_ac_user` VALUES ('001', 'admin', '96e79218965eb72c92a549dd5a330112', '管理员', NULL, '1020053105@qq.com', '13880666081', 'syscreate', '2019-12-14 13:34:13', '001', '2020-01-30 21:24:21', 1);
INSERT INTO `t_ac_user` VALUES ('40281e816f93e75e016f93f4e5aa0004', '测试', 'd41d8cd98f00b204e9800998ecf8427e', '测试1', 1, '1020053103@qq.com', '', '00001', '2020-01-11 17:34:58', '00001', '2020-01-18 20:31:53', 2);
INSERT INTO `t_ac_user` VALUES ('40281e816f940bda016f9422e6da0006', 'yangwen1', '96e79218965eb72c92a549dd5a330112', '杨文', 1, '1020053105@qq.com', '13880666081', '00001', '2020-01-11 18:25:13', '001', '2020-01-30 20:17:05', 1);
INSERT INTO `t_ac_user` VALUES ('affair', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `t_ac_user` VALUES ('locktest', NULL, NULL, NULL, 9211, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for t_ac_user_org
-- ----------------------------
DROP TABLE IF EXISTS `t_ac_user_org`;
CREATE TABLE `t_ac_user_org`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `ORG_ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门id',
  `CREATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `CREATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `UPDATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人',
  `UPDATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `IS_VALID` int(0) NULL DEFAULT NULL COMMENT '是否有效（1有效2无效）',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_ac_user_org
-- ----------------------------
INSERT INTO `t_ac_user_org` VALUES ('40281e816f93e75e016f93f4e5aa0005', '40281e816f93e75e016f93f4e5aa0004', '4', '00001', '2020-01-11 17:34:58', NULL, NULL, 1);
INSERT INTO `t_ac_user_org` VALUES ('40281e816f940bda016f9422e6db0007', '40281e816f940bda016f9422e6da0006', '4', '00001', '2020-01-11 18:25:13', NULL, NULL, 1);

-- ----------------------------
-- Table structure for t_ac_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_ac_user_role`;
CREATE TABLE `t_ac_user_role`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `USER_ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `ROLE_ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门id',
  `CREATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `CREATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `UPDATE_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人',
  `UPDATE_TIME` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `IS_VALID` int(0) NULL DEFAULT NULL COMMENT '是否有效（1有效2无效）',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_ac_user_role
-- ----------------------------
INSERT INTO `t_ac_user_role` VALUES ('40281e816ff61c27016ff63a676d0000', '40281e816f940bda016f9422e6da0006', '40281e816fb875e8016fb87a597e0001', '00001', '2020-01-30 19:33:40', '00001', '2020-01-30 19:34:55', 1);

SET FOREIGN_KEY_CHECKS = 1;

package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 机构信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:10:27
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_org")
public class SysOrg extends Model<SysOrg> {
	private static final long serialVersionUID = 1L;

	/**
	 * 机构ID主键
	 */
	@TableId
	private String orgId;
	/**
	 * 机构名称
	 */
	private String orgName;
	/**
	 * 父类机构id
	 */
	private String orgParentId;
	/**
	 * 机构索引ID
	 */
	private String orgRsId;
	/**
	 * 机构编码
	 */
	private String orgCode;
	/**
	 * 机构类别
	 */
	private String orgClass;
	/**
	 * 机构地址
	 */
	private String orgAddr;
	/**
	 * 联系人
	 */
	private String orgContacts;
	/**
	 * 电话号码
	 */
	private String orgTelephone;
	/**
	 * 所属区域
	 */
	private String orgArea;
	/**
	 * 第三方编码
	 */
	private String orgClientId;
	/**
	 * 第三方保存ID
	 */
	private String orgThirdId;
	/**
	 * 是否可用(0:可用 1:不可用)
	 */
	private String available;
	/**
	 * 基于mysql乐观锁，解决并发访问
	 */
	private Integer version;
	/**
	 * 创建时间
	 */
	private LocalDateTime createTime;
	/**
	 * 修改时间
	 */
	private LocalDateTime updateTime;
	/**
	 * 排序
	 */
	private Integer sort;
	/**
	 * 是否删除  -1：已删除  0：正常
	 */
	private String delFlag;
	/**
	 * 扩展字段1
	 */
	private String extension1;
	/**
	 * 扩展字段2
	 */
	private String extension2;

}

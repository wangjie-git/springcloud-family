package com.ks.gpgp.user.client.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 员工实体对象
 * @author HWB
 *
 */
public class Employee implements Serializable {
	private String fempId;

	private String fempCode;

	private String fstaffId;

	private String fempName;

	private String forgId;

	private String fidNo;

	private String fsexId;

	private String fdocType;

	private Date fbirthdate;

	private String fisavailable;

	private String ftelphone;

	private String ffaxNo;

	private String femail;

	private BigDecimal fordernum;

	private String fempDesc;

	private Integer fversion;

	private String flogcby;

	private Date flogcdate;

	private String flogluby;

	private Date flogludate;

	private String floglaby;

	private Date flogladate;

	private Date fdockingTime;

	private String fisExpert;

	private static final long serialVersionUID = 1L;

	public Employee() {
		super();
	}

	public Employee(String fempId, String fempCode, String fstaffId, String fempName, String forgId, String fidNo,
			String fsexId, String fdocType, Date fbirthdate, String fisavailable, String ftelphone, String ffaxNo,
			String femail, BigDecimal fordernum, String fempDesc, Integer fversion, String flogcby, Date flogcdate,
			String flogluby, Date flogludate, String floglaby, Date flogladate, Date fdockingTime, String fisExpert) {
		super();
		this.fempId = fempId;
		this.fempCode = fempCode;
		this.fstaffId = fstaffId;
		this.fempName = fempName;
		this.forgId = forgId;
		this.fidNo = fidNo;
		this.fsexId = fsexId;
		this.fdocType = fdocType;
		this.fbirthdate = fbirthdate;
		this.fisavailable = fisavailable;
		this.ftelphone = ftelphone;
		this.ffaxNo = ffaxNo;
		this.femail = femail;
		this.fordernum = fordernum;
		this.fempDesc = fempDesc;
		this.fversion = fversion;
		this.flogcby = flogcby;
		this.flogcdate = flogcdate;
		this.flogluby = flogluby;
		this.flogludate = flogludate;
		this.floglaby = floglaby;
		this.flogladate = flogladate;
		this.fdockingTime = fdockingTime;
		this.fisExpert = fisExpert;
	}

	public String getFempId() {
		return fempId;
	}

	public void setFempId(String fempId) {
		this.fempId = fempId == null ? null : fempId.trim();
	}

	public String getFempCode() {
		return fempCode;
	}

	public void setFempCode(String fempCode) {
		this.fempCode = fempCode == null ? null : fempCode.trim();
	}

	public String getFstaffId() {
		return fstaffId;
	}

	public void setFstaffId(String fstaffId) {
		this.fstaffId = fstaffId == null ? null : fstaffId.trim();
	}

	public String getFempName() {
		return fempName;
	}

	public void setFempName(String fempName) {
		this.fempName = fempName == null ? null : fempName.trim();
	}

	public String getForgId() {
		return forgId;
	}

	public void setForgId(String forgId) {
		this.forgId = forgId == null ? null : forgId.trim();
	}

	public String getFidNo() {
		return fidNo;
	}

	public void setFidNo(String fidNo) {
		this.fidNo = fidNo == null ? null : fidNo.trim();
	}

	public String getFsexId() {
		return fsexId;
	}

	public void setFsexId(String fsexId) {
		this.fsexId = fsexId == null ? null : fsexId.trim();
	}

	public String getFdocType() {
		return fdocType;
	}

	public void setFdocType(String fdocType) {
		this.fdocType = fdocType == null ? null : fdocType.trim();
	}

	public Date getFbirthdate() {
		return fbirthdate;
	}

	public void setFbirthdate(Date fbirthdate) {
		this.fbirthdate = fbirthdate;
	}

	public String getFisavailable() {
		return fisavailable;
	}

	public void setFisavailable(String fisavailable) {
		this.fisavailable = fisavailable == null ? null : fisavailable.trim();
	}

	public String getFtelphone() {
		return ftelphone;
	}

	public void setFtelphone(String ftelphone) {
		this.ftelphone = ftelphone == null ? null : ftelphone.trim();
	}

	public String getFfaxNo() {
		return ffaxNo;
	}

	public void setFfaxNo(String ffaxNo) {
		this.ffaxNo = ffaxNo == null ? null : ffaxNo.trim();
	}

	public String getFemail() {
		return femail;
	}

	public void setFemail(String femail) {
		this.femail = femail == null ? null : femail.trim();
	}

	public BigDecimal getFordernum() {
		return fordernum;
	}

	public void setFordernum(BigDecimal fordernum) {
		this.fordernum = fordernum;
	}

	public String getFempDesc() {
		return fempDesc;
	}

	public void setFempDesc(String fempDesc) {
		this.fempDesc = fempDesc == null ? null : fempDesc.trim();
	}

	public Integer getFversion() {
		return fversion;
	}

	public void setFversion(Integer fversion) {
		this.fversion = fversion;
	}

	public String getFlogcby() {
		return flogcby;
	}

	public void setFlogcby(String flogcby) {
		this.flogcby = flogcby == null ? null : flogcby.trim();
	}

	public Date getFlogcdate() {
		return flogcdate;
	}

	public void setFlogcdate(Date flogcdate) {
		this.flogcdate = flogcdate;
	}

	public String getFlogluby() {
		return flogluby;
	}

	public void setFlogluby(String flogluby) {
		this.flogluby = flogluby == null ? null : flogluby.trim();
	}

	public Date getFlogludate() {
		return flogludate;
	}

	public void setFlogludate(Date flogludate) {
		this.flogludate = flogludate;
	}

	public String getFloglaby() {
		return floglaby;
	}

	public void setFloglaby(String floglaby) {
		this.floglaby = floglaby == null ? null : floglaby.trim();
	}

	public Date getFlogladate() {
		return flogladate;
	}

	public void setFlogladate(Date flogladate) {
		this.flogladate = flogladate;
	}

	public Date getFdockingTime() {
		return fdockingTime;
	}

	public void setFdockingTime(Date fdockingTime) {
		this.fdockingTime = fdockingTime;
	}

	public String getFisExpert() {
		return fisExpert;
	}

	public void setFisExpert(String fisExpert) {
		this.fisExpert = fisExpert == null ? null : fisExpert.trim();
	}
}
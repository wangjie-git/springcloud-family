package com.ks.gpgp.user.client.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class Org implements Serializable {
	private String forgId;

	private String frsId;

	private String fparentId;

	private String forgCode;

	private String forgName;

	private String forgShname;

	private String forgClass;

	private String forgAddr;

	private String forgContacts;

	private String forgTelephone;

	private String fisavailable;

	private BigDecimal fordernum;

	private String forgDesc;

	private Integer fversion;

	private String flogcby;

	private Date flogcdate;

	private String flogluby;

	private Date flogludate;

	private String floglaby;

	private Date flogladate;

	private Date fdockingTime;

	private String forgArea;

	private String fcheckDataConfig;

	private static final long serialVersionUID = 1L;

	public Org() {
		super();
	}

	public Org(String forgId, String frsId, String fparentId, String forgCode, String forgName, String forgShname,
			String forgClass, String forgAddr, String forgContacts, String forgTelephone, String fisavailable,
			BigDecimal fordernum, String forgDesc, Integer fversion, String flogcby, Date flogcdate, String flogluby,
			Date flogludate, String floglaby, Date flogladate, Date fdockingTime, String forgArea,
			String fcheckDataConfig) {
		super();
		this.forgId = forgId;
		this.frsId = frsId;
		this.fparentId = fparentId;
		this.forgCode = forgCode;
		this.forgName = forgName;
		this.forgShname = forgShname;
		this.forgClass = forgClass;
		this.forgAddr = forgAddr;
		this.forgContacts = forgContacts;
		this.forgTelephone = forgTelephone;
		this.fisavailable = fisavailable;
		this.fordernum = fordernum;
		this.forgDesc = forgDesc;
		this.fversion = fversion;
		this.flogcby = flogcby;
		this.flogcdate = flogcdate;
		this.flogluby = flogluby;
		this.flogludate = flogludate;
		this.floglaby = floglaby;
		this.flogladate = flogladate;
		this.fdockingTime = fdockingTime;
		this.forgArea = forgArea;
		this.fcheckDataConfig = fcheckDataConfig;
	}

	public String getForgId() {
		return forgId;
	}

	public void setForgId(String forgId) {
		this.forgId = forgId == null ? null : forgId.trim();
	}

	public String getFrsId() {
		return frsId;
	}

	public void setFrsId(String frsId) {
		this.frsId = frsId == null ? null : frsId.trim();
	}

	public String getFparentId() {
		return fparentId;
	}

	public void setFparentId(String fparentId) {
		this.fparentId = fparentId == null ? null : fparentId.trim();
	}

	public String getForgCode() {
		return forgCode;
	}

	public void setForgCode(String forgCode) {
		this.forgCode = forgCode == null ? null : forgCode.trim();
	}

	public String getForgName() {
		return forgName;
	}

	public void setForgName(String forgName) {
		this.forgName = forgName == null ? null : forgName.trim();
	}

	public String getForgShname() {
		return forgShname;
	}

	public void setForgShname(String forgShname) {
		this.forgShname = forgShname == null ? null : forgShname.trim();
	}

	public String getForgClass() {
		return forgClass;
	}

	public void setForgClass(String forgClass) {
		this.forgClass = forgClass == null ? null : forgClass.trim();
	}

	public String getForgAddr() {
		return forgAddr;
	}

	public void setForgAddr(String forgAddr) {
		this.forgAddr = forgAddr == null ? null : forgAddr.trim();
	}

	public String getForgContacts() {
		return forgContacts;
	}

	public void setForgContacts(String forgContacts) {
		this.forgContacts = forgContacts == null ? null : forgContacts.trim();
	}

	public String getForgTelephone() {
		return forgTelephone;
	}

	public void setForgTelephone(String forgTelephone) {
		this.forgTelephone = forgTelephone == null ? null : forgTelephone.trim();
	}

	public String getFisavailable() {
		return fisavailable;
	}

	public void setFisavailable(String fisavailable) {
		this.fisavailable = fisavailable == null ? null : fisavailable.trim();
	}

	public BigDecimal getFordernum() {
		return fordernum;
	}

	public void setFordernum(BigDecimal fordernum) {
		this.fordernum = fordernum;
	}

	public String getForgDesc() {
		return forgDesc;
	}

	public void setForgDesc(String forgDesc) {
		this.forgDesc = forgDesc == null ? null : forgDesc.trim();
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

	public String getForgArea() {
		return forgArea;
	}

	public void setForgArea(String forgArea) {
		this.forgArea = forgArea == null ? null : forgArea.trim();
	}

	public String getFcheckDataConfig() {
		return fcheckDataConfig;
	}

	public void setFcheckDataConfig(String fcheckDataConfig) {
		this.fcheckDataConfig = fcheckDataConfig == null ? null : fcheckDataConfig.trim();
	}
}
package com.ks.gpgp.user.client.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户实体对象
 * @author HWB
 *
 */
public class User implements Serializable {

	private String fuserId;

	private String fempId;

	private String fuserName;

	private String fpassword;

	private String fisavailable;

	private Date flastLogin;

	private String flastLoginIp;

	private Integer fversion;

	private String flogcby;

	private Date flogcdate;

	private String flogluby;

	private Date flogludate;

	private String floglaby;

	private Date flogladate;

	private static final long serialVersionUID = 1L;

	public User(String fuserId, String fempId, String fuserName, String fpassword, String fisavailable, Date flastLogin,
			String flastLoginIp, Integer fversion, String flogcby, Date flogcdate, String flogluby, Date flogludate,
			String floglaby, Date flogladate) {
		super();
		this.fuserId = fuserId;
		this.fempId = fempId;
		this.fuserName = fuserName;
		this.fpassword = fpassword;
		this.fisavailable = fisavailable;
		this.flastLogin = flastLogin;
		this.flastLoginIp = flastLoginIp;
		this.fversion = fversion;
		this.flogcby = flogcby;
		this.flogcdate = flogcdate;
		this.flogluby = flogluby;
		this.flogludate = flogludate;
		this.floglaby = floglaby;
		this.flogladate = flogladate;
	}

	public User() {
		super();
	}

	public String getFuserId() {
		return fuserId;
	}

	public void setFuserId(String fuserId) {
		this.fuserId = fuserId == null ? null : fuserId.trim();
	}

	public String getFempId() {
		return fempId;
	}

	public void setFempId(String fempId) {
		this.fempId = fempId == null ? null : fempId.trim();
	}

	public String getFuserName() {
		return fuserName;
	}

	public void setFuserName(String fuserName) {
		this.fuserName = fuserName == null ? null : fuserName.trim();
	}

	public String getFpassword() {
		return fpassword;
	}

	public void setFpassword(String fpassword) {
		this.fpassword = fpassword == null ? null : fpassword.trim();
	}

	public String getFisavailable() {
		return fisavailable;
	}

	public void setFisavailable(String fisavailable) {
		this.fisavailable = fisavailable == null ? null : fisavailable.trim();
	}

	public Date getFlastLogin() {
		return flastLogin;
	}

	public void setFlastLogin(Date flastLogin) {
		this.flastLogin = flastLogin;
	}

	public String getFlastLoginIp() {
		return flastLoginIp;
	}

	public void setFlastLoginIp(String flastLoginIp) {
		this.flastLoginIp = flastLoginIp == null ? null : flastLoginIp.trim();
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
}
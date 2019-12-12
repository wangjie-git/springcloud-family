package com.ks.spfd.admin.api.dto;

public class MenuTreeMark {

	private String type;

	private String isChecked;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(String isChecked) {
		this.isChecked = isChecked;
	}

	public MenuTreeMark(String type, String isChecked) {
		super();
		this.type = type;
		this.isChecked = isChecked;
	}
}

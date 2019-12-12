package com.ks.gpgp.user.server.repo;

import org.apache.ibatis.annotations.Mapper;

import com.ks.gpgp.user.client.entity.Employee;

/**
 * 员工仓储接口
 * @author HWB
 *
 */
@Mapper
public interface EmployeeMapper {

	int deleteByPrimaryKey(String fempId);

	int insert(Employee record);

	int insertSelective(Employee record);

	Employee selectByPrimaryKey(String fempId);

	int updateByPrimaryKeySelective(Employee record);

	int updateByPrimaryKey(Employee record);
}
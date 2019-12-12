package com.ks.gpgp.user.server.repo;

import org.apache.ibatis.annotations.Mapper;

import com.ks.gpgp.user.client.entity.User;

/**
 * 用户仓储接口
 * @author HWB
 *
 */
@Mapper
public interface UserMapper {
	
    int deleteByPrimaryKey(String fuserId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String fuserId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    /**
     * 通过用户名查找用户信息
     * @param username
     * @return
     */
    User selectByUsername(String username);
}
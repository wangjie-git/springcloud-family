package com.ks.gpgp.user.server.repo;

import org.apache.ibatis.annotations.Mapper;

import com.ks.gpgp.user.client.entity.Org;

/**
 * 机构仓储接口 
 * @author HWB
 *
 */
@Mapper
public interface OrgMapper {
	
    int deleteByPrimaryKey(String forgId);

    int insert(Org record);

    int insertSelective(Org record);

    Org selectByPrimaryKey(String forgId);

    int updateByPrimaryKeySelective(Org record);

    int updateByPrimaryKey(Org record);
}
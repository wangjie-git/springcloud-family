package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.SysDept;
import com.ks.spfd.admin.mapper.SysDeptMapper;
import com.ks.spfd.admin.service.SysDeptService;
import org.springframework.stereotype.Service;

/**
 * 部门信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:07:20
 */
@Service("sysDeptService")
public class SysDeptServiceImpl extends ServiceImpl<SysDeptMapper, SysDept> implements SysDeptService {

    /**
     * 部门信息表简单分页查询
     * @param sysDept 部门信息表
     * @return
     */
    @Override
    public IPage<SysDept> getSysDeptPage(Page<SysDept> page, SysDept sysDept){
        return baseMapper.getSysDeptPage(page,sysDept);
    }

}

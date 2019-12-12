/*
 *  Copyright (c) 2019-2020, 冷冷 (wangiegie@gmail.com).
 *  <p>
 *  Licensed under the GNU Lesser General Public License 3.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  <p>
 * https://www.gnu.org/licenses/lgpl.html
 *  <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.ks.spfd.admin.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.dto.OrgTree;
import com.ks.spfd.admin.api.dto.MenuTreeMark;
import com.ks.spfd.admin.api.entity.SysOrg;
import com.ks.spfd.admin.api.entity.SysOrgRelation;
import com.ks.spfd.admin.api.vo.TreeUtil;
import com.ks.spfd.admin.mapper.SysOrgMapper;
import com.ks.spfd.admin.service.SysDeptRelationService;
import com.ks.spfd.admin.service.SysOrgService;
import com.ks.spfd.common.security.util.SecurityUtils;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 部门管理 服务实现类
 * </p>
 *
 * @author lengleng
 * @since 2019/2/1
 */
@Service
public class SysOrgServiceImpl extends ServiceImpl<SysOrgMapper, SysOrg> implements SysOrgService {

	@Autowired
	SysDeptRelationService sysDeptRelationService;

	/**
	 * 添加信息部门
	 *
	 * @param dept 部门
	 * @return
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public Boolean saveDept(SysOrg dept) {
		SysOrg sysDept = new SysOrg();
		BeanUtils.copyProperties(dept, sysDept);
		this.save(sysDept);
		sysDeptRelationService.insertDeptRelation(sysDept);
		return Boolean.TRUE;
	}

	/**
	 * 删除部门
	 *
	 * @param id 部门 ID
	 * @return 成功、失败
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public Boolean removeDeptById(Integer id) {
		// 级联删除部门
		List<Integer> idList = sysDeptRelationService
				.list(Wrappers.<SysOrgRelation>query().lambda().eq(SysOrgRelation::getAncestor, id)).stream()
				.map(SysOrgRelation::getDescendant).collect(Collectors.toList());

		if (CollUtil.isNotEmpty(idList)) {
			this.removeByIds(idList);
		}

		// 删除部门级联关系
		sysDeptRelationService.deleteAllDeptRealtion(id);
		return Boolean.TRUE;
	}

	/**
	 * 更新部门
	 *
	 * @param sysDept 部门信息
	 * @return 成功、失败
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public Boolean updateDeptById(SysOrg sysDept) {
		// 更新部门状态
		this.updateById(sysDept);
		// 更新部门关系
/*		SysOrgRelation relation = new SysOrgRelation();
		relation.setAncestor(sysDept.getOrgParentId());
		relation.setDescendant(sysDept.getDeptId());
		sysDeptRelationService.updateDeptRealtion(relation);*/
		return Boolean.TRUE;
	}

	/**
	 * 查询全部部门树
	 *
	 * @return 树
	 */
	@Override
	public List<OrgTree> selectTree() {
		return getDeptTree(this.list(Wrappers.emptyWrapper()));
	}

	/**
	 * 查询用户部门树
	 *
	 * @return
	 */
	@Override
	public List<OrgTree> getUserTree() {
		String deptId = SecurityUtils.getUser().getOrgId();
		List<Integer> descendantIdList = sysDeptRelationService
				.list(Wrappers.<SysOrgRelation>query().lambda().eq(SysOrgRelation::getAncestor, deptId)).stream()
				.map(SysOrgRelation::getDescendant).collect(Collectors.toList());

		List<SysOrg> deptList = baseMapper.selectBatchIds(descendantIdList);
		return getDeptTree(deptList);
	}

	/**
	 * 构建部门树
	 *
	 * @param depts 部门
	 * @return
	 */
	private List<OrgTree> getDeptTree(List<SysOrg> depts) {
		List<OrgTree> treeList = depts.stream().filter( org -> !org.getOrgId().equals(org.getOrgParentId()))
				.map(dept -> {
					OrgTree node = new OrgTree();
					node.setId(dept.getOrgId() + "");
					node.setParentId(dept.getOrgParentId() + "");
					node.setTitle(dept.getOrgName());
					node.setCheckArr(new MenuTreeMark("0", "0"));
					return node;
				}).collect(Collectors.toList());
		return TreeUtil.bulid(treeList, "0");
	}
}

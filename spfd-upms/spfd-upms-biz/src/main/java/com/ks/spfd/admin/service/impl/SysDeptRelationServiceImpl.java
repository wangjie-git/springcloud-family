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

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.SysOrg;
import com.ks.spfd.admin.api.entity.SysOrgRelation;
import com.ks.spfd.admin.mapper.SysOrgRelationMapper;
import com.ks.spfd.admin.service.SysDeptRelationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author lengleng
 * @since 2019/2/1
 */
@Service
public class SysDeptRelationServiceImpl extends ServiceImpl<SysOrgRelationMapper, SysOrgRelation>
		implements SysDeptRelationService {
	
	/*private SysOrgRelationMapper sysDeptRelationMapper;*/

	/**
	 * 维护部门关系
	 *
	 * @param sysDept 部门
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertDeptRelation(SysOrg sysDept) {
/*		// 增加部门关系表
		SysOrgRelation condition = new SysOrgRelation();
		condition.setDescendant(sysDept.getOrgParentId());
		List<SysOrgRelation> relationList = sysDeptRelationMapper.selectList(
				Wrappers.<SysOrgRelation>query().lambda().eq(SysOrgRelation::getDescendant, sysDept.getParentId()))
				.stream().map(relation -> {
					relation.setDescendant(sysDept.getDeptId());
					return relation;
				}).collect(Collectors.toList());
		if (CollUtil.isNotEmpty(relationList)) {
			this.saveBatch(relationList);
		}

		// 自己也要维护到关系表中
		SysOrgRelation own = new SysOrgRelation();
		own.setDescendant(sysDept.getDeptId());
		own.setAncestor(sysDept.getDeptId());
		sysDeptRelationMapper.insert(own);*/
	}

	/**
	 * 通过ID删除部门关系
	 *
	 * @param id
	 */
	@Override
	public void deleteAllDeptRealtion(Integer id) {
		baseMapper.deleteDeptRelationsById(id);
	}

	/**
	 * 更新部门关系
	 *
	 * @param relation
	 */
	@Override
	public void updateDeptRealtion(SysOrgRelation relation) {
		baseMapper.updateDeptRelations(relation);
	}

}

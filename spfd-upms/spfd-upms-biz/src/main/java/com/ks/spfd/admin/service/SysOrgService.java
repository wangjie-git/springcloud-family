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

package com.ks.spfd.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.dto.OrgTree;
import com.ks.spfd.admin.api.entity.SysOrg;

import java.util.List;

/**
 * <p>
 * 机构管理 服务类
 * </p>
 *
 * @author lengleng
 * @since 2019/2/1
 */
public interface SysOrgService extends IService<SysOrg> {

	/**
	 * 查询机构树菜单
	 *
	 * @return 树
	 */
	List<OrgTree> selectTree();

	/**
	 * 查询机构用户树
	 *
	 * @return
	 */
	List<OrgTree> getUserTree();

	/**
	 * 添加信息部门
	 *
	 * @param sysDept
	 * @return
	 */
	Boolean saveDept(SysOrg sysDept);

	/**
	 * 删除部门
	 *
	 * @param id 部门 ID
	 * @return 成功、失败
	 */
	Boolean removeDeptById(Integer id);

	/**
	 * 更新部门
	 *
	 * @param sysDept 部门信息
	 * @return 成功、失败
	 */
	Boolean updateDeptById(SysOrg sysDept);

}

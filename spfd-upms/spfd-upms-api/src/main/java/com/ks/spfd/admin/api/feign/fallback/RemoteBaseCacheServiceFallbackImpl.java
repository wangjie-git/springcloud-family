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

package com.ks.spfd.admin.api.feign.fallback;

import com.ks.spfd.admin.api.feign.RemoteBaseCacheService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import organization.OrganizationInfoDto;

import java.util.List;


@Component
@Slf4j
public class RemoteBaseCacheServiceFallbackImpl implements RemoteBaseCacheService {

	private Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	private Throwable cause;


	public Throwable getCause() {
		return cause;
	}

	public void setCause(Throwable cause) {
		this.cause = cause;
	}

	@Override
	public List<OrganizationInfoDto> getCacheOrgList(){

		log.info( "调用代码生成错误！{}",cause );
		return null;
	}
}

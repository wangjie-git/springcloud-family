package organization;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 版本        修改时间        作者
 * V1.0        2019/11/26 0026        wangjie
 * 文件说明: 机构信息 Vo 实体
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrganizationInfoDto implements Serializable {
    //机构主键ID 用于业务交互
    private String orgId;
    //机构索引ID
    private String orgRsId;
    //机构的父类ID
    private String parentOrgId;
    //机构编码Code
    private String orgCode;
    //机构等级
    private String orgClass;
    //机构简称
    private String orgShot;
    //机构名称
    private String orgName;
    //机构地址
    private String orgAddress;
    //联系人
    private String orgContacts;
    //电话号码
    private String orgTelephone;
    //是否可用
    private String available;
    //备注
    private String orgDesc;
    //机构所属区域
    private String orgArea;
    //对接第三方 机构客户编码ID
    private String clientId;
    //存储第三方机构ID
    private String thirdId;

}



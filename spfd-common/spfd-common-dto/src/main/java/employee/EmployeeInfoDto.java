package employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 版本        修改时间        作者
 * V1.0        2019/11/26 0026        wangjie
 * 文件说明: EmployeeInfoDto 医生信息VO
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeInfoDto {

    //员工ID
    private String empId;
    //人员编码
    private String empCode;
    //用户工号
    private String staffId;
    //人员姓名
    private String empName;
    //所属机构
    private String orgId;
    //身份证号
    private String idNo;
    //性别
    private String sex;
    //医生员工类型 0=普通用户 1=心电专家 2=会诊专家
    private String docType;
    //出生日期 YYYY-MM-DD
    private String birthday;
    //是否可用
    private String available;
    //电话号码
    private String telephone;
    //传真
    private String faxNo;
    //邮箱
    private String email;
    //个人简介
    private String empDesc;
    //所属机构索引ID
    private String orgRsId;
    //是否有自动合并当天体检报告的权限（Y:有 N:没有）
    private String autoMergeFlag;
}

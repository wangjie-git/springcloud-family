package dictionaries;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 版本        修改时间        作者
 * V1.0        2019/11/26 0026        wangjie
 * 文件说明: DictionariesInfoDto 字典表 VO对象
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DictionariesInfoDto {

    //字典ID
    private String dictId;
    //字典版本号
    private String versionId;
    //字典Code编码
    private String conceptCode;
    //字典详情
    private String conceptDesc;
    //是否可用
    private String available;
    //字典排序号
    private String orderNum;

}

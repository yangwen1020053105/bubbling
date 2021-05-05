package com.bubbling.frame.mapper;

import com.bubbling.frame.base.mapper.BaseMineMapper;
import com.bubbling.frame.model.TAcRole;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface TAcRoleMapper extends BaseMineMapper<TAcRole> {
    @Select("select b.* from t_ac_role_org a left join t_ac_role b on a.role_id=b.id where a.org_id=#{orgId} and a.IS_VALID=1 and b.IS_VALID=1")
    List<TAcRole> queryRoleByOrgId(String orgId);
    @Select("select a.* from t_ac_role_org a left join t_ac_role b on a.role_id=b.id where  b.role_name=#{roleName} and a.org_id=#{orgId} ")
    TAcRole queryRoleByOrgIdAndName(String orgId,String roleName);
}

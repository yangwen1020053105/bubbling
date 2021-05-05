package com.bubbling.frame.mapper;

import com.bubbling.frame.base.mapper.BaseMineMapper;
import com.bubbling.frame.model.TAcUser;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface TAcUserMapper extends BaseMineMapper<TAcUser> {
    @Select("select b.* from t_ac_user_org a left join t_ac_user b on b.ID=a.USER_ID where a.org_id=#{orgId} and a.IS_VALID=1 and b.IS_VALID=1")
    List<TAcUser> queryUserByOrgId(String orgId);
}

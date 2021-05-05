package com.bubbling.frame.base.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.bubbling.frame.base.tools.SessionUtils;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * @title: mtbatiesplus自动填充sql
 * @Author yangwen
 * @Date: 2021-04-05 22:18
 * @ignore
 */
@Component
public class MybatesPlusMetaObjectHandler  implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        this.strictInsertFill(metaObject, "isValid", Integer.class, new Integer(1)); // 起始版本 3.3.0(推荐使用)
        this.strictInsertFill(metaObject, "createUser", String.class, SessionUtils.getUserId());
        this.strictInsertFill(metaObject, "createTime", Date.class, new Date()); // 起始版本 3.3.0(推荐使用)
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.strictUpdateFill(metaObject, "updateUser", String.class, SessionUtils.getUserId());
        this.strictUpdateFill(metaObject, "updateTime", Date.class, new Date()); // 起始版本 3.3.0(推荐)
    }
}

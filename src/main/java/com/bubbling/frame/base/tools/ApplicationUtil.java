package com.bubbling.frame.base.tools;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * TODO
 *
 * @author dc_yangwen
 * @version 1.0
 * @date 2020/9/13 23:29
 */
@Component
public class ApplicationUtil {
    public static String shiroUser;
    @Value("${shiro.user}")
    public void setShiroUser(String value){
        shiroUser=value;
    }
}

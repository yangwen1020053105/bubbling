package com.bubbling.frame.base.model;

import org.springframework.stereotype.Component;

import static com.bubbling.frame.base.constants.SrvConstants.RTN_CODE_SUCCESS;

@Component
public class ResponseBean<T> {
    private String rtnCode;
    private String rtnMsg;
    private T data;

    public String getRtnCode() {
        return rtnCode;
    }

    public void setRtnCode(String rtnCode) {
        this.rtnCode = rtnCode;
    }

    public String getRtnMsg() {
        return rtnMsg;
    }

    public void setRtnMsg(String rtnMsg) {
        this.rtnMsg = rtnMsg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static ResponseBean rtn(String rtnCode, String rtnMsg, Object data) {
        ResponseBean response = new ResponseBean();
        response.setRtnCode(rtnCode);
        response.setRtnMsg(rtnMsg);
        response.setData(data);
        return response;
    }

    public static ResponseBean success() {
        ResponseBean response = new ResponseBean();
        response.setRtnCode(RTN_CODE_SUCCESS);
        response.setRtnMsg("success");
        return response;
    }

    public static ResponseBean success(Object data) {
        ResponseBean response = new ResponseBean();
        response.setRtnCode(RTN_CODE_SUCCESS);
        response.setRtnMsg("success");
        response.setData(data);
        return response;
    }

    public static ResponseBean error(String rtnCode, String rtnMsg) {
        ResponseBean response = new ResponseBean();
        response.setRtnCode(rtnCode);
        response.setRtnMsg(rtnMsg);
        return response;
    }
}

package com.bubbling.frame.base.tools;

import org.apache.commons.codec.binary.Base64;

import java.io.IOException;

public class Base64Utils {

    /**
     * base64解码
     * @param base64String
     * @return
     * @throws IOException
     */
    public static byte[] decoder(String base64String) throws IOException {
        Base64 base64=new Base64();
        if (BaseUtils.isNotNull(base64String)){
            return base64.decode(base64String);
        }else{
            return null;
        }

    }
    /**
     * base64编码
     * @param b
     * @return
     * @throws IOException
     */
    public static String encode(byte[] b) throws IOException {
        Base64 base64=new Base64();
        if (BaseUtils.isNotNull(b)){
            return base64.encodeAsString(b);
        }else{
            return null;
        }

    }
}

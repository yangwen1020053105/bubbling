package com.bubbling.frame.base.tools;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.IntegerConverter;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bubbling.frame.base.bean.BaseBean;
import org.apache.commons.lang3.ArrayUtils;

public class BaseUtils {
	public static final String rootPath=Thread.currentThread().getContextClassLoader().getResource("").getPath();
	/**
	 * 判断是否为空
	 * @author         dc_yangwen
	 * @Date           2019年12月15日 下午8:07:36
	 */
	public static boolean isNull(Object object) {
		if (object==null) {
			return true;
		}else {
			return false;
		}
	}
	/**
	 * 判断是否为空
	 * @author         dc_yangwen
	 * @Date           2019年12月15日 下午8:07:36
	 */
	public static boolean isNotNull(Object object) {
		if (object!=null) {
			return true;
		}else {
			return false;
		}
	}
	/**
	 * 判断是否为空
	 * @author         dc_yangwen
	 * @Date           2019年12月15日 下午8:07:36
	 */
	public static boolean isNull(String str) {
		if (str==null||str.equals("")) {
			return true;
		}else {
			return false;
		}
	}
	/**
	 * 判断是否为空
	 * @author         dc_yangwen
	 * @Date           2019年12月15日 下午8:07:36
	 */
	public static boolean isNotNull(String str) {
		if (str!=null&&!str.equals("")) {
			return true;
		}else {
			return false;
		}
	}
	/**
	 * md5加密
	 * @author         dc_yangwen
	 * @Date           2019年12月15日 下午9:10:37
	 */
	public static String getMD5String(String str) {
        try {
            // 生成一个MD5加密计算摘要
            MessageDigest md = MessageDigest.getInstance("MD5");
            // 计算md5函数
            md.update(str.getBytes());
            // digest()最后确定返回md5 hash值，返回值为8位字符串。因为md5 hash值是16位的hex值，实际上就是8位的字符
            // BigInteger函数则将8位的字符串转换成16位hex值，用字符串来表示；得到字符串形式的hash值
            //一个byte是八位二进制，也就是2位十六进制字符（2的8次方等于16的2次方）
            return new BigInteger(1, md.digest()).toString(16);
        } catch (Exception e) {
           e.printStackTrace();
           return null;
        }
    }
	/**
     * 将map转换为object，转换全部属性（按照key和对象属性之间的关系进行转换）
     * @param map
     * @param t
     * @param <T>
     * @return
     */
    public static <T> T  mapToObject(Map<String, Object> map, T t) {
        return mapToObject(map, t,null);
    }
 
    /**
     * 将map转换为object，排除指定key
     * @param map
     * @param t
     * @param excludeKeys
     * @param <T>
     * @return
     */
    public static <T> T  mapToObject(Map<String, Object> map, T t, String[] excludeKeys) {
        Class beanClass = t.getClass();
        String[] declaredFieldsName = getDeclaredFieldsName(beanClass);
        if (ArrayUtils.isNotEmpty(excludeKeys)) {
            removeEntries(map, excludeKeys);
        }
        for (Object k : map.keySet()) {
            Object v = map.get(k);
            if (ArrayUtils.contains(declaredFieldsName, k.toString())) {
                try {
                    Field field = beanClass.getDeclaredField(k.toString());
                    field.setAccessible(true);
                    if (isNotNull(v)) {
                    	v=ConvertUtils.convert(v, field.getType());
					}
                    field.set(t,v);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return t;
    }
    /**
     * map转object
     * @author 杨文
     * @date 2020年4月4日
     * @param object
     * @return
     */
    public static Map<String,Object> objectToMap(Object object) {
    	return JSONObject.parseObject(JSON.toJSONString(object));
	}
    /**
     * map转object
     * @author 杨文
     * @param <T>
     * @date 2020年4月4日
     * @return
     */
    public static <T> List<Map<String,Object>> objectToMap(List<T> objects) {
    	List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
    	for (int i = 0; i < objects.size(); i++) {
    		list.add(JSONObject.parseObject(JSON.toJSONString(objects.get(i))));
		}
    	return list;
	}
    /**
     * Map中根据key批量删除键值对
     * @param map
     * @param excludeKeys
     * @param <K>
     * @param <V>
     * @return
     */
    public static <K, V> Map removeEntries(Map<K, V> map, K[] excludeKeys) {
        Iterator<K> iterator = map.keySet().iterator();
        while (iterator.hasNext()) {
            K k = iterator.next();
            // 如果k刚好在要排除的key的范围中
            if (ArrayUtils.contains(excludeKeys, k)) {
                iterator.remove();
                map.remove(k);
            }
        }
        return map;
    }
	/**
     * 获取转换后的对象的所有属性名称，以字符串数组形式返回
     * @param beanClass
     * @return
     */
    public static String[] getDeclaredFieldsName(Class beanClass) {
        Field[] fields = beanClass.getDeclaredFields();
        int size = fields.length;
        String[] fieldsName = new String[size];
        for (int i = 0; i < size; i++) {
            fieldsName[i] = fields[i].getName();
        }
        return fieldsName;
    }
    /**
     * 获取树根节点数据
     * @throws InvocationTargetException 
     * @throws IllegalArgumentException 
     * @throws IllegalAccessException 
     * @throws SecurityException 
     * @throws NoSuchMethodException 
     */
    public static <T> List<T> getRootNode(List<T> list,String idName,String pidName) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
    	List<T> retList=new ArrayList<T>();
    	List<T> treeList=list;
    	List<T> treeList2=list;
    	idName=initialsCapitalization(idName);
    	pidName=initialsCapitalization(pidName);
    	Method methodId;
    	for (T t : treeList) {
    		boolean isHave=false;
    		methodId= t.getClass().getMethod("get"+idName);
    		String id=(String) methodId.invoke(t);
    		for (T t2 : treeList2) {
    			methodId= t2.getClass().getMethod("get"+pidName);
    			String pid=(String) methodId.invoke(t2);
    			if (id.equals(pid)) {
    				isHave=true;
				}
			}
    		if (!isHave) {
    			retList.add(t);
			}
		}
		return retList;
	}
    /**
     * 首字母大写
     */
    public static String initialsCapitalization(String str) {
        // 效率高的方法
        char[] chars = str.toCharArray();
        if (chars[0] >= 'a' && chars[0] <= 'z') {
            chars[0] = (char)(chars[0] - 32);
        }
        return new String(chars);
	}
    /**
     * base64加密
     * @author 杨文
     * @date 2020年4月4日
     * @param b
     * @return
     */
    public static byte[] base64Decoder(String b) {
    	Decoder decoder = Base64.getDecoder();
		return decoder.decode(b);
	}
    /**
     * base64解密
     * @author 杨文
     * @date 2020年4月4日
     * @param b
     * @return
     */
    public static String base64Encoder(byte[] b) {
    	Encoder encoder = Base64.getEncoder();
		return encoder.encodeToString(b);
	}
    public static void copyObject(Object source, Object dest) throws Exception {
		Map<String, Object> tmp = new HashMap<String, Object>();
		// 搜集参数到tmp
		if (source instanceof Iterable<?> || dest instanceof Iterable<?>)
			return;
		Object value;
		//是否设置null值,默认不设置NULL值，即忽略空值
		boolean isSetNullValue = false;
		if (source instanceof Map<?, ?>) {
			for (Object key : ((Map<?, ?>) source).keySet()) {
				value = ((Map<?, ?>) source).get(key);
				if (value instanceof Timestamp) {
					value = new Date(((Timestamp) value).getTime());// 转换成date
				}
				tmp.put(key.toString(), value);
			}
		} else {
			Method[] ms = source.getClass().getDeclaredMethods();
			String fieldName;

			// 判断该类是否继承BaseBean,不继承则在本类中寻找，继承则在父类中直接寻找getIsSetNullValue方法获取值
			if(!BaseBean.class.isAssignableFrom(source.getClass())){
				for(Method m : ms){
					fieldName = m.getName();
					// 判断是否设置方法
					if("getIsSetNullValue".equals(fieldName)){
						value = m.invoke(source);
						if(value == null || value.toString().length() <= 0){
							isSetNullValue = false;
						}else{
							isSetNullValue = (Boolean)value;
						}
					}
				}
			}else{
				Method m = source.getClass().getSuperclass().getDeclaredMethod("getIsSetNullValue");
				value = m.invoke(source);
				if(value == null || value.toString().length() <= 0){
					isSetNullValue = false;
				}else{
					isSetNullValue = (Boolean)value;
				}
			}
			
			for (Method m : ms) {
				fieldName = m.getName();
				if (fieldName.indexOf("get") >= 0) {
					fieldName = fieldName.substring(
							fieldName.indexOf("get") + 3, fieldName.length());
					value = m.invoke(source);
					if (value == null || value.toString().length() <= 0){
						// 忽略null值
						if(!isSetNullValue){
							continue;
						}
					}

					if (value instanceof Timestamp) {
						value = new Date(((Timestamp) value).getTime());// 转换成date
					}
					tmp.put(fieldName, value);
				}
			}
		}
		// 为目标复制
		for (String key : tmp.keySet()) {
			if (tmp.get(key) == null || tmp.get(key).toString().length() <= 0){
				// 忽略null值
				if(!isSetNullValue){
					continue;
				}
			}

			if (dest instanceof Map<?, ?>) {
				((Map<String, Object>) dest).put(key, tmp.get(key));
			} else {
				// 防止出现null默认值为0 的情况
				ConvertUtils.register(new IntegerConverter(null), Integer.class);
				BeanUtils.setProperty(dest, key, tmp.get(key));// 复制
				BeanUtils.setProperty(dest, key.substring(0, 1).toLowerCase()
						+ key.substring(1), tmp.get(key));// 复制
			}
		}
	}

    /**
     * 复制sour里属性不为空的值到obje为空的属性
     *
     * @param obje    目标实体类
     * @param sour    源实体类
     * @param isCover 是否保留obje类里不为null的属性值(true为保留源值，属性为null则赋值)
     * @return obje
     */
    public static Object copyObject(Object sour, Object obje, boolean isCover) {
        Field[] fields = sour.getClass().getDeclaredFields();
        for (int i = 0, j = fields.length; i < j; i++) {
            String propertyName = fields[i].getName();
            Object propertyValue = getProperty(sour, propertyName);
            if (isCover) {
                if (getProperty(obje, propertyName) == null && propertyValue != null) {
                    Object setProperty = setProperty(obje, propertyName, propertyValue);
                }
            } else {
                Object setProperty = setProperty(obje, propertyName, propertyValue);
            }

        }
        return obje;
    }
    /**
     * 得到值
     *
     * @param bean
     * @param propertyName
     * @return
     */
    private static Object getProperty(Object bean, String propertyName) {
        Class clazz = bean.getClass();
        try {
            Field field = clazz.getDeclaredField(propertyName);
            Method method = clazz.getDeclaredMethod(getGetterName(field.getName(),field.getType()), new Class[]{});
            return method.invoke(bean, new Object[]{});
        } catch (Exception e) {
        }
        return null;
    }
    /**
     * 根据变量名得到get方法
     *
     * @param propertyName
     * @return
     */
    private static String getGetterName(String propertyName) {
        String method ;
        if( propertyName.length()>1&& Character.isUpperCase(propertyName.charAt(1))){
             method = "get" +propertyName;
        }else{
            method = "get" + propertyName.substring(0, 1).toUpperCase() + propertyName.substring(1);
        }
        return method;
    }
    /**
     * 根据变量名和类型获取getter方法
     * @param propertyName
     * @param type
     * @return
     */
    private static String getGetterName(String propertyName, Class<?> type) {
        String method ;
        if(type==Boolean.class|| type==boolean.class){
            if("is".equalsIgnoreCase(propertyName.substring(0, 2))){
                return propertyName;
            }else{
                return "is" + propertyName.substring(0, 1).toUpperCase() + propertyName.substring(1);
            }

        }
        if( propertyName.length()>1&& Character.isUpperCase(propertyName.charAt(1))){
            method = "get" +propertyName;
        }else{
            method = "get" + propertyName.substring(0, 1).toUpperCase() + propertyName.substring(1);
        }
        return method;
    }
    /**
     * 给bean赋值
     *
     * @param bean
     * @param propertyName
     * @param value
     * @return
     */
    private static Object setProperty(Object bean, String propertyName, Object value) {
        Class clazz = bean.getClass();
        try {
            Field field = clazz.getDeclaredField(propertyName);
            Method method = clazz.getDeclaredMethod(getSetterName(field.getName()), new Class[]{field.getType()});
            return method.invoke(bean, new Object[]{value});
        } catch (Exception e) {
        }
        return null;
    }
    /**
     * 得到setter方法
     *
     * @param propertyName 变量名
     * @return
     */
    private static String getSetterName(String propertyName) {
//        String method = "set" + propertyName.substring(0, 1).toUpperCase() + propertyName.substring(1);
        String method ;
        if( propertyName.length()>1&& Character.isUpperCase(propertyName.charAt(1))){
            method = "set" +propertyName;
        }else{
            method = "set" + propertyName.substring(0, 1).toUpperCase() + propertyName.substring(1);
        }
        return method;
    }
}

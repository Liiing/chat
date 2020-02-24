package com.kn.util;

public class Gson {
    private static com.google.gson.Gson gson = new com.google.gson.Gson();

    public static <T> T fromJson(String json, Class<?> d) {
        return (T) gson.fromJson(json, d);
    }

    public static String toJson(Object c) {
        return gson.toJson(c);
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.constant;

/**
 *
 * @author ADMIN
 */
public class CategorySQL {

    // get all categories
    public static String getAllCategories = "select * from dbo.Category\n";
    // get category name by Id
    public static String getCategoryById = "select * from dbo.Category\n"
            + "where id= ?";
    // count number of product each category
    public static String getCountProduct = "select c.name,count (p.cateId) as total from Products p join Category c\n"
            + "on p.cateId = c.id\n"
            + "group by c.name";
}

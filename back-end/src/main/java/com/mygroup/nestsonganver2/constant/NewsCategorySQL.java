/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.constant;

/**
 *
 * @author dd220
 */
public class NewsCategorySQL {
    public static String findAll = "SELECT * FROM NewsCategory";
    
    public static String findByID = "SELECT * FROM NewsCategory WHERE id = ?";
    
    public static String add = "Insert into NewsCategory "
            + "output "
            + "inserted.id, "
            + "inserted.title "
            + "values(?)";
    
    public static String update = "Update NewsCategory "
            + "SET title = ? "
            + "output inserted.id, inserted.title "
            + "WHERE id = ?";
    
    public static String delete = "delete NewsCategory output deleted.id, deleted.title where id = ?";
}

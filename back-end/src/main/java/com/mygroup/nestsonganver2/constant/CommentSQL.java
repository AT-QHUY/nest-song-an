/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.constant;

/**
 *
 * @author ADMIN
 */
public class CommentSQL {

    public static String getCommentsByProductId = "SELECT * FROM Comments where productId = ?";

    public static String getCommentById = "SELECT * FROM Comments where id = ?";

    public static String getRatingByIdProduct = "select avg(cast(rating  AS float)) as 'star'\n"
            + "from dbo.Comments\n"
            + "where productId= ?\n"
            + "group by productId";

    public static String addNewComment = "insert into dbo.Comments (productId, userId, comment, rating)\n"
            + "Values (?,?,?,?)";
    //get by status
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.dao;

import com.mygroup.nestsonganver2.entity.CommentEntity;
import java.util.List;

/**
 *
 * @author ADMIN
 */
public interface ICommentDAO extends IDao<CommentEntity> {
    public List<CommentEntity> getCommentsByProductId(int id);
    
    public CommentEntity getCommentById(int id);
    
    public float getRatingByProductId(int id);
    
    public int addNewComment(CommentEntity comment);
}

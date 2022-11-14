/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.dao.impl;

import com.mygroup.nestsonganver2.constant.CommentSQL;
import com.mygroup.nestsonganver2.constant.ProductSQL;
import com.mygroup.nestsonganver2.dao.ICommentDAO;
import com.mygroup.nestsonganver2.entity.CommentEntity;
import com.mygroup.nestsonganver2.entity.ProductEntity;
import com.mygroup.nestsonganver2.mapper.CommentMapper;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ADMIN
 */
public class CommentDAO extends AbstractDAO<CommentEntity> implements ICommentDAO  {
    public static CommentDAO instance;
    
    public static CommentDAO getInstance() {
        if (instance == null)
            instance = new CommentDAO();
        return instance;
    }
    
    CommentMapper commentMapper= CommentMapper.getInstance();
    private CommentDAO(){}
   
    //GET
    @Override
    public List<CommentEntity> getCommentsByProductId(int id) {
        List<CommentEntity> list = new ArrayList<>();
        try { 
            list = query(CommentSQL.getCommentsByProductId, new CommentMapper(),id);
        } catch (Exception ex) {
            System.out.println(ex);
        }
        return list;
    }
    
    @Override
    public CommentEntity getCommentById(int id){
       List<CommentEntity> list = new ArrayList<>();
        try { 
            list = query(CommentSQL.getCommentById, new CommentMapper(),id);
        } catch (Exception ex) {
            System.out.println(ex);
        }
        if (list == null || list.isEmpty())
            return null;
        return list.get(0);

    }
    
    @Override
    public float getRatingByProductId(int id){
        List<Float> ans= query(CommentSQL.getRatingByIdProduct,commentMapper.getStarbyProductId, id);
        if (ans==null || ans.isEmpty())
            return 0;
        return ans.get(0);
    }
    
     @Override
    public int addNewComment(CommentEntity comment) {
        int id = insert(CommentSQL.addNewComment, comment.getUserId(), comment.getProductId(), comment.getComment(), comment.getRating());
        return id;
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.service;

import com.mygroup.nestsonganver2.converter.CommentConverter;
import com.mygroup.nestsonganver2.dao.impl.CommentDAO;
import com.mygroup.nestsonganver2.dto.CommentDTO;
import com.mygroup.nestsonganver2.entity.CommentEntity;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ADMIN
 */
public class CommentService {
    private static final CommentDAO commentDAO = CommentDAO.getInstance();

    private static CommentService commentService;

    public static CommentService getInstance() {
        if (commentService == null) {
            commentService = new CommentService();
        }
        return commentService;
    }
    
     public List<CommentDTO> getCommentsByProductId(int id){
        List<CommentDTO> list = new ArrayList<>();
        CommentDTO commentDTO;
        List<CommentEntity> entityList = commentDAO.getCommentsByProductId(id);
        if(entityList == null) return null;      
        for (CommentEntity comment : entityList) {
            commentDTO = CommentConverter.convertEntitytoDTO(comment);
            list.add(commentDTO);
        }
        return list;
    }
     
      public CommentDTO getCommentById(int id){
        CommentEntity entity = commentDAO.getCommentById(id);
        if(entity == null) return null;      
        return CommentConverter.convertEntitytoDTO(entity);
    }
    
    
    public int addNewComment(CommentDTO comment) throws NoSuchAlgorithmException {
        final int result = commentDAO.addNewComment(CommentConverter.convertDTOtoEntity(comment));
        return result;
    }
}

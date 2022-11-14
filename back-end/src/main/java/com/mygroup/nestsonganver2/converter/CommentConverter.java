/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.converter;

import com.mygroup.nestsonganver2.dao.impl.ProductDAO;
import com.mygroup.nestsonganver2.dao.impl.UserDAO;
import com.mygroup.nestsonganver2.dto.CommentDTO;
import com.mygroup.nestsonganver2.entity.CommentEntity;

/**
 *
 * @author ADMIN
 */
public class CommentConverter {
    
    private static CommentConverter commentConverter;
    
    public static CommentConverter getInstance(){
        if(commentConverter == null){
            commentConverter = new CommentConverter(); 
        }
        return commentConverter;
    }
     private static UserConverter userConverter=UserConverter.getInstance();
     
     private static UserDAO userDAO= UserDAO.getInstance(); 
     
     private static ProductConverter productConverter =ProductConverter.getInstance();
     
     private static ProductDAO productDAO = ProductDAO.getInstance(); 
    public static CommentDTO convertEntitytoDTO(CommentEntity entity){
        CommentDTO dto = new CommentDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUserId());
        dto.setProductId(entity.getProductId());
        dto.setDate(entity.getDate());
        dto.setComment(entity.getComment());
        dto.setRating(entity.getRating());
        dto.setUserName(userConverter.convertEntitytoDTO(userDAO.findUser(entity.getUserId())).getFullname());
        dto.setProductName(productConverter.convertEntitytoDTO(productDAO.getProductById(entity.getProductId())).getName());
        return dto;
    }   
    // -----------------------------------------------------------------------
    
    // Convert Entitty to DTO
    
    public static CommentEntity convertDTOtoEntity(CommentDTO dto){
        CommentEntity entity = new CommentEntity();
        entity.setId(dto.getId());
        entity.setUserId(dto.getUserId());
        entity.setProductId(dto.getProductId());
        entity.setDate(dto.getDate());
        entity.setComment(dto.getComment());
        entity.setRating(dto.getRating());
        return entity;
    } 
}

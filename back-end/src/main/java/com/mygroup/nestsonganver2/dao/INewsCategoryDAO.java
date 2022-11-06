/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.dao;

import com.mygroup.nestsonganver2.entity.NewsCategoryEntity;
import java.util.List;

/**
 *
 * @author dd220
 */
public interface INewsCategoryDAO {
    public List<NewsCategoryEntity> findAllNewsCategory();
    
    public NewsCategoryEntity findNewsCategoryByID(int id);
    
    public NewsCategoryEntity addNewsCategoryEntity(NewsCategoryEntity entity);
}

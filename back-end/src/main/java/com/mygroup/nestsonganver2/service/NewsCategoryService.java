/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.service;

import com.mygroup.nestsonganver2.dao.impl.NewsCategoryDAO;
import com.mygroup.nestsonganver2.entity.NewsCategoryEntity;
import java.util.List;

/**
 *
 * @author dd220
 */
public class NewsCategoryService {
    
    private NewsCategoryDAO newsCategoryDAO = NewsCategoryDAO.getNewsCategoryDAO();
    
    private NewsCategoryService(){}
    
    private static NewsCategoryService instance = null;
    public static NewsCategoryService getNewsCategoryService() {
        if (instance == null) 
            instance = new NewsCategoryService();
        return instance;
    }
    
    public List<NewsCategoryEntity> findAllNewsCategory() {
        return newsCategoryDAO.findAllNewsCategory();
    }
    
    public NewsCategoryEntity findNewsCategory(int id) {
        return newsCategoryDAO.findNewsCategoryByID(id);
    }

    public NewsCategoryEntity addCategoryForNews(NewsCategoryEntity cate) {
        return newsCategoryDAO.addNewsCategoryEntity(cate);
    }

    public NewsCategoryEntity updateCategoryOfNews(NewsCategoryEntity cate) {
        return newsCategoryDAO.updateCategoryOfNews(cate);
    }

    public NewsCategoryEntity deleteCategoryOfNews(int id) {
        return newsCategoryDAO.deleteCategoryOfNews(id);
    }

    public NewsCategoryEntity findCategoryOfNewsById(int id) {
        return newsCategoryDAO.findNewsCategoryByID(id);
    }
}

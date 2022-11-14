/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.dao.impl;

import com.mygroup.nestsonganver2.constant.NewsCategorySQL;
import com.mygroup.nestsonganver2.dao.INewsCategoryDAO;
import com.mygroup.nestsonganver2.entity.NewsCategoryEntity;
import com.mygroup.nestsonganver2.mapper.NewsCategoryMapper;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author dd220
 */
public class NewsCategoryDAO extends AbstractDAO<NewsCategoryEntity> implements INewsCategoryDAO {

    private NewsCategoryMapper mapper = new NewsCategoryMapper();

    private static NewsCategoryDAO instance = null;

    public static NewsCategoryDAO getNewsCategoryDAO() {
        if (instance == null) {
            instance = new NewsCategoryDAO();
        }
        return instance;
    }

    private NewsCategoryDAO() {
    }

    @Override
    public List<NewsCategoryEntity> findAllNewsCategory() {
        List<NewsCategoryEntity> list = query(NewsCategorySQL.findAll, mapper);
        if (!list.isEmpty()) {
            return list;
        }
        return new ArrayList();
    }

    @Override
    public NewsCategoryEntity findNewsCategoryByID(int id) {
        List<NewsCategoryEntity> list = query(NewsCategorySQL.findByID, mapper, id);
        if (list == null) return null;
        if (list.isEmpty()) return null;
        return list.get(0);
    }

    @Override
    public NewsCategoryEntity addNewsCategoryEntity(NewsCategoryEntity entity) {
        List<NewsCategoryEntity> added = query(NewsCategorySQL.add, mapper, entity.getTitle());
        if (added == null) {
            return null;
        }
        if (added.isEmpty()) {
            return null;
        }
        return added.get(0);
    }

    public NewsCategoryEntity updateCategoryOfNews(NewsCategoryEntity cate) {
        List<NewsCategoryEntity> updated = query(NewsCategorySQL.update, mapper, cate.getTitle(), cate.getId());
        if (updated == null) {
            return null;
        }
        if (updated.isEmpty()) {
            return null;
        }
        return updated.get(0);
    }

    public NewsCategoryEntity deleteCategoryOfNews(int id) {
        List<NewsCategoryEntity> deleted = query(NewsCategorySQL.delete, mapper, id);
        if (deleted == null) return null;
        if (deleted.isEmpty()) return null;
        return deleted.get(0);
    }

}

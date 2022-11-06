/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.dao.impl;

import com.mygroup.nestsonganver2.constant.BillStatusSQL;
import com.mygroup.nestsonganver2.dao.IBillStatusDAO;
import com.mygroup.nestsonganver2.entity.BillStatusEntity;
import com.mygroup.nestsonganver2.mapper.BillStatusMapper;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author huy
 */
public class BillStatusDAO extends AbstractDAO<BillStatusEntity> implements IBillStatusDAO{
    
    private static BillStatusDAO billStatusDAO = null;

    public static BillStatusDAO getInstance() {
        if (billStatusDAO == null) {
            billStatusDAO = new BillStatusDAO();
        }
        return billStatusDAO;
    }

    @Override
    public List<BillStatusEntity> findAll() {
          List<BillStatusEntity> entityList = query(BillStatusSQL.findAll, new BillStatusMapper());
        if (entityList == null) {
            return new ArrayList<>();
        }
        return entityList;
    }
    
}

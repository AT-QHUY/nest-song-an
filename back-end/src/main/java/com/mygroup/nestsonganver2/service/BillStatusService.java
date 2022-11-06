/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.service;

import com.mygroup.nestsonganver2.converter.BillStatusConverter;
import com.mygroup.nestsonganver2.dao.impl.BillStatusDAO;
import com.mygroup.nestsonganver2.dto.BillStatusDTO;
import com.mygroup.nestsonganver2.entity.BillStatusEntity;
import java.util.List;

/**
 *
 * @author huy
 */
public class BillStatusService {
    
    private static BillStatusDAO billStatusDAO = BillStatusDAO.getInstance();

    
    private static BillStatusConverter converter = BillStatusConverter.getInstance();
    
    private static BillStatusService billStatusService;

    public static BillStatusService getInstance() {
        if (billStatusService == null) {
            billStatusService = new BillStatusService();
        }
        return billStatusService;
    }
    
     public List<BillStatusDTO> findAll() {
        List<BillStatusDTO> list;
        List<BillStatusEntity> entityList = billStatusDAO.findAll();
        list = converter.toDTO(entityList);
        return list;
    }
}

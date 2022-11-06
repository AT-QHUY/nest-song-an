/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.converter;

import com.mygroup.nestsonganver2.dto.BillStatusDTO;
import com.mygroup.nestsonganver2.entity.BillStatusEntity;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author huy
 */
public class BillStatusConverter {
    private static BillStatusConverter converter;
    
    public static BillStatusConverter getInstance(){
        if(converter == null){
            converter = new BillStatusConverter(); 
        }
        return converter;
    }
    
     public BillStatusDTO toDTO(BillStatusEntity entity) {
        BillStatusDTO dto = new BillStatusDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }

    public List<BillStatusDTO> toDTO(List<BillStatusEntity> entityList) {
        List<BillStatusDTO> dtoList = new ArrayList<>();      
        entityList.forEach(entity -> {         
            dtoList.add(toDTO(entity));
        });
        return dtoList;
    }

    public BillStatusEntity toEntity(BillStatusDTO dto) {
        BillStatusEntity entity = new BillStatusEntity();
        entity.setId(dto.getId());
        entity.setId(dto.getId());
        return entity;
    }
    
    public List<BillStatusEntity> toEntity(List<BillStatusDTO> dtoList) {
        List<BillStatusEntity> entityList = new ArrayList<>();      
        dtoList.forEach(dto -> {         
            entityList.add(toEntity(dto));
        });
        return entityList;
    }
}

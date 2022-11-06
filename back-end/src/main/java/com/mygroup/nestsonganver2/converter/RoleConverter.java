/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.converter;

import com.mygroup.nestsonganver2.dto.RoleDTO;
import com.mygroup.nestsonganver2.entity.RoleEntity;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author huy
 */
public class RoleConverter {
    
    private static RoleConverter roleConverter;
    
    public static RoleConverter getInstance(){
        if(roleConverter == null){
            roleConverter = new RoleConverter(); 
        }
        return roleConverter;
    }
    
    public RoleDTO toDTO(RoleEntity entity) {
        RoleDTO dto = new RoleDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }
    
    public List<RoleDTO> toDTO(List<RoleEntity> entityList) {
        List<RoleDTO> dtoList = new ArrayList<>();      
        entityList.forEach(entity -> {         
            dtoList.add(toDTO(entity));
        });
        return dtoList;
    }
}

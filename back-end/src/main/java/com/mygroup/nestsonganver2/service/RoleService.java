/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.service;

import com.mygroup.nestsonganver2.converter.RoleConverter;
import com.mygroup.nestsonganver2.dao.impl.RoleDAO;
import com.mygroup.nestsonganver2.dto.RoleDTO;
import com.mygroup.nestsonganver2.entity.RoleEntity;
import java.util.List;

/**
 *
 * @author huy
 */
public class RoleService {
    
    private static RoleDAO roleDAO = RoleDAO.getRoleDAO();

    private static RoleConverter converter = RoleConverter.getInstance();

    private static RoleService roleService;

    public static RoleService getInstance() {
        if (roleService == null) {
            roleService = new RoleService();
        }
        return roleService;
    }
    
     public List<RoleDTO> findAllRoles() {
        List<RoleDTO> list;
        List<RoleEntity> entityList = roleDAO.getAllRole();
        list = converter.toDTO(entityList);
        return list;
    }
}

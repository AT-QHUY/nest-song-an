/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.mapper;

import com.mygroup.nestsonganver2.entity.NewsCategoryEntity;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author dd220
 */
public class NewsCategoryMapper implements RowMapper<NewsCategoryEntity>{

    @Override
    public NewsCategoryEntity mapRow(ResultSet rs) {
        try {
            return new NewsCategoryEntity(
                    rs.getInt("id"),
                    rs.getString("title"));
        } catch (SQLException ex) {
            Logger.getLogger(NewsCategoryMapper.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
}

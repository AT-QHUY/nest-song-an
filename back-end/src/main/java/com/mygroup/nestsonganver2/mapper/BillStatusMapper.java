/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.mapper;

import com.mygroup.nestsonganver2.entity.BillStatusEntity;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author huy
 */
public class BillStatusMapper implements RowMapper<BillStatusEntity>{

    @Override
    public BillStatusEntity mapRow(ResultSet rs) {
         try {
            BillStatusEntity bill_status = new BillStatusEntity();
            bill_status.setId(rs.getInt("id"));
            bill_status.setName(rs.getString("status_name"));
            return bill_status;
        } catch (SQLException ex) {
            Logger.getLogger(UserMapper.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
    
}

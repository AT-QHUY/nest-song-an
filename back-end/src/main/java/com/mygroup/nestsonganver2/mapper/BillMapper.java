/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.mapper;

import com.mygroup.nestsonganver2.dto.BillDTO;
import com.mygroup.nestsonganver2.dto.ProductDTO;
import com.mygroup.nestsonganver2.entity.BillEntity;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.time.LocalDate;
import java.util.function.Function;

/**
 *
 * @author Silver King
 */
public class BillMapper implements RowMapper<BillEntity> {
    
    public static BillMapper instance;
    
    public static BillMapper getInstance(){
        if(instance == null){
            instance = new BillMapper();
        }
        return instance;
    }
    

    @Override
    public BillEntity mapRow(ResultSet rs) {
        try {
            BillEntity bill = new BillEntity();
            bill.setId(rs.getInt("id"));
            bill.setDate(rs.getDate("date"));
            bill.setStatus(rs.getInt("status"));
            bill.setCustomerId(rs.getInt("customerId"));
            bill.setEmpId(rs.getInt("empId"));
            bill.setTotalPrice(rs.getFloat("TotalPrice"));
            bill.setAddress(rs.getString("address"));
            bill.setPhoneNumber(rs.getString("phoneNumber"));
            bill.setPaymentStatusId(rs.getInt("payment_status_id"));
            return bill;
        } catch (SQLException ex) {
            Logger.getLogger(UserMapper.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
    
     public Function<ResultSet, BillDTO> mapRowWithTotalOnBill = rs -> {
        try {
            BillDTO dto = new BillDTO();
            dto.setMonthYear(rs.getString("date"));
            dto.setTotalByMonth(rs.getFloat("total"));
            return dto;
        } catch (SQLException ex) {
            Logger.getLogger(ProductMapper.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    };

}

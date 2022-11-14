/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.constant;

/**
 *
 * @author huy
 */
public class PaymentStatusSQL {
  
    public static String findAll = "SELECT * FROM PaymentStatus";
    public static String findOneById = "Select * from PaymentStatus \n"
                                     + "where id = ?";
   
    //------------------------------
    
    public static String updateStatus = "UPDATE Bills\n"
                                      + "set payment_status_id = ?\n"
                                      + "where id = ?";
}

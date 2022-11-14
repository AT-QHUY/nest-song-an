/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.constant;

/**
 *
 * @author Silver King
 */
public class BillSQL {

    //create new bill
    public static String insertNew = "INSERT INTO Bills (date,status,customerId,empId,TotalPrice,address,phoneNumber,payment_status_id)\n"
            + "VALUES(?,?,?,?,?,?,?,?)";
    public static String insertNewCart = "INSERT INTO Bills (date,status,customerId,empId)\n"
            + "VALUES(?,?,?,?)";

    //--------------------------------------------------------------------------
    //Retrive bill data
    public static String findAll = "select * from Bills where status = 2 or status = 3 or status =4 order by date desc";
    public static String findById = "select * from Bills where Bills.id = ?";
    public static String findByStatus = "select * from Bills where Bills.status = ? order by date desc";
    public static String findByCustomerId = "select * from Bills where Bills.customerId = ? and (status = 2 or status = 3 or status =4) order by date desc";
    public static String findByEmpId = "select * from Bills where Bills.empId = ? and (status = 2 or status = 3 or status =4) order by date desc";


    //--------------------------------------------------------------------------
    //Update bill
    public static String updateStatus = "update Bills set status = ? where id = ?";
    public static String updateBill = "update Bills set date = ?, status = ?, customerId = ?, empId = ?, "
            + " TotalPrice=?, address=?, phoneNumber=?,  payment_status_id = ? where id=?";

    //--------------------------------------------------------------------------
    public static String findByEmpIdAndStatus = "select * from Bills where empId=? and status =? order by date desc";
    public static String findByCustomerIdAndStatus = "select * from Bills where customerId=? and status =? order by date desc";

    public static String calculateStaticValue = "select [date] = FORMAT(DATEADD(Month, DATEDIFF(month,0,[date]), 0), 'MM-yyyy'),\n"
            + "		sum(TotalPrice) as total\n"
            + "from dbo.Bills\n"
            + "group by DATEADD(Month, DATEDIFF(month,0,[date]), 0)";
}

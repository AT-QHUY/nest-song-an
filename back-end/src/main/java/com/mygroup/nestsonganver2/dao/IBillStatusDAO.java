/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.dao;

import com.mygroup.nestsonganver2.entity.BillStatusEntity;
import java.util.List;

/**
 *
 * @author huy
 */
public interface IBillStatusDAO {
    public List<BillStatusEntity> findAll();
}

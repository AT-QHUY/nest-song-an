/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.api;

import com.mygroup.nestsonganver2.dto.BillStatusDTO;
import com.mygroup.nestsonganver2.service.BillStatusService;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author huy
 */

@Path("bill_status")
public class BillStatusAPI {
    private static final BillStatusService billStatusService = BillStatusService.getInstance();
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() {
//        UserDTO dto = (UserDTO) ctx.getProperty("tokenObject");
        List<BillStatusDTO> list = billStatusService.findAll();
        if (list == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        if (list.isEmpty()) {
            return Response.status(Response.Status.NOT_MODIFIED).build();
        } else {
            return Response.ok(list, MediaType.APPLICATION_JSON).build();
        }

    }

}

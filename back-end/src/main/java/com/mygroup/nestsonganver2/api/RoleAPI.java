/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.api;

import com.mygroup.nestsonganver2.dto.RoleDTO;
import com.mygroup.nestsonganver2.service.RoleService;
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
@Path("role")
public class RoleAPI {

    private static final RoleService roleService = RoleService.getInstance();
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() {
//        UserDTO dto = (UserDTO) ctx.getProperty("tokenObject");
        List<RoleDTO> list = roleService.findAllRoles();
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

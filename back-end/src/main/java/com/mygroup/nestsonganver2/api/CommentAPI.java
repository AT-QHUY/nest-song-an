/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.api;

import com.mygroup.nestsonganver2.dto.CommentDTO;
import com.mygroup.nestsonganver2.service.CommentService;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author ADMIN
 */
@Path("comment")
public class CommentAPI {
    
     private static final CommentService commentService = CommentService.getInstance();
    
    @Context
    UriInfo ui;
    @GET
    @Path("{Id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCommentsByProductId(@PathParam("Id") int Id) {
        List<CommentDTO> list = commentService.getCommentsByProductId(Id);
        if (list == null || list.isEmpty()) 
            return Response.status(Response.Status.NOT_MODIFIED).build();

        return Response.ok(list, MediaType.APPLICATION_JSON).build();
    }
    
   @GET
    @Path("id/{Id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCommentById(@PathParam("Id") int Id) {
        CommentDTO dto = commentService.getCommentById(Id);
        if (dto == null) 
            return Response.status(Response.Status.NOT_MODIFIED).build();

        return Response.ok(dto, MediaType.APPLICATION_JSON).build();
    } 
 
    @POST
    @Path("/add")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addNewComment(CommentDTO comment) throws URISyntaxException, NoSuchAlgorithmException {
        //authentication
        int id = commentService.addNewComment(comment);
        if (id == 0) {
            return Response.status(Response.Status.NOT_MODIFIED).build();
        } else {
            URI uri = new URI(ui.getBaseUri() + "comment" + id);
            return Response.created(uri).build();
        }

    }
}

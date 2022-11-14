/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.api;

import com.mygroup.nestsonganver2.dto.UserDTO;
import com.mygroup.nestsonganver2.service.MailService;
import javax.mail.MessagingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author dd220
 */
@Path("mail")
public class MailAPI {
    
    private final MailService mailService = new MailService();

    @POST
    @Path("otp")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response getOTP(String email) throws Exception {
        String OTP = mailService.sendMail(email);
        return Response.ok(OTP, MediaType.APPLICATION_JSON).build();
    }
    
    @GET
    @Path("send-discount/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response sendDiscount(@PathParam("email") String email) throws MessagingException {
        mailService.sendDiscountProduct(email);
        return Response.ok().build();
    }
}

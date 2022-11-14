/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.api;

import com.mygroup.nestsonganver2.dto.ImageDTO;
import com.mygroup.nestsonganver2.dto.NewsDTO;
import com.mygroup.nestsonganver2.entity.NewsCategoryEntity;
import com.mygroup.nestsonganver2.service.ImageService;
import com.mygroup.nestsonganver2.service.NewsService;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author dd220
 */
@Path("news")
public class NewsAPI {

    private NewsService newsService = NewsService.getNewsService();

    private ImageService imgService = ImageService.getImageService();

    @Context
    UriInfo ui;

    //Get all news
    @GET
    @Path("all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllNews() {
        List<NewsDTO> list = newsService.getAllNews();
        if (list.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(list, MediaType.APPLICATION_JSON).build();
    }

    //Get news by id
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNewsById(@PathParam("id") int id) {
        NewsDTO dto = newsService.getNewsById(id);
        if (dto.getTitle() == null) {
            return Response.noContent().build();
        }
        return Response.ok(dto, MediaType.APPLICATION_JSON).build();
    }

    // pagination 
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNewsPagination(@QueryParam("page") int page, @QueryParam("numOfNews") int numberOfNews) {
        List<NewsDTO> newsList = newsService.getNewsPagiantion(page, numberOfNews);
        if (newsList == null || newsList.isEmpty()) {
            return Response.ok(new ArrayList(), MediaType.APPLICATION_JSON).build();
        }
        return Response.ok(newsList, MediaType.APPLICATION_JSON).build();
    }

    //Get all news by category
    @GET
    @Path("category-all/{cateId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllNewsByCategory(@PathParam("cateId") int cateId) {
        return Response.ok(newsService.getAllNewsByCategoryPagination(cateId), MediaType.APPLICATION_JSON).build();
    }
    //Get by category
    @GET
    @Path("category/{cateId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNewsByCategory(@PathParam("cateId") int cateId, @QueryParam("page") int page, @QueryParam("numOfNews") int numberOfNews) {
        List<NewsDTO> newsList = newsService.getNewsByCategoryPagination(cateId, page, numberOfNews);
        if (newsList == null || newsList.isEmpty()) {
            return Response.ok(new ArrayList(), MediaType.APPLICATION_JSON).build();
        }
        
        return Response.ok(newsList, MediaType.APPLICATION_JSON).build();
    }

    //Add news
    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addNews(NewsDTO dto) throws URISyntaxException {
        int id = newsService.addNews(dto);
        if (id == 0) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }
        URI uri = new URI(ui.getBaseUri() + "news/" + id);
        return Response.created(uri).build();
    }

    //update news by id
    @POST
    @Path("update/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)   
    public Response updateNews(@PathParam("id") int id, NewsDTO dto) {
        NewsDTO updated = newsService.updateNews(id, dto);
        if (dto == null || updated == null) {
            return Response.status(Response.Status.NOT_MODIFIED).build();
        }

        if (!updated.getDescription().equalsIgnoreCase(dto.getDescription())
                || !updated.getShortDescription().equalsIgnoreCase(dto.getShortDescription())
                || updated.getEmpId() != dto.getEmpId()
                || !updated.getTitle().equalsIgnoreCase(dto.getTitle())) {
            return Response.ok(updated, MediaType.APPLICATION_JSON).build();
        }
        return Response.notModified().build();
    }

    //Delete news by id
    @DELETE
    @Path("/{id}")
    public Response deleteNews(@PathParam("id") int id) {
        int check = newsService.deleteNews(id);
        if (check == 0) {
            return Response.notModified().build();
        }
        return Response.accepted().build();
    }
}

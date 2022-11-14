package com.mygroup.nestsonganver2.api;

import com.mygroup.nestsonganver2.entity.NewsCategoryEntity;
import com.mygroup.nestsonganver2.service.NewsCategoryService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;

@Path("news-category")
public class NewsCategoryAPI {

    private final NewsCategoryService categoryService = NewsCategoryService.getNewsCategoryService();

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getCategoryOfNewsById(@PathParam("id")int id) {
        NewsCategoryEntity find = categoryService.findCategoryOfNewsById(id);
        if (find == null) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }
        return Response.ok(find, MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllNewsCategories() {
        List<NewsCategoryEntity> list = categoryService.findAllNewsCategory();
        if (list == null || list.isEmpty()) {
            return Response.ok(new ArrayList<>(), MediaType.APPLICATION_JSON).build();
        }
        return Response.ok(list, MediaType.APPLICATION_JSON).build();
    }

    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addNewsCategory(NewsCategoryEntity cate) {
        NewsCategoryEntity added = categoryService.addCategoryForNews(cate);
        if (added == null) {
            return Response.status(Response.Status.NOT_MODIFIED).build();
        }
        return Response.ok(added, MediaType.APPLICATION_JSON).build();
    }

    @PUT
    @Path("update")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCategoryOfNews(NewsCategoryEntity cate) {
        NewsCategoryEntity updated = categoryService.updateCategoryOfNews(cate);
        if (updated == null) {
            return Response.notModified().build();
        }
        return Response.ok(updated, MediaType.APPLICATION_JSON).build();
    }

    @DELETE
    @Path("delete")
    public Response deleteCategoryOfNews(@QueryParam("id") int id) {
        NewsCategoryEntity deleted = categoryService.deleteCategoryOfNews(id);
        if (deleted == null) {
            return Response.notModified().build();
        }
        return Response.ok(deleted, MediaType.APPLICATION_JSON).build();
    }
}

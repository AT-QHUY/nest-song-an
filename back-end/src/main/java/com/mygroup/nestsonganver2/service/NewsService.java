/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.service;

import com.mygroup.nestsonganver2.converter.NewsConverter;
import com.mygroup.nestsonganver2.dao.impl.NewsDAO;
import com.mygroup.nestsonganver2.dto.ImageDTO;
import com.mygroup.nestsonganver2.dto.NewsDTO;
import com.mygroup.nestsonganver2.entity.NewsCategoryEntity;
import com.mygroup.nestsonganver2.entity.NewsEntity;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author dd220
 */
public class NewsService {

    public ImageService imageService = ImageService.getImageService();
    public static NewsService instance;

    public static NewsService getNewsService() {
        if (instance == null) {
            instance = new NewsService();
        }
        return instance;
    }

    private NewsService() {
    }
    private NewsCategoryService cateService = NewsCategoryService.getNewsCategoryDAO();
    private NewsDAO newsDAO = NewsDAO.getNewsDAO();

    //Get all News service
    public List<NewsDTO> getAllNews() {
        List<NewsEntity> entityList = newsDAO.getAllNews();
        if (entityList.isEmpty()) {
            return new ArrayList<NewsDTO>();
        }
        NewsDTO dto = new NewsDTO();
        List<NewsCategoryEntity> cateList = cateService.findAllNewsCategory();
        List<NewsDTO> dtoList = new ArrayList<>();
        for (NewsEntity entity : entityList) {
            dto = NewsConverter.convertEntityToDTO(entity);
            dtoList.add(dto);
            for (NewsCategoryEntity cate : cateList) {
                if (cate.getId() == entity.getCateId()) {
                    dto.setCate(cate);
                    break;
                }
            }
        }
        return dtoList;
    }

    //Get news by ID 
    public NewsDTO getNewsById(int id) {
        NewsEntity entity = newsDAO.getNewsById(id);
        NewsDTO dto = new NewsDTO();
        if (entity == null) {
            return dto;
        }
        dto = NewsConverter.convertEntityToDTO(entity);
        List<NewsCategoryEntity> cateList = cateService.findAllNewsCategory();
        for (NewsCategoryEntity cate : cateList) {
            if (cate.getId() == entity.getCateId()) {
                dto.setCate(cate);
                break;
            }
        }
        return dto;
    }

    //Get pagination news
    public List<NewsDTO> getNewsPagiantion(int page, int numberOfNews) {
        int offset = page * numberOfNews;
        if (page > 0 && page != 1) {
            offset = (page - 1) * numberOfNews;
        }
        int fetch = numberOfNews;
        List<NewsEntity> newsList = newsDAO.getNewsPaginantion(offset, fetch);
        if (newsList == null || newsList.isEmpty()) {
            return new ArrayList();
        }
        NewsDTO dto = new NewsDTO();
        List<NewsCategoryEntity> cateList = cateService.findAllNewsCategory();
        List<NewsDTO> dtoList = new ArrayList<>();
        for (NewsEntity entity : newsList) {
            dto = NewsConverter.convertEntityToDTO(entity);
            for (NewsCategoryEntity cate : cateList) {
                if (cate.getId() == entity.getCateId()) {
                    dto.setCate(cate);
                    break;
                }
            }
            dtoList.add(dto);

        }
        return dtoList;
    }

    //Get news by cate 
    public List<NewsDTO> getNewsByCategoryPagination(int cateId, int page, int numberOfNews) {
        int offset = page * numberOfNews;
        if (page > 0 && page != 1) {
            offset = (page - 1) * numberOfNews;
        }
        int fetch = numberOfNews;

        List<NewsEntity> newsList = newsDAO.getNewsByCatePagination(cateId, offset, fetch);
        if (newsList == null || newsList.isEmpty()) {
            return new ArrayList<>();
        }
        NewsCategoryEntity cateEntity = cateService.findNewsCategory(cateId);
        NewsDTO dto = new NewsDTO();
        List<NewsDTO> dtoList = new ArrayList<>();
        for (NewsEntity entity : newsList) {
            dto = NewsConverter.convertEntityToDTO(entity);
            dto.setCate(cateEntity);
            dtoList.add(dto);
        }
        return dtoList;
    }

    //Add news 
    public int addNews(NewsDTO dto) {
        if (dto.getDescription() == null) {
            dto.setDescription("");
        }
        if (dto.getShortDescription() == null) {
            dto.setShortDescription("");
        }
        if (dto.getTitle() == null) {
            dto.setTitle("");
        }
        if (dto.getEmpId() == 0) {
            dto.setEmpId(1);
        }
        if (dto.getCate() == null) {
            NewsCategoryEntity cate = new NewsCategoryEntity();
            cate.setId(1);
            dto.setCate(cate);
        }
        NewsEntity add = NewsConverter.convertDTOToEnity(dto);
        add.setCateId(dto.getCate().getId());

        int id = newsDAO.addNews(add);
        if (id != 0) {
            ImageDTO imageDTO = new ImageDTO();
            imageDTO.setImgPath(dto.getImagePath());
            imageDTO.setNewsId(id);
            imageService.addImage(imageDTO);
        } else {
            return 0;
        }
        return id;
    }

    //update news by id
    public NewsDTO updateNews(int id, NewsDTO dto) {
        NewsEntity old = newsDAO.getNewsById(id);

        if (old == null) {
            return null;
        }

        if (dto == null) {
            return NewsConverter.convertEntityToDTO(old);
        }

        if (dto.getDescription() != null) {
            old.setDescription(dto.getDescription());
        }

        if (dto.getShortDescription() != null) {
            old.setShortDescription(dto.getShortDescription());
        }

        if (dto.getEmpId() != old.getEmpId() && dto.getEmpId() != 0) {
            old.setEmpId(dto.getEmpId());
        }
        if (dto.getCate() != null) {
            if (dto.getCate().getId() != old.getCateId() && dto.getCate().getId() != 0) {
                old.setCateId(dto.getCate().getId());
            }
        }

        int check = newsDAO.updateNewsById(old);
        if (check != 0) {
            NewsDTO result = NewsConverter.convertEntityToDTO(old);
            result.setCate(cateService.findNewsCategory(old.getCateId()));
            return result;
        }
        return null;
    }

    //Delete news by Id
    // check = 0: is fail
    // check > 0: is deleted
    public int deleteNews(int id) {
        int check = 0;
        NewsEntity deleteNews = newsDAO.getNewsById(id);
        if (deleteNews == null) {
            return check;
        }

        check = newsDAO.deleteNews(id);
        return check;
    }
}

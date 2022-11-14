/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.converter;

import com.mygroup.nestsonganver2.dao.impl.ImageDAO;
import com.mygroup.nestsonganver2.dto.NewsDTO;
import com.mygroup.nestsonganver2.entity.NewsEntity;
import com.mygroup.nestsonganver2.service.ImageService;
import com.mygroup.nestsonganver2.service.NewsCategoryService;

/**
 *
 * @author dd220
 */
public class NewsConverter {

    private static ImageService imageService = ImageService.getImageService();
    private static NewsCategoryService newCategoryService = NewsCategoryService.getNewsCategoryService();

    public static NewsDTO convertEntityToDTO(NewsEntity entity) {
        NewsDTO dto = new NewsDTO(
                entity.getId(),
                 entity.getDescription(),
                 entity.getTitle(),
                 entity.getShortDescription(),
                 entity.getEmpId()
        );
        dto.setCate(newCategoryService.findNewsCategory(entity.getCateId()));
        dto.setListImages(imageService.getImagesByNewsId(entity.getId()));
        return dto;
    }

    public static NewsEntity convertDTOToEnity(NewsDTO dto) {
        return new NewsEntity(
                dto.getDescription(),
                 dto.getTitle(),
                 dto.getShortDescription(),
                 dto.getEmpId()
        );
    }
}

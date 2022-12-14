/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mygroup.nestsonganver2.filter;

import com.mygroup.nestsonganver2.converter.UserConverter;
import com.mygroup.nestsonganver2.dto.UserDTO;
import com.mygroup.nestsonganver2.entity.RoleEntity;
import com.mygroup.nestsonganver2.utils.Utils;
import java.io.IOException;
import java.time.LocalDateTime;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author huy
 */
public class TokenFilter implements Filter {

    private static UserConverter converter = UserConverter.getInstance();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        res.addHeader("Access-Control-Allow-Origin", "*");
        res.addHeader("Access-Control-Allow-Headers", "*");
        res.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        res.addHeader("Access-Control-Allow-Credentials", "true");

        final String method = req.getMethod();
        final String url = req.getRequestURI().toLowerCase();
        boolean isRegister = url.contains("api/user/insert".toLowerCase());
        boolean isLogin = url.contains("api/user/login".toLowerCase());
        boolean isGetMailAPI = url.contains("api/user/mail".toLowerCase());
        boolean isGetProductFilet = url.contains("api/product/filter".toLowerCase());
        boolean isMethodAcceptable = "GET".equalsIgnoreCase(method) || "OPTIONS".equalsIgnoreCase(method);

        if (!isMethodAcceptable && !isLogin && !isRegister && !isGetMailAPI && !isGetProductFilet) {
            final String token = req.getHeader("Authorization");
            if (token == null || token.isEmpty()) {
                res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            } else {
                UserDTO dto = converter.convertTokentoDTO(req.getHeader("Authorization"));
                req.setAttribute("tokenObject", dto);
                if (dto == null || dto.getId() == 0) {
                    res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                } else {
                    chain.doFilter(request, response);
                }
            }

        } else {
            chain.doFilter(request, response);
        }

    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void destroy() {
    }

}

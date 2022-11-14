/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mygroup.nestsonganver2.service;

import com.mygroup.nestsonganver2.dto.BillDTO;
import com.mygroup.nestsonganver2.dto.Filter;
import com.mygroup.nestsonganver2.dto.ProductDTO;
import com.mygroup.nestsonganver2.utils.MailConfig;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.mygroup.nestsonganver2.utils.Utils;
import java.sql.Date;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

/**
 *
 * @author dd220
 */
public class MailService {

    private ProductService productService = ProductService.getInstance();

    public MailService() {
    }

//    private static MailService mailService;
//    public static MailService getMailService() {
//        if (mailService == null)
//            mailService = new MailService();
//        return mailService;
//    }
    Properties properties = new Properties();
    Session session;

    private void setProperties() {
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.host", MailConfig.HOST_NAME);
        properties.put("mail.smtp.socketFactory.port", MailConfig.SSL_PORT);
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        properties.put("mail.smtp.port", MailConfig.SSL_PORT);
    }

    private void setSession() {
        session = Session.getDefaultInstance(this.properties, new javax.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(MailConfig.APP_EMAIL, MailConfig.APP_PASSWORD);
            }
        });
    }

    public String sendMail(String email) throws Exception {
        setProperties();;
        setSession();
        MimeMessage message = new MimeMessage(this.session);
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
        message.setRecipients(Message.RecipientType.CC, MailConfig.APP_EMAIL);
        message.setSubject("Gửi mã OTP: " + email, "utf-8");
        String OTP = Utils.GetOTP(6);
        message.setContent("Mã OTP của bạn là: " + OTP, "text/html;charset=UTF-8");
        Transport.send(message);
        return OTP;
    }

    private String floatNumberFormat(float number) {
        DecimalFormat fomartter = new DecimalFormat("#,###.00");
        return fomartter.format(number);
    }

    private String dateTimeFormatter(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String dateStr = sdf.format(date);
        return dateStr;
    }

    public void sendBill(String email, BillDTO bill) throws Exception {
        try {
            setProperties();
            setSession();
            MimeMessage message = new MimeMessage(this.session);
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            message.setRecipients(Message.RecipientType.CC, MailConfig.APP_EMAIL);
            message.setSubject("Nest Song Ân - Chi tiết đơn hàng: " + bill.getId(), "utf-8");
            String rawMessage = "<h1>Cảm ơn quý khách đã mua sản phẩm của chúng tôi.</h1> <br>"
                    + "<h3>Ngày mua: " + dateTimeFormatter(bill.getDate()) + "</h3>"
                    + "<h3>Địa chỉ giao hàng: " + bill.getAddress() + "</h3>"
                    + "<h3>Số điện thoại người nhận: " + bill.getPhoneNumber() + "</h3>"
                    + "<h3>Tổng tiền: " + floatNumberFormat(bill.getTotalPrice()) + " đồng</h3></br>"
                    + "<h1>Kính chào và hẹn gặp lại quý khách!<h1>";
            message.setContent(rawMessage, "text/html;charset=UTF-8");
            Transport.send(message);
        } catch (MessagingException e) {
            System.out.println(e);
        }
    }

    private List<ProductDTO> filterProductList(List<ProductDTO> products) {
        List<ProductDTO> list = products.stream()
                .filter(p -> p.getDeal() > 0)
                .sorted(Comparator.comparingDouble(productDTO -> productDTO.getDeal() * (-1))) //multiply -1 for decsending order
                .collect(Collectors.toList());
        if (list != null && !list.isEmpty()) {
            if (list.size() <= 5) {
                return list;
            }
            return list.subList(0, 5);
        }
        return new ArrayList<>();
    }

    public void sendDiscountProduct(String email) throws AddressException, MessagingException {
        try {
                    List<ProductDTO> products = filterProductList(productService.getByStatus(1));
        if (products.isEmpty()) {
            return;
        }
        setProperties();;
        setSession();
        MimeMessage message = new MimeMessage(this.session);
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
        message.setRecipients(Message.RecipientType.CC, MailConfig.APP_EMAIL);
        message.setSubject("Giảm giá cực sốc tại Nest Song Ân! ", "utf-8");
        StringBuilder rawMessage = new StringBuilder("<h2>Các mặt hàng đang giảm giá cực sốc:</h2> <table>");
        products.forEach(product -> {
            rawMessage
                    .append("<tr><th>")
                    .append(product.getName())
                    .append("</th>")
                    //                    .append("<td><img width='100' height='100' style='object-fit:cover' src='")
                    //                    .append(product.getImage())
                    //                    .append("'></td>") 
                    .append("<td>Giá gốc: ")
                    .append(floatNumberFormat(product.getBasePrice()))
                    .append(" đồng</td></td><td> giảm: ")
                    .append(floatNumberFormat(product.getDeal() * 100))
                    .append("% </td><td> chỉ còn: ")
                    .append(floatNumberFormat(product.getBasePrice() * (1 - product.getDeal())))
                    .append(" đồng</td></tr>");
        });
        rawMessage.append("</table> <br> </h2>Mong quý khách sẽ ghé qua trang bán hàng của chúng tôi tại <a href='http://nest-song-an-bucket.s3-website-ap-southeast-1.amazonaws.com/'>Nest Song Ân</a>.</h2>");
        message.setContent(rawMessage.toString(), "text/html;charset=UTF-8");
        Transport.send(message);
        } catch (MessagingException e) {
            System.out.println(e);
        }
    }
}

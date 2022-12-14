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
        message.setSubject("G???i m?? OTP: " + email, "utf-8");
        String OTP = Utils.GetOTP(6);
        message.setContent("M?? OTP c???a b???n l??: " + OTP, "text/html;charset=UTF-8");
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
            message.setSubject("Nest Song ??n - Chi ti???t ????n h??ng: " + bill.getId(), "utf-8");
            String rawMessage = "<h1>C???m ??n qu?? kh??ch ???? mua s???n ph???m c???a ch??ng t??i.</h1> <br>"
                    + "<h3>Ng??y mua: " + dateTimeFormatter(bill.getDate()) + "</h3>"
                    + "<h3>?????a ch??? giao h??ng: " + bill.getAddress() + "</h3>"
                    + "<h3>S??? ??i???n tho???i ng?????i nh???n: " + bill.getPhoneNumber() + "</h3>"
                    + "<h3>T???ng ti???n: " + floatNumberFormat(bill.getTotalPrice()) + " ?????ng</h3></br>"
                    + "<h1>K??nh ch??o v?? h???n g???p l???i qu?? kh??ch!<h1>";
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
        message.setSubject("Gi???m gi?? c???c s???c t???i Nest Song ??n! ", "utf-8");
        StringBuilder rawMessage = new StringBuilder("<h2>C??c m???t h??ng ??ang gi???m gi?? c???c s???c:</h2> <table>");
        products.forEach(product -> {
            rawMessage
                    .append("<tr><th>")
                    .append(product.getName())
                    .append("</th>")
                    //                    .append("<td><img width='100' height='100' style='object-fit:cover' src='")
                    //                    .append(product.getImage())
                    //                    .append("'></td>") 
                    .append("<td>Gi?? g???c: ")
                    .append(floatNumberFormat(product.getBasePrice()))
                    .append(" ?????ng</td></td><td> gi???m: ")
                    .append(floatNumberFormat(product.getDeal() * 100))
                    .append("% </td><td> ch??? c??n: ")
                    .append(floatNumberFormat(product.getBasePrice() * (1 - product.getDeal())))
                    .append(" ?????ng</td></tr>");
        });
        rawMessage.append("</table> <br> </h2>Mong qu?? kh??ch s??? gh?? qua trang b??n h??ng c???a ch??ng t??i t???i <a href='http://nest-song-an-bucket.s3-website-ap-southeast-1.amazonaws.com/'>Nest Song ??n</a>.</h2>");
        message.setContent(rawMessage.toString(), "text/html;charset=UTF-8");
        Transport.send(message);
        } catch (MessagingException e) {
            System.out.println(e);
        }
    }
}

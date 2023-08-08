package com.bitc.finalproject.service;

import com.bitc.finalproject.dto.Bookdto;
import com.bitc.finalproject.entity.BookEntity;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
@RequiredArgsConstructor
@Service
public class SellerServiceImpl implements  SellerService{

    @Override
    public List<BookEntity> SearchApi(String Url) throws Exception {
        List<BookEntity> itemList = null;
        URL url = null;
        HttpURLConnection  urlConn = null;
        BufferedReader reader = null;
        try{
            url = new URL(Url);
            urlConn = (HttpURLConnection) url.openConnection();
            urlConn.setRequestMethod("GET");

            reader = new BufferedReader(new InputStreamReader(urlConn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            Gson gson = new Gson();
            Bookdto bookdto = gson.fromJson(sb.toString(),Bookdto.class);
            itemList = bookdto.getBookEntityList();
        } catch (Exception e){
            e.printStackTrace();
        }finally {
            if(reader != null){
                reader.close();
                if(urlConn != null){
                    urlConn.disconnect();
                }
            }

        }
        return itemList;
    }

}

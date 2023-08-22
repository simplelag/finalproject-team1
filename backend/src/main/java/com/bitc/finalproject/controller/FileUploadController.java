package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.FileEntity;
import com.bitc.finalproject.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class FileUploadController {
    private final FileRepository fileRepository;

    // application properties의 file.upload-idr의 값을 uploadDir에 할당함
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload/{boardPk}")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable String boardPk) {
        // 파일 유효성 검사
        if (file == null || file.isEmpty()) {
            return new ResponseEntity<>("업로드된 파일 없음", HttpStatus.OK);
        }

        // 파일 확장자 검사
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        if (!fileExtension.equals(".jpg") && !fileExtension.equals(".png")) {
            return new ResponseEntity<>("jpg 또는 png 파일만 업로드 가능합니다.", HttpStatus.BAD_REQUEST);
        }

        // 파일 저장
        try {
            String time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSSSS"));
            String newFileName = time+"_"+boardPk+"_"+fileName;
            File targetFile = new File(uploadDir+"questions"+File.separator+newFileName);
            FileUtils.writeByteArrayToFile(targetFile, file.getBytes());
            FileEntity entity = new FileEntity(0,Integer.parseInt(boardPk),newFileName,fileName);
            fileRepository.save(entity);
            return new ResponseEntity<>("파일 업로드 완료", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("파일 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/questions/image/{boardPk}")
    public ResponseEntity<?> returnImage(@PathVariable int boardPk) {
        String path = uploadDir+"questions"+File.separator; //이미지가 저장된 위치
        List<FileEntity> list = fileRepository.findAllByFileBoardPk(boardPk);
        String imageName = list.get(0).getFileNameSaved();
        Resource resource = new FileSystemResource(path + imageName);
        System.out.println(imageName);
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }
}


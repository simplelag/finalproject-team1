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

    @PostMapping("/uploadImg/{boardPk}")
    // @RequestParam("file") MultipartFile file 으로 파일을 받을수있다
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable String boardPk) {
        // 파일 유효성 검사
        // 넘어온 파일이 없으면(업로드를 안했으면) 그냥 OK 응답을 보낸다
        if (file == null || file.isEmpty()) {
            return new ResponseEntity<>("업로드된 파일 없음", HttpStatus.OK);
        }

        // 파일 확장자 검사
        // 파일 이름을 가져오는법 : StringUtils.cleanPath(file.getOriginalFilename())
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        // 파일 확장자를 가져오는법 : 파일명을 마지막 "."의 인덱스 이후로 자르고(substring) 소문자로 변경한다
        String fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        // 확장자가 jpg나 png가 아니면 BAD_REQUEST 오류 날린다
        if (!fileExtension.equals(".jpg") && !fileExtension.equals(".png")) {
            return new ResponseEntity<>("jpg 또는 png 파일만 업로드 가능합니다.", HttpStatus.BAD_REQUEST);
        }

        // 파일 저장
        try {
            // 시간 String 생성
            String time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSSSS"));
            // 저장용 파일 이름 String 생성
            String newFileName = time+"_"+boardPk+"_"+fileName;
            // 아래 경로에 저장을 하겠다 ex) uploads/questions/20230822170406484690_75_파일테스트2.jpg
            File targetFile = new File(uploadDir+"questions"+File.separator+newFileName);
            // targetfile 경로에 업로드된 파일을 바이트로 바꿔서 바이트로 집어넣겠다
            FileUtils.writeByteArrayToFile(targetFile, file.getBytes());

            // db에 file 테이블에 데이터 추가
            FileEntity entity = new FileEntity(0,Integer.parseInt(boardPk),newFileName,fileName);
            fileRepository.save(entity);

            // 업로드완료시 OK 응답 반환
            return new ResponseEntity<>("파일 업로드 완료", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("파일 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // front에서 <img src="/questions/image/00"></img> 이런식으로 img태그를 넣은 경우
    @GetMapping("/questions/image/{boardPk}")
    public ResponseEntity<?> returnImage(@PathVariable int boardPk) {
        // 이미지가 저장된 위치
        String path = uploadDir+"questions"+File.separator;
        List<FileEntity> list = fileRepository.findAllByFileBoardPkOrderByFilePkDesc(boardPk);
        Resource resource = null;
        if(!list.isEmpty()){
            // 리스트의 첫번째 file_name_saved 값을 가져온다
            String imageName = list.get(0).getFileNameSaved();
            // FileSystemResource(파일경로포함파일명) 으로 resource객체를 만든다
            resource = new FileSystemResource(path + imageName);
            // http 응답에 resource를 집어넣어서 돌려준다(잘모름)
            return new ResponseEntity<>(resource, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    // 삭제의경우 기존의 db에 저장된 정보와 프로젝트에 저장된 파일은 지우고 새로 추가해야할듯
    // 수정의경우 삭제과정을 거친뒤 새로 추가하는식으로 해도될듯

    // 이미지 여러개의 경우 ResponseEntity를 리스트로 만들어 반환하고
    // front에서는 그 리스트 길이만큼 img 태그를 만들어주면 될듯(잘모름)
}


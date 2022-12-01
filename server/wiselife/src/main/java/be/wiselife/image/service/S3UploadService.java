package be.wiselife.image.service;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import marvin.image.MarvinImage;
import org.marvinproject.image.transform.scale.Scale;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = false)
@Slf4j
public class S3UploadService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 s3;


    public String uploadJustOne(MultipartFile file) {
        log.info("uploadJustOne tx start");
        String s3FileName = createFileName(file.getOriginalFilename());
        String fileFormatName = file.getContentType().substring(file.getContentType().lastIndexOf("/") + 1);
        MultipartFile resizedFile = resizeImage(s3FileName, fileFormatName, file, 768); //와이드 고정값...

        ObjectMetadata objectMetadata = setObjectMetadata(file, resizedFile);

        try (InputStream inputStream = file.getInputStream()) {
            objectMetadata.setContentLength(inputStream.available());
            s3.putObject(bucket, s3FileName, inputStream, objectMetadata);

            return s3.getUrl(bucket, s3FileName).toString();
        } catch (IOException e) {
            log.info("uploadJustOne tx end");
            throw new BusinessLogicException(ExceptionCode.NEED_IMAGE);
        }

    }




    /**
     * 업로드할 친구들을 리스트형태로 받아온다.
     * @param multipartFile 리스트형태로 찬찬히 받아낸다.
     * @return
     */
    public List<String> uploadAsList(List<MultipartFile> multipartFile) {
        log.info("uploadAsList tx start");
        List<String> fileNameList = new ArrayList<>();

        multipartFile.forEach(file -> {
            String fileName = createFileName(file.getOriginalFilename());
            String fileFormatName = file.getContentType().substring(file.getContentType().lastIndexOf("/") + 1);
            MultipartFile resizedFile = resizeImage(fileName, fileFormatName, file, 768); //와이드 고정값...
            ObjectMetadata objectMetadata = setObjectMetadata(file, resizedFile);

            try(InputStream inputStream = file.getInputStream()) {
                 sendImageToS3(fileName, objectMetadata, inputStream);


            } catch(IOException e) {
                throw new BusinessLogicException(ExceptionCode.FILEUPLOAD_FAILED);
            }

            fileNameList.add(s3.getUrl(bucket, fileName).toString());
        });
        log.info("uploadAsList tx end");
        return fileNameList;
    }

    private void sendImageToS3(String fileName, ObjectMetadata objectMetadata, InputStream inputStream) {
        s3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }

    /**
     * 이미지 삭제용 메서드
     * @param imageName 삭제할 이미지 이름
     */
    public void deleteFile(String imageName) {
        log.info("deleteFile tx start");
        s3.deleteObject(new DeleteObjectRequest(bucket, imageName));
        log.info("deleteFile tx end");
    }

    //파일이름 중복방지를 위한 난수화
    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    /**
     * file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직
     * 파일 타입 지정가능함. TODO: JPEG, JPG, PNG 받는거 할껀지?
     * @param fileName
     * @return
     */
    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
    MultipartFile resizeImage(String fileName, String fileFormatName, MultipartFile originalImage, int targetWidth) {
        try {
            // MultipartFile -> BufferedImage Convert
            BufferedImage image = ImageIO.read(originalImage.getInputStream());
            // newWidth : newHeight = originWidth : originHeight
            int originWidth = image.getWidth();
            int originHeight = image.getHeight();

            // origin 이미지가 resizing될 사이즈보다 작을 경우 resizing 작업 안 함
            if(originWidth < targetWidth)
                return originalImage;

            MarvinImage imageMarvin = new MarvinImage(image);

            Scale scale = new Scale();
            scale.load();
            scale.setAttribute("newWidth", targetWidth);
            scale.setAttribute("newHeight", targetWidth * originHeight / originWidth);
            scale.process(imageMarvin.clone(), imageMarvin, null, null, false);

            BufferedImage imageNoAlpha = imageMarvin.getBufferedImageNoAlpha();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(imageNoAlpha, fileFormatName, baos);
            baos.flush();


            return new MockMultipartFile(fileName, baos.toByteArray());

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 리사이즈에 실패했습니다.");
        }
    }

    private static ObjectMetadata setObjectMetadata(MultipartFile file, MultipartFile resizedFile) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(resizedFile.getSize()); //사이즈를 전달한다.
        objectMetadata.setContentType(file.getContentType()); //이미지 타입을 전달한다.
        return objectMetadata;
    }
}
package be.wiselife.image.service;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3UploadService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 s3;


    public String uploadJustOne(MultipartFile multipartFile) throws IOException {
        String s3FileName = createFileName(multipartFile.getOriginalFilename());

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        s3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        return s3.getUrl(bucket, s3FileName).toString();
    }


    /**
     * 업로드할 친구들을 리스트형태로 받아온다.
     * @param multipartFile 리스트형태로 찬찬히 받아낸다.
     * @return
     */
    public List<String> uploadAsList(List<MultipartFile> multipartFile) {
        List<String> fileNameList = new ArrayList<>();

        multipartFile.forEach(file -> {
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize()); //사이즈를 전달한다.
            objectMetadata.setContentType(file.getContentType()); //이미지 타입을 전달한다.

            try(InputStream inputStream = file.getInputStream()) {
                s3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e) {
                throw new BusinessLogicException(ExceptionCode.FILEUPLOAD_FAILED);
            }

            fileNameList.add(fileName);
        });

        return fileNameList;
    }

    /**
     * 이미지 삭제용 메서드
     * @param imageName 삭제할 이미지 이름
     */
    public void deleteFile(String imageName) {
        s3.deleteObject(new DeleteObjectRequest(bucket, imageName));
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
}
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


    public String uploadJustOne(MultipartFile multipartFile) {

        String s3FileName = createFileName(multipartFile.getOriginalFilename());

        ObjectMetadata objMeta = new ObjectMetadata();

        try (InputStream inputStream = multipartFile.getInputStream()) {
            objMeta.setContentLength(inputStream.available());
            s3.putObject(bucket, s3FileName, inputStream, objMeta);
            return s3.getUrl(bucket, s3FileName).toString();
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.NEED_IMAGE);
        }

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

            fileNameList.add(s3.getUrl(bucket, fileName).toString());
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

//@Service
//@RequiredArgsConstructor
//public class AwsS3Service {
//
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;
//
//    private final AmazonS3 amazonS3;
//
//    public List<String> uploadImage(List<MultipartFile> multipartFile) {
//        List<String> fileNameList = new ArrayList<>();
//
//        multipartFile.forEach(file -> {
//            // content-type이 image/*가 아닐 경우 해당 루프 진행하지 않음
//            if(Objects.requireNonNull(file.getContentType()).contains("image")) {
//                String fileName = createFileName(file.getOriginalFilename());
//                String fileFormatName = file.getContentType().substring(file.getContentType().lastIndexOf("/") + 1);
//
//                MultipartFile resizedFile = resizeImage(fileName, fileFormatName, file, 768);
//
//                ObjectMetadata objectMetadata = new ObjectMetadata();
//                objectMetadata.setContentLength(resizedFile.getSize());
//                objectMetadata.setContentType(file.getContentType());
//
//                try(InputStream inputStream = resizedFile.getInputStream()) {
//                    amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//                            .withCannedAcl(CannedAccessControlList.PublicRead));
//                } catch(IOException e) {
//                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
//                }
//
//                fileNameList.add(fileName);
//            }
//        });
//
//        return fileNameList;
//    }
//
//    private String createFileName(String fileName) {
//        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
//    }
//
//    private String getFileExtension(String fileName) {
//        try {
//            return fileName.substring(fileName.lastIndexOf("."));
//        } catch (StringIndexOutOfBoundsException e) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
//        }
//    }
//
//    MultipartFile resizeImage(String fileName, String fileFormatName, MultipartFile originalImage, int targetWidth) {
//        try {
//            // MultipartFile -> BufferedImage Convert
//            BufferedImage image = ImageIO.read(originalImage.getInputStream());
//            // newWidth : newHeight = originWidth : originHeight
//            int originWidth = image.getWidth();
//            int originHeight = image.getHeight();
//
//            // origin 이미지가 resizing될 사이즈보다 작을 경우 resizing 작업 안 함
//            if(originWidth < targetWidth)
//                return originalImage;
//
//            MarvinImage imageMarvin = new MarvinImage(image);
//
//            Scale scale = new Scale();
//            scale.load();
//            scale.setAttribute("newWidth", targetWidth);
//            scale.setAttribute("newHeight", targetWidth * originHeight / originWidth);
//            scale.process(imageMarvin.clone(), imageMarvin, null, null, false);
//
//            BufferedImage imageNoAlpha = imageMarvin.getBufferedImageNoAlpha();
//            ByteArrayOutputStream baos = new ByteArrayOutputStream();
//            ImageIO.write(imageNoAlpha, fileFormatName, baos);
//            baos.flush();
//
//            return new MockMultipartFile(fileName, baos.toByteArray());
//
//        } catch (IOException e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 리사이즈에 실패했습니다.");
//        }
//    }
//} https://earth-95.tistory.com/129
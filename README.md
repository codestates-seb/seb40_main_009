# :alarm_clock: 슬기로운 생활

목표 달성을 위해 꼭 필요한 서비스
<br>_Have you found joy in life? Has your life made others happy?_

<br>

## Brand Story

---

신년마다 사람들은 그해에 이루고자 하는 목표를 생각합니다.
<br>하지만 그 목표들을 이루지 못 하고 내년으로 미뤄지게 되는 경우가 다반수죠.
<br>마라톤에도 페이스메이커가 있듯 목표달성을 도와주는 서비스가 필요하다면 슬기로운 생활과 함께하세요.
<img src ="https://ifh.cc/g/Rag38b.jpg" width="100%" height="250"/>

## Target

---

- 혼자 시작하기 힘든 사람들
- 동기부여가 필요한 사람들
- 이루고 싶은 목표가 있는 사람들
## :earth_africa: Project Architecture

---
[![aws-arc.png](https://i.postimg.cc/Hssjtfd3/aws-arc.png)](https://postimg.cc/bdWzyVG2)

<br>

## Service

---

    개발 기간 2022.11.8 - 2022.12.7 (30일)
 
 - 웹사이트 : [바로가기](https://wiselife.click/)
 - 발표 영상 : [바로가기](https://www.youtube.com/watch?v=I0s1v3WJ95g)
 - 발표 문서 : [바로가기](https://codestates.notion.site/40-Team009-f7a07fc2c5ae4d5a9e5ba4766dd42e8c)   

<br>

## Projects Rule
---
공통사항
 - 지속적인 성능 개선
 - 가독성 떨어지는 코드에 대한 리팩토링
  
  #### 코드 컨벤션
  - 식별자에는 영문/숫자/언더스코어만 허용  
  - 한국어 발음대로의 표기 금지
  - 클래스/ 인터페이스/ 도메인 캐멀케이스로 작성
  - 패키지 이름은 소문자
  - 상수 대문자는 언더스코어로 구성
  - 제한자 선언의 순서 final private public protected abstract static 
  - 클래스 앞에 /**/ 주석사용
  - 그외는 Google code Style 준수  https://google.github.io/styleguide/javaguide.html
  
  #### 성능최적화
  - DB서버와의 통신 최소화(N+1 문제 최소화)
  - 불필요한 JOIN 줄이기 (단일 테이블 적용)
  - 조회가 많은건 인덱싱
  - 비동기를 활용하여 스케줄링

 #### 브랜치전략
  모든 브렌치는 PR에서 진행한후 Merge 진행.
  main 브렌치는 업데이트 하지않는다. (readOnly)

 * Main : ReadOnly 브렌치
 * BeDev: 배포하는 브랜치, 각자의 구현한 코드를 PR을 통해 merge한다.
 * FeDev: 배포하는 브랜치, 각자의 구현한 코드를 PR을 통해 merge한다.
 * 이니셜: 데일리 스크럼에서 맡은바를 받아 해당 코드를 작성하고 테스팅 해보는 브런치

 #### 테스트
 * Postman을 이용한 통합테스트
 * Junit5, Mockito를 이용한 테스트

<br>


## :pager: Tech Stack

---

### Frontend

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/styled-component-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> 
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=black"> 
<img src="https://img.shields.io/badge/Recoil-000000?style=for-the-badge&logo=&logoColor=white"> <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=black">

<br>

### Backend

<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Data JPA-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white">
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/Auth2-EB5424?style=for-the-badge&logo=Auth0&logoColor=white">
<br>

## Collaboration Tools

<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">

<br>
<br>


## :trophy: Team Members

### Frontend

|                         한병주                         |                         김은비                         |                         심이서                         |
| :----------------------------------------------------: | :----------------------------------------------------: | :----------------------------------------------------: |
| <img src ="https://ifh.cc/g/PhKbwS.jpg" width="900" /> | <img src ="https://ifh.cc/g/m9k8O5.jpg" width="750" /> | <img src ="https://ifh.cc/g/3az1RX.jpg" width="780" /> |

### Backend

|                         김민섭                         |                         김유현                          |                         오영운                         |
| :----------------------------------------------------: | :-----------------------------------------------------: | :----------------------------------------------------: |
| <img src ="https://ifh.cc/g/qtOQCX.jpg" width="700" /> | <img src ="https://ifh.cc/g/nDYSGQ.jpg" width="600" /> | <img src ="https://ifh.cc/g/RjO0Xy.jpg" width="630" /> |

<br>
<br>
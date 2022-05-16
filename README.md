# COVID-Info-Crawling

## 3학년 1학기 개인 프로젝트 - 전국 코로나 확진자 현황
[질병관리-14주 마지막.pptx](https://github.com/bjy291/COVID-Info-Crawling/files/8698071/-14.pptx)
[하계학술대회 논문집 백재원.pdf](https://github.com/bjy291/COVID-Info-Crawling/files/8698073/default.pdf)
[하계학술대회 논문집 백재원-우수눈몬상.pdf](https://github.com/bjy291/COVID-Info-Crawling/files/8698074/-.pdf)


## 사용기술
- axios 모듈을 이용한 크롤링 
-> class, id의 자식 태그 이용 - update.js 참조
-> 전국 시청 홈페이지의 코로나 확진자 수, 사망자 수 등의 정보를 크롤링 한 후 DB Insert
- KaKao 주소 검색 API
- 마스크 판매점 정보 API
- Chart API
- 안전 안내 문자 API
- 다음 우편번호 서비스
- 반응형웹

## 개발환경
- Node.js 
- HTML + Jquery + CSS
- 부트스트랩 무료 템플릿 사용
- MariaDB
- VsCode

### 메뉴 구성도
![image](https://user-images.githubusercontent.com/71078707/168541637-5ab6ec7f-8520-4b41-8797-92a54218869b.png)

### ERD
![image](https://user-images.githubusercontent.com/71078707/168541679-b7f59144-941a-4f3a-bc2f-9932a376305d.png)

### DFD
![image](https://user-images.githubusercontent.com/71078707/168541695-a617b92f-49b5-4cea-985a-ead6a9bdc6d5.png)

### 구현
![image](https://user-images.githubusercontent.com/71078707/168541912-70261243-3c06-4960-82fa-36e3628077eb.png)
![image](https://user-images.githubusercontent.com/71078707/168541920-61ba2dcf-1ac5-45d1-8376-02443467ddba.png)
![image](https://user-images.githubusercontent.com/71078707/168541948-122309e5-d186-4b78-b63a-230a43334aa3.png)
![image](https://user-images.githubusercontent.com/71078707/168541959-9c879e69-68a2-4fb8-9cb9-605f5c418fa9.png)
![image](https://user-images.githubusercontent.com/71078707/168542036-a52a17e9-11e6-4908-bb3b-1ef75154de53.png)
![image](https://user-images.githubusercontent.com/71078707/168542094-48e80cd3-ad88-44ec-8117-a0a4179b4c42.png)
![image](https://user-images.githubusercontent.com/71078707/168542171-7dcda1ee-098a-410f-9892-bbf63a016589.png)

### REFERENCES
- 질병관리 본부: http://ncov.mohw.go.kr
- 세계 코로나 현황: https://www.worldometers.info/coronavirus/
- 카카오 주소 검색 API : http://postcode.map.daum.net/guide
- 코로나 19 API : https://github.com/dhlife09/Corona-19-API
- 다음 우편번호 서비스 : http://postcode.map.daum.net/guide
- 공공데이터 포털 OPEN API : https://data.go.kr/data/15057411/openapi.do



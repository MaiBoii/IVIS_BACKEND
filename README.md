# ivis_admin
[![ko](https://img.shields.io/badge/lang-ko-red.svg)](https://github.com/picel/IVIS_BACKEND/blob/master/README.md)
[![ja](https://img.shields.io/badge/lang-ja-blue.svg)](https://github.com/picel/IVIS_BACKEND/blob/master/README.jp.md)

## 개요
- IVIS 신입 연구원 모집 페이지 백엔드 서버

## 사용 기술
- Node.js
    - `express` : 웹 프레임워크
    - `express-session` : 세션 관리
    - `passport` : 로그인 인증
    - `sequelize` : DB 관리
- PostgreSQL

## 서버 정보
Oracle Cloud Free Tier
> OS : Ubuntu 20.04<br>
> Architecture : ARM64

## DB 정보
- `users`
    - `sid` : 학번
    - `pw` : 비밀번호
    - `name` : 이름
    - `phone` : 전화번호
    - `approved` : 승인 여부
- `apps`
    - `sid` : 학번
    - `intro` : 자기소개
    - `language` : 사용 가능 언어
    - `project` : 프로젝트 경험
    - `etc` : 기타
- `interview`
    - `sid` : 예약자 학번 (NULL일 경우 예약되지 않음)
    - `time` : 시간
    - `day` : 요일
    - `reserved` : 예약 여부

## 라우트 정보
- `/api/user`
    - `POST /register` : 회원가입
    - `POST /sidcheck` : 회원 여부 확인
    - `POST /pwcheck` : 비밀번호 확인 / 로그인
    - `GET /logincheck` : 토큰 유효성 확인
    - `GET /logout` : 로그아웃
- `/api/application`
    - `POST /` : 지원서 작성
- `/api/interview`
    - `GET /` : 예약 가능한 시간 조회 / 예약된 시간 조회(예약자)
    - `POST /` : 시간 예약
- `/api/admin`
    - `GET /users` : 회원 목록 조회
    - `GET /applications/:sid` : 지원서 목록 조회(sid로 조회)
#### /api/admin의 경우 [IVIS NAS](https://github.com/picel/IVIS_NAS)의 회원 정보 인증을 통해 접근 가능
#### 관리자 페이지의 경우 [IVIS ADMIN](https://github.com/picel/IVIS_ADMIN) 참고

## 실행 방법
1. `git clone https://github.com/picel/IVIS_BACKEND.git`
2. `cd IVIS_BACKEND`
3. `npm install`
4. `npm start`

### Nginx Reverse proxy 사용이 권장됨
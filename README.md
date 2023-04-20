# wrtn-project

nest.js를 사용해 user CRUD API를 처리하는 서버 구축하는 과제를 받았습니다.

**프레임워크: nest.js**

**배포: Docker**

**DB: Supabase**


### 1. docker build 및 서버 작동
```
docker build -t wrtn-project .
docker run -p 3000:3000 wrtn-project
```

### 2. 테스트 코드 작동
```
npm test
```

### 3. 스웨거 문서 접속
```
localhost:3000/api
```

### 4. 시연
1. 총 5가지의 API를 만들었습니다.
  - Get API 2개, POST, PUT, DELETE 각 1개씩
 
2. 과제를 진행하며 아래 노션 링크에 더 구체적으로 기록해두었습니다.

  https://cosmic-stream-f25.notion.site/c0ee370dea07443c96251735c88b6792

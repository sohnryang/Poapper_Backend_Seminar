# HW 6

## HTTP란?

HTTP: HTML 문서와 같은 자원을 가져오는 데 사용하는 프로토콜

웹은 모두 HTTP 프로토콜을 기반으로 함. 클라이언트와 서버는 HTTP로 통신.

## HTTP 시스템의 구성 요소

- 클라이언트: 요청을 보내는 주체
  
  - 주로 웹 브라우저

- 서버: 요청을 처리하는 주체
  
  - 주로 웹서버 (이 수업에서 지금까지 만든 것들도 해당)

- 프록시: 요청을 중간에 처리하는 주체
  
  - 캐싱, 필터링, 로드 밸런싱, 인증, 로깅 등의 다양한 동작을 수행 가능

실제 네크워크는 더욱 복잡하지만, 네트워크 계층 구조에 의해 HTTP에서는 위 세가지 요소만 고려하면 됨.

## HTTP의 특징

- 간단함

- 확장 가능함

- stateless

## HTTP 상태 코드

### Informational responses (1XX)

- 100: 계속

- 101: 프로토콜을 바꾸는 중 (`Upgrade` 헤더에 대한 응답)

### Successful responses (2XX)

- 200: OK. 요청이 성공함

- 201: Created. POST 요청 등에 의해 새로운 리소스가 생성됨

- 206: 부분적인 내용

### Redirection messages (3XX)

- 300: Multiple choices. 여러가지 가능한 응답이 있고, 하나를 골라야 함

- 301: Moved permanently. 영구적으로 요청한 리소스의 URL이 바뀜

- 302: Found. URI가 일시적으로 바뀜

### Client error responses (4XX)

- 400: Bad request. 요청이 잘못됨

- 401: Unauthorized. Authentication이 필요함

- 403: Forbidden. 요청한 리소스에 대한 권한이 없음

- 404: Not found. 요청한 리소스를 찾을 수 없음

- 418: I'm a teapot. 찻주전자로 커피를 만들수는 없음

### Server error responses (5XX)

- 500: Internal server error. 주로 서버에서 처리되지 않은 예외가 발생할때 나옴

- 501: Not implemented. 구현 안된 기능

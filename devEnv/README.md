# 프론트엔드 개발환경의 이해와 실습 

| 주제      | 내용  |
|---------|-----|
| webpack ||
| babel   ||
| eslint  ||

[참고 자료](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)


# 웹팩
* 웹팩이 필요한 이유
  * 모듈을 도입하지 않으면, 전역 스코프가 지저분해짐 (오류 발생 가능성 큼)
* 모듈
  * 다양한 모듈 스펙
    * CommonJS: 자바스크립트를 사용하는 모든 환경에서 모듈을 하는 것이 목표
      * math.js : ```exports function math(a,b){ }``` <br/> app.js : ```const sum = require('./math.js')```
      * node js에서 활용
    * AMD(Asynchronous Module Definition): 비동기로 로딩되는 환경에서 모듈을 사용하는 것이 목표
      * 주로 브라우져 환경에서 사용
    * UMD: 위의 두개 지원
    * ES2015에서 표준 모듈 시스템이 나옴
      * math.js : ```export function math(a,b){ }``` <br/> app.js : ```import * as math from './math.js'```
  * 근데 모든 브라우져에서 모듈을 지원하지 않음...🥲

* 사용해보자
  * help 함수를 이용하기
    * node_modules/.bin/webpack --help
  * 웹팩 활용하기
    * node_modules/.bin/webpack --mode development --entry ./src/app.js 
      * 해당 결과물은 어느 브라우저에서나 사용 가능 + 파일이 하나로 합쳐짐
      * 


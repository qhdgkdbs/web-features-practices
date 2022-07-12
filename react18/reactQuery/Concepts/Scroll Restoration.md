# Scroll Restoration

* Scroll Restoration은 리스트 뷰의 데이터를 상세페이지 접속 후 다시 리스트 뷰에 접근했을 경우
그 리스트 뷰 정보를 계속 가지고 있는 것 (without 네트워크)
* React Query에서는 관련 데이터가 캐시(기본값: 5분)에 저장되어 있기 때문에 자동적으로 구현가능
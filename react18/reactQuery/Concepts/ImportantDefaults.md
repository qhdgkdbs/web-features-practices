### important Defaults
* useQuery 와 useInfiniteQuery 는 캐시된 데이터를 오래되었다고 판단
    * staleTime opt를 통해 변경 가능
* refetch가 되는 시점
    * 쿼리 마운트의 새로운 인스턴스
    * 윈도우의 refocused (refetchOnWindowFocus)
        * 해당 원인은 개발시 더 빈번하게 발생할 수 있음
    * 네트워크 재연결시
    * refetch 기간에 따라
* 위의 시점을 조절하기 위해서 refetchOnMount, refetchOnWindowFocus, refetchOnReconnect, refetchInterval 옵션을 수정할 수 있음
* useQuery, useInfiniteQuery 의 작동이 없거나, inactive로 라벨링된 경우 캐시로 저장됨
    * 단, 5분후에 가비지 컬렉티드 됨. (cacheTime 수정을 통해 변경가능)
* 쿼리가 실패했을 경우 3번 재시도를 함, ui에 에러를 띄우기 전에(with exponential backoff delay)
    * retry, retryDelay 를 통해서 옵션 변경 가능
* 실제로 변경된 경우에만 값이 변경됨. (Json compatible 에서만)
    * useMemo, useCallback에 안정성 제공

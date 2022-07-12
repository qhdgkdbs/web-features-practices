# 에러 핸들링
* 에러 콜백 호출 횟수가 컴포넌트의 리렌더링 횟수를 따라감.
  * 예시: retry 시에 onError 매번 호출하는 등
  * ~~원인: useQuery가 호출될 때마다 리액트 쿼리는 새로운 Observer를 만들고 onError은 Observer level에서 동작하기 때문~~
  * 원인: 
  * 해결책: useQuery를 훅으로 감싸고, 훅 내에서 useEffect의 isError이 true로 변하는 시점에만 에러 핸들러를 호출하는 방법
    * 예시
```javascript
//useRecentFeeds.ts
export default function useRecentFeeds(errorHandler: () => void) {
  const query = useQuery<Feed[], Error>('recentFeeds', getRecentFeeds);

  useEffect(() => {
    if (query.isError) {
      errorHandler();
    }
  }, [query.isError]);

  return query;
}

//RecentFeedsContent.tsx
const RecentFeedsContent = () => {
  const {data: recentFeeds} = useRecentFeeds(() => {
    console.error('이제 한 번만 에러 핸들러 실행!!');
  });
  // ...
}
```
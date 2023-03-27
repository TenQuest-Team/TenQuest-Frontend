const ROUTE_CHANGE_EVENT_NAME = 'route-change';

export const initRouter = onRoute => {
    /*
  이동을 할 때마다 route를 호출하려면 매번 위에서부터 쭉 내려야 함
  이런 건 컴포넌트 depth 어디서 생길지 모름
  => custom event 를 통해 날리기 -> 구현이 깔끔해짐
  */
 // custom event는 키가 반복되거나 잘못 쓸 수 있기 때문에 router 자체를 따로 만들어 사용하는 것도 좋음
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, e => {
    console.log(e)
    console.log(e.detail)
    const {nextUrl} = e.detail;

    if(nextUrl){
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  })
}

export const push = nextUrl => {
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
    detail: {
      nextUrl
    }
  }))
}
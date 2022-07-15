var math = math || {}

// 전역 스코프 X
(function (){
    function sum(a,b){return a+b}

    math.sum = sum
})


export function sum(a, b){
    return a + b;
}
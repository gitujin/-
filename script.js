/*
1. 지도 생성 & 확대 축소 컨트롤러
*/

var container = document.getElementById('map');
var options = {
center: new kakao.maps.LatLng(35.9479447,126.9575551),
level: 8
};

var map = new kakao.maps.Map(container, options);

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/*
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
*/

const dataSet = [
    {
        title: "싱글벙글주유소",
        address: "전북 익산시 익산대로 343",
        url: "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EC%8B%B1%EA%B8%80%EB%B2%99%EA%B8%80+%EC%A3%BC%EC%9C%A0%EC%86%8C",
        category: "페이백 주유소"
    },
    {
        title: "금마하나로마트",
        address: "전북 익산시 금마면 금마길 37",
        url: "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%A0%84%EB%B6%81+%EC%9D%B5%EC%82%B0%EC%8B%9C+%EA%B8%88%EB%A7%88%EB%A9%B4+%EA%B8%88%EB%A7%88%EA%B8%B8+37&oquery=%EC%A0%84%EB%B6%81+%EC%9D%B5%EC%82%B0%EC%8B%9C+%EA%B8%88%EB%A7%88%EB%A9%B4+%EA%B8%88%EB%A7%88%EA%B8%B8+37++%5B%EC%B6%9C%EC%B2%98%5D+%EC%9D%B5%EC%82%B0+%EA%B8%88%EB%A7%88+%EB%A1%9C%EC%BB%AC%ED%91%B8%EB%93%9C+%ED%95%98%EB%82%98%EB%A1%9C%EB%A7%88%ED%8A%B8+%EC%97%86%EB%8A%94%EA%B1%B0+%EC%97%86%EB%8A%94+%EC%9E%A5%ED%84%B0%EB%A7%88%ED%8A%B8%7C%EC%9E%91%EC%84%B1%EC%9E%90+%EB%B9%B5%EC%9D%84+%EC%82%AC%EB%9E%91%ED%95%98%EB%8A%94+%EC%82%AC%EB%9E%8C&tqi=hwUHEdp0YiRss6BVnt4ssssst7N-059908",
        category: "페이백 마트",
    },
];

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

async function setMap(){
    for (var i = 0; i < dataSet.length; i ++) {
        // 마커를 생성합니다
        let coords = await getCoordsByAddress(dataSet[i].address);
        var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: coords, // 마커를 표시할 위치
        });    
    }
}

// 주소-좌표 변환 함수
function getCoordsByAddress(address){

    return new Promise((resolve, reject) => {
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address,function(result,status){
            //정상적으로 검색이 완료됐으면
            if(status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            resolve(coords);
            return;
            }
            reject(new Error("getCoordsByAddress Error: not Vaild Address"))
        });
    });
}

setMap();
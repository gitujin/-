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
2. 더미데이터 준비하기 (제목, 주소, 카테고리)
*/

const dataSet = [
    {
        title: "싱글벙글주유소",
        address: "전북 익산시 익산대로 343",
        category: "페이백 주유소"
    },
    {
        title: "금마 하나로마트",
        address: "전북 익산시 금마면 금마길 37",
        category: "페이백 마트",
    },
    {
        title: "서동공원주유소",
        address: "전라북도 익산시 금마면 고도길 150",
        category: "페이백 마트",
    },
];

/*
3. 여러개 마커 찍기
*/
// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

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

/*
4. 마커에 인포윈도우 붙이기
*/

async function setMap(){
    for (let value of dataSet) {

        // 마커를 생성합니다
        let coords = await getCoordsByAddress(value.address);
        
        var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: coords, // 마커를 표시할 위치
        });    

    // 커스텀 오버레이를 생성합니다
    let customOverlay = new kakao.maps.CustomOverlay({
        position: coords,
        clickable: true,
        xAnchor: 0.5,
        yAnchor: 1.4
    });

    // 커스텀 오버레이 엘리먼트를 만들고, 컨텐츠를 추가합니다
    var contentsHead = document.createElement("div");
    contentsHead.className = "head";

    var contentsTitle = document.createElement("a");
    contentsTitle.className = "title";
    contentsTitle.innerHTML = value.title;

    var contentsDesc = document.createElement("div");
    contentsDesc.className = "desc";

    var contentsAddress = document.createElement("span");
    contentsAddress.className = "address";
    contentsAddress.innerHTML = value.address;

    contentsHead.append(contentsTitle, contentsDesc);
    contentsDesc.append(contentsAddress);

    customOverlay.setContent(contentsHead);

    kakao.maps.event.addListener(marker, "click", () => {
        if (this.clickedOveray) {
          this.clickedOveray.setMap(null);
        }
        customOverlay.setMap(map);
        this.clickedOveray = customOverlay;
        map.panTo(coords);
      })
      kakao.maps.event.addListener(map, "click", function () {
        customOverlay.setMap(null);
      })
    }
}

<template>
  <div class="content">
    <baidu-map class="map" :center="map.center" :zoom="map.zoom" @ready="handler">
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--定位-->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!--点-->
      <bm-marker :position="map.center" :dragging="map.dragging" animation="BMAP_ANIMATION_DROP">
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: "BaiduMap",
  data: () => ({
    map: {
      center: { lng: 113.763924, lat: 22.938634 },
      zoom: 18,
      show: true,
      dragging: true
    },
  }),
  methods: {
    handler({ BMap, map }) {
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      var path = [];//本人的示例是要走规定经过的路线，所以中间有多经过点
      path.push([113.763924, 22.938634])
      path.push([113.759621, 22.933625])

      path.push([113.759621, 22.933625])
      path.push([113.76654, 22.934174])

      path.push([113.76654, 22.934174])
      path.push([113.766558, 22.932916])

      path.push([113.766558, 22.932916])
      path.push([113.768745, 22.93173])

      path.push([113.768745, 22.93173])
      path.push([113.76945, 22.930731])

      path.push([113.76945, 22.930731])
      path.push([113.772022, 22.93014])

      path.push([113.772022, 22.93014])
      path.push([113.775806, 22.932607])

      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
      for (let i = 0; i < path.length; i += 2) {
        var walking = new BMap.WalkingRoute(map, {
          renderOptions: {
            map: map,
            autoViewport: true
          },
          onPolylinesSet: function (routes) {
            let searchRoute = routes[0].getPolyline();//导航路线
            map.removeOverlay(searchRoute);//移除查询出来 的路线
          },
          onMarkersSet: function (routes) {
            map.removeOverlay(routes[0].marker); //删除起点
            map.removeOverlay(routes[routes.length - 1].marker); //删除终点
          }
        });
        let _this = this;
        var start = new BMap.Point(path[i][0], path[i][1]);
        var end = new BMap.Point(path[i + 1][0], path[i + 1][1]);
        walking.search(start, end);
        walking.setSearchCompleteCallback(function () {
          var plan = walking.getResults().getPlan(0);
          for (let j = 0; j < plan.getNumRoutes(); j++) {
            var pts = plan.getRoute(j).getPath();
            var polyline = new BMap.Polyline(pts, { strokeColor: "#ff0000", strokeWeight: 5, strokeOpacity: 1 });//重新划路线
            map.addOverlay(polyline);
          }
        })
      }
      map.addEventListener('click', function (e) { // 点击地点获取经纬度
        console.log(e.point.lng, e.point.lat)
      })
    }
  },
  mounted() {

  },
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}

span {
  display: none;
}

.content {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
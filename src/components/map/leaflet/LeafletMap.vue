<template>
    <div id="map" class="map">
        leaflet地图
    </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
export default {
    name: 'LeafletMap',
    data() {
        return {
            map: null
        };
    },
    mounted() {
        const corner1 = L.latLng(121.5585, 122.4838);
        const corner2 = L.latLng(40.67801, 41.45737);
        const bounds = L.latLngBounds(corner1, corner2);
        this.map = L.map('map', {
            preferCanvas: true,
            // crs: L.CRS.EPSG4326,
            center: {
                lon: 122.02115,
                lat: 41.06769
            },
            // maxBounds: bounds,
            zoom: 9,
            minZoom: 1,
            maxZoom: 20,
            zoomControl: false,
            editable: true
        });
        L.control.zoom({
            position:'bottomright'
        }).addTo(this.map);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(this.map);

        // this.baseLayer=L.tileLayer("http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",{
        //     maxZoom: 20,
        //     minZoom: 8,
        //     subdomains: "1234"
        // });
        // this.map.addLayer(this.baseLayer);
        // const picture = new  L.TileLayer('http://127.0.0.1:8889/tiles/{z}/{x}/{y}.png', {
        //     minZoom: 1,
        //     maxZoom: 6,
        //     tms: true
        // });
        // this.map.addLayer(picture);
        this.map.whenReady(() => {
            this.$emit('mapLoaded', this.map);
        });
    }
};
</script>

<style scoped>
.map{
    height: 100%;
    width: 100%;
}
</style>

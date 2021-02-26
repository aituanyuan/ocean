import CreateNewImage from "../utiles/CreateNewImage";
import * as L from 'leaflet';
class ImageLayer {
    constructor(map, colors, values) {
        this.map = map;
        this.createNewImage = new CreateNewImage(colors, values);
    }

    createImageLayer(jsonData, imagePath, productType, level) {
        const surfaceData = jsonData;
        const data = {};
        const surfaceImage = new Image();
        surfaceImage.crossOrigin = 'Anonymous';
        data.image = surfaceImage;
        surfaceImage.src = imagePath;
        data.min = surfaceData.min;//要素值的最小值
        data.max = surfaceData.max;//要素值的最大值

        data.latmin = surfaceData.latmin;
        data.latmax = surfaceData.latmax;
        data.lonmin = surfaceData.lonmin;
        data.lonmax = surfaceData.lonmax;
        data.height = surfaceData.height;
        data.width = surfaceData.width;
        data.factor = surfaceData.ele ? surfaceData.ele : productType;//要素

        data.origionx = 0;
        data.origiony = 0;
        data.level = level;

        this.map.resolution = 0.5;
        this.map.resolution = surfaceData.resolving;
        const imageBounds=[[data.latmin, data.lonmin], [data.latmax,data.lonmax]];
        const self = this;
        surfaceImage.onload = function () {
            let image = self.createNewImage.getFactorImage(data, productType);
            if (self.map.factorLayer) {
                self.map.removeLayer(self.map.factorLayer);
            }
            self.map.factorLayer = L.imageOverlay(image.src, imageBounds, {opacity: 0.9}).addTo(self.map);
            image = null;
        };
    }

}

export default ImageLayer;

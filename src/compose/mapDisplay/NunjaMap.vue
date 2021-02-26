<template>
    <div class="flex"  style=" width: 100%;
    height: 100%;
    background-color: #021132;">
        <div class="factorBak">
          <factor-tree
                  :treeData="treeData"
                  @treeNodeEvent="treeNodeEvent"
          />
        </div>
        <div class="flex1"
             style="position: relative;
                    height: 100%;"
        >
            <leaflet-map @mapLoaded="mapLoaded">
            </leaflet-map>
            <div class="dateContainer">
                <compare-date/>
            </div>
            <div class="chartContainer" v-if="chartFlag">
                <compare-chart :chartData="chartData"/>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>
<script>
import * as L from 'leaflet';
import LeafletMap from '../../components/map/leaflet/LeafletMap';
import ImageLayer from '../../components/map/leaflet/layer/ImageLayer';
import FactorsCondition from '../../components/condition/FactorsCondition';
import FactorTree from '../../components/chart/FactorTree';
import basicRenderData from '../../data/color/basicRenderData';
import treeData from '../../data/treeData';
import CompareChart from './CompareChart';
import CompareDate from './CompareDate';
export default {
    name: 'NunjaMap',
    data() {
        return {
            treeData: treeData,
            chartData: [],
            chartFlag: false,
            map: null,
            control: null,
            productData: {
                ele: 'dddddddd',
                height: 2208,
                width: 2000,
                latmax: 41.53876,
                latmin: 40.6063599858649,
                lonmax: 121.4061,
                lonmin: 122.541900017219,
                resolving: '0.5',
                sel: 'AVGWS>=2'
            }
        };
    },
    components: { CompareDate, CompareChart, FactorTree, FactorsCondition, LeafletMap },
    methods: {
        mapLoaded(map) {
            this.map = map;
        },
        treeNodeEvent(node) {
            // this.chartFlag = true;
            this.productData.min = node.min;
            this.productData.max = node.max;
            const colors = basicRenderData[node.type];
            let values = [];
            if (node.id === 'wildClassify') {
                this.productData.height = 1642;
                this.productData.latmin = 40.6063599858649;
                this.productData.latmax = 41.53876;
                this.productData.lonmin = 121.4061;
                this.productData.lonmax = 122.541900017219;
                values = [1, 2, 3, 4];
            } else {
                this.productData.height = 2204;
                this.productData.latmin = 40.67801;
                this.productData.latmax = 41.45737;
                this.productData.lonmin = 121.5585;
                this.productData.lonmax = 122.4838;
                const step = (this.productData.max - this.productData.min) / (colors.length - 1);
                for (let i = 0; i < colors.length; i++) {
                    const middle = this.productData.min + step * i;
                    values.push(middle);
                }
            }

            const imageLayer = new ImageLayer(this.map, colors, values);
            const imagePath = `static/images/${node.id}.png`;
            imageLayer.createImageLayer(this.productData, imagePath, node.id, 0);
            this.createControl(values, colors, node.id);
            this.chartData = [
                {
                    name: '利润',
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    data: [200, 170, 240, 244, 200, 220, 210]
                },
                {
                    name: '收入',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true
                    },
                    data: [320, 302, 341, 374, 390, 450, 420]
                },
                {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'left'
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210]
                }
            ];
        },
        createControl(limits, colors, productType) {
            const self = this;
            if (self.control) {
                self.control.remove();
            }
            self.control = L.control({ position: 'bottomleft' });
            self.colors = colors;
            self.limits = limits;
            self.productType = productType;
            self.control.onAdd = function(map) {
                const div = L.DomUtil.create('div', 'info legend');
                const limits = self.limits;
                const colors = self.colors;
                const labels = [];

                // Add min & max
                if (self.productType === 'wildClassify') {
                    div.innerHTML = '<div class="labels"><div class="showName">耕地</div><div class="showName">湿地</div><div class="showName">水体</div><div class="showName">建筑</div></div>';
                } else {
                    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div><div class="max">' + limits[limits.length - 1] + '</div></div>';
                }

                limits.forEach(function(limit, index) {
                    labels.push('<li style="background-color: rgb(' + colors[index] + ')"></li>');
                });

                div.innerHTML += '<ul>' + labels.join('') + '</ul>';
                return div;
            };
            self.control.addTo(self.map);
        }
    }
};
</script>

<style lang="less">
.factorBak {
    .container(100%, 20vw);
}

.chartContainerBak {
    position: absolute;
    z-index: 1000000;
    top: 10px;
    right: 10px;
    padding: 5px;
    background: rgba(2, 17, 50, .3);
    .container(40px, 40px);
}

.dateContainer {
    position: absolute;
    z-index: 1000000;
    top: 40px;
    left: 0;
}

.chartContainer {
    position: absolute;
    z-index: 1000000;
    top: 40px;
    right: 10px;
    padding: 5px;
    background: rgba(2, 17, 50, .28);
    transition: height 1s;
    .container(80vh, 30vw);
}

.chartIcon {
    width: 100%;
    height: 100%;
    .backgroundImage('/icon/chart_normal');
}

.chartIcon:hover {
    .backgroundImage('/icon/chart_active');
}
</style>

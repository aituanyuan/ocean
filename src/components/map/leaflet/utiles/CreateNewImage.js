class CreateNewImage {
    constructor(factorColors, factorValues) {
        this.min = 0;
        this.max = 0;
        this.factorColors = factorColors;
        this.factorValues = factorValues;
        this.realDataArray = [];
    }
    changeColor() {

    }
    getFactorImage(productData, productType) {
        const canvas = document.createElement("canvas");
        canvas.width = productData['width'];
        canvas.height = productData['height'];
        const ctx = canvas.getContext("2d");

        const min = productData.min;
        const max = productData.max;
        const imgWidth = productData['width'];
        const imgHeight = productData['height'];
        const level = productData.level;
        ctx.drawImage(productData.image, 0, 0, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight);

        this.min = min;
        this.max = max;

        const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
        const data = imageData.data;

        let realDataArray = [];
        const rate = (this.max - this.min) / 255;
        if (productType === 'wildClassify') {
            for (let i = 0, len = data.length; i < len; i = i + 4) {
                //四个值为一组RGBA值
                //level如果为0,获取到每组R通道值,如果为1获取到每组G通道值
                const realData = this.min + data[i + level] * rate;
                // realDataArray.push(realData);
                if (data[i + level] === 0) {
                    data[i + 3] = 0;
                }
                if (data [i + level] !== 0) {
                    const color = this.getGradientColor(data[i + level]);
                    if (color) {
                        data[i] = color[0];     // red
                        data[i + 1] = color[1]; // green
                        data[i + 2] = color[2]; // blue
                    } else {
                        data[i + 3] = 0;
                    }
                }
                // if (realData === this.max) {
                //     data[i + 3] = 0;
                // }
            }
        } else {
            for (let j = 0, len = data.length; j < len; j = j + 4) {
                //四个值为一组RGBA值
                //level如果为0,获取到每组R通道值,如果为1获取到每组G通道值
                const realData = this.min + data[j + level] * rate;
                // realDataArray.push(realData);
                const color = this.getGradientColor(realData);
                data[j] = color[0];     // red
                data[j + 1] = color[1]; // green
                data[j + 2] = color[2]; // blue
                if (realData === this.max) {
                    data[j + 3] = 0;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);

        // this.setRealData(realDataArray);
        realDataArray = null;

        const image = this.convertCanvasToImage(canvas);

        ctx.clearRect(0, 0, 4500, 5000);
        return image
    }
    convertCanvasToImage (canvas) {
        const image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }
    inverseData (data) {
        return (this.min + data * (this.max - this.min) / 255);
    }
    getGradientColor (value) {
        const colorArray = this.factorColors;
        const allValue = this.factorValues;
        const index = allValue.findIndex(item => {
            return value <= item;
        });
        return colorArray[index];

    }
    setRealData (data) {
        this.realDataArray = data;
        return this.realDataArray;
    }
    getRealData() {
        return this.realDataArray;
    }
}
export default CreateNewImage;

class Utiles {
    // 进入全屏
    requestFullScreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            // elem.msRequestFullscreen() 没有指定元素
            document.body.msRequestFullscreen();
        }
    }
    // 退出全屏
    exitFullscreen() {
        const doc = document;
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        } else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        } else if (doc.webkitCancelFullScreen) {
            doc.webkitCancelFullScreen();
        } else if (doc.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    formatDate(date, type = '-') {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        let weekDay = date.getDate().toString();
        month = month.padStart(2, '0');
        weekDay = weekDay.padStart(2, '0');
        return (year + type + month + type + weekDay);
    }
    paddingZero(num, length) {
        const len = (num + '').length;
        const diff = length - len;
        if (diff > 0) {
            return Array(diff).join('0') + num;
        }
        return num;
    }
    getTel(tel) {
        const reg = /^(\d{3})\d{4}(\d{4})$/;
        return tel.replace(reg, '$1****$2');
    }
}
export default new Utiles();

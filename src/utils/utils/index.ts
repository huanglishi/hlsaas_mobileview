import { siteData } from "@/store";

// 匹配跳转方式
const matchjumpUrl = (data: any, func: Function) => {
    const { jumpType, urlInfo } = data;
    const store = siteData()
    switch (jumpType) {
        case 'exterior':
            if (urlInfo.url.startsWith('http')) {
                location.href = urlInfo.url
            }
            break;
        case 'interior':
            // 跳转系统页面
            if (typeof urlInfo.pageId === 'string' && urlInfo.pageId.startsWith('systemPage_')) {
                const url = urlInfo.pageId.split('_')[1];
                func(`/${url}`)
                return;
            }

            if (store.isSiteTemplatePreview) {
                func(`/?sitePageId=${urlInfo.pageId}`)
            } else {
                func(`/?pageId=${urlInfo.pageId}&siteId=${store.siteInfo.id}`)
            }
            break;
        case 'power':
            const { power, phone, form } = urlInfo;
            if (power == 'phone') {
                location.href = `tel://${phone}`
            } else if (power == 'form') {
                func(`form/?form=${JSON.stringify(form)}`)
            }
            break;
    }
}
// 行内px转vw
const baseWidth = 375;
const baseHeight = 667
const pxToVw = (type: String, val: Number) => {
    let resultValue = 0;
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;
    switch (type) {
        case 'width':
            const proportion = clientWidth / baseWidth;
            resultValue = (val / (clientWidth / 100)) * proportion
            break;
        case 'height':
            const heightProportion = clientHeight / baseHeight;
            resultValue = val / (clientHeight / 100) * heightProportion;
            break;
    }
    return resultValue
}
const goHome = (func) => {
    const store = siteData()
    func(`/?id=${store.siteInfo.id}`)
}
// 判断是否在微信浏览器内
const isWxClient = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isWeixin = ua.indexOf('micromessenger');
    return Boolean(isWeixin);
}

// 解析微信code
const parseWxCode = () => {
    const href = location.href;
    const startIdx = href.indexOf("?code=");
    const endIdx = href.indexOf("&");
    return href.substring(startIdx + 6, endIdx);
}


export {
    goHome,
    matchjumpUrl,
    pxToVw,
    isWxClient,
    parseWxCode
}
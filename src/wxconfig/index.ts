// 初始化微信配置
import http from '@/axios'
import './wxjssdk.js'
const initConfig = async (micweb_id) => {
    const { data: { code, result } } = await http('getWxSign', {
        url: "https://tuwen.hulingyun.cn/webmin/",
        micweb_id,
    })
    if (code !== 0) return
    const { appId, noncestr, signature, timestamp } = result.data;
    wx.config({
        debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'chooseWXPay'] // 必填，需要使用的 JS 接口列表
    })
    wx.ready(function (res) {
        console.log('配置成功', res)
    })
    wx.error(function (err) {
        console.log('配置失败', err)
    })
}

const initShareStyle = (
    {
        title,
        desc,
        imgUrl,
        micId
    }
) => {
    initConfig(micId)
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
            title, // 分享标题
            desc, // 分享描述
            link: window.location.href,
            imgUrl, // 分享图标
        })

        wx.updateTimelineShareData({
            title, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
            imgUrl, // 分享图标
        })
    });
}

const wxpay = async ({
    timeStamp,
    nonceStr,
    packAge,
    signType,
    paySign,
    micwebId
}) => {
    await initConfig(micwebId)
    return new Promise((resolve) => {
        wx.chooseWXPay({
            timestamp: timeStamp,
            nonceStr,
            package: packAge,
            signType,
            paySign,
            success: function (res) {
                resolve(res)
            },
            cancel: function (res) {
                resolve(res)
            },
            fail: function (err) {
                resolve(err)
            }
        });
    })
}

export {
    initConfig,
    initShareStyle,
    wxpay
}
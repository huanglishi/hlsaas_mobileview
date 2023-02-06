export default {
    login: ['/mwebh5/webdata/lonin', 'post'], // 登陆
    register: ['/mwebh5/webdata/register', 'post'], // 注册
    saveForm: ['/mwebh5/webdata/saveForm', 'post'], // 提交表单
    getProduct: ['/mwebh5/webdata/getProduct', 'get'], // 产品详情
    getArtic: ['/mwebh5/webdata/getArticle', 'get'], // 文章详情
    addVsLog: ['/mwebh5/webdata/addVsLog', 'post'], // 添加访问记录
    getPage: ['/mwebh5/webdata/getPage', 'get'], // 获取指定页面数据
    getHome: ['/mwebh5/webdata/getHome', 'get'], // 获取主页数据
    previewTemplate: ['/mwebh5/webdata/getTplPage', 'get'], // 预览页面模板
    getWebtpl: ['/mwebh5/webdata/getWebtpl', 'get'], // 站点模板预览入口
    getWebtplPage: ['/mwebh5/webdata/getWebtplPage', 'get'], // 站点模板页面数据
    saveAddress: ['/mwebh5/webdata/saveAddress', 'post'], // 添加/编辑地址
    getAddressList: ['/mwebh5/webdata/getAddressList', 'get'], // 获取地址列表
    delAddress: ['/mwebh5/webdata/delAddress', 'delete'], // 删除地址
    getAddress: ['/mwebh5/webdata/getAddress', 'get'], // 地址详情
    addOrder: ['/mwebh5/webdata/addOrder', 'post'],// 创建订单
    getOrderList: ['/mwebh5/webdata/getOrderList', 'get'], // 订单列表
    upUserInfo: ['/mwebh5/webdata/upUserInfo', 'post'], // 更新用户资料
    getOrderDetail: ['/mwebh5/webdata/getOrderDetail', 'get'], // 订单详情
    getFormField: ['/mwebh5/webdata/getFormField', 'get'], // 获取表单项
    searchAll: ['/mwebh5/webdata/searchAll', 'get'], // 全站搜索
    getCancelNo: ['/mwebh5/webdata/getCancelNo', 'get'], // 获取核销码
    getIsCancel: ['/mwebh5/webdata/getIsCancel', 'get'], // 获取订单核销状态
    getWxSign: ['/mwebh5/wx/getWxSign', 'get'], // 微信授权参数
    getOpenId: ['/mwebh5/wx/getOpenId', 'get'], // 获取微信openId
    wxJsapiPay: ['/mwebh5/wxpay/wxJsapiPay', 'get'], // 获取支付参数
    uploadImage: ['/mwebh5/webdata/uploadImage', 'post'], // 上传图片
}

import { defineStore } from 'pinia';

export const siteData = defineStore('siteData', {
    persist: true,
    state: () => ({
        siteInfo: {},
        loginInfo: {},
        isSiteTemplatePreview: false,
        openAside: false,
        wxcode: '',
        openid: ""
    })
})
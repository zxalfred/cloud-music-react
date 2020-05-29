import { axiosInstance } from './config'

export const getBannerRequest = () => axiosInstance.get('/banner')

export const getRecommendListRequest = () => axiosInstance.get('/personalized')

export const getHotSingerListRequest = (count) => axiosInstance.get(`/top/artists?offset=${count}`)

export const getSingerListRequest = (category, alpha, count) => axiosInstance.get(`/artists/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`)

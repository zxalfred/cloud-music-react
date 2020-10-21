import { axiosInstance } from './config'

export const getBannerRequest = () => axiosInstance.get('/banner')

export const getRecommendListRequest = () => axiosInstance.get('/personalized')

export const getHotSingerListRequest = (count) => axiosInstance.get(`/top/artists?offset=${count}`)

export const getSingerListRequest = (category, alpha, count) => axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`)

export const getRankListRequest = () => axiosInstance.get('/toplist/detail')

export const getAlbumDetailRequest = (id) => axiosInstance.get(`/playlist/detail?id=${id}`)

export const getSingerInfoRequest = (id) => axiosInstance.get(`/artists?id=${id}`)

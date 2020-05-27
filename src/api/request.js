import { axiosInstance } from './config'

export const getBannerRequest = () => axiosInstance.get('/banner')

export const getRecommendListRequest = () => axiosInstance.get('/personalized')


import Http from "../utils/http"



const getBanner = () => {
  return Http.request({url : '/app/banner', method : 'GET'})
}

const getNav = () => {
  return Http.request({url : '/app/nav', method : 'GET'})
}


export default {
  getBanner,
  getNav
}
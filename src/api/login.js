import request from '@/utils/request'
// 此处用于存放所有登录相关的请求接口
// 1.获取图形验证码

export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 2.获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}
// 3.登录接口
export const getCodeLogin = (smsCode, mobile) => {
  return request.post('/passport/login', {
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {}
    }
  })
}

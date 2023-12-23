import request from '@/utils/request'
// 订单结算确认
// mode ：cart  ==>obj{cartId}
// mode：buyNow ==>{goodsID,goodsNum,goodsSkuId}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNow
      delivery: 10, // 10快递配送  20 门店自取
      couponId: 0, // 优惠券ID  传0 不使用
      isUsePoints: 0, // 积分 传0 不使用
      ...obj
    }
  })
}
// 提交订单
export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...params
  })
}
// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}

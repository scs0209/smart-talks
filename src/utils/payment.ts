declare const window: typeof globalThis & {
  IMP: any
}
export async function processPayment(paymentData: {
  movieName: string
  userEmail: string
  userName: string
}) {
  return new Promise((resolve, reject) => {
    const { IMP } = window
    IMP.init('imp13260370')

    const data = {
      pg: 'kakaopay',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: 1000,
      name: paymentData.movieName,
      buyer_tel: '01012341234',
      buyer_email: paymentData.userEmail,
      buyer_name: paymentData.userName,
      buyer_addr: '신사동 661-16',
      buyer_postcode: '06018',
    }

    IMP.request_pay(data, (response: any) => {
      const { success, error_msg } = response

      if (success) {
        resolve(response)
      } else {
        reject(new Error(`결제 실패: ${error_msg}`))
      }
    })
  })
}

import Head from 'next/head'
import React from 'react'
declare const window: typeof globalThis & {
  IMP: any
}
function Payment() {
  const onClickPayment = () => {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window
    IMP.init('imp13260370')

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'nice', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: '아임포트 결제 데이터 분석', // 주문명
      customer_uid: 'your-customer-unique-id', // 필수 입
      buyer_name: '홍길동', // 구매자 이름
      buyer_tel: '01012341234', // 구매자 전화번호
      buyer_email: 'example@example', // 구매자 이메일
      buyer_addr: '신사동 661-16', // 구매자 주소
      buyer_postcode: '06018', // 구매자 우편번호
    }

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback)
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: any) {
    const { success, merchant_uid, error_msg } = response

    if (success) {
      alert('결제 성공')
    } else {
      alert(`결제 실패: ${error_msg}`)
    }
  }

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  )
}

export default Payment

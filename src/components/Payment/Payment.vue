<template>
    <section class="test">
        <input type="number" placeholder="금액 입력" v-model="price">
        <div @click="PaymentBtn">결제</div>
    </section>
</template>

<script>

const { IMP } = window;

export default {
    name: "test",
    data() {
        return {
            price: 0
        }
    },
    created() {
        document.cookie = "safeCookie1=foo; SameSite=Lax";
        document.cookie = "safeCookie2=foo";
        document.cookie = "crossCookie=bar; SameSite=None; Secure";
    },
    methods: {
        PaymentBtn: function () {

            IMP.init("imp18668427");

            IMP.request_pay({ // param
                pg: "html5_inicis",
                pay_method: "card",
                merchant_uid: "ORD20180131-0000011",
                name: "YOYOSTUDY",
                amount: this.price,
                buyer_email: "bo9701@naver.com",
                buyer_name: "테스터",
                buyer_tel: "010-5182-6177",
                buyer_addr: "인천광역시 남동구 서창동",
                buyer_postcode: "07222"
            }, rsp => { // callback
                console.log(rsp);
                if (rsp.success) {
                    console.log("결제 성공");
                } else {
                    console.log("결제 실패");
                }
            });

        }
    }
}
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input {
    width: 300px;
    border: 0;
    border-bottom: 1px #a8a8a8 solid;
    margin: 0 10px 0;
    padding: 0;
    height: 40px;
    line-height: 40px;
    outline: none;
}

.test {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
}

div {
    width: 200px;
    height: 40px;
    background-color: #ffffff;
    border: 1px #a8a8a8 solid;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>

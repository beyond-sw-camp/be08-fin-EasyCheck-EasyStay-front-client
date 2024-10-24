<template>
  <div></div>
</template>

<script>
import { processTicketPayment } from "@/stores/paymentStore";
import { useRoute, useRouter } from "vue-router";
import { useThemeParkStore } from "@/stores/themeParkStore";

export default {
  name: "TicketPayment",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const themeParkStore = useThemeParkStore();

    const reservationId = route.params.reservationId;
    const totalPrice = parseFloat(route.params.totalPrice);

    const handlePayment = async () => {
      try {
        const paymentResult = await processTicketPayment(
          reservationId,
          totalPrice
        );
        if (paymentResult.success) {
          router.push({
            name: "PurchaseComplete",
            params: {
              paymentId: paymentResult.paymentId,
              themeParkName: themeParkStore.currentThemePark?.name,
              totalPrice: totalPrice,
            },
          });
        } else {
          alert("결제에 실패하였습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("결제 오류:", error);
        alert("결제 도중 오류가 발생했습니다.");
      }
    };

    handlePayment();
  },
};
</script>

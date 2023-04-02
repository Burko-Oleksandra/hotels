<template>
  <main class="my-orders-page">
    <SectionWithHeaderSpacer>
      <ContainerWrap>
        <section class="my-orders-page__content">
          <MainTitle>Мої замовлення</MainTitle>
          <OrdersListVue :items="orders" />
        </section>
      </ContainerWrap>
    </SectionWithHeaderSpacer>
  </main>
</template>

<script>
import SectionWithHeaderSpacer from "@/components/shared/SectionWithHeaderSpacer.vue";
import ContainerWrap from "@/components/shared/ContainerWrap.vue";
import MainTitle from "@/components/shared/MainTitle.vue";
import OrdersListVue from "@/components/my-orders/OrdersList.vue";
import { getOrders } from "../services/order.service";

export default {
  name: "MyOrdersPage",
  components: {
    SectionWithHeaderSpacer,
    ContainerWrap,
    MainTitle,
    OrdersListVue,
  },
  data() {
    return {
      orders: [],
    };
  },
  async created() {
    try {
      const { data } = await getOrders();
      this.orders = data;
    } catch (error) {
      this.$notify({
        type: "error",
        title: "Упс..Трапилась помилка",
        text: error.message,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.my-orders-page {
  &__content {
    max-width: 730px;
    margin: 0 auto 100px;
  }
}
</style>

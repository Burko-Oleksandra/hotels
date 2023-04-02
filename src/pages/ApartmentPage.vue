<template>
  <main class="apartment-page">
    <SectionSpacer>
      <ContainerWrap>
        <div class="apartment-page__content">
          <ApartmentsMainInfo :apartment="apartment" />
          <div class="apartment-page__additional-info">
            <ApartmentsOwner
              class="apartment-page__owner"
              :owner="apartment.owner"
            />
            <ReviewsList :reviews="reviews" />
          </div>
        </div>
      </ContainerWrap>
    </SectionSpacer>
  </main>
</template>

<script>
import ContainerWrap from "@/components/shared/ContainerWrap.vue";
import ApartmentsMainInfo from "@/components/apartment/ApartmentsMainInfo.vue";
import ApartmentsOwner from "@/components/apartment/ApartmentsOwner.vue";
import ReviewsList from "../components/reviews";
import SectionSpacer from "../components/shared/SectionWithHeaderSpacer.vue";
// import { getApartmentById } from "../services/apartments.service";
import reviews from "../components/reviews/reviews.json";
import apartments from "@/components/apartment/apartments";

export default {
  name: "ApartmentPage",
  components: {
    ContainerWrap,
    ApartmentsMainInfo,
    ApartmentsOwner,
    ReviewsList,
    SectionSpacer,
  },
  // data() {
  //   return {
  //     apartment: null,
  //   };
  // },
  computed: {
    reviews() {
      return reviews;
    },
    apartment() {
      return apartments.find(
        (apartment) => apartment.id === this.$route.params.id
      );
    },
  },
  // async created() {
  //   try {
  //     const { id } = this.$route.params;
  //     const { data } = await getApartmentById(id);
  //     this.apartments = data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.apartment-page {
  padding-bottom: 55px;

  &__content {
    display: flex;
    align-items: flex-start;
  }

  &__additional-info {
    margin-left: 30px;
    max-width: 350px;
    flex-grow: 0;
    flex-shrink: 1;
  }
}
</style>

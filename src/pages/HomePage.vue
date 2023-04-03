<template>
  <main class="homepage">
    <SectionSpacer>
      <ContainerWrap>
        <ApartmentFilterForm class="apartments-filter" @submit="filter" />
      </ContainerWrap>
      <ContainerWrap>
        <p v-if="!filteredApartments.length">Нічого не знайдено</p>
        <ApartmentsList v-else :items="filteredApartments">
          <template v-slot:apartment="{ apartment }">
            <ApartmentsItem
              :key="apartment.id"
              :id="apartment.id"
              :descr="apartment.descr"
              :rating="apartment.rating"
              :price="apartment.price"
              :imgUrl="apartment.imgUrl"
              class="apartments-list__item"
            />
          </template>
        </ApartmentsList>
      </ContainerWrap>
    </SectionSpacer>
  </main>
</template>

<script>
import ApartmentsList from "../components/apartment/ApartmentsList.vue";
import ApartmentsItem from "../components/apartment/ApartmentsItem.vue";
import ApartmentFilterForm from "../components/apartment/ApartmentFilterForm.vue";
import ContainerWrap from "../components/shared/ContainerWrap.vue";
import SectionSpacer from "../components/shared/SectionWithHeaderSpacer.vue";
// import { getApartmentsList } from "../services/apartments.service";
import apartments from "@/components/apartment/apartments";

export default {
  name: "App",
  components: {
    ApartmentsList,
    ApartmentsItem,
    ApartmentFilterForm,
    ContainerWrap,
    SectionSpacer,
  },
  data() {
    return {
      text: "",
      apartments,
      filters: {
        city: "",
        price: 0,
      },
    };
  },
  computed: {
    filteredApartments() {
      return this.filterByCityName(this.filterByPrice(this.apartments));
    },
  },
  // async created() {
  //   try {
  //     const { data } = await getApartmentsList();
  //     this.apartments = data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  methods: {
    filter({ city, price }) {
      this.filters.city = city;
      this.filters.price = price;
    },
    filterByCityName(apartments) {
      if (!this.filters.city) return apartments;

      return this.apartments.filter((apartment) => {
        return apartment.location.city === this.filters.city;
      });
    },
    filterByPrice(apartments) {
      if (!this.filters.price) return apartments;

      return this.apartments.filter((apartment) => {
        return apartment.price >= this.filters.price;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.apartments-filter {
  margin-bottom: 40px;
}
</style>

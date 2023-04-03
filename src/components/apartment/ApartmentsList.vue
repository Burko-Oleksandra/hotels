<template>
  <ContainerWrap>
    <slot name="title"></slot>
    <div class="apartments-list">
      <template v-for="apartment in currentApartment">
        <slot name="apartment" v-bind:apartment="apartment"></slot>
      </template>
    </div>
    <button
      v-if="this.apartmentsLimit <= this.items.length"
      @click="toggleApartment"
      class="apartments-list__show-more"
    >
      Дивитись наступні
    </button>
  </ContainerWrap>
</template>

<script>
import ContainerWrap from "../shared/ContainerWrap.vue";

export default {
  name: "ApartmentsList",
  components: {
    ContainerWrap,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      apartmentsLimit: 6,
    };
  },
  computed: {
    currentApartment() {
      return this.items.slice(0, this.apartmentsLimit);
    },
    // buttonText() {
    //   return this.apartmentsLimit >= this.items.length
    //     ? "Згорнути"
    //     : "Дивитись наступні";
    // },
  },
  methods: {
    toggleApartment() {
      if (this.apartmentsLimit >= this.items.length) {
        this.apartmentsLimit = 6;
        return;
      }
      this.apartmentsLimit += 6;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
.apartments-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;

  &__show-more {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    background: $main-color;
    color: #fff;
    cursor: pointer;
    min-width: 220px;
    border: 1px solid transparent;
    padding: 8px 15px;
    transition: background-color 0.4s, color 0.4s;
    font-family: Montserrat, sans-serif;
    margin: 0 auto;
    margin-bottom: 20px;

    &:hover {
      background-color: #fff;
      color: $main-color;
      border: 1px solid $main-color;
    }
  }
}
</style>

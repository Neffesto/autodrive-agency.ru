<template>
  <section>
    <button type="button"
            @click="modalOpen"
            class="
            h-9
            rounded-md
            shadow-sm
            text-base
            text-white
            bg-dark-blue
            mb-2.5
            sm:w-80
            md:mb-0
            md:mr-4
            md:w-48
            ">
      Заказать в Москву
    </button>
  </section>
</template>

<script>
export default {
  name: "MSKCity",
  methods: {
    modalOpen() {
      this.$emit('showModalForm');
      this.$emit('addCityName', 'Москва')
    },
  },
}
</script>

<style scoped>

</style>
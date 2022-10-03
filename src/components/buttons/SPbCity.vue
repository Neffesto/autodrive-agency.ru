<template>
  <section>
    <button type="button"
            @click="modalOpen"
            class="
            w-80
            h-9
            rounded-md
            shadow-sm
            text-base
            text-white
            bg-blue-green
            md:w-64
            ">
      Заказать в Санкт-Петербург
    </button>
  </section>
</template>

<script>
export default {
  name: "SPbCity",
  methods: {
    modalOpen() {
      this.$emit('showModalForm');
      this.$emit('addCityName', 'Санкт-Петербург')
    },
  },
}
</script>

<style scoped>

</style>
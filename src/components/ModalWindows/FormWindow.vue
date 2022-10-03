<template>
  <section @click.self="close"
      class="
      w-screen
      h-screen
      z-10
      bg-pearl-blackberry/75
      flex
      justify-center
      flex-col
      items-center
      ">
    <div class="
          bg-white
          rounded-lg
          shadow-xl
          sm:w-80

          sm:py-6
          sm:px-5
          md:w-5/6

          lg:w-3/5

          ">
      <div>
        <slot name="header">
<!--          HEADER-->
        </slot>
      </div>
      <div>
        <slot name="body">
<!--          BODY-->
        </slot>
      </div>
      <div>
        <slot name="footer">
<!--          FOOTER-->
        </slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ModalWindow",

  methods: {
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style scoped>

</style>
<template>
  <section
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
          py-6
          px-5
          bg-white
          rounded-lg
          shadow-xl
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
}
</script>

<style scoped>

</style>
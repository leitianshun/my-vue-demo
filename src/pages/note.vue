<template>
  <div>
    笔记
  </div>
</template>
<script>
export default {
  name: "note",
  data() {
    return {};
  },
  created() {
    console.log(this.$route.query.id);
    // console.log(this.$route.params.id);
  },
  methods: {}
};
</script>
<style scoped></style>

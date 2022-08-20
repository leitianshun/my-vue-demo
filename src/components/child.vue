<template>
  <div>
    <h4>
      <slot name="hea"></slot>
    </h4>
    <h4>
      {{ item.name }}
      <slot :id="item.id"></slot>
    </h4>
    <h4>
      <slot name="foo"></slot>
    </h4>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style></style>

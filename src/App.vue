<template>
  <div class="count" @click="onClick">
    <span class="number">这是多少：{{ count }}</span>
  </div>
</template>

<script>
import "./App.scss";

export default {
  mounted() {
    console.log("Touch Here");
  },
  data() {
    return { count: 0 };
  },
  methods: {
    onClick() {
      this.count += 1;
    }
  }
};
</script>

<style>
.count {
  border-radius: 16px;
}

.count > .number {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
}
</style>

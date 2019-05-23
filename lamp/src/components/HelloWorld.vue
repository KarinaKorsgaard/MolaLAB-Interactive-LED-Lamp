<template>
  <section class="container">
      <canvas id="canvas" ref="canvas"></canvas>
      <canvas2pixel></canvas2pixel>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import canvas2pixel from './canvas2pixel.vue'

export default {
  data() {
    return {
    }
  },
  methods: {
    loop:function() {
      const canvas = this.$refs.canvas// document.getElementById('canvas');
      canvas.width = 300
      canvas.height = 300
      const ctx = canvas.getContext('2d');
      ctx.fillStyle ='purple';
      ctx.fillRect(0,0,300,300);

      for (var i = 500; i >= 0; i--) {
        ctx.fillStyle ='orange';
        ctx.fillRect(Math.random() * 290, Math.random() * 290, Math.random() * 10, Math.random() * 10);
      }
      // requestAnimationFrame(this.loop)
    }
  },
  mounted() {
    this.loop()
  },
  components: {
    // Logo,
    canvas2pixel
  }
}
</script>

<style>
</style>

<template>
    <section>
        <canvas ref="pixelTemplate"></canvas>
        <!--<canvas id="canvas" ref="canvas"></canvas>-->
    </section>
</template>

<script>
// const socket = new WebSocket('ws://localhost:8080')
/* eslint-disable */
export default {
    data() {
        return {
            socketIsReady: false,
            socket: null,
            canvas: null,
            context: null,
            imageData: null,
            cWidth: 0,
            cHeight: 0,
            pixelArray: [[]],
            numPixels: 512,
        }
    },
    methods: {
        getCanvas: function() {
            this.canvas = document.getElementById('canvas')
            if (canvas == null) {
                console.log('No canvas on page...')
                return
            }
            this.context = this.canvas.getContext('2d') || this.canvas.getContext('webGL')
            this.cWidth = this.canvas.width
            this.cHeight = this.canvas.height

            console.log(this.canvas.width)
        },

        openSocket: function() {
            this.socket = new WebSocket('ws://localhost:8080')

            this.socket.onopen = function(event) {
                this.socketIsReady = true
                this.socket.send('Hello World!')
                this.loop()
            }

            this.socket.onclose = function(event) {
                this.socketIsReady = false
                console.log('closed')
            }

            this.socket.onmessage = function(event) {
                console.log(`Message from server: ${event.data}`)
            }
        },


        toggleTemplate:function() {
            const canvas = this.$refs.pixelTemplate// document.getElementById('canvas');
            canvas.width = 300
            canvas.height = 300
            const ctx = canvas.getContext('2d');

            ctx.fillStyle ='black';
            for (var i = this.numPixels; i >= 0; i--) {
                ctx.fillStyle ='white';
                const x = this.pixelArray[i][0]
                const y = this.pixelArray[i][1]
                ctx.fillRect(x, y, 1, 1);
            }
        },

        createPixelArray:function() {
            let indx = 0
            for (var u = 10; u >= 0; u--) {
                for (var i = 60; i >= 0; i--) {
                    const x = u * this.cWidth/20 + this.cWidth/20
                    const y = 20 + i
                    // myArray[i] = []
                    this.pixelArray[indx] = [Math.floor(x), Math.floor(y)]
                    indx ++
                    if (indx > this.numPixels) break
                }
            }
        },

        loop:function() {
            const imageData = this.context.getImageData(0, 0, this.cWidth, this.cHeight).data
            const pixelData = this.pixelArray.map(pos => {
                const pixel = (pos[1] * this.cWidth + pos[0]) * 4
                return data.slice(pixel, pixel + 4)
            })
            if (this.socketIsReady) this.socket.send(pixelData)
            requestAnimationFrame(this.loop)
        },
    },
    mounted() {
        this.openSocket()
        this.getCanvas()
        this.createPixelArray()
        this.toggleTemplate()
    },
    components: {
        // Logo
    }
}
</script>

<style>

canvas {
    position: absolute;
    left: 0;
    top: 0;
}
</style>

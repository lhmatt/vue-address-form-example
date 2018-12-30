<template>
    <v-snackbar
            v-model="snackbar"
            :bottom="bottom"
            :color="colour"
            :left="left"
            :multi-line="multiLine"
            :right="right"
            :timeout="timeout"
            :top="top"
            :vertical="vertical"
    >
        {{ text }}
        <v-btn
                :color="buttonColour"
                flat
                @click="snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>
    <!--Example triggers-->
    <!--<v-btn @click="$notifications.$emit('toast', {text: 'Toast, yo!'})">Toast</v-btn>-->
    <!--<v-btn @click="$notifications.$emit('toast', {text: 'Toast, yo!', colour: 'success', buttonColour: ''})">Toast Success</v-btn>-->
</template>

<script>
  export default {
    name: 'Toast',
    data () {
      return {
        snackbar: false,
        colour: '',
        buttonColour: 'pink',
        mode: '',
        timeout: 6000,
        text: '',
        x: null,
        y: 'top',
        toastListener: null
      }
    },
    created () {
      const self = this
      self.toastListener = self.$notifications.$on('toast', self.triggerToast)
    },
    computed: {
      multiLine () {
        return this.mode === 'multi-line'
      },
      vertical () {
        return this.mode === 'vertical'
      },
      bottom () {
        return this.y === 'bottom'
      },
      top () {
        return this.y === 'top'
      },
      left () {
        return this.x === 'left'
      },
      right () {
        return this.x === 'right'
      }
    },
    methods: {
      triggerToast (toastConfig) {
        const self = this

        if (toastConfig.hasOwnProperty('colour')) {
          self.colour = toastConfig.colour
        } else {
          self.colour = ''
        }

        if (toastConfig.hasOwnProperty('buttonColour')) {
          self.buttonColour = toastConfig.buttonColour
        } else {
          self.buttonColour = 'pink'
        }

        if (toastConfig.hasOwnProperty('mode')) {
          self.mode = toastConfig.mode
        } else {
          self.mode = ''
        }

        if (toastConfig.hasOwnProperty('timeout')) {
          self.timeout = toastConfig.timeout
        } else {
          self.timeout = 6000
        }

        if (toastConfig.hasOwnProperty('text')) {
          self.text = toastConfig.text
        } else {
          self.text = 'Hi!'
        }

        if (toastConfig.hasOwnProperty('y')) {
          self.y = toastConfig.y
        } else {
          self.y = 'top'
        }

        if (toastConfig.hasOwnProperty('x')) {
          self.x = toastConfig.x
        } else {
          self.x = null
        }

        self.snackbar = true
      }
    },
    beforeDestroy () {
      const self = this
      if (self.toastListener) {
        self.$notifications.$off('toast', self.triggerToast)
      }
    }
  }
</script>

<style scoped>

</style>

<template>
    <v-dialog v-model="warnDialog" max-width="360" persistent>
        <v-card>
            <v-card-title class="headline">Are you sure?</v-card-title>

            <v-card-text>
                You will lose any change you have made to the form.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        flat="flat"
                        @click="abort"
                >
                    {{abortText}}
                </v-btn>

                <v-btn
                        color="error"
                        flat="flat"
                        @click="confirm()"
                >
                    {{confirmText}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'CancelFormWarning',
    props: {
      warnDialog: {
        type: Boolean,
        required: true
      },
      abortText: {
        type: String,
        default: 'let me finish'
      },
      confirmText: {
        type: String,
        default: 'confirm cancel'
      }
    },
    methods: {
      abort () {
        this.$emit('abort')
      },
      confirm () {
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped>

</style>

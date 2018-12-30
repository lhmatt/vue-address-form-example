<template>
  <v-form ref="fullAddressForm">
    <v-subheader style="padding: 0px;">Billing</v-subheader>

    <address-fields ref="billingForm" :initialValue="formData.billing" @update="syncBillingAddress"
                    @validityChanged="syncBillingValidity"></address-fields>

    <v-subheader style="padding: 0px;">Delivery</v-subheader>
    <v-btn @click="copyBillingToDelivery" flat color="primary">Use Billing Address</v-btn>
    <address-fields ref="deliveryForm" :initialValue="formData.delivery" @update="syncDeliveryAddress"
                    @validityChanged="syncDeliveryValidity"></address-fields>
    <!--Only show cancel if text is set. Always show submit, but only enable it if the form is valid-->
    <v-btn v-if="cancelButtonText" @click="raiseCancel" flat>{{cancelButtonText}}</v-btn>
    <v-btn @click="submit" flat :disabled="!formValid">{{submitButtonText}}</v-btn>
  </v-form>
</template>

<script>
  import {FormMixin, BasicFormSyncMixin} from '@/forms/mixins'
  import AddressFields from '@/forms/address/AddressFields'
  import {deepCopy} from '@/utils'

  export default {
    name: 'FullAddressForm',
    mixins: [FormMixin, BasicFormSyncMixin],
    components: {AddressFields},
    data: () => ({
      // We use formData as the name so that we can reuse the logic for all forms
      formData: {
        billing: null,
        delivery: null
      },
      deliveryValid: null,
      billingValid: null,
      deliveryDirty: false,
      billingDirty: false
    }),
    computed: {
      formValid () {
        return this.deliveryValid && this.billingValid
      },
      formDirty () {
        return this.deliveryDirty || this.billingDirty
      }
    },
    methods: {
      syncDeliveryAddress (updatedAddress, formDirty) {
        // console.log('Delivery address sync')
        this.formData.delivery = updatedAddress
        this.deliveryDirty = formDirty
      },
      syncDeliveryValidity (updatedValidity) {
        this.deliveryValid = updatedValidity
      },
      syncBillingAddress (updatedAddress, formDirty) {
        // console.log('Billing address sync')
        this.formData.billing = updatedAddress
        this.billingDirty = formDirty
      },
      syncBillingValidity (updatedValidity) {
        this.billingValid = updatedValidity
      },
      copyBillingToDelivery () {
        this.$refs.deliveryForm.setFormData(deepCopy(this.formData.billing))
        // this.formData.delivery = deepCopy(this.formData.billing)
      }
    }
  }
</script>

<style scoped>

</style>

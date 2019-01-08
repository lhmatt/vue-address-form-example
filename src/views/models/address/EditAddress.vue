<template>
  <v-content>
    <v-container align-content-center>
      <v-alert :value="requestFailed" type="error" outline class="mt-4">
        <span>{{requestErrorMessage}}</span>
      </v-alert>
      <v-layout row>
        <v-flex xs6>
          <h1>Edit Address</h1>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6>
          <loading v-if="submitting" loadingMessage="Changing address..."></loading>
          <template v-else>
            <full-address-form :initialValue="initialValue.addresses"
                               cancelButtonText="Go to Dashboard"
                               @update="formUpdated"
                               @submitted="formSubmitted"
                               @cancelled="formCancelled"
                               submitButtonText="Save Changes"></full-address-form>
          </template>
        </v-flex>
      </v-layout>
      <cancel-form-warning @abort="resetWaring" @confirm="cancel" :warnDialog="warnDialog"></cancel-form-warning>
    </v-container>
  </v-content>
</template>

<script>
  import FullAddressForm from '@/forms/address/FullAddressForm'
  import CancelFormWarning from '@/views/CancelFormWarning'
  import {CrudFormMixin} from '@/views/models/crud-mixins'

  export default {
    name: 'EditAddress',
    components: {FullAddressForm, CancelFormWarning},
    mixins: [CrudFormMixin],
    data: () => ({}),
    computed: {
      apiPath () {
        return `/company/${this.existingData.uid}/full_address`
      }
    },
    methods: {
      preparePayload (formData) {
        // TODO: override this method if you need to do custom formatting to the formData before committing
        return {addresses: formData}
      }
    }
  }
</script>

<style scoped>

</style>

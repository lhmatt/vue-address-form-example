import {deepCopy} from '@/utils'

const CrudFormMixin = {
  props: {
    existingData: {
      type: Object,
      required: true
    },
    cancelRoute: {
      type: Object,
    },
    formName: {
      type: String,
      default: 'FORM'
    },
    apiMethod: {
      type: String,
      default: 'POST'
    }
  },
  data: () => ({
    formDirty: false,
    warnDialog: false,
    submitting: false,
    requestFailed: false,
    requestErrorMessage: '',
    requestErrorDetailedMessage: '',
    initialValue: null,
  }),
  computed: {
    apiPath () {
      // TODO: override this to generate the necessary api path
      return ''
    }
  },
  created () {
    // If existing data is provided then we need to clone it and present it as a different value to the component
    if (this.existingData) {
      this.initialValue = deepCopy(this.existingData)
    }
  },
  methods: {
    cancel () {
      const self = this
      self.warnDialog = false
      // self.$router.push({name: 'company.dashboard', params: {company_uid: self.company.uid}})
      if (self.cancelRoute) {
        self.$router.push(self.cancelRoute)
      }
    },
    resetWaring () {
      this.warnDialog = false
    },
    preparePayload (formData) {
      // TODO: override this method if you need to do custom formatting to the formData before committing
      return formData
    },
    commit (payload) {
      const self = this
      // This method can be overridden to do whatever you need to do to save the form data.
      // It should always return a promise
      // return callApi(self.apiPath, payload, self.apiMethod)
      return Promise.resolve(console.log('Sending payload'))
    },
    submit (formData) {
      const self = this
      self.submitting = true
      self.requestFailed = false
      self.requestErrorMessage = ''
      self.requestErrorDetailedMessage = ''
      // Prepare the formData ready for the commit
      const requestPayload = self.preparePayload(formData)
      // Commit the payload and handle exceptions
      self.commit(requestPayload)
        .then((response) => {
          self.handleSuccess(response)
        })
        .catch((error) => {
          self.handleError(error)
        })
    },
    handleError(error) {
      // This is the default error handler for api requests. You can override this as you see fit.
      const self = this
      self.requestFailed = true
      self.requestErrorMessage = 'There was a problem with the your request. If you continue to have problems please contact support.'
      // Error.returnedData will contain any messages sent back from the server
      // We need to format this data into a user readable form
      if (error.returnedData) {
        self.requestErrorDetailedMessage = error.returnedData
      }

      self.submitting = false
      console.log(`[${self.formName}]: Failed to submit`)
    },
    handleSuccess(response) {
      const self = this
      self.submitting = false
      self.$notifications.$emit('toast', {text: 'Successfully saved your changes!', colour: 'success', buttonColour: ''})
      console.log(`[${self.formName}]: Successfully submitted: ${response}`)
    },
    formUpdated (formData, formDirty) {
      this.formDirty = formDirty
    },
    formSubmitted (formData) {
      const self = this
      console.log(`[${self.formName}]: Submitted: ${JSON.stringify(formData)}`)
      this.submit(formData)
    },
    formCancelled () {
      const self = this
      if (!self.formDirty) {
        self.cancel()
      } else {
        self.warnDialog = true
      }
    },
  }
}

export {
  CrudFormMixin
}

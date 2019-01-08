import {deepCopy} from '@/utils'

const FormMixin = {
  props: {
    submitButtonText: {
      required: true,
      type: String,
      default: 'Submit'
    },
    cancelButtonText: {
      type: String
    },
    initialValue: {
      type: Object
    },
    disableEdit: {
      type: Boolean,
      default: false
    },
    hideSubmit: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    // We use formData as the name so that we can reuse the logic for all forms
    formData: null
  }),
  created () {
    // Set the initial formData, if it is specified.
    if (this.initialValue) {
      this.formData = this.initialValue
    }
  },
  methods: {
    raiseCancel () {
      this.$emit('cancelled')
    },
    submit () {
      if (this.formValid) {
        // Parent should use this to handle form submission, shockingly
        this.$emit('submitted', this.formData)
      }
    }
  }
}

const BasicFormSyncMixin = {
  data: () => ({
    formIsValid: null,
    formIsDirty: null
  }),
  computed: {
    formValid () {
      // We use a computed property here so that implementors can override the logic used to determine form validity
      return this.formIsValid
    },
    formDirty () {
      // We use a computed property here so that implementors can override the logic used to determine if the form is
      // dirty
      return this.formIsDirty
    }
  },
  methods: {
    syncFormData (formData, dirty) {
      this.formData = formData
      this.formIsDirty = dirty
    },
    syncFormValidity (updatedValidity) {
      this.formIsValid = updatedValidity
    }
  },
  watch: {
    formValid (newVal) {
      // Parent should watch this and automatically unset the complete state if it changes
      // (i.e if form changes after submit in a multi-step form)
      this.$emit('validityChanged', newVal)
    },
    formData: {
      handler () {
        // When the fomData changes, emit event so that the form parent can do whatever it needs to do
        this.$emit('update', this.formData, this.formDirty)
      },
      deep: true
    }
  }
}

// Fields manager that expects the use of vuelidate for validation. Also expects to work with objects rather than
// single values.
const FieldsMixin = {
  props: {
    initialValue: {
      type: Object
    },
    disableEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
    // Set the initial formData, if it is specified. Important to note that we don't watch this value - any changes
    // should be done by the form itself, with the modified values pushed back up the chain via events.
    this.configureInitialValue()
  },
  data: () => ({
    formData: {},
    disabledDefaultData: null,
    setupComplete: false
  }),
  validations: {
    formData: {
      // Example validator definition
      // example: {
      //   required,
      //   minLength: minLength(3),
      //   maxLength: maxLength(100)
      // }
    }
  },
  computed: {
    // Example error message generator
    // exampleErrors () {
    //   const errors = []
    //   if (!this.$v.formData.example.$dirty) return errors
    //   !this.$v.formData.example.required && errors.push('Example is required.')
    //   !this.$v.formData.example.minLength && errors.push('Example must be at least 3 characters long')
    //   !this.$v.formData.example.maxLength && errors.push('Example must be at most 100 characters long')
    //   return errors
    // }
  },
  methods: {
    preInitialValidationHook () {
      // If you use this method you will likely need to call
      // this.$nextTick(() => {
      //   this.$v.$reset()
      // })
      // to maintain the correct validation $dirty state
    },
    setInitialValue (initialValue) {
      // You should *really* override this
      // If the initial data is missing any for the formData properties then you will get all
      // sorts of wierd reactivity bugs
      this.formData = initialValue
      // Force a reset of the validation after initialData is set. This prevents erroneous $dirty states being reported
      // to the parent
      // this.$nextTick(() => {
      //   this.$v.$reset()
      // })
    },
    configureInitialValue () {
      const self = this
      // If the form is disabled and we have a default to use then set it
      if (this.disableEdit && this.disabledDefaultData) {
        this.configureDisabledState()
      } else if (this.initialValue) {
        // Otherwise we just the initialValue, if it is set
        this.setInitialValue(this.initialValue)
        // Optional method to prepare the data before we validate it
        this.preInitialValidationHook()
      }
      self.$nextTick(() => {
        // // Reset the $dirty state after making any changes with initialValue data
        // self.$v.$reset()
        // Trigger validation before the setup completes. This will highlight any errors, but won't notify the parent
        self.$v.$touch()
        self.notifyInitialValidity()
        // Setting this to true enables the formData change notifier
        self.setupComplete = true
      })
      // // Trigger validation before the setup completes. This will highlight any errors, but won't notify the parent
      // this.$v.$touch()
      // // Setting this to true enables the formData change notifier
      // this.setupComplete = true
    },
    configureDisabledState () {
      // TODO: there is a bug here where setting the disabled data triggers dirty check, regardless of whether the
      // current form data is already the desired value. In turn this causes the save changes modal to trigger every
      // time, even without changing the form data.
      this.formData = deepCopy(this.disabledDefaultData)
      // Trigger the form validation so that we know if there is any invalid data
      this.$v.$touch()
      // Feed the change back to the parent
      this.notifyOfUpdate()
    },
    notifyOfUpdate () {
      // We only want to notify the parent of changes once the setup is complete (after initialValue has been set)
      if (this.setupComplete) {
        this.$emit('update', this.formData, this.$v.$anyDirty)
        this.$emit('validityChanged', !this.$v.$invalid)
      }
    },
    notifyInitialValidity () {
      this.$emit('validityChanged', !this.$v.$invalid)
    }
  },
  watch: {
    formData: {
      handler () {
        // When the fomData changes, emit events so that the parent form knows what is going on. We emit both the updated
        // formData object, and whether it is valid or not.
        this.notifyOfUpdate()
      },
      deep: true
    },
    disableEdit () {
      this.configureDisabledState()
    }
  }
}

// This is to be used when you are working with a single value, rather than an object
const FieldMixin = {
  props: {
    initialValue: {}
  },
  created () {
    // Set the initial formData, if it is specified. Important to note that we don't watch this value - any changes
    // should be done by the form itself, with the modified values pushed back up the chain via events.
    if (this.initialValue) {
      this.fieldValue = this.initialValue
      this.$v.$touch()
    }
  },
  data: () => ({
    fieldValue: null
  }),
  validations: {
    fieldValue: {
      // Example validator definition
      //   required,
      //   minLength: minLength(3),
      //   maxLength: maxLength(100)
    }
  },
  computed: {
    // Example error message generator
    // fieldValueErrors () {
    //   const errors = []
    //   if (!this.$v.fieldValue.$dirty) return errors
    //   !this.$v.fieldValue.required && errors.push('Example is required.')
    //   !this.$v.fieldValue.minLength && errors.push('Example must be at least 3 characters long')
    //   !this.$v.fieldValue.maxLength && errors.push('Example must be at most 100 characters long')
    //   return errors
    // }
  },
  watch: {
    fieldValue () {
      // When the fieldValue changes, emit events so that the parent form knows what is going on. We emit both the updated
      // fieldValue, and whether it is valid or not.
      this.$emit('update', this.fieldValue, this.$v.$anyDirty)
      this.$emit('validityChanged', !this.$v.$invalid)
    }
  }
}

export {
  FormMixin,
  BasicFormSyncMixin,
  FieldsMixin,
  FieldMixin
}

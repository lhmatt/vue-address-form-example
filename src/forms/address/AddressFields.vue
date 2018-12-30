<template>
    <div>
        <v-select
                v-model="formData.country"
                :items="countryList"
                item-text="name"
                item-value="code"
                label="Country"
                required
                :error-messages="countryErrors"
                @input="$v.formData.country.$touch()"
                @blur="$v.formData.country.$touch()"
        ></v-select>
        <v-text-field
                v-model="formData.address1"
                :counter="100"
                label="Address 1"
                :error-messages="address1Errors"
                @input="$v.formData.address1.$touch()"
                @blur="$v.formData.address1.$touch()"
        ></v-text-field>
        <v-text-field
                v-model="formData.address2"
                :counter="100"
                label="Address 2"
                :error-messages="address2Errors"
                @input="$v.formData.address2.$touch()"
                @blur="$v.formData.address2.$touch()"
        ></v-text-field>
        <v-text-field
                v-model="formData.address3"
                :counter="100"
                label="Address 3"
                :error-messages="address3Errors"
                @input="$v.formData.address3.$touch()"
                @blur="$v.formData.address3.$touch()"
        ></v-text-field>
        <v-text-field
                v-model="formData.city"
                :counter="40"
                label="City"
                required
                :error-messages="cityErrors"
                @input="$v.formData.city.$touch()"
                @blur="$v.formData.city.$touch()"
        ></v-text-field>

        <v-select
                v-if="countyRequired"
                v-model="formData.county"
                :items="countySelect"
                item-text="name"
                item-value="name"
                label="County"
                :required="countyRequired"
                :error-messages="countyErrors"
                @input="$v.formData.county.$touch()"
                @blur="$v.formData.county.$touch()"
        >
            <template slot="item" slot-scope="data">
                <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    </v-list-tile-content>
                </template>
            </template>
        </v-select>

        <v-select
                v-if="stateRequired"
                v-model="formData.state"
                :items="stateSelect"
                item-text="name"
                item-value="code"
                label="State"
                :required="stateRequired"
                :error-messages="stateErrors"
                @input="$v.formData.state.$touch()"
                @blur="$v.formData.state.$touch()"
        ></v-select>

        <v-text-field
                v-model="formData.postCode"
                :counter="100"
                label="Post Code/Zip Code"
                :required="postCodeRequired"
                :error-messages="postCodeErrors"
                @input="$v.formData.postCode.$touch()"
                @blur="$v.formData.postCode.$touch()"
        ></v-text-field>
    </div>
</template>

<script>
  import {FieldsMixin} from '@/forms/mixins'
  import {getData, getCodes} from 'country-list'
  import {required, requiredIf, minLength, maxLength, helpers} from 'vuelidate/lib/validators'

  // TODO: only show country selector, then show remaining fields once country is selected.
  export default {
    name: 'AddressFields',
    mixins: [FieldsMixin],
    data: () => ({
      formData: {
        address1: null,
        address2: null,
        address3: null,
        city: null,
        county: null,
        state: null,
        country: 'GB',
        postCode: null
      },
      countyList: [
        'Bedfordshire',
        'Berkshire',
        'Buckinghamshire',
        'Cambridgeshire',
        'Cheshire',
        'Cornwall',
        'Cumbria',
        'Derbyshire',
        'Devon',
        'Dorset',
        'Durham',
        'East Sussex',
        'East Yorkshire',
        'Essex',
        'Gloucestershire',
        'Hampshire',
        'Herefordshire',
        'Hertfordshire',
        'Isle of Wight',
        'Kent',
        'Lancashire',
        'Leicestershire',
        'Lincolnshire',
        'London',
        'Merseyside',
        'Middlesex',
        'Norfolk',
        'North Humberside',
        'North Yorkshire',
        'Northamptonshire',
        'Northumberland',
        'Nottinghamshire',
        'Oxfordshire',
        'Rutland',
        'Shropshire',
        'Somerset',
        'South Yorkshire',
        'Staffordshire',
        'Suffolk',
        'Surrey',
        'Tyne and Wear',
        'Warwickshire',
        'West Midlands',
        'West Sussex',
        'West Yorkshire',
        'Wiltshire',
        'Worcestershire',
        'Blaenau Gwent',
        'Bridgend',
        'Caerphilly',
        'Cardiff',
        'Carmarthenshire',
        'Ceredigion',
        'Conwy',
        'Denbighshire',
        'Flintshire',
        'Gwynedd',
        'Isle of Anglesey',
        'Merthyr Tydfil',
        'Monmouthshire',
        'Neath Port Talbot',
        'Newport',
        'Pembrokeshire',
        'Powys',
        'Rhondda Cynon Taf',
        'Swansea',
        'Torfaen',
        'Vale of Glamorgan',
        'Wrexham',
        'Aberdeen City',
        'Aberdeenshire',
        'Angus',
        'Argyll & Bute',
        'Clackmannanshire',
        'Dumfries & Galloway',
        'Dundee City',
        'East Ayrshire',
        'East Dunbartonshire',
        'East Lothian',
        'East Renfrewshire',
        'Edinburgh City',
        'Falkirk',
        'Fife',
        'Glasgow City',
        'Highland',
        'Inverclyde',
        'Midlothian Council',
        'Moray',
        'North Ayrshire',
        'North Lanarkshire',
        'Orkney Islands',
        'Perth & Kinross',
        'Renfrewshire',
        'Scottish Borders',
        'Shetland',
        'South Ayrshire',
        'South Lanarkshire',
        'Stirling',
        'West Dunbartonshire',
        'West Lothian',
        'Western Isles',
        'Antrim',
        'Armagh',
        'Down',
        'Fermanagh',
        'Londonderry',
        'Tyrone'
      ],
      stateList: [
        'AL',
        'AK',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VT',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY'
      ],
      countySelect: [
        {header: 'England'},
        {name: 'Bedfordshire', group: 'England'},
        {name: 'Berkshire', group: 'England'},
        {name: 'Buckinghamshire', group: 'England'},
        {name: 'Cambridgeshire', group: 'England'},
        {name: 'Cheshire', group: 'England'},
        {name: 'Cornwall', group: 'England'},
        {name: 'Cumbria', group: 'England'},
        {name: 'Derbyshire', group: 'England'},
        {name: 'Devon', group: 'England'},
        {name: 'Dorset', group: 'England'},
        {name: 'Durham', group: 'England'},
        {name: 'East Sussex', group: 'England'},
        {name: 'East Yorkshire', group: 'England'},
        {name: 'Essex', group: 'England'},
        {name: 'Gloucestershire', group: 'England'},
        {name: 'Hampshire', group: 'England'},
        {name: 'Herefordshire', group: 'England'},
        {name: 'Hertfordshire', group: 'England'},
        {name: 'Isle of Wight', group: 'England'},
        {name: 'Kent', group: 'England'},
        {name: 'Lancashire', group: 'England'},
        {name: 'Leicestershire', group: 'England'},
        {name: 'Lincolnshire', group: 'England'},
        {name: 'London', group: 'England'},
        {name: 'Merseyside', group: 'England'},
        {name: 'Middlesex', group: 'England'},
        {name: 'Norfolk', group: 'England'},
        {name: 'North Humberside', group: 'England'},
        {name: 'North Yorkshire', group: 'England'},
        {name: 'Northamptonshire', group: 'England'},
        {name: 'Northumberland', group: 'England'},
        {name: 'Nottinghamshire', group: 'England'},
        {name: 'Oxfordshire', group: 'England'},
        {name: 'Rutland', group: 'England'},
        {name: 'Shropshire', group: 'England'},
        {name: 'Somerset', group: 'England'},
        {name: 'South Yorkshire', group: 'England'},
        {name: 'Staffordshire', group: 'England'},
        {name: 'Suffolk', group: 'England'},
        {name: 'Surrey', group: 'England'},
        {name: 'Tyne and Wear', group: 'England'},
        {name: 'Warwickshire', group: 'England'},
        {name: 'West Midlands', group: 'England'},
        {name: 'West Sussex', group: 'England'},
        {name: 'West Yorkshire', group: 'England'},
        {name: 'Wiltshire', group: 'England'},
        {name: 'Worcestershire', group: 'England'},
        {divider: true},
        {header: 'Wales'},
        {name: 'Blaenau Gwent', group: 'Wales'},
        {name: 'Bridgend', group: 'Wales'},
        {name: 'Caerphilly', group: 'Wales'},
        {name: 'Cardiff', group: 'Wales'},
        {name: 'Carmarthenshire', group: 'Wales'},
        {name: 'Ceredigion', group: 'Wales'},
        {name: 'Conwy', group: 'Wales'},
        {name: 'Denbighshire', group: 'Wales'},
        {name: 'Flintshire', group: 'Wales'},
        {name: 'Gwynedd', group: 'Wales'},
        {name: 'Isle of Anglesey', group: 'Wales'},
        {name: 'Merthyr Tydfil', group: 'Wales'},
        {name: 'Monmouthshire', group: 'Wales'},
        {name: 'Neath Port Talbot', group: 'Wales'},
        {name: 'Newport', group: 'Wales'},
        {name: 'Pembrokeshire', group: 'Wales'},
        {name: 'Powys', group: 'Wales'},
        {name: 'Rhondda Cynon Taf', group: 'Wales'},
        {name: 'Swansea', group: 'Wales'},
        {name: 'Torfaen', group: 'Wales'},
        {name: 'Vale of Glamorgan', group: 'Wales'},
        {name: 'Wrexham', group: 'Wales'},
        {divider: true},
        {header: 'Scotland'},
        {name: 'Aberdeen City', group: 'Scotland'},
        {name: 'Aberdeenshire', group: 'Scotland'},
        {name: 'Angus', group: 'Scotland'},
        {name: 'Argyll & Bute', group: 'Scotland'},
        {name: 'Clackmannanshire', group: 'Scotland'},
        {name: 'Dumfries & Galloway', group: 'Scotland'},
        {name: 'Dundee City', group: 'Scotland'},
        {name: 'East Ayrshire', group: 'Scotland'},
        {name: 'East Dunbartonshire', group: 'Scotland'},
        {name: 'East Lothian', group: 'Scotland'},
        {name: 'East Renfrewshire', group: 'Scotland'},
        {name: 'Edinburgh City', group: 'Scotland'},
        {name: 'Falkirk', group: 'Scotland'},
        {name: 'Fife', group: 'Scotland'},
        {name: 'Glasgow City', group: 'Scotland'},
        {name: 'Highland', group: 'Scotland'},
        {name: 'Inverclyde', group: 'Scotland'},
        {name: 'Midlothian Council', group: 'Scotland'},
        {name: 'Moray', group: 'Scotland'},
        {name: 'North Ayrshire', group: 'Scotland'},
        {name: 'North Lanarkshire', group: 'Scotland'},
        {name: 'Orkney Islands', group: 'Scotland'},
        {name: 'Perth & Kinross', group: 'Scotland'},
        {name: 'Renfrewshire', group: 'Scotland'},
        {name: 'Scottish Borders', group: 'Scotland'},
        {name: 'Shetland', group: 'Scotland'},
        {name: 'South Ayrshire', group: 'Scotland'},
        {name: 'South Lanarkshire', group: 'Scotland'},
        {name: 'Stirling', group: 'Scotland'},
        {name: 'West Dunbartonshire', group: 'Scotland'},
        {name: 'West Lothian', group: 'Scotland'},
        {name: 'Western Isles', group: 'Scotland'},
        {divider: true},
        {header: 'Northern Ireland'},
        {name: 'Antrim', group: 'Northern Ireland'},
        {name: 'Armagh', group: 'Northern Ireland'},
        {name: 'Down', group: 'Northern Ireland'},
        {name: 'Fermanagh', group: 'Northern Ireland'},
        {name: 'Londonderry', group: 'Northern Ireland'},
        {name: 'Tyrone', group: 'Northern Ireland'}
      ],
      stateSelect: [
        {code: 'AL', name: 'Alabama'},
        {code: 'AK', name: 'Alaska'},
        {code: 'AZ', name: 'Arizona'},
        {code: 'AR', name: 'Arkansas'},
        {code: 'CA', name: 'California'},
        {code: 'CO', name: 'Colorado'},
        {code: 'CT', name: 'Connecticut'},
        {code: 'DE', name: 'Delaware'},
        {code: 'FL', name: 'Florida'},
        {code: 'GA', name: 'Georgia'},
        {code: 'HI', name: 'Hawaii'},
        {code: 'ID', name: 'Idaho'},
        {code: 'IL', name: 'Illinois'},
        {code: 'IN', name: 'Indiana'},
        {code: 'IA', name: 'Iowa'},
        {code: 'KS', name: 'Kansas'},
        {code: 'KY', name: 'Kentucky'},
        {code: 'LA', name: 'Louisiana'},
        {code: 'ME', name: 'Maine'},
        {code: 'MD', name: 'Maryland'},
        {code: 'MA', name: 'Massachusetts'},
        {code: 'MI', name: 'Michigan'},
        {code: 'MN', name: 'Minnesota'},
        {code: 'MS', name: 'Mississippi'},
        {code: 'MO', name: 'Missouri'},
        {code: 'MT', name: 'Montana'},
        {code: 'NE', name: 'Nebraska'},
        {code: 'NV', name: 'Nevada'},
        {code: 'NH', name: 'New Hampshire'},
        {code: 'NJ', name: 'New Jersey'},
        {code: 'NM', name: 'New Mexico'},
        {code: 'NY', name: 'New York'},
        {code: 'NC', name: 'North Carolina'},
        {code: 'ND', name: 'North Dakota'},
        {code: 'OH', name: 'Ohio'},
        {code: 'OK', name: 'Oklahoma'},
        {code: 'OR', name: 'Oregon'},
        {code: 'PA', name: 'Pennsylvania'},
        {code: 'RI', name: 'Rhode Island'},
        {code: 'SC', name: 'South Carolina'},
        {code: 'SD', name: 'South Dakota'},
        {code: 'TN', name: 'Tennessee'},
        {code: 'TX', name: 'Texas'},
        {code: 'UT', name: 'Utah'},
        {code: 'VT', name: 'Vermont'},
        {code: 'VA', name: 'Virginia'},
        {code: 'WA', name: 'Washington'},
        {code: 'WV', name: 'West Virginia'},
        {code: 'WI', name: 'Wisconsin'},
        {code: 'WY', name: 'Wyoming'}
      ]
    }),
    validations: {
      formData: {
        address1: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(100)
        },
        address2: {
          // minLength: minLength(1),
          maxLength: maxLength(100)
        },
        address3: {
          // minLength: minLength(1),
          maxLength: maxLength(100)
        },
        city: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(40)
        },
        // The syntax of required is important here. Arrow functions won't provide access to 'this'.
        county: {
          required: requiredIf(function (nestedModel) {
            return this.formData.country === 'GB'
          }),
          validCounty: function (value) {
            return !helpers.req(value) || this.countyList.includes(value)
          }
        },
        state: {
          required: requiredIf(function (nestedModel) {
            return this.formData.country === 'US'
          }),
          validState: function (value) {
            return !helpers.req(value) || this.stateList.includes(value)
          }
        },
        postCode: {
          required: requiredIf(function (nestedModel) {
            return this.formData.country === 'GB'
          }),
          minLength: minLength(2),
          maxLength: maxLength(30)
        },
        country: {
          required,
          validCountry: function (value) {
            return !helpers.req(value) || this.countryCodes.includes(value)
          }
        }
      }
    },
    computed: {
      countryList () {
        return getData()
      },
      countryCodes () {
        return getCodes()
      },
      countyRequired () {
        return this.formData.country === 'GB'
      },
      stateRequired () {
        return this.formData.country === 'US'
      },
      postCodeRequired () {
        return this.formData.country === 'GB'
      },
      // Validation Errors
      address1Errors () {
        const errors = []
        if (!this.$v.formData.address1.$dirty) return errors
        !this.$v.formData.address1.required && errors.push('Address 1 is required.')
        !this.$v.formData.address1.minLength && errors.push('Address 1 must be at least 1 character long')
        !this.$v.formData.address1.maxLength && errors.push('Address 1 must be at most 100 characters long')
        return errors
      },
      address2Errors () {
        const errors = []
        if (!this.$v.formData.address2.$dirty) return errors
        // !this.$v.formData.address2.minLength && errors.push('Address 2 must be at least 1 character long')
        !this.$v.formData.address2.maxLength && errors.push('Address 2 must be at most 100 characters long')
        return errors
      },
      address3Errors () {
        const errors = []
        if (!this.$v.formData.address3.$dirty) return errors
        // !this.$v.formData.address3.minLength && errors.push('Address 3 must be at least 1 character long')
        !this.$v.formData.address3.maxLength && errors.push('Address 3 must be at most 100 characters long')
        return errors
      },
      cityErrors () {
        const errors = []
        if (!this.$v.formData.city.$dirty) return errors
        !this.$v.formData.city.required && errors.push('City is required.')
        !this.$v.formData.city.minLength && errors.push('City must be at least 2 characters long')
        !this.$v.formData.city.maxLength && errors.push('City must be at most 40 characters long')
        return errors
      },
      countyErrors () {
        const errors = []
        if (!this.$v.formData.county.$dirty) return errors
        !this.$v.formData.county.required && errors.push('County is required.')
        !this.$v.formData.county.validCounty && errors.push('Please select a valid county from the list')
        return errors
      },
      stateErrors () {
        const errors = []
        if (!this.$v.formData.state.$dirty) return errors
        !this.$v.formData.state.required && errors.push('State is required.')
        !this.$v.formData.state.validState && errors.push('Please select a valid state from the list')
        return errors
      },
      postCodeErrors () {
        const errors = []
        if (!this.$v.formData.postCode.$dirty) return errors
        !this.$v.formData.postCode.required && errors.push('Post Code is required.')
        !this.$v.formData.postCode.minLength && errors.push('Post Code must be at least 2 characters long')
        !this.$v.formData.postCode.maxLength && errors.push('Post Code must be at most 30 characters long')
        return errors
      },
      countryErrors () {
        const errors = []
        if (!this.$v.formData.country.$dirty) return errors
        !this.$v.formData.country.required && errors.push('Country is required.')
        !this.$v.formData.country.validCountry && errors.push('Please select a valid country from the list')
        return errors
      }
    },
    methods: {
      setFormData (formData) {
        // Parent could call this to, for example, copy data between address forms (e.g. billing to delivery) so the
        // user doesn't have to type it multiple times.
        this.formData.address1 = formData.address1
        this.formData.address2 = formData.address2
        this.formData.address3 = formData.address3
        this.formData.city = formData.city
        this.formData.county = formData.county
        this.formData.state = formData.state
        this.formData.postCode = formData.postCode
        this.formData.country = formData.country
        this.$v.$touch()
      }
    },
    watch: {
      'formData.country' (newVal) {
        // When the country changes, reset the conditional fields so we don't try to save unnecessary, and possibly
        // incorrect, data
        switch (newVal) {
          case 'GB':
            console.log('Clearing state for UK country')
            this.formData.state = null
            break
          case 'US':
            console.log('Clearing county for US country')
            this.formData.county = null
            break
          default:
            console.log('Clearing state and county')
            this.formData.county = null
            this.formData.state = null
            break
        }
      }
    }
  }
</script>

<style scoped>

</style>

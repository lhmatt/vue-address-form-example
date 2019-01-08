<template>
  <div>
    <toast></toast>
    <router-view :existingData="exampleCompanyModel"></router-view>
  </div>
</template>

<script>
  import Toast from '@/views/Toast'
  // Use Root components to do your model loading. So for example we could load a comapny model and
  // then pass the address data to the router-view.
  export default {
    name: 'AddressRoot',
    components: {Toast},
    data: () => ({
      exampleCompanyModel: {
        name: 'Test Company',
        addresses: {
          billing: {
            address1: 'Test 1',
            address2: 'Test 2',
            address3: 'Test 3',
            city: 'City',
            // county: null,
            state: 'AZ',
            country: 'US',
            postCode: 'Test Post Code'
          },
          delivery: {
            address1: 'Test 1',
            address2: 'Test 2',
            address3: 'Test 3',
            city: 'City',
            // county: null,
            state: 'AZ',
            country: 'US',
            postCode: 'Test Post Code'
          }
        }
      }
      // If you don't have any existing data then you can set things to null
      // exampleCompanyModel: {
      //   name: 'Test Company',
      //   addresses: {
      //     billing: null,
      //     delivery: null
      //   }
      // }
    })
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <p>There {{ !!data ? 'is' : 'is no' }} data.</p>
    <p>There are {{ data?.tours?.length || 0 }} tours.</p>
    <ul>
      <li
        v-for="tour in data?.tours"
        :key="tour.id"
      >
        <p>{{ tour.name }}</p>
        <p>{{ tour.startingDate }}</p>
        <p>{{ tour.endingDate }}</p>
        <p>{{ tour.price }}</p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
const query = gql`
  query($travelSlug: String!, $priceFrom: Int, $priceTo: Int, $startingDate: Timestamp, $endingDate: Timestamp, $priceSortOrder: SortOrder, $skip: Int, $take: Int) {
    tours(findToursInput: { travelSlug: $travelSlug, priceFrom: $priceFrom, priceTo: $priceTo, startingDate: $startingDate, endingDate: $endingDate, priceSortOrder: $priceSortOrder, skip: $skip, take: $take }) {
      id
      name
      startingDate
      endingDate
      price
    }
  }
`
const variables = { travelSlug: "jordan-360" }
const { data } = await useAsyncQuery(query, variables)
</script>
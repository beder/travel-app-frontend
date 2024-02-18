<script lang="ts" setup>
const state = reactive({
  skip: 0,
  take: 5,
});

const { data } = await useAsyncGql("travels", state);
</script>

<template>
  <div>
    <h2>Travels</h2>

    <ul>
      <li v-for="travel of data?.travels || []" :key="travel.id">
        {{ travel.name }} ({{ travel.description }})
        <UButton
          v-if="travel.tours.length"
          :to="`/travels/${travel.slug}/tours`"
          target="_self"
        >
          Tours
        </UButton>
        <span v-else> No tours available</span>
        <UButton :to="`/travels/${travel.slug}/tours/new`" target="_self">
          New Tour
        </UButton>
      </li>
    </ul>

    <button
      :display="state.skip === 0"
      :disabled="state.skip === 0"
      @click="state.skip -= state.take"
    >
      Previous
    </button>
    <button
      :disabled="data?.travels?.length < state.take"
      @click="state.skip += state.take"
    >
      Next
    </button>
  </div>
</template>

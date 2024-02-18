<script lang="ts" setup>
const { data } = await useAsyncGql('tours', { travelSlug: 'jordan-360' });
</script>

<template>
  <div>
    <h2>Tours</h2>

    <p
      v-for="(entry, i) of data?.tours"
      :key="entry.id"
    >
      {{ i + 1 }}. Tour Name: {{ entry.name }} ({{
        entry.startingDate
      }})
    </p>
  </div>
</template>

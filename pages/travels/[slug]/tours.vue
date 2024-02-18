<script lang="ts" setup>
const route = useRoute()
const travelSlug = ref(route.params.slug) as Ref<string>
const { data } = await useAsyncGql('tours', { travelSlug })
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

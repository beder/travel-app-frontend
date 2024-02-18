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
        <span v-else>No tours available</span>
        <UButton :to="`/travels/${travel.slug}/tours/new`" target="_self">
          New Tours
        </UButton>
        <UButton color="red" @click="confirmDeletion(travel.slug)"
          >Delete Travel</UButton
        >
      </li>
    </ul>

    <button
      :display="state.pagination.skip === 0"
      :disabled="state.pagination.skip === 0"
      @click="state.pagination.skip -= state.pagination.take"
    >
      Previous
    </button>
    <button
      :disabled="data?.travels?.length < state.pagination.take"
      @click="state.pagination.skip += state.pagination.take"
    >
      Next
    </button>

    <UModal v-model="state.modal" @close="state.modal = false">
      <Card class="p-4 flex flex-col space-y-6">
        <h2 class="text-xl text-primary font-semibold">Delete Travel</h2>

        Are you sure you want to delete this travel?
        <div class="flex items-start justify-end space-x-4">
          <UButton color="red" class="px-4" @click="deleteTravel()"
            >Yes</UButton
          >
          <UButton class="px-4" @click="state.modal = false">No</UButton>
        </div>
      </Card>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const state = reactive({
  pagination: {
    skip: 0,
    take: 5,
  },
  modal: false,
  deletionTargetSlug: "",
});

const { data, refresh } = await useAsyncGql("travels", state.pagination);

const confirmDeletion = async (slug: string) => {
  state.modal = true;
  state.deletionTargetSlug = slug;
};

const deleteTravel = async () => {
  state.modal = false;

  await useAsyncGql("deleteTravel", { slug: state.deletionTargetSlug });

  refresh();
};
</script>

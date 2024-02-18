<script lang="ts" setup>
const state = reactive({
  pagination: {
    page: 1,
    pageSize: 5,
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

<template>
  <div>
    <h2>Travels</h2>

    <UTable
      :rows="data?.travels?.items"
      :columns="[
        { key: 'name', label: 'Name' },
        { key: 'slug', label: 'Slug' },
        { key: 'numberOfDays', label: 'Number of Days' },
        { key: 'isPublic', label: 'Public' },
        { key: 'actions' },
      ]"
    >
      <template #actions-data="{ row }">
        <UButton :to="`/travels/${row.slug}/tours`" target="_self" class="mr-2">
          Tours
        </UButton>
        <UButton
          :to="`/travels/${row.slug}/tours/new`"
          target="_self"
          class="mr-2"
        >
          New Tour
        </UButton>
        <UButton color="red" @click="confirmDeletion(row.slug)"
          >Delete Travel</UButton
        >
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UButton
        :display="state.pagination.page === 1"
        :disabled="state.pagination.page === 1"
        icon="i-heroicons-chevron-left"
        color="gray"
        variant="outline"
        @click="state.pagination.page -= 1"
      />
      <UButton
        :disabled="
          data?.travels?.meta?.page === data?.travels?.meta?.totalPages
        "
        icon="i-heroicons-chevron-right"
        color="gray"
        variant="outline"
        @click="state.pagination.page += 1"
      />
    </div>

    <UModal v-model="state.modal" @close="state.modal = false">
      <UCard class="p-4 flex flex-col space-y-6">
        <h2 class="text-xl text-primary font-semibold">Delete Travel</h2>

        Are you sure you want to delete this travel?

        <div class="flex items-start justify-end space-x-4">
          <UButton color="red" class="px-4" @click="deleteTravel()"
            >Yes</UButton
          >
          <UButton class="px-4" @click="state.modal = false">No</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

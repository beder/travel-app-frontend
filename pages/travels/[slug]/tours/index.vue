<script lang="ts" setup>
import type { FormError } from "#ui/types";

import type { ToursQuery } from "#gql";

const { isAdmin, isEditor } = await useCurrentUser();

const state = reactive({
  editingTour: false,
  editedTour: null as ToursQuery["tours"][0] | null,
});
const route = useRoute();
const travelSlug = ref(route.params.slug) as Ref<string>;
const { data, refresh } = await useAsyncGql(
  "tours",
  { travelSlug },
  {
    transform: (data) => ({
      ...data,
      tours: data.tours.map((t) => ({
        ...t,
        startingDate: new Date(t.startingDate).toISOString().split("T")[0],
        endingDate: new Date(t.endingDate).toISOString().split("T")[0],
        price: t.price / 100,
      })),
    }),
  },
);

const editTour = (tour: ToursQuery["tours"][0]) => {
  state.editingTour = true;
  state.editedTour = { ...tour };
};

const validate = (state: any): FormError[] => {
  const errors = [];

  if (!state.editedTour.name)
    errors.push({ path: "name", message: "Required" });
  if (!state.editedTour.startingDate)
    errors.push({ path: "startingDate", message: "Required" });
  if (!state.editedTour.endingDate)
    errors.push({ path: "endingDate", message: "Required" });
  if (!state.editedTour.price)
    errors.push({ path: "price", message: "Required" });
  if (state.editedTour.price < 0)
    errors.push({ path: "price", message: "Must be at least 0" });
  if (
    state.editedTour.startingDate &&
    state.editedTour.endingDate &&
    state.editedTour.startingDate > state.editedTour.endingDate
  )
    errors.push({
      path: "startingDate",
      message: "Must be before ending date",
    });

  return errors;
};

async function onSubmit() {
  if (!state.editedTour) return;

  const { data } = await useAsyncGql("updateTour", {
    ...state.editedTour,
    price: state.editedTour.price * 100,
  });

  if (data?.value?.updateTour?.id) {
    state.editingTour = false;
    state.editedTour = null;

    refresh();
  }
}
</script>

<template>
  <div>
    <h2>Tours</h2>
    <UTable
      :rows="data?.tours"
      :columns="[
        { key: 'name', label: 'Name' },
        { key: 'startingDate', label: 'Starting Date' },
        { key: 'endingDate', label: 'Ending Date' },
        { key: 'price', label: 'Price' },
        { key: 'actions' },
      ]"
    >
      <template #actions-data="{ row }">
        <UButton
          v-if="isEditor"
          color="primary"
          icon="i-heroicons-pencil"
          @click="editTour(row)"
        >
          Edit
        </UButton>
      </template>
    </UTable>

    <UButton
      v-if="isAdmin"
      :to="`/travels/${travelSlug}/tours/new`"
      target="_self"
    >
      New
    </UButton>

    <UModal v-model="state.editingTour" @close="state.editingTour = false">
      <UCard class="p-4 flex flex-col space-y-6">
        <UForm
          v-if="state.editedTour"
          :validate="validate"
          :state="state"
          class="flex flex-col space-y-6"
          @submit="onSubmit"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
            Edit Tour
          </h3>
          <UFormGroup
            label="Name"
            name="name"
            class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
          >
            <UInput
              v-model="state.editedTour.name"
              placeholder="ITJOR20211101"
              input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
            />
          </UFormGroup>
          <UFormGroup
            label="Starting Date"
            name="startingDate"
            class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
          >
            <UInput
              v-model="state.editedTour.startingDate"
              type="date"
              input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
            />
          </UFormGroup>
          <UFormGroup
            label="Ending Date"
            name="endingDate"
            class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
          >
            <UInput
              v-model="state.editedTour.endingDate"
              type="date"
              input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
            />
          </UFormGroup>
          <UFormGroup
            label="Price"
            name="price"
            class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
          >
            <UInput
              v-model="state.editedTour.price"
              type="number"
              step="0.01"
              input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
            />
          </UFormGroup>
          <div class="flex items-start justify-end space-x-4">
            <UButton type="submit" color="primary">Save</UButton>
            <UButton @click="state.editingTour = false">Cancel</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

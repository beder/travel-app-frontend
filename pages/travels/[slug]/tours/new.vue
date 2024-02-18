<template>
  <div class="min-h-screen flex items-center justify-center">
    <section class="relative py-6 sm:py-10 w-full">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
      >
        <a
          href="/"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >Travel App</a
        >
        <UCard
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <UForm
            :validate="validate"
            :state="state"
            class="flex flex-col space-y-6"
            @submit="onSubmit"
          >
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
              Create a new Tour
            </h3>
            <UFormGroup
              label="Name"
              name="name"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <UInput
                v-model="state.name"
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
                v-model="state.startingDate"
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
                v-model="state.endingDate"
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
                v-model="state.price"
                type="number"
                step="0.01"
                input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
              />
            </UFormGroup>
            <UButton type="submit">Create</UButton>
          </UForm>
        </UCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormError } from "#ui/types";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const travelSlug = ref(route.params.slug) as Ref<string>;

const state = reactive({
  name: "",
  startingDate: new Date().toISOString().split("T")[0],
  endingDate: new Date().toISOString().split("T")[0],
  price: 0,
  travelSlug: travelSlug.value,
});

const validate = (state: any): FormError[] => {
  const errors = [];

  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.startingDate)
    errors.push({ path: "startingDate", message: "Required" });
  if (!state.endingDate)
    errors.push({ path: "endingDate", message: "Required" });
  if (!state.price) errors.push({ path: "price", message: "Required" });
  if (state.price < 0)
    errors.push({ path: "price", message: "Must be at least 0" });
  if (
    state.startingDate &&
    state.endingDate &&
    state.startingDate > state.endingDate
  )
    errors.push({
      path: "startingDate",
      message: "Must be before ending date",
    });

  return errors;
};

async function onSubmit() {
  const { data } = await useAsyncGql("createTour", {
    ...state,
    price: state.price * 100,
  });

  if (data?.value?.createTour?.id) {
    navigateTo(`/travels/${travelSlug.value}/tours`);
  }
}
</script>

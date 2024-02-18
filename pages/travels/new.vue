<script setup lang="ts">
import type { FormError } from "#ui/types";
import { parse } from "vue/compiler-sfc";
definePageMeta({
  middleware: "auth",
});

const state = reactive({
  isPublic: true,
  slug: "",
  name: "",
  description: "",
  numberOfDays: 1,
  moods: {
    culture: 5,
    history: 5,
    nature: 5,
    party: 5,
    relax: 5,
  },
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.slug) errors.push({ path: "slug", message: "Required" });
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.description)
    errors.push({ path: "description", message: "Required" });
  if (!state.numberOfDays)
    errors.push({ path: "numberOfDays", message: "Required" });
  if (state.numberOfDays < 1)
    errors.push({ path: "numberOfDays", message: "Must be at least 1" });
  if (state.numberOfDays && parseInt(state.numberOfDays) !== state.numberOfDays)
    errors.push({ path: "numberOfDays", message: "Must be an integer" });
  ["culture", "history", "nature", "party", "relax"].forEach((mood) => {
    if (state.moods[mood] < 0)
      errors.push({ path: `moods.${mood}`, message: "Must be at least 0" });
  });

  return errors;
};

async function onSubmit() {
  const { data } = await useAsyncGql("createTravel", state);

  if (data?.value?.createTravel?.id) {
    navigateTo("/");
  }
}
</script>

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
              Create a new Travel
            </h3>
            <UFormGroup
              label="Slug"
              name="slug"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <UInput
                v-model="state.slug"
                placeholder="jordan-360"
                input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
              />
            </UFormGroup>
            <UFormGroup
              label="Name"
              name="name"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <UInput
                v-model="state.name"
                placeholder="Jordan 360"
                input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
              />
            </UFormGroup>
            <UFormGroup
              label="Description"
              name="description"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <UTextarea
                v-model="state.description"
                placeholder="A trip to Jordan"
                textarea-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
              />
            </UFormGroup>
            <UFormGroup
              label="Number of Days"
              name="numberOfDays"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <UInput
                v-model="state.numberOfDays"
                type="number"
                input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
              />
            </UFormGroup>
            <UDivider label="Moods" />
            <UFormGroup
              label="Culture"
              name="moodsCulture"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <URange v-model="state.moods.culture" :min="0" :max="10" />
            </UFormGroup>
            <UFormGroup
              label="History"
              name="moodsHistory"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <URange v-model="state.moods.history" :min="0" :max="10" />
            </UFormGroup>
            <UFormGroup
              label="Nature"
              name="moodsNature"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <URange v-model="state.moods.nature" :min="0" :max="10" />
            </UFormGroup>
            <UFormGroup
              label="Party"
              name="moodsParty"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <URange v-model="state.moods.party" :min="0" :max="10" />
            </UFormGroup>
            <UFormGroup
              label="Relax"
              name="moodsRelax"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <URange v-model="state.moods.relax" :min="0" :max="10" />
            </UFormGroup>
            <UButton type="submit">Create</UButton>
          </UForm>
        </UCard>
      </div>
    </section>
  </div>
</template>

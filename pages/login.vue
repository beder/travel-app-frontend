<template>
  <div class="min-h-screen flex items-center justify-center">
    <section class="relative py-6 sm:py-10">
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
            <p v-if="state.error.length" class="text-red-500 dark:text-red-400">
              Invalid credentials, please try again.
            </p>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
              Sign in to Travel App
            </h3>
            <UFormGroup
              label="Your email"
              name="email"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <UInput
                v-model="state.email"
                input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
                placeholder="email@example.com"
              />
            </UFormGroup>

            <UFormGroup
              label="Your password"
              name="password"
              class="text-sm rtl:text-right font-medium block text-gray-900 dark:text-gray-300 space-y-2"
            >
              <UInput
                v-model="state.password"
                input-class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg"
                placeholder="•••••••••••••••"
                type="password"
              />
            </UFormGroup>

            <div class="flex items-start">
              <label
                class="text-sm rtl:text-right font-medium text-gray-900 dark:text-gray-300 flex items-center mr-32"
                ><input
                  type="checkbox"
                  class="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 me-2 dark:bg-gray-700 dark:border-gray-600 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600"
                  value="on"
                />
                Remember me</label
              >
              <a
                href="/"
                class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >Forgot password?</a
              >
            </div>
            <UButton
              type="submit"
              class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800 rounded-lg w-full1"
            >
              Sign in
            </UButton>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a
                href="/"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign up</a
              >
            </p>
          </UForm>
        </UCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormError } from "#ui/types";

const state = reactive({
  error: "",
  email: "",
  password: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit() {
  console.log({ email: state.email, password: state.password });

  const { data } = await useAsyncGql("login", state);

  if (data?.value?.login?.accessToken) {
    const session = useCookie<string>("_session");

    session.value = data.value.login.accessToken;

    navigateTo("/");
  } else {
    state.error = "Invalid credentials";
  }
}
</script>

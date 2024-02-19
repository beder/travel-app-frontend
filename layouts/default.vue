<script setup lang="ts">
const { currentUser, logout } = await useCurrentUser();
</script>

<template>
  <div>
    <nav
      class="text-gray-700 dark:text-gray-200 divide-gray-100 dark:divide-gray-700 sm:px-4 w-full bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50"
    >
      <div
        class="mx-auto flex flex-wrap justify-between items-center container"
      >
        <a href="/" class="flex items-center">Travel App</a>
        <div class="flex w-1/2">
          <button
            type="button"
            data-collapse-toggle="mobile-menu-3"
            aria-controls="mobile-menu-3"
            aria-expanded="false"
            class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <div class="shrink-0 w-5 h-5 i-heroicons-magnifying-glass" />
          </button>
          <div class="hidden relative md:block md:w-full">
            <div
              class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                class="shrink-0 w-4 h-4"
                role="img"
                aria-label="search outline"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                ></path>
              </svg>
            </div>
            <input
              id="search-navbar"
              class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-500 text-sm rounded-lg ps-10"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
        <!--<SearchBar>-->
        <div class="flex items-center">
          <div class="md:ml-4 md:flex md:items-center">
            <div v-if="state.currentUser">
              <span class="block text-sm">{{ state.currentUser?.email }}</span>
              <span class="block truncate text-sm font-medium">{{
                state.currentUser?.roles?.[0]?.name
              }}</span>
            </div>
            <div
              v-if="state.currentUser"
              id="avatar-menu"
              class="relative flex justify-center items-center rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 ml-4"
              tabindex="0"
            >
              <div class="rounded-full i-heroicons-user-circle w-8 h-8"></div>
              <div
                class="flex-shrink-0 rounded-full border-2 border-white dark:border-gray-800 w-3.5 h-3.5 bg-green-500 absolute bottom-0 end-0"
              ></div>
            </div>
            <UButton
              v-if="state.currentUser"
              color="primary"
              class="ml-4"
              @click="logout"
            >
              Sign out
            </UButton>
            <UButton
              v-else
              color="primary"
              class="ml-4"
              to="/login"
              target="_self"
            >
              Sign in
            </UButton>
          </div>
        </div>
        <!--<UserMenuDropdown>-->
      </div>
    </nav>
    <main class="p-4 h-auto pt-20">
      <slot />
    </main>
  </div>
</template>

import type { CurrentUserQuery } from "#gql";

export const useCurrentUser = async () => {
  const session = useCookie("_session", { watch: true });

  const { data } = await useAsyncGql("currentUser");

  const currentUser = ref<CurrentUserQuery["me"] | void>(data?.value?.me);
  const isAdmin = ref<boolean>(
    data?.value?.me?.roles?.some((role) => role.name === "admin") || false,
  );
  const isEditor = ref<boolean>(
    data?.value?.me?.roles?.some((role) =>
      ["admin", "editor"].includes(role.name),
    ) || false,
  );

  watch(
    () => session.value,
    () => {
      currentUser.value = null;
      isAdmin.value = false;
      isEditor.value = false;
    },
  );

  return {
    currentUser,
    isAdmin,
    isEditor,
    logout: () => {
      session.value = null;
    },
  };
};

import type { CurrentUserQuery } from "#gql";

export const useCurrentUser = async () => {
  const session = useCookie("_session", { watch: true });

  const { data } = await useAsyncGql("currentUser");

  const currentUser = ref<CurrentUserQuery["me"] | void>(data?.value?.me);

  watch(
    () => session.value,
    () => (currentUser.value = null),
  );

  return {
    currentUser,
    logout: () => {
      session.value = null;
    },
  };
};

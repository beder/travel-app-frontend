export const useCurrentUser = async () => {
  const { data } = await useAsyncGql("currentUser");
  const currentUser = data?.value?.me || null;
  return currentUser;
};

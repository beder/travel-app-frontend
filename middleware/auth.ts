function isAuthenticated(): boolean {
  const session = useCookie("_session");

  return !!session?.value;
}
// ---cut---
export default defineNuxtRouteMiddleware(() => {
  if (!isAuthenticated()) {
    return navigateTo("/login");
  }
});

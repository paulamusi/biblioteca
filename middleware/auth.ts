export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseSession();

    if (!user.value) {
        return navigateTo('/login');
    }
});
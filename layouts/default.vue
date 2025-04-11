<script setup lang="ts">
const user = useSupabaseUser();
</script>
<template>
    <div>
        <GlobalHeader />
        <slot></slot>
        <GlobalFooter />
    </div>
</template>
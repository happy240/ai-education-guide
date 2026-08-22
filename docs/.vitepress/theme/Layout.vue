<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const { Layout: DefaultLayout } = DefaultTheme
const route = useRoute()

const pageClass = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  const map = {
    '/teachers_guide': 'guide-teachers',
    '/parents_guide': 'guide-parents',
    '/middle_school_guide': 'guide-middle',
    '/primary_student_guide': 'guide-primary',
    '/': 'guide-home',
  }
  return map[path] || ''
})
</script>

<template>
  <div class="guide-page" :class="pageClass">
    <DefaultLayout />
  </div>
</template>

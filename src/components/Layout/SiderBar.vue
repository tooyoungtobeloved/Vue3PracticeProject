<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8">
        <Icon icon="lucide:menu"></Icon>
      </Button>

      <Button variant="outline" size="icon" class="w-8 h-8">
        <Icon icon="lucide:plus"></Icon>
      </Button>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SiderBarLinks :links="links" />
      </div>
      <div>
        <SiderBarLinks @actionClicked="handleClick" :links="accountLinks" />
      </div>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import SiderBarLinks from './SiderBarLinks.vue'
import Button from '../ui/button/Button.vue'
import { logout } from '@/utils/supaAuth'
const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house',
  },
  {
    title: 'Projects',
    to: '/projects',
    icon: 'lucide:building-2',
  },
  {
    title: 'My Tasks',
    to: '/tasks',
    icon: 'lucide:badge-check',
  },
]

const accountLinks = [
  {
    title: 'Profile',
    to: '/profile',
    icon: 'lucide:user',
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: 'lucide:settings',
  },
  {
    title: 'Sign Out',
    icon: 'lucide:log-out',
  },
]
const router = useRouter()
async function handleClick(title: string) {
  if (title === 'Sign Out') {
    const isLoggedOut = await logout()

    if (isLoggedOut) router.push('/login')
  }
}
</script>

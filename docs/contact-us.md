<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/workcheng.jpg',
    name: 'Andy Cheng',
    title: 'Creator',
    desc: '高级应用开发工程师',
    links: [
      { icon: 'github', link: 'https://github.com/workcheng' }
    ]
  }
]
</script>

# 联系我们

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />

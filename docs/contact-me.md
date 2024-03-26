<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/workcheng.png',
    name: 'Any Cheng',
    title: 'Creator',
    desc: 'Wechat(微信号): uoloandy',
    links: [
      { icon: 'github', link: 'https://github.com/workcheng' }
    ]
  }
]
</script>

# 联系我

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />
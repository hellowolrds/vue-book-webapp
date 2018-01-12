<template lang="pug">
	section.rank 
		//- 导入头部
		rank-head
		//- 导入tabbar
		tab-bar
</template>
<script>
// 导入底部tabbar
import TabBar from '../components/tabbar.vue';
// 导入头部
import RankHead from '../components/header.vue';
	export default {
		name: 'rank',
		data () {
			return {

			}
		},
		created () {
			// 设置标题
			this.$store.commit("change", "排行榜")
			// 显示性别切换
			this.$store.commit("changeShow", true)
		},
		components: {
			TabBar,
			RankHead
		}
	}
</script>

<style scoped type="text/css" lang="sass">
	
</style>
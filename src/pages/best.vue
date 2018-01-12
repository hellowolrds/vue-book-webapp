<template lang="pug">
	section.best 
		//- 导入头部
		best-head
		//- 导入tabbar
		tab-bar
</template>
<script>
// 导入底部tabbar
import TabBar from '../components/tabbar.vue';
// 导入头部
import BestHead from '../components/header.vue';
	export default {
		name: 'best',
		data () {
			return {

			}
		},
		created () {
			// 设置标题
			this.$store.commit("change", "RM")
			// 显示性别切换
			this.$store.commit("changeShow", true)
		},
		components: {
			TabBar,
			BestHead
		}
	}
</script>

<style scoped type="text/css" lang="sass">
	
</style>
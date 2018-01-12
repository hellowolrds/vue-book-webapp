<template lang="pug">
	section.category 
		//- 导入头部
		category-head
		//- 导入tabbar
		tab-bar
</template>
<script>
// 导入底部tabbar
import TabBar from '../components/tabbar.vue';
// 导入头部
import CategoryHead from '../components/header.vue';
	export default {
		name: 'category',
		data () {
			return {

			}
		},
		created () {
			// 设置标题
			this.$store.commit("change", "分类")
			// 显示性别切换
			this.$store.commit("changeShow", false)
		},
		components: {
			TabBar,
			CategoryHead
		}
	}
</script>

<style scoped type="text/css" lang="sass">
	
</style>
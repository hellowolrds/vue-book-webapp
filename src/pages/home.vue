<template lang="pug">
	section.home 
		//- 导入头部
		home-head
		//- 导入加载动画
		//- load
		//- 导入tabbar
		tab-bar
</template>
<script>
// 导入底部tabbar
import TabBar from '../components/tabbar.vue';
// 导入头部
import HomeHead from '../components/header.vue';
// 导入加载动画
import Load from '../components/loading.vue';
	export default {
		name: 'home',
		data () {
			return {

			}
		},
		created () {
			// 全局修改标题栏
			this.$store.commit("change", "我的书架")
			// 显示性别切换
			this.$store.commit("changeShow", false)
		},
		components: {
			TabBar,
			HomeHead,
			Load
		}
	}
</script>

<style scoped type="text/css" lang="sass">
	
</style>
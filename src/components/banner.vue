<template lang="pug">
	section.banner.common
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="banner in banners" :key="banner._id">
				<a>
					<img :src="banner.img" alt="">
				</a>
			</mt-swipe-item>
		</mt-swipe>
</template>
<script>
import api from '../fetch/index.js';
	export default {
		name: 'banner',
		data () {
			return {
				banners: []
			}
		},
		created () {
			// 首先获取banner数据
			api.getBanner().then(data=>{
				this.banners = data.data.data
			})
		}
	}
</script>

<style scoped type="text/css" lang="sass">
.banner
	height: 120px
	img
		width: 100%
</style>
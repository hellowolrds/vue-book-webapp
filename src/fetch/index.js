import axios from 'axios'
// 获取banner
async function getBanner () {
	return axios.get('/api/recommendPage/node/spread/575f74f27a4a60dc78a435a3', {params:{pl: 'ios'}})
} 
// 获取best图书数据
async function getBestBook () {
	return axios.get('/api/recommendPage/nodes/5910018c8094b1e228e5868f');
}
// 获取各个板块书籍
async function getBookSection (id) {
	return axios.get("/api/recommendPage/books/" + id );
}
// 获取更多图书
async function getBookList (id, st = 1, size = 10) {
	return axios.post('/api/recommendPage/node/books/all/'+id, {
		params: {
			ajax: 'ajax',
			st: st,
			size: size
		}
	})
}
// 获取当前图书
async function getBook (id) {
	return axios.get("/api/book/"+id);
}
// 获取当前书籍的评论
async function getReview (id, limit=5) {
	return axios.get("/api/post/review/best-by-book", {
		params: {
			book: id,
			limit: limit
		}
	});
}
// 获取相关书籍
async function getRecommend (id) {
	return axios.get("/api/book/" + id + "/recommend");
}
// 获取当前排行榜
async function getRanks () {
	return axios.get("/api/ranking/gender");
}
// 获取排行榜书籍
async function getRankBooks (id) {
	return axios.get("/api/ranking/" + id );
}
// 搜索热词
async function getSearchHotKeywords () {
	return axios.get("/api/book/search-hotwords")
}
// 根据关键词搜索
async function searchByKeyword (word) {
	return axios.get("/api/book/fuzzy-search", {
		params: {
			query: word
		}
	});
}
// 获取目录分类
async function getCategory () {
	return axios.get("/api/cats/lv2/statistics")
}
// 获取分类图书
async function getCatBooks(gender, type = 'hot', major = '', minor = '', start = 0, limit = 20) {
		return axios.get('/api/book/by-categories', {
				params: {
					gender: gender,
					type: type,
					major: major,
					minor: minor,
					start: start,
					limit: limit
				}
			})
}
// 获取当前图书分类
async function getMinorList () {
	return axios.get('/api/cats/lv2');
}
// 加载当前书本的章节
async function getChapters (id) {
	return axios.get("/api/btoc", {params: {view: 'summary', book: id}})
		.then(data=>{
			return axios.get('/api/btoc/'+data.data[0]._id, {params: {
				view: 'chapters',
				channel: 'mweb'
			}})
		});
}
// 加载当前章节内容
async function getChapterContent (id) {
	return axios.get('/chapterapi/chapter/'+id, {params: {cv: '1495097622174'}});
}
export default {
	getBanner,
	getBestBook,
	getBookSection,
	getBookList,
	getBook,
	getReview,
	getRecommend,
	getRanks,
	getRankBooks,
	getSearchHotKeywords,
	searchByKeyword,
	getCategory,
	getCatBooks,
	getMinorList,
	getChapters,
	getChapterContent
}

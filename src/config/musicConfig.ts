import type { MusicPlayerConfig } from "../types/config";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 禁用音乐播放器方法：
	// 模板默认侧边栏和导航栏两个都显示，正常情况下建议二选一，关闭其中一个
	// 1. 侧边栏：在sidebarConfig.ts侧边栏配置把音乐组件enable设为false禁用即可
	// 2. 导航栏：在本配置文件把showInNavbar设为false禁用即可

	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// Meting API 配置
	meting: {
		// Meting API 地址
		// 默认使用官方 API，也可以使用自定义 API
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "netease",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		id: "10046455237",
		// 认证 token（可选）
		auth: "",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 1. 支持传入歌词文件的路径
	// lrc: "/assets/music/lrc/使一颗心免于哀伤-哼唱.lrc",
	// 2. 或者直接填入歌词字符串内容
	// lrc: "[00:00.00]歌词内容...",
	local: {
		playlist: [
			{
				name: "所念皆星河",
				artist: "Happy子凌",
				url: "/assets/music/1.mp3",
				cover: "/assets/music/cover/cover.jpeg",
				lrc: "",
			},
			{
				name: "[Animenz] One Last Kiss",
				artist: "Animenz",
				url: "/assets/music/One_Last_Kiss.mp3",
				cover: "/assets/music/cover/cover.jpeg",
				lrc: "",
			},
			{
				name: "[Animenz] Grand Escape",
				artist: "Animenz",
				url: "/assets/music/Grand_Escape.mp3",
				cover: "/assets/music/cover/cover.jpeg",
				lrc: "",
			},
			{
				name: "星辰不坠落",
				artist: "蓝心羽",
				url: "/assets/music/2.mp3",
				cover: "/assets/music/cover/cover.jpeg",
				lrc: "[00:00.78]你总说月光不会躲[00:03.56]星辰不会坠落[00:05.58]你对我的感受一直从未被撼动[00:09.52]风吹蓝了天空[00:11.07]像你给的温柔[00:13.19]我迷失其中[00:14.82]原来这是心动[00:17.94]时间仿佛围着你倒流[00:22.48]没体会够你温柔带我去你的星空遨游[00:30.25]让浪漫更紧凑[00:32.27]潮水冲去我们留下的脚印[00:35.79]没关系[00:36.96]就算在一光年之外[00:41.21]我也不会忘记你[00:45.67]你总说月光不会躲[00:48.56]星辰不会坠落[00:50.57]你对我的感受一直从未被撼动[00:54.53]风吹蓝了天空[00:56.07]像你给的温柔[00:58.18]我迷失其中[00:59.82]原来这是心动[01:21.79]时间仿佛围着你倒流[01:26.23]没体会够你温柔带我去你的星空遨游[01:34.00]让浪漫更紧凑[01:36.00]潮水双曲[01:37.34]波轮留下的脚印[01:39.79]没关系[01:40.71]就算在1亿光年之外[01:44.95]我也不会忘记你[01:49.43]你总说月光不会躲[01:52.31]星辰不会坠落[01:54.34]你对我的感受一直从未被撼动[01:58.28]风吹蓝了天空[01:59.81]像你给的温柔[02:01.93]我迷失其中[02:03.56]原来这是心动[02:06.34]你总说月光不会躲[02:09.18]星辰不会坠落[02:11.20]你对我的感受一直从未被撼动[02:15.14]风吹蓝了天空[02:16.68]像你给的温柔[02:18.81]我迷失其中[02:20.43]原来这是心动",
			},
		],
	},
};

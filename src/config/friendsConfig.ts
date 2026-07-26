import type { FriendLink, FriendsPageConfig } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 显示列数：2列或3列
	columns: 2,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "夏夜流萤",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/summernight.webp",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 100, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
    	"title": "THW's Blog",
    	"imgurl": "https://blog.yhx1415926.top/assets/images/friends/THW.webp",
    	"desc": "前途似海，来日方长",
    	"siteurl": "https://blog.tianhw.top",
    	"tags": ["Blog"],
    	"weight": 95,
    	"enabled": true,
	},
	{
		title: "晓空blog",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/xiaokong.jpg",
		desc: "来和我们一起来让世界变得更萌一些吧~",
		siteurl: "https://blog.moeworld.tech/",
		tags: ["Blog"],
		weight: 90,
		enabled: true,
	},
	{
		title: "memset0's Blog",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/memset0.webp",
		desc: "在海月的虚空中，纵身飞过秋凉的时鸟。",
		siteurl: "https://mem.ac/",
		tags: ["Blog"],
		weight: 89,
		enabled: true,
	},
	{
		title: "x7aNote",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/x7anote.svg",
		desc: "Yuri is life.",
		siteurl: "https://xeonzilla.top/",
		tags: ["Blog"],
		weight: 88,
		enabled: true,
	},
	{
		title: "Codfish's Blog",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/Codfish.ico",
		desc: "🐟🐟🐟",
		siteurl: "https://codfish.top/",
		tags: ["Blog"],
		weight: 85,
		enabled: true,
	},
	{
		title: "Elykia",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/Elykia.gif",
		desc: "致以无瑕之人",
		siteurl: "https://blog.elykia.cn/",
		tags: ["Blog"],
		weight: 80,
		enabled: true,
	},
	{
		title: "Zero - 浮生",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/Zero.webp",
		desc: "浮生一刹万般皆舍",
		siteurl: "https://vtdd.vip/",
		tags: ["Blog"],
		weight: 75,
		enabled: true,
	},
	{
		title: "周子衡's 洛谷专栏",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/zhouziheng.webp",
		desc: "Shadow is the light!",
		siteurl: "https://www.luogu.com.cn/user/112794/article",
		tags: ["Blog"],
		weight: 70,
		enabled: true,
	},
	{
		title: "TT清沫ukの博客",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/TT_qingmo_uk.webp",
		desc: "记录生活，研究技术~",
		siteurl: "https://ttquk.netlify.app/",
		tags: ["Blog"],
		weight: 65,
		enabled: true,
	},
	{
		title: "Firefly Docs",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/firefly.png",
		desc: "Firefly主题模板文档",
		siteurl: "https://docs-firefly.cuteleaf.cn",
		tags: ["Docs"],
		weight: 9,
		enabled: true,
	},
	{
		title: "Astro",
		imgurl: "https://blog.yhx1415926.top/assets/images/friends/astro.png",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 8,
		enabled: true,
	},
];

// 获取启用的友链并按权重排序
export const getEnabledFriends = (): FriendLink[] => {
	return friendsConfig
		.filter((friend) => friend.enabled)
		.sort((a, b) => b.weight - a.weight);
};

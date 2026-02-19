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
		imgurl: "https://q1.qlogo.cn/g?b=qq&nk=7618557&s=640",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 100, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
    	"title": "THW’s Blog",
    	"imgurl": "https://image.tianhw.top/avatar.webp",
    	"desc": "前途似海，来日方长",
    	"siteurl": "https://blog.tianhw.top",
    	"tags": ["Blog"],
    	"weight": 95,
    	"enabled": true,
	},
	{
		title: "晓空blog",
		imgurl: "https://cn.cravatar.com/avatar/7cbc71db79d1e7e0ce6f640851c86ade3d7fbcce4d42ac759dd617e13cf62533?s=192&d=mm&r=g",
		desc: "来和我们一起来让世界变得更萌一些吧~",
		siteurl: "https://blog.moeworld.tech/",
		tags: ["Blog"],
		weight: 90,
		enabled: true,
	},
	{
		title: "memset0's Blog",
		imgurl: "https://mem.ac/static/a6cef06ac3267a5705afaaf9092d0c47/83805/avatar-8x.webp",
		desc: "在海月的虚空中，纵身飞过秋凉的时鸟。",
		siteurl: "https://mem.ac/",
		tags: ["Blog"],
		weight: 89,
		enabled: true,
	},
	{
		title: "x7aNote",
		imgurl: "https://xeonzilla.top/favicon.svg",
		desc: "Yuri is life.",
		siteurl: "https://xeonzilla.top/",
		tags: ["Blog"],
		weight: 88,
		enabled: true,
	},
	{
		title: "Codfish's Blog",
		imgurl: "https://codfish.top/favicon.ico",
		desc: "🐟🐟🐟",
		siteurl: "https://codfish.top/",
		tags: ["Blog"],
		weight: 85,
		enabled: true,
	},
	{
		title: "Elykia",
		imgurl: "https://bu.dusays.com/2024/10/25/671b2438203a6.gif",
		desc: "致以无瑕之人",
		siteurl: "https://blog.elykia.cn/",
		tags: ["Blog"],
		weight: 80,
		enabled: true,
	},
	{
		title: "Zero - 浮生",
		imgurl: "https://vtdd.vip/_astro/lx.U15Ju0Ce_1mLhMp.webp",
		desc: "浮生一刹万般皆舍",
		siteurl: "https://vtdd.vip/",
		tags: ["Blog"],
		weight: 75,
		enabled: true,
	},
	{
		title: "周子衡's 洛谷专栏",
		imgurl: "https://cdn.luogu.com.cn/upload/usericon/112794.png",
		desc: "Shadow is the light!",
		siteurl: "https://www.luogu.com.cn/user/112794/article",
		tags: ["Blog"],
		weight: 70,
		enabled: true,
	},
	{
		title: "Firefly Docs",
		imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
		desc: "Firefly主题模板文档",
		siteurl: "https://docs-firefly.cuteleaf.cn",
		tags: ["Docs"],
		weight: 9,
		enabled: true,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
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

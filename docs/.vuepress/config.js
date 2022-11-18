module.exports = {
  title: "okaykai",
  description: "okaykai 的前端博客",
  base: "/my-vuepress-blog/",
  theme: "reco",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    subSidebar: "auto",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "okaykai 的前端博客",
        items: [
          { text: "Github", link: "https://github.com/okaykai" },
          {
            text: "掘金",
            link: "https://juejin.cn/user/1011206430920199",
          },
        ],
      },
    ],
    sidebar: [
      {
        title: "欢迎学习",
        path: "/",
        collapsable: false, // 不折叠
        children: [{ title: "学前必读", path: "/" }],
      },
      {
        title: "Webpack",
        path: "/webpack/webpack module",
        collapsable: false, // 不折叠
        children: [
          { title: "Webpack 的模块化原理", path: "/webpack/webpack module" },
        ],
      },
    ],
  },
};

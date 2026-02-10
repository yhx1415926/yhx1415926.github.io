---
title: Markdown's Grammar
date: 2025-05-01
categories: [Blogging, Markdown]
tags: [Markdown]
pin: true
math: true
mermaid: true
---

俗话说工欲善其事必先利其器，为了能更好的 Blogging 这里整理一下在使用的 `jekyll-theme-chirpy` 支持的 `Markdown` 语法。

## 标题

# H1 - heading
{: .mt-4 .mb-0 }

## H2 - heading
{: data-toc-skip='' .mt-4 .mb-0 }

### H3 - heading
{: data-toc-skip='' .mt-4 .mb-0 }

#### H4 - heading
{: data-toc-skip='' .mt-4 }

```markdown
# H1 - heading
{: .mt-4 .mb-0 }

## H2 - heading
{: data-toc-skip='' .mt-4 .mb-0 }

### H3 - heading
{: data-toc-skip='' .mt-4 .mb-0 }

#### H4 - heading
{: data-toc-skip='' .mt-4 }
```

## 文章

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## 列表

### 有序列表

1. Firstly
2. Secondly
3. Thirdly

```markdown
1. Firstly
2. Secondly
3. Thirdly
```

### 无序列表

- Chapter
  + Section
    * Paragraph

```markdown
- Chapter
  + Section
    * Paragraph
```

### ToDo list

- [ ] Job
  + [x] Step 1
  + [x] Step 2
  + [ ] Step 3

```markdown
- [ ] Job
  + [x] Step 1
  + [x] Step 2
  + [ ] Step 3
```

### 说明列表

Sun
: the star around which the earth orbits

Moon
: the natural satellite of the earth, visible by reflected light from the sun

```markdown
Sun
: the star around which the earth orbits

Moon
: the natural satellite of the earth, visible by reflected light from the sun
```

## 引用块

> This line shows the _block quote_.

```markdown
> This line shows the _block quote_.
```

## 提示

> An example showing the `tip` type prompt.
{: .prompt-tip }

> An example showing the `info` type prompt.
{: .prompt-info }

> An example showing the `warning` type prompt.
{: .prompt-warning }

> An example showing the `danger` type prompt.
{: .prompt-danger }

```markdown
> An example showing the `tip` type prompt.
{: .prompt-tip }

> An example showing the `info` type prompt.
{: .prompt-info }

> An example showing the `warning` type prompt.
{: .prompt-warning }

> An example showing the `danger` type prompt.
{: .prompt-danger }

```

## 图片

### 标题

在图片的下一行添加斜体，它将成为标题并显示在图片底部

![Image View](/img/markdown_grammar/83110343_p3_master1200.jpg){: width="845" height="1200" }
_全屏宽度和居中对齐_

```markdown
![Image View](/img/markdown_grammar/83110343_p3_master1200.jpg){: width="845" height="1200" }
_全屏宽度和居中对齐_
```

### 大小

为了防止在加载图片时页面内容布局发生移动，应该为每张图片设置宽度和高度。

```markdown
![Image View](/img/markdown_grammar/83110343_p3_master1200.jpg){: width="845" height="1200" }
_全屏宽度和居中对齐_
```

> 对于 SVG，至少要指定其宽度，否则将无法渲染。
{: .prompt-info }

### 左侧贴靠

![Image View](/img/markdown_grammar/83110343_p8_master1200.jpg){: width="844" height="1200" .w-75 .normal}

```markdown
![Image View](/img/markdown_grammar/83110343_p8_master1200.jpg){: width="844" height="1200" .w-75 .normal}
```

### 左侧浮动

![Image View](/img/markdown_grammar/83110343_p0_master1200.jpg){: width="844" height="1200" .w-50 .left}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet rhoncus massa. Aliquam ipsum lacus, cursus in orci ut, posuere ullamcorper magna. Quisque non libero facilisis, lacinia quam ultrices, dignissim leo. In consequat sollicitudin ante eu bibendum. Suspendisse potenti. Curabitur id enim accumsan, consequat ligula in, tempus nibh. Pellentesque quis mauris condimentum sapien faucibus egestas. Ut facilisis nisl sed ante varius posuere. Morbi aliquam imperdiet nunc nec commodo.

Pellentesque at mi in odio condimentum aliquet. Nullam in fermentum ipsum. Curabitur tempor tincidunt fringilla. Nulla eros est, rutrum nec dolor et, luctus auctor ipsum. Nam elementum, quam in tempus venenatis, ante odio facilisis eros, ac volutpat erat dui et nunc. Sed eu tortor malesuada justo gravida pulvinar nec sit amet tortor. Curabitur venenatis ullamcorper leo, eu dictum dolor egestas nec. Donec sed enim aliquet, ultricies libero at, suscipit libero. Donec aliquet vel tellus vel condimentum. Duis vitae dui diam. Quisque vitae lectus sed quam dapibus convallis. Praesent rutrum pretium efficitur. Fusce volutpat rhoncus augue at facilisis. Duis ac ante nulla. Nullam tempor ante ac elit lobortis, ac suscipit massa vestibulum.

```markdown
![Image View](/img/markdown_grammar/83110343_p0_master1200.jpg){: width="844" height="1200" .w-50 .left}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet rhoncus massa. Aliquam ipsum lacus, cursus in orci ut, posuere ullamcorper magna. Quisque non libero facilisis, lacinia quam ultrices, dignissim leo. In consequat sollicitudin ante eu bibendum. Suspendisse potenti. Curabitur id enim accumsan, consequat ligula in, tempus nibh. Pellentesque quis mauris condimentum sapien faucibus egestas. Ut facilisis nisl sed ante varius posuere. Morbi aliquam imperdiet nunc nec commodo.

Pellentesque at mi in odio condimentum aliquet. Nullam in fermentum ipsum. Curabitur tempor tincidunt fringilla. Nulla eros est, rutrum nec dolor et, luctus auctor ipsum. Nam elementum, quam in tempus venenatis, ante odio facilisis eros, ac volutpat erat dui et nunc. Sed eu tortor malesuada justo gravida pulvinar nec sit amet tortor. Curabitur venenatis ullamcorper leo, eu dictum dolor egestas nec. Donec sed enim aliquet, ultricies libero at, suscipit libero. Donec aliquet vel tellus vel condimentum. Duis vitae dui diam. Quisque vitae lectus sed quam dapibus convallis. Praesent rutrum pretium efficitur. Fusce volutpat rhoncus augue at facilisis. Duis ac ante nulla. Nullam tempor ante ac elit lobortis, ac suscipit massa vestibulum.
```

### 右侧浮动

![Image View](/img/markdown_grammar/83110343_p5_master1200.jpg){: width="844" height="1200" .w-50 .right}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet rhoncus massa. Aliquam ipsum lacus, cursus in orci ut, posuere ullamcorper magna. Quisque non libero facilisis, lacinia quam ultrices, dignissim leo. In consequat sollicitudin ante eu bibendum. Suspendisse potenti. Curabitur id enim accumsan, consequat ligula in, tempus nibh. Pellentesque quis mauris condimentum sapien faucibus egestas. Ut facilisis nisl sed ante varius posuere. Morbi aliquam imperdiet nunc nec commodo.

Pellentesque at mi in odio condimentum aliquet. Nullam in fermentum ipsum. Curabitur tempor tincidunt fringilla. Nulla eros est, rutrum nec dolor et, luctus auctor ipsum. Nam elementum, quam in tempus venenatis, ante odio facilisis eros, ac volutpat erat dui et nunc. Sed eu tortor malesuada justo gravida pulvinar nec sit amet tortor. Curabitur venenatis ullamcorper leo, eu dictum dolor egestas nec. Donec sed enim aliquet, ultricies libero at, suscipit libero. Donec aliquet vel tellus vel condimentum. Duis vitae dui diam. Quisque vitae lectus sed quam dapibus convallis. Praesent rutrum pretium efficitur. Fusce volutpat rhoncus augue at facilisis. Duis ac ante nulla. Nullam tempor ante ac elit lobortis, ac suscipit massa vestibulum.

```markdown
![Image View](/img/markdown_grammar/83110343_p5_master1200.jpg){: width="844" height="1200" .w-50 .right}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet rhoncus massa. Aliquam ipsum lacus, cursus in orci ut, posuere ullamcorper magna. Quisque non libero facilisis, lacinia quam ultrices, dignissim leo. In consequat sollicitudin ante eu bibendum. Suspendisse potenti. Curabitur id enim accumsan, consequat ligula in, tempus nibh. Pellentesque quis mauris condimentum sapien faucibus egestas. Ut facilisis nisl sed ante varius posuere. Morbi aliquam imperdiet nunc nec commodo.

Pellentesque at mi in odio condimentum aliquet. Nullam in fermentum ipsum. Curabitur tempor tincidunt fringilla. Nulla eros est, rutrum nec dolor et, luctus auctor ipsum. Nam elementum, quam in tempus venenatis, ante odio facilisis eros, ac volutpat erat dui et nunc. Sed eu tortor malesuada justo gravida pulvinar nec sit amet tortor. Curabitur venenatis ullamcorper leo, eu dictum dolor egestas nec. Donec sed enim aliquet, ultricies libero at, suscipit libero. Donec aliquet vel tellus vel condimentum. Duis vitae dui diam. Quisque vitae lectus sed quam dapibus convallis. Praesent rutrum pretium efficitur. Fusce volutpat rhoncus augue at facilisis. Duis ac ante nulla. Nullam tempor ante ac elit lobortis, ac suscipit massa vestibulum.
```

### 白天/夜间模式和阴影

您可以让图片在白天/夜间模式下遵循主题偏好。这需要准备两张图片，一张用于夜间模式，一张用于白天模式，然后为它们指定一个特定类别 (`dark` or `light`)，图片将根据主题偏好切换白天/夜间模式，注意它有阴影

![Image View Day](/img/markdown_grammar/88588799_p0_master1200.jpg){: .light .w-75 .shadow .rounded-10 width="844" height="1200" }
![Image View Night](/img/markdown_grammar/88588799_p1_master1200.jpg){: .dark .w-75 .shadow .rounded-10 width="844" height="1200" }

```markdown
![Image View Day](/img/markdown_grammar/88588799_p0_master1200.jpg){: .light .w-75 .shadow .rounded-10 width="844" height="1200" }
![Image View Night](/img/markdown_grammar/88588799_p1_master1200.jpg){: .dark .w-75 .shadow .rounded-10 width="844" height="1200" }
```

## 图片路径

当一篇文章包含许多图片时，重复定义图片路径将是一项耗时的工作。为了解决这个问题，可以在帖子的 YAML 块中定义路径

```yml
---
img_path: /img/path/
---
```

然后，Markdown 的图像源可以直接写入文件名

```md
![The flower](flower.png)
```

实际输出则会是

```html
<img src="/img/path/flower.png" alt="The flower">
```

## 数学表达式

由 [**MathJax**](https://www.mathjax.org/) 支持的数学表达式

$$ \sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6} $$

When $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are

$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

```markdown
$$ \sum_{n=1}^\infty 1/n^2 = \frac{\pi^2}{6} $$

When $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are

$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
```

出于网站性能考虑，默认情况下不会加载数学功能。

```yaml
---
math: true
---
```
{: file='_sass/jekyll-theme-chirpy.scss'}

启用数学功能后，可以使用以下语法添加数学公式

- **数学公式块** 应使用 `$$ math $$`  **必须** 在 `$$` 前后添加空行
- **内嵌数学公式** (在行内) 必须添加 `$ math $` ，`$` 前后不得有任何空行
- **内嵌数学公式** (列表中) 必须添加 `\$$ math $$`

> 如果公式中包含 `{`、`}` 或 `\left\{`、`\right\}` 等花括号，在 Jekyll/Chirpy 中可能会被 Liquid 误解析而丢失。
> 解决方法之一是将包含花括号的公式包裹在 `{% raw %}` 与 `{% endraw %}` 中，避免 Liquid 处理。
{: .prompt-warning }

> 证明末尾的小正方形可用数学符号完成对齐
> 例如行内用 `\(\box\)`，或使用 MathJax 支持的 `\tag*{\box}` 在块公式右侧显示。
{: .prompt-tip }

<!-- Prevent Liquid from eating curly braces -->

{% raw %}
$$
\left\{ x \in \mathbb{R} \mid x > 0 \right\}
$$
{% endraw %}

<!-- Proof end with a QED box (inline or right-aligned) -->

The proof is complete. \(\box\)

$$
\text{Proof.}\ \ldots \tag*{\box}
$$

```markdown
<!-- Block math, keep all blank lines -->

$$
LaTeX_math_expression
$$

<!-- Inline math in lines, NO blank lines -->

"Lorem ipsum dolor sit amet, $$ LaTeX_math_expression $$ consectetur adipiscing elit."

<!-- Inline math in lists, escape the first `$` -->

1. \$$ LaTeX_math_expression $$
2. \$$ LaTeX_math_expression $$
3. \$$ LaTeX_math_expression $$

<!-- Prevent Liquid from eating curly braces -->

{% raw %}
$$
\left\{ x \in \mathbb{R} \mid x > 0 \right\}
$$
{% endraw %}

<!-- Proof end with a QED box (inline or right-aligned) -->

The proof is complete. \(\box\)

$$
\text{Proof.}\ \ldots \tag*{\box}
$$
```

## 表格

| Company                      | Contact          | Country |
|:-----------------------------|:-----------------|--------:|
| Alfreds Futterkiste          | Maria Anders     | Germany |
| Island Trading               | Helen Bennett    | UK      |
| Magazzini Alimentari Riuniti | Giovanni Rovelli | Italy   |

```markdown
| Company                      | Contact          | Country |
|:-----------------------------|:-----------------|--------:|
| Alfreds Futterkiste          | Maria Anders     | Germany |
| Island Trading               | Helen Bennett    | UK      |
| Magazzini Alimentari Riuniti | Giovanni Rovelli | Italy   |
```

## 链接

<https://www.bilibili.com/video/BV1524y1k787/>

```markdown
<https://www.bilibili.com/video/BV1524y1k787/>
```

## 脚注

Click the hook will locate the footnote[^footnote], and here is another footnote[^fn-nth-2].

```markdown
Click the hook will locate the footnote[^footnote], and here is another footnote[^fn-nth-2].
```

## 内联代码

This is an example of `Inline Code`.

```markdown
This is an example of `Inline Code`.
```

## 文件路径

Here is the `/path/to/the/file.extend`{: .filepath}.

```markdown
Here is the `/path/to/the/file.extend`{: .filepath}.
```

## 代码块

### 普通的代码块

```
This is a common code snippet, without syntax highlight and line number.
```

````markdown
```
This is a common code snippet, without syntax highlight and line number.
```
````

### 特定语言

```bash
if [ $? -ne 0 ]; then
  echo "The command was not successful.";
  #do the needful / exit
fi;
```

````markdown
```bash
if [ $? -ne 0 ]; then
  echo "The command was not successful.";
  #do the needful / exit
fi;
```
````

### 特定文件名

```sass
@import
  "colors/light-typography",
  "colors/dark-typography";
```
{: file='_sass/jekyll-theme-chirpy.scss'}

````markdown
```sass
@import
  "colors/light-typography",
  "colors/dark-typography";
```
{: file='_sass/jekyll-theme-chirpy.scss'}
````

## Mermaid

```mermaid
 gantt
  title  Adding GANTT diagram functionality to mermaid
  apple :a, 2017-07-20, 1w
  banana :crit, b, 2017-07-23, 1d
  cherry :active, c, after b a, 1d
```

````markdwon
```mermaid
 gantt
  title  Adding GANTT diagram functionality to mermaid
  apple :a, 2017-07-20, 1w
  banana :crit, b, 2017-07-23, 1d
  cherry :active, c, after b a, 1d
```
````

[**美人鱼**](https://github.com/mermaid-js/mermaid) 是一款出色的图表生成工具，默认情况下不会加载。

```yaml
---
mermaid: true
---
```

## 命名和路径

创建一个名为 `YYYY-MM-DD-TITLE.EXTENSION`{: .filepath}，并将其放在 `_posts`{: .filepath} 目录下。注意，`EXTENSION`{: .filepath} 必须是 `md`{: .filepath} 或 `markdown`{: .filepath}。如果想节省创建文件的时间，请考虑使用插件 [`Jekyll-Compose`](https://github.com/jekyll/jekyll-compose)。

## 标头格式

基本上，您需要填写帖子顶部的 [Front Matter](https://jekyllrb.com/docs/front-matter/)，如下所示：

```yaml
---
title: TITLE
date: YYYY-MM-DD HH:MM:SS +/-TTTT
categories: [TOP_CATEGORIE, SUB_CATEGORIE]
tags: [TAG] # TAG names should always be lowercase
---
```

> 帖子的 _layout_ 已默认设置为 `post`，因此无需在 Front Matter 块中添加变量 _layout_。
{: .prompt-tip }

### 时区

为了准确记录帖子的发布日期，不仅要设置 `_config.yml`{: .filepath} 中的 `timezone` ，还要在 Front Matter 块的 `date` 变量中提供帖子的时区。格式：`+/-TTTT`，如 `+0800`。

### 分类和标签

每个帖子的 "类别 "最多可包含两个元素，而 "标签 "中元素的数量可以是有很多。

```yaml
---
categories: [Animal, Insect]
tags: [bee]
---
```

### 作者信息

通常不需要在 _Front Matter_ 中填写帖子的作者信息，默认情况下，它们将从配置文件中的变量 `social.name` 和 `social.links` 的第一个条目中获取。但你也可以按以下方式覆盖它：

在 `_data/authors.yml`中添加作者信息 (如果您的网站没有此文件，请立即创建一个)。

```yaml
<author_id>:
  name: <full name>
  twitter: <twitter_of_author>
  url: <homepage_of_author>
```
{: file="_data/authors.yml" }

然后使用 `author` 指定单个条目，或使用 `authors` 指定多个条目：

```yaml
---
author: <author_id>                     # for single entry
# or
authors: [<author1_id>, <author2_id>]   # for multiple entries
---
```

不过，`author` 关键词也可以识别多个条目。

> 从 `_data/authors.yml`{: .filepath} 文件读取作者信息的好处是，页面将带有元标签 [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started#card-and-content-attribution)，这将丰富 Twitter Cards 并有利于 SEO。
{: .prompt-info }

## 目录

默认情况下，**T**able **o**f **C**ontents (TOC) 会显示在帖子的右侧面板上。如果想全局关闭，请转到 `_config.yml`{:.filepath}，将变量 `toc` 的值设置为 `false`。如果要关闭特定文章的 TOC，请在文章的 [Front Matter](https://jekyllrb.com/docs/front-matter/)中添加以下内容：

```yaml
---
toc: false
---
```

## 评论

评论的全局开关由文件 `_config.yml`{:.filepath}中的变量 `comments.active` 定义。为该变量选择评论系统后，所有帖子的评论都将开启。

如果要关闭特定帖子的评论，请在帖子的**前部**添加以下内容：

```yaml
---
comments: false
---
```

## 反向脚注

[^footnote]: The footnote source
[^fn-nth-2]: The 2nd footnote source

```markdown
[^footnote]: The footnote source
[^fn-nth-2]: The 2nd footnote source
```

## Reference
[博客支持的Markdown语法](https://blog.keepnaive233.network/posts/博客支持的Markdown语法/)

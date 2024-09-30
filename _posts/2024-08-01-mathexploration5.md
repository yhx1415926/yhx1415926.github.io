---
layout: post
title: "Haojia Shi's Lecture on Mathematics"
subtitle: "Mathematical Exploration"
author: "yhx1415926"
header-style: text
mathjax: true
tags:
  - Mathematical Exploration
---

### Background
2024年7月24日至27日，中国历史上第4位 $IMO-2G$ 的同学[史皓嘉](https://www.imo-official.org/participant_r.aspx?id=33050)回到海亮高级中学，对在暑假里准备高中数学联赛的一行菜鸟(<del>具体包括:我，我，我，我，我</del>)进行催眠，并与其余一众数竞大神探讨前几天的IMO考试以及2024CTST、2023CTST的试题。

### 2024-IMO-Solutions

[2024 IMO Solutions](https://yhx1415926.github.io/quote_img/mathexploration-5/IMO2024_Solutions.pdf)

### 2024-CTST-1

#### Problem

己知多面体 $P\ convex$ ,其每个顶点恰属于三个不同的面,且可以将 $P$ 的顶点 $BW$ 二染色，使得 $P$ 每条棱的两个端点不同色. <br>
求证:可以将 $P$ 的每条棱 $RGB$ 三染色,使得每个顶点连的三条棱的颜色两两不同,且每个面恰含两种颜色的棱.

### 2024-CTST-8

#### Problem

<div align="center"><table rules="none"><tr><td>
<p>如图，锐角 $\triangle ABC$ ,外接圆 $\Omega $ ,外心 $O$ .</p>
<p>$BB\cap CC=:M\ ,AA\cap BB=:N\ $.</p>
<p>$AM\cap BC=:D\ ,CN\cap AB=:F\ ,DF\cap \Omega =:P$</p>
<p>$PQR\parallel BO\ ,Q\in AB\ ,R\in AC$.</p>
<p>若 $PO^2=PQ\cdot PR$ ,求 $\angle ACB$ .</p>
</td><td>
<img src="https://yhx1415926.github.io/quote_img/mathexploration-5/2024CTST_8.png" style="zoom:80%"/>
</td></tr></table></div>

### 2023-CTST-5

#### Problem

<p>$\triangle ABC$ , $P_1,\dots,P_n\ \in conv\{A,B,C\}\ ,s.t.\ P_1,\dots,P_n,A,B,C$ 任意三点不共线.</p>
Prove: 可将 $\triangle ABC$ 划分为 $2n+1$ 个小三角形, $s.t.$每个小三角形的顶点都来自 $P_1,\dots,P_n,A,B,C$ <br>
且含 $A,B,C$ 中至少一个的小三角形不少于 $n+\sqrt{n}+1$ 个.

#### Solution

See More in [Further_Reading](#further_reading)

### 2023-CTST-23

#### Problem

设 $p$ 质数,实数 $\lambda \in (0,1)$ ,正整数 $s\le t<\frac{\lambda p}{12}$ .($k$ 给定)<br>
$S,T$ 分别是由 $s,t$ 个连续正整数构成的集合, $s.t.$ <br>
<p><center>$|\{(x,y)\in S\times T:kx\equiv y\ (mod\ p)\}|\ge 1+\lambda s$</center></p>
Prove: $\exists\ a,b \in \mathbb{Z},s.t.\ 1\le a \le \frac {1}{\lambda},|b|\le \frac{t}{\lambda s} $ and $ka \equiv  b \ (mod\ p)$ .

#### Solution

$Proof:$<br>
考虑这 $n(\ge 1+\lambda s)$ 个点形成的凸包 $\Gamma$ .(记 $Vol(\Gamma)=:[\Gamma]$ )<br>
假设这些点不共线,则 $[\Gamma]>0$ .<br>
<p>&emsp;&emsp;$\{(x,y):p|(y-kx)\}=\Lambda=<(1,k),(0,p)>\ \ \ \ $(Form a lattice)</p>
&emsp;&emsp;其中每个三角形的面积都可表示为:
<p>\begin{align}
\frac{1}{2}|det
\begin{bmatrix}
  x_1&y_1 \\
  x_2&y_2
\end{bmatrix}|
\end{align}</p>

&emsp;&emsp;由于 $p|(y_1-kx_1),p|(y_2-kx_2)\ \Rightarrow\ \frac{p}{2}|S_{\triangle}$<br>
&emsp;&emsp;$\Rightarrow [\Gamma]\ge \frac{p}{2} (n-2)$ (考虑最差三角剖分)<br><br>
&emsp;&emsp;Or by Pick's Theorem:
<p>\begin{align}
[\Gamma]\ge |det
\begin{bmatrix}
1&k\\
0&p
\end{bmatrix}
\cdot(\frac{n}{2}-1)|=\frac{p}{2} (n-2)
\end{align}</p>

&emsp;&emsp;又 $[\Gamma]\le (s-1)(t-1)\le (s-1)(\frac{\lambda p}{4}-1)$  (注:$\frac{\lambda p}{12}$可优化为$\frac{\lambda p}{4}$)<br>
&emsp;&emsp;则 $\frac{p}{2}(n-2)\le(s-1)(\frac{\lambda p}{4}-1)<\frac{p}{4}\cdot\lambda s\ \Rightarrow\ n\le 3.$ 矛盾！
故 $[\Gamma]=0$ .<br>

取两相邻(最近)点, $(x_1,y_1),(x_2,y_2),x_1<x_2$.<br>
则 $(1+\lambda s-1)(x_2-x_1)\le s,|(1+\lambda s-1)(y_2-y_1)|\le t$<br>
$\Rightarrow\ 1\le x_2-x_1\le \frac{1}{\lambda},y_2-y_1\le \frac{p}{\lambda s}$ 且 $k(x_2-x_1)\equiv (y_2-y_1)\ (mod\ p)$ .<br>
取 $a=x_2-x_1,b=y_2-y_1$ 即可.
<p align="right">$\Box$</p>

### Pick's_theorem

整点多边形 $\Gamma$ ,内部的点数为 $n$ ,边界点数为 $m$.<br>
则 $S_{\Gamma}=n+\frac{m}{2}-1$ .

#### Theorem's_Proof

$Proof:$<br>
可考虑三角剖分,并证明每个 $basic-triangle$ (内部无整点的三角形) 面积为 $\frac{1}{2}$ .
<div align="center"><table rules="none"><tr><td>
<img src="https://yhx1415926.github.io/quote_img/mathexploration-5/Pick.png" style="zoom:65%"/>
</td><td>
<p>$\vec{v},\vec{w}$ 三角形内部无整点</p>
<p>$\Rightarrow\ \vec{v},\vec{w}$ 张成的 平行四边形 内部无整点 ($\star$)</p>
<p>(否则关于平行四边形中心作对称点有矛盾)</p>
</td></tr></table></div>
<p>若有 $\lambda,\mu\ \ s.t.\ \lambda \vec{v}+\mu \vec{w} \in \mathbb{Z}^2\ \Rightarrow\ \{\lambda\} \vec{v}+\{\mu\} \vec{w} \in \mathbb{Z}^2\ \Rightarrow\ \lambda,\mu \in \mathbb{Z}$ . (否则与($\star$)矛盾)</p>

又由($\star$) $\Rightarrow\ (1,0)=a\vec{v}+b\vec{w},a,b \in \mathbb{Z};\ (0,1)=c\vec{v}+d\vec{w},c,d\in \mathbb{Z}$ .
<p>\begin{align}
\begin{bmatrix}
  1& 0\\
  0&1
\end{bmatrix}=
\begin{bmatrix}
  a& b\\
 c &d
\end{bmatrix}
\begin{bmatrix}
\vec{v} \\
\vec{w}
\end{bmatrix}\ \ \ det
\begin{bmatrix}
  a& b\\
 c &d
\end{bmatrix} \in \mathbb{Z}\ 
\Rightarrow\ |det
\begin{bmatrix}
\vec{v} \\
\vec{w}
\end{bmatrix}
|=1
\end{align}</p>

$\Rightarrow\ S_{\triangle basis}=\frac{1}{2}$ .<br>
(也可见于《Proofs from THE BOOK》)
<p align="right">$\Box$</p>

### General_problem

$\forall\ n\in\mathbb{N}^+ ,\epsilon >0,\exists\ C,\ s.t.$<br>
$X\subseteq \mathbb{R}^n,\ X:=span<v_1,v_2,\dots,v_n>\ \ (or\ X=f(\mathbb{Z}^n),det\ f=\pm 1)(i.e.\ lattice)$<br>
$Vol(\mathbb{R}^n/X)=1\ (i.e.\ det(v_1\ v_2\ \dots\ v_n)=\pm 1)$ (For case $n=2$ which shows above: ${\div}p$)<br>
$T:=X\cap(\prod_{i=1}^{n}[u_i,v_i))$<br>
若 $T$ 不含于 $C$ 个平行 $hyperplain$ 之并,<br>
则  $||T|-\prod_{i=1}^{n}(v_i-u_i)|<\epsilon\cdot\prod_{i=1}^{n}(v_i-u_i)$ .<br>
(未解决)

### Minkowski's_theorem

(几何代数 基石)<br>
$\Omega \subseteq \mathbb{R}^n,\ \Omega=-\Omega$ ($i.e.$ 中心对称)   $\Omega\ \ convex$ .<br>
$Vol(\Omega)>2^n\ \Rightarrow\ |\Omega\cap X|>1$ (不仅仅有 $(0,0)$) ($X=\mathbb{Z}^n$ or $f(\mathbb{Z}^n),det\ f=\pm 1$)

#### Theorem's_Proof

$Proof:$<br>
临界: $Vol((-1,1)^n)=2^n,\ |\Omega\cap\mathbb{Z}^n|=1$<br>
思想: $Vol(\Omega)>2^n$ .用'类似'抽屉原理,取 $w,v\in\Omega,\ s.t.\ w-v\in (2\mathbb{Z})^n$ .<br>
&emsp;&emsp;则 $\frac{w+(-v)}{2}$ 即为所求.<br><br>
$dim=2,X=\mathbb{Z}^2:$<br>
&emsp;&emsp;$\Omega_{t,s}=\Omega\cap ([2t,2t+2)\times[2s,2s+2))$<br>
&emsp;&emsp;$\sum_{t,s\in\mathbb{Z}}Vol(\Omega_{t,s}-(2t,2s))=Vol(\Omega)>2^2$<br>
&emsp;&emsp;$\Rightarrow$ 有非平凡交集,即 $\Omega$ 中有两点差为 $2(t-t;),2(s-s'). Q.E.D.$<br><br>
$dim=n,X=\mathbb{Z}^n:$<br>
&emsp;&emsp;$\Omega_{a_1,a_2,\dots,a_n}=\Omega\cap (\prod_{d=1}^{n}[2a_d,2a_d+2))-(2a_1,2a_2,\dots,2a_n)\subseteq [0,2)^n\ .$<br>
&emsp;&emsp;若两两均平凡相交, $\sum_{a_1,a_2,\dots,a_n\in \mathbb{Z}  }Vol(\Omega_{a_1,a_2,\dots,a_n})\le 2^n$ .<br>
&emsp;&emsp;而 $Vol(\Omega)=\sum_{a_1,a_2,\dots,a_n\in\mathbb{Z}}Vol(\Omega_{a_1,a_2,\dots,a_n})>2^n$ . 矛盾!<br>
&emsp;&emsp;$\Rightarrow\ \exists\ w,v\in\Omega,w-v\in(2\mathbb{Z})^n$ .
<p align="right">$\Box$</p>

### Lagrange's_four-square_theorem

### Further_reading

[Empty Monochromatic Triangles](https://yhx1415926.github.io/quote_img/mathexploration-5/2023CTST_5.pdf)<br><br><br>
Using generating functions to prove Lagrange's four-square theorem:

[Modular Forms,Projective Structure and the Four Square Theorem](https://yhx1415926.github.io/quote_img/mathexploration-5/MODULAR_FORMS,PROJECTIVE_STRUCTURES,AND_THE_FOUR_SQUARES_THEOREM.pdf)

### Reference

[Pick's theorem](https://yhx1415926.github.io/quote_img/mathexploration-5/Pick's_theorem.pdf)<br>
[Minkowski's theorem](https://yhx1415926.github.io/quote_img/mathexploration-5/Minkowski's_theorem.pdf)

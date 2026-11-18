---
title: "Analysis Learning"
published: 2026-09-09
updated: 2026-10-26
category: Blog
tags: [Mathematics,Analysis]
pin: false
math: true
licenseName: "CC BY 4.0"
author: yao1415926
description: "于品数学分析学习笔记"
hidden: false
---

### Intro
>&emsp;**但卑意欲少年为学者，每⼀书皆作数过尽之。书富如⼊海，百货皆有，⼈之精⼒，不能兼收尽取，但得其所欲求者尔。故愿学者每次作⼀意求之。如欲求古今兴亡治乱、圣贤作⽤、但作此意求之，勿⽣余念。又别作⼀次，求事迹故实典章⽂物之类，亦如之。他皆仿此。此虽迂钝，⽽他⽇学成，⼋⾯受敌，与涉猎者不可同⽇⽽语也。**
<p align="right">——苏轼, 又答王庠书</p>

### 实数的公理化描述
我们要求四元组 $(\mathbb{R},+,\cdot,\le)$ 表⽰满⾜下⾯四套公理:

#### (F) 域公理: $\mathbb{R}$ 是一个域
(F1) 加法结合律: $x+(y+z)=(x+y)+z$<br>
(F2) 加法交换律: $x+y=y+x$<br>
(F3) 加法单位元存在: $\exists 0\in \mathbb{R}$, s.t. $\forall x\in \mathbb{R},0+x=x$<br>
(F4) 加法逆元存在: $\forall x\in\mathbb{R},\exists (-x)\in\mathbb{R}$, s.t. $x+(-x)=0$<br>
(F5) 乘法结合律: $x\cdot (y \cdot z)=(x\cdot y)\cdot z$<br>
(F6) 乘法交换律: $x\cdot y=y\cdot x$<br>
(F7) 乘法单位元存在: $\exists 1\in\mathbb{R}$, s.t. $1\ne 0$ and $\forall x\in\mathbb{R},1\cdot x=x$<br>
(F8) 乘法逆元存在: $\forall x\in\mathbb{R^{\times}},\exists x^{-1}\in\mathbb{R}$, s.t. $x\cdot x^{-1}=1$<br>
(F9) 乘法分配律: $x\cdot (y+z)=x\cdot y+x\cdot z$

Remark1:<br>
(F1)-(F4)成立, $(\mathbb{R},+)$ 为(交换)群<br>
(F5)-(F9)成立, $(\mathbb{R}^{\times},\cdot)$ 为(交换)群<br>
(F1)-(F7)+(F9)成立, $(\mathbb{R},+,\cdot)$ 为(交换)环<br>
(F1)-(F9)成立, $(\mathbb{R},+,\cdot)$ 为域

Remark2:<br>
(F4)中的加法逆元容易证得唯一性<br>
(F8)中的乘法逆元容易证得唯一性<br>
(F7)中的 $1\ne 0$ 说明了 $\mathbb{R}$ 中至少要有2个元素

Remark3:<br>
Prove: $\forall x\in\mathbb{R},(-1)\cdot x=(-x)$<br>
Hint: $(-1)\cdot x+x=(-1)\cdot x+1\cdot x$

#### (O) 序公理: $\mathbb{R}$ 是有序域
(O1) 序的传递性: $x\le y,y\le z\Rightarrow x\le z$<br>
(O2) 序可以决定元素: $x\le y,y\le x\Rightarrow x=y$<br>
(O3) 全序关系: 任意两个 $\mathbb{R}$ 中元素均可比<br>
(O4) 与加法相容: $x\le y\Rightarrow x+z\le y+z$<br>
(O5) 与乘法相容: $x\ge 0,y\ge 0\Rightarrow xy\ge 0$

#### (A) $Achimedes$ 公理: $\mathbb{R}$ 是 Archimedes 有序域
$$\forall x>0,y$$


#### (I) 区间套公理

### Chapter 14

#### 命题84 (Faa di Bruno公式)

$$
(f\circ g)^{(n)}(x)
=\sum_{m=1}^{n}\sum_{(k_1,\ldots,k_n)\in\Gamma_m}
\frac{n!}{k_1!k_2!\cdots k_n!}
f^{(m)}(g(x))
\left(\frac{g^{(1)}(x)}{1!}\right)^{k_1}
\left(\frac{g^{(2)}(x)}{2!}\right)^{k_2}
\cdots
\left(\frac{g^{(n)}(x)}{n!}\right)^{k_n}
$$

### Homework 15

#### 习题A: 导数的定义和计算

(A1) 设 $I$ 是区间，$x_0\in I$。对 $h\neq 0$ 记差商 $q(h)=\frac{f(x_0+h)-f(x_0)}{h}\in\mathbb R^n$，它的第 $k$ 个分量正是 $q_k(h)=\frac{f_k(x_0+h)-f_k(x_0)}{h}$。

关键是对任意 $v\in\mathbb R^n$ 有
$$|v_k|\le\|v\|_2\le|v_1|+\cdots+|v_n|.$$

(⇒) 设 $f'(x_0)=L=(L_1,\dots,L_n)$。则 $|q_k(h)-L_k|\le\|q(h)-L\|_2\to0$，所以 $f_k'(x_0)$ 存在且等于 $L_k$。

(⇐) 设每个 $f_k'(x_0)$ 都存在，令 $L=(f_1'(x_0),\dots,f_n'(x_0))$。则 $\|q(h)-L\|_2\le\sum_k|q_k(h)-f_k'(x_0)|\to0$（有限个趋于 0 的量之和），所以 $f'(x_0)=L$。∎

(A2) 在 $\mathbb C$ 上用模长作范数。对实数 $h\neq0$，由于 $e^{ih}=\sum_{k\ge0}\frac{(ih)^k}{k!}$ 绝对收敛，可以逐项做线性运算：
$$\frac{e^{ih}-1}{h}-i=\sum_{k\ge2}\frac{i^kh^{k-1}}{k!}.$$
收敛级数的模不超过各项模之和（对部分和用三角不等式再取极限），再用 $\frac1{k!}\le\frac1{(k-2)!}$：
$$\Big|\frac{e^{ih}-1}{h}-i\Big|\le|h|\sum_{k\ge2}\frac{|h|^{k-2}}{k!}\le|h|\sum_{m\ge0}\frac{|h|^m}{m!}=|h|e^{|h|}\to0\quad(h\to0).$$
所以 $f'(0)=i$。
一般的 $x$：由 $e^{z_1+z_2}=e^{z_1}e^{z_2}$，
$$\frac{e^{i(x+h)}-e^{ix}}{h}-ie^{ix}=e^{ix}\Big(\frac{e^{ih}-1}{h}-i\Big),$$
它的模等于 $|e^{ix}|\cdot\big|\frac{e^{ih}-1}{h}-i\big|=\big|\frac{e^{ih}-1}{h}-i\big|\to0$（$|e^{ix}|=1$ 已在第 6 讲证明；其实只要 $e^{ix}$ 是固定的复数就够了）。所以 $(e^{ix})'=ie^{ix}$。∎

(A3) 对实数 $x$，$\cos x,\sin x$ 由实系数级数给出，都是实数，于是由 Euler 公式 $e^{ix}=\cos x+i\sin x$，在等距同构 $\mathbb C\cong\mathbb R^2$（$a+bi\mapsto(a,b)$，模长对应 $\|\cdot\|_2$）下，$f(x)=e^{ix}$ 就是 $(\cos x,\sin x)$。
由 A2，$f'(x)$ 存在且
$$f'(x)=ie^{ix}=i(\cos x+i\sin x)=-\sin x+i\cos x\ \leftrightarrow\ (-\sin x,\ \cos x).$$
由 A1 的 (⇒)，两个分量都可导且 $f'(x)=(\cos'x,\sin'x)$。比较分量得 $(\cos x)'=-\sin x$，$(\sin x)'=\cos x$。∎

两个容易漏的地方：A2 里要说明为什么能把无穷级数的模放大成各项模之和；A3 里要说明 $\cos x,\sin x$ 在 $x$ 为实数时是实数，否则“实部、虚部”的对应不成立。

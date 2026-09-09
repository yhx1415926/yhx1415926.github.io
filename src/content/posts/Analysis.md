---
title: "Analysis Learning"
published: 2026-09-09
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


#### (O) 序公理: $\mathbb{R}$ 是有序域

#### (A) $Achimedes$ 公理: $\mathbb{R}$ 是 Archimedes 有序域

#### (I) 区间套公理


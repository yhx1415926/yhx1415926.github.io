---
layout: post
title: "Zero-Sum-Subsets"
subtitle: "Mathematical Exploration"
author: "yhx1415926"
header-style: text
mathjax: true
tags:
  - Mathematical Exploration
---

### Background
2024年7月17日，瞿振华教授莅临海亮高级中学，对全省来此参加数学夏令营的学生做报告，以开阔我们业余数学爱好者的眼界。

### Introduction
我们在学习 Elemental Number Theory 时，有如下熟知结论：

#### Conclusion_1
<p>Given $n$ integers $\{a_1,a_2,\dots,a_n\}$ , $\exists\ I\subseteq \{1,2,\dots,n\}$ and $|I|\ne 0$,s.t. $n|\sum_{i\in I}{a_i}$</p>
(可考虑部分和，以及利用鸽巢原理)<br>
(其中 $n$ 为最佳,可取 $n-1$ 个 $1$.)

#### Conclusion_2
$Erdo ̋s,Ginzburg\ and\ Ziv\ Theorem$ (1961)<br>
<p>Given $2n-1$ integers $\{a_1,a_2,\dots,a_n\}$,$\exists\ I\subseteq \{1,2,\dots,2n-1\}$ and $|I|=n$,s.t. $n|\sum_{i\in I}{a_i}$</p>
(可使用反证法，取p-1次方，导出矛盾)<br>
(其中 $2n-1$ 为最佳,可取 $n-1$ 个 $0,1$.)<br>

#### General_Problem
$G$ 为有限交换群, $A$ 是由 $G$ 中元素构成的可重集。<br>
(1) $|A|$ 多大时， $\exists\ B \subseteq A$ and $|B|\ne 0$ , s.t. $\sigma(B)=0$.(称为$Davenport$常数,记作 $D(G)$ )<br>
(2) $ k\in \mathbb{Z}_{>0}$ and $exp(G)|k $,$|A|$ 多大时， $\exists B \subseteq A$ and $|B|=k$ , s.t. $\sigma(B)=0$.(记作 $S(G)$ )(称 $B$ 为 $k$ 元 $Zero-sum-subset$ )<br>
( $exp(G):=\underset{x\in G}{max}\ ord(x)$ ,或者说 $G=C_{n_1}\oplus C_{n_2}\oplus\cdots\oplus C_{n_l},\ n_1|n_2|\cdots|n_l,\ exp(G)=n_l$)<br>

($\sigma(B)=\sum_{x\in B}x$)<br>
(Con.1中, $G=\mathbb{Z} /n\mathbb{Z}=C_n$)<br>
(Con.2中, $G=C_n,k=n=exp(C_n)$ )

#### Comcerning_Problem
考虑 $G$ 秩为 $2$ 且 $n=p$ 的情形,即<br>
<p>$A=\{(a_1,b_1),(a_2,b_2),\dots,(a_m,b_m)\}\subset\mathbb{Z}^2$</p>
(1) 当 $m$ 多大时, $\exists B \subseteq A$ and $|B|\ne 0$ ,s.t. $\sigma(B)\equiv (0,0)\ (mod\ p)$<br>
(2) 当 $m$ 多大时, $\exists B \subseteq A$ and $|B|=p$ ,s.t. $\sigma(B)\equiv (0,0)\ (mod\ p)$<br><br>
$Ans_1\ =\ 2p-1$ ($2p-2$ 反例: $p-1$ 个 $(0,1),(1,0)$ )<br>
$Ans_2\ =\ 4p-3$ ($4p-4$ 反例: $p-1$ 个 $(0,0),(0,1),(1,0),(1,1)$ )<br>
(注意到解决Con.1的鸽巢原理无法应用于此处)<br>

### Solution_1-Generating_Function

### Solution_2-Chevalley_Warning_Theorem

### Kemnitz’_Conjecture's_Proof

#### Corollary_1

#### Corollary_2

#### Corollary_3

#### Corollary_4

#### Conclusion

### Reference

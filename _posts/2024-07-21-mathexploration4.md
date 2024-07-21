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
(2) $ k\in \mathbb{Z}_{>0}$ and $exp(G)|k$ , $|A|$ 多大时， $\exists B \subseteq A$ and $|B|=k$ , s.t. $\sigma(B)=0$.(记作 $S(G)$ )(称 $B$ 为 $k$ 元 $Zero-sum-subset$ )

$exp(G):=\underset{x\in G}{max}\ ord(x)$<br>
$G=C_{n_1}\oplus C_{n_2}\oplus\cdots\oplus C_{n_l},\ n_1|n_2|\cdots|n_l,\ exp(G)=n_l$

$\sigma(B):=\sum_{x\in B}x$   约定 $\sigma(\emptyset)=0$ <br><br>
(Con.1中, $G=\mathbb{Z} /n\mathbb{Z}=C_n$)<br>
(Con.2中, $G=C_n,k=n=exp(C_n)$ )

#### Concerning_Problem
考虑 $G$ 秩为 $2$ 且 $n=p$ 的情形,即<br>
<p>$A=\{(a_1,b_1),(a_2,b_2),\dots,(a_m,b_m)\}\subset\mathbb{Z}^2$</p>
(1) 当 $m$ 多大时, $\exists B \subseteq A$ and $|B|\ne 0$ ,s.t. $\sigma(B)\equiv (0,0)\ (mod\ p)$<br>
(2) 当 $m$ 多大时, $\exists B \subseteq A$ and $|B|=p$ ,s.t. $\sigma(B)\equiv (0,0)\ (mod\ p)$<br><br>
$Ans_1\ =\ 2p-1$ ($2p-2$ 反例: $p-1$ 个 $(0,1),(1,0)$ )<br>
$Ans_2\ =\ 4p-3$ ($4p-4$ 反例: $p-1$ 个 $(0,0),(0,1),(1,0),(1,1)$ )<br>
(注意到解决Con.1的鸽巢原理无法应用于此处)<br>
(Problem_2 又被称为 $Kemnitz’ Conjecture$ )<br>

### Solution_1-Generating_Function
<p>可重集 $A=\{a_1,a_2,\dots,a_m\}$, $a_1,a_2,\dots,a_m \in \mathbb{Z}_{>0}$ </p>
<p>\begin{align}(1+x^{a_1})(1+x^{a_2})\cdots(1+x^{a_m})=\sum_{B\subset A}x^{\sigma(B)}\end{align}</p>
利用:
<p>\begin{align}(1-x^{a_1})(1-x^{a_2})\cdots(1-x^{a_m})=\sum_{B\subset A}(-1)^{|B|}x^{\sigma(B)}\end{align}</p>

#### For_Con.1
$n=p,\ a_1,a_2,\dots,a_m\in \mathbb{Z}_{>0}$<br>
<p>$S_k:=\{B\subset A\ |\ \sigma(B)\equiv k\ (mod\ p)\},\ k=0,1,\dots,p-1$</p>
<p>\begin{align}f(x):=(1-x^{a_1})(1-x^{a_2})\cdots(1-x^{a_m})\in \mathbb{F}_p/(x^p-1) \end{align}</p>
<p>\begin{align}f(x)=\sum_{B\subset A}(-1)^{|B|}x^{\sigma(B)}=\sum_{k=0}^{p-1}(\sum_{B\in S_k}(-1)^{|B|})x^k\ \ (\star)\end{align}</p>
上式可看作是余式，所以表示方式是唯一的.<br>
另一方面,又有 $(1-x^{a_j})=(1-x)(\cdots)$ ,则
<p>\begin{align}f(x)=(1-x)^pg(x)\end{align}</p>
<p>\begin{align}(1-x)^p=1-\binom{p}{1}x+ \binom{p}{2}x^2+\cdots+(-1)^px^p \overset{mod\ p}{==}1-x^p\overset{mod\ x^p-1}{==}0\end{align}</p>
$\Rightarrow\ f(x)=0$ 结合 $(\star)$ $\Rightarrow $
<p>\begin{align}\forall\  0\le k\le p-1,\ \sum_{B\in S_k}(-1)^{|B|}\equiv 0\ (mod\ p) \end{align}</p>
特别的，$k=0$ 时，$\emptyset \in S_k$ 而 $\sum_{B\in S_k}(-1)^{|B|}\equiv 0\ (mod\ p)<br>
$\Rightarrow\ \exists\ B\in S_0$ and $|B|\ne 0$ ,s.t. $\sigma(B)\equiv 0\ (mod\ p)$.
<p align="right">$\Box$</p>
注意到这种方法给出了 比使用鸽巢原理更多的信息.

#### For_Problem-1
<p>$A=\{(a_i,b_i)\ |\ a_i,b_i\in\mathbb{Z}_{>0}\ ,i=1,2,\dots,2p-1\}$</p>
<p>\begin{align}f(X_1,X_2):=\prod_{i=1}^{2p-1}(1-X_1^{a_i}X_2^{b_i})\in \mathbb{F}_p[X_1,X_2]/(X_1^p-1,X_2^p-1)\end{align}</p>
记为向量形式: $X=(X_1,X_2),\ \alpha_i=(a_i,b_i),\ X^{\alpha_i}=X_1^{a_i}X_2^{b_i}$
<p>$S_{\alpha}:=\{B\subset A\ |\ \sigma(B)\equiv \alpha\ (mod\ p)\},\ k=0,1,\dots,p-1$</p>
<p>\begin{align}f(X_1,X_2)=\prod_{i=1}^{2p-1}(1-X^{\alpha_i})=\sum_{B\subset A}(-1)^{|B|}x^{\sigma(B)}\end{align}</p>
<p>\begin{align}f(X)=\sum_{\alpha\in\{0,1,\dots,p-1\}^2}(\sum_{B\in S_{\alpha}}(-1)^{|B|})X^{\alpha}\end{align}</p>
$Lemma:$
<p>\begin{align}(1-X_1^{a_i}X_2^{b_i})=(1-X_1)\cdot u_i(X_1,X_2)+(1-X_2)\cdot v_i(X_1,X_2)\end{align}</p>
It's a simple task.
<p>$A=\{f(X_1,X_2)\ |\ f(1,1)=0\},\ B=(X_1-1,X_2-1)$</p>
$\mathbb{F} _p[X_1,X_2]/A\ =\ \mathbb{F} _p[X_1,X_2]/B$ $\Rightarrow A=B$

<p>\begin{align}f(X_1,X_2)=\prod_{i=1}^{2p-1}((1-X_1)\cdot u_i(X_1,X_2)+(1-X_2)\cdot v_i(X_1,X_2))=\sum(1-X_1)^s(1-X_2)^t(\cdots)\end{align}</p>
$s+t=2p-1\ \Rightarrow\ s\ge p\ or t\ge p$<br>
$(1-X_1)^p=0$ and $(1-X_2)^p=0\ \Rightarrow\ f(X_1,X_2)=0\ \Rightarrow$<br>
<p>\begin{align}\forall\  \alpha\in\{0,1,\dots,p-1\}^2,\ \sum_{B\in S_{\alpha}}(-1)^{|B|}\equiv 0\ (mod\ p)\end{align}</p>
$\emptyset\in S_{(0,0)}\ \Rightarrow\ \exists\ |B|\ne 0$ ,s.t. $\sigma(B)\equiv 0\ (mod\ p)$
<p align="right">$\Box$</p>

### Solution_2-Chevalley_Warning_Theorem

#### Theorem's_Proof

#### For_Con.1

#### For_Con.2

#### For_Problem-1

### Kemnitz’_Conjecture's_Proof

#### Corollary_1

#### Corollary_2

#### Corollary_3

#### Corollary_4

#### Conclusion

### Reference
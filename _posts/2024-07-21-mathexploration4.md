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
<p>Given $n$ integers $\{a_1,a_2,\dots,a_n\}$ , $\exists\ I\subseteq \{1,2,\dots,n\}$ and $|I|\ne 0,\ s.t.\ n|\sum_{i\in I}{a_i}$</p>
(可考虑部分和，以及利用鸽巢原理)<br>
(其中 $n$ 为最佳,可取 $n-1$ 个 $1$.)

#### Conclusion_2
$Erdo ̋s,Ginzburg\ and\ Ziv\ Theorem$ (1961)<br>
<p>Given $2n-1$ integers $\{a_1,a_2,\dots,a_n\}$,$\exists\ I\subseteq \{1,2,\dots,2n-1\}$ and $|I|=n,\ s.t.\ n|\sum_{i\in I}{a_i}$</p>
(可使用反证法，取p-1次方，导出矛盾)<br>
(其中 $2n-1$ 为最佳,可取 $n-1$ 个 $0,1$.)<br>

#### General_Problem
$G$ 为有限交换群, $A$ 是由 $G$ 中元素构成的可重集。<br>
(1) $|A|$ 多大时， $\exists\ B \subseteq A$ and $|B|\ne 0,\ s.t.\ \sigma(B)=0$.(称为$Davenport$常数,记作 $D(G)$ )<br>
(2) $ k\in \mathbb{Z}_{>0}$ and $exp(G)|k$ , $|A|$ 多大时， $\exists B \subseteq A$ and $|B|=k,\ s.t.\ \sigma(B)=0$.(记作 $S(G)$ )(称 $B$ 为 $k$ 元 $Zero-sum-subset$ )

$exp(G):=\underset{x\in G}{max}\ ord(x)$<br>
$G=C_{n_1}\oplus C_{n_2}\oplus\cdots\oplus C_{n_l},\ n_1|n_2|\cdots|n_l,\ exp(G)=n_l$

$\sigma(B):=\sum_{x\in B}x$, 约定 $\sigma(\emptyset)=0$ <br><br>
(Con.1中, $G=\mathbb{Z} /n\mathbb{Z}=C_n$)<br>
(Con.2中, $G=C_n,k=n=exp(C_n)$ )

#### Concerning_Problem
考虑 $G$ 秩为 $2$ 且 $n=p$ 的情形,即<br>
<p>$A=\{(a_1,b_1),(a_2,b_2),\dots,(a_m,b_m)\}\subset\mathbb{Z}^2$</p>
(1) 当 $m$ 多大时, $\exists B \subseteq A$ and $|B|\ne 0,\ s.t.\ \sigma(B)\equiv (0,0)\ (mod\ p)$<br>
(2) 当 $m$ 多大时, $\exists B \subseteq A$ and $|B|=p,\ s.t.\ \sigma(B)\equiv (0,0)\ (mod\ p)$<br><br>
$Ans_1\ =\ 2p-1$ ($2p-2$ 反例: $p-1$ 个 $(0,1),(1,0)$ )<br>
$Ans_2\ =\ 4p-3$ ($4p-4$ 反例: $p-1$ 个 $(0,0),(0,1),(1,0),(1,1)$ )<br>
(注意到解决Con.1的鸽巢原理无法应用于此处)<br>
(Problem_2 又被称为 $Kemnitz’\ Conjecture$ )<br>

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
特别的，$k=0$ 时，$\emptyset \in S_k$ 而 $\sum_{B\in S_k}(-1)^{|B|}\equiv 0\ (mod\ p)$<br>
$\Rightarrow\ \exists\ B\in S_0$ and $|B|\ne 0,\ s.t.\ \sigma(B)\equiv 0\ (mod\ p)$.
<p align="right">$\Box$</p>
注意到这种方法给出了 比使用鸽巢原理更多的信息.

#### For_Problem-1
<p>$A=\{(a_i,b_i)\ |\ a_i,b_i\in\mathbb{Z}_{>0}\ ,i=1,2,\dots,2p-1\}$</p>
<p>\begin{align}f(X_1,X_2):=\prod_{i=1}^{2p-1}(1-X_1^{a_i}X_2^{b_i})\in \mathbb{F}_p[X_1,X_2]/(X_1^p-1,X_2^p-1)\end{align}</p>
记为向量形式: $X=(X_1,X_2),\ \alpha_i=(a_i,b_i),\ X^{\alpha_i}=X_1^{a_i}X_2^{b_i}$
<p>$S_{\alpha}:=\{B\subset A\ |\ \sigma(B)\equiv \alpha\ (mod\ p)\},\ \alpha=\{0,1,\dots,p-1\}^2$</p>
<p>\begin{align}f(X_1,X_2)=\prod_{i=1}^{2p-1}(1-X^{\alpha_i})=\sum_{B\subset A}(-1)^{|B|}x^{\sigma(B)}\end{align}</p>
<p>\begin{align}f(X)=\sum_{\alpha\in\{0,1,\dots,p-1\}^2}(\sum_{B\in S_{\alpha}}(-1)^{|B|})X^{\alpha}\end{align}</p>
$Lemma:$
<p>\begin{align}(1-X_1^{a_i}X_2^{b_i})=(1-X_1)\cdot u_i(X_1,X_2)+(1-X_2)\cdot v_i(X_1,X_2)\end{align}</p>
It's a simple task.
<p>$A=\{f(X_1,X_2)\ |\ f(1,1)=0\},\ B=(X_1-1,X_2-1)$</p>
$\mathbb{F} _p[X_1,X_2]/A\ =\ \mathbb{F} _p[X_1,X_2]/B$ $\Rightarrow A=B$

<p>\begin{align}f(X_1,X_2)=\prod_{i=1}^{2p-1}((1-X_1)\cdot u_i(X_1,X_2)+(1-X_2)\cdot v_i(X_1,X_2))=\sum(1-X_1)^s(1-X_2)^t(\cdots)\end{align}</p>
$s+t=2p-1\ \Rightarrow\ s\ge p\ or\ t\ge p$<br>
$(1-X_1)^p=0$ and $(1-X_2)^p=0\ \Rightarrow\ f(X_1,X_2)=0\ \Rightarrow$<br>
<p>\begin{align}\forall\  \alpha\in\{0,1,\dots,p-1\}^2,\ \sum_{B\in S_{\alpha}}(-1)^{|B|}\equiv 0\ (mod\ p)\end{align}</p>
$\emptyset\in S_{(0,0)}\ \Rightarrow\ \exists\ |B|\ne 0,\ s.t.\ \sigma(B)\equiv 0\ (mod\ p)$
<p align="right">$\Box$</p>

### Solution_2-Chevalley_Warning_Theorem
$F_1,F_2,\dots,F_m\in\mathbb{F}_p[x_1,x_2,\dots,x_n]$<br>
<p>$\mathcal{Z}(F_1,F_2,\dots,F_m)=\{x\in(\mathbb{F}_p)^n\ |\ F_1(x)=F_2(x)=\cdots=F_m(x)=0\}$</p>
<p>$\#\mathcal{Z}(F_1,F_2,\dots,F_m)\equiv0\ (mod\ p)\ \ \ if\ \ \ \sum_{i=1}^{n}deg(F_i)< n$</p>

#### Theorem's_Proof
$x=(x_1,x_2,\dots,x_n)\in \mathbb{F}_p^n $
<p>According to Fermat's Little Theorem,</p>
$x\in \mathcal{Z}(F_1,F_2,\dots,F_m)\ \Leftrightarrow\ \prod_{j=1}^{m}(1-F_j(x)^{p-1})=1\in\mathbb{F}_p$
<p>\begin{align}\#\mathcal{Z}(F_1,F_2,\dots,F_m)\equiv \sum_{x\in\mathbb{F}_p}\prod_{j=1}^{m}(1-F_j(x)^{p-1})\ (mod\ p)\end{align}</p>
约定 $x^0|_{x=0}=1.$<br>
$Lemma:$<br>
$\forall a\ge 0$
<p>\begin{eqnarray}
\sum_{x\in \mathbb{F}_p}x^a = \left\{
\begin{aligned}
&p-1 &p-1|a\ne 0\\
&0 &others
\end{aligned}
\right.
\end{eqnarray}</p>
$deg\prod_{j=1}^{m}(1-F_j(x)^{p-1})\le (p-1)\sum degF_j<(p-1)n$
<p>\begin{align}\#\mathcal{Z}=\sum_{\{a_k\}}\ \sum_{(x_1,x_2,\dots,x_n)\in \mathbb{F}_p ^n}x_1^{a_1}x_2^{a_2}\cdots x_n^{a_n}=\sum_{\{a_k\}}(\sum_{x_1\in \mathbb{F}_p}x_1^{a_1})(\cdots)(\cdots)\cdots(\cdots)\end{align}</p>
又 $a_1+a_2+\cdots+a_n<(p-1)n\ \Rightarrow\ \exists \ a_j\le p-2.$<br>
<p>故 $\#\mathcal{Z}(F_1,F_2,\dots,F_m)\equiv0\ (mod\ p)$</p>
<p align="right">$\Box$</p>

#### For_Con.1
<p>$A=\{a_1,a_2,\dots,a_p\},a_1,a_2,\dots,a_p>0$</p>
<p>\begin{align}F(x)=a_1x_1^{p-1}+a_2x_2^{p-1}+\cdots a_px_p^{p-1}\in \mathbb{F}_p[x]\end{align}</p>
$degF\le p-1< p$<br><br>
<p>$x=(x_1,x_2,\dots,x_n)\in \mathbb{F} _p^n$</p>
<p>$x\in \mathcal{Z}(F),\ x_{i_1},x_{i_2},\dots,x_{i_k}\ne 0,\ other\ x_i=0\ \Leftrightarrow\ a_{i_1}+a_{i_2}+\cdots+a_{i_k}\equiv 0\ (mod\ p)$</p><br>
<p>$N_k:=\#\{B\subset A\ |\ |B|=k,\sigma(B)\equiv 0\ (mod\ p)\}\ 0\le k\le p$,即 $k$ 元 $Zero-sum-subset$</p>
<p>\begin{align}\#\mathcal{Z}(F)=\sum_{k=0}^pN_k(p-1)^k\overset{C-W}{\equiv}0\ (mod\ p)\end{align}</p>
<p>\begin{align}\#\mathcal{Z}(F)\equiv\sum_{k=0}^p(-1)^kN_k\equiv 0\ (mod\ p)\end{align}</p>
$ N_0=1\ (\emptyset)\ \Rightarrow\ \exists\ 0< k\le p,N_k\ne 0 $
<p align="right">$\Box$</p>

#### For_Con.2
$Erdo ̋s,Ginzburg\ and\ Ziv\ Theorem$<br>
$a_1,a_2,\dots,a_{2p-1}\in \mathbb{F}_p $
<p>\begin{align}F_1=x_1^{p-1}+x_2^{p-1}+\cdots x_{2p-1}^{p-1}\end{align}</p>
<p>\begin{align}F_2=a_1x_1^{p-1}+a_2x_2^{p-1}+\cdots a_{2p-1}x_{2p-1}^{p-1}\end{align}</p>
$degF_1+degF_2\le 2p-2< 2p-1$
<p>\begin{align}\#\mathcal{Z}(F_1,F_2)=N_0+(p-1)^pN_p\equiv 0\ (mod\ p) \end{align}</p>
$\Rightarrow\ N_p\equiv N_0=1\ (mod\ p)$, obviously $N_p\ne 0$.
<p align="right">$\Box$</p>

#### For_Problem-1
$(a_i,b_i)\subset \mathbb{Z}^2\ ,i=1,2,\dots,2p-1$
<p>\begin{align}F_1=a_1x_1^{p-1}+a_2x_2^{p-1}+\cdots a_{2p-1}x_{2p-1}^{p-1}\end{align}</p>
<p>\begin{align}F_2=b_1x_1^{p-1}+b_2x_2^{p-1}+\cdots b_{2p-1}x_{2p-1}^{p-1}\end{align}</p>
<p>$degF_1+degF_2\le 2p-2< 2p-1\ \Rightarrow\ \#\mathcal{Z}(F_1,F_2)\equiv 0\ (mod\ p)$</p>
<p>$x=(0,0,\dots,0)\in \mathcal{Z}(F_1,F_2)\ \Rightarrow\ \exists\ x\ne(0,0,\dots,0)\in \mathcal{Z}(F_1,F_2)$</p>
<p align="right">$\Box$</p>
类似的，可以证明 $D((C_p)^r)=r(p-1)+1$.

### Kemnitz’_Conjecture's_Proof
$C.\ Reiher\ \ 2007,(German),1999-2003\ IMO\ 4G1B$<br>
<p>
\begin{cases}
    F_1=x_1^{p-1}+x_2^{p-1}+\cdots x_{m}^{p-1}\\
    F_2=a_1x_1^{p-1}+a_2x_2^{p-1}+\cdots a_{m}x_{m}^{p-1}\\
    F_3=b_1x_1^{p-1}+b_2x_2^{p-1}+\cdots b_{m}x_{m}^{p-1}
\end{cases}
</p>
<p>$A=\{(a_i,b_i)\ |\ i=1,2,\dots,m\}$</p>
<p>$N_k(A):=\{B\subset A\ |\ |B|=k,\sigma(B)\equiv(0,0)\ (mod\ p)\}$</p>
使用 $C-W\ Theorem$ 前提: $m>3(p-1)$ 即 $m\ge 3p-2$

后续技巧具体可见[Reference](#Reference)

### Reference
[On Kemnitz’ conjecture concerning lattice-points in the plane](https://yhx1415926.github.io/quote_img/mathexploration-4/On_Kemnitz’_conjecture_concerning_lattice-points_in_the_plane.pdf)

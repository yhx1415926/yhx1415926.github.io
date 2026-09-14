---
title: "计算机系统概论(H)"
updated: 2026-09-14
published: 2026-09-07
category: College
tags: [Computer Science]
pin: false
math: true
licenseName: "CC BY 4.0"
author: yao1415926
description: "Introduction to Computing Science"
hidden: false
slug: ics
---

### Intro
Instructor: Hong An(安虹)<br>
Email: [han@ustc.edu.cn](mailto:han@ustc.edu.cn)<br>
Midterm: 2026-11-09<br>
Final: 2027-01-11<br>

Problems Sets: \~8<br>
Labs: 6\~7<br>
**Honor Class Required: A Calculator Design or LC-3 Simulator/Assembler Design**

Links: [https://acsa.ustc.edu.cn/ics/](https://acsa.ustc.edu.cn/ics/)

Grade = Middle(15%)+Final(25%)+Assignments(50%)+EPA(10%)

### Four Great Ideas
1. Computer is an Universal Computing Device(Turing Machine Model)<br>
2. Stored program computer(Von Neumann Model)<br>
3. Abstraction Helps Us Manage Complexity(Layers of Representation/Interpretation)<br>
4. Software and Hardware Co-design

### Represente Numbers
#### Unsigned Integers
Unsigned Binary Arithmetic

#### Signed Integers
Signed Magnitude(原码)<br>
10101B=-5D

1's Complement(反码)<br>
原码数据位取反<br>
11010B=-5D<br>
11111B=-0<br>
11010B(-5)+00101B(5)=11111B(-0)

2's Complement(补码)<br>
反码+1, 解决了0出现两种表示的问题, 同时便于加法运算<br>
11011B=-5D<br>
00101B(5)+11011B(-5)=0

To take the two's complement of a number:<br>
1. copy bits from right to left until (and including) the first '1'<br>
2. fip remaining bits to the left

Methods of converting Decimal to Binary(2's C)<br>
1. Division $(104/2=52r0)$ <br>
2. Subtract Powers of Two $(104-64=40,40-32=8)$

#### Sign Extension
0100(4) --> 00000100(4)<br>
1100(-4) --> 11111100(-4)

#### Floating Point
Use equivalence of "scientific notation": $F \times 2^{E}$<br>
Need to represent F(fraction), E(exponent), and Sign

IEEE 754 Floating-Point Standard (32-bit):<br>
**S**ign: 1 bit<br>
**E**xponent: 8 bits<br>
**F**raction: 23 bits<br>
$N = (-1)^{S}\cdot (1+F) \cdot 2^{E-127}$, $E\in \{1,2,\dots,254\}$<br>
$N = (-1)^{S}\cdot (F) \cdot 2^{-126}$, $E = 0$
$$
-6\frac{5}{8}=-(6+\frac{4}{8}+\frac{1}{8})=-110.101=-1.10101\times 2^2=-1.10101\times 2^{129-127} \\
$$
$$
\Rightarrow -6\frac{5}{8}=1\ 10000001\ 101\ 0100\ 0000\ 0000\ 0000\ 0000
$$
#### Further Reading
[Defining Floating Point Precision](https://blog.yhx1415926.top/src/content/posts/reference/Defining_Floating_Point_Precision.pdf)

### Represent Text
ASCII Characters

### LC3
Data type: 16 bit 2's complement signed integer
operations: ADD, AND, NOT

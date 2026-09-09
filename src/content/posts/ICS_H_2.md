---
title: "计算机系统概论(H)"
published: 2026-09-07
category: College
tags: [Computer Science]
pin: false
math: false
licenseName: "CC BY 4.0"
author: yao1415926
description: "Week 2"
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
#1: Computer is an Universal Computing Device(Turing Machine Model)<br>
#2: Stored program computer(Von Neumann Model)<br>
#3: Abstraction Helps Us Manage Complexity(Layers of Representation/Interpretation)<br>
#4: Software and Hardware Co-design

### Represente Numbers
#### Unsigned Integers
Unsigned Binary Arithmetic

#### Signed Integers
Signed Magnitude(原码)<br>
10101B=5D

1's Complement(反码)<br>
原码数据位取反<br>
11010B=5D<br>
11111B=-0<br>
11010B(-5)+00101B(5)=11111B(-0)

2's Complement(补码)<br>
反码+1, 解决了0出现两种表示的问题, 同时便于加法运算<br>
11011B=5D<br>
10101B(-5)+01011B(5)=0

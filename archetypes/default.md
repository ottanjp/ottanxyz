---
author: ottan
date: {{ .Date }}
draft: true
title: "{{ replace .Name "-" " " | title }}"
type: post
slug: {{ replace .Name "-" " " | urlize }}-{{ dateFormat "20060101" .Date }}
categories:
tags:
toc: true
---


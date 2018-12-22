---
author: ottan
date: {{ .Date }}
draft: true
title: "{{ replace .Name "-" " " | title }}"
type: post
url: /{{ replace .Name "-" " " }}-{{ dateFormat "20060101" .Date }}/
categories:
tags:
toc: true
---


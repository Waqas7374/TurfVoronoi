#!/bin/bash

for i in *png *jpg ; do echo "$i"; convert "$i" -resize 60x60 "2/$i"; done
#cat file | while read a; do echo $a; done
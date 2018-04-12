#! /usr/bin/bash
HEAD=`git rev-parse HEAD`
HEAD1=`git rev-parse HEAD~1`
git diff $HEAD $HEAD1 --name-status
.DEFAULT_GOAL := test

%:
    @:
args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}` # usage: call(args, defaultstring)
.PHONY = run test

test:
	node test.js

run:
	node index.js $(call args,"")
.PHONY: prepare

prepare:
	sudo apt-get update; \
	sudo apt-get upgrade -y; \
	sudo npm update -g ;\
	sudo n stable ;\
	sudo npm install -g clasp



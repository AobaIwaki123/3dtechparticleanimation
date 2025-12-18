.PHONY: help build push build-push dev install clean restart-deployment

# Docker image settings
IMAGE_NAME = iwakiaoba/3d-particle
TAG = latest
PLATFORMS = linux/amd64,linux/arm64

help:
	@echo "Available commands:"
	@echo "  make install          - Install dependencies with pnpm"
	@echo "  make dev              - Start development server"
	@echo "  make build            - Build multi-platform Docker image"
	@echo "  make push             - Push Docker image to registry"
	@echo "  make build-push       - Build and push Docker image"
	@echo "  make restart-deployment - Restart Kubernetes deployment"
	@echo "  make clean            - Clean build artifacts"

install:
	pnpm install

dev:
	pnpm dev

build:
	@echo "Building multi-platform Docker image for $(PLATFORMS)..."
	docker buildx build --platform $(PLATFORMS) -t $(IMAGE_NAME):$(TAG) --load .

push:
	@echo "Pushing Docker image $(IMAGE_NAME):$(TAG)..."
	docker push $(IMAGE_NAME):$(TAG)

build-push:
	@echo "Building and pushing multi-platform Docker image for $(PLATFORMS)..."
	docker buildx build --platform $(PLATFORMS) -t $(IMAGE_NAME):$(TAG) --push .

restart-deployment:
	@echo "Restarting Kubernetes deployment..."
	kubectl rollout restart deployment/portfolio -n portfolio
	kubectl rollout status deployment/portfolio -n portfolio

clean:
	rm -rf build/
	rm -rf node_modules/

# ビルドステージ
FROM node:20-alpine AS builder

WORKDIR /app

# pnpmをインストール
RUN npm install -g pnpm

# package.jsonとpnpm-lock.yamlをコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY . .

# ビルドを実行
RUN pnpm build

# 本番ステージ - Nginx
FROM nginx:alpine

# ビルドされたファイルをnginxのルートディレクトリにコピー
COPY --from=builder /app/build /usr/share/nginx/html

# カスタムnginx設定をコピー（SPA用）
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

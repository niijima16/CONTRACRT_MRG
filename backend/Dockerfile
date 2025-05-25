FROM python:3.12-slim-bookworm

# WeasyPrint に必要な依存パッケージ
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libffi-dev \
    libssl-dev \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libcairo2 \
    libgdk-pixbuf2.0-0 \
    libxml2 \
    libxslt1.1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリ
WORKDIR /app

# 依存パッケージインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# プロジェクトファイル
COPY . .

# ポート開放
EXPOSE 8000

CMD ["gunicorn", "contract_mrg.wsgi:application", "--bind", "0.0.0.0:8000"]
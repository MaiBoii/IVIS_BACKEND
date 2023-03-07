# IVIS_BACKEND
[![ko](https://img.shields.io/badge/lang-ko-red.svg)](https://github.com/picel/IVIS_BACKEND/blob/master/README.md)
[![ja](https://img.shields.io/badge/lang-ja-blue.svg)](https://github.com/picel/IVIS_BACKEND/blob/master/README.jp.md)

## 概要
- IVIS 新入研究員募集ページのバックエンドサーバー

## 使用技術
- Node.js
    - `express` : Webフレームワーク
    - `express-session` : セッション管理
    - `passport` : ログイン認証
    - `sequelize` : DB管理
- PostgreSQL

## サーバー情報
Oracle Cloud Free Tier
> OS : Ubuntu 20.04<br>
> Architecture : ARM64

## DB情報
- `users`
    - `sid` : 学籍番号
    - `pw` : パスワード
    - `name` : 名前
    - `phone` : 電話番号
    - `approved` : 承認状況
- `apps`
    - `sid` : 学籍番号
    - `intro` : 自己紹介
    - `language` : 使用可能な言語
    - `project` : プロジェクト経験
    - `etc` : その他
- `interview`
    - `sid` : 予約者の学籍番号 (NULLの場合は予約されていない)
    - `time` : 時間
    - `day` : 曜日
    - `reserved` : 予約状況

## ルート情報
- `/api/user`
    - `POST /register` : 登録
    - `POST /sidcheck` : 会員確認
    - `POST /pwcheck` : パスワード確認 / ログイン
    - `GET /logincheck` : トークンの有効性確認
    - `GET /logout` : ログアウト
- `/api/application`
    - `POST /` : 応募書作成
- `/api/interview`
    - `GET /` : 予約可能な時間を取得 / 予約された時間を取得(予約者)
    - `POST /` : 時間を予約
- `/api/admin`
    - `GET /users` : 会員一覧を取得
    - `GET /applications/:sid` : 応募書一覧を取得(sidで取得)
#### /api/adminの場合 [IVIS NAS](https://github.com/picel/IVIS_NAS)の会員情報認証を通してアクセス可能
#### 管理者ページの場合 [IVIS ADMIN](https://github.com/picel/IVIS_ADMIN)を参照

## 実行方法
1. `git clone https://github.com/picel/IVIS_BACKEND.git`
2. `cd IVIS_BACKEND`
3. `npm install`
4. `npm start`

### Nginx Reverse proxyを使用することを推奨
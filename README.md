# mahjong-log-app

このアプリは麻雀の成績を管理できるアプリです。

## 起動方法

1. 本プロジェクトを`git clone`します。
   ```
   $ git clone https://github.com/s1a2k1a3i/mahjong-log-app.git
   ```
2. 本プロジェクトに必要なパッケージをインストールします。
   ```
   $ yarn
   ```
3. DB の設定を行います。
   1. 使用する DB を追加します。
   ```
   $ psql -U <ユーザ名>
   パスワード
   > create database <DB名>
   ```
   2. `.env`ファイルに DB の設定を追加します。
   ```
   DB_NAME=<DB名>
   DB_USER=<ユーザー名>
   DB_PASSWORD=<パスワード>
   DB_HOST=localhost
   DB_PORT=5432
   ```
   3. 以下のコマンドで DB のマイグレーションを実行します。
   ```
   $ yarn migrate
   ```
4. 以下のコマンドで実行し、[http://localhost:3000](http://localhost:3000)で起動します。
   ```
   $ yarn start or yarn dev
   ```

## API 一覧

このアプリでは以下のエンドポイントを受け付けます。
|エンドポイント|HTTP メソッド|説明|
|-|-|-|
|`/api/users`|GET| ユーザーの一覧を返します。<br> クエリパラメータで`limit=n`を指定すると`n`件のみ取得できます。|
|`/api/users/:id`|GET| 指定した ID のユーザー情報を返します。|
|`/api/users`|POST|ユーザーを追加します。|
|`/api/users/:id`|PATCH|指定した ID のユーザーの情報を変更します。|
|`/api/users`|DELETE |全ユーザーを削除します。|
|`/api/users/:id`|DELETE |指定した ID のユーザーを削除します。|
|`/api/match-logs`|GET| 全ユーザーの戦績一覧を返します。<br> クエリパラメータで`limit=n`を指定すると`n`件のみ取得できます。|
|`/api/users/:id/match-logs`|GET|指定した ID のユーザーの戦績一覧を返します。<br> クエリパラメータで`limit=n`を指定すると`n`件のみ取得できます。|
|`/api/users/:id/match-logs/:id`|GET| 指定した ID ユーザーで、指定した ID のの戦績を返します。|
|`/api/users/:id/match-logs`|POST| 指定した ID のユーザーの戦績を追加します。|
|`/api/users/:id/match-logs/:id`|PATCH| 指定した ID ユーザーで、指定した ID のの戦績を変更します。|
|`/api/users/:id/match-logs/:id`|DELETE| 指定した ID ユーザーの戦績データをすべて削除します。|
|`/api/users/:id/match-logs/:id`|DELETE| 指定した ID ユーザーで、指定した ID のの戦績を削除します。|

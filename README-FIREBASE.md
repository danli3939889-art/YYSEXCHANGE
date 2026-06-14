# Firebase 啟用步驟

1. 到 https://console.firebase.google.com 建立 Firebase 專案。
2. 新增 Web App，將取得的 `firebaseConfig` 填入 `firebase-config.js`。
3. 在 Firebase Authentication 啟用「匿名」登入。
4. 建立 Cloud Firestore 資料庫。
5. 使用 Firebase CLI 部署：

```powershell
firebase login
firebase use --add
firebase deploy
```

尚未填寫設定時，網站會維持本機模式，資料只保存在目前瀏覽器。

啟用 Firebase 後：

- `exchangeRecords` 集合保存 30 個交換席位。
- `activeExchanges` 集合保存多組同時進行中的交換。
- 所有開啟網站的裝置會即時收到資料變更。

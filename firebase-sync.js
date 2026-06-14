(function () {
  const status = document.querySelector("#firebaseStatus");
  const config = window.firebaseConfig || {};
  const configured = Boolean(
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.appId
  );

  function setStatus(label, state) {
    if (!status) return;
    status.textContent = label;
    status.dataset.state = state;
  }

  if (!configured) {
    setStatus("本機模式", "local");
    return;
  }

  if (!window.firebase || !window.fragmentExchangeApp) {
    setStatus("Firebase 載入失敗", "error");
    return;
  }

  setStatus("雲端連線中", "connecting");

  const app = firebase.initializeApp(config);
  const auth = app.auth();
  const db = app.firestore();
  const recordsRef = db.collection("exchangeRecords");
  const exchangesRef = db.collection("activeExchanges");
  let applyingRemote = false;

  function cleanRecord(record) {
    return {
      id: Number(record.id),
      name: String(record.name || "").slice(0, 12),
      need: String(record.need || ""),
      needQty: Number(record.needQty),
      offer: String(record.offer || ""),
      offerQty: Number(record.offerQty)
    };
  }

  async function saveRecord(record) {
    if (!auth.currentUser || applyingRemote) return;
    const cleaned = cleanRecord(record);
    await recordsRef.doc(`slot-${String(cleaned.id).padStart(2, "0")}`).set({
      ...cleaned,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: auth.currentUser.uid
    });
  }

  async function saveExchanges(exchanges) {
    if (!auth.currentUser || applyingRemote) return;
    const snapshot = await exchangesRef.get();
    const nextIds = new Set(exchanges.map(exchange => exchange.id));
    const batch = db.batch();

    snapshot.docs.forEach(document => {
      if (!nextIds.has(document.id)) batch.delete(document.ref);
    });
    exchanges.forEach(exchange => {
      batch.set(exchangesRef.doc(exchange.id), {
        id: exchange.id,
        startedAt: exchange.startedAt,
        members: exchange.members.map(cleanRecord),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: auth.currentUser.uid
      });
    });
    await batch.commit();
  }

  window.addEventListener("fragment-record-saved", event => {
    saveRecord(event.detail).catch(error => {
      console.error("Firebase record save failed:", error);
      setStatus("同步失敗", "error");
    });
  });

  window.addEventListener("fragment-exchanges-changed", event => {
    saveExchanges(event.detail || []).catch(error => {
      console.error("Firebase exchanges save failed:", error);
      setStatus("同步失敗", "error");
    });
  });

  auth.signInAnonymously()
    .then(async () => {
      const firstSnapshot = await recordsRef.limit(1).get();
      if (firstSnapshot.empty) {
        await Promise.all(window.fragmentExchangeApp.getRecords().map(saveRecord));
      }

      recordsRef.orderBy("id").onSnapshot(snapshot => {
        applyingRemote = true;
        window.fragmentExchangeApp.applyRemoteRecords(
          snapshot.docs.map(document => cleanRecord(document.data()))
        );
        applyingRemote = false;
        setStatus("Firebase 已連線", "online");
      }, error => {
        console.error("Firebase records listener failed:", error);
        setStatus("同步失敗", "error");
      });

      exchangesRef.onSnapshot(snapshot => {
        applyingRemote = true;
        window.fragmentExchangeApp.applyRemoteExchanges(
          snapshot.docs.map(document => {
            const data = document.data();
            return {
              id: data.id,
              startedAt: data.startedAt,
              members: (data.members || []).map(cleanRecord)
            };
          }).sort((a, b) => a.startedAt - b.startedAt)
        );
        applyingRemote = false;
      }, error => {
        console.error("Firebase exchanges listener failed:", error);
        setStatus("同步失敗", "error");
      });
    })
    .catch(error => {
      console.error("Firebase anonymous sign-in failed:", error);
      setStatus("登入失敗", "error");
    });
})();

const fragmentCatalog = {
  UR: [
    "妖刀姬·绯夜猎刃"
  ],
  SP: [
    "少羽大天狗", "炼狱茨木童子", "稻荷神御馔津", "苍风一目连", "赤影妖刀姬",
    "御怨般若", "骁浪荒川之主", "烬天玉藻前", "鬼王酒吞童子", "天剑韧心鬼切",
    "聆海金鱼姬", "浮世青行灯", "缚骨清姬", "待宵姑获鸟", "麓铭大岳丸",
    "初翎山风", "夜溟彼岸花", "蝉冰雪女", "空相面灵气", "绘世花鸟卷",
    "因幡辉夜姬", "梦寻山兔", "神堕八岐大蛇", "大夜摩天阎魔", "新狩鬼女红叶",
    "神启荒", "禅心云外镜", "流光追月神", "修罗鬼童丸", "寻森小鹿男",
    "纺愿缘结神", "渺念萤草", "本真三尾狐", "鲸汐千姬", "福悦座敷童子",
    "晨晖惠比寿", "龙吟铃鹿御前", "遥念烟烟罗", "心友犬神", "神酿星熊童子",
    "瑶音紧那罗", "晴思日和坊", "时曜泷夜叉姬", "云间不见岳", "妙主九命猫",
    "梦引蝴蝶结", "梦山白藏主", "灼华桃花妖", "蚀月吸血姬", "天火命铃彦姬"
  ],
  SSR: [
    "大天狗", "酒吞童子", "荒川之主", "阎魔", "小鹿男", "茨木童子", "青行灯",
    "妖刀姬", "一目连", "花鸟卷", "辉夜姬", "荒", "彼岸花", "雪童子", "山风",
    "玉藻前", "御馔津", "面灵气", "鬼切", "白藏主", "八岐大蛇", "不知火",
    "大岳丸", "泷夜叉姬", "云外镜", "鬼童丸", "缘结神", "铃鹿御前", "紧那罗",
    "千姬", "帝释天", "阿修罗", "食灵", "饭笥", "铃彦姬", "不见岳", "须佐之男",
    "寻香行", "季", "月读", "言灵", "孔雀明王", "天照", "伊邪那美", "泷",
    "猫川", "祸津神", "龙珏", "封阳君", "鬼金羊", "歌留多", "卑弥呼",
    "荒骷髅", "雪御前", "平将门", "神无月", "葛叶", "市加美", "思金神"
  ],
  "联动": [
    "奴良陆生", "卖药郎", "鬼灯", "阿香", "蜜桃&芥子", "犬夜叉", "杀生丸",
    "桔梗", "乔木露琪亚", "黑崎一护", "夜刀神", "坂本银时", "神乐&定春"
  ]
};

const rarityColors = {
  UR: "#b06a27",
  SP: "#8c3f5f",
  SSR: "#4f668a",
  "联动": "#4d786c"
};

const shikigami = Object.fromEntries(
  Object.entries(fragmentCatalog).flatMap(([rarity, names]) =>
    names.map(name => [
      name,
      {
        rarity,
        mark: name.replace(/[·&]/g, "").slice(0, 1),
        color: rarityColors[rarity]
      }
    ])
  )
);

const exchangeSamples = [
  ["妖刀姬·绯夜猎刃", "少羽大天狗"],
  ["炼狱茨木童子", "大天狗"],
  ["稻荷神御馔津", "酒吞童子"],
  ["苍风一目连", "荒川之主"],
  ["赤影妖刀姬", "阎魔"],
  ["御怨般若", "小鹿男"],
  ["骁浪荒川之主", "茨木童子"],
  ["烬天玉藻前", "青行灯"],
  ["鬼王酒吞童子", "妖刀姬"],
  ["天剑韧心鬼切", "一目连"],
  ["聆海金鱼姬", "花鸟卷"],
  ["浮世青行灯", "辉夜姬"],
  ["缚骨清姬", "荒"],
  ["待宵姑获鸟", "彼岸花"],
  ["麓铭大岳丸", "雪童子"],
  ["初翎山风", "山风"],
  ["夜溟彼岸花", "玉藻前"],
  ["蝉冰雪女", "御馔津"],
  ["空相面灵气", "面灵气"],
  ["绘世花鸟卷", "鬼切"],
  ["因幡辉夜姬", "白藏主"],
  ["梦寻山兔", "八岐大蛇"],
  ["神堕八岐大蛇", "不知火"],
  ["大夜摩天阎魔", "奴良陆生"],
  ["新狩鬼女红叶", "卖药郎"],
  ["神启荒", "鬼灯"],
  ["禅心云外镜", "犬夜叉"],
  ["流光追月神", "杀生丸"],
  ["修罗鬼童丸", "黑崎一护"],
  ["寻森小鹿男", "坂本银时"]
];

const rawPlayers = exchangeSamples.map(([need, offer], index) => [
  need,
  5 + ((index * 7) % 21),
  offer,
  7 + ((index * 5) % 20),
  2 + index * 8
]);

const avatarColors = ["#665c4f","#8b3d35","#4f6770","#71627b","#3f6659","#8a7047"];
const players = rawPlayers.map((item, index) => ({
  id: index + 1,
  name: `陰陽師席位 ${String(index + 1).padStart(2, "0")}`,
  namePending: true,
  need: item[0],
  needQty: item[1],
  offer: item[2],
  offerQty: item[3],
  minutes: item[4],
  avatar: avatarColors[index % avatarColors.length]
}));

const profileDefaults = {
  name: "",
  need: "妖刀姬·绯夜猎刃",
  needQty: 10,
  offer: "少羽大天狗",
  offerQty: 10
};

const legacyProfile = JSON.parse(localStorage.getItem("fragmentExchangeProfile") || "null");
let exchangeRecords = JSON.parse(localStorage.getItem("fragmentExchangeRecords") || "[]");
if (exchangeRecords.length === 0 && legacyProfile?.name && legacyProfile.name !== "我的交換單") {
  exchangeRecords.push({ ...profileDefaults, ...legacyProfile, id: 1 });
  localStorage.setItem("fragmentExchangeRecords", JSON.stringify(exchangeRecords));
}
let playerNameHistory = JSON.parse(localStorage.getItem("fragmentPlayerNameHistory") || "[]");
exchangeRecords.forEach(record => {
  if (record.name && !playerNameHistory.some(name =>
    name.toLowerCase() === record.name.toLowerCase()
  )) {
    playerNameHistory.push(record.name);
  }
});
playerNameHistory = playerNameHistory.slice(0, 50);
localStorage.setItem("fragmentPlayerNameHistory", JSON.stringify(playerNameHistory));
let profile = exchangeRecords[0] || profileDefaults;
let editingRecordId = null;
const legacyActiveExchange = JSON.parse(localStorage.getItem("fragmentActiveExchange") || "null");
let activeExchanges = JSON.parse(localStorage.getItem("fragmentActiveExchanges") || "[]");
if (activeExchanges.length === 0 && legacyActiveExchange?.members?.length) {
  activeExchanges = [legacyActiveExchange];
  localStorage.setItem("fragmentActiveExchanges", JSON.stringify(activeExchanges));
  localStorage.removeItem("fragmentActiveExchange");
}
let requestSourceId = null;
let matchOnly = false;

const grid = document.querySelector("#playerGrid");
const activeGrid = document.querySelector("#activeExchangeGrid");
const template = document.querySelector("#playerCardTemplate");
const activeExchangeTemplate = document.querySelector("#activeExchangeTemplate");
const searchType = document.querySelector("#searchType");
const searchValue = document.querySelector("#searchValue");
const rarityFilter = document.querySelector("#rarityFilter");
const sortSelect = document.querySelector("#sortSelect");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const activeZoneEmpty = document.querySelector("#activeZoneEmpty");
const activeZoneCount = document.querySelector("#activeZoneCount");
const waitingZoneCount = document.querySelector("#waitingZoneCount");

function renderPlayerNameHistory() {
  const datalist = document.querySelector("#playerNameHistory");
  datalist.replaceChildren();
  playerNameHistory.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    datalist.append(option);
  });
}

function rememberPlayerName(name) {
  playerNameHistory = [
    name,
    ...playerNameHistory.filter(savedName =>
      savedName.toLowerCase() !== name.toLowerCase()
    )
  ].slice(0, 50);
  localStorage.setItem("fragmentPlayerNameHistory", JSON.stringify(playerNameHistory));
  renderPlayerNameHistory();
}

function isMatch(player) {
  if (player.isMine || !profile.name) return false;
  return player.need === profile.offer || player.offer === profile.need;
}

function getDisplayPlayers() {
  const recordMap = new Map(exchangeRecords.map(record => [Number(record.id), record]));
  return players.map(player => {
    const record = recordMap.get(player.id);
    if (!record) return player;
    return {
      ...player,
      ...record,
      namePending: false,
      isMine: true,
      minutes: 0
    };
  });
}

function getAvailablePlayers() {
  const busyIds = new Set(activeExchanges.flatMap(exchange =>
    exchange.members.map(member => String(member.id))
  ));
  return getDisplayPlayers().filter(player => !player.namePending && !busyIds.has(String(player.id)));
}

function updateSearchOptions() {
  const previousValue = searchValue.value;
  searchValue.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = searchType.value === "player"
    ? "選擇已填寫交換單的玩家"
    : "選擇式神名稱";
  searchValue.append(defaultOption);

  if (searchType.value === "player") {
    const completedPlayers = [
      ...getDisplayPlayers().filter(player => !player.namePending),
      ...activeExchanges.flatMap(exchange => exchange.members)
    ].filter((player, index, list) =>
      list.findIndex(candidate => String(candidate.id) === String(player.id)) === index
    );
    if (completedPlayers.length === 0) {
      defaultOption.textContent = "目前尚無已填寫的玩家";
      defaultOption.disabled = true;
    } else {
      const uniqueNames = completedPlayers.filter((player, index, list) =>
        list.findIndex(candidate =>
          candidate.name.toLowerCase() === player.name.toLowerCase()
        ) === index
      );
      uniqueNames.forEach(player => {
        const option = document.createElement("option");
        option.value = player.name;
        const recordCount = completedPlayers.filter(candidate =>
          candidate.name.toLowerCase() === player.name.toLowerCase()
        ).length;
        option.textContent = recordCount > 1
          ? `${player.name}（${recordCount} 張交換單）`
          : player.name;
        searchValue.append(option);
      });
    }
  } else {
    Object.entries(fragmentCatalog).forEach(([rarity, names]) => {
      const group = document.createElement("optgroup");
      group.label = rarity === "联动" ? "聯動" : rarity;
      names.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        group.append(option);
      });
      searchValue.append(group);
    });
  }

  if ([...searchValue.options].some(option => option.value === previousValue)) {
    searchValue.value = previousValue;
  }
}

function timeLabel(minutes) {
  if (minutes < 60) return `${minutes} 分前`;
  if (minutes < 180) return `${Math.floor(minutes / 60)} 小時前`;
  return "今日";
}

function createFragment(fragmentName, row) {
  const data = shikigami[fragmentName];
  row.querySelector(".fragment-icon").style.setProperty("--accent", data.color);
  row.querySelector(".fragment-icon span").textContent = data.mark;
  row.querySelector(".fragment-info strong").textContent = fragmentName;
  row.querySelector(".fragment-info small").textContent = `${data.rarity} · 式神碎片`;
}

function createActiveExchangeCard(exchange) {
  const card = activeExchangeTemplate.content.firstElementChild.cloneNode(true);
  const members = card.querySelector(".exchange-members");

  exchange.members.forEach(player => {
    const member = document.createElement("section");
    member.className = "exchange-member";
    member.innerHTML = `
      <div class="exchange-member-head">
        <div class="avatar" style="--avatar:${player.avatar}"><span></span><i></i></div>
        <div><h3></h3><small>陰陽師交換單</small></div>
      </div>
      <div class="member-fragments">
        <div class="member-fragment" style="--member-color:${shikigami[player.need].color}">
          <span>需要</span><strong></strong><b></b>
        </div>
        <div class="member-fragment" style="--member-color:${shikigami[player.offer].color}">
          <span>提供</span><strong></strong><b></b>
        </div>
      </div>`;
    member.querySelector(".avatar span").textContent = player.name.slice(0, 1);
    member.querySelector("h3").textContent = player.name;
    const fragmentRows = member.querySelectorAll(".member-fragment");
    fragmentRows[0].querySelector("strong").textContent = player.need;
    fragmentRows[0].querySelector("b").textContent = `${player.needQty} 片`;
    fragmentRows[1].querySelector("strong").textContent = player.offer;
    fragmentRows[1].querySelector("b").textContent = `${player.offerQty} 片`;
    members.append(member);
  });

  card.querySelector(".cancel-exchange").addEventListener("click", () => {
    activeExchanges = activeExchanges.filter(item => item.id !== exchange.id);
    saveActiveExchanges();
    updateSearchOptions();
    renderPlayers();
    updateStats();
  });
  card.querySelector(".complete-exchange").addEventListener("click", () => {
    const completedExchanges = JSON.parse(localStorage.getItem("fragmentCompletedExchanges") || "[]");
    completedExchanges.unshift({
      ...exchange,
      status: "completed",
      completedAt: Date.now()
    });
    localStorage.setItem(
      "fragmentCompletedExchanges",
      JSON.stringify(completedExchanges.slice(0, 100))
    );
    activeExchanges = activeExchanges.filter(item => item.id !== exchange.id);
    saveActiveExchanges();
    updateSearchOptions();
    renderPlayers();
    updateStats();
  });
  return card;
}

function saveActiveExchanges() {
  localStorage.setItem("fragmentActiveExchanges", JSON.stringify(activeExchanges));
  localStorage.removeItem("fragmentActiveExchange");
  window.dispatchEvent(new CustomEvent("fragment-exchanges-changed", {
    detail: activeExchanges.map(exchange => JSON.parse(JSON.stringify(exchange)))
  }));
}

function activeExchangeMatches(exchange, search, rarity) {
  const searchMatches = !search || exchange.members.some(player =>
    searchType.value === "player"
      ? player.name === search
      : player.need === search || player.offer === search
  );
  const rarityMatches = rarity === "all" || exchange.members.some(player =>
    shikigami[player.need].rarity === rarity || shikigami[player.offer].rarity === rarity
  );
  return searchMatches && rarityMatches && !matchOnly;
}

const playerGroupColors = [
  "#9b3b35", "#3f6f78", "#6b5682", "#47705d",
  "#9a6b35", "#536b94", "#8a4e6c", "#687142"
];

function getPlayerGroupColor(name) {
  let hash = 0;
  for (const character of name) {
    hash = ((hash << 5) - hash + character.codePointAt(0)) | 0;
  }
  return playerGroupColors[Math.abs(hash) % playerGroupColors.length];
}

function renderPlayers() {
  const selectedSearch = searchValue.value;
  const rarity = rarityFilter.value;
  const busyIds = new Set(activeExchanges.flatMap(exchange =>
    exchange.members.map(member => String(member.id))
  ));
  let result = getDisplayPlayers().filter(player => {
    if (busyIds.has(String(player.id))) return false;
    const matchesSearch = !selectedSearch ||
      (searchType.value === "player"
        ? player.name === selectedSearch
        : player.need === selectedSearch || player.offer === selectedSearch);
    const matchesRarity = rarity === "all" ||
      shikigami[player.need].rarity === rarity ||
      shikigami[player.offer].rarity === rarity;
    return matchesSearch && matchesRarity && (!matchOnly || isMatch(player));
  });

  result.sort((a, b) => {
    if (a.namePending !== b.namePending) return Number(a.namePending) - Number(b.namePending);
    if (!a.namePending && !b.namePending) {
      const nameCompare = a.name.localeCompare(b.name, "zh-Hant");
      if (nameCompare !== 0) return nameCompare;
      if (sortSelect.value === "match") {
        const matchCompare = Number(isMatch(b)) - Number(isMatch(a));
        if (matchCompare !== 0) return matchCompare;
      }
      return a.id - b.id;
    }
    return a.id - b.id;
  });

  grid.replaceChildren();
  activeGrid.replaceChildren();
  let representedPlayers = result.length;
  let visibleActiveGroups = 0;
  activeExchanges.forEach(exchange => {
    if (!activeExchangeMatches(exchange, selectedSearch, rarity)) return;
    activeGrid.append(createActiveExchangeCard(exchange));
    visibleActiveGroups += 1;
    representedPlayers += exchange.members.length;
  });

  const nameTotals = new Map();
  result.filter(player => !player.namePending).forEach(player => {
    const key = player.name.toLowerCase();
    nameTotals.set(key, (nameTotals.get(key) || 0) + 1);
  });
  const namePositions = new Map();

  result.forEach(player => {
    const card = template.content.firstElementChild.cloneNode(true);
    let playerGroupColor = null;
    if (!player.namePending) {
      const nameKey = player.name.toLowerCase();
      const groupColor = getPlayerGroupColor(nameKey);
      playerGroupColor = groupColor;
      const groupPosition = (namePositions.get(nameKey) || 0) + 1;
      const groupTotal = nameTotals.get(nameKey) || 1;
      namePositions.set(nameKey, groupPosition);
      card.classList.add("player-group-card");
      card.style.setProperty("--player-group-color", groupColor);
      card.style.setProperty(
        "--player-group-soft",
        `color-mix(in srgb, ${groupColor} 7%, #fffdf8)`
      );
      if (groupTotal > 1) {
        card.querySelector(".player-meta p").textContent = `同名交換單 ${groupPosition} / ${groupTotal}`;
      }
    }
    if (player.isMine) card.classList.add("is-mine");
    if (isMatch(player)) card.classList.add("is-match");
    const avatar = card.querySelector(".avatar");
    avatar.style.setProperty("--avatar", playerGroupColor || player.avatar);
    avatar.querySelector("span").textContent = player.namePending ? String(player.id).padStart(2, "0") : player.name.slice(0, 1);
    card.querySelector("h3").textContent = player.name;
    if (player.namePending) {
      card.querySelector(".player-meta p").textContent = "名稱待玩家填寫";
    } else if ((nameTotals.get(player.name.toLowerCase()) || 0) === 1) {
      card.querySelector(".player-meta p").textContent = "陰陽師交換單";
    }
    card.querySelector(".updated").textContent = timeLabel(player.minutes);
    createFragment(player.need, card.querySelector(".need-row"));
    createFragment(player.offer, card.querySelector(".offer-row"));
    card.querySelector(".need-row .quantity").textContent = `需要 ${player.needQty} 片`;
    card.querySelector(".offer-row .quantity").textContent = `提供 ${player.offerQty} 片`;
    const requestButton = card.querySelector(".request-button");
    if (player.namePending) {
      requestButton.hidden = true;
    } else {
      requestButton.addEventListener("click", () => openExchangeRequest(player));
    }
    const actionButton = card.querySelector(".invite-button");
    if (player.isMine) {
      actionButton.firstChild.textContent = "編輯這張交換單 ";
      actionButton.addEventListener("click", () => {
        openProfileForm(player);
        document.querySelector("#profileDialog").showModal();
      });
    } else {
      actionButton.addEventListener("click", () => openInvite(player));
    }
    grid.append(card);
  });

  resultCount.textContent = representedPlayers;
  activeZoneCount.textContent = visibleActiveGroups;
  waitingZoneCount.textContent = result.length;
  activeZoneEmpty.hidden = visibleActiveGroups > 0;
  emptyState.hidden = result.length > 0;
}

function openExchangeRequest(sourcePlayer) {
  requestSourceId = String(sourcePlayer.id);
  const partnerSelect = document.querySelector("#exchangePartner");
  const hint = document.querySelector("#requestHint");
  const confirmButton = document.querySelector("#confirmExchange");
  partnerSelect.replaceChildren();
  document.querySelector("#requestFrom").textContent = `發起人：${sourcePlayer.name}`;

  const partners = getAvailablePlayers().filter(player => String(player.id) !== requestSourceId);
  if (partners.length === 0) {
    const option = document.createElement("option");
    option.textContent = "目前沒有其他已填寫交換單的陰陽師";
    option.value = "";
    partnerSelect.append(option);
    partnerSelect.disabled = true;
    confirmButton.disabled = true;
    hint.textContent = "需有另一位陰陽師先完成交換單，才能開始交換。";
  } else {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "請選擇交換對象";
    partnerSelect.append(placeholder);
    partners.forEach(player => {
      const option = document.createElement("option");
      option.value = String(player.id);
      option.textContent = `${player.name}｜需 ${player.need} ${player.needQty} 片，提供 ${player.offer} ${player.offerQty} 片`;
      partnerSelect.append(option);
    });
    partnerSelect.disabled = false;
    confirmButton.disabled = false;
    hint.textContent = "確認後，兩人的交換單會合併顯示為交換進行中。";
  }
  document.querySelector("#exchangeRequestDialog").showModal();
}

function openInvite(player) {
  if (!exchangeRecords.length) {
    openProfileForm();
    document.querySelector("#profileDialog").showModal();
    document.querySelector("#profileName").focus();
    return;
  }
  const dialog = document.querySelector("#inviteDialog");
  const message = `你好，我是「${profile.name}」。我需要「${profile.need}」碎片 ${profile.needQty} 片，願意提供「${profile.offer}」碎片 ${profile.offerQty} 片交換，若方便請與我聯繫。`;
  document.querySelector("#inviteTitle").textContent = `致 ${player.name} 的交換邀請`;
  document.querySelector("#inviteMessage").textContent = message;
  document.querySelector("#copyInvite").dataset.message = message;
  document.querySelector("#copyInvite").textContent = "複製邀請內容";
  dialog.showModal();
}

function openProfileForm(record = null) {
  editingRecordId = record?.id || null;
  const values = record || profileDefaults;
  document.querySelector("#profileDialogTitle").textContent = record ? "編輯交換單" : "新增交換單";
  document.querySelector("#profileName").value = record?.name || "";
  document.querySelector("#profileNeed").value = values.need;
  document.querySelector("#profileNeedQty").value = values.needQty;
  document.querySelector("#profileOffer").value = values.offer;
  document.querySelector("#profileOfferQty").value = values.offerQty;
  document.querySelector("#profileMessage").textContent = record
    ? `正在編輯第 ${String(record.id).padStart(2, "0")} 個席位`
    : `將自動填入下一個空白席位（剩餘 ${30 - exchangeRecords.length} 格）`;
}

Object.keys(shikigami).forEach(name => {
  [document.querySelector("#profileNeed"), document.querySelector("#profileOffer")].forEach(select => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = `${shikigami[name].rarity} · ${name}`;
    select.append(option);
  });
});

document.querySelector("#openProfile").addEventListener("click", () => {
  if (exchangeRecords.length >= 30) {
    openProfileForm(exchangeRecords[exchangeRecords.length - 1]);
    document.querySelector("#profileMessage").textContent = "30 個席位皆已填滿，請編輯既有交換單。";
  } else {
    openProfileForm();
  }
  document.querySelector("#profileDialog").showModal();
});

const profileDialog = document.querySelector("#profileDialog");
document.querySelectorAll('#profileForm button[value="cancel"]').forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    profileDialog.close("cancel");
  });
});
profileDialog.addEventListener("close", () => {
  if (profileDialog.returnValue === "cancel") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
profileDialog.addEventListener("cancel", event => {
  event.preventDefault();
  profileDialog.close("cancel");
});

document.querySelector("#profileForm").addEventListener("submit", event => {
  if (event.submitter?.value !== "default") return;
  event.preventDefault();
  const name = document.querySelector("#profileName").value.trim();
  const need = document.querySelector("#profileNeed").value;
  const needQty = Number(document.querySelector("#profileNeedQty").value);
  const offer = document.querySelector("#profileOffer").value;
  const offerQty = Number(document.querySelector("#profileOfferQty").value);
  const duplicate = exchangeRecords.find(record =>
    record.id !== editingRecordId &&
    record.name.toLowerCase() === name.toLowerCase() &&
    record.need === need &&
    Number(record.needQty) === needQty &&
    record.offer === offer &&
    Number(record.offerQty) === offerQty
  );
  if (duplicate) {
    document.querySelector("#profileMessage").textContent = `「${name}」已有完全相同的交換單。`;
    return;
  }

  const nextEmptyId = players.find(player =>
    !exchangeRecords.some(record => Number(record.id) === player.id)
  )?.id;
  const recordId = editingRecordId || nextEmptyId;
  if (!recordId) {
    document.querySelector("#profileMessage").textContent = "30 個席位皆已填滿。";
    return;
  }

  const savedRecord = {
    id: recordId,
    name,
    need,
    needQty,
    offer,
    offerQty
  };
  const existingIndex = exchangeRecords.findIndex(record => Number(record.id) === Number(recordId));
  if (existingIndex >= 0) {
    exchangeRecords[existingIndex] = savedRecord;
  } else {
    exchangeRecords.push(savedRecord);
  }
  exchangeRecords.sort((a, b) => a.id - b.id);
  profile = savedRecord;
  rememberPlayerName(name);
  localStorage.setItem("fragmentExchangeRecords", JSON.stringify(exchangeRecords));
  localStorage.setItem("fragmentExchangeProfile", JSON.stringify(savedRecord));
  window.dispatchEvent(new CustomEvent("fragment-record-saved", { detail: savedRecord }));
  document.querySelector("#profileDialog").close();
  updateSearchOptions();
  renderPlayers();
  updateStats();
  document.querySelector("#playerList").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#exchangeRequestForm").addEventListener("submit", event => {
  if (event.submitter?.value !== "default") return;
  event.preventDefault();
  const partnerId = document.querySelector("#exchangePartner").value;
  const availablePlayers = getAvailablePlayers();
  const source = availablePlayers.find(player => String(player.id) === requestSourceId);
  const partner = availablePlayers.find(player => String(player.id) === partnerId);
  if (!source || !partner) return;

  const newExchange = {
    id: `${source.id}-${partner.id}-${Date.now()}`,
    startedAt: Date.now(),
    members: [source, partner]
  };
  activeExchanges.push(newExchange);
  saveActiveExchanges();
  document.querySelector("#exchangeRequestDialog").close();
  updateSearchOptions();
  renderPlayers();
  updateStats();
});

document.querySelector("#showMatches").addEventListener("click", event => {
  matchOnly = !matchOnly;
  event.currentTarget.textContent = matchOnly ? "顯示全部交換單" : "只看推薦配對";
  sortSelect.value = matchOnly ? "match" : "recent";
  document.querySelector("#playerList").scrollIntoView({ behavior: "smooth" });
  renderPlayers();
});

document.querySelector("#clearFilters").addEventListener("click", () => {
  searchType.value = "shikigami";
  updateSearchOptions();
  searchValue.value = "";
  rarityFilter.value = "all";
  sortSelect.value = "recent";
  matchOnly = false;
  document.querySelector("#showMatches").textContent = "只看推薦配對";
  renderPlayers();
});

document.querySelector("#closeInvite").addEventListener("click", () => {
  document.querySelector("#inviteDialog").close();
});

document.querySelector("#copyInvite").addEventListener("click", async event => {
  try {
    await navigator.clipboard.writeText(event.currentTarget.dataset.message);
    event.currentTarget.textContent = "已複製邀請內容";
  } catch {
    event.currentTarget.textContent = "請手動複製上方內容";
  }
});

searchType.addEventListener("change", () => {
  updateSearchOptions();
  renderPlayers();
});

[searchValue, rarityFilter, sortSelect].forEach(control => {
  control.addEventListener("change", renderPlayers);
});

function updateStats() {
  const displayPlayers = getDisplayPlayers();
  document.querySelector("#playerCount").textContent = displayPlayers.length;
  document.querySelector("#fragmentCount").textContent = displayPlayers.reduce((sum, player) => sum + player.offerQty, 0);
  document.querySelector("#matchCount").textContent = displayPlayers.filter(isMatch).length;
}

window.fragmentExchangeApp = {
  getRecords() {
    return exchangeRecords.map(record => ({ ...record }));
  },
  getActiveExchanges() {
    return activeExchanges.map(exchange => JSON.parse(JSON.stringify(exchange)));
  },
  applyRemoteRecords(records) {
    exchangeRecords = records
      .filter(record => record && record.id && record.name)
      .sort((a, b) => Number(a.id) - Number(b.id));
    profile = exchangeRecords[0] || profileDefaults;
    localStorage.setItem("fragmentExchangeRecords", JSON.stringify(exchangeRecords));
    updateSearchOptions();
    renderPlayers();
    updateStats();
  },
  applyRemoteExchanges(exchanges) {
    activeExchanges = Array.isArray(exchanges) ? exchanges : [];
    localStorage.setItem("fragmentActiveExchanges", JSON.stringify(activeExchanges));
    localStorage.removeItem("fragmentActiveExchange");
    updateSearchOptions();
    renderPlayers();
    updateStats();
  }
};

renderPlayerNameHistory();
updateSearchOptions();
updateStats();
renderPlayers();

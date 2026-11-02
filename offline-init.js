const offlineStatus = document.getElementById("offline-status");

function showOfflineState() {
  offlineStatus.textContent = navigator.onLine
    ? "离线内容已准备好，可以断网复习。"
    : "当前为离线模式，已缓存的全部章节仍可使用。";
}

if ("serviceWorker" in navigator) {
  try {
    await navigator.serviceWorker.register("./service-worker.js");
    await navigator.serviceWorker.ready;
    showOfflineState();
  } catch {
    offlineStatus.textContent = "离线内容准备失败，请联网刷新后重试。";
  }
} else {
  offlineStatus.textContent = "当前浏览器不支持离线安装，请使用 iPad Safari。";
}

window.addEventListener("online", showOfflineState);
window.addEventListener("offline", showOfflineState);

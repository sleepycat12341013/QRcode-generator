const qrCode = new QRCodeStyling({
  width: 150,
  height: 150,
  data: "",
  dotsOptions: {
    type: "dots",

    gradient: {
      type: "linear", // 線形グラデーション
      rotation: 0,
      colorStops: [
        { offset: 0, color: document.getElementById("color1").value },
        { offset: 1, color: document.getElementById("color2").value },
      ],
    },
  },
  cornersSquareOptions: {
    color: "#E1306C",
    type: "square", // 外枠は四角
  },
  cornersDotOptions: {
    color: "#E1306C",
    type: "square", // 内側の小さい四角も四角に固定
  },
  qrOptions: {
    typeNumber: 5,
  },
  backgroundOptions: {
    color: "#ffffff",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 5,
  },
});

// 表示
const qrContainer = document.getElementById("qrcode");
qrCode.append(qrContainer);

// ロゴアップロード
document.getElementById("logoUpload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    qrCode.update({ image: event.target.result });
  };
  reader.readAsDataURL(file); // Base64に変換
});

// テキスト変更して再生成
document.getElementById("generate").addEventListener("click", () => {
  const value = document.getElementById("text").value.trim();
  if (!value) return;

  qrCode.update({
    data: value,
  });
});

// ダウンロード
document.getElementById("download").addEventListener("click", () => {
  qrCode.download({ name: "qr", extension: "png" });
});

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "",
  dotsOptions: {
    type: "dots",
  },
  cornersSquareOptions: {
    type: "square",
  },
  cornersDotOptions: {
    type: "square",
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

// グラデ更新
function createQR() {
  const color1 = document.getElementById("color1").value;
  const color2 = document.getElementById("color2").value;

  qrCode.update({
    dotsOptions: {
      type: "dots",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: color1 },
          { offset: 1, color: color2 },
        ],
      },
    },
  });
}

// 初回描画
createQR();

// 色変更
document.getElementById("color1").addEventListener("change", createQR);
document.getElementById("color2").addEventListener("change", createQR);

// テキスト変更
document.getElementById("generate").addEventListener("click", () => {
  const value = document.getElementById("text").value.trim();
  if (!value) return;
  qrCode.update({ data: value });
});

// ロゴアップロード
document.getElementById("logoUpload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    qrCode.update({ image: event.target.result });
  };
  reader.readAsDataURL(file);
});

// ダウンロード
document.getElementById("download").addEventListener("click", () => {
  qrCode.download({ name: "qr", extension: "png" });
});

const formatMessages = {
  PNG: {
    title: 'PNG 이미지를 JPG 형식으로 변환하세요.',
    subtitle: '온라인에서 여러 PNG를 JPG로 한 번에 변환하세요.'
  },
  GIF: {
    title: 'GIF 이미지를 JPG 형식으로 변환하세요.',
    subtitle: '움직이는 GIF를 정적 JPG로 쉽게 변환하세요.'
  },
  TIF: {
    title: 'TIF 이미지를 JPG 형식으로 변환하세요.',
    subtitle: '고해상도 TIF 파일을 빠르게 JPG로 바꿔보세요.'
  },
  PSD: {
    title: 'PSD 이미지를 JPG 형식으로 변환하세요.',
    subtitle: 'Photoshop PSD 파일을 간편하게 JPG로 저장하세요.'
  },
  SVG: {
    title: 'SVG 이미지를 JPG 형식으로 변환하세요.',
    subtitle: '벡터 SVG 파일을 고화질 JPG로 바꿔보세요.'
  },
  WEBP: {
    title: 'WEBP 이미지를 JPG 형식으로 변환하세요.',
    subtitle: '여러 WEBP 이미지를 쉽게 JPG로 전환합니다.'
  },
  HEIC: {
    title: 'HEIC 이미지를 JPG 형식으로 변환하세요.',
    subtitle: 'iPhone HEIC 사진을 호환성 높은 JPG로 바꾸세요.'
  },
  RAW: {
    title: 'RAW 이미지를 JPG 형식으로 변환하세요.',
    subtitle: '전문가용 RAW 파일을 고품질 JPG로 바꾸세요.'
  }
};

const title = document.getElementById('mainTitle');
const subtitle = document.getElementById('mainSubtitle');
const uploadLabel = document.getElementById('uploadLabel');
const fileInput = document.getElementById('fileInput');
const formatIndicator = document.getElementById('formatIndicator');
const previewContainer = document.getElementById('previewContainer');

let selectedFiles = [];

document.querySelectorAll('.formats a[data-format]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const format = link.dataset.format;
    const mime = link.dataset.mime;
    const msg = formatMessages[format];

    title.textContent = msg.title;
    subtitle.textContent = msg.subtitle;
    fileInput.setAttribute('accept', mime);
    uploadLabel.textContent = `여러 ${format} 이미지 선택`;
    formatIndicator.textContent = `현재 포맷: ${format}`;
  });
});

fileInput.addEventListener('change', () => {
  const files = [...fileInput.files];
  selectedFiles = files;
  previewContainer.innerHTML = '';

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.createElement('div');
      preview.className = 'preview-thumb';
      preview.innerHTML = `<img src="${e.target.result}" alt="${file.name}"><div>${file.name}</div>`;
      previewContainer.appendChild(preview);
    };
    reader.readAsDataURL(file);
  });
});

document.getElementById('convertBtn').addEventListener('click', () => {
  if (!selectedFiles.length) {
    alert('먼저 이미지를 선택하세요.');
    return;
  }

  selectedFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = file.name.replace(/\.\w+$/, '') + '.jpg';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, 'image/jpeg', 0.92);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});

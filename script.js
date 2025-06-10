const formatMessages = {
  PNG: { title: 'PNG 이미지를 JPG로 변환', subtitle: '여러 PNG 이미지를 JPG로 변환하세요.' },
  GIF: { title: 'GIF 이미지를 JPG로 변환', subtitle: '움직이는 GIF를 정지형 JPG로 변환합니다.' },
  TIF: { title: 'TIF 이미지를 JPG로 변환', subtitle: '고화질 TIF 파일을 빠르게 변환하세요.' },
  WEBP: { title: 'WEBP 이미지를 JPG로 변환', subtitle: 'WEBP 이미지를 JPG로 변환합니다.' },
  HEIC: { title: 'HEIC 이미지를 JPG로 변환', subtitle: 'iPhone HEIC 파일을 호환성 높은 JPG로!' },
  RAW: { title: 'RAW 이미지를 JPG로 변환', subtitle: '전문가용 RAW 포맷을 JPG로 변환합니다.' }
};

const title = document.getElementById('mainTitle');
const subtitle = document.getElementById('mainSubtitle');
const uploadLabel = document.getElementById('uploadLabel');
const fileInput = document.getElementById('fileInput');
const formatIndicator = document.getElementById('formatIndicator');
const previewContainer = document.getElementById('previewContainer');
const convertBtn = document.getElementById('convertBtn');

let selectedFiles = [];

document.querySelectorAll('.formats a[data-format]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const format = link.dataset.format;
    const mime = link.dataset.mime;
    const msg = formatMessages[format];
    if (msg) {
      title.textContent = msg.title;
      subtitle.textContent = msg.subtitle;
      fileInput.accept = mime;
      uploadLabel.textContent = `${format} 이미지 선택`;
      formatIndicator.textContent = `현재 포맷: ${format}`;
    }
  });
});

fileInput.addEventListener('change', () => {
  selectedFiles = [...fileInput.files];
  previewContainer.innerHTML = '';
  selectedFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const preview = document.createElement('div');
      preview.className = 'preview-thumb';
      preview.innerHTML = `<img src="${e.target.result}" alt="${file.name}"><div>${file.name}</div>`;
      previewContainer.appendChild(preview);
    };
    reader.readAsDataURL(file);
  });
});

convertBtn.addEventListener('click', () => {
  if (!selectedFiles.length) return alert('먼저 이미지를 선택하세요.');
  selectedFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
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

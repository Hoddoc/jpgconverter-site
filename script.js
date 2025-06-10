document.getElementById('convertBtn').addEventListener('click', () => {
  const files = document.getElementById('fileInput').files;
  if (!files.length) return alert('이미지를 선택하세요.');
  [...files].forEach(file => {
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
          a.click();
        }, 'image/jpeg', 0.92);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});

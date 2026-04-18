// シンプルなスライダー機能
// 3つの動画をスライド表示する

document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.photo-grid');
  if (!grid) return;
  const cells = Array.from(grid.children);
  if (cells.length <= 3) return; // 3つ以下ならスライド不要

  let start = 0;
  const visible = 3;

  // 最初の3つだけ表示
  function updateSlider() {
    cells.forEach((cell, i) => {
      if (i >= start && i < start + visible) {
        cell.style.display = '';
      } else {
        cell.style.display = 'none';
      }
    });
  }

  function nextSlide() {
    start = (start + 1) % cells.length;
    if (start > cells.length - visible) start = 0;
    updateSlider();
  }

  // 自動スライド
  setInterval(nextSlide, 3500);
  updateSlider();
});

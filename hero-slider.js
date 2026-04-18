// HEROセクションの複数動画スライド用
// 複数の動画を順番に切り替え表示する

document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // 動画ファイル名をここで指定
  const videoList = [
    'video (6)_3.mp4',
    'video (26).mp4',
    'video (27).mp4'
  ];

  // 2つのvideo要素を重ねてクロスフェード
  let idx = 0;
  let active = 0;
  // 既存videoを取得し、もう1つ複製
  const videoA = hero.querySelector('video.parallax-media');
  if (!videoA) return;
  const videoB = videoA.cloneNode(true);
  videoB.style.position = 'absolute';
  videoB.style.inset = '0';
  videoB.style.opacity = '0';
  videoB.style.transition = 'opacity 1.2s';
  videoA.style.transition = 'opacity 1.2s';
  videoA.parentNode.insertBefore(videoB, videoA.nextSibling);

  // 初期化
  videoA.querySelector('source').setAttribute('src', videoList[0]);
  videoA.load();
  videoA.play();
  videoB.pause();

  function crossFade(nextIdx) {
    const current = active === 0 ? videoA : videoB;
    const next = active === 0 ? videoB : videoA;
    next.style.opacity = '0';
    next.querySelector('source').setAttribute('src', videoList[nextIdx]);
    next.load();
    next.currentTime = 0;
    // フェードイン直前に再生開始し、黒余白を防ぐ
    setTimeout(() => {
      next.play();
      next.style.opacity = '1';
      current.style.opacity = '0';
    }, 30);
    setTimeout(() => {
      current.pause();
      active = 1 - active;
    }, 1200);
  }

  setInterval(() => {
    const nextIdx = (idx + 1) % videoList.length;
    crossFade(nextIdx);
    idx = nextIdx;
  }, 2500);
});

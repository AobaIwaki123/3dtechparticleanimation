import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  angle: number;
  angleSpeed: number;
  radius: number;
}

interface ParticleCanvasProps {
  onDisperse?: () => void;
  isDisappearing?: boolean;
}

export function ParticleCanvas({ onDisperse, isDisappearing = false }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // パーティクル配列と状態
    const particles: Particle[] = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let time = 0;
    let animationId: number;
    let clickForce = 0;
    let clickX = 0;
    let clickY = 0;

    // テキストから粒子位置を生成
    const createParticlesFromText = () => {
      // 既存の粒子をクリア
      particles.length = 0;

      // キャンバスサイズチェック
      if (canvas.width === 0 || canvas.height === 0) {
        console.log('Canvas size is 0');
        return;
      }

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // モバイル対応: 画面幅に合わせてパラメータを調整
      const isMobile = canvas.width < 768;
      const fontSize = isMobile ? Math.min(canvas.width * 0.3, 160) : Math.min(canvas.width * 0.25, 400);
      const gap = isMobile ? 10 : Math.max(4, Math.floor(canvas.width / 150));

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      tempCtx.fillStyle = 'white';
      tempCtx.font = `bold ${fontSize}px Arial`;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';

      // モバイルでは文字間隔を少し広げるために個別描画を検討したが、
      // まずは単一の文字列でフォントサイズとGap調整を試す
      tempCtx.fillText('Aoba', tempCanvas.width / 2, tempCanvas.height / 2);

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixels = imageData.data;

      // グリッドサンプリングで粒子を配置
      for (let y = 0; y < tempCanvas.height; y += gap) {
        for (let x = 0; x < tempCanvas.width; x += gap) {
          const index = (y * tempCanvas.width + x) * 4;
          const alpha = pixels[index + 3];

          if (alpha > 128) {
            const randomX = Math.random() * canvas.width;
            const randomY = Math.random() * canvas.height;
            const randomZ = (Math.random() - 0.5) * 300;

            // モバイルでは jitter (radius) を小さくする
            const baseJitter = isMobile ? 1.5 : 5;
            const jitterRadius = Math.random() * baseJitter + (isMobile ? 1 : 2);

            particles.push({
              x: randomX,
              y: randomY,
              z: randomZ,
              targetX: x,
              targetY: y,
              targetZ: (Math.random() - 0.5) * 50,
              baseX: x,
              baseY: y,
              baseZ: (Math.random() - 0.5) * 50,
              vx: 0,
              vy: 0,
              vz: 0,
              angle: Math.random() * Math.PI * 2,
              angleSpeed: (Math.random() - 0.5) * 0.01,
              radius: jitterRadius
            });
          }
        }
      }

      console.log(`Created ${particles.length} particles`);
    };

    // Canvas サイズ設定
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticlesFromText();
    };

    // 初回実行
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // マウス追跡
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // クリックイベント
    const handleClick = (e: MouseEvent) => {
      clickForce = 1;
      clickX = e.clientX;
      clickY = e.clientY;
      if (onDisperse) {
        onDisperse();
      }
    };
    canvas.addEventListener('click', handleClick);

    // アニメーションループ
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // クリック力を減衰
      clickForce *= 0.9;

      particles.forEach((particle, index) => {
        // 円運動を加えた目標位置
        const offsetX = Math.cos(particle.angle) * particle.radius;
        const offsetY = Math.sin(particle.angle) * particle.radius;
        const offsetZ = Math.sin(particle.angle * 2) * 10;

        particle.targetX = particle.baseX + offsetX;
        particle.targetY = particle.baseY + offsetY;
        particle.targetZ = particle.baseZ + offsetZ;

        // 角度更新
        particle.angle += particle.angleSpeed;

        // マウスからの影響
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 4;
          particle.vy -= Math.sin(angle) * force * 4;
        }

        // クリック時の爆発効果
        if (clickForce > 0.01) {
          const cdx = particle.x - clickX;
          const cdy = particle.y - clickY;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const maxClickDistance = 600;

          if (cdist < maxClickDistance) {
            const explosionForce = ((maxClickDistance - cdist) / maxClickDistance) * clickForce;
            const angle = Math.atan2(cdy, cdx);
            particle.vx += Math.cos(angle) * explosionForce * 15;
            particle.vy += Math.sin(angle) * explosionForce * 15;
          }
        }

        // 目標位置への引力
        const tx = particle.targetX - particle.x;
        const ty = particle.targetY - particle.y;
        const tz = particle.targetZ - particle.z;

        particle.vx += tx * 0.15;
        particle.vy += ty * 0.15;
        particle.vz += tz * 0.15;

        // 摩擦
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.vz *= 0.9;

        // 位置更新
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // 3D効果の計算
        const scale = 400 / (400 + particle.z);
        const x2d = particle.x;
        const y2d = particle.y;
        const isMobile = canvas.width < 768;
        const sizeBase = isMobile ? 1.8 : 2.5;
        const size = Math.max(1, sizeBase * scale);

        // 青色のグラデーション
        const depth = (particle.z + 200) / 400; // 0-1の範囲に正規化
        const brightness = Math.max(0.4, Math.min(1, depth));

        // 青色のバリエーション
        const hue = 200 + Math.sin(time + index * 0.1) * 15; // 185-215の範囲
        const saturation = 75 + Math.sin(time * 0.5 + index * 0.05) * 15;
        const lightness = 50 + brightness * 20;

        // グロー効果
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 2);
        gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`);
        gradient.addColorStop(0.5, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`);
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // コア
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness + 15}%, 1)`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();

        // 接続線を描画（近い粒子同士）
        particles.forEach((otherParticle, otherIndex) => {
          if (otherIndex <= index) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const dz = particle.z - otherParticle.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 40) {
            const alpha = (1 - distance / 40) * 0.25;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full cursor-pointer transition-opacity duration-1500 ${isDisappearing ? 'opacity-0' : 'opacity-100'
        }`}
    />
  );
}
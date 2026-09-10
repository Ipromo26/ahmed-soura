"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, ZoomIn, ZoomOut, Check, Crop, RotateCcw } from "lucide-react";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  title?: string;
  defaultAspectRatio?: number; // e.g., 1 for square, 16/9, 4/3
  onCropComplete: (croppedDataUrl: string) => void;
  onClose: () => void;
}

export function ImageCropperModal({
  isOpen,
  imageSrc,
  title = "Recadrer l'image",
  defaultAspectRatio = 1,
  onCropComplete,
  onClose,
}: ImageCropperModalProps) {
  const [aspectRatio, setAspectRatio] = useState<number>(defaultAspectRatio);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Reset state when opening with a new image or aspect ratio
  useEffect(() => {
    if (!isOpen || !imageSrc) return;

    setZoom(1);
    setPan({ x: 0, y: 0 });
    setAspectRatio(defaultAspectRatio);
    setImageLoaded(false);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };
  }, [isOpen, imageSrc, defaultAspectRatio]);

  // Draw crop preview on canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imageLoaded) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate crop box dimensions to fit inside canvas with padding
    const padding = 24;
    const maxCropW = width - padding * 2;
    const maxCropH = height - padding * 2;

    let cropW: number;
    let cropH: number;

    if (maxCropW / maxCropH > aspectRatio) {
      cropH = maxCropH;
      cropW = cropH * aspectRatio;
    } else {
      cropW = maxCropW;
      cropH = cropW / aspectRatio;
    }

    const cropX = (width - cropW) / 2;
    const cropY = (height - cropH) / 2;

    // Calculate image dimensions to at least cover the crop box at zoom = 1
    const imgAspect = img.width / img.height;
    let baseW: number;
    let baseH: number;

    if (imgAspect > aspectRatio) {
      baseH = cropH;
      baseW = baseH * imgAspect;
    } else {
      baseW = cropW;
      baseH = baseW / imgAspect;
    }

    const drawW = baseW * zoom;
    const drawH = baseH * zoom;

    const drawX = cropX + (cropW - drawW) / 2 + pan.x;
    const drawY = cropY + (cropH - drawH) / 2 + pan.y;

    // 1. Draw entire image dimmed in background
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    // 2. Clip to crop box and draw crisp image
    ctx.save();
    ctx.beginPath();
    ctx.rect(cropX, cropY, cropW, cropH);
    ctx.clip();

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Rule-of-thirds grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1;

    // Vertical grid lines
    ctx.beginPath();
    ctx.moveTo(cropX + cropW / 3, cropY);
    ctx.lineTo(cropX + cropW / 3, cropY + cropH);
    ctx.moveTo(cropX + (cropW * 2) / 3, cropY);
    ctx.lineTo(cropX + (cropW * 2) / 3, cropY + cropH);

    // Horizontal grid lines
    ctx.moveTo(cropX, cropY + cropH / 3);
    ctx.lineTo(cropX + cropW, cropY + cropH / 3);
    ctx.moveTo(cropX, cropY + (cropH * 2) / 3);
    ctx.lineTo(cropX + cropW, cropY + (cropH * 2) / 3);
    ctx.stroke();

    ctx.restore();

    // 3. Draw border around crop box
    ctx.strokeStyle = "#C6F23B"; // Lime accent
    ctx.lineWidth = 2;
    ctx.strokeRect(cropX, cropY, cropW, cropH);

    // Corner handles
    const cornerSize = 14;
    ctx.fillStyle = "#C6F23B";
    ctx.fillRect(cropX - 2, cropY - 2, cornerSize, 4);
    ctx.fillRect(cropX - 2, cropY - 2, 4, cornerSize);

    ctx.fillRect(cropX + cropW - cornerSize + 2, cropY - 2, cornerSize, 4);
    ctx.fillRect(cropX + cropW - 2, cropY - 2, 4, cornerSize);

    ctx.fillRect(cropX - 2, cropY + cropH - 2, cornerSize, 4);
    ctx.fillRect(cropX - 2, cropY + cropH - cornerSize + 2, 4, cornerSize);

    ctx.fillRect(cropX + cropW - cornerSize + 2, cropY + cropH - 2, cornerSize, 4);
    ctx.fillRect(cropX + cropW - 2, cropY + cropH - cornerSize + 2, 4, cornerSize);
  }, [aspectRatio, zoom, pan, imageLoaded]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Pointer event handlers for drag/pan
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  // Export cropped slice
  const handleConfirmCrop = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imageLoaded) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 24;
    const maxCropW = width - padding * 2;
    const maxCropH = height - padding * 2;

    let cropW: number;
    let cropH: number;

    if (maxCropW / maxCropH > aspectRatio) {
      cropH = maxCropH;
      cropW = cropH * aspectRatio;
    } else {
      cropW = maxCropW;
      cropH = cropW / aspectRatio;
    }

    const cropX = (width - cropW) / 2;
    const cropY = (height - cropH) / 2;

    const imgAspect = img.width / img.height;
    let baseW: number;
    let baseH: number;

    if (imgAspect > aspectRatio) {
      baseH = cropH;
      baseW = baseH * imgAspect;
    } else {
      baseW = cropW;
      baseH = baseW / imgAspect;
    }

    const drawW = baseW * zoom;
    const drawH = baseH * zoom;
    const drawX = cropX + (cropW - drawW) / 2 + pan.x;
    const drawY = cropY + (cropH - drawH) / 2 + pan.y;

    // Convert canvas crop coordinates back to source image coordinates
    const scale = img.width / drawW;
    const srcCropX = (cropX - drawX) * scale;
    const srcCropY = (cropY - drawY) * scale;
    const srcCropW = cropW * scale;
    const srcCropH = cropH * scale;

    // Create high-res export canvas
    const targetW = Math.min(1600, Math.max(800, Math.round(srcCropW)));
    const targetH = Math.round(targetW / aspectRatio);

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = targetW;
    exportCanvas.height = targetH;
    const exportCtx = exportCanvas.getContext("2d");

    if (!exportCtx) return;

    // High quality smoothing
    exportCtx.imageSmoothingEnabled = true;
    exportCtx.imageSmoothingQuality = "high";

    exportCtx.drawImage(
      img,
      srcCropX,
      srcCropY,
      srcCropW,
      srcCropH,
      0,
      0,
      targetW,
      targetH
    );

    const croppedDataUrl = exportCanvas.toDataURL("image/jpeg", 0.9);
    onCropComplete(croppedDataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg animate-fadeIn">
      <div className="bg-[#141414] border border-white/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-lime/10 text-lime border border-lime/20">
              <Crop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                {title}
              </h3>
              <p className="text-[11px] text-zinc-400">
                Glissez l'image pour ajuster le cadrage ou utilisez le zoom.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="px-4 py-2.5 bg-zinc-950/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-zinc-400">Format de cadrage :</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setAspectRatio(1);
                setPan({ x: 0, y: 0 });
              }}
              className={"px-3 py-1 rounded-lg text-xs font-semibold transition-all " +
                (aspectRatio === 1 ? "bg-lime text-black font-bold shadow-sm" : "bg-white/5 text-zinc-400 hover:text-white")}
            >
              1:1 (Carré / Vêtement)
            </button>
            <button
              type="button"
              onClick={() => {
                setAspectRatio(16 / 9);
                setPan({ x: 0, y: 0 });
              }}
              className={"px-3 py-1 rounded-lg text-xs font-semibold transition-all " +
                (Math.abs(aspectRatio - 16 / 9) < 0.01 ? "bg-lime text-black font-bold shadow-sm" : "bg-white/5 text-zinc-400 hover:text-white")}
            >
              16:9 (Scène)
            </button>
            <button
              type="button"
              onClick={() => {
                setAspectRatio(4 / 3);
                setPan({ x: 0, y: 0 });
              }}
              className={"px-3 py-1 rounded-lg text-xs font-semibold transition-all " +
                (Math.abs(aspectRatio - 4 / 3) < 0.01 ? "bg-lime text-black font-bold shadow-sm" : "bg-white/5 text-zinc-400 hover:text-white")}
            >
              4:3 (Portrait)
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative flex-1 bg-black/80 flex items-center justify-center p-2 sm:p-4 select-none overflow-hidden">
          <canvas
            ref={canvasRef}
            width={580}
            height={400}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full max-w-[580px] h-auto max-h-[50vh] touch-none cursor-grab active:cursor-grabbing rounded-lg border border-white/10 shadow-inner"
          />

          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-xs text-zinc-400 font-mono">
              Chargement de l'image...
            </div>
          )}
        </div>

        {/* Zoom & Pan Controls */}
        <div className="p-4 bg-zinc-950/80 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <ZoomOut className="w-4 h-4 text-zinc-400" />
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-lime"
              />
              <ZoomIn className="w-4 h-4 text-zinc-400" />
              <span className="font-mono text-xs text-lime min-w-[3rem] text-right font-bold">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-mono flex items-center gap-1 transition-all shrink-0"
              title="Réinitialiser le zoom et la position"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Centrer</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/15 text-xs font-semibold text-zinc-400 hover:text-white transition-all"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleConfirmCrop}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(198,242,59,0.3)]"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Valider le recadrage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

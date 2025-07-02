// src/components/Modal.tsx

import React from 'react';

export type ModalProps = {
  /**
   * モーダル内に表示するコンポーネントや要素
   */
  children: React.ReactNode;
  /**
   * モーダルを閉じる際に呼び出されるコールバック関数
   */
  onClose: () => void;
};

/**
 * 汎用モーダルコンポーネント
 *
 * 背景にオーバーレイを表示し、その上に中央寄せの
 * モーダルコンテンツをレンダリングします。
 *
 * @param children モーダル内に表示する要素
 * @param onClose  モーダルを閉じるコールバック
 */
const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    // 背景オーバーレイ: 画面全体に半透明の黒いレイヤーを敷く
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center"
      // 背景クリックでも閉じたい場合は onClick={onClose} を追加しても◎
    >
      {/* モーダル本体: 白背景のカード風コンテナ */}
      <div className="bg-white rounded shadow p-6 w-full max-w-2xl relative">
        {/* 閉じるボタン: 右上に固定配置 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          aria-label="モーダルを閉じる"
        >
          ×
        </button>

        {/* 子要素をそのまま表示 */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
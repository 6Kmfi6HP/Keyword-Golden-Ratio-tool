import React from 'react';

interface KGRResultProps {
  kgr: number | null;
}

export const KGRResult: React.FC<KGRResultProps> = ({ kgr }) => {
  const getAnalysisColor = (kgr: number) => {
    if (kgr < 0.25) return 'bg-green-100 border-green-200';
    if (kgr <= 1.00) return 'bg-blue-100 border-blue-200';
    return 'bg-yellow-100 border-yellow-200';
  };

  const getAnalysisText = (kgr: number) => {
    if (kgr < 0.25) return '建议操作';
    if (kgr <= 1.00) return '可以尝试';
    return '竞争较大';
  };

  if (kgr === null) return null;

  return (
    <div className="mt-6 space-y-4">
      <div className={`p-4 rounded-lg border-2 ${getAnalysisColor(kgr)}`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">KGR 值</h3>
            <p className="text-3xl font-bold mt-1">{kgr.toFixed(5)}</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold">分析结果</h3>
            <p className="text-xl font-medium mt-1">{getAnalysisText(kgr)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="p-3 rounded bg-green-100 border border-green-200 text-center">
          <p className="font-semibold">&lt; 0.25</p>
          <p className="text-sm">建议操作</p>
        </div>
        <div className="p-3 rounded bg-blue-100 border border-blue-200 text-center">
          <p className="font-semibold">0.25 - 1.00</p>
          <p className="text-sm">可以尝试</p>
        </div>
        <div className="p-3 rounded bg-yellow-100 border border-yellow-200 text-center">
          <p className="font-semibold">&gt; 1.00</p>
          <p className="text-sm">竞争较大</p>
        </div>
      </div>
    </div>
  );
};
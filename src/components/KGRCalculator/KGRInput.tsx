import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface KGRInputProps {
  keyword: string;
  titleResults: string;
  monthlySearches: string;
  onKeywordChange: (value: string) => void;
  onTitleResultsChange: (value: string) => void;
  onMonthlySearchesChange: (value: string) => void;
}

export const KGRInput: React.FC<KGRInputProps> = ({
  keyword,
  titleResults,
  monthlySearches,
  onKeywordChange,
  onTitleResultsChange,
  onMonthlySearchesChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="keyword">关键词</Label>
        <Input
          id="keyword"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="输入要分析的关键词"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="titleResults">Allintitle 搜索结果数</Label>
        <Input
          id="titleResults"
          type="number"
          value={titleResults}
          onChange={(e) => onTitleResultsChange(e.target.value)}
          placeholder="输入allintitle搜索结果数量"
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="monthlySearches">月搜索量</Label>
        <Input
          id="monthlySearches"
          type="number"
          value={monthlySearches}
          onChange={(e) => onMonthlySearchesChange(e.target.value)}
          placeholder="输入月搜索量"
          className="w-full"
        />
      </div>
    </div>
  );
};
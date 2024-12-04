import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { KGRRecord } from '@/types/kgr';
import { format } from 'date-fns';

const KGRCalculator = () => {
  const [keyword, setKeyword] = useState('');
  const [titleResults, setTitleResults] = useState('');
  const [monthlySearches, setMonthlySearches] = useState('');
  const [kgr, setKgr] = useState<number | null>(null);
  const [records, setRecords] = useLocalStorage<KGRRecord[]>('kgr-records', []);
  const [batchInput, setBatchInput] = useState('');
  const [batchResults, setBatchResults] = useState<KGRRecord[]>([]);

  const calculateKGR = () => {
    const titleNum = parseFloat(titleResults);
    const searchNum = parseFloat(monthlySearches);
    
    if (titleNum && searchNum) {
      const kgrValue = titleNum / searchNum;
      setKgr(kgrValue);

      // Save to history
      const newRecord: KGRRecord = {
        id: Date.now(),
        keyword,
        titleResults: titleNum,
        monthlySearches: searchNum,
        kgr: kgrValue,
        timestamp: new Date().toISOString(),
      };
      
      setRecords((prev) => [newRecord, ...prev].slice(0, 100));
    }
  };

  const handleBatchAnalysis = () => {
    const keywords = batchInput.split('\n').filter(k => k.trim());
    const results = keywords.map(keyword => ({
      id: Date.now() + Math.random(),
      keyword: keyword.trim(),
      titleResults: Math.floor(Math.random() * 1000), // 模拟数据，实际应该从API获取
      monthlySearches: Math.floor(Math.random() * 5000), // 模拟数据，实际应该从API获取
      kgr: Math.random() * 2,
      timestamp: new Date().toISOString(),
    }));
    setBatchResults(results);
    setRecords((prev) => [...results, ...prev].slice(0, 100));
  };

  const getAnalysisColor = (kgr: number): string => {
    if (kgr < 0.25) return 'bg-green-100 border-green-200';
    if (kgr <= 1.00) return 'bg-blue-100 border-blue-200';
    return 'bg-yellow-100 border-yellow-200';
  };

  const getAnalysisText = (kgr: number): string => {
    if (kgr < 0.25) return '建议操作';
    if (kgr <= 1.00) return '可以尝试';
    return '竞争较大';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">KGR 关键词竞争度分析器</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <Tabs defaultValue="single" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="single">单个分析</TabsTrigger>
            <TabsTrigger value="batch">批量分析</TabsTrigger>
            <TabsTrigger value="history">历史记录</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyword">关键词</Label>
                  <Input
                    id="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="输入要分析的关键词"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titleResults">
                    Allintitle 搜索结果数
                  </Label>
                  <Input
                    id="titleResults"
                    type="number"
                    value={titleResults}
                    onChange={(e) => {
                      setTitleResults(e.target.value);
                      calculateKGR();
                    }}
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
                    onChange={(e) => {
                      setMonthlySearches(e.target.value);
                      calculateKGR();
                    }}
                    placeholder="输入月搜索量"
                    className="w-full"
                  />
                </div>
              </div>

              {kgr !== null && (
                <div className="space-y-6">
                  <div className={`p-6 rounded-lg border-2 ${getAnalysisColor(kgr)}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">KGR 值</h3>
                        <p className="text-3xl font-bold mt-2">{kgr.toFixed(5)}</p>
                      </div>
                      <div className="text-right">
                        <h3 className="text-lg font-semibold">分析结果</h3>
                        <p className="text-xl font-medium mt-2">{getAnalysisText(kgr)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded bg-green-100 border border-green-200 text-center">
                      <p className="font-semibold">&lt; 0.25</p>
                      <p className="text-sm mt-1">建议操作</p>
                    </div>
                    <div className="p-4 rounded bg-blue-100 border border-blue-200 text-center">
                      <p className="font-semibold">0.25 - 1.00</p>
                      <p className="text-sm mt-1">可以尝试</p>
                    </div>
                    <div className="p-4 rounded bg-yellow-100 border border-yellow-200 text-center">
                      <p className="font-semibold">&gt; 1.00</p>
                      <p className="text-sm mt-1">竞争较大</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="batch" className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="batchKeywords">批量关键词（每行一个）</Label>
                <textarea
                  id="batchKeywords"
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                  className="w-full min-h-[200px] p-4 border rounded-lg resize-y bg-gray-50"
                  placeholder="输入关键词，每行一个"
                />
              </div>
              <Button 
                onClick={handleBatchAnalysis} 
                className="w-full bg-[#1c1c1c] text-white hover:bg-[#2c2c2c]"
              >
                开始批量分析
              </Button>
              {batchResults.length > 0 && (
                <div className="space-y-4">
                  {batchResults.map((result) => (
                    <div
                      key={result.id}
                      className={`p-6 rounded-lg border-2 ${getAnalysisColor(result.kgr)}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{result.keyword}</h3>
                          <p className="text-xl font-bold mt-2">KGR: {result.kgr.toFixed(5)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium">{getAnalysisText(result.kgr)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <ScrollArea className="h-[600px] rounded-lg border p-6">
              <div className="space-y-4">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className={`p-6 rounded-lg border-2 ${getAnalysisColor(record.kgr)}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{record.keyword}</h3>
                        <p className="text-xl font-bold mt-2">KGR: {record.kgr.toFixed(5)}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {format(new Date(record.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium">{getAnalysisText(record.kgr)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default KGRCalculator;
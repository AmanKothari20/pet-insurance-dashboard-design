"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

// ==================== ROLLING WEEKS DATA ====================
const rollingWeeksData = [
  { week: "W-1", ocr: 5200, mrs: 1420, vnext: 890 },
  { week: "W-2", ocr: 4950, mrs: 1380, vnext: 820 },
  { week: "W-3", ocr: 5100, mrs: 1410, vnext: 860 },
  { week: "W-4", ocr: 4800, mrs: 1350, vnext: 780 },
  { week: "W-5", ocr: 5300, mrs: 1440, vnext: 910 },
  { week: "W-6", ocr: 5050, mrs: 1390, vnext: 840 },
  { week: "W-7", ocr: 4900, mrs: 1360, vnext: 800 },
  { week: "W-8", ocr: 5150, mrs: 1420, vnext: 870 },
  { week: "W-9", ocr: 4750, mrs: 1340, vnext: 760 },
]

// Sparkline SVG component for inline trend visualization
function Sparkline({ data, color = "#F57418" }) {
  if (!data || data.length === 0) return null
  
  const width = 100
  const height = 30
  const padding = 2
  const maxVal = Math.max(...data)
  const minVal = Math.min(...data)
  const range = maxVal - minVal || 1
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1 || 1)) * (width - 2 * padding) + padding
    const y = height - padding - ((val - minVal) / range) * (height - 2 * padding)
    return `${x},${y}`
  }).join(" ")
  
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// MGA metrics data for selected entity
function getMGAData(mga) {
  const baseData = {
    Wombat: {
      mtdMRS: 14250,
      mtdOCR: 52100,
      mtdVNext: 8920,
      ytdMRS: 124380,
      ytdOCR: 456200,
      ytdVNext: 78640,
    },
    Diamond: {
      mtdMRS: 11850,
      mtdOCR: 43650,
      mtdVNext: 7230,
      ytdMRS: 103250,
      ytdOCR: 381900,
      ytdVNext: 63180,
    },
  }
  return baseData[mga]
}

export default function MgaMetricsPage() {
  const [selectedMGA, setSelectedMGA] = useState("Wombat")
  const mgaData = getMGAData(selectedMGA)

  const matrixData = [
    {
      metric: "MRS Volume",
      ytd: mgaData.ytdMRS,
      mtd: mgaData.mtdMRS,
      "W-1": 1420,
      "W-2": 1380,
      "W-3": 1410,
      "W-4": 1350,
      "W-5": 1440,
      "W-6": 1390,
      "W-7": 1360,
      "W-8": 1420,
      "W-9": 1340,
      sparkData: [1340, 1360, 1420, 1390, 1440, 1350, 1410, 1380, 1420],
    },
    {
      metric: "OCR Volume",
      ytd: mgaData.ytdOCR,
      mtd: mgaData.mtdOCR,
      "W-1": 5200,
      "W-2": 4950,
      "W-3": 5100,
      "W-4": 4800,
      "W-5": 5300,
      "W-6": 5050,
      "W-7": 4900,
      "W-8": 5150,
      "W-9": 4750,
      sparkData: [4750, 4900, 5150, 5050, 5300, 4800, 5100, 4950, 5200],
    },
    {
      metric: "vNext Complete",
      ytd: mgaData.ytdVNext,
      mtd: mgaData.mtdVNext,
      "W-1": 890,
      "W-2": 820,
      "W-3": 860,
      "W-4": 780,
      "W-5": 910,
      "W-6": 840,
      "W-7": 800,
      "W-8": 870,
      "W-9": 760,
      sparkData: [760, 800, 870, 840, 910, 780, 860, 820, 890],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F7F8] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#000000]">MGA Metrics Dashboard</h1>
            <p className="text-sm text-[#5F5F5F] mt-1">Rolling operational analysis: OCR, MRS, vNext Complete</p>
          </div>
        </div>

        {/* Global MGA Slicer */}
        <Card className="bg-white border border-[#F57418] shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-[#000000] uppercase tracking-wide">Active MGA:</span>
              <div className="flex gap-2">
                {["Wombat", "Diamond"].map((mga) => (
                  <button
                    key={mga}
                    onClick={() => setSelectedMGA(mga)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      selectedMGA === mga
                        ? "bg-[#F57418] text-white shadow-md"
                        : "bg-[#F5F7F8] text-[#000000] border border-[#E5E7EB] hover:border-[#F57418]"
                    }`}
                  >
                    {mga}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top-Level Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* MRS Card */}
          <Card className="bg-white border border-[#E5E7EB] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#5F5F5F] uppercase tracking-wide">
                Medical Record Summarization (MRS) - MTD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-[#000000]">{mgaData.mtdMRS.toLocaleString()}</div>
                  <div className="text-xs text-[#5F5F5F] mt-2">Month-to-Date</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>+3.2%</span>
                  </div>
                  <div className="text-xs text-[#5F5F5F] mt-1">vs Last Week</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OCR Card */}
          <Card className="bg-white border border-[#E5E7EB] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#5F5F5F] uppercase tracking-wide">
                OCR Volume Finalized - MTD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-[#000000]">{mgaData.mtdOCR.toLocaleString()}</div>
                  <div className="text-xs text-[#5F5F5F] mt-2">Month-to-Date</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>+2.8%</span>
                  </div>
                  <div className="text-xs text-[#5F5F5F] mt-1">vs Last Week</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* vNext Complete Card */}
          <Card className="bg-white border border-[#E5E7EB] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#5F5F5F] uppercase tracking-wide">
                vNext Complete Pipeline - MTD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-[#000000]">{mgaData.mtdVNext.toLocaleString()}</div>
                  <div className="text-xs text-[#5F5F5F] mt-2">Month-to-Date</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>+4.1%</span>
                  </div>
                  <div className="text-xs text-[#5F5F5F] mt-1">vs Last Week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rolling Time Horizon Matrix */}
        <Card className="bg-white border border-[#E5E7EB] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#000000] font-semibold flex items-center justify-between">
              <span>Rolling Time Horizon Matrix - {selectedMGA}</span>
              <Badge className="bg-[#F57418] text-white">9-Week Rolling Window</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b-2 border-[#F57418] bg-[#FEF3E7]">
                    <th className="text-left py-3 px-3 font-bold text-[#000000] whitespace-nowrap">Metric</th>
                    <th className="text-right py-3 px-3 font-bold text-[#000000] whitespace-nowrap">YTD</th>
                    <th className="text-right py-3 px-3 font-bold text-[#000000] whitespace-nowrap">MTD</th>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((week) => (
                      <th key={`w-${week}`} className="text-right py-3 px-2 font-bold text-[#000000] whitespace-nowrap">
                        W-{week}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixData.map((row, idx) => (
                    <tr key={idx} className={`border-b border-[#E5E7EB] hover:bg-[#FEF3E7] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                      <td className="py-3 px-3 text-[#F57418] font-bold">{row.metric}</td>
                      <td className="py-3 px-3 text-right text-[#000000] font-semibold">{row.ytd.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-[#000000] font-semibold">{row.mtd.toLocaleString()}</td>
                      
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((week) => (
                        <td key={`${idx}-w${week}`} className="py-3 px-2 text-right text-[#5F5F5F]">
                          {row[`W-${week}`].toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Rolling 9-Week Operational Velocity Trend */}
        <Card className="bg-white border border-[#E5E7EB] shadow-sm">
          <CardHeader>
            <div>
              <CardTitle className="text-[#000000] font-semibold">Rolling 9-Week Operational Velocity Trend</CardTitle>
              <p className="text-sm text-[#5F5F5F] mt-1">Displaying pipeline outputs for {selectedMGA}</p>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={rollingWeeksData} margin={{ top: 10, right: 40, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="week" 
                  stroke="#5F5F5F"
                  label={{ value: "Week", position: "insideBottomRight", offset: -10 }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#5F5F5F"
                  label={{ value: "OCR & MRS Volume", angle: -90, position: "insideLeft" }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#F57418"
                  label={{ value: "vNext Complete", angle: 90, position: "insideRight" }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB" }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="ocr" fill="#8884d8" name="OCR Volume" opacity={0.8} />
                <Bar yAxisId="left" dataKey="mrs" fill="#82ca9d" name="MRS Volume" opacity={0.8} />
                <Line yAxisId="right" type="monotone" dataKey="vnext" stroke="#F57418" strokeWidth={3} name="vNext Complete" dot={{ fill: "#F57418", r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-xs text-[#5F5F5F] text-left pt-4 border-t border-[#E5E7EB]">
          <p>
            <strong>Data Context:</strong> Rolling window updates dynamically based on Sunday weekly ledger closure cycles. 
            All calculations filtered via Active MGA Token: <span className="font-mono font-bold text-[#F57418]">{selectedMGA}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

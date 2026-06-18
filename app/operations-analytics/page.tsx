"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, LineChart, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { TrendingUp, TrendingDown, Calendar, Filter, Download } from "lucide-react"

// ==================== MOCK DATA ====================
const kpiData = {
  totalClaims: 681520,
  inProgress: 10380,
  vnextComplete: 242800,
  vnextCompleteRate: 35.63,
  revenueMTD: 28190,
  revenueYTD: 1022272,
}

const kpiMetrics = [
  { label: "Straight-Through Processing Rate", value: "35.6%", trend: 2.3, color: "#2563EB" },
  { label: "vNext Complete Conversion Rate", value: "31.7%", trend: -1.2, color: "#2563EB" },
  { label: "Caladan OCR Engine Efficiency", value: "78.4%", trend: 4.1, color: "#059669" },
  { label: "OCR Extraction Success", value: "91.2%", trend: 0.8, color: "#059669" },
  { label: "Fallback Routing Rate", value: "8.8%", trend: -0.5, color: "#F59E0B" },
  { label: "Treatment Assignment Drift", value: "19.1%", trend: 1.3, color: "#E11D48" },
]

const funnelData = [
  { stage: "# Submitted Claims", count: 57684, percentage: 100, color: "#1e3a5f" },
  { stage: "# Received by vNext", count: 53051, percentage: 91.94, color: "#2d5183" },
  { stage: "# Verified", count: 52684, percentage: 91.28, color: "#3d6aa7" },
  { stage: "# Doc. Classified", count: 52684, percentage: 91.28, color: "#4d83cb" },
  { stage: "# OCR", count: 52670, percentage: 91.25, color: "#5d9cef" },
  { stage: "# Data Integration", count: 50567, percentage: 87.65, color: "#7eb3f5" },
  { stage: "# Gate Check", count: 50567, percentage: 87.65, color: "#9ecbf7" },
  { stage: "# Treatment Assignment", count: 42999, percentage: 74.55, color: "#bde2f9" },
  { stage: "# Line Item Coding", count: 42999, percentage: 74.55, color: "#ddeffc" },
  { stage: "# Automation Finalized", count: 17657, percentage: 30.6, color: "#e0f0ff" },
]

const falloutData = [
  { claimId: "389ab584...", dateProcessed: "2026-04-25", stage: "Treatment Assignment", reason: "There are treatment Tax/Medical waste that are not mapped to conditions on the claim", amount: "$2.45K", confidence: 78, status: "Fallout" },
  { claimId: "4f2cd91e...", dateProcessed: "2026-04-25", stage: "OCR", reason: "OCR confidence score below 85% threshold on invoice lines", amount: "$1.23K", confidence: 82, status: "Fallout" },
  { claimId: "5a3de2f9...", dateProcessed: "2026-04-24", stage: "Data Integration", reason: "Clinic information not found in master data lookup service", amount: "$3.67K", confidence: 91, status: "Manual Audit" },
  { claimId: "6b4ef3g0...", dateProcessed: "2026-04-24", stage: "Gate Check", reason: "Claim amount variance exceeds policy threshold by 15%", amount: "$5.12K", confidence: 65, status: "Fallout" },
  { claimId: "7c5fg4h1...", dateProcessed: "2026-04-23", stage: "Verification", reason: "Patient demographics mismatch with system records", amount: "$892K", confidence: 71, status: "Manual Audit" },
  { claimId: "8d6gh5i2...", dateProcessed: "2026-04-23", stage: "Line Item Coding", reason: "Procedure code not recognized in treatment taxonomy database", amount: "$1.56K", confidence: 88, status: "Fallout" },
  { claimId: "9e7hi6j3...", dateProcessed: "2026-04-22", stage: "Treatment Assignment", reason: "Treatment combination flagged as high-risk duplicate claim pattern", amount: "$2.89K", confidence: 79, status: "Fallout" },
  { claimId: "0f8ij7k4...", dateProcessed: "2026-04-22", stage: "OCR", reason: "Multi-page document requires manual OCR validation", amount: "$4.34K", confidence: 72, status: "Manual Audit" },
]

const monthlyData = [
  { month: "January", monthName: "Jan", totalClaims: 131666, vnextComplete: 33.89, revenue: 201000 },
  { month: "February", monthName: "Feb", totalClaims: 120281, vnextComplete: 35.24, revenue: 187500 },
  { month: "March", monthName: "Mar", totalClaims: 136946, vnextComplete: 34.08, revenue: 215000 },
  { month: "April", monthName: "Apr", totalClaims: 138639, vnextComplete: 31.72, revenue: 218772 },
]

const stageTableData = [
  { order: 1, stage: "Total Received", reached: 681515, reachedPct: 100.0, dropped: 0, droppedPct: 0.0 },
  { order: 2, stage: "Verification", reached: 681317, reachedPct: 99.97, dropped: 417, droppedPct: 0.06 },
  { order: 3, stage: "ClassifyDocument", reached: 680769, reachedPct: 99.89, dropped: 18, droppedPct: 0.0 },
  { order: 4, stage: "Recognition", reached: 680751, reachedPct: 99.89, dropped: 0, droppedPct: 0.0 },
  { order: 5, stage: "OCR", reached: 680364, reachedPct: 99.83, dropped: 24404, droppedPct: 3.58 },
  { order: 6, stage: "DataIntegration", reached: 646633, reachedPct: 94.88, dropped: 0, droppedPct: 0.0 },
  { order: 7, stage: "Gate", reached: 646590, reachedPct: 94.88, dropped: 71465, droppedPct: 10.49 },
  { order: 8, stage: "RecordRequest", reached: 575125, reachedPct: 84.39, dropped: 61844, droppedPct: 9.07 },
  { order: 9, stage: "LineItemCoding", reached: 513281, reachedPct: 75.31, dropped: 44460, droppedPct: 6.52 },
  { order: 10, stage: "PostProcessor", reached: 468820, reachedPct: 68.79, dropped: 0, droppedPct: 0.0 },
  { order: 11, stage: "TreatmentAssignment", reached: 468820, reachedPct: 68.79, dropped: 130296, droppedPct: 19.12 },
  { order: 12, stage: "Audit", reached: 338473, reachedPct: 49.66, dropped: 62757, droppedPct: 9.21 },
  { order: 13, stage: "Conversion", reached: 275475, reachedPct: 40.42, dropped: 32656, droppedPct: 4.79 },
  { order: 14, stage: "AutomationComplete", reached: 242819, reachedPct: 35.63, dropped: 0, droppedPct: 0.0 },
]

// ==================== COMPONENT ====================
export default function OperationsAnalyticsDashboard() {
  const [selectedSystem, setSelectedSystem] = useState("all")
  const [selectedPipeline, setSelectedPipeline] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("mtd")
  const [selectedStage, setSelectedStage] = useState(null)

  const filteredFalloutData = selectedStage 
    ? falloutData.filter(row => row.stage === selectedStage)
    : falloutData

  const getStatusColor = (status) => {
    if (status === "AutoPassed") return "bg-green-100 text-green-800"
    if (status === "Fallout") return "bg-red-100 text-red-800"
    if (status === "Manual Audit") return "bg-amber-100 text-amber-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-[#F5F7F8] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ==================== HEADER & FILTERS ==================== */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-[#000000]">Operational Operations Analytics</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F57418] text-white rounded hover:bg-[#E06410]">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5F5F5F] uppercase mb-2">Date Range</label>
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="bg-[#F5F7F8] border border-[#E5E7EB] text-[#000000]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtd">Month to Date</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="last90">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5F5F5F] uppercase mb-2">System of Origin</label>
              <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                <SelectTrigger className="bg-[#F5F7F8] border border-[#E5E7EB] text-[#000000]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Systems</SelectItem>
                  <SelectItem value="pawsitive">PawsitivePet</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                  <SelectItem value="clarus">Clarus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5F5F5F] uppercase mb-2">Pipeline Type</label>
              <Select value={selectedPipeline} onValueChange={setSelectedPipeline}>
                <SelectTrigger className="bg-[#F5F7F8] border border-[#E5E7EB] text-[#000000]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pipelines</SelectItem>
                  <SelectItem value="invoice">Invoice Pipeline 1</SelectItem>
                  <SelectItem value="estimate">Estimate Pipeline</SelectItem>
                  <SelectItem value="correspondence">Correspondence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-[#F5F7F8] border border-[#E5E7EB] text-[#000000] rounded font-medium hover:bg-[#E5E7EB] flex items-center justify-center gap-2">
                <Filter className="w-4 h-4" />
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* ==================== SUMMARY BANNER ==================== */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-white border border-[#E5E7EB]">
            <CardContent className="pt-6">
              <div className="text-[#5F5F5F] text-sm font-medium mb-1">Total Claims Volume</div>
              <div className="text-3xl font-bold text-[#F57418]">{(kpiData.totalClaims / 1000).toFixed(1)}K</div>
              <div className="text-xs text-[#5F5F5F] mt-2">681,520 individual claims</div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-[#E5E7EB]">
            <CardContent className="pt-6">
              <div className="text-[#5F5F5F] text-sm font-medium mb-1">In Progress</div>
              <div className="text-3xl font-bold text-[#000000]">{(kpiData.inProgress / 1000).toFixed(2)}K</div>
              <div className="text-xs text-[#5F5F5F] mt-2">Current pipeline queue</div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-[#E5E7EB]">
            <CardContent className="pt-6">
              <div className="text-[#5F5F5F] text-sm font-medium mb-1">Revenue MTD</div>
              <div className="text-3xl font-bold text-[#000000]">${(kpiData.revenueMTD / 1000).toFixed(1)}K</div>
              <div className="text-xs text-[#5F5F5F] mt-2">Month-to-date revenue</div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-[#E5E7EB]">
            <CardContent className="pt-6">
              <div className="text-[#5F5F5F] text-sm font-medium mb-1">Revenue YTD</div>
              <div className="text-3xl font-bold text-[#000000]">${(kpiData.revenueYTD / 1000).toFixed(1)}K</div>
              <div className="text-xs text-[#5F5F5F] mt-2">Year-to-date revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* ==================== KPI METRICS GRID ==================== */}
        <div className="grid grid-cols-6 gap-4">
          {kpiMetrics.map((metric, idx) => (
            <Card key={idx} className="bg-white border border-[#E5E7EB]">
              <CardContent className="pt-6">
                <div className="text-[#5F5F5F] text-xs font-medium mb-3 line-clamp-2">{metric.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${metric.trend >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {metric.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(metric.trend)}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ==================== FUNNEL CHART ==================== */}
        <Card className="bg-white border border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#000000]">Automation Funnel - Claim Processing Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {funnelData.map((item, idx) => {
                const width = (item.percentage / 100) * 100
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedStage(selectedStage === item.stage ? null : item.stage)}
                    className={`w-full text-left transition-all ${selectedStage === item.stage ? "ring-2 ring-[#F57418] rounded" : ""}`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-32 text-sm font-medium text-[#000000] truncate">{item.stage}</div>
                      <div className="flex-1 h-12 rounded-lg overflow-hidden bg-[#F5F7F8]" style={{ position: "relative" }}>
                        <div
                          className="h-full flex items-center px-3 rounded-lg transition-all"
                          style={{
                            width: `${width}%`,
                            backgroundColor: item.color,
                            minWidth: width > 5 ? `${width}%` : "60px",
                          }}
                        >
                          <span className="text-xs font-bold text-[#000000] whitespace-nowrap">
                            {item.count.toLocaleString()} ({item.percentage.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            {selectedStage && (
              <div className="mt-4 p-3 bg-[#FEF3E7] border border-[#F57418] rounded text-sm text-[#F57418]">
                Filtering table by: <strong>{selectedStage}</strong> <button onClick={() => setSelectedStage(null)} className="ml-2 underline">Clear</button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ==================== FALLOUT EXCEPTIONS TABLE ==================== */}
        <Card className="bg-white border border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#000000]">Fallout Exceptions Registry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#FEF3E7] border-b-2 border-[#F57418]">
                    <th className="px-4 py-2 text-left font-semibold text-[#000000]">Claim ID</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#000000]">Date Processed</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#000000]">Pipeline Step</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#000000]">Failure Reason</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#000000]">Amount</th>
                    <th className="px-4 py-2 text-center font-semibold text-[#000000]">OCR Confidence</th>
                    <th className="px-4 py-2 text-center font-semibold text-[#000000]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFalloutData.map((row, idx) => (
                    <tr key={idx} className={`border-b border-[#E5E7EB] ${idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"} hover:bg-[#FEF3E7]`}>
                      <td className="px-4 py-3 font-mono text-xs text-[#F57418]">{row.claimId}</td>
                      <td className="px-4 py-3 text-[#5F5F5F]">{row.dateProcessed}</td>
                      <td className="px-4 py-3 text-[#000000] font-medium">{row.stage}</td>
                      <td className="px-4 py-3 text-[#5F5F5F] max-w-md">{row.reason}</td>
                      <td className="px-4 py-3 text-right font-semibold text-[#000000]">{row.amount}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#F57418]"
                              style={{ width: `${row.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-[#5F5F5F]">{row.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={getStatusColor(row.status)}>
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ==================== STAGE DETAIL TABLE ==================== */}
        <Card className="bg-white border border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#000000]">Pipeline Stage Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#FEF3E7] border-b-2 border-[#F57418]">
                    <th className="px-4 py-2 text-left font-semibold text-[#000000]">Stage Order</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#000000]">Stage Name</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#000000]">Claims Reached</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#000000]">% Reached</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#000000]">Claims Dropped</th>
                    <th className="px-4 py-2 text-right font-semibold text-[#000000]">% Dropped</th>
                  </tr>
                </thead>
                <tbody>
                  {stageTableData.map((row, idx) => (
                    <tr key={idx} className={`border-b border-[#E5E7EB] ${idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                      <td className="px-4 py-2 text-[#5F5F5F] font-medium">{row.order}</td>
                      <td className="px-4 py-2 text-[#000000] font-medium">{row.stage}</td>
                      <td className="px-4 py-2 text-right text-[#000000] font-semibold">{row.reached.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right">
                        <Badge className="bg-...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4">
          Last Updated: April 25, 2026 | Data refreshes every 6 hours
        </div>
      </div>
    </div>
  )
}

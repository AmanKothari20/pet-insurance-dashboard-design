"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Download,
  RefreshCw,
  ChevronRight,
} from "lucide-react"

// ==================== OPERATIONS MATRIX DATA ====================
const operationsMatrixData = [
  {
    metric: "Connected Clinic Base",
    lw: 1180,
    pw: 1165,
    wowPct: 1.3,
    pm: 1140,
    mmPct: 3.5,
    mtdAct: 1180,
    mtdPm: 1140,
    mtdMmPct: 3.5,
    ytdAct: 1180,
    ytdPlan: 1150,
    ytdVarPct: 2.6,
    progressPct: 68.4,
  },
  {
    metric: "Connected Clinic Adds",
    lw: 18,
    pw: 15,
    wowPct: 20.0,
    pm: 32,
    mmPct: -43.8,
    mtdAct: 42,
    mtdPm: 38,
    mtdMmPct: 10.5,
    ytdAct: 245,
    ytdPlan: 235,
    ytdVarPct: 4.3,
    progressPct: 82.6,
  },
  {
    metric: "Revenue (IPG only)",
    lw: 1450000,
    pw: 1380000,
    wowPct: 5.1,
    pm: 5200000,
    mmPct: -72.1,
    mtdAct: 5840000,
    mtdPm: 5620000,
    mtdMmPct: 3.9,
    ytdAct: 31200000,
    ytdPlan: 29400000,
    ytdVarPct: 6.1,
    progressPct: 76.2,
  },
  {
    metric: "IPG Clarus Claims Automation %",
    lw: 67.2,
    pw: 64.8,
    wowPct: 3.7,
    pm: 61.5,
    mmPct: 9.3,
    mtdAct: 71.4,
    mtdPm: 68.9,
    mtdMmPct: 3.6,
    ytdAct: 75.8,
    ytdPlan: 72.0,
    ytdVarPct: 5.3,
    progressPct: 85.2,
  },
  {
    metric: "Claims Automation",
    lw: 8934,
    pw: 8712,
    wowPct: 2.5,
    pm: 8456,
    mmPct: 5.6,
    mtdAct: 18234,
    mtdPm: 17890,
    mtdMmPct: 1.9,
    ytdAct: 98456,
    ytdPlan: 95000,
    ytdVarPct: 3.6,
    progressPct: 79.4,
  },
  {
    metric: "OCR",
    lw: 7234,
    pw: 7012,
    wowPct: 3.2,
    pm: 6845,
    mmPct: 5.7,
    mtdAct: 14567,
    mtdPm: 14234,
    mtdMmPct: 2.3,
    ytdAct: 78945,
    ytdPlan: 76000,
    ytdVarPct: 3.9,
    progressPct: 81.2,
  },
  {
    metric: "Med Record Summarization",
    lw: 3456,
    pw: 3234,
    wowPct: 6.8,
    pm: 3012,
    mmPct: 14.7,
    mtdAct: 6789,
    mtdPm: 6234,
    mtdMmPct: 8.9,
    ytdAct: 42567,
    ytdPlan: 40000,
    ytdVarPct: 6.4,
    progressPct: 72.1,
  },
  {
    metric: "Financial Navigator",
    lw: 4123,
    pw: 3945,
    wowPct: 4.5,
    pm: 3876,
    mmPct: 6.4,
    mtdAct: 8234,
    mtdPm: 7945,
    mtdMmPct: 3.6,
    ytdAct: 45678,
    ytdPlan: 44000,
    ytdVarPct: 3.8,
    progressPct: 74.3,
  },
  {
    metric: "Claims History",
    lw: 2987,
    pw: 2856,
    wowPct: 4.6,
    pm: 2734,
    mmPct: 9.3,
    mtdAct: 5876,
    mtdPm: 5456,
    mtdMmPct: 7.7,
    ytdAct: 32145,
    ytdPlan: 31000,
    ytdVarPct: 3.7,
    progressPct: 70.8,
  },
]

// ==================== VOLUME DISTRIBUTION DATA ====================
const volumeDistributionData = [
  { name: "Claims Automation", ytdActual: 98456, ytdPlan: 95000 },
  { name: "OCR", ytdActual: 78945, ytdPlan: 76000 },
  { name: "Med Record Sum.", ytdActual: 42567, ytdPlan: 40000 },
  { name: "Financial Nav.", ytdActual: 45678, ytdPlan: 44000 },
  { name: "Claims History", ytdActual: 32145, ytdPlan: 31000 },
]

// ==================== KPI CARDS DATA ====================
const kpiCards = [
  {
    title: "Total Revenue YTD",
    value: "$31.2M",
    variance: "+6.1%",
    icon: <DollarSign className="w-6 h-6" />,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Automation Ceiling",
    value: "75.8%",
    variance: "+6.0%",
    icon: <TrendingUp className="w-6 h-6" />,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Core Engine Volumes",
    value: "245.0K",
    variance: "+6.5%",
    icon: <Activity className="w-6 h-6" />,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Active Clinic Footprint",
    value: "1,240",
    variance: "+4.2%",
    icon: <ChevronRight className="w-6 h-6" />,
    bgColor: "bg-orange-50",
    iconColor: "text-[#F57418]",
  },
]

// ==================== TREND INDICATOR COMPONENT ====================
const TrendBadge = ({ value, isCurrency = false, isPercentage = true }) => {
  const numValue = isCurrency ? parseFloat(value.replace(/[$,]/g, "")) : parseFloat(value)
  const isPositive = numValue > 0

  const formatValue = () => {
    if (isCurrency) return value
    if (isPercentage) return `${value}%`
    return value
  }

  return (
    <div className={`flex items-center gap-1 font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
      {isPositive ? (
        <TrendingUp className="w-4 h-4" />
      ) : (
        <TrendingDown className="w-4 h-4" />
      )}
      <span>{formatValue()}</span>
    </div>
  )
}

// ==================== PROGRESS BAR COMPONENT ====================
const ProgressGauge = ({ percentage }) => {
  const isExceeded = percentage > 100
  const displayPercentage = Math.min(percentage, 100)

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isExceeded ? "bg-green-500" : "bg-[#F57418]"}`}
          style={{ width: `${displayPercentage}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-[#5F5F5F] min-w-[45px] text-right">
        {percentage.toFixed(1)}%
      </span>
    </div>
  )
}

// ==================== CURRENCY FORMATTER ====================
const formatCurrency = (value) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toFixed(0)}`
}

const formatNumber = (value, isCurrency = false) => {
  if (isCurrency) return formatCurrency(value)
  return value.toLocaleString()
}

export default function OperationsDashboard() {
  const [activeTab, setActiveTab] = useState("matrix")
  const [selectedSoR, setSelectedSoR] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("ytd")
  const [showToast, setShowToast] = useState(false)

  const handleRefresh = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleExportCSV = () => {
    let csv = "Operational Metrics,LW,PW,WoW%,PM,M/M%,MTD Act,MTD PM,MTD M/M%,YTD Act,YTD Plan,YTD Var%,Progress to YE%\n"

    operationsMatrixData.forEach((row) => {
      csv += `${row.metric},${row.lw},${row.pw},${row.wowPct}%,${row.pm},${row.mmPct}%,${row.mtdAct},${row.mtdPm},${row.mtdMmPct}%,${row.ytdAct},${row.ytdPlan},${row.ytdVarPct}%,${row.progressPct}%\n`
    })

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "operations-matrix.csv"
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="min-h-screen bg-[#F5F7F8]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Data refreshed successfully
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-[#000000]">Operations Dashboard</h1>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-2 bg-[#F57418] text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>

          {/* Global Filters */}
          <div className="flex gap-4 items-end flex-wrap">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#5F5F5F] uppercase tracking-wide">System of Record</label>
              <Select value={selectedSoR} onValueChange={setSelectedSoR}>
                <SelectTrigger className="w-[180px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                  <SelectValue placeholder="SoR" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="wombat">Wombat Only</SelectItem>
                  <SelectItem value="ipg">IPG Managed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#5F5F5F] uppercase tracking-wide">Date Range</label>
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="w-[160px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lw">Last Week</SelectItem>
                  <SelectItem value="mtd">Month to Date</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] text-[#000000] rounded-lg hover:bg-[#F5F7F8] transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export to CSV
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-6 flex gap-0">
            <button
              onClick={() => setActiveTab("matrix")}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "matrix"
                  ? "border-[#F57418] text-[#F57418]"
                  : "border-transparent text-[#5F5F5F] hover:text-[#000000]"
              }`}
            >
              Executive Operations Matrix
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "analytics"
                  ? "border-[#F57418] text-[#F57418]"
                  : "border-transparent text-[#5F5F5F] hover:text-[#000000]"
              }`}
            >
              Advanced Visual Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiCards.map((card, idx) => (
            <Card key={idx} className="bg-white border border-[#E5E7EB] shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-[#5F5F5F] uppercase font-semibold tracking-wide mb-1">{card.title}</p>
                    <p className="text-2xl font-bold text-[#000000]">{card.value}</p>
                    <p className="text-sm text-green-600 font-semibold mt-2">{card.variance}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <div className={card.iconColor}>{card.icon}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* TAB 1: OPERATIONS MATRIX */}
        {activeTab === "matrix" && (
          <Card className="bg-white border border-[#E5E7EB] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#000000] font-semibold">Executive Operations Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  {/* HEADER TIER 1 */}
                  <thead>
                    <tr className="bg-[#FEF3E7] border-b-2 border-[#F57418]">
                      <th className="border border-[#E5E7EB] px-3 py-2 text-left font-bold text-[#000000] whitespace-nowrap">
                        Operational Metrics
                      </th>
                      <th colSpan="5" className="border border-[#E5E7EB] px-3 py-2 text-center font-bold text-[#000000]">
                        Weekly Performance Framework
                      </th>
                      <th colSpan="3" className="border border-[#E5E7EB] px-3 py-2 text-center font-bold text-[#000000]">
                        Month to Date (MTD)
                      </th>
                      <th colSpan="4" className="border border-[#E5E7EB] px-3 py-2 text-center font-bold text-[#000000]">
                        Year to Date (YTD)
                      </th>
                    </tr>

                    {/* HEADER TIER 2 */}
                    <tr className="bg-[#FEF3E7] border-b border-[#E5E7EB]">
                      <th className="border border-[#E5E7EB] px-3 py-2 text-left font-bold text-[#5F5F5F]"></th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">LW</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">PW</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">WoW%</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">PM</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">M/M%</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">Act</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">PM</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">M/M%</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">Act</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">Plan</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">Var%</th>
                      <th className="border border-[#E5E7EB] px-3 py-2 text-center font-semibold text-[#5F5F5F]">Progress %</th>
                    </tr>
                  </thead>

                  {/* BODY */}
                  <tbody>
                    {operationsMatrixData.map((row, idx) => (
                      <tr key={idx} className={`border-b border-[#E5E7EB] ${idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                        <td className="border border-[#E5E7EB] px-3 py-2 font-semibold text-[#000000] whitespace-nowrap">
                          {row.metric}
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-right text-[#5F5F5F]">
                          {formatNumber(row.lw, row.metric.includes("Revenue"))}
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-right text-[#5F5F5F]">
                          {formatNumber(row.pw, row.metric.includes("Revenue"))}
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-center">
                          <TrendBadge value={row.wowPct.toString()} />
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-right text-[#5F5F5F]">
                          {formatNumber(row.pm, row.metric.includes("Revenue"))}
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-center">
                          <TrendBadge value={row.mmPct.toString()} />
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-right text-[#5F5F5F]">
                          {formatNumber(row.mtdAct, row.metric.includes("Revenue"))}
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-right text-[#5F5F5F]">
                          {formatNumber(row.mtdPm, row.metric.includes("Revenue"))}
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-center">
                          <TrendBadge value={row.mtdMmPct.toString()} />
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-right text-[#5F5F5F]">
                          {formatNumber(row.ytdAct, row.metric.includes("Revenue"))}
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-right text-[#5F5F5F]">
                          {formatNumber(row.ytdPlan, row.metric.includes("Revenue"))}
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2 text-center">
                          <TrendBadge value={row.ytdVarPct.toString()} />
                        </td>
                        <td className="border border-[#E5E7EB] px-3 py-2">
                          <ProgressGauge percentage={row.progressPct} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 2: ADVANCED VISUAL ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Volume Distribution Chart */}
            <Card className="bg-white border border-[#E5E7EB] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#000000] font-semibold">Volume Core Engine Distribution (YTD)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={volumeDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fontSize: 12, fill: "#5F5F5F" }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#5F5F5F" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "6px" }}
                      formatter={(value) => value.toLocaleString()}
                    />
                    <Legend />
                    <Bar dataKey="ytdActual" fill="#F57418" name="YTD Actuals" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="ytdPlan" fill="#E5E7EB" name="YTD Plan" radius={[8, 8, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* DAX Formula Reference */}
            <Card className="bg-white border border-[#E5E7EB] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#000000] font-semibold">Power BI DAX Formulas Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-[#F5F7F8] rounded-lg font-mono text-xs border border-[#E5E7EB]">
                    <p className="text-[#5F5F5F] mb-2 font-bold">Week-over-Week Percentage:</p>
                    <p className="text-[#000000] mb-4">
                      <code>WoW_Pct = DIVIDE([LW_Value] - [PW_Value], [PW_Value], 0) * 100</code>
                    </p>

                    <p className="text-[#5F5F5F] mb-2 font-bold">Month-over-Month Percentage:</p>
                    <p className="text-[#000000] mb-4">
                      <code>M_M_Pct = DIVIDE([MTD_Actual] - [PM_Actual], [PM_Actual], 0) * 100</code>
                    </p>

                    <p className="text-[#5F5F5F] mb-2 font-bold">YTD Variance Percentage:</p>
                    <p className="text-[#000000] mb-4">
                      <code>YTD_Var_Pct = DIVIDE([YTD_Actual] - [YTD_Plan], [YTD_Plan], 0) * 100</code>
                    </p>

                    <p className="text-[#5F5F5F] mb-2 font-bold">Progress to Year-End:</p>
                    <p className="text-[#000000]">
                      <code>Progress_YE = DIVIDE([YTD_Actual], [YTD_Plan], 0) * 100</code>
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-green-900 mb-1">📋 Formula Notes:</p>
                    <p className="text-xs text-green-800">
                      These DAX formulas handle zero-division cases with the DIVIDE function, ensuring safe calculations across all data scenarios.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5E7EB] bg-white mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-[#5F5F5F]">
          Last Updated: April 27, 2026 | Data refreshes every 24 hours
        </div>
      </div>
    </div>
  )
}

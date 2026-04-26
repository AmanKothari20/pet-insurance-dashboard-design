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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  FunnelChart,
  Funnel,
  LabelList,
  AreaChart,
  Area,
  Treemap,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  Zap,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Target,
  Activity,
} from "lucide-react"
import Image from "next/image"

// Color palette constants (matching existing theme)
const colors = {
  solidOrange: "#F57418",
  gradientOrange1: "#FBA43B",
  gradientOrange2: "#FA9A34",
  black: "#000000",
  darkGray: "#5F5F5F",
  lightGray: "#F5F7F8",
  lightPink: "#FEBCD7",
  lightBlue: "#C4D0E6",
  lightOlive: "#ACAC92",
  lightOrange: "#FA9829",
  green: "#22C55E",
  red: "#DC2626",
  yellow: "#EAB308",
}

// ==================== KPI DATA ====================
const topKPIs = [
  {
    id: "fte-savings",
    title: "FTE Savings (Total)",
    value: "14.5",
    unit: "FTEs",
    delta: "+2.3",
    deltaPercent: "+18.8%",
    trend: "up",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "total-revenue",
    title: "Total Revenue",
    value: "$2.4M",
    unit: "",
    delta: "+$320K",
    deltaPercent: "+15.4%",
    trend: "up",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    id: "processing-time",
    title: "Avg Processing Time (P50)",
    value: "2.3",
    unit: "min",
    delta: "-0.8",
    deltaPercent: "-25.8%",
    trend: "down",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "stp-rate",
    title: "STP Rate",
    value: "78.4",
    unit: "%",
    delta: "+4.2",
    deltaPercent: "+5.7%",
    trend: "up",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: "ocr-success",
    title: "OCR Success Rate",
    value: "94.2",
    unit: "%",
    delta: "+1.8",
    deltaPercent: "+1.9%",
    trend: "up",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
]

// ==================== PERFORMANCE SECTION DATA ====================
const processingTimeByProduct = [
  { month: "Jan", ocrOnly: 4.2, fullSuite: 2.8, clarusComplete: 2.1 },
  { month: "Feb", ocrOnly: 3.9, fullSuite: 2.5, clarusComplete: 1.9 },
  { month: "Mar", ocrOnly: 3.5, fullSuite: 2.3, clarusComplete: 1.7 },
  { month: "Apr", ocrOnly: 3.2, fullSuite: 2.1, clarusComplete: 1.5 },
  { month: "May", ocrOnly: 3.0, fullSuite: 1.9, clarusComplete: 1.3 },
  { month: "Jun", ocrOnly: 2.8, fullSuite: 1.8, clarusComplete: 1.2 },
]

const mrsAccuracyData = [
  { version: "v1.0", accuracy: 82, month: "Jan" },
  { version: "v1.1", accuracy: 86, month: "Feb" },
  { version: "v1.2", accuracy: 89, month: "Mar" },
  { version: "v2.0", accuracy: 92, month: "Apr" },
  { version: "v2.1", accuracy: 94, month: "May" },
  { version: "v2.2", accuracy: 96, month: "Jun" },
]

const systemUptimeData = [
  { week: "W1", uptime: 99.92 },
  { week: "W2", uptime: 99.95 },
  { week: "W3", uptime: 99.89 },
  { week: "W4", uptime: 99.98 },
  { week: "W5", uptime: 99.94 },
  { week: "W6", uptime: 99.97 },
]

// ==================== PIPELINE & FALLOUT DATA ====================
const falloutFunnelData = [
  { name: "Claims Submitted", value: 10000, fill: colors.solidOrange },
  { name: "OCR Processed", value: 9200, fill: colors.gradientOrange1 },
  { name: "Treatment Mapped", value: 7800, fill: colors.lightOrange },
  { name: "STP Eligible", value: 6500, fill: colors.lightPink },
  { name: "Auto-Approved", value: 5200, fill: colors.lightBlue },
]

const treatmentMappingFallout = [
  { name: "Mapped", value: 82, fill: colors.green },
  { name: "Fallout", value: 18, fill: colors.red },
]

const overrideRateData = [
  { category: "Eligibility", confirmed: 85, overridden: 15 },
  { category: "Pre-Ex", confirmed: 72, overridden: 28 },
  { category: "Deductible", confirmed: 91, overridden: 9 },
  { category: "Coverage Limit", confirmed: 78, overridden: 22 },
  { category: "Waiting Period", confirmed: 88, overridden: 12 },
]

// ==================== PRODUCT & REVENUE DATA ====================
const practiceConnectData = [
  { month: "Jul", connected: 45, ocr: 55 },
  { month: "Aug", connected: 52, ocr: 48 },
  { month: "Sep", connected: 58, ocr: 42 },
  { month: "Oct", connected: 64, ocr: 36 },
  { month: "Nov", connected: 71, ocr: 29 },
  { month: "Dec", connected: 76, ocr: 24 },
  { month: "Jan", connected: 82, ocr: 18 },
  { month: "Feb", connected: 86, ocr: 14 },
  { month: "Mar", connected: 89, ocr: 11 },
]

const productAdoptionTreemap = [
  { name: "Clarus Complete", size: 42, fill: colors.solidOrange },
  { name: "OCR + Fraud", size: 25, fill: colors.lightPink },
  { name: "OCR Only", size: 18, fill: colors.lightBlue },
  { name: "Full Suite", size: 10, fill: colors.lightOlive },
  { name: "Custom Bundle", size: 5, fill: colors.lightOrange },
]

// ==================== DIAGNOSTIC TABLE DATA ====================
const mgaOnboardingData = [
  { name: "Trupanion", status: "Active", progress: 100, claims: 2845 },
  { name: "Nationwide", status: "Active", progress: 100, claims: 1923 },
  { name: "ASPCA Pet", status: "Onboarding", progress: 75, claims: 0 },
  { name: "PetFirst", status: "Active", progress: 100, claims: 1456 },
  { name: "Embrace", status: "Pending", progress: 45, claims: 0 },
]

const financialVarianceData = [
  { claimId: "CLM-78234", variance: "$1,245", reason: "Coverage Exception", reviewer: "J. Smith" },
  { claimId: "CLM-78456", variance: "$892", reason: "Pre-Ex Dispute", reviewer: "M. Johnson" },
  { claimId: "CLM-78512", variance: "$2,156", reason: "Deductible Error", reviewer: "A. Williams" },
  { claimId: "CLM-78623", variance: "$567", reason: "Policy Mismatch", reviewer: "S. Davis" },
]

export default function ClaimsAutomationDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState("30d")
  const [selectedMGA, setSelectedMGA] = useState("all")
  const [selectedProductSet, setSelectedProductSet] = useState("all")
  const [selectedClaimType, setSelectedClaimType] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState("all")
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBA43B] to-[#F57418]">
      {/* Header */}
      <header className="bg-white px-6 py-3 border-b border-[#F5F7F8] shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clarus%20-%20Full%20color-WyHkfsKMBIfHDT1HdgKN9kuIjUp9Z4.png"
              alt="Clarus Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-[#5F5F5F]">
            <span>Last Refresh: Apr 26, 2026 · 14:32 UTC</span>
            <span className="text-[#F57418] font-semibold">|</span>
            <span className="font-semibold text-[#F57418]">FY2026</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-[#F5F7F8] rounded-lg p-6 shadow-lg">
          {/* Report Headline */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#000000] to-[#FA9A34] bg-clip-text text-transparent mb-6">
            Claims Automation Dashboard
          </h1>

          {/* Slicers Pane (Global Filters) */}
          <Card className="bg-white border border-[#E5E7EB] mb-6 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#F57418] text-lg font-semibold">
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger className="w-[160px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedMGA} onValueChange={setSelectedMGA}>
                  <SelectTrigger className="w-[160px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                    <SelectValue placeholder="MGA Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All MGAs</SelectItem>
                    <SelectItem value="trupanion">Trupanion</SelectItem>
                    <SelectItem value="nationwide">Nationwide</SelectItem>
                    <SelectItem value="aspca">ASPCA Pet</SelectItem>
                    <SelectItem value="petfirst">PetFirst</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedProductSet} onValueChange={setSelectedProductSet}>
                  <SelectTrigger className="w-[160px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                    <SelectValue placeholder="Product Set" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="ocr-only">OCR Only</SelectItem>
                    <SelectItem value="fraud-only">Fraud Only</SelectItem>
                    <SelectItem value="complete">Clarus Complete</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedClaimType} onValueChange={setSelectedClaimType}>
                  <SelectTrigger className="w-[160px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                    <SelectValue placeholder="Claim Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="claim">Claim</SelectItem>
                    <SelectItem value="estimate">Estimate</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-[160px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="northeast">Northeast</SelectItem>
                    <SelectItem value="southeast">Southeast</SelectItem>
                    <SelectItem value="midwest">Midwest</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedFeedback} onValueChange={setSelectedFeedback}>
                  <SelectTrigger className="w-[180px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                    <SelectValue placeholder="Feedback Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Feedback</SelectItem>
                    <SelectItem value="available">Feedback Available</SelectItem>
                    <SelectItem value="none">No Feedback/External</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Top KPI Cards (North Star Metrics) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {topKPIs.map((kpi) => (
              <Card key={kpi.id} className="bg-white border border-[#E5E7EB] shadow-sm text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center justify-center gap-2 text-[#F57418]">
                    {kpi.icon}
                    {kpi.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#000000]">
                    {kpi.value}
                    <span className="text-lg ml-1">{kpi.unit}</span>
                  </div>
                  <p className={`text-sm flex items-center justify-center gap-1 mt-1 font-semibold ${
                    kpi.trend === "up" ? "text-green-600" : "text-green-600"
                  }`}>
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {kpi.deltaPercent} vs Last Month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#000000] mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#F57418]" />
              Performance Trends
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Processing Time by Product */}
              <Card className="bg-white border border-[#F5F7F8] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold text-base">
                    Processing Time by Product (Minutes)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={processingTimeByProduct}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fill: "#5F5F5F", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#5F5F5F", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #F57418",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: 11 }}
                        formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                      />
                      <Line type="monotone" dataKey="ocrOnly" stroke={colors.lightPink} strokeWidth={2} name="OCR Only" dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="fullSuite" stroke={colors.lightBlue} strokeWidth={2} name="Full Suite" dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="clarusComplete" stroke={colors.solidOrange} strokeWidth={2} name="Clarus Complete" dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* MRS Accuracy Over Time */}
              <Card className="bg-white border border-[#F5F7F8] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold text-base">
                    MRS Accuracy by Model Version
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={mrsAccuracyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="version" tick={{ fill: "#5F5F5F", fontSize: 12 }} />
                      <YAxis domain={[75, 100]} tick={{ fill: "#5F5F5F", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #F57418",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="accuracy"
                        stroke={colors.solidOrange}
                        fill={colors.gradientOrange1}
                        fillOpacity={0.3}
                        name="Accuracy %"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* System Uptime */}
              <Card className="bg-white border border-[#F5F7F8] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold text-base">
                    System Uptime (Target: 99.9%)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={systemUptimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="week" tick={{ fill: "#5F5F5F", fontSize: 12 }} />
                      <YAxis domain={[99.8, 100]} tick={{ fill: "#5F5F5F", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #F57418",
                        }}
                        formatter={(value: number) => [`${value.toFixed(2)}%`, "Uptime"]}
                      />
                      <Bar dataKey="uptime" fill={colors.green} name="Uptime %" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <div className="h-1 w-full bg-[#E5E7EB] rounded">
                      <div className="h-1 bg-red-500 rounded" style={{ width: "0.1%" }} />
                    </div>
                    <span className="text-xs text-[#5F5F5F] whitespace-nowrap">99.9% Target</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pipeline & Fallout Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#000000] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#F57418]" />
              Pipeline & Fallout Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Fallout Funnel */}
              <Card className="bg-white border border-[#F5F7F8] shadow-sm lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold text-base">
                    Claims Pipeline Funnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <FunnelChart>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #F57418",
                        }}
                        formatter={(value: number) => [value.toLocaleString(), "Claims"]}
                      />
                      <Funnel
                        dataKey="value"
                        data={falloutFunnelData}
                        isAnimationActive
                      >
                        <LabelList position="center" fill="#000" fontSize={11} formatter={(value: number) => value.toLocaleString()} />
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                  <div className="mt-2 space-y-1">
                    {falloutFunnelData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: item.fill }} />
                          <span className="text-[#5F5F5F]">{item.name}</span>
                        </div>
                        <span className="font-semibold text-[#000000]">{item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Mapping Fallout */}
              <Card className="bg-white border border-[#F5F7F8] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold text-base">
                    Treatment Mapping Fallout
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={treatmentMappingFallout}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {treatmentMappingFallout.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-2">
                    <div className="text-2xl font-bold text-[#000000]">82%</div>
                    <p className="text-sm text-[#5F5F5F]">Successfully Mapped</p>
                    <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                      Target: 90% - Action Required
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Override Rate */}
              <Card className="bg-white border border-[#F5F7F8] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold text-base">
                    Override Rate by Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={overrideRateData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: "#5F5F5F", fontSize: 11 }} />
                      <YAxis dataKey="category" type="category" tick={{ fill: "#5F5F5F", fontSize: 11 }} width={90} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #F57418",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: 11 }}
                        formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                      />
                      <Bar dataKey="confirmed" stackId="a" fill={colors.green} name="Confirmed" />
                      <Bar dataKey="overridden" stackId="a" fill={colors.red} name="Overridden" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product & Revenue Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#000000] mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#F57418]" />
              Product & Adoption
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Practice Connect Rate */}
              <Card className="bg-white border border-[#F5F7F8] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold text-base">
                    Practice Connect Rate (Last 12 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={practiceConnectData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fill: "#5F5F5F", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#5F5F5F", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #F57418",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: 11 }}
                        formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                      />
                      <Bar dataKey="connected" stackId="a" fill={colors.solidOrange} name="Connected Practice" />
                      <Bar dataKey="ocr" stackId="a" fill={colors.lightBlue} name="Source: OCR" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Product Combination Adoption */}
              <Card className="bg-white border border-[#F5F7F8] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold text-base">
                    Product Bundle Adoption (MGA Base)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <Treemap
                      data={productAdoptionTreemap}
                      dataKey="size"
                      aspectRatio={4 / 3}
                      stroke="#fff"
                      fill="#F57418"
                    >
                      {productAdoptionTreemap.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Treemap>
                  </ResponsiveContainer>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {productAdoptionTreemap.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.fill }} />
                        <span className="text-[#5F5F5F]">{item.name}: {item.size}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Diagnostic Data Table (Collapsible) */}
          <Collapsible open={isDiagnosticOpen} onOpenChange={setIsDiagnosticOpen}>
            <Card className="bg-white border border-[#E5E7EB] shadow-sm">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-[#F5F7F8] transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#000000] font-semibold text-base flex items-center gap-2">
                      Diagnostic Data (Lower Priority)
                    </CardTitle>
                    {isDiagnosticOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#5F5F5F]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#5F5F5F]" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {/* MGA Onboarding Progress */}
                  <div>
                    <h4 className="font-semibold text-[#000000] mb-3">MGA Onboarding Progress</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                            <th className="text-left py-2 px-3 font-semibold text-[#000000]">MGA Name</th>
                            <th className="text-left py-2 px-3 font-semibold text-[#000000]">Status</th>
                            <th className="text-left py-2 px-3 font-semibold text-[#000000]">Progress</th>
                            <th className="text-right py-2 px-3 font-semibold text-[#000000]">Claims Processed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mgaOnboardingData.map((row, idx) => (
                            <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                              <td className="py-2 px-3 text-[#000000] font-medium">{row.name}</td>
                              <td className="py-2 px-3">
                                <Badge className={
                                  row.status === "Active" ? "bg-green-100 text-green-800" :
                                  row.status === "Onboarding" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-gray-100 text-gray-800"
                                }>
                                  {row.status}
                                </Badge>
                              </td>
                              <td className="py-2 px-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 bg-[#E5E7EB] rounded-full h-2">
                                    <div
                                      className="bg-[#F57418] h-2 rounded-full"
                                      style={{ width: `${row.progress}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-[#5F5F5F]">{row.progress}%</span>
                                </div>
                              </td>
                              <td className="py-2 px-3 text-right text-[#000000]">{row.claims.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Financial Variance */}
                  <div>
                    <h4 className="font-semibold text-[#000000] mb-3">High Variance Claims (Finance Review)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                            <th className="text-left py-2 px-3 font-semibold text-[#000000]">Claim ID</th>
                            <th className="text-left py-2 px-3 font-semibold text-[#000000]">Variance</th>
                            <th className="text-left py-2 px-3 font-semibold text-[#000000]">Reason</th>
                            <th className="text-left py-2 px-3 font-semibold text-[#000000]">Reviewer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {financialVarianceData.map((row, idx) => (
                            <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                              <td className="py-2 px-3 text-[#F57418] font-medium">{row.claimId}</td>
                              <td className="py-2 px-3 text-red-600 font-semibold">{row.variance}</td>
                              <td className="py-2 px-3 text-[#5F5F5F]">{row.reason}</td>
                              <td className="py-2 px-3 text-[#000000]">{row.reviewer}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-[#5F5F5F]">
            Last Updated: April 26, 2026 | Data refreshes every 24 hours
          </div>
        </div>
      </main>
    </div>
  )
}

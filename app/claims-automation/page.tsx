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
  LineChart,
  Line,
  FunnelChart,
  Funnel,
  LabelList,
  DonutChart,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  ScatterChart,
  Scatter,
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
  Users,
  Clock,
  CheckCircle2,
  Zap,
  AlertCircle,
  Info,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react"

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
    title: "Claims Processing Time",
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

// Global Filters Data
const mgaOptions = [
  { label: "All MGAs", value: "all" },
  { label: "Trupanion", value: "trupanion" },
  { label: "Nationwide", value: "nationwide" },
  { label: "ASPCA Pet", value: "aspca" },
  { label: "PetFirst", value: "petfirst" },
]

const productOptions = [
  { label: "All Products", value: "all" },
  { label: "OCR Only", value: "ocr-only" },
  { label: "OCR + Claims Automation", value: "ocr-claims" },
  { label: "Full Suite", value: "full-suite" },
]

// PAGE 1: Executive Overview Data
const automationPipelineData = [
  { name: "Submission", value: 10000 },
  { name: "OCR Processing", value: 9840 },
  { name: "Treatment Mapping", value: 8750 },
  { name: "Rule Engine", value: 7920 },
  { name: "Auto-Approved", value: 7450 },
]

const ocrSuccessData = [
  { month: "Jan", ocrSuccess: 96.2, caladan: 94.8, fallback: 3.1, mrsAccuracy: 97.5 },
  { month: "Feb", ocrSuccess: 96.8, caladan: 95.2, fallback: 2.8, mrsAccuracy: 97.8 },
  { month: "Mar", ocrSuccess: 97.1, caladan: 95.8, fallback: 2.5, mrsAccuracy: 98.1 },
  { month: "Apr", ocrSuccess: 97.4, caladan: 96.2, fallback: 2.2, mrsAccuracy: 98.3 },
  { month: "May", ocrSuccess: 97.6, caladan: 96.5, fallback: 2.0, mrsAccuracy: 98.5 },
]

const processingTimeByProduct = [
  { product: "OCR Only", time: 8, savings: 2.3 },
  { product: "OCR + Claims", time: 24, savings: 8.5 },
  { product: "Full Suite", time: 42, savings: 12.5 },
]

const mgaOnboardingData = [
  { name: "Trupanion", connected: 12, target: 12, status: "Complete" },
  { name: "Nationwide", connected: 10, target: 12, status: "In Progress" },
  { name: "ASPCA Pet", connected: 8, target: 12, status: "In Progress" },
  { name: "PetFirst", connected: 6, target: 12, status: "Planning" },
  { name: "Embrace", connected: 3, target: 12, status: "Planning" },
]

// PAGE 2: Finance Deep-Dive Data
const revenueByProductMGA = [
  { mga: "Trupanion", ocrOnly: 124500, ocrClaims: 342800, fullSuite: 856200 },
  { mga: "Nationwide", ocrOnly: 98700, ocrClaims: 256400, fullSuite: 543100 },
  { mga: "PetFirst", ocrOnly: 76300, ocrClaims: 189600, fullSuite: 421800 },
  { mga: "ASPCA Pet", ocrOnly: 54200, ocrClaims: 123400, fullSuite: 289500 },
  { mga: "Embrace", ocrOnly: 32100, ocrClaims: 76800, fullSuite: 145600 },
]

const mgaRuleAlignmentData = [
  { mga: "Trupanion", passThrough: 87.2, treatmentMapping: 18.5, preEx: 3.2, policyMismatch: 1.8 },
  { mga: "Nationwide", passThrough: 81.4, treatmentMapping: 24.1, preEx: 5.3, policyMismatch: 2.9 },
  { mga: "ASPCA Pet", passThrough: 78.9, treatmentMapping: 28.7, preEx: 7.1, policyMismatch: 4.2 },
  { mga: "PetFirst", passThrough: 84.6, treatmentMapping: 21.3, preEx: 4.2, policyMismatch: 2.1 },
]

const claimDetailData = [
  { id: "CLM-82341", mga: "Trupanion", product: "Full Suite", time: 28, status: "STP Complete", override: "None", variance: "+$0", fraud: false, audit: "Complete" },
  { id: "CLM-82342", mga: "Nationwide", product: "OCR + Claims", time: 45, status: "Clarus Complete", override: "Treatment Mapping", variance: "+$125", fraud: false, audit: "Complete" },
  { id: "CLM-82343", mga: "PetFirst", product: "Full Suite", time: 32, status: "STP Complete", override: "None", variance: "-$45", fraud: false, audit: "Complete" },
  { id: "CLM-82344", mga: "Trupanion", product: "OCR + Claims", time: 52, status: "MGA Stopped", override: "Pre-Ex", variance: "$0", fraud: true, audit: "Incomplete" },
  { id: "CLM-82345", mga: "ASPCA Pet", product: "Full Suite", time: 38, status: "STP Complete", override: "None", variance: "+$230", fraud: false, audit: "Complete" },
  { id: "CLM-82346", mga: "Nationwide", product: "OCR Only", time: 18, status: "Clarus Complete", override: "None", variance: "$0", fraud: false, audit: "Complete" },
  { id: "CLM-82347", mga: "PetFirst", product: "Full Suite", time: 35, status: "STP Complete", override: "Policy Mismatch", variance: "-$340", fraud: false, audit: "Complete" },
  { id: "CLM-82348", mga: "Trupanion", product: "Full Suite", time: 30, status: "STP Complete", override: "None", variance: "+$0", fraud: false, audit: "Complete" },
]

const invoiceAlterationData = [
  { name: "Clean Invoices", value: 9234, fill: "#10b981" },
  { name: "SUI Flagged", value: 452, fill: "#ef4444" },
]

// KPI Summary Data
const executiveKPIs = {
  stpRate: "74.5%",
  clarusRate: "88.2%",
  procTime: "42 sec",
  procTimeDetails: "P50: 28s | P95: 58s | P99: 89s",
  estimateRate: "91.0%",
  fteSavings: "142",
  humanMinsSaved: "12.5",
  uptime: "99.95%",
  targetUptime: "99.9%",
}

const financeKPIs = {
  financialAccuracy: "96.4%",
  netVariance: "$12,450",
  overpaid: "$8,100",
  underpaid: "$4,350",
  billingAccuracy: "99.8%",
  feedbackCoverage: "85.2%",
}

// KPI Card Component
function KPICard({ title, value, subtitle, icon: Icon, delta, alert, tooltip }) {
  return (
    <Card className="bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-[#5F5F5F] font-medium text-sm">{title}</CardTitle>
          {alert && <AlertCircle className="w-4 h-4 text-[#F57418]" />}
          {!alert && Icon && <Icon className="w-5 h-5 text-[#F57418]" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-[#000000]">{value}</span>
            {delta && (
              <span className={`text-xs font-semibold ${delta.includes("+") ? "text-green-600" : "text-red-600"}`}>
                {delta}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-[#5F5F5F]">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export default function PowerBIReport() {
  const [currentPage, setCurrentPage] = useState("executive")
  const [dateRange, setDateRange] = useState("30d")
  const [selectedMGA, setSelectedMGA] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState("all")

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#000000]">Clarus Platform</h1>
              <p className="text-sm text-[#5F5F5F]">Power BI Analytics Report</p>
            </div>
            <div className="text-xs text-[#5F5F5F]">
              Last Updated: May 18, 2026 | Data refreshes every 24 hours
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1 border-b border-[#E5E7EB] mb-4">
            <button
              onClick={() => setCurrentPage("executive")}
              className={`px-4 py-2 font-semibold text-sm transition-colors border-b-2 ${
                currentPage === "executive"
                  ? "text-[#F57418] border-[#F57418]"
                  : "text-[#5F5F5F] border-transparent hover:text-[#000000]"
              }`}
            >
              Executive Overview
            </button>
            <button
              onClick={() => setCurrentPage("finance")}
              className={`px-4 py-2 font-semibold text-sm transition-colors border-b-2 ${
                currentPage === "finance"
                  ? "text-[#F57418] border-[#F57418]"
                  : "text-[#5F5F5F] border-transparent hover:text-[#000000]"
              }`}
            >
              Finance & Claims Deep-Dive
            </button>
          </div>

          {/* Global Slicers */}
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#5F5F5F] uppercase tracking-wide">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[160px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#5F5F5F] uppercase tracking-wide">MGA / System of Record</label>
              <Select value={selectedMGA} onValueChange={setSelectedMGA}>
                <SelectTrigger className="w-[200px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mgaOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#5F5F5F] uppercase tracking-wide">Product Set</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="w-[200px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {productOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* PAGE 1: EXECUTIVE OVERVIEW */}
        {currentPage === "executive" && (
          <div className="space-y-6">
            {/* Top KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <KPICard
                title="STP Rate"
                value={executiveKPIs.stpRate}
                subtitle="Claim automation completed / submitted"
                icon={CheckCircle2}
                alert={true}
              />
              <KPICard
                title="Clarus-Complete Rate"
                value={executiveKPIs.clarusRate}
                subtitle="Internal automation completion"
                icon={Zap}
              />
              <KPICard
                title="Avg Claims Processing Time"
                value={executiveKPIs.procTime}
                subtitle={executiveKPIs.procTimeDetails}
                icon={Clock}
              />
              <KPICard
                title="Estimate Completion Rate"
                value={executiveKPIs.estimateRate}
                subtitle="Estimates completing intended scope"
                icon={CheckCircle2}
              />
              <KPICard
                title="Total Savings"
                value={executiveKPIs.fteSavings}
                subtitle="FTEs saved | 12.5 mins/claim"
                icon={DollarSign}
              />
              <KPICard
                title="System Uptime"
                value={executiveKPIs.uptime}
                subtitle={`Target: ${executiveKPIs.targetUptime}`}
                icon={Zap}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Automation Pipeline Funnel */}
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#F57418]" />
                    Automation Pipeline Health & Bottlenecks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <FunnelChart>
                      <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                      <Funnel dataKey="value" data={automationPipelineData}>
                        <LabelList dataKey="name" fill="#000000" position="insideLeft" />
                        {automationPipelineData.map((_, idx) => (
                          <Cell key={`cell-${idx}`} fill={["#10b981", "#3b82f6", "#f59e0b", "#f87171", "#8b5cf6"][idx]} />
                        ))}
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* OCR & MRS Accuracy */}
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold">Core Intelligence & OCR Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={ocrSuccessData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#5F5F5F" />
                      <YAxis stroke="#5F5F5F" />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB" }} />
                      <Legend />
                      <Bar dataKey="ocrSuccess" fill="#10b981" name="OCR Success %" />
                      <Bar dataKey="caladan" fill="#3b82f6" name="Caladan Throughput %" />
                      <Bar dataKey="fallback" fill="#ef4444" name="Fallback %" />
                      <Line type="monotone" dataKey="mrsAccuracy" stroke="#F57418" name="MRS Accuracy %" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Efficiency Gain by Product */}
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold">Efficiency Gain & Processing Speed by Product Set</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={processingTimeByProduct}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="product" stroke="#5F5F5F" />
                      <YAxis yAxisId="left" stroke="#5F5F5F" label={{ value: "Processing Time (sec)", angle: -90, position: "insideLeft" }} />
                      <YAxis yAxisId="right" orientation="right" stroke="#5F5F5F" label={{ value: "Human Mins Saved", angle: 90, position: "insideRight" }} />
                      <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB" }} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="time" fill="#3b82f6" name="Avg Processing Time (sec)" />
                      <Bar yAxisId="right" dataKey="savings" fill="#10b981" name="Human Minutes Saved" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* MGA Onboarding Progress */}
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold">Product Adoption & Onboarding Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mgaOnboardingData.map((mga) => (
                      <div key={mga.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-[#000000]">{mga.name}</span>
                          <Badge className={mga.status === "Complete" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                            {mga.connected}/{mga.target}
                          </Badge>
                        </div>
                        <div className="w-full bg-[#E5E7EB] rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#F57418] h-full transition-all"
                            style={{ width: `${(mga.connected / mga.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* PAGE 2: FINANCE & CLAIMS DEEP-DIVE */}
        {currentPage === "finance" && (
          <div className="space-y-6">
            {/* Financial KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Financial Accuracy Rate"
                value={financeKPIs.financialAccuracy}
                subtitle="1 - (variance / completed)"
                icon={CheckCircle2}
              />
              <KPICard
                title="Net Financial Variance"
                value={financeKPIs.netVariance}
                subtitle={`Overpaid: ${financeKPIs.overpaid} | Underpaid: ${financeKPIs.underpaid}`}
                icon={DollarSign}
              />
              <KPICard
                title="Billing Accuracy"
                value={financeKPIs.billingAccuracy}
                subtitle="1 - (disputes / closed)"
                icon={CheckCircle2}
              />
              <KPICard
                title="Feedback Loop Coverage"
                value={financeKPIs.feedbackCoverage}
                subtitle="Claim IDs with feedback / completed"
                icon={Users}
              />
            </div>

            {/* Finance Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue by Product by MGA */}
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold">Revenue by Product by MGA</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueByProductMGA} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" stroke="#5F5F5F" />
                      <YAxis dataKey="mga" type="category" stroke="#5F5F5F" width={100} />
                      <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}k`} contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB" }} />
                      <Legend />
                      <Bar dataKey="ocrOnly" fill="#10b981" name="OCR Only" />
                      <Bar dataKey="ocrClaims" fill="#3b82f6" name="OCR + Claims" />
                      <Bar dataKey="fullSuite" fill="#F57418" name="Full Suite" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* MGA Rule Alignment & Overrides */}
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold">MGA Rule Alignment & Overrides</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mgaRuleAlignmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="mga" stroke="#5F5F5F" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#5F5F5F" />
                      <Tooltip formatter={(value) => `${value.toFixed(1)}%`} contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB" }} />
                      <Legend />
                      <Bar dataKey="passThrough" fill="#10b981" name="Pass-Through %" />
                      <Bar dataKey="treatmentMapping" fill="#f59e0b" name="Treatment Mapping %" />
                      <Bar dataKey="preEx" fill="#f87171" name="Pre-Ex %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Invoice Alteration Detection */}
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold">Risk & Fraud Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={invoiceAlterationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {invoiceAlterationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => value.toLocaleString()} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Claim Audit Coverage Gauge */}
              <Card className="bg-white border border-[#E5E7EB] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#000000] font-semibold">Claim Audit Coverage</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-250">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#F57418]">87.3%</div>
                    <div className="text-sm text-[#5F5F5F] mt-2">Claims with Complete Audit Trail</div>
                    <div className="text-xs text-[#5F5F5F] mt-4">Target: 95% | Current: 87.3%</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Claim-Level Detail Audit Table */}
            <Card className="bg-white border border-[#E5E7EB] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#000000] font-semibold flex items-center justify-between">
                  <span>Claim-Level Detail Audit Table</span>
                  <Badge className="bg-[#F57418] text-white">{claimDetailData.length} Claims</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b-2 border-[#F57418] bg-[#FEF3E7]">
                        <th className="text-left py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Claim ID</th>
                        <th className="text-left py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Date</th>
                        <th className="text-left py-2 px-2 font-bold text-[#000000] whitespace-nowrap">MGA</th>
                        <th className="text-left py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Pet Name</th>
                        <th className="text-left py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Species</th>
                        <th className="text-left py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Breed</th>
                        <th className="text-left py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Type</th>
                        <th className="text-left py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Product</th>
                        <th className="text-right py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Invoice</th>
                        <th className="text-right py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Approved</th>
                        <th className="text-center py-2 px-2 font-bold text-[#000000] whitespace-nowrap">STP Status</th>
                        <th className="text-center py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Claims Proc. Time</th>
                        <th className="text-center py-2 px-2 font-bold text-[#000000] whitespace-nowrap">OCR Conf.</th>
                        <th className="text-left py-2 px-2 font-bold text-[#000000] whitespace-nowrap">Region</th>
                      </tr>
                    </thead>
                    <tbody>
                      {claimDetailData.map((claim, idx) => (
                        <tr key={idx} className={`border-b border-[#E5E7EB] hover:bg-[#FEF3E7] transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                          <td className="py-2 px-3 text-[#F57418] font-semibold hover:underline cursor-pointer">{claim.id}</td>
                          <td className="py-2 px-3 text-[#000000] font-medium">{claim.mga}</td>
                          <td className="py-2 px-3 text-[#5F5F5F]">{claim.product}</td>
                          <td className="py-2 px-3 text-center text-[#000000]">{claim.time}</td>
                          <td className="py-2 px-3 text-center">
                            <Badge className={
                              claim.status === "STP Complete" ? "bg-green-100 text-green-800" :
                              claim.status === "Clarus Complete" ? "bg-blue-100 text-blue-800" :
                              claim.status === "MGA Stopped" ? "bg-amber-100 text-amber-800" :
                              "bg-red-100 text-red-800"
                            }>
                              {claim.status}
                            </Badge>
                          </td>
                          <td className="py-2 px-3 text-[#5F5F5F]">{claim.override}</td>
                          <td className="py-2 px-3 text-right font-semibold">
                            <span className={claim.variance.startsWith("+") ? "text-red-600" : claim.variance.startsWith("-") ? "text-green-600" : "text-[#000000]"}>
                              {claim.variance}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center">
                            {claim.fraud ? <span className="text-red-600 font-bold">⚠</span> : <span className="text-green-600">✓</span>}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <Badge className={claim.audit === "Complete" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                              {claim.audit}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* MGA Performance Matrix */}
            <Card className="bg-white border border-[#E5E7EB] shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#000000] font-semibold text-base flex items-center justify-between">
                  <span>MGA Performance Matrix</span>
                  <Badge className="bg-[#F57418] text-white">{mgaPerformanceMatrix.length} MGAs</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b-2 border-[#F57418] bg-[#FEF3E7]">
                        <th className="text-left py-2 px-3 font-bold text-[#000000]">MGA Name</th>
                        <th className="text-right py-2 px-3 font-bold text-[#000000]">Total Claims</th>
                        <th className="text-center py-2 px-3 font-bold text-[#000000]">STP Rate</th>
                        <th className="text-center py-2 px-3 font-bold text-[#000000]">Claims Proc. Time</th>
                        <th className="text-center py-2 px-3 font-bold text-[#000000]">OCR Success</th>
                        <th className="text-center py-2 px-3 font-bold text-[#000000]">Override Rate</th>
                        <th className="text-right py-2 px-3 font-bold text-[#000000]">Revenue</th>
                        <th className="text-right py-2 px-3 font-bold text-[#000000]">FTE Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mgaPerformanceMatrix.map((mga, idx) => (
                        <tr key={idx} className={`border-b border-[#E5E7EB] hover:bg-[#FEF3E7] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                          <td className="py-2 px-3 text-[#000000] font-semibold">{mga.mga}</td>
                          <td className="py-2 px-3 text-right text-[#000000]">{mga.totalClaims.toLocaleString()}</td>
                          <td className="py-2 px-3 text-center">
                            <span className={parseFloat(mga.stpRate) >= 80 ? "text-green-600 font-semibold" : parseFloat(mga.stpRate) >= 75 ? "text-yellow-600" : "text-red-600"}>
                              {mga.stpRate}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center text-[#5F5F5F]">{mga.avgProcessingTime}</td>
                          <td className="py-2 px-3 text-center">
                            <span className={parseFloat(mga.ocrSuccessRate) >= 95 ? "text-green-600 font-semibold" : parseFloat(mga.ocrSuccessRate) >= 90 ? "text-yellow-600" : "text-red-600"}>
                              {mga.ocrSuccessRate}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className={parseFloat(mga.overrideRate) <= 15 ? "text-green-600" : parseFloat(mga.overrideRate) <= 20 ? "text-yellow-600" : "text-red-600 font-semibold"}>
                              {mga.overrideRate}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right text-[#000000] font-semibold">{mga.revenue}</td>
                          <td className="py-2 px-3 text-right text-[#F57418] font-bold">{mga.fteSavings}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-[#F57418] bg-[#FEF3E7] font-bold">
                        <td className="py-2 px-3 text-[#000000]">TOTAL</td>
                        <td className="py-2 px-3 text-right text-[#000000]">{mgaPerformanceMatrix.reduce((sum, m) => sum + m.totalClaims, 0).toLocaleString()}</td>
                        <td className="py-2 px-3 text-center text-[#000000]">78.4%</td>
                        <td className="py-2 px-3 text-center text-[#000000]">2.3 min</td>
                        <td className="py-2 px-3 text-center text-[#000000]">94.2%</td>
                        <td className="py-2 px-3 text-center text-[#000000]">17.4%</td>
                        <td className="py-2 px-3 text-right text-[#000000]">$2,759,370</td>
                        <td className="py-2 px-3 text-right text-[#F57418]">13.2</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

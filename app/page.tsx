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
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, PawPrint, FileText } from "lucide-react"
import Image from "next/image"

// Color palette constants
const colors = {
  // Primary
  solidOrange: "#F57418",
  gradientOrange1: "#FBA43B",
  gradientOrange2: "#FA9A34",
  black: "#000000",
  darkGray: "#5F5F5F",
  lightGray: "#F5F7F8",
  // Secondary
  lightPink: "#FEBCD7",
  lightBlue: "#C4D0E6",
  lightOlive: "#ACAC92",
  lightOrange: "#FA9829",
}

// Dummy data for charts
const claimsData = [
  { category: "Dogs", approved: 4.2, pending: 2.8, denied: 1.5 },
  { category: "Cats", approved: 3.8, pending: 2.1, denied: 1.2 },
  { category: "Birds", approved: 1.5, pending: 0.9, denied: 0.5 },
  { category: "Exotic", approved: 2.1, pending: 1.4, denied: 0.8 },
]

const premiumData = [
  { month: "Jan", premium: 2.4 },
  { month: "Feb", premium: 2.8 },
  { month: "Mar", premium: 3.1 },
  { month: "Apr", premium: 2.9 },
  { month: "May", premium: 3.5 },
  { month: "Jun", premium: 4.2 },
]

const policyDistribution = [
  { name: "Basic", value: 35, color: "#FEBCD7" },
  { name: "Standard", value: 40, color: "#C4D0E6" },
  { name: "Premium", value: 25, color: "#ACAC92" },
]

const regionData = [
  { region: "Northeast", policies: 4.5, claims: 2.8, revenue: 3.2 },
  { region: "Southeast", policies: 3.8, claims: 2.2, revenue: 2.8 },
  { region: "Midwest", policies: 3.2, claims: 1.9, revenue: 2.4 },
  { region: "West", policies: 5.1, claims: 3.1, revenue: 3.8 },
]

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedPetType, setSelectedPetType] = useState("all")
  const [selectedPolicyType, setSelectedPolicyType] = useState("all")

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
            <span>Last Refresh: Apr 6, 2026 · 09:41 UTC</span>
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
            Claims Automation Reporting
          </h1>

          {/* Slicers Pane */}
          <Card className="bg-white border border-[#E5E7EB] mb-6 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#F57418] text-lg font-semibold">
                Slicers Pane (Dimensions)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-[180px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
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

                <Select value={selectedPetType} onValueChange={setSelectedPetType}>
                  <SelectTrigger className="w-[180px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                    <SelectValue placeholder="Pet Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pet Types</SelectItem>
                    <SelectItem value="dogs">Dogs</SelectItem>
                    <SelectItem value="cats">Cats</SelectItem>
                    <SelectItem value="birds">Birds</SelectItem>
                    <SelectItem value="exotic">Exotic</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPolicyType} onValueChange={setSelectedPolicyType}>
                  <SelectTrigger className="w-[180px] bg-[#F5F7F8] border border-[#F57418] text-[#000000]">
                    <SelectValue placeholder="Policy Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Policies</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white border border-[#E5E7EB] shadow-sm text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center justify-center gap-2 text-[#F57418]">
                  <DollarSign className="w-5 h-5" />
                  Total Premiums
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#000000]">$ 18.9 M</div>
                <p className="text-sm text-[#5F5F5F] flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  +12.5% vs Last Month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-[#E5E7EB] shadow-sm text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center justify-center gap-2 text-[#F57418]">
                  <FileText className="w-5 h-5" />
                  Claims Processed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#000000]">$ 12.4 M</div>
                <p className="text-sm text-[#5F5F5F] flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  +8.3% vs Last Month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-[#E5E7EB] shadow-sm text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center justify-center gap-2 text-[#F57418]">
                  <Users className="w-5 h-5" />
                  Active Policies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#000000]">$ 45.2 K</div>
                <p className="text-sm text-[#5F5F5F] flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  +15.7% vs Last Quarter
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-[#E5E7EB] shadow-sm text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center justify-center gap-2 text-[#F57418]">
                  <PawPrint className="w-5 h-5" />
                  Claim Ratio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#000000]">65.6 %</div>
                <p className="text-sm text-[#5F5F5F] flex items-center justify-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  -2.1% vs Last Month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Claims by Pet Type */}
            <Card className="bg-white border border-[#F5F7F8] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#000000] font-semibold">
                  Claims by Pet Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={claimsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="category" tick={{ fill: "#5F5F5F" }} />
                    <YAxis tick={{ fill: "#5F5F5F" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #F57418",
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: "#000000" }}
                      formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                    />
                    <Bar dataKey="approved" fill="#FEBCD7" name="Approved" />
                    <Bar dataKey="pending" fill="#C4D0E6" name="Pending" />
                    <Bar dataKey="denied" fill="#ACAC92" name="Denied" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Policy Distribution */}
            <Card className="bg-white border border-[#F5F7F8] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#000000] font-semibold">
                  Policy Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={policyDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {policyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #F57418",
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: "#000000" }}
                      formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Premium Trend */}
            <Card className="bg-white border border-[#F5F7F8] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#000000] font-semibold">
                  Monthly Premium Trend ($ Millions)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={premiumData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fill: "#5F5F5F" }} />
                    <YAxis tick={{ fill: "#5F5F5F" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #F57418",
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: "#000000" }}
                      formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                    />
                    <Line
                      type="monotone"
                      dataKey="premium"
                      stroke="#FA9829"
                      strokeWidth={3}
                      dot={{ fill: "#FA9829", strokeWidth: 2 }}
                      name="Premium"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Regional Performance */}
            <Card className="bg-white border border-[#F5F7F8] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#000000] font-semibold">
                  Regional Performance ($ Millions)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="region" tick={{ fill: "#5F5F5F" }} />
                    <YAxis tick={{ fill: "#5F5F5F" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #F57418",
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: "#000000" }}
                      formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                    />
                    <Bar dataKey="policies" fill="#FEBCD7" name="Policies" />
                    <Bar dataKey="claims" fill="#C4D0E6" name="Claims" />
                    <Bar dataKey="revenue" fill="#ACAC92" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-[#5F5F5F]">
            Last Updated: April 6, 2026 | Data refreshes every 24 hours
          </div>
        </div>
      </main>
    </div>
  )
}

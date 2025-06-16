"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Area } from "recharts"

const chartData = [
  {
    date: "1 Jun 2025",
    medianCompRate: 2200,
    upperBound: 2400,
    lowerBound: 1600,
    marketDemand: 60,
    myHotelRate: 680,
  },
  {
    date: "3 Jun 2025",
    medianCompRate: 2180,
    upperBound: 2350,
    lowerBound: 1580,
    marketDemand: 58,
    myHotelRate: 680,
  },
  {
    date: "5 Jun 2025",
    medianCompRate: 2160,
    upperBound: 2320,
    lowerBound: 1560,
    marketDemand: 56,
    myHotelRate: 680,
  },
  {
    date: "7 Jun 2025",
    medianCompRate: 2240,
    upperBound: 2420,
    lowerBound: 1640,
    marketDemand: 62,
    myHotelRate: 680,
  },
  {
    date: "9 Jun 2025",
    medianCompRate: 2300,
    upperBound: 2500,
    lowerBound: 1720,
    marketDemand: 30,
    myHotelRate: 680,
  },
  {
    date: "11 Jun 2025",
    medianCompRate: 2280,
    upperBound: 2480,
    lowerBound: 1700,
    marketDemand: 32,
    myHotelRate: 680,
  },
  {
    date: "13 Jun 2025",
    medianCompRate: 2260,
    upperBound: 2460,
    lowerBound: 1680,
    marketDemand: 34,
    myHotelRate: 680,
  },
  {
    date: "15 Jun 2025",
    medianCompRate: 2200,
    upperBound: 2400,
    lowerBound: 1620,
    marketDemand: 25,
    myHotelRate: 680,
  },
  {
    date: "17 Jun 2025",
    medianCompRate: 2180,
    upperBound: 2380,
    lowerBound: 1600,
    marketDemand: 26,
    myHotelRate: 680,
  },
  {
    date: "19 Jun 2025",
    medianCompRate: 2160,
    upperBound: 2360,
    lowerBound: 1580,
    marketDemand: 25,
    myHotelRate: 680,
  },
  {
    date: "21 Jun 2025",
    medianCompRate: 2200,
    upperBound: 2400,
    lowerBound: 1620,
    marketDemand: 45,
    myHotelRate: 680,
  },
  {
    date: "23 Jun 2025",
    medianCompRate: 2220,
    upperBound: 2420,
    lowerBound: 1640,
    marketDemand: 47,
    myHotelRate: 680,
  },
  {
    date: "25 Jun 2025",
    medianCompRate: 2180,
    upperBound: 2380,
    lowerBound: 1600,
    marketDemand: 35,
    myHotelRate: 680,
  },
  {
    date: "27 Jun 2025",
    medianCompRate: 2160,
    upperBound: 2360,
    lowerBound: 1580,
    marketDemand: 30,
    myHotelRate: 680,
  },
  {
    date: "29 Jun 2025",
    medianCompRate: 2140,
    upperBound: 2340,
    lowerBound: 1560,
    marketDemand: 28,
    myHotelRate: 680,
  },
]

// Custom component to render area between two lines
const RateSpreadArea = (props: any) => {
  const { payload, points } = props
  if (!points || points.length < 2) return null

  const upperPoints = points[0]
  const lowerPoints = points[1]

  if (!upperPoints || !lowerPoints) return null

  // Create path for the area between upper and lower bounds
  let pathData = `M ${upperPoints[0].x} ${upperPoints[0].y}`

  // Draw upper line
  for (let i = 1; i < upperPoints.length; i++) {
    pathData += ` L ${upperPoints[i].x} ${upperPoints[i].y}`
  }

  // Draw to lower line (reverse order)
  for (let i = lowerPoints.length - 1; i >= 0; i--) {
    pathData += ` L ${lowerPoints[i].x} ${lowerPoints[i].y}`
  }

  pathData += " Z"

  return <path d={pathData} fill="rgba(255, 193, 7, 0.3)" />
}

export function RateTrendGraph() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Rate spread</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            medianCompRate: {
              label: "Median comp rate",
              color: "hsl(142, 76%, 36%)",
            },
            marketDemand: {
              label: "Market demand",
              color: "hsl(220, 14%, 60%)",
            },
            myHotelRate: {
              label: "Vakkaru Maldives - 30 percent off on seaplane t...",
              color: "hsl(221, 83%, 53%)",
            },
            soneva: {
              label: "Soneva Fushi",
              color: "hsl(220, 14%, 80%)",
            },
            anantara: {
              label: "Anantara Kihavah Maldives Villas",
              color: "hsl(220, 14%, 75%)",
            },
            fourSeasons: {
              label: "Four Seasons Resort Maldives at Landaa Giraavaru",
              color: "hsl(220, 14%, 70%)",
            },
            joali: {
              label: "JOALI Maldives",
              color: "hsl(220, 14%, 65%)",
            },
            oneOnly: {
              label: "One&Only Reethi Rah",
              color: "hsl(220, 14%, 60%)",
            },
            sixSenses: {
              label: "Six Senses Laamu",
              color: "hsl(220, 14%, 55%)",
            },
          }}
          className="h-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              {" "}
              {/* Adjusted margins */}
              <defs>
                <linearGradient id="rateSpreadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255, 193, 7, 0.4)" />
                  <stop offset="100%" stopColor="rgba(255, 193, 7, 0.1)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                yAxisId="price"
                orientation="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={(value) =>
                  `$ ${(value / 1000).toFixed(1)},${(value % 1000).toString().padStart(3, "0")}`
                }
                domain={[600, 2800]}
              />
              <YAxis
                yAxisId="demand"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={(value) => `${value}%`}
                domain={[20, 70]}
              />
              {/* Rate spread area between upper and lower bounds */}
              <Area
                yAxisId="price"
                dataKey="upperBound"
                fill="url(#rateSpreadGradient)"
                stroke="none"
                stackId="spread"
              />
              <Area yAxisId="price" dataKey="lowerBound" fill="white" stroke="none" stackId="spread" />
              {/* Market demand bars */}
              <Bar
                yAxisId="demand"
                dataKey="marketDemand"
                fill="var(--color-marketDemand)"
                opacity={0.6}
                radius={[2, 2, 0, 0]}
              />
              {/* Median comp rate line */}
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="medianCompRate"
                stroke="var(--color-medianCompRate)"
                strokeWidth={3}
                dot={{ fill: "var(--color-medianCompRate)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "var(--color-medianCompRate)", strokeWidth: 2 }}
              />
              {/* My hotel rate line */}
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="myHotelRate"
                stroke="var(--color-myHotelRate)"
                strokeWidth={3}
                dot={{ fill: "var(--color-myHotelRate)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "var(--color-myHotelRate)", strokeWidth: 2 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => {
                      if (name === "marketDemand") {
                        return [`${value}%`, "Market demand"]
                      }
                      if (name === "upperBound") {
                        return [`$${value}`, "Upper bound"]
                      }
                      if (name === "lowerBound") {
                        return [`$${value}`, "Lower bound"]
                      }
                      return [`$${value}`, name]
                    }}
                  />
                }
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="line"
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px",
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

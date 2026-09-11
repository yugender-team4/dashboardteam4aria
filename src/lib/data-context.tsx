import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

import { AOS_DATA as AOS_DATA_STATIC, type AosRow } from "@/data/aos"
import { FLOW_DATA as FLOW_DATA_STATIC, type FlowRow } from "@/data/flow"

const LAST_GOOD_KEY = "ariaRefreshLastGood"

function fmtNow(): string {
  const d = new Date()
  const dd = String(d.getDate()).padStart(2, "0")
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()]
  const hh = String(d.getHours()).padStart(2, "0")
  const mm = String(d.getMinutes()).padStart(2, "0")
  return `${dd} ${mon} ${d.getFullYear()}, ${hh}:${mm}`
}

function readLastGood(): string | null {
  try {
    return window.localStorage.getItem(LAST_GOOD_KEY)
  } catch {
    return null
  }
}

interface RefreshResponse {
  ok: boolean
  code?: string
  error?: string
  aosData?: AosRow[]
  flowData?: FlowRow[]
}

interface DataContextValue {
  aosData: AosRow[]
  flowData: FlowRow[]
  aosCats: string[]
  aosBlocksList: string[]
  flowYears: string[]
  dataAsOfLabel: string
  isRefreshing: boolean
  refreshError: string | null
  refresh: () => Promise<void>
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [aosData, setAosData] = useState<AosRow[]>(AOS_DATA_STATIC)
  const [flowData, setFlowData] = useState<FlowRow[]>(FLOW_DATA_STATIC)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshError, setRefreshError] = useState<string | null>(null)
  const [lastGood, setLastGood] = useState<string | null>(() => readLastGood())

  const aosCats = useMemo(() => Array.from(new Set(aosData.map((r) => r[2]))).sort(), [aosData])
  const aosBlocksList = useMemo(() => Array.from(new Set(aosData.map((r) => r[0]))).sort(), [aosData])
  const flowYears = useMemo(
    () => Array.from(new Set(flowData.map((r) => `20${r[0].split("-")[1]}`))).sort(),
    [flowData]
  )

  const refresh = useCallback(async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    setRefreshError(null)
    try {
      const r = await fetch("/api/refresh-data", { cache: "no-store" })
      const body: RefreshResponse = await r.json()
      if (!r.ok || !body || body.ok === false) {
        throw new Error(body?.error || body?.code || "Refresh failed")
      }
      if (Array.isArray(body.aosData)) setAosData(body.aosData)
      if (Array.isArray(body.flowData)) setFlowData(body.flowData)
      const stamp = fmtNow()
      setLastGood(stamp)
      try {
        window.localStorage.setItem(LAST_GOOD_KEY, stamp)
      } catch {
        // ignore
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "check connection"
      setRefreshError(message)
      window.setTimeout(() => setRefreshError(null), 6000)
    } finally {
      setIsRefreshing(false)
    }
  }, [isRefreshing])

  const dataAsOfLabel = refreshError
    ? `Refresh failed — ${refreshError}`
    : lastGood
      ? `Live data as of ${lastGood}`
      : "Data as of 05–09 Sep 2026"

  const value: DataContextValue = {
    aosData,
    flowData,
    aosCats,
    aosBlocksList,
    flowYears,
    dataAsOfLabel,
    isRefreshing,
    refreshError,
    refresh,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("useData must be used within a DataProvider")
  return ctx
}

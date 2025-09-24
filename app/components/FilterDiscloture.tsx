"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ListTodo,
  CalendarDays,
  Bell,
  Pin,
  Users,
  Sparkles,
  Check,
  Filter,
} from "lucide-react"

type ItemKey =
  | "tasks"
  | "events"
  | "reminders"
  | "appointments"
  | "meetings"
  | "celebrations"

const ITEMS: Array<{
  key: ItemKey
  label: string
  Icon: any
}> = [
  { key: "tasks", label: "Tasks", Icon: ListTodo },
  { key: "events", label: "Events", Icon: CalendarDays },
  { key: "reminders", label: "Reminders", Icon: Bell },
  { key: "appointments", label: "Appointments", Icon: Pin },
  { key: "meetings", label: "Meetings", Icon: Users },
  { key: "celebrations", label: "Celebrations", Icon: Sparkles },
]

const circleBtn =
  "relative inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-neutral-400 hover:text-neutral-900 border border-neutral-400 shadow-[inset_0_0_0_2px_rgba(0,0,0,0.03)] transition-colors"

const FilterDiscloture = () => {
  const [open, setOpen] = useState(false)
  // Single selection: store the selected key only
  const [selected, setSelected] = useState<ItemKey>("tasks")

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener("mousedown", onDown)
    return () => window.removeEventListener("mousedown", onDown)
  }, [])

  const choose = (key: ItemKey) => setSelected(key)

  // Icon of the currently selected item for the compact button
  const SelectedIcon = (ITEMS.find((i) => i.key === selected)?.Icon) || CalendarDays

  return (
    <div ref={wrapperRef} className="relative inline-flex items-center">
      {/* Compact, default view (like the second image) */}
      <div className="flex items-center">
        <motion.button
          aria-label="Open filters"
          onClick={() => setOpen((v) => !v)}
          className={`${circleBtn} text-neutral-900`}
          initial={{ scale: 0.86, rotate: -2 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 10, mass: 0.5, bounce: 0.6 }}
          whileTap={{ scale: 0.94 }}
        >
            {/* <motion.span
            key={`icon-${selected}`}
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 12, bounce: 0.55 }}
          > */}
          <Filter className="w-5 h-5" />
          {/* </motion.span> */}
        </motion.button>
        <motion.button
          key={selected}
          aria-label="Selected"
          className={`${circleBtn} -ml-4`}
          initial={{ scale: 0.66, rotate: -2 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 10, mass: 0.5, bounce: 0.6 }}
          whileTap={{ scale: 0.94 }}
        >
          <motion.span
            key={`icon-${selected}`}
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 12, bounce: 0.55 }}
          >
            <SelectedIcon className="w-5 h-5" />
          </motion.span>
        </motion.button>
      </div>

      {/* Pop panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 10 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ type: "spring", stiffness: 180, damping: 12, mass: 0.6, bounce: 0.45 }}
            className="absolute left-[-100px] top-[-150px] w-[320px] rounded-2xl border border-neutral-200 bg-white shadow-xl"
          >
            <div className="p-3">
              {ITEMS.map(({ key, label, Icon }) => {
                const isOn = selected === key
                return (
                  <motion.button
                    key={key}
                    onClick={() => {choose(key);setOpen(false)}}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-neutral-100 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className={`w-5 h-5 ${isOn ? "text-neutral-900" : "text-neutral-400"}`} />
                    <span className={`flex-1 text-left text-[15px] font-medium ${isOn ? "text-neutral-900" : "text-neutral-500"}`}>
                      {label}
                    </span>
                    {/* Right status circle */}
                    <span className="h-7 w-7 inline-flex items-center justify-center rounded-full border border-neutral-300">
                      <AnimatePresence mode="popLayout">
                        {isOn ? (
                          <motion.span
                            key="on"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 220, damping: 12, bounce: 0.5 }}
                            className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FilterDiscloture
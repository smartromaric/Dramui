"use client"
import { useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpCircle, UserIcon, FileTextIcon ,SettingsIcon,GroupIcon} from "lucide-react"

interface StepIndicatorProps {
  steps?: {icon: React.ReactNode, label: string}[]
  className?: string
}

const StepIndicator = ({
  steps = [
    {icon: <UserIcon />, label: "Expenses"},
    {icon: <FileTextIcon />, label: "Billing"},
    {icon: <GroupIcon />, label: "Reports"},
    {icon: <SettingsIcon />, label: "Settings"}],
  className = "",
}: StepIndicatorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0)
  const prevIdxRef = useRef<number | null>(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const setHoverWithDirection = (idx: number) => {
    if (hoveredIdx !== null) {
      const dir = idx > hoveredIdx ? 1 : -1
      setDirection(dir as 1 | -1)
      prevIdxRef.current = hoveredIdx
    }
    setHoveredIdx(idx)
  }

  const positions = useMemo(() => {
    if (!containerRef.current) return [] as { x: number; width: number }[]
    const items = Array.from(
      containerRef.current.querySelectorAll<HTMLDivElement>("[data-step-item]")
    )
    return items.map((el) => {
      const rect = el.getBoundingClientRect()
      const parentRect = containerRef.current!.getBoundingClientRect()
      return { x: rect.left - parentRect.left + rect.width / 2, width: rect.width }
    })
  }, [steps.length, hoveredIdx])

  return (
    <div className={`w-full flex flex-col items-center gap-6 ${className}`}>
      {/* Floating pill that slides from previous to new step */}
      <div className="relative h-8 w-full">
        <AnimatePresence>
          {hoveredIdx !== null && positions[hoveredIdx] && (
            <motion.div
              key="floating-pill"
              initial={false}
              animate={{
                x: positions[hoveredIdx].x - 120,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="absolute left-[26%] top-0"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="px-5 py-2.5 rounded-full bg-neutral-800 text-white shadow-lg flex items-center gap-2 select-none"
              >
                {steps[hoveredIdx].icon}
                <span className="relative inline-block text-sm font-semibold leading-none">
                  <span className="opacity-40">{steps[hoveredIdx].label}</span>
                  <motion.span
                    key={hoveredIdx}
                    className="absolute inset-0 text-white"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {steps[hoveredIdx].label}
                  </motion.span>
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Steps rail */}
      <div
        ref={containerRef}
        className="w-full max-w-3xl flex items-center justify-between gap-8 px-4"
      >
        {steps.map((step, idx) => (
          <button
            key={step.label}
            data-step-item={step.label}
            onMouseEnter={() => setHoverWithDirection(idx)}
            onFocus={() => setHoverWithDirection(idx)}
            className="relative h-5 w-full max-w-[140px] rounded-full bg-neutral-100 outline-none transition-colors duration-200 hover:bg-neutral-200"
          >
            
            {/* Subtle shine on hover */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <motion.div
                initial={false}
                animate={{ opacity: hoveredIdx === idx ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StepIndicator

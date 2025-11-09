"use client"

import { useState } from "react"
import { ChevronDown, Trash2 } from "lucide-react"
import { Draft } from "@/lib/types"

interface SidebarProps {
  drafts: Draft[]
  onLoadDraft: (draft: Draft) => void
  onDeleteDraft: (id: string) => void
}

export default function Sidebar({ drafts, onLoadDraft, onDeleteDraft }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        isOpen ? "w-72" : "w-0"
      } hidden md:flex flex-col overflow-hidden`}
    >
      <div className="p-8 border-b border-sidebar-border flex justify-between items-center">
        <h3 className="text-sm font-light tracking-wide text-sidebar-foreground">PAST DRAFTS</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sidebar-foreground hover:text-sidebar-primary transition-colors"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {drafts.length === 0 ? (
            <p className="text-xs font-light text-sidebar-foreground/50">No drafts yet</p>
          ) : (
            <div className="space-y-3">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="group p-4 border border-sidebar-border/50 hover:border-sidebar-border transition-all hover:bg-sidebar-accent/30 cursor-pointer"
                >
                  <button onClick={() => onLoadDraft(draft)} className="w-full text-left">
                    <p className="text-sm font-light text-sidebar-foreground">{draft.name}</p>
                    <p className="text-xs font-light text-sidebar-foreground/50 mt-2">
                      {new Date(draft.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteDraft(draft.id)
                    }}
                    className="mt-3 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="flex items-center gap-2 text-xs font-light text-red-600 hover:text-red-700">
                      <Trash2 size={12} />
                      Delete
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

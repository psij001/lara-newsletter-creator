"use client"

import { Button } from "@/components/ui/button"

export default function FeedbackSection({ feedbackText, onFeedbackChange, onApplyFeedback, isLoading }) {
  const charCount = feedbackText.length
  const maxChars = 500

  return (
    <div className="bg-card border border-border p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-light tracking-tight text-foreground mb-2">Refine Output</h2>
        <p className="text-sm font-light text-muted-foreground">What would you like to change?</p>
      </div>

      <textarea
        value={feedbackText}
        onChange={(e) => onFeedbackChange(e.target.value.slice(0, maxChars))}
        placeholder="E.g., Make the intro more personal, Add more emphasis on the exhibition, Shorten the conclusion..."
        className="w-full h-28 p-5 border border-border bg-background text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-light"
      />

      <div className="flex justify-between items-center">
        <span className="text-xs font-light text-muted-foreground">
          {charCount} / {maxChars} characters
        </span>
      </div>

      <Button
        onClick={onApplyFeedback}
        disabled={feedbackText.trim().length === 0 || isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light py-3 text-base"
        size="lg"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Refining...
          </div>
        ) : (
          "Apply Feedback"
        )}
      </Button>
    </div>
  )
}

import { startOfMonth } from "date-fns"
import { For } from "solid-js"
import { twMerge } from "tailwind-merge"
import { blockLevels, blockSublevels, db } from "~/db"
import { createDexieArrayQuery } from "~/dexie"
import { backgroundColors, textColors } from "~/types/tally"

export default function StatsPage() {
  const entries = createDexieArrayQuery(() => db.tallies.where('createdAt').above(startOfMonth(new Date())).toArray())

  return (
    <main class="flex flex-col w-full h-full justify-center join join-vertical">
      <For each={blockLevels}>{level => (
        <div class="stats shadow-xl overflow-hidden join-item">
          <For each={blockSublevels}>{sublevel => (
            <div class={twMerge("stat", backgroundColors[level], textColors[level])}>
              <div class={twMerge("text-2xl text-center")}>{sublevel}</div>
              <div class="stat-value text-center font-mono">
                <span class="countdown font-mono">
                  <span style={{ "--value": entries.filter(e => e.level == level && e.subLevel == sublevel).length }} />
                </span>
              </div>
            </div>
          )}
          </For>
        </div>
      )}</For>
    </main>
  )
}

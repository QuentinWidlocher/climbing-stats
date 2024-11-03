import { startOfMonth } from "date-fns"
import { For } from "solid-js"
import { twMerge } from "tailwind-merge"
import { blockLevels, blockSublevels, db } from "~/db"
import { createDexieArrayQuery } from "~/dexie"
import { backgroundColors, textColors } from "~/types/tally"

export default function StatsPage() {
  const entries = createDexieArrayQuery(() => db.tallies.where('createdAt').above(startOfMonth(new Date())).toArray())

  return (
    <div class="flex flex-col w-full h-full justify-around pb-20">
      <For each={blockLevels}>{level => (
        <div class="stats shadow">
          <For each={blockSublevels}>{sublevel => (
            <div class={twMerge("stat", backgroundColors[level], textColors[level])}>
              <div class={twMerge("text-2xl text-center")}>{sublevel}</div>
              <div class="stat-value text-center">{entries.filter(e => e.level == level && e.subLevel == sublevel).length}</div>
            </div>
          )}
          </For>
        </div>
      )}</For>
    </div>
  )
}

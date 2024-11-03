import { BlockLevel, blockLevels, BlockSublevel, db } from "~/db";
import { createDexieArrayQuery } from "~/dexie";
import { startOfToday } from "date-fns";
import { For } from "solid-js";
import { twMerge } from "tailwind-merge";
import { backgroundColors, labels, textColors } from "~/types/tally";

function Tally(props: {
  level: BlockLevel;
  total: number;
  onClick: (subLevel: BlockSublevel) => void;
  onAltClick: (subLevel: BlockSublevel) => void;
}) {
  return (
    <div class={twMerge("join-item collapse bg-base-200", backgroundColors[props.level], textColors[props.level])}>
      <input type="radio" name="block" />
      <div class="collapse-title shadow-md text-xl space-x-3">
        <span class="countdown font-mono">
          <span style={{ "--value": props.total }} />
        </span>
        <span>{labels[props.level]}{props.total > 1 ? 's' : ''}</span>
      </div>
      <div class="collapse-content !p-0 bg-black/15">
        <div class="grid w-full h-full grid-rows-1 grid-cols-3">
          <button
            type="button"
            onClick={() => props.onClick('I')}
            onContextMenu={(e) => {
              e.preventDefault();
              props.onAltClick('I');
            }}
            class="btn btn-lg text-lg btn-ghost rounded-none"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => props.onClick('II')}
            onContextMenu={(e) => {
              e.preventDefault();
              props.onAltClick('II');
            }}
            class="btn btn-lg text-lg btn-ghost rounded-none"
          >
            II
          </button>
          <button
            type="button"
            onClick={() => props.onClick('+')}
            onContextMenu={(e) => {
              e.preventDefault();
              props.onAltClick('+');
            }}
            class="btn btn-lg text-lg btn-ghost rounded-none"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TallyPage() {
  const entries = createDexieArrayQuery(() => db.tallies.where('createdAt').above(startOfToday()).toArray())

  const emptyRadio = <input type="radio" name="block" class="hidden" /> as HTMLInputElement;

  return (
    <main class="flex flex-col gap-5 justify-end sm:justify-center pb-10 h-full">
      {emptyRadio}
      <div class="join join-vertical shadow-xl">
        <For each={blockLevels}>{level => (
          <Tally
            level={level}
            total={entries.filter(e => e.level == level).length}
            onClick={async (subLevel) => {
              await db.tallies.add({ id: crypto.randomUUID(), level, subLevel, createdAt: new Date() });
              emptyRadio.checked = true;
            }}
            onAltClick={async (subLevel) => {
              const last = await db.tallies.where('createdAt').above(startOfToday()).and((entry) => entry.level == level && entry.subLevel == subLevel).last();
              if (!last) return;
              await db.tallies.delete(last.id);
              emptyRadio.checked = true;
            }}
          />
        )}</For>
      </div>
    </main>
  );
}

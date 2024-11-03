import { BlockLevel, blockLevels, BlockSublevel, db } from "~/db";
import { createDexieArrayQuery } from "~/dexie";
import { startOfToday } from "date-fns";
import { For } from "solid-js";
import { twMerge } from "tailwind-merge";
import { backgroundColors, labels, textColors } from "~/types/tally";

function Block(props: {
  level: BlockLevel;
  total: number;
  onClick: (subLevel: BlockSublevel) => void;
}) {
  return (
    <div class={twMerge("join-item collapse bg-base-200", backgroundColors[props.level], textColors[props.level])}>
      <input type="radio" name="block" />
      <div class="collapse-title text-xl font-medium space-x-3">
        <span class="countdown font-mono">
          <span style={{ "--value": props.total }} />
        </span>
        <span>{labels[props.level]}{props.total > 1 ? 's' : ''}</span>
      </div>
      <div class="collapse-content !p-0 bg-black/15">
        <div class="grid w-full h-full grid-rows-1 grid-cols-3">
          <button type="button" onClick={() => props.onClick('I')} class="btn btn-lg text-lg btn-ghost rounded-none">I</button>
          <button type="button" onClick={() => props.onClick('II')} class="btn btn-lg text-lg btn-ghost rounded-none">II</button>
          <button type="button" onClick={() => props.onClick('+')} class="btn btn-lg text-lg btn-ghost rounded-none">+</button>
        </div>
      </div>
    </div>
  );
}

export default function TallyPage() {
  const entries = createDexieArrayQuery(() => db.tallies.where('createdAt').above(startOfToday()).toArray())

  const emptyRadio = <input type="radio" name="block" class="hidden" /> as HTMLInputElement;

  return (
    <main class="flex flex-col gap-5 justify-around h-full">
      {emptyRadio}
      <div class="join join-vertical shadow-xl">
        <For each={blockLevels}>{level => (
          <Block
            level={level}
            total={entries.filter(e => e.level == level).length}
            onClick={async (subLevel) => {
              console.debug(subLevel)
              await db.tallies.add({ id: crypto.randomUUID(), level, subLevel, createdAt: new Date() });
              emptyRadio.checked = true;
            }}
          />
        )}</For>
      </div>
    </main>
  );
}

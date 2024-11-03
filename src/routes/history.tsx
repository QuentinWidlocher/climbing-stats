import { formatDistanceToNowStrict } from "date-fns"
import { fr } from "date-fns/locale/fr"
import CircleAlert from "lucide-solid/icons/circle-alert"
import Eraser from "lucide-solid/icons/eraser"
import { createSignal, For } from "solid-js"
import { twMerge } from "tailwind-merge"
import { db } from "~/db"
import { createDexieArrayQuery } from "~/dexie"
import { backgroundColors, textColors } from "~/types/tally"

function ConfirmDeleteButton(props: { onConfirm: () => void }) {
  const [confirm, setConfirm] = createSignal(false);
  return <button type='button' onClick={() => {
    if (confirm()) {
      props.onConfirm()
    } else {
      setConfirm(true)
      setTimeout(() => setConfirm(false), 3000)
    }
  }} class={twMerge("btn", confirm() ? 'btn-error bg-white border-2' : 'btn-ghost')}>{confirm() ? <CircleAlert /> : <Eraser />}</button>

}

export default function HistoryPage() {
  const entries = createDexieArrayQuery(() => db.tallies.orderBy('createdAt').reverse().toArray()) // @todo: add pagination

  return (
    <main class="flex flex-col gap-3 h-full overflow-y-auto">
      <For each={entries} fallback={<span class="m-auto text-primary">Pas encore de bloc compté aujourd'hui</span>}>
        {(entry) => (
          <div class={twMerge("grid grid-cols-[3rem_1fr_5rem] grid-rows-1 items-center p-2 bg-gray-300 rounded-lg", backgroundColors[entry.level], textColors[entry.level])}>
            <span class="text-3xl text-center font-bold w-10">{entry.subLevel}</span>
            <span class="">il y a {formatDistanceToNowStrict(entry.createdAt, { locale: fr })}</span>
            <ConfirmDeleteButton onConfirm={() => db.tallies.delete(entry.id)} />
          </div>
        )}
      </For>
    </main>
  )
}

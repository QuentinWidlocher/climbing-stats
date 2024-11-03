import { A } from "@solidjs/router";
import History from "lucide-solid/icons/history"
import ChartColumnStacked from "lucide-solid/icons/chart-column-stacked";
import Tally5 from "lucide-solid/icons/tally-5";
import { ParentProps } from "solid-js";

export default function Layout(props: ParentProps<{}>) {
  return (
    <div class="overflow-hidden h-dvh w-screen flex place-content-center p-1 sm:p-5">
      <div class="overflow-hidden w-full min-h-full sm:w-[30rem]">
        <div class="overflow-hidden w-full h-full pb-16">
          {props.children}
        </div>
        <div class="btm-nav ">
          <A href="/tally" class="aria-[current=page]:opacity-100 opacity-75 bg-primary-content text-primary">
            <Tally5 />
            <span class="btm-nav-label">Compter</span>
          </A>
          <A href="/history" class="aria-[current=page]:opacity-100 opacity-75 bg-primary-content text-primary">
            <History />
            <span class="btm-nav-label">Historique</span>
          </A>
          <A href="/stats" class="aria-[current=page]:opacity-100 opacity-75 bg-primary-content text-primary">
            <ChartColumnStacked />
            <span class="btm-nav-label">Stats</span>
          </A>
        </div>
      </div>
    </div>
  )
}

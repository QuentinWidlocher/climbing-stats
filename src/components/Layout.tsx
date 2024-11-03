import { A } from "@solidjs/router";
import { ChartColumnStacked, Tally5 } from "lucide-solid";
import { ParentProps } from "solid-js";

export default function Layout(props: ParentProps<{}>) {
  return (
    <div class="overflow-hidden h-dvh w-screen flex place-content-center p-1 sm:p-5">
      <div class="overflow-hidden w-full min-h-full sm:w-[30rem]">
        {props.children}
        <div class="btm-nav ">
          <A href="/tally" class="bg-primary-content text-primary">
            <Tally5 />
          </A>
          <A href="/stats" class="bg-primary-content text-primary">
            <ChartColumnStacked />
          </A>
        </div>
      </div>
    </div>
  )
}

import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { select } from "tui";

const choice = await select({
  message: "Pick a framework:",
  options: [
    { label: "React",   value: "react",   description: "Meta's UI library" },
    { label: "Vue",     value: "vue",     description: "Progressive framework" },
    { label: "Svelte",  value: "svelte",  description: "Compiled framework" },
    { label: "Angular", value: "angular", disabled: true },
  ],
});

console.log(\`You chose: \${choice}\`);`;

export default function SelectPage() {
  return (
    <ComponentPage
      title="Select"
      description="Interactive keyboard-navigated menu with scrolling, descriptions, disabled options, and vim key bindings (j/k)."
      badges={[
        { label: "interactive", variant: "blue" },
        { label: "async", variant: "purple" },
      ]}
      code={CODE}
      preview={
        <div>
          <div><span className="text-[#3fb950] font-bold">?</span> <span className="font-bold">Pick a framework:</span></div>
          <div>  <span className="text-[#79c0ff] font-bold">❯ React</span> <span className="text-[#8b949e]">- Meta&apos;s UI library</span></div>
          <div>    Vue <span className="text-[#8b949e]">- Progressive framework</span></div>
          <div>    Svelte <span className="text-[#8b949e]">- Compiled framework</span></div>
          <div>  <span className="text-[#8b949e]">- Angular (disabled)</span></div>
          <div className="mt-2 text-[#8b949e] opacity-60">  ↑↓ to navigate, Enter to select, Ctrl+C to cancel</div>
          <div className="mt-4 border-t border-term-border pt-3">
            <div><span className="text-[#3fb950]">✔</span> <span className="font-bold">Pick a framework:</span> <span className="text-[#79c0ff]">→ React</span></div>
          </div>
        </div>
      }
      apiTable={[
        { prop: "message", type: "string", default: "required", description: "Prompt question displayed above options" },
        { prop: "options", type: "SelectOption<T>[]", default: "required", description: "Array of { label, value, description?, disabled? }" },
        { prop: "initialIndex", type: "number", default: "0", description: "Initially highlighted option index" },
        { prop: "pointer", type: "string", default: '"❯"', description: "Pointer character for active option" },
        { prop: "activeColor", type: "string", default: "fg.cyan", description: "Color for the highlighted option" },
        { prop: "maxVisible", type: "number", default: "10", description: "Max visible options before scrolling" },
      ]}
    />
  );
}

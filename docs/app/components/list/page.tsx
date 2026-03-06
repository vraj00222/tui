import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { List } from "tui";

// Bullet list with nesting
const list = new List({ style: "bullet" });
console.log(list.render([
  "First item",
  { text: "Second", children: [
    { text: "Child A" },
    { text: "Child B" },
  ]},
  "Third item",
]));

// Task list
const tasks = new List({ style: "task" });
console.log(tasks.render([
  { text: "Setup", checked: true },
  { text: "Build", checked: true },
  { text: "Test", checked: false },
  { text: "Deploy", checked: false },
]));

// Also: "numbered", "letter", "arrow", "star", "dash"`;

export default function ListPage() {
  return (
    <ComponentPage
      title="List"
      description="Styled list renderer supporting 6 styles (bullet, dash, arrow, star, numbered, task) with nested item support."
      badges={[
        { label: "static output", variant: "green" },
        { label: "6 styles", variant: "blue" },
      ]}
      code={CODE}
      preview={
        <div>
          <div className="text-[#8b949e] mb-1">Bullet list with nesting:</div>
          <div><span className="text-[#79c0ff]">●</span> First item</div>
          <div><span className="text-[#79c0ff]">●</span> Second with children</div>
          <div>  <span className="text-[#79c0ff]">○</span> Child A</div>
          <div>  <span className="text-[#79c0ff]">○</span> Child B</div>
          <div><span className="text-[#79c0ff]">●</span> Third item</div>

          <div className="text-[#8b949e] mb-1 mt-4">Task list:</div>
          <div><span className="text-[#3fb950] font-bold">✔</span> <span className="text-[#8b949e] line-through">Set up project</span></div>
          <div><span className="text-[#3fb950] font-bold">✔</span> <span className="text-[#8b949e] line-through">Write components</span></div>
          <div><span className="text-[#8b949e]">○</span> Add tests</div>
          <div><span className="text-[#8b949e]">○</span> Deploy</div>

          <div className="text-[#8b949e] mb-1 mt-4">Numbered list:</div>
          <div><span className="text-[#e3b341]">1.</span> Clone the repository</div>
          <div><span className="text-[#e3b341]">2.</span> Install dependencies</div>
          <div><span className="text-[#e3b341]">3.</span> Run the showcase</div>
          <div><span className="text-[#e3b341]">4.</span> Start building!</div>

          <div className="text-[#8b949e] mb-1 mt-4">Other styles:</div>
          <div><span className="text-[#79c0ff]">▸</span> arrow &nbsp;&nbsp; <span className="text-[#79c0ff]">★</span> star &nbsp;&nbsp; <span className="text-[#79c0ff]">─</span> dash &nbsp;&nbsp; <span className="text-[#79c0ff]">a)</span> letter</div>
        </div>
      }
      apiTable={[
        { prop: "style", type: "ListStyle", default: '"bullet"', description: "bullet | dash | arrow | star | numbered | letter | task" },
        { prop: "indent", type: "number", default: "2", description: "Spaces per nesting level" },
        { prop: "bulletColor", type: "string", default: "fg.cyan", description: "Color for bullet characters" },
        { prop: "checkedColor", type: "string", default: "fg.green", description: "Color for checked task items" },
        { prop: "uncheckedColor", type: "string", default: "fg.gray", description: "Color for unchecked task items" },
      ]}
    />
  );
}

import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { Box, fg, style, colorize } from "@vr_patel/tui";

const box = new Box({
  title: "Server Status",
  borderStyle: "round",     // round | single | double | heavy | dashed | ascii
  borderColor: fg.cyan,
  padding: 1,
  paddingY: 1,
});

console.log(box.render(
  colorize("Status: ", fg.gray) + colorize("● Online", fg.green, style.bold) + "\\n" +
  colorize("Uptime: ", fg.gray) + "12d 4h 32m" + "\\n" +
  colorize("CPU:    ", fg.gray) + colorize("23%", fg.yellow)
));`;

export default function BoxPage() {
  return (
    <ComponentPage
      title="Box"
      description="Bordered panels and cards with 6 border styles, title positioning, and configurable padding."
      badges={[
        { label: "static output", variant: "green" },
        { label: "6 styles", variant: "blue" },
      ]}
      code={CODE}
      preview={
        <div>
          <pre className="text-[#79c0ff]">{
`╭─ `}<span className="font-bold text-white">Server Status</span>{` ────────────────╮
│                                  │
│  `}<span className="text-[#8b949e]">Status:</span>{`  `}<span className="font-bold text-[#3fb950]">● Online</span>{`              │
│  `}<span className="text-[#8b949e]">Uptime:</span>{`  `}<span className="text-white">12d 4h 32m</span>{`           │
│  `}<span className="text-[#8b949e]">CPU:</span>{`     `}<span className="text-[#e3b341]">23%</span>{`                  │
│  `}<span className="text-[#8b949e]">Memory:</span>{`  `}<span className="text-white">4.2 GB / 16 GB</span>{`       │
│                                  │
╰──────────────────────────────────╯`}
          </pre>
          <div className="mt-4 text-[#8b949e] mb-2">Border styles:</div>
          <pre>{
`╭──────╮  ┌──────┐  ╔══════╗  ┏━━━━━━┓  ┌┄┄┄┄┄┄┐  +------+
│`}<span className="text-[#79c0ff]">round</span>{` │  │`}<span className="text-[#3fb950]">single</span>{`│  ║`}<span className="text-[#d29922]">double</span>{`║  ┃`}<span className="text-[#f85149]"> heavy</span>{`┃  ┆`}<span className="text-[#bc8cff]">dashed</span>{`┆  |`}<span className="text-[#8b949e]">ascii </span>{`|
╰──────╯  └──────┘  ╚══════╝  ┗━━━━━━┛  └┄┄┄┄┄┄┘  +------+`}
          </pre>
        </div>
      }
      apiTable={[
        { prop: "title", type: "string", default: "undefined", description: "Title shown in the top border" },
        { prop: "titleAlignment", type: '"left" | "center" | "right"', default: '"left"', description: "Title position in the border" },
        { prop: "borderStyle", type: "string | BorderStyle", default: '"round"', description: "Border style name or custom characters" },
        { prop: "borderColor", type: "string", default: "fg.gray", description: "ANSI color for the border" },
        { prop: "titleColor", type: "string", default: "fg.brightWhite + bold", description: "ANSI color for the title" },
        { prop: "padding", type: "number", default: "1 (X) / 0 (Y)", description: "Padding inside the box" },
        { prop: "paddingX", type: "number", default: "1", description: "Horizontal padding" },
        { prop: "paddingY", type: "number", default: "0", description: "Vertical padding" },
        { prop: "width", type: "number", default: "auto", description: "Fixed width or auto-sized" },
        { prop: "dimBorder", type: "boolean", default: "false", description: "Apply dim style to border" },
      ]}
    />
  );
}

import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { Table, fg, colorize } from "tui";

const table = new Table({
  headers: ["Name", "Role", "Status"],
  rows: [
    ["Alice", "Engineer", colorize("Active", fg.green)],
    ["Bob",   "Designer", colorize("Away", fg.yellow)],
    ["Charlie", "Manager", colorize("Active", fg.green)],
  ],
  alternateRowColor: true,
});

console.log(table.render());`;

export default function TablePage() {
  return (
    <ComponentPage
      title="Table"
      description="Formatted data tables with headers, auto-sized columns, alternating row colors, and Unicode box-drawing borders."
      badges={[
        { label: "static output", variant: "green" },
      ]}
      code={CODE}
      preview={
        <pre>{
`┌───────────┬──────────┬─────────┐
│ `}<span className="text-[#79c0ff] font-bold">Name</span>{`      │ `}<span className="text-[#79c0ff] font-bold">Role</span>{`     │ `}<span className="text-[#79c0ff] font-bold">Status</span>{`  │
├───────────┼──────────┼─────────┤
│ Alice     │ Engineer │ `}<span className="text-[#3fb950]">Active</span>{`  │
│ `}<span className="text-[#8b949e]">Bob</span>{`       │ `}<span className="text-[#8b949e]">Designer</span>{` │ `}<span className="text-[#d29922]">Away</span>{`    │
│ Charlie   │ Manager  │ `}<span className="text-[#3fb950]">Active</span>{`  │
└───────────┴──────────┴─────────┘`}
        </pre>
      }
      apiTable={[
        { prop: "headers", type: "string[]", default: "required", description: "Column header labels" },
        { prop: "rows", type: "string[][]", default: "required", description: "2D array of cell values" },
        { prop: "borderColor", type: "string", default: "fg.gray", description: "Color for table borders" },
        { prop: "headerColor", type: "string", default: "fg.cyan + bold", description: "Color for header row" },
        { prop: "alternateRowColor", type: "boolean", default: "true", description: "Alternate row shading" },
        { prop: "padding", type: "number", default: "1", description: "Cell padding in spaces" },
      ]}
    />
  );
}

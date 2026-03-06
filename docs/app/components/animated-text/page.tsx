import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { typewriter, gradientWave, shimmer, bouncingText } from "tui";

// Typewriter — characters appear one by one
await typewriter({ text: "Hello, world!", speed: 40, color: fg.brightGreen });

// Gradient wave — rainbow colors flow through text
await gradientWave({ text: "Rainbow text!", duration: 3000 });

// Shimmer — sparkle effect across text
await shimmer({ text: "Sparkle!", duration: 3000 });

// Bouncing text — text bounces side to side with trail
await bouncingText({ text: "BOUNCE", duration: 4000 });`;

export default function AnimatedTextPage() {
  return (
    <ComponentPage
      title="Animated Text"
      description="Four text animation effects: typewriter, gradient wave, shimmer/sparkle, and bouncing text with trail effects."
      badges={[
        { label: "animated", variant: "purple" },
        { label: "async", variant: "blue" },
      ]}
      code={CODE}
      preview={
        <div>
          <div className="text-[#8b949e] mb-1">Typewriter:</div>
          <div className="text-[#3fb950]">Hello! I&apos;m typ<span className="text-[#8b949e]">▌</span></div>
          <div className="text-[#3fb950]">Hello! I&apos;m typing this cha<span className="text-[#8b949e]">▌</span></div>
          <div className="text-[#3fb950]">Hello! I&apos;m typing this character by character...</div>

          <div className="text-[#8b949e] mb-1 mt-4">Gradient Wave:</div>
          <div>
            <span className="text-[#ff0080]">★</span>
            <span className="text-[#ff00c0]"> </span>
            <span className="text-[#cc00ff]">R</span>
            <span className="text-[#9900ff]">a</span>
            <span className="text-[#6600ff]">i</span>
            <span className="text-[#3300ff]">n</span>
            <span className="text-[#0033ff]">b</span>
            <span className="text-[#0066ff]">o</span>
            <span className="text-[#0099ff]">w</span>
            <span className="text-[#00ccff]"> </span>
            <span className="text-[#00ffcc]">c</span>
            <span className="text-[#00ff99]">o</span>
            <span className="text-[#00ff66]">l</span>
            <span className="text-[#00ff33]">o</span>
            <span className="text-[#33ff00]">r</span>
            <span className="text-[#66ff00]">s</span>
            <span className="text-[#99ff00]"> </span>
            <span className="text-[#ccff00]">f</span>
            <span className="text-[#ffcc00]">l</span>
            <span className="text-[#ff9900]">o</span>
            <span className="text-[#ff6600]">w</span>
            <span className="text-[#ff3300]">i</span>
            <span className="text-[#ff0033]">n</span>
            <span className="text-[#ff0066]">g</span>
            <span className="text-[#ff0080]"> ★</span>
          </div>

          <div className="text-[#8b949e] mb-1 mt-4">Shimmer:</div>
          <div>
            <span className="text-[#a5d6ff]">S</span>
            <span className="text-[#e3b341] font-bold">✦</span>
            <span className="text-[#a5d6ff]">a</span>
            <span className="text-white font-bold">r</span>
            <span className="text-[#a5d6ff]">k</span>
            <span className="text-[#a5d6ff]">l</span>
            <span className="text-[#e3b341] font-bold">✧</span>
            <span className="text-[#a5d6ff]">n</span>
            <span className="text-white font-bold">g</span>
            <span className="text-[#a5d6ff]"> magical </span>
            <span className="text-[#e3b341] font-bold">⋆</span>
            <span className="text-[#a5d6ff]">ext </span>
            <span className="text-white font-bold">e</span>
            <span className="text-[#a5d6ff]">ff</span>
            <span className="text-[#e3b341] font-bold">✦</span>
            <span className="text-[#a5d6ff]">ct</span>
          </div>

          <div className="text-[#8b949e] mb-1 mt-4">Bouncing:</div>
          <div><span className="text-[#8b949e] opacity-60">         {`>>>`} BOUNCE {`<<<`}</span></div>
          <div><span className="text-[#8b949e] opacity-60">              </span><span className="text-[#e3b341] font-bold">{`>>>`} BOUNCE {`<<<`}</span></div>
          <div><span className="text-[#8b949e] opacity-60">                   </span><span className="text-[#e3b341] font-bold">{`>>>`} BOUNCE {`<<<`}</span></div>
        </div>
      }
      apiTable={[
        { prop: "text", type: "string", default: "required", description: "Text to animate" },
        { prop: "speed", type: "number", default: "30-80ms", description: "Animation frame interval" },
        { prop: "duration", type: "number", default: "3000-4000ms", description: "Total animation duration" },
        { prop: "color", type: "string", default: "varies", description: "Text color (typewriter only)" },
        { prop: "colors", type: "[r,g,b][]", default: "rainbow", description: "Gradient colors (wave only)" },
        { prop: "cursor", type: "string", default: '"▌"', description: "Cursor character (typewriter only)" },
      ]}
    />
  );
}

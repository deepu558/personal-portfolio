import { useCallback, useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipses, IoClose, IoSend } from "react-icons/io5";
import "./styles/ResumeChatbot.css";

type Role = "user" | "assistant";

type Msg = { id: string; role: Role; content: string };

function chatEndpoint(): string {
  const base = import.meta.env.VITE_CHAT_API_URL as string | undefined;
  if (base?.trim()) {
    return `${base.replace(/\/$/, "")}/api/chat`;
  }
  return "/api/chat";
}

const WELCOME: Msg = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi — I’m Manideep’s assistant. Ask about experience, skills, education, or how to reach him.",
};

const ResumeChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open, pending]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || pending) return;

    setInput("");
    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };
    const prior = messages.filter((x) => x.id !== "welcome");
    const apiMessages = [...prior, userMsg].map(({ role, content }) => ({
      role,
      content,
    }));

    setMessages((m) => [...m, userMsg]);
    setPending(true);

    let assistantReply: string;
    try {
      const res = await fetch(chatEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };

      if (res.status === 503) {
        assistantReply =
          "The chat service isn’t set up yet: add OPENAI_API_KEY in your Vercel project (Settings → Environment Variables), redeploy, then try again.";
      } else if (!res.ok) {
        assistantReply =
          data.error ??
          "The assistant had a server error. Try again in a moment.";
      } else if (!data.reply) {
        assistantReply =
          "The assistant returned an empty reply. Please try again.";
      } else {
        assistantReply = data.reply;
      }

      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch (e) {
      const offline =
        e instanceof TypeError ||
        (e instanceof Error && /fetch|network|load failed/i.test(e.message));
      assistantReply = offline
        ? "I can’t reach the chat API. `npm run dev` only runs the site — use `npx vercel dev` locally (with OPENAI_API_KEY in `.env`), or test on your live Vercel deployment."
        : "Something went wrong. Check your connection and try again.";
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, role: "assistant", content: assistantReply },
      ]);
    } finally {
      setPending(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [input, messages, pending]);

  return (
    <div className="resume-chatbot" data-cursor="disable">
      <button
        type="button"
        className="resume-chatbot-fab"
        aria-expanded={open}
        aria-controls="resume-chatbot-panel"
        onClick={() => setOpen((o) => !o)}
        title={open ? "Close chat" : "Ask about Manideep"}
      >
        {open ? <IoClose size={26} /> : <IoChatbubbleEllipses size={26} />}
      </button>

      {open && (
        <div
          className="resume-chatbot-panel"
          id="resume-chatbot-panel"
          role="dialog"
          aria-label="Ask Manideep chat"
        >
          <header className="resume-chatbot-header">
            <span>Ask Manideep</span>
            <button
              type="button"
              className="resume-chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <IoClose size={22} />
            </button>
          </header>

          <div className="resume-chatbot-messages" ref={listRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`resume-chatbot-bubble resume-chatbot-bubble--${m.role}`}
              >
                {m.content}
              </div>
            ))}
            {pending && (
              <div className="resume-chatbot-bubble resume-chatbot-bubble--assistant resume-chatbot-typing">
                …
              </div>
            )}
          </div>

          <form
            className="resume-chatbot-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (pending) return;
              void send();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Where does he work now?"
              autoComplete="off"
              maxLength={500}
              aria-label="Your question"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Send"
            >
              <IoSend size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResumeChatbot;

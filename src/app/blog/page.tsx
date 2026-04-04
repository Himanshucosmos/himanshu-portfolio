import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Transmission Log | Himanshu",
  description: "Writing on Growth, Tech, and the anime-fuelled pursuit of mastery.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main
      className="min-h-screen scanlines"
      style={{ background: "var(--background)", color: "var(--foreground)", paddingTop: "80px" }}
    >
      {/* Ambient blob */}
      <div className="blob pointer-events-none" style={{ width: 400, height: 400, top: 0, left: 0,
        background: "radial-gradient(circle, var(--blob-1) 0%, transparent 70%)" }} aria-hidden />

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12" style={{ background: "var(--secondary)" }} />
          <span className="font-space-mono text-xs tracking-[0.25em] uppercase" style={{ color: "var(--secondary)" }}>
            Transmission Log
          </span>
        </div>

        <h1 className="font-oswald uppercase leading-none mb-4" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
          <span className="block" style={{ color: "var(--fg-subtle)" }}>The</span>
          <span className="block" style={{ color: "var(--foreground)" }}>Blog.</span>
        </h1>

        <div className="katana-line w-full mb-16" />

        {/* Instructions banner */}
        <div
          className="mb-12 border-l-2 pl-5 py-3"
          style={{ borderColor: "var(--gold)", background: "var(--surface)" }}
        >
          <p className="font-space-mono text-xs" style={{ color: "var(--fg-muted)" }}>
            <span style={{ color: "var(--gold)" }}>✦ How to publish:</span> Create a <code style={{ color: "var(--secondary)" }}>.md</code> file in{" "}
            <code style={{ color: "var(--secondary)" }}>content/posts/</code>, push to GitHub, done.
          </p>
        </div>

        {/* Post list */}
        {posts.length === 0 ? (
          <div className="border py-20 text-center" style={{ borderColor: "var(--border)" }}>
            <div className="font-noto-jp text-5xl mb-4" style={{ color: "var(--primary)", opacity: 0.5 }}>準備中</div>
            <h2 className="font-oswald text-2xl uppercase mb-3" style={{ color: "var(--foreground)" }}>
              Transmissions Incoming.
            </h2>
            <p className="font-space-mono text-xs" style={{ color: "var(--fg-muted)" }}>
              Add your first post to <code>content/posts/your-post.md</code>
            </p>
          </div>
        ) : (
          <div className="border-t" style={{ borderColor: "var(--border)" }}>
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border-b py-8 transition-all duration-300"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Number + tags row */}
                    <div className="flex items-center gap-4 mb-3">
                      <span className="font-oswald text-3xl font-bold" style={{ color: "var(--border)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map(t => (
                          <span key={t} className="tag" style={{ fontSize: "10px" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <h2
                      className="font-oswald text-2xl uppercase leading-tight mb-2 transition-colors duration-300"
                      style={{ color: "var(--foreground)" }}
                    >
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="font-space-mono text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                    <time className="font-space-mono text-[10px] tracking-widest" style={{ color: "var(--fg-muted)" }}>
                      {new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </time>
                    <span
                      className="font-space-mono text-xs uppercase tracking-widest transition-colors duration-300"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-20 flex items-center gap-4">
          <span className="font-noto-jp text-lg" style={{ color: "var(--gold)", opacity: 0.5 }}>ᚦ</span>
          <p className="font-space-mono text-xs italic" style={{ color: "var(--fg-muted)" }}>
            Each post is a sword stroke — deliberate, committed, final.
          </p>
        </div>
      </div>
    </main>
  );
}

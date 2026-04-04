import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Himanshu`, description: post.excerpt };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main
      className="min-h-screen scanlines"
      style={{ background: "var(--background)", color: "var(--foreground)", paddingTop: "80px" }}
    >
      {/* Ambient blob */}
      <div className="blob pointer-events-none" style={{ width: 400, height: 400, top: 0, right: 0,
        background: "radial-gradient(circle, var(--blob-2) 0%, transparent 70%)" }} aria-hidden />

      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="font-space-mono text-xs uppercase tracking-widest mb-12 inline-flex items-center gap-2 transition-colors duration-300"
          style={{ color: "var(--fg-muted)" }}
        >
          ← Transmission Log
        </Link>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mt-8 mb-6">
          {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* Title */}
        <h1
          className="font-oswald uppercase leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--foreground)" }}
        >
          {post.title}
        </h1>

        {/* Date */}
        <time className="font-space-mono text-xs" style={{ color: "var(--fg-muted)" }}>
          {new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
        </time>

        <div className="katana-line w-full mt-6 mb-12" />

        {/* Rendered markdown */}
        <article
          className="prose-post"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <div className="mt-20 pt-10 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderColor: "var(--border)" }}>
          <Link
            href="/blog"
            className="font-space-mono text-xs uppercase tracking-widest transition-colors duration-300"
            style={{ color: "var(--fg-muted)" }}
          >
            ← All Posts
          </Link>
          <Link
            href="#contact"
            className="font-space-mono text-xs uppercase tracking-widest transition-colors duration-300"
            style={{ color: "var(--fg-muted)" }}
          >
            Reach Out →
          </Link>
        </div>
      </div>
    </main>
  );
}

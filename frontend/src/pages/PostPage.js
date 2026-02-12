import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export default function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [commentContent, setCommentContent] = useState("");
  const [authorName, setAuthorName] = useState("Iury");
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    try {
      setError("");
      setLoading(true);

      const [postRes, commentsRes] = await Promise.all([
        fetch(`${API_URL}/api/posts/${id}`),
        fetch(`${API_URL}/api/posts/${id}/comments`),
      ]);

      if (!postRes.ok) throw new Error("Falha ao carregar o post");
      if (!commentsRes.ok) throw new Error("Falha ao carregar comentários");

      const postData = await postRes.json();
      const commentsData = await commentsRes.json();

      setPost(postData);
      setComments(Array.isArray(commentsData) ? commentsData : []);
    } catch (e) {
      console.error(e);
      setError("Não foi possível carregar o post.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleCreateComment(e) {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      setSubmitting(true);

      const res = await fetch(`${API_URL}/api/posts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: commentContent.trim(),
          authorName: authorName.trim() || "Anônimo",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Falha ao criar comentário");
      }

      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setCommentContent("");
    } catch (e) {
      console.error(e);
      alert("Erro ao comentar");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <Link to="/forum" className="text-blue-600 hover:underline">
            ← Voltar pro fórum
          </Link>
          <p className="mt-6 text-red-600 font-medium">
            {error || "Post não encontrado."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/forum" className="text-blue-600 hover:underline">
          ← Voltar pro fórum
        </Link>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          <p className="text-gray-600 mt-3 whitespace-pre-wrap">
            {post.content}
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Por: {post.authorName || "Anônimo"}
          </p>
        </div>

        <form
          onSubmit={handleCreateComment}
          className="mt-6 bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold text-gray-800">Comentar</h2>

          <textarea
            className="w-full border border-gray-200 p-3 rounded mt-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Escreva seu comentário"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            disabled={submitting}
          />

          <input
            className="w-full border border-gray-200 p-3 rounded mt-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Seu nome (opcional)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            disabled={submitting}
          />

          <button
            type="submit"
            disabled={submitting || !commentContent.trim()}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {submitting ? "Enviando..." : "Enviar comentário"}
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800">
            Comentários ({comments.length})
          </h3>

          {comments.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm mt-4 text-gray-600">
              Nenhum comentário ainda.
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {comments.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-lg shadow-sm">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {c.content}
                  </p>
                  <p className="text-sm text-gray-400 mt-3">
                    {c.authorName || "Anônimo"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

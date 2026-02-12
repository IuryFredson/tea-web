import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const TOKEN_KEY = "teaweb_token";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);

  const [page, setPage] = useState(0);
  const size = 10;

  const [loading, setLoading] = useState(false);
  const [submittingPost, setSubmittingPost] = useState(false);
  const [error, setError] = useState("");

  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) || ""
  );
  const [loginEmail, setLoginEmail] = useState("iury@teste.com");
  const [loginPassword, setLoginPassword] = useState("123456");
  const [loggingIn, setLoggingIn] = useState(false);
  const [me, setMe] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [openComments, setOpenComments] = useState({});
  const [commentsByPostId, setCommentsByPostId] = useState({});
  const [loadingComments, setLoadingComments] = useState({});
  const [commentDraft, setCommentDraft] = useState({});
  const [submittingComment, setSubmittingComment] = useState({});

  const isAuthed = useMemo(() => token && token.trim().length > 0, [token]);

  const authHeaders = useCallback(
    (extra = {}) => {
      const headers = { ...extra };
      if (isAuthed) headers.Authorization = `Bearer ${token}`;
      return headers;
    },
    [isAuthed, token]
  );

  const canSubmitPost = useMemo(() => {
    return (
      title.trim().length >= 3 && content.trim().length >= 1 && !submittingPost
    );
  }, [title, content, submittingPost]);

  const fetchPosts = useCallback(
    async (currentPage = page) => {
      try {
        setError("");
        setLoading(true);

        const res = await fetch(
          `${API_URL}/api/posts?page=${currentPage}&size=${size}`
        );
        if (!res.ok)
          throw new Error(`Falha ao buscar posts (HTTP ${res.status})`);

        const data = await res.json();
        setPosts(data.content ?? []);
      } catch (e) {
        console.error(e);
        setError("Não foi possível carregar os posts.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    },
    [page, size]
  );

  const fetchMe = useCallback(
    async (currentToken = token) => {
      if (!currentToken) {
        setMe(null);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${currentToken}` },
        });

        if (!res.ok) {
          setMe(null);
          return;
        }

        const data = await res.json();
        setMe(data);
      } catch {
        setMe(null);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  useEffect(() => {
    fetchMe(token);
  }, [token, fetchMe]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoggingIn(true);

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Falha no login (HTTP ${res.status})`);
      }

      const data = await res.json();
      const t = data.token;
      if (!t) throw new Error("Login não retornou token.");

      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Não foi possível fazer login. Verifique email/senha.");
    } finally {
      setLoggingIn(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setMe(null);
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    if (!canSubmitPost) return;

    if (!isAuthed) {
      setError("Você precisa estar logado (JWT) para criar posts.");
      return;
    }

    try {
      setError("");
      setSubmittingPost(true);

      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          authorName: "IGNORADO",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Falha ao criar post (HTTP ${res.status})`);
      }

      setTitle("");
      setContent("");

      if (page !== 0) setPage(0);
      await fetchPosts(0);
    } catch (e) {
      console.error(e);
      setError("Não foi possível criar o post. Tente novamente.");
    } finally {
      setSubmittingPost(false);
    }
  }

  const fetchComments = useCallback(async (postId) => {
    try {
      setLoadingComments((m) => ({ ...m, [postId]: true }));

      const res = await fetch(`${API_URL}/api/posts/${postId}/comments`);
      if (!res.ok)
        throw new Error(`Falha ao buscar comentários (HTTP ${res.status})`);

      const data = await res.json();
      setCommentsByPostId((m) => ({
        ...m,
        [postId]: Array.isArray(data) ? data : [],
      }));
    } catch (e) {
      console.error(e);
      setCommentsByPostId((m) => ({ ...m, [postId]: [] }));
    } finally {
      setLoadingComments((m) => ({ ...m, [postId]: false }));
    }
  }, []);

  const handleToggleComments = useCallback(
    async (postId) => {
      setOpenComments((m) => {
        const next = !m[postId];
        return { ...m, [postId]: next };
      });

      const alreadyLoaded = commentsByPostId[postId] !== undefined;
      if (!alreadyLoaded) {
        await fetchComments(postId);
      }
    },
    [commentsByPostId, fetchComments]
  );

  const handleCreateComment = useCallback(
    async (postId) => {
      const draft = (commentDraft[postId] || "").trim();
      if (draft.length < 1) return;

      if (!isAuthed) {
        setError("Você precisa estar logado (JWT) para comentar.");
        return;
      }

      try {
        setSubmittingComment((m) => ({ ...m, [postId]: true }));
        setError("");

        const res = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
          method: "POST",
          headers: authHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            content: draft,
            authorName: "IGNORADO",
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            text || `Falha ao criar comentário (HTTP ${res.status})`
          );
        }

        setCommentDraft((m) => ({ ...m, [postId]: "" }));
        await fetchComments(postId);
        setOpenComments((m) => ({ ...m, [postId]: true }));
      } catch (e) {
        console.error(e);
        setError("Não foi possível criar o comentário. Tente novamente.");
      } finally {
        setSubmittingComment((m) => ({ ...m, [postId]: false }));
      }
    },
    [authHeaders, commentDraft, fetchComments, isAuthed]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center">Fórum de Discussão</h1>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Autenticação (JWT)
              </h2>
              <p className="text-sm text-gray-500">
                Para criar posts/comentários, você precisa estar logado.
              </p>
            </div>

            {me ? (
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-700">
                  Logado como <span className="font-semibold">{me.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded border border-gray-200 hover:bg-gray-50 transition"
                >
                  Sair
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleLogin}
                className="flex items-center gap-2 flex-wrap"
              >
                <input
                  className="border border-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  disabled={loggingIn}
                />
                <input
                  type="password"
                  className="border border-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="senha"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  disabled={loggingIn}
                />
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-700 transition"
                >
                  {loggingIn ? "Entrando..." : "Entrar"}
                </button>
              </form>
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm text-gray-600">
              Token (opcional — só pra dev):
            </label>
            <div className="mt-2 flex gap-2">
              <input
                className="w-full border border-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Bearer token (sem o 'Bearer ')"
                value={token}
                onChange={(e) => {
                  const v = e.target.value;
                  setToken(v);
                  localStorage.setItem(TOKEN_KEY, v);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem(TOKEN_KEY, token);
                  fetchMe(token);
                }}
                className="px-4 py-2 rounded border border-gray-200 hover:bg-gray-50 transition"
              >
                Validar
              </button>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleCreatePost}
          className="mt-10 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
        >
          <h2 className="text-xl font-bold text-gray-800">Criar post</h2>

          {!isAuthed && (
            <p className="mt-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded">
              Você está deslogado. Faça login acima para liberar “Postar”.
            </p>
          )}

          <div className="mt-4 grid grid-cols-1 gap-3">
            <input
              className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Título (mín. 3 caracteres)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submittingPost}
            />

            <textarea
              className="w-full border border-gray-200 p-3 rounded min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Conteúdo"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={submittingPost}
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!canSubmitPost || !isAuthed}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                {submittingPost ? "Postando..." : "Postar"}
              </button>

              <button
                type="button"
                onClick={() => fetchPosts(page)}
                disabled={loading || submittingPost}
                className="px-4 py-2 rounded border border-gray-200 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Recarregar
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 font-medium mt-1">{error}</p>
            )}
          </div>
        </form>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Posts</h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0 || loading}
                className="px-3 py-1 rounded border border-gray-200 disabled:opacity-50 hover:bg-white"
              >
                ←
              </button>
              <span className="text-sm text-gray-500">Página {page + 1}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={loading || posts.length < size}
                className="px-3 py-1 rounded border border-gray-200 disabled:opacity-50 hover:bg-white"
              >
                →
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bg-white p-6 rounded-lg shadow-sm text-gray-600">
              Carregando posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm text-gray-600">
              Nenhum post ainda. Seja o primeiro 😄
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => {
                const isOpen = !!openComments[post.id];
                const isLoadingC = !!loadingComments[post.id];
                const comments = commentsByPostId[post.id] ?? null;
                const draft = commentDraft[post.id] ?? "";
                const isSubmittingC = !!submittingComment[post.id];

                return (
                  <div
                    key={post.id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <Link to={`/post/${post.id}`} className="hover:underline">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 mt-2 whitespace-pre-wrap">
                      {post.content}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                      <p className="text-sm text-gray-400">
                        Por: {post.authorName || "Anônimo"}
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleComments(post.id)}
                          className="text-sm px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 transition"
                        >
                          {isOpen ? "Ocultar comentários" : "Ver comentários"}
                        </button>

                        <button
                          type="button"
                          onClick={() => fetchComments(post.id)}
                          className="text-sm px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 transition"
                          disabled={isLoadingC}
                        >
                          {isLoadingC ? "Atualizando..." : "Atualizar"}
                        </button>

                        <Link
                          to={`/post/${post.id}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Ver detalhes →
                        </Link>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="mt-5 border-t border-gray-100 pt-4">
                        <h4 className="text-sm font-semibold text-gray-800">
                          Comentários
                        </h4>

                        <div className="mt-3">
                          {!isAuthed && (
                            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 p-2 rounded">
                              Faça login para comentar.
                            </p>
                          )}

                          <div className="mt-2 flex gap-2">
                            <input
                              className="w-full border border-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                              placeholder="Escreva um comentário…"
                              value={draft}
                              onChange={(e) =>
                                setCommentDraft((m) => ({
                                  ...m,
                                  [post.id]: e.target.value,
                                }))
                              }
                              disabled={!isAuthed || isSubmittingC}
                            />
                            <button
                              type="button"
                              onClick={() => handleCreateComment(post.id)}
                              disabled={
                                !isAuthed ||
                                isSubmittingC ||
                                draft.trim().length < 1
                              }
                              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                            >
                              {isSubmittingC ? "Enviando..." : "Comentar"}
                            </button>
                          </div>
                        </div>

                        <div className="mt-4">
                          {isLoadingC ? (
                            <div className="text-sm text-gray-600">
                              Carregando comentários…
                            </div>
                          ) : comments === null ? (
                            <div className="text-sm text-gray-600">
                              Clique em “Ver comentários”.
                            </div>
                          ) : comments.length === 0 ? (
                            <div className="text-sm text-gray-600">
                              Nenhum comentário ainda.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {comments.map((c) => (
                                <div
                                  key={c.id}
                                  className="bg-gray-50 border border-gray-100 p-3 rounded"
                                >
                                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {c.content}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-400">
                                    {c.authorName || "Anônimo"}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;

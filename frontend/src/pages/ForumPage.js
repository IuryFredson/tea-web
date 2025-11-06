import React, { useState, useEffect } from "react";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Erro ao buscar posts:", error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center">Fórum de Discussão</h1>

      <div className="mt-12 space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600 mt-2">{post.content}</p>
            <p className="text-sm text-gray-400 mt-4">
              Por: {post.author ? post.author.username : "Anônimo"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;

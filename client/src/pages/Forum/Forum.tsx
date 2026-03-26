import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import API from "../../api/api";
import "./Forum.css";
import "./Forum.mobile.css";

interface Topic {
  id: number;
  user_id: number;
  user_name: string;
  user_role: string;
  title: string;
  body: string;
  is_pinned: number;
  comment_count: number;
  heart_count: number;
  thumbsup_count: number;
  handshake_count: number;
  created_at: string;
}

interface Comment {
  id: number;
  user_id: number;
  user_name: string;
  user_role: string;
  text: string;
  heart_count: number;
  thumbsup_count: number;
  handshake_count: number;
  created_at: string;
}

interface Reaction {
  target_type: "topic" | "comment";
  target_id: number;
  type: string;
}

type View = "list" | "topic";
type ReactionType = "heart" | "thumbsup" | "handshake";

// Виправлено: бейдж тепер приймає role і показує різний текст для admin і founder
const AdminBadge = ({ role }: { role: string }) => (
  <span className="forum-admin-badge">
    {role === "founder" ? "🚀 Засновник" : "👑 Адмін"}
  </span>
);

// Хелпер: перевіряє чи є роль привілейованою (admin або founder)
const isPrivilegedRole = (role: string) =>
  role === "admin" || role === "founder";

interface ReactionsProps {
  target_type: "topic" | "comment";
  target_id: number;
  heart_count: number;
  thumbsup_count: number;
  handshake_count: number;
  myReactions: Reaction[];
  onReact: (
    target_type: "topic" | "comment",
    target_id: number,
    type: string,
  ) => void;
  size?: "large" | "small";
}

const Reactions: React.FC<ReactionsProps> = ({
  target_type,
  target_id,
  heart_count,
  thumbsup_count,
  handshake_count,
  myReactions,
  onReact,
  size = "small",
}) => {
  const myReaction = myReactions.find(
    (r) => r.target_type === target_type && r.target_id === target_id,
  );

  const buttons: {
    type: ReactionType;
    emoji: string;
    activeEmoji: string;
    label: string;
    count: number;
  }[] = [
    {
      type: "thumbsup",
      emoji: "👍",
      activeEmoji: "👍",
      label: "Подобається",
      count: thumbsup_count,
    },
    {
      type: "heart",
      emoji: "🤍",
      activeEmoji: "❤️",
      label: "Люблю",
      count: heart_count,
    },
    {
      type: "handshake",
      emoji: "🤝",
      activeEmoji: "🤝",
      label: "Корисно",
      count: handshake_count,
    },
  ];

  return (
    <div className={`forum-reactions-group ${size}`}>
      {buttons.map((btn) => {
        const isActive = myReaction?.type === btn.type;
        return (
          <button
            key={btn.type}
            className={`forum-react-btn ${size} reaction-${btn.type} ${isActive ? "active" : ""}`}
            onClick={() => onReact(target_type, target_id, btn.type)}
            title={btn.label}
          >
            <span className="reaction-emoji">
              {isActive ? btn.activeEmoji : btn.emoji}
            </span>
            {btn.count > 0 && (
              <span className="reaction-count">{btn.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

const Forum: React.FC = () => {
  const { user } = useAuth();
  const [view, setView] = useState<View>("list");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [myReactions, setMyReactions] = useState<Reaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;

  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [commentText, setCommentText] = useState("");

  const [editingTopicId, setEditingTopicId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState("");

  const isAdmin = user?.role === "admin" || user?.role === "founder";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchTopics();
    if (user) fetchMyReactions();
  }, [user]);

  const fetchTopics = async (page = 1) => {
    try {
      const res = await API.get(`/forum/topics?page=${page}&limit=${LIMIT}`);
      setTopics(res.data.topics);
      setTotalPages(res.data.totalPages);
      setCurrentPage(page);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopic = async (id: number) => {
    try {
      const res = await API.get(`/forum/topics/${id}`);
      setSelectedTopic(res.data.topic);
      setComments(res.data.comments);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMyReactions = async () => {
    try {
      const res = await API.get("/forum/my-reactions");
      setMyReactions(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const openTopic = async (topic: Topic) => {
    setView("topic");
    await fetchTopic(topic.id);
  };

  const goBack = () => {
    setView("list");
    setSelectedTopic(null);
    setComments([]);
    setCommentText("");
    setEditingCommentId(null);
    fetchTopics();
  };

  const createTopic = async () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    try {
      await API.post("/forum/topics", {
        title: newTitle.trim(),
        body: newBody.trim(),
      });
      setNewTitle("");
      setNewBody("");
      setShowNewTopic(false);
      fetchTopics();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTopic = async (id: number) => {
    if (!window.confirm("Видалити тему?")) return;
    await API.delete(`/forum/topics/${id}`);
    if (view === "topic") goBack();
    else fetchTopics();
  };

  const saveEditTopic = async (id: number) => {
    await API.patch(`/forum/topics/${id}`, {
      title: editTitle,
      body: editBody,
    });
    setEditingTopicId(null);
    if (view === "topic" && selectedTopic) fetchTopic(selectedTopic.id);
    else fetchTopics();
  };

  // ─── Закріплення теми ───
  const togglePin = async (topic: Topic) => {
    await API.patch(`/forum/topics/${topic.id}/pin`, {
      is_pinned: !topic.is_pinned,
    });
    fetchTopics();
  };

  const addComment = async () => {
    if (!commentText.trim() || !selectedTopic) return;
    await API.post(`/forum/topics/${selectedTopic.id}/comments`, {
      text: commentText.trim(),
    });
    setCommentText("");
    fetchTopic(selectedTopic.id);
  };

  const deleteComment = async (id: number) => {
    if (!window.confirm("Видалити коментар?")) return;
    await API.delete(`/forum/comments/${id}`);
    if (selectedTopic) fetchTopic(selectedTopic.id);
  };

  const saveEditComment = async (id: number) => {
    await API.patch(`/forum/comments/${id}`, { text: editCommentText });
    setEditingCommentId(null);
    if (selectedTopic) fetchTopic(selectedTopic.id);
  };

  const react = async (
    target_type: "topic" | "comment",
    target_id: number,
    type: string,
  ) => {
    if (!user) {
      window.dispatchEvent(new Event("openAuthModal"));
      return;
    }
    await API.post("/forum/react", { target_type, target_id, type });
    fetchMyReactions();
    if (view === "topic" && selectedTopic) fetchTopic(selectedTopic.id);
    else fetchTopics();
  };

  const canEdit = (authorId: number) =>
    user && (user.role === "admin" || user.id === authorId);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const avatarLetter = (name: string) => name?.[0]?.toUpperCase() || "?";
  const avatarColor = (name: string) => {
    const colors = [
      "#667eea",
      "#764ba2",
      "#f59e0b",
      "#22c55e",
      "#ef4444",
      "#06b6d4",
    ];
    return colors[name?.charCodeAt(0) % colors.length] || "#667eea";
  };

  const adminAvatarBg = "linear-gradient(135deg, #7c3aed, #764ba2)";

  return (
    <div className="forum-wrapper">
      {!user && (
        <div className="forum-guest-banner">
          <div className="forum-guest-banner-info">
            <span className="forum-guest-banner-emoji">👋</span>
            <div>
              <p className="forum-guest-banner-title">
                Ви переглядаєте форум як гість
              </p>
              <p className="forum-guest-banner-sub">
                Зареєструйтесь щоб створювати теми, коментувати та ставити
                реакції
              </p>
            </div>
          </div>
          <button
            className="forum-guest-banner-btn"
            onClick={() => window.dispatchEvent(new Event("openAuthModal"))}
          >
            🔑 Увійти / Зареєструватись
          </button>
        </div>
      )}

      {/* ─── СПИСОК ТЕМ ─── */}
      {view === "list" && (
        <>
          <div className="forum-header">
            <div>
              <h1 className="forum-title">Наш форум</h1>
              <p className="forum-subtitle">
                {topics.length} {topics.length === 1 ? "тема" : "тем"} · <br />
                Будь-ласка, дотримуйтесь правил спільноти під час публікації тем
                та коментарів.
              </p>
            </div>
            {user && (
              <button
                className={`forum-new-topic-btn ${showNewTopic ? "cancel" : "active"}`}
                onClick={() => setShowNewTopic(!showNewTopic)}
              >
                {showNewTopic ? "✕ Скасувати" : "✏️ Нова тема"}
              </button>
            )}
          </div>

          {showNewTopic && user && (
            <div className="forum-new-topic-form">
              <h3>✏️ Нова тема</h3>
              <input
                type="text"
                className="forum-input"
                placeholder="Заголовок теми..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="forum-textarea"
                placeholder="Опишіть питання або думку..."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                rows={4}
              />
              <button
                className={`forum-publish-btn ${newTitle.trim() && newBody.trim() ? "active" : "disabled"}`}
                onClick={createTopic}
                disabled={!newTitle.trim() || !newBody.trim()}
              >
                📤 Опублікувати
              </button>
            </div>
          )}

          {loading ? (
            <p className="forum-loading">Завантаження...</p>
          ) : topics.length === 0 ? (
            <div className="forum-empty">
              <p className="forum-empty-icon">🌱</p>
              <p>Тем поки немає — будь першим!</p>
            </div>
          ) : (
            <div className="forum-topics-list">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className={`forum-topic-card ${topic.is_pinned ? "pinned" : ""}`}
                >
                  {editingTopicId === topic.id ? (
                    <div className="forum-edit-form">
                      <input
                        className="forum-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <textarea
                        className="forum-textarea"
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        rows={3}
                      />
                      <div className="forum-edit-actions">
                        <button
                          className="btn-save"
                          onClick={() => saveEditTopic(topic.id)}
                        >
                          💾 Зберегти
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={() => setEditingTopicId(null)}
                        >
                          Скасувати
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Бейдж закріпленої теми */}
                      {topic.is_pinned === 1 && (
                        <div className="forum-pinned-badge">📌 Закріплено</div>
                      )}

                      <div className="forum-topic-card-body">
                        <div className="forum-topic-card-content">
                          <div className="forum-author">
                            <div
                              className="forum-avatar"
                              style={{
                                // Виправлено: враховуємо founder для фону аватара
                                background: isPrivilegedRole(topic.user_role)
                                  ? adminAvatarBg
                                  : avatarColor(topic.user_name),
                              }}
                            >
                              {/* Виправлено: враховуємо founder для емодзі аватара */}
                              {isPrivilegedRole(topic.user_role)
                                ? "👑"
                                : avatarLetter(topic.user_name)}
                            </div>
                            <div>
                              <p className="forum-author-name">
                                {topic.user_name}
                                {/* Виправлено: передаємо role щоб бейдж показував правильний текст */}
                                {isPrivilegedRole(topic.user_role) && (
                                  <AdminBadge role={topic.user_role} />
                                )}
                              </p>
                              <p className="forum-author-date">
                                {formatDate(topic.created_at)}
                              </p>
                            </div>
                          </div>
                          <h3
                            className="forum-topic-title"
                            onClick={() => openTopic(topic)}
                          >
                            {topic.title}
                          </h3>
                          <p className="forum-topic-preview">
                            {topic.body.length > 160
                              ? topic.body.slice(0, 160) + "..."
                              : topic.body}
                          </p>
                        </div>
                        <div className="forum-actions">
                          {/* Кнопка закріплення — тільки для адміна */}
                          {isAdmin && (
                            <button
                              className={`btn-pin ${topic.is_pinned ? "active" : ""}`}
                              onClick={() => togglePin(topic)}
                              title={
                                topic.is_pinned ? "Відкріпити" : "Закріпити"
                              }
                            >
                              📌
                            </button>
                          )}
                          {canEdit(topic.user_id) && (
                            <>
                              <button
                                className="btn-edit"
                                onClick={() => {
                                  setEditingTopicId(topic.id);
                                  setEditTitle(topic.title);
                                  setEditBody(topic.body);
                                }}
                              >
                                ✏️
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => deleteTopic(topic.id)}
                              >
                                🗑
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="forum-topic-footer">
                        <Reactions
                          target_type="topic"
                          target_id={topic.id}
                          heart_count={topic.heart_count}
                          thumbsup_count={topic.thumbsup_count}
                          handshake_count={topic.handshake_count}
                          myReactions={myReactions}
                          onReact={react}
                          size="small"
                        />
                        <button
                          className="forum-comments-btn"
                          onClick={() => openTopic(topic)}
                        >
                          💬 {topic.comment_count}
                        </button>
                        <button
                          className="forum-read-btn"
                          onClick={() => openTopic(topic)}
                        >
                          Читати →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="forum-pagination">
              <button
                className="forum-page-btn"
                disabled={currentPage === 1}
                onClick={() => fetchTopics(currentPage - 1)}
              >
                ← Попередня
              </button>
              <span className="forum-page-info">
                {currentPage} / {totalPages}
              </span>
              <button
                className="forum-page-btn"
                disabled={currentPage === totalPages}
                onClick={() => fetchTopics(currentPage + 1)}
              >
                Наступна →
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── ОДНА ТЕМА ─── */}
      {view === "topic" && selectedTopic && (
        <>
          <button className="forum-back-btn" onClick={goBack}>
            ← Повернутись
          </button>

          <div className="forum-topic-detail">
            {editingTopicId === selectedTopic.id ? (
              <div className="forum-edit-form">
                <input
                  className="forum-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="forum-textarea"
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  rows={5}
                />
                <div className="forum-edit-actions">
                  <button
                    className="btn-save"
                    onClick={() => saveEditTopic(selectedTopic.id)}
                  >
                    💾 Зберегти
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => setEditingTopicId(null)}
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            ) : (
              <>
                {selectedTopic.is_pinned === 1 && (
                  <div className="forum-pinned-badge">📌 Закріплено</div>
                )}
                <div className="forum-topic-detail-header">
                  <h1 className="forum-topic-detail-title">
                    {selectedTopic.title}
                  </h1>
                  <div className="forum-actions">
                    {isAdmin && (
                      <button
                        className={`btn-pin ${selectedTopic.is_pinned ? "active" : ""}`}
                        onClick={() => togglePin(selectedTopic)}
                        title={
                          selectedTopic.is_pinned ? "Відкріпити" : "Закріпити"
                        }
                      >
                        📌
                      </button>
                    )}
                    {canEdit(selectedTopic.user_id) && (
                      <>
                        <button
                          className="btn-edit"
                          onClick={() => {
                            setEditingTopicId(selectedTopic.id);
                            setEditTitle(selectedTopic.title);
                            setEditBody(selectedTopic.body);
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteTopic(selectedTopic.id)}
                        >
                          🗑
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="forum-author">
                  <div
                    className="forum-avatar large"
                    style={{
                      // Виправлено: враховуємо founder для фону аватара
                      background: isPrivilegedRole(selectedTopic.user_role)
                        ? adminAvatarBg
                        : avatarColor(selectedTopic.user_name),
                    }}
                  >
                    {/* Виправлено: враховуємо founder для емодзі аватара */}
                    {isPrivilegedRole(selectedTopic.user_role)
                      ? "👑"
                      : avatarLetter(selectedTopic.user_name)}
                  </div>
                  <div>
                    <p className="forum-author-name">
                      {selectedTopic.user_name}
                      {/* Виправлено: передаємо role щоб бейдж показував правильний текст */}
                      {isPrivilegedRole(selectedTopic.user_role) && (
                        <AdminBadge role={selectedTopic.user_role} />
                      )}
                    </p>
                    <p className="forum-author-date">
                      {formatDate(selectedTopic.created_at)}
                    </p>
                  </div>
                </div>

                <p className="forum-topic-body">{selectedTopic.body}</p>

                <div className="forum-topic-reaction">
                  <p className="forum-reaction-label">Ваша реакція:</p>
                  <Reactions
                    target_type="topic"
                    target_id={selectedTopic.id}
                    heart_count={selectedTopic.heart_count}
                    thumbsup_count={selectedTopic.thumbsup_count}
                    handshake_count={selectedTopic.handshake_count}
                    myReactions={myReactions}
                    onReact={react}
                    size="large"
                  />
                </div>
              </>
            )}
          </div>

          <h3 className="forum-comments-title">
            💬 Коментарі ({comments.length})
          </h3>

          {comments.length === 0 ? (
            <p className="forum-no-comments">
              Коментарів ще немає — будь першим!
            </p>
          ) : (
            <div className="forum-comments-list">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`forum-comment-card ${comment.user_role === "admin" ? "admin-comment" : ""}`}
                >
                  {editingCommentId === comment.id ? (
                    <div className="forum-edit-form">
                      <textarea
                        className="forum-textarea"
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        rows={3}
                      />
                      <div className="forum-edit-actions">
                        <button
                          className="btn-save"
                          onClick={() => saveEditComment(comment.id)}
                        >
                          💾 Зберегти
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={() => setEditingCommentId(null)}
                        >
                          Скасувати
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="forum-comment-header">
                        <div className="forum-comment-author">
                          <div
                            className="forum-avatar small"
                            style={{
                              // Виправлено: враховуємо founder для фону аватара коментаря
                              background: isPrivilegedRole(comment.user_role)
                                ? adminAvatarBg
                                : avatarColor(comment.user_name),
                            }}
                          >
                            {/* Виправлено: враховуємо founder для емодзі аватара коментаря */}
                            {isPrivilegedRole(comment.user_role)
                              ? "👑"
                              : avatarLetter(comment.user_name)}
                          </div>
                          <div>
                            <span className="forum-comment-name">
                              {comment.user_name}
                              {/* Виправлено: передаємо role щоб бейдж показував правильний текст */}
                              {isPrivilegedRole(comment.user_role) && (
                                <AdminBadge role={comment.user_role} />
                              )}
                            </span>
                            <span className="forum-comment-date">
                              {formatDate(comment.created_at)}
                            </span>
                          </div>
                        </div>
                        {canEdit(comment.user_id) && (
                          <div className="forum-actions">
                            <button
                              className="btn-edit"
                              onClick={() => {
                                setEditingCommentId(comment.id);
                                setEditCommentText(comment.text);
                              }}
                            >
                              ✏️
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => deleteComment(comment.id)}
                            >
                              🗑
                            </button>
                          </div>
                        )}
                      </div>

                      <p className="forum-comment-text">{comment.text}</p>

                      <Reactions
                        target_type="comment"
                        target_id={comment.id}
                        heart_count={comment.heart_count}
                        thumbsup_count={comment.thumbsup_count}
                        handshake_count={comment.handshake_count}
                        myReactions={myReactions}
                        onReact={react}
                        size="small"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {user ? (
            <div className="forum-comment-form">
              <p className="forum-comment-form-title">✍️ Ваш коментар</p>
              <textarea
                className="forum-textarea"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Напишіть коментар..."
                rows={3}
              />
              <button
                className={`forum-send-btn ${commentText.trim() ? "active" : "disabled"}`}
                onClick={addComment}
                disabled={!commentText.trim()}
              >
                📤 Надіслати
              </button>
            </div>
          ) : (
            <div className="forum-login-prompt">
              <p>🔐 Щоб залишити коментар — увійдіть або зареєструйтесь</p>
              <button
                className="forum-login-prompt-btn"
                onClick={() => window.dispatchEvent(new Event("openAuthModal"))}
              >
                🔑 Увійти / Зареєструватись
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Forum;

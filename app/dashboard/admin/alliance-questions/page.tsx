'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Question {
  id: string;
  questionText: string;
  order: number;
  isActive: boolean;
}

export default function AdminAllianceQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    questionText: '',
    order: 0,
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/alliance-questions');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      toast.error('Failed to fetch questions');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.questionText.trim()) {
      toast.error('Question text is required');
      return;
    }

    try {
      const response = await fetch('/api/admin/alliance-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: formData.questionText,
          order: formData.order,
        }),
      });

      if (response.ok) {
        toast.success('Question added successfully');
        setFormData({ questionText: '', order: 0 });
        setIsAdding(false);
        fetchQuestions();
      } else {
        toast.error('Failed to add question');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  const handleUpdateQuestion = async (id: string) => {
    if (!formData.questionText.trim()) {
      toast.error('Question text is required');
      return;
    }

    try {
      const response = await fetch(`/api/admin/alliance-questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: formData.questionText,
          order: formData.order,
        }),
      });

      if (response.ok) {
        toast.success('Question updated successfully');
        setEditingId(null);
        setFormData({ questionText: '', order: 0 });
        fetchQuestions();
      } else {
        toast.error('Failed to update question');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const response = await fetch(`/api/admin/alliance-questions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Question deleted successfully');
        fetchQuestions();
      } else {
        toast.error('Failed to delete question');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  const handleEditStart = (question: Question) => {
    setEditingId(question.id);
    setFormData({
      questionText: question.questionText,
      order: question.order,
    });
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ questionText: '', order: 0 });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Alliance Insurance Questions</h1>
          <p className="text-neutral-600 mt-2">
            Manage rating questions for Alliance Insurance company ratings
          </p>
        </div>
        <Link href="/dashboard" className="btn btn-outline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Add/Edit Form */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            {isAdding ? 'Add New Question' : editingId ? 'Edit Question' : 'Add New Question'}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editingId) {
                handleUpdateQuestion(editingId);
              } else {
                handleAddQuestion(e);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="questionText" className="label">
                Question Text *
              </label>
              <textarea
                id="questionText"
                value={formData.questionText}
                onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                className="input"
                placeholder="Enter the question for Alliance Insurance rating..."
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="order" className="label">
                Display Order
              </label>
              <input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="input"
                placeholder="0"
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Question' : 'Add Question'}
              </button>
              {(isAdding || editingId) && (
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              )}
              {!isAdding && !editingId && (
                <button
                  type="button"
                  onClick={() => setIsAdding(true)}
                  className="btn btn-outline"
                >
                  Clear Form
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Questions List */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Current Questions ({questions.length})
          </h2>

          {questions.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <p>No questions yet. Add one to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                          Question {index + 1}
                        </span>
                        {question.isActive && (
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                            <CheckCircle className="w-3 h-3" /> Active
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-900 font-medium">{question.questionText}</p>
                      <p className="text-xs text-neutral-500 mt-2">Order: {question.order}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStart(question)}
                        className="btn btn-sm btn-outline"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="alert alert-info flex items-start gap-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-neutral-900">About Alliance Insurance Questions</p>
          <p className="text-sm text-neutral-700 mt-1">
            These questions appear when customers rate Alliance Insurance as a company. You can add, edit, or remove questions to customize the rating experience.
          </p>
        </div>
      </div>
    </div>
  );
}

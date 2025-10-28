'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Edit, Trash2, Check, X, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  questionText: string;
  order: number;
  isActive: boolean;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    questionText: '',
    isActive: true,
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (question?: Question) => {
    if (question) {
      setEditingQuestion(question);
      setFormData({
        questionText: question.questionText,
        isActive: question.isActive,
      });
    } else {
      setEditingQuestion(null);
      setFormData({
        questionText: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
    setFormData({ questionText: '', isActive: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingQuestion
        ? `/api/questions/${editingQuestion.id}`
        : '/api/questions';
      
      const method = editingQuestion ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save question');
      }

      toast.success(editingQuestion ? 'Question updated!' : 'Question created!');
      handleCloseModal();
      fetchQuestions();
    } catch (error) {
      console.error('Error saving question:', error);
      toast.error('Failed to save question');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      toast.success('Question deleted!');
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question');
    }
  };

  const handleToggleActive = async (question: Question) => {
    try {
      const response = await fetch(`/api/questions/${question.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: question.questionText,
          isActive: !question.isActive,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update question');
      }

      toast.success(question.isActive ? 'Question deactivated' : 'Question activated');
      fetchQuestions();
    } catch (error) {
      console.error('Error toggling question:', error);
      toast.error('Failed to update question');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Rating Questions</h1>
            <p className="text-neutral-600 mt-2">
              Manage the questions customers will answer when rating your team
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Question</span>
          </button>
        </div>

        {/* Questions List */}
        <div className="card">
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : questions.length > 0 ? (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`p-4 border rounded-lg ${
                      question.isActive ? 'border-neutral-200 bg-white' : 'border-neutral-200 bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          <GripVertical className="w-5 h-5 text-neutral-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-neutral-500">
                              Question {index + 1}
                            </span>
                            {question.isActive ? (
                              <span className="badge badge-success text-xs">Active</span>
                            ) : (
                              <span className="badge badge-danger text-xs">Inactive</span>
                            )}
                          </div>
                          <p className={`text-neutral-900 ${!question.isActive && 'opacity-60'}`}>
                            {question.questionText}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleToggleActive(question)}
                          className="btn btn-sm btn-secondary"
                          title={question.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {question.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleOpenModal(question)}
                          className="btn btn-sm btn-secondary"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(question.id)}
                          className="btn btn-sm btn-danger"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-600 mb-4">No questions yet</p>
                <button
                  onClick={() => handleOpenModal()}
                  className="btn btn-primary"
                >
                  Create Your First Question
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Tips for Great Questions</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Keep questions clear and specific</li>
            <li>• Focus on measurable aspects of service quality</li>
            <li>• Use positive language</li>
            <li>• Avoid leading questions</li>
            <li>• Aim for 3-5 questions for best response rates</li>
          </ul>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-900">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="questionText" className="label">
                  Question Text *
                </label>
                <textarea
                  id="questionText"
                  required
                  rows={3}
                  value={formData.questionText}
                  onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                  className="input"
                  placeholder="e.g., How would you rate the agent's professionalism?"
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Customers will rate this on a scale of 1-5
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-neutral-700">
                  Active (customers will see this question)
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingQuestion ? 'Update Question' : 'Create Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
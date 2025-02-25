import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import BookForm from './BookForm';

const BookCreate = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const processData = (data) => {
    createBookMutation.mutate(data)
  }

  const createBookMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['booksData']),
        navigate('/admin/books')
    },
  })

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center">Create a New Book</h2>
      <BookForm onDataCollection={processData} />
    </div>
  )
}

export default BookCreate;
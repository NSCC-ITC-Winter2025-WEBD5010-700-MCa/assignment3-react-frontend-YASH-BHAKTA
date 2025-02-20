import React from 'react';
import { useForm } from 'react-hook-form';
import { Mutation, useQueryClient, useMutation } from '@tanstack/react-query';
import { data } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function BookCreate() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const collectData = (data) => {
  //   createBookMutation.mutate(data);
  // };

  const createBookMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      navigate('/admin/books')
    }
  })

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-5">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Create New Book</h2>
        <form onSubmit={handleSubmit(createBookMutation.mutate)} className="space-y-4">
          <div>
            <input
              {...register('title', { required: 'Title is required' })} type="text" placeholder="Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <input
              {...register('author', { required: 'Author is required' })}
              type="text"
              placeholder="Author"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
          </div>

          <div>
            <input
              {...register('published_year', { required: 'Year is required' })}
              type="text"
              placeholder="Year"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>}
          </div>

          <div>
            <input
              {...register('genre', { required: 'Genre is required' })}
              type="text"
              placeholder="Genre"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
          </div>

          <button type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Create Book
          </button>
        </form>
      </div>
    </div>
  );
}
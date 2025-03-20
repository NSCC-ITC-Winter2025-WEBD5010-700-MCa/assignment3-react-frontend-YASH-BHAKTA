import { useForm } from 'react-hook-form';
import { useEffect } from 'react';


export default function CarsForm({ onDataCollection, initialData }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        if (initialData) {
            //Pre-populate the form
            setValue('make', initialData.make)
            setValue('model', initialData.model)
            setValue('year', initialData.year)
            setValue('price', initialData.price)
            initialData = null;
        }
    }, [initialData])

    return (
        <form onSubmit={handleSubmit(onDataCollection)} className="space-y-4">
            <div>
                <input
                    {...register('make', { required: 'Make is required!' })}
                    type="text"
                    placeholder="Make"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make.message}</p>}
            </div>
            <div>
                <input
                    {...register('model', { required: 'Model is required!' })}
                    type="text"
                    placeholder="Model"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
            </div>
            <div>
                <input
                    {...register('year', { required: 'Year is required!', min: { value: 1700, message: 'Year must be greater than 1700' } })}
                    type="number"
                    placeholder="Year"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>}
            </div>
            <div>
                <input
                    {...register('price', { required: 'Price is required!' })}
                    type="number"
                    placeholder="Price"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
                Submit Car
            </button>
        </form>
    )
}
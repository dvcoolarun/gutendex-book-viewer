import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories: Array<{ name: string, icon: string }> = [
  { name: "FICTION", icon: "📚" },
  { name: "PHILOSOPHY", icon: "🧠" },
  { name: "DRAMA", icon: "🎭" },
  { name: "HISTORY", icon: "🏛️" },
  { name: "HUMOUR", icon: "😂" },
  { name: "ADVENTURE", icon: "🌄" },
  { name: "POLITICS", icon: "🏛️" },
]

const MainPage: React.FC = () => {
    return (
        <div className='min-h-screen bg-purple-50 p-8'>
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-5xl font-bold text-purple-600 mb-8'>
                    Gutenberg Project
                </h1>
                <p className='text-grey-600 mb-8'>
                    A social cataloging website that allows you to freely search its database of books, annotations, and reviews.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {categories.map((category) => (
                        <div key={category.name} className='bg-white p-4 rounded-lg shadow-md flex items-center justify-between'>
                            <div>
                                <span className='text-2xl font-bold mr-2'>{category.icon}</span>
                                <span className='text-lg'>{category.name}</span>
                            </div>
                            <div>
                                <Link to={`/books/${category.name}`}>
                                    <ArrowRight className='text-purple-600 text-2xl' />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainPage;    
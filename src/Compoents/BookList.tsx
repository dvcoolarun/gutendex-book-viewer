import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchBook } from "../api";
import { Book, ApiResponse } from "../types";
import { selectBookFormat } from "../utils";
import { node } from "prop-types";

const BookList: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);

    const loadBooks = async (url: string) => {
        setLoading(true);
        setError(null);

        try {
            const data: ApiResponse = await fetchBook(url);
            setBooks(prevBooks => [...prevBooks, ...data.results]);
            setNextPage(data.next ? data.next.replace(/http:\/\/localhost:\d+/, 'http://skunkworks.ignitesol.com:8000') : null);
        } catch (err) {
            setError('Failed to fetch books');
        } finally {
            setLoading(false);
        }
    }

    const observer = useRef<IntersectionObserver | null>(null);

    const lastBookElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextPage) {
                loadBooks(nextPage);
            }
        });

        if (node) observer.current.observe(node);

    }, [loading, nextPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBooks([]);
            const url = `http://skunkworks.ignitesol.com:8000/books/?topic=${category}&search=${searchTerm}`;
            loadBooks(url);
        }, 1000);

        return () => clearTimeout(timer);
    }, [category, searchTerm]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-600">
            {category?.toUpperCase()}
          </h1>
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {books.map((book, index) => (
            <div key={`${book.id}-${index}`} ref={index === books.length - 1 ? lastBookElementRef : null} className="flex flex-col">
              <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover rounded-md shadow-md mb-2" />
              <h3 className="font-semibold text-sm">{book.title}</h3>
              <p className="text-xs text-gray-600">{book.authors.map((author) => author.name).join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
};

export default BookList;
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1';

export async function searchBooks(query: string, startIndex = 0) {
  const response = await fetch(
    `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&key=${API_KEY}`
  );
  return response.json();
}

export async function getBookById(id: string) {
  const response = await fetch(`${BASE_URL}/volumes/${id}?key=${API_KEY}`);
  return response.json();
}
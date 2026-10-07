import { useEffect, useState } from 'react';
import CategoryCard from '@/components/shared/CategoryCard';
import { categoryService } from '@/services/categoryService';
export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    categoryService.getCategories().then(setCategories);
  }, []);
  return <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      <h1 className="text-2xl font-extrabold text-[var(--color-navy)]">Barcha kategoriyalar</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">Kerakli xizmat turini tanlang</p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(c => <CategoryCard key={c.id} category={c} />)}
      </div>
    </div>;
}

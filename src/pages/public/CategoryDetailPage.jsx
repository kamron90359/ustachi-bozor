import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export default function CategoryDetailPage() {
  const {
    slug
  } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/masters?category=${slug}`, {
      replace: true
    });
  }, [slug, navigate]);
  return null;
}
